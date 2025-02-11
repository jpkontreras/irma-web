<?php

namespace App\Http\Controllers;

use App\Models\Organization;
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

    // Store the business type for the authenticated user
    $request->user()->update([
      'business_type' => $validated['business_type'],
      'onboarding_completed' => true,
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

    return redirect()->route('dashboard');
  }

  public function skip(Request $request)
  {
    // Mark onboarding as completed without storing business type
    $request->user()->update([
      'onboarding_completed' => true,
    ]);

    return redirect()->route('dashboard');
  }
}
