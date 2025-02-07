<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use App\Models\Restaurant;
use App\Services\MenuItemService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class UnassignedMenuItemController extends Controller
{
  protected $menuItemService;

  public function __construct(MenuItemService $menuItemService)
  {
    $this->menuItemService = $menuItemService;
  }

  public function index(Request $request, Restaurant $restaurant)
  {
    Gate::authorize('view', $restaurant);

    $menuItems = $this->menuItemService->getMenuItems($restaurant);
    $categories = $this->menuItemService->getCategories($restaurant);

    return Inertia::render('MenuItems/Index', [
      'restaurant' => $restaurant,
      'menuItems' => $menuItems,
      'categories' => $categories,
    ]);
  }

  public function create(Request $request, Restaurant $restaurant)
  {
    Gate::authorize('update', $restaurant);

    $categories = $this->menuItemService->getCategories($restaurant);

    return Inertia::render('MenuItems/Create', [
      'restaurant' => $restaurant,
      'categories' => $categories,
    ]);
  }

  public function store(Request $request, Restaurant $restaurant)
  {
    Gate::authorize('update', $restaurant);

    // Create the slug before validation
    $slug = Str::slug($request->name);

    $validated = $request->validate([
      'name' => [
        'required',
        'string',
        'max:255',
      ],
      'slug' => [
        'required',
        Rule::unique('menu_items')
          ->where('restaurant_id', $restaurant->id)
          ->whereNull('deleted_at')
      ],
      'description' => ['nullable', 'string'],
      'price' => ['required', 'numeric', 'min:0'],
      'category' => ['required', 'string', 'max:255'],
      'is_available' => ['boolean'],
      'preparation_time' => ['nullable', 'integer', 'min:0'],
      'notes' => ['nullable', 'string'],
      'options' => ['nullable', 'array'],
    ]);

    // Add the slug to validated data
    $validated['slug'] = $slug;

    $menuItem = $this->menuItemService->createMenuItem($validated, $restaurant);

    return redirect()->route('restaurants.menu-items.show', [
      $restaurant->id,
      $menuItem->id,
    ]);
  }

  public function show(Restaurant $restaurant, MenuItem $menuItem)
  {
    Gate::authorize('view', $restaurant);

    return Inertia::render('MenuItems/Show', [
      'restaurant' => $restaurant,
      'menuItem' => $menuItem,
    ]);
  }

  public function edit(Restaurant $restaurant, MenuItem $menuItem)
  {
    Gate::authorize('update', $restaurant);

    $categories = $this->menuItemService->getCategories($restaurant);

    return Inertia::render('MenuItems/Edit', [
      'restaurant' => $restaurant,
      'menuItem' => $menuItem,
      'categories' => $categories,
    ]);
  }

  public function update(Request $request, Restaurant $restaurant, MenuItem $menuItem)
  {
    Gate::authorize('update', $restaurant);

    // Create the slug before validation
    $slug = Str::slug($request->name);

    $validated = $request->validate([
      'name' => [
        'required',
        'string',
        'max:255',
      ],
      'slug' => [
        'required',
        Rule::unique('menu_items')
          ->where('restaurant_id', $restaurant->id)
          ->whereNull('deleted_at')
          ->ignore($menuItem->id)
      ],
      'description' => ['nullable', 'string'],
      'price' => ['required', 'numeric', 'min:0'],
      'category' => ['required', 'string', 'max:255'],
      'is_available' => ['boolean'],
      'preparation_time' => ['nullable', 'integer', 'min:0'],
      'notes' => ['nullable', 'string'],
      'options' => ['nullable', 'array'],
    ]);

    // Add the slug to validated data
    $validated['slug'] = $slug;

    $this->menuItemService->updateMenuItem($menuItem, $validated);

    return redirect()->route('restaurants.menu-items.show', [
      $restaurant->id,
      $menuItem->id,
    ]);
  }

  public function destroy(Restaurant $restaurant, MenuItem $menuItem)
  {
    Gate::authorize('update', $restaurant);

    $menuItem->delete();

    return redirect()->route('restaurants.menu-items.index', $restaurant->id);
  }
}
