<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
  use HasFactory;

  protected $fillable = [
    'order_id',
    'menu_item_id',
    'quantity',
    'unit_price',
    'subtotal',
    'notes',
  ];

  protected $casts = [
    'unit_price' => 'decimal:2',
    'subtotal' => 'decimal:2',
  ];

  /**
   * Get the order that owns the order item.
   */
  public function order(): BelongsTo
  {
    return $this->belongsTo(Order::class);
  }

  /**
   * Get the menu item associated with this order item.
   */
  public function menuItem(): BelongsTo
  {
    return $this->belongsTo(MenuItem::class);
  }
}
