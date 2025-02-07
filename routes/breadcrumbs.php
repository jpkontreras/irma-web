<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;
use App\Models\Restaurant;
use App\Models\Menu;
use App\Models\MenuItem;

// Dashboard
Breadcrumbs::for('dashboard', function (BreadcrumbTrail $trail) {
  $trail->push('Dashboard', route('dashboard'));
});

// Dashboard > Restaurants
Breadcrumbs::for('restaurants.index', function (BreadcrumbTrail $trail) {
  $trail->parent('dashboard');
  $trail->push('Restaurants', route('restaurants.index'));
});

// Dashboard > Restaurants > [Restaurant]
Breadcrumbs::for('restaurants.show', function (BreadcrumbTrail $trail, $restaurant) {
  $trail->parent('restaurants.index');
  if (is_string($restaurant) || is_numeric($restaurant)) {
    $restaurant = Restaurant::findOrFail($restaurant);
  }
  $trail->push($restaurant->name, route('restaurants.show', $restaurant));
});

// Dashboard > Restaurants > Create Restaurant
Breadcrumbs::for('restaurants.create', function (BreadcrumbTrail $trail) {
  $trail->parent('restaurants.index');
  $trail->push('Create Restaurant', route('restaurants.create'));
});

// Dashboard > Restaurants > [Restaurant] > Edit
Breadcrumbs::for('restaurants.edit', function (BreadcrumbTrail $trail, $restaurant) {
  if (is_string($restaurant) || is_numeric($restaurant)) {
    $restaurant = Restaurant::findOrFail($restaurant);
  }
  $trail->parent('restaurants.show', $restaurant);
  $trail->push('Edit', route('restaurants.edit', $restaurant));
});

// Dashboard > Restaurants > [Restaurant] > Menus
Breadcrumbs::for('restaurants.menus.index', function (BreadcrumbTrail $trail, Restaurant $restaurant) {
  $trail->parent('restaurants.show', $restaurant);
  $trail->push('Menus', route('restaurants.menus.index', $restaurant));
});

// Dashboard > Restaurants > [Restaurant] > Create Menu
Breadcrumbs::for('restaurants.menus.create', function (BreadcrumbTrail $trail, Restaurant $restaurant) {
  $trail->parent('restaurants.show', $restaurant);
  $trail->push('Create Menu', route('restaurants.menus.create', $restaurant));
});

// Dashboard > Restaurants > [Restaurant] > [Menu]
Breadcrumbs::for('restaurants.menus.show', function (BreadcrumbTrail $trail, Restaurant $restaurant, Menu $menu) {
  $trail->parent('restaurants.show', $restaurant);
  $trail->push($menu->name, route('restaurants.menus.show', [$restaurant, $menu]));
});

// Dashboard > Restaurants > [Restaurant] > [Menu] > Edit
Breadcrumbs::for('restaurants.menus.edit', function (BreadcrumbTrail $trail, Restaurant $restaurant, Menu $menu) {
  $trail->parent('restaurants.menus.show', $restaurant, $menu);
  $trail->push('Edit', route('restaurants.menus.edit', [$restaurant, $menu]));
});

// Dashboard > Restaurants > [Restaurant] > Menu Items
Breadcrumbs::for('restaurants.menu-items.index', function (BreadcrumbTrail $trail, Restaurant $restaurant) {
  $trail->parent('restaurants.show', $restaurant);
  $trail->push('Menu Items', route('restaurants.menu-items.index', $restaurant));
});

// Dashboard > Restaurants > [Restaurant] > Menu Items > Create
Breadcrumbs::for('restaurants.menu-items.create', function (BreadcrumbTrail $trail, Restaurant $restaurant) {
  $trail->parent('restaurants.menu-items.index', $restaurant);
  $trail->push('Create Item', route('restaurants.menu-items.create', $restaurant));
});

// Dashboard > Restaurants > [Restaurant] > Menu Items > [MenuItem]
Breadcrumbs::for('restaurants.menu-items.show', function (BreadcrumbTrail $trail, Restaurant $restaurant, $menuItem) {
  $trail->parent('restaurants.menu-items.index', $restaurant);
  if (is_string($menuItem) || is_numeric($menuItem)) {
    $menuItem = MenuItem::findOrFail($menuItem);
  }
  $trail->push($menuItem->name, route('restaurants.menu-items.show', [$restaurant, $menuItem]));
});

// Dashboard > Restaurants > [Restaurant] > Menu Items > [MenuItem] > Edit
Breadcrumbs::for('restaurants.menu-items.edit', function (BreadcrumbTrail $trail, Restaurant $restaurant, $menuItem) {
  if (is_string($menuItem) || is_numeric($menuItem)) {
    $menuItem = MenuItem::findOrFail($menuItem);
  }
  $trail->parent('restaurants.menu-items.show', $restaurant, $menuItem);
  $trail->push('Edit', route('restaurants.menu-items.edit', [$restaurant, $menuItem]));
});

// Dashboard > Restaurants > [Restaurant] > [Menu] > Menu Items
Breadcrumbs::for('restaurants.menus.menu-items.index', function (BreadcrumbTrail $trail, Restaurant $restaurant, Menu $menu) {
  $trail->parent('restaurants.menus.show', $restaurant, $menu);
  $trail->push('Menu Items', route('restaurants.menus.menu-items.index', [$restaurant, $menu]));
});

// Dashboard > Restaurants > [Restaurant] > [Menu] > Menu Items > [MenuItem]
Breadcrumbs::for('restaurants.menus.menu-items.show', function (BreadcrumbTrail $trail, Restaurant $restaurant, Menu $menu, MenuItem $menuItem) {
  $trail->parent('restaurants.menus.menu-items.index', $restaurant, $menu);
  $trail->push($menuItem->name, route('restaurants.menu-items.show', [$restaurant, $menuItem]));
});

// Dashboard > Restaurants > [Restaurant] > [Menu] > Menu Items > [MenuItem] > Edit
Breadcrumbs::for('restaurants.menus.menu-items.edit', function (BreadcrumbTrail $trail, Restaurant $restaurant, Menu $menu, MenuItem $menuItem) {
  $trail->parent('restaurants.menus.menu-items.show', $restaurant, $menu, $menuItem);
  $trail->push('Edit', route('restaurants.menu-items.edit', [$restaurant, $menuItem]));
});

// Dashboard > Restaurants > [Restaurant] > [Menu] > Menu Items > Create
Breadcrumbs::for('restaurants.menus.menu-items.create', function (BreadcrumbTrail $trail, Restaurant $restaurant, Menu $menu) {
  $trail->parent('restaurants.menus.menu-items.index', $restaurant, $menu);
  $trail->push('Create Item', route('restaurants.menu-items.create', [$restaurant]));
});
