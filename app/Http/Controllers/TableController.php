<?php

namespace App\Http\Controllers;

use App\Models\Table;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TableController extends Controller
{
  /**
   * Display a listing of the tables.
   */
  public function index(Request $request)
  {
    $tables = Table::where('restaurant_id', $request->restaurant_id)
      ->with(['orders' => function ($query) {
        $query->where('status', '!=', 'completed')
          ->latest();
      }])
      ->get();
    return response()->json($tables);
  }

  /**
   * Store a newly created table in storage.
   */
  public function store(Request $request)
  {
    $validated = $request->validate([
      'restaurant_id' => 'required|exists:restaurants,id',
      'name' => 'required|string|max:255',
      'capacity' => 'required|integer|min:1',
      'location' => 'required|string|in:interior,exterior,bar',
      'status' => 'required|string|in:available,occupied,reserved,unavailable',
    ]);

    $table = Table::create($validated);
    return response()->json($table, Response::HTTP_CREATED);
  }

  /**
   * Display the specified table.
   */
  public function show(Table $table)
  {
    return response()->json($table->load(['orders' => function ($query) {
      $query->where('status', '!=', 'completed')
        ->latest();
    }]));
  }

  /**
   * Update the specified table in storage.
   */
  public function update(Request $request, Table $table)
  {
    $validated = $request->validate([
      'name' => 'sometimes|string|max:255',
      'capacity' => 'sometimes|integer|min:1',
      'location' => 'sometimes|string|in:interior,exterior,bar',
      'status' => 'sometimes|string|in:available,occupied,reserved,unavailable',
    ]);

    $table->update($validated);
    return response()->json($table);
  }

  /**
   * Remove the specified table from storage.
   */
  public function destroy(Table $table)
  {
    $table->delete();
    return response()->json(null, Response::HTTP_NO_CONTENT);
  }

  /**
   * Update table status.
   */
  public function updateStatus(Request $request, Table $table)
  {
    $validated = $request->validate([
      'status' => 'required|string|in:available,occupied,reserved,unavailable',
    ]);

    $table->update(['status' => $validated['status']]);
    return response()->json($table);
  }
}
