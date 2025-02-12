<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserSettings extends Model
{
    protected $guarded = [];

    protected $casts = [
        'settings' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
