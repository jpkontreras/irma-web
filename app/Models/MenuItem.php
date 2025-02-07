<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class MenuItem extends Model
{
  use HasFactory, SoftDeletes;

  protected $fillable = [
    'restaurant_id',
    'name',
    'slug',
    'description',
    'price',
    'category',
    'is_available',
    'options',
    'preparation_time',
    'notes',
  ];

  protected $casts = [
    'price' => 'decimal:2',
    'is_available' => 'boolean',
    'options' => 'array',
    'preparation_time' => 'integer',
  ];

  /**
   * Get the restaurant that owns the menu item.
   */
  public function restaurant(): BelongsTo
  {
    return $this->belongsTo(Restaurant::class);
  }

  public function menus(): BelongsToMany
  {
    return $this->belongsToMany(Menu::class)
      ->withPivot('display_order', 'special_price')
      ->withTimestamps();
  }
}
