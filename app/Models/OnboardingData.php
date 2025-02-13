<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OnboardingData extends Model
{
    protected $fillable = [
        'organization_id',
        'restaurant_id',
        'business_type',
        'is_skipped',
    ];

    protected $casts = [
        'is_skipped' => 'boolean',
    ];

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}
