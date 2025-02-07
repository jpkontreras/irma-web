<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;
use App\Models\Restaurant;
use App\Models\Menu;

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
