<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class RestaurantController extends Controller
{
  use AuthorizesRequests;

  public function index()
  {
    $restaurants = Restaurant::query()
      ->with('user:id,name,email')
      ->latest()
      ->paginate(10)
      ->withQueryString();

    return Inertia::render('Restaurants/Index', [
      'restaurants' => $restaurants,
    ]);
  }

  public function create()
  {
    return Inertia::render('Restaurants/Create');
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'nullable|email|max:255',
      'phone' => 'nullable|string|max:20',
      'address' => 'nullable|string|max:1000',
      'operating_hours' => 'nullable|array',
      'timezone' => 'required|string|timezone',
      'is_active' => 'boolean',
    ]);

    $validated['slug'] = Str::slug($validated['name']);
    $validated['user_id'] = auth()->id();

    $restaurant = Restaurant::create($validated);

    return redirect()
      ->route('restaurants.index')
      ->with('success', 'Restaurant created successfully.');
  }

  public function edit(Restaurant $restaurant)
  {
    $this->authorize('update', $restaurant);

    return Inertia::render('Restaurants/Edit', [
      'restaurant' => $restaurant,
    ]);
  }

  public function update(Request $request, Restaurant $restaurant)
  {
    $this->authorize('update', $restaurant);

    $validated = $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'nullable|email|max:255',
      'phone' => 'nullable|string|max:20',
      'address' => 'nullable|string|max:1000',
      'operating_hours' => 'nullable|array',
      'timezone' => 'required|string|timezone',
      'is_active' => 'boolean',
    ]);

    $validated['slug'] = Str::slug($validated['name']);

    $restaurant->update($validated);

    return redirect()
      ->route('restaurants.index')
      ->with('success', 'Restaurant updated successfully.');
  }

  public function destroy(Restaurant $restaurant)
  {
    $this->authorize('delete', $restaurant);

    // Check for related records before deleting
    if (
      $restaurant->tables()->exists() ||
      $restaurant->staff()->exists() ||
      $restaurant->orders()->exists() ||
      $restaurant->menuItems()->exists()
    ) {
      return back()->with('error', 'Cannot delete restaurant with existing relationships.');
    }

    $restaurant->delete();

    return redirect()
      ->route('restaurants.index')
      ->with('success', 'Restaurant deleted successfully.');
  }
}
