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
        return $model->settings->settings['onboarding']['skip'] ?? false;
      })
      ->completeIf(function (User $model) {
        return !is_null($model->email_verified_at);
      });

    Onboard::addStep('Setup Business')
      ->link('/onboarding/business-setup')
      ->cta('Setup Business')
      ->excludeIf(function (User $model) {
        // Skip if onboarding is skipped
        return $model->settings->settings['onboarding']['skip'] ?? false;
      })
      ->completeIf(function (User $model) {
        return $model->organizations()
          ->wherePivot('role', 'owner')
          ->exists();
      });

    Onboard::addStep('Create First Restaurant')
      ->link('/onboarding/restaurant-setup')
      ->cta('Create Restaurant')
      ->excludeIf(function (User $model) {
        // Skip if onboarding is skipped or no organization exists
        if ($model->settings->settings['onboarding']['skip'] ?? false) {
          return true;
        }
        return !$model->organizations()
          ->wherePivot('role', 'owner')
          ->exists();
      })
      ->completeIf(function (User $model) {
        return $model->organizations()
          ->wherePivot('role', 'owner')
          ->whereHas('restaurants')
          ->exists();
      });
  }
}
