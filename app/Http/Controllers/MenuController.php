<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class MenuController extends Controller
{
  public function index(Request $request, Restaurant $restaurant)
  {
    if ($request->user()->cannot('view', $restaurant)) {
      abort(403);
    }

    return Inertia::render('Menus/Index', [
      'restaurant' => $restaurant->load('menus'),
      'menus' => $restaurant->menus()->with('menuItems')->paginate(10)
    ]);
  }

  public function create(Request $request, Restaurant $restaurant)
  {
    if ($request->user()->cannot('update', $restaurant)) {
      abort(403);
    }

    return Inertia::render('Menus/Create', [
      'restaurant' => $restaurant
    ]);
  }

  public function store(Request $request, Restaurant $restaurant)
  {
    if ($request->user()->cannot('update', $restaurant)) {
      abort(403);
    }

    $validated = $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'nullable|string',
      'type' => 'nullable|string',
      'is_active' => 'boolean',
      'available_from' => 'nullable|date_format:H:i',
      'available_until' => 'nullable|date_format:H:i',
      'available_days' => 'nullable|array',
    ]);

    $validated['slug'] = Str::slug($validated['name']);
    $restaurant->menus()->create($validated);

    return redirect()->route('restaurants.menus.index', $restaurant)
      ->with('success', 'Menu created successfully.');
  }

  public function edit(Request $request, Restaurant $restaurant, Menu $menu)
  {
    if ($request->user()->cannot('update', $menu)) {
      abort(403);
    }

    return Inertia::render('Menus/Edit', [
      'restaurant' => $restaurant,
      'menu' => $menu
    ]);
  }

  public function update(Request $request, Restaurant $restaurant, Menu $menu)
  {
    if ($request->user()->cannot('update', $menu)) {
      abort(403);
    }

    $validated = $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'nullable|string',
      'type' => 'nullable|string',
      'is_active' => 'boolean',
      'available_from' => 'nullable|date_format:H:i',
      'available_until' => 'nullable|date_format:H:i',
      'available_days' => 'nullable|array',
    ]);

    $validated['slug'] = Str::slug($validated['name']);
    $menu->update($validated);

    return redirect()->route('restaurants.menus.index', $restaurant)
      ->with('success', 'Menu updated successfully.');
  }

  public function destroy(Restaurant $restaurant, Menu $menu)
  {
    if ($request->user()->cannot('delete', $menu)) {
      abort(403);
    }

    $menu->delete();

    return redirect()->route('restaurants.menus.index', $restaurant)
      ->with('success', 'Menu deleted successfully.');
  }

  public function show(Request $request, Restaurant $restaurant, Menu $menu)
  {
    if ($request->user()->cannot('view', $menu)) {
      abort(403);
    }

    return Inertia::render('Menus/Show', [
      'restaurant' => $restaurant,
      'menu' => $menu
    ]);
  }
}
