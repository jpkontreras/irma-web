<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RestaurantController extends Controller
{
  /**
   * Display a listing of the restaurants.
   */
  public function index()
  {
    $restaurants = Restaurant::all();
    return response()->json($restaurants);
  }

  /**
   * Store a newly created restaurant in storage.
   */
  public function store(Request $request)
  {
    $validated = $request->validate([
      'name' => 'required|string|max:255',
      'address' => 'required|string',
      'phone' => 'required|string|max:20',
      'email' => 'required|email',
      'status' => 'required|string|in:active,inactive',
    ]);

    $restaurant = Restaurant::create($validated);
    return response()->json($restaurant, Response::HTTP_CREATED);
  }

  /**
   * Display the specified restaurant.
   */
  public function show(Restaurant $restaurant)
  {
    return response()->json($restaurant);
  }

  /**
   * Update the specified restaurant in storage.
   */
  public function update(Request $request, Restaurant $restaurant)
  {
    $validated = $request->validate([
      'name' => 'sometimes|string|max:255',
      'address' => 'sometimes|string',
      'phone' => 'sometimes|string|max:20',
      'email' => 'sometimes|email',
      'status' => 'sometimes|string|in:active,inactive',
    ]);

    $restaurant->update($validated);
    return response()->json($restaurant);
  }

  /**
   * Remove the specified restaurant from storage.
   */
  public function destroy(Restaurant $restaurant)
  {
    $restaurant->delete();
    return response()->json(null, Response::HTTP_NO_CONTENT);
  }
}
