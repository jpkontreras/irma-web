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
      'business_name' => 'required|string|max:255',
      'business_type' => 'required|string|in:restaurant,cafe,bar',
    ]);

    $organization = Organization::create([
      'name' => $validated['business_name'],
      'slug' => Str::slug($validated['business_name']),
    ]);

    $organization->users()->attach(auth()->id(), ['role' => 'owner']);

    return redirect()->route('onboarding.restaurant-setup');
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

    $organization = auth()->user()->organizations()
      ->wherePivot('role', 'owner')
      ->firstOrFail();

    $restaurant = $organization->restaurants()->create([
      'name' => $validated['name'],
      'slug' => Str::slug($validated['name']),
      'address' => $validated['address'],
      'phone' => $validated['phone'],
      'timezone' => $validated['timezone'],
      'user_id' => auth()->id(),
    ]);

    return redirect()->route('dashboard');
  }

  public function skip()
  {
    return redirect()->route('dashboard');
  }
}
