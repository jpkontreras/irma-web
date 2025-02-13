<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\ServiceProvider;
use Spatie\Onboard\Facades\Onboard;

class OnboardingServiceProvider extends ServiceProvider
{
  public function boot()
  {
    Onboard::addStep('Verify Email')
      ->link('/verify-email')
      ->cta('Verify Email')
      ->excludeIf(function (User $model) {
        return $model->organizations()
          ->whereHas('onboardingData', function ($query) {
            $query->where('is_skipped', true);
          })->exists();
      })
      ->completeIf(function (User $model) {
        return !is_null($model->email_verified_at);
      });

    Onboard::addStep('Setup Business')
      ->link('/onboarding/business-setup')
      ->cta('Setup Business')
      ->excludeIf(function (User $model) {
        return $model->organizations()
          ->whereHas('onboardingData', function ($query) {
            $query->where('is_skipped', true);
          })->exists();
      })
      ->completeIf(function (User $model) {
        return $model->organizations()
          ->whereHas('onboardingData', function ($query) {
            $query->whereNotNull('business_type');
          })->exists();
      });

    Onboard::addStep('Create First Restaurant')
      ->link('/onboarding/restaurant-setup')
      ->cta('Create Restaurant')
      ->excludeIf(function (User $model) {
        // Skip if onboarding is skipped or no organization exists
        if ($model->organizations()
          ->whereHas('onboardingData', function ($query) {
            $query->where('is_skipped', true);
          })->exists()
        ) {
          return true;
        }

        return !$model->organizations()
          ->whereHas('onboardingData', function ($query) {
            $query->whereNotNull('business_type');
          })->exists();
      })
      ->completeIf(function (User $model) {
        return $model->organizations()
          ->whereHas('onboardingData', function ($query) {
            $query->whereNotNull('restaurant_id');
          })->exists();
      });
  }
}
