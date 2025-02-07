<?php

namespace App\Services;

use App\Models\MenuItem;
use App\Models\Restaurant;
use App\Models\Menu;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class MenuItemService
{
  public function getMenuItems(Restaurant $restaurant, ?Menu $menu = null): LengthAwarePaginator
  {
    $query = $menu ? $menu->menuItems() : $restaurant->menuItems();

    return $query
      ->orderBy('category')
      ->orderBy('name')
      ->paginate();
  }

  public function getCategories(Restaurant $restaurant, ?Menu $menu = null): Collection
  {
    $query = $menu ? $menu->menuItems() : $restaurant->menuItems();

    return $query
      ->select('category')
      ->distinct()
      ->pluck('category')
      ->filter()
      ->values();
  }

  public function createMenuItem(array $validated, Restaurant $restaurant): MenuItem
  {
    $validated['restaurant_id'] = $restaurant->id;
    return MenuItem::create($validated);
  }

  public function updateMenuItem(MenuItem $menuItem, array $validated): void
  {
    $menuItem->update($validated);
  }

  public function attachToMenu(Menu $menu, MenuItem $menuItem, array $validated): void
  {
    $menu->menuItems()->attach($menuItem->id, $validated);
  }

  public function updateMenuSettings(Menu $menu, MenuItem $menuItem, array $validated): void
  {
    $menu->menuItems()->updateExistingPivot($menuItem->id, $validated);
  }

  public function detachFromMenu(Menu $menu, MenuItem $menuItem): void
  {
    $menu->menuItems()->detach($menuItem->id);
  }
}
