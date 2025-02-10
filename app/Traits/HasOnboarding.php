<?php

namespace App\Traits;

trait HasOnboarding
{
  public function hasCompletedOnboarding(): bool
  {
    return !$this->onboarding()->inProgress();
  }

  public function requiresOnboarding(): bool
  {
    return $this->onboarding()->inProgress();
  }
}
