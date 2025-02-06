<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Restaurant extends Model
{
  use HasFactory, SoftDeletes;

  protected $fillable = [
    'name',
    'slug',
    'address',
    'phone',
    'email',
    'operating_hours',
    'timezone',
    'is_active',
    'user_id',
  ];

  protected $casts = [
    'operating_hours' => 'array',
    'is_active' => 'boolean',
  ];

  /**
   * Get the owner of the restaurant.
   */
  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  /**
   * Get the tables for the restaurant.
   */
  public function tables(): HasMany
  {
    return $this->hasMany(Table::class);
  }

  /**
   * Get the staff members for the restaurant.
   */
  public function staff(): HasMany
  {
    return $this->hasMany(Staff::class);
  }

  /**
   * Get the menu items for the restaurant.
   */
  public function menuItems(): HasMany
  {
    return $this->hasMany(MenuItem::class);
  }

  /**
   * Get the orders for the restaurant.
   */
  public function orders(): HasMany
  {
    return $this->hasMany(Order::class);
  }
}
