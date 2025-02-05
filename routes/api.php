<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\OrderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

// Restaurant routes
Route::apiResource('restaurants', RestaurantController::class);

// Staff routes
Route::post('staff/authenticate', [StaffController::class, 'authenticate']);
Route::apiResource('staff', StaffController::class);

// Table routes
Route::patch('tables/{table}/status', [TableController::class, 'updateStatus']);
Route::apiResource('tables', TableController::class);

// Menu Item routes
Route::patch('menu-items/{menuItem}/toggle-availability', [MenuItemController::class, 'toggleAvailability']);
Route::post('menu-items/bulk-update-availability', [MenuItemController::class, 'bulkUpdateAvailability']);
Route::apiResource('menu-items', MenuItemController::class);

// Order routes
Route::get('kitchen-display', [OrderController::class, 'kitchenDisplay']);
Route::patch('orders/{order}/status', [OrderController::class, 'updateStatus']);
Route::post('orders/{order}/items', [OrderController::class, 'addItems']);
Route::delete('orders/{order}/items/{orderItem}', [OrderController::class, 'removeItem']);
Route::apiResource('orders', OrderController::class);
