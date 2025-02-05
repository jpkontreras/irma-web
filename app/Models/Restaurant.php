<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Restaurant extends Model
{
  use HasFactory;

  protected $fillable = [
    'name',
    'address',
    'phone',
    'email',
    'status',
  ];

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
