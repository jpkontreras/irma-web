<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Staff extends Model
{
  use HasFactory;

  protected $table = 'staff';

  protected $fillable = [
    'restaurant_id',
    'name',
    'role',
    'pin',
    'status',
  ];

  protected $hidden = [
    'pin',
  ];

  /**
   * Get the restaurant that the staff member belongs to.
   */
  public function restaurant(): BelongsTo
  {
    return $this->belongsTo(Restaurant::class);
  }

  /**
   * Get the orders handled by the staff member.
   */
  public function orders(): HasMany
  {
    return $this->hasMany(Order::class);
  }
}
