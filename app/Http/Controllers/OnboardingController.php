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

    $organization = $request->user()->organizations()
      ->wherePivot('role', 'owner')
      ->firstOrFail();

    OnboardingData::create([
      'organization_id' => $organization->id,
      'business_type' => $validated['business_type'],
      'is_skipped' => false,
    ]);

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
      'timezone' => 'required|string|timezone',
    ]);

    $organization = $request->user()->organizations()
      ->wherePivot('role', 'owner')
      ->firstOrFail();

    $restaurant = $organization->restaurants()->create([
      'name' => $validated['name'],
      'slug' => Str::slug($validated['name']),
      'address' => $validated['address'],
      'phone' => $validated['phone'],
      'timezone' => $validated['timezone'],
      'user_id' => $request->user()->id,
    ]);

    // Link the restaurant to the onboarding data
    $onboardingData = $organization->onboardingData()->latest()->first();
    if ($onboardingData) {
      $onboardingData->update(['restaurant_id' => $restaurant->id]);
    }

    return redirect()->route('dashboard');
  }

  public function skip(Request $request)
  {
    $organization = $request->user()->organizations()
      ->wherePivot('role', 'owner')
      ->firstOrFail();

    OnboardingData::create([
      'organization_id' => $organization->id,
      'is_skipped' => true,
    ]);

    return redirect()->route('dashboard');
  }
}
