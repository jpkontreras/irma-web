<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MenuItem extends Model
{
  use HasFactory;

  protected $fillable = [
    'restaurant_id',
    'name',
    'description',
    'price',
    'category',
    'preparation_time',
    'is_available',
  ];

  protected $casts = [
    'price' => 'decimal:2',
    'is_available' => 'boolean',
  ];

  /**
   * Get the restaurant that owns the menu item.
   */
  public function restaurant(): BelongsTo
  {
    return $this->belongsTo(Restaurant::class);
  }

  /**
   * Get the order items for this menu item.
   */
  public function orderItems(): HasMany
  {
    return $this->hasMany(OrderItem::class);
  }
}
