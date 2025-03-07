<?php

namespace App\Http\Controllers;

use App\Models\OnboardingData;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OnboardingController extends Controller
{
  public function showBusinessSetup()
  {
    return Inertia::render('Onboarding/BusinessSetup');
  }

  public function storeBusinessSetup(Request $request)
  {
    $validated = $request->validate([
      'business_type' => 'required|string|in:restaurant,cafe,bar,quick_service,other',
    ]);

    // Get existing organization or create new one
    $organization = $request->user()->organizations()
      ->wherePivot('role', 'owner')
      ->first();

    if (!$organization) {
      // Option 1: Use create() with withPivot data
      $organization = $request->user()->organizations()->create([
        'name' => $request->user()->name,
        'slug' => Str::slug($request->user()->name),
        'is_active' => true,
      ], ['role' => 'owner']); // Pass pivot data as second argument
    }

    // Update or create onboarding data
    $organization->onboardingData()->updateOrCreate(
      ['organization_id' => $organization->id],
      [
        'business_type' => $validated['business_type'],
        'is_skipped' => false,
      ]
    );

    return redirect()->route('dashboard');
  }

  public function showRestaurantSetup()
  {
    return Inertia::render('Onboarding/RestaurantSetup');
  }

  public function storeRestaurantSetup(Request $request)
  {
    $validated = $request->validate([
      'name' => 'required|string|max:255',
      'address' => 'required|string',
      'phone' => 'required|string',
    ]);

    $organization = $request->user()->organizations()
      ->wherePivot('role', 'owner')
      ->firstOrFail();

    $restaurant = $organization->restaurants()->create([
      'name' => $validated['name'],
      'slug' => Str::slug($validated['name']),
      'address' => $validated['address'],
      'phone' => $validated['phone'],
      'user_id' => $request->user()->id,
    ]);

    // Update existing onboarding data with restaurant
    $organization->onboardingData()->updateOrCreate(
      ['organization_id' => $organization->id],
      ['restaurant_id' => $restaurant->id]
    );

    return redirect()->route('dashboard');
  }

  public function skip(Request $request)
  {
    // Get existing organization or create new one
    $organization = $request->user()->organizations()
      ->wherePivot('role', 'owner')
      ->first();

    if (!$organization) {
      $organization = $request->user()->organizations()->create([
        'name' => $request->user()->name,
        'slug' => Str::slug($request->user()->name),
        'is_active' => true,
      ], ['role' => 'owner']);
    }

    // Update or create onboarding data with skipped status
    $organization->onboardingData()->updateOrCreate(
      ['organization_id' => $organization->id],
      ['is_skipped' => true]
    );

    return redirect()->route('dashboard');
  }

  public function reset(string $step)
  {
    // Get existing organization or create new one
    $organization = request()->user()->organizations()
      ->wherePivot('role', 'owner')
      ->first();

    if (!$organization) {
      $organization = request()->user()->organizations()->create([
        'name' => request()->user()->name . "'s Organization",
        'slug' => Str::slug(request()->user()->name . "'s Organization"),
        'is_active' => true,
      ], ['role' => 'owner']);
    }

    switch ($step) {
      case 'business-setup':
        $organization->onboardingData()->updateOrCreate(
          ['organization_id' => $organization->id],
          ['business_type' => null]
        );
        break;

      case 'restaurant-setup':
        $organization->onboardingData()->updateOrCreate(
          ['organization_id' => $organization->id],
          ['restaurant_id' => null]
        );
        break;
    }

    return redirect()->route("onboarding.{$step}");
  }
}
