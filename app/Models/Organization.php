<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Organization extends Model
{
  use HasFactory, SoftDeletes;

  protected $fillable = [
    'name',
    'slug',
    'description',
    'is_active',
  ];

  protected $casts = [
    'is_active' => 'boolean',
  ];

  /**
   * Get the users that belong to the organization.
   */
  public function users(): BelongsToMany
  {
    return $this->belongsToMany(User::class)
      ->withPivot('role')
      ->withTimestamps();
  }

  /**
   * Get the restaurants that belong to the organization.
   */
  public function restaurants(): HasMany
  {
    return $this->hasMany(Restaurant::class);
  }

  /**
   * Get the menu items that belong to the organization.
   */
  public function menuItems(): HasMany
  {
    return $this->hasMany(MenuItem::class);
  }
}
