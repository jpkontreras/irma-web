<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;
use App\Models\Restaurant;

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
