<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
  use HasFactory;

  protected $fillable = [
    'restaurant_id',
    'table_id',
    'staff_id',
    'status',
    'notes',
    'total_amount',
  ];

  protected $casts = [
    'total_amount' => 'decimal:2',
  ];

  /**
   * Get the restaurant that owns the order.
   */
  public function restaurant(): BelongsTo
  {
    return $this->belongsTo(Restaurant::class);
  }

  /**
   * Get the table associated with the order.
   */
  public function table(): BelongsTo
  {
    return $this->belongsTo(Table::class);
  }

  /**
   * Get the staff member who created the order.
   */
  public function staff(): BelongsTo
  {
    return $this->belongsTo(Staff::class);
  }

  /**
   * Get the order items for this order.
   */
  public function orderItems(): HasMany
  {
    return $this->hasMany(OrderItem::class);
  }
}
