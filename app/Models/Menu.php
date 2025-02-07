<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Menu extends Model
{
  use HasFactory;
  use SoftDeletes;

  protected $fillable = [
    'name',
    'slug',
    'description',
    'type',
    'is_active',
    'available_from',
    'available_until',
    'available_days',
    'categories_order',
  ];

  protected $casts = [
    'is_active' => 'boolean',
    'available_from' => 'datetime',
    'available_until' => 'datetime',
    'available_days' => 'array',
    'categories_order' => 'array',
  ];

  /**
   * Get the restaurant that owns the menu.
   */
  public function restaurant(): BelongsTo
  {
    return $this->belongsTo(Restaurant::class);
  }

  /**
   * Get the menu items for the menu.
   */
  public function menuItems(): BelongsToMany
  {
    return $this->belongsToMany(MenuItem::class)
      ->withPivot('display_order', 'special_price')
      ->withTimestamps();
  }

  /**
   * Get menu items grouped by category.
   *
   * @return array<string, \Illuminate\Database\Eloquent\Collection>
   */
  public function getItemsByCategory(): array
  {
    return $this->menuItems()
      ->get()
      ->groupBy('category')
      ->toArray();
  }

  /**
   * Check if the menu is currently available based on time constraints.
   */
  public function isAvailableNow(): bool
  {
    if (!$this->is_active) {
      return false;
    }

    $now = now();

    // Check time constraints
    if ($this->available_from && $this->available_until) {
      $currentTime = $now->format('H:i:s');
      if ($currentTime < $this->available_from || $currentTime > $this->available_until) {
        return false;
      }
    }

    // Check day constraints
    if ($this->available_days) {
      $currentDay = strtolower($now->format('l'));
      if (!in_array($currentDay, $this->available_days)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Scope a query to only include active menus.
   */
  public function scopeActive($query)
  {
    return $query->where('is_active', true);
  }

  /**
   * Scope a query to only include menus of a specific type.
   */
  public function scopeOfType($query, string $type)
  {
    return $query->where('type', $type);
  }
}
