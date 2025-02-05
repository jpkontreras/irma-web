<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MenuItemController extends Controller
{
  /**
   * Display a listing of the menu items.
   */
  public function index(Request $request)
  {
    $menuItems = MenuItem::where('restaurant_id', $request->restaurant_id)
      ->when($request->category, function ($query, $category) {
        return $query->where('category', $category);
      })
      ->when($request->has('is_available'), function ($query) use ($request) {
        return $query->where('is_available', $request->boolean('is_available'));
      })
      ->get();

    return response()->json($menuItems);
  }

  /**
   * Store a newly created menu item in storage.
   */
  public function store(Request $request)
  {
    $validated = $request->validate([
      'restaurant_id' => 'required|exists:restaurants,id',
      'name' => 'required|string|max:255',
      'description' => 'nullable|string',
      'price' => 'required|numeric|min:0',
      'category' => 'required|string|max:50',
      'preparation_time' => 'nullable|integer|min:0',
      'is_available' => 'required|boolean',
    ]);

    $menuItem = MenuItem::create($validated);
    return response()->json($menuItem, Response::HTTP_CREATED);
  }

  /**
   * Display the specified menu item.
   */
  public function show(MenuItem $menuItem)
  {
    return response()->json($menuItem);
  }

  /**
   * Update the specified menu item in storage.
   */
  public function update(Request $request, MenuItem $menuItem)
  {
    $validated = $request->validate([
      'name' => 'sometimes|string|max:255',
      'description' => 'nullable|string',
      'price' => 'sometimes|numeric|min:0',
      'category' => 'sometimes|string|max:50',
      'preparation_time' => 'nullable|integer|min:0',
      'is_available' => 'sometimes|boolean',
    ]);

    $menuItem->update($validated);
    return response()->json($menuItem);
  }

  /**
   * Remove the specified menu item from storage.
   */
  public function destroy(MenuItem $menuItem)
  {
    $menuItem->delete();
    return response()->json(null, Response::HTTP_NO_CONTENT);
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
