<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Onboard\Concerns\GetsOnboarded;
use Spatie\Onboard\Concerns\Onboardable;
use App\Traits\HasOnboarding;

class User extends Authenticatable implements Onboardable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens, GetsOnboarded, HasOnboarding;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'business_type',
        'onboarding_completed',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    /**
     * Create a default settings record for the user.
     */
    protected static function booted()
    {
        static::created(function ($user) {
            $user->settings()->create([
                'settings' => [
                    'theme' => 'system',
                    'analytics_opt_out' => false,
                    'notifications' => [
                        'email' => true,
                        'push' => true
                    ],
                    'onboarding' => [
                        'skip' => false
                    ]
                ]
            ]);
        });
    }

    /**
     * Get the restaurants owned by the user.
     */
    public function restaurants(): HasMany
    {
        return $this->hasMany(Restaurant::class);
    }

    /**
     * Get the organizations that the user belongs to.
     */
    public function organizations(): BelongsToMany
    {
        return $this->belongsToMany(Organization::class)
            ->withPivot('role')
            ->as("role")
            ->withTimestamps();
    }


    public function settings()
    {
        return $this->hasOne(UserSettings::class);
    }
}
