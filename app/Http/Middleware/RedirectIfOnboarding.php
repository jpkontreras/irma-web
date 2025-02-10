<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfOnboarding
{
  /**
   * Protected routes that don't require onboarding completion
   */
  protected $protectedRoutes = [
    'onboarding.*',
    'verification.*',
    'logout',
    'login',
    'register',
    'password.*'
  ];

  public function handle(Request $request, Closure $next)
  {

    if (
      auth()->check() &&
      auth()->user()->requiresOnboarding() &&
      ! collect($this->protectedRoutes)->contains(fn($route) => $request->routeIs($route))
    ) {
      $nextStep = auth()->user()->onboarding()->nextUnfinishedStep();
      return redirect($nextStep->link);
    }

    return $next($request);
  }
}
