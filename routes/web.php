<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\UnassignedMenuItemController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('restaurants', RestaurantController::class);
    Route::resource('restaurants.menus', MenuController::class);
    Route::resource('restaurants.menu-items', UnassignedMenuItemController::class);
    Route::get('restaurants/{restaurant}/menus/{menu}/menu-items', [MenuItemController::class, 'index'])
        ->name('restaurants.menus.menu-items.index');
    Route::post('restaurants/{restaurant}/menus/{menu}/menu-items/{menuItem}/attach', [MenuItemController::class, 'attach'])
        ->name('restaurants.menus.menu-items.attach');
    Route::patch('restaurants/{restaurant}/menus/{menu}/menu-items/{menuItem}/settings', [MenuItemController::class, 'updateMenuSettings'])
        ->name('restaurants.menus.menu-items.settings');
    Route::delete('restaurants/{restaurant}/menus/{menu}/menu-items/{menuItem}/detach', [MenuItemController::class, 'detach'])
        ->name('restaurants.menus.menu-items.detach');
});

require __DIR__ . '/auth.php';
