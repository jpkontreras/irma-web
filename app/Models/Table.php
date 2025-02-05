<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Table extends Model
{
  use HasFactory;

  protected $fillable = [
    'restaurant_id',
    'name',
    'capacity',
    'location',
    'status',
  ];

  /**
   * Get the restaurant that owns the table.
   */
  public function restaurant(): BelongsTo
  {
    return $this->belongsTo(Restaurant::class);
  }

  /**
   * Get the orders for the table.
   */
  public function orders(): HasMany
  {
    return $this->hasMany(Order::class);
  }
}
