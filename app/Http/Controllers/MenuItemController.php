<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use App\Models\Restaurant;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class MenuItemController extends Controller
{
  /**
   * Display a listing of the menu items.
   */
  public function index(Request $request, Restaurant $restaurant, Menu $menu = null)
  {
    if ($request->user()->cannot('view', $restaurant)) {
      abort(403);
    }

    $query = $menu ? $menu->menuItems() : $restaurant->menuItems();

    $menuItems = $query
      ->orderBy('category')
      ->orderBy('name')
      ->paginate();

    $categories = $query
      ->select('category')
      ->distinct()
      ->pluck('category')
      ->filter()
      ->values();

    return Inertia::render('MenuItems/Index', [
      'restaurant' => $restaurant,
      'menu' => $menu,
      'menuItems' => $menuItems,
      'categories' => $categories,
    ]);
  }

  /**
   * Show the form for creating a new menu item.
   */
  public function create(Request $request, Restaurant $restaurant, Menu $menu = null)
  {
    if ($request->user()->cannot('update', $restaurant)) {
      abort(403);
    }

    $categories = $restaurant->menuItems()
      ->select('category')
      ->distinct()
      ->pluck('category')
      ->filter()
      ->values();

    return Inertia::render('MenuItems/Create', [
      'restaurant' => $restaurant,
      'menu' => $menu,
      'categories' => $categories,
    ]);
  }

  /**
   * Store a newly created menu item in storage.
   */
  public function store(Request $request, Restaurant $restaurant, Menu $menu = null)
  {
    if ($request->user()->cannot('update', $restaurant)) {
      abort(403);
    }

    $validated = $request->validate([
      'name' => ['required', 'string', 'max:255'],
      'description' => ['nullable', 'string'],
      'price' => ['required', 'numeric', 'min:0'],
      'category' => ['required', 'string', 'max:255'],
      'is_available' => ['boolean'],
      'preparation_time' => ['nullable', 'integer', 'min:0'],
      'notes' => ['nullable', 'string'],
      'options' => ['nullable', 'array'],
      'display_order' => ['nullable', 'integer', 'min:0'],
      'special_price' => ['nullable', 'numeric', 'min:0'],
    ]);

    $validated['slug'] = Str::slug($validated['name']);
    $validated['restaurant_id'] = $restaurant->id;

    $menuItem = MenuItem::create($validated);

    if ($menu) {
      $menu->menuItems()->attach($menuItem->id, [
        'display_order' => $validated['display_order'] ?? null,
        'special_price' => $validated['special_price'] ?? null,
      ]);
    }

    return redirect()->route('restaurants.menu-items.show', [
      $restaurant->id,
      $menuItem->id,
    ]);
  }

  /**
   * Attach menu item to menu.
   */
  public function attach(Request $request, Restaurant $restaurant, Menu $menu, MenuItem $menuItem)
  {
    if ($request->user()->cannot('update', $restaurant)) {
      abort(403);
    }

    $validated = $request->validate([
      'display_order' => ['nullable', 'integer', 'min:0'],
      'special_price' => ['nullable', 'numeric', 'min:0'],
    ]);

    $menu->menuItems()->attach($menuItem->id, $validated);

    return back();
  }

  /**
   * Update menu item's menu settings.
   */
  public function updateMenuSettings(Request $request, Restaurant $restaurant, Menu $menu, MenuItem $menuItem)
  {
    if ($request->user()->cannot('update', $restaurant)) {
      abort(403);
    }

    $validated = $request->validate([
      'display_order' => ['nullable', 'integer', 'min:0'],
      'special_price' => ['nullable', 'numeric', 'min:0'],
    ]);

    $menu->menuItems()->updateExistingPivot($menuItem->id, $validated);

    return back();
  }

  /**
   * Detach menu item from menu.
   */
  public function detach(Restaurant $restaurant, Menu $menu, MenuItem $menuItem)
  {
    if ($request->user()->cannot('update', $restaurant)) {
      abort(403);
    }

    $menu->menuItems()->detach($menuItem->id);

    return back();
  }

  /**
   * Display the specified menu item.
   */
  public function show(Restaurant $restaurant, MenuItem $menuItem)
  {
    $this->authorize('view', $restaurant);

    return Inertia::render('MenuItems/Show', [
      'restaurant' => $restaurant,
      'menuItem' => $menuItem,
    ]);
  }

  /**
   * Show the form for editing the specified menu item.
   */
  public function edit(Restaurant $restaurant, MenuItem $menuItem)
  {
    $this->authorize('update', $restaurant);

    $categories = $restaurant->menuItems()
      ->select('category')
      ->distinct()
      ->pluck('category')
      ->filter()
      ->values();

    return Inertia::render('MenuItems/Edit', [
      'restaurant' => $restaurant,
      'menuItem' => $menuItem,
      'categories' => $categories,
    ]);
  }

  /**
   * Update the specified menu item in storage.
   */
  public function update(Request $request, Restaurant $restaurant, MenuItem $menuItem)
  {
    $this->authorize('update', $restaurant);

    $validated = $request->validate([
      'name' => ['required', 'string', 'max:255'],
      'description' => ['nullable', 'string'],
      'price' => ['required', 'numeric', 'min:0'],
      'category' => ['required', 'string', 'max:255'],
      'is_available' => ['boolean'],
      'preparation_time' => ['nullable', 'integer', 'min:0'],
      'notes' => ['nullable', 'string'],
      'options' => ['nullable', 'array'],
    ]);

    $validated['slug'] = Str::slug($validated['name']);

    $menuItem->update($validated);

    return redirect()->route('restaurants.menu-items.show', [
      $restaurant->id,
      $menuItem->id,
    ]);
  }

  /**
   * Remove the specified menu item from storage.
   */
  public function destroy(Restaurant $restaurant, MenuItem $menuItem)
  {
    $this->authorize('update', $restaurant);

    $menuItem->delete();

    return redirect()->route('restaurants.menu-items.index', $restaurant->id);
  }

  /**
   * Toggle menu item availability.
   */
  public function toggleAvailability(MenuItem $menuItem)
  {
    $menuItem->update([
      'is_available' => !$menuItem->is_available
    ]);

    return response()->json($menuItem);
  }

  /**
   * Bulk update menu items availability.
   */
  public function bulkUpdateAvailability(Request $request)
  {
    $validated = $request->validate([
      'menu_item_ids' => 'required|array',
      'menu_item_ids.*' => 'exists:menu_items,id',
      'is_available' => 'required|boolean',
    ]);

    MenuItem::whereIn('id', $validated['menu_item_ids'])
      ->update(['is_available' => $validated['is_available']]);

    return response()->json([
      'message' => 'Menu items availability updated successfully'
    ]);
  }
}
