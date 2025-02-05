<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class StaffController extends Controller
{
  /**
   * Display a listing of the staff members.
   */
  public function index(Request $request)
  {
    $staff = Staff::where('restaurant_id', $request->restaurant_id)->get();
    return response()->json($staff);
  }

  /**
   * Store a newly created staff member in storage.
   */
  public function store(Request $request)
  {
    $validated = $request->validate([
      'restaurant_id' => 'required|exists:restaurants,id',
      'name' => 'required|string|max:255',
      'role' => 'required|string|in:waiter,kitchen,admin',
      'pin' => 'required|string|min:4|max:6',
      'status' => 'required|string|in:active,inactive',
    ]);

    // Hash the PIN before storing
    $validated['pin'] = Hash::make($validated['pin']);

    $staff = Staff::create($validated);
    return response()->json($staff, Response::HTTP_CREATED);
  }

  /**
   * Display the specified staff member.
   */
  public function show(Staff $staff)
  {
    return response()->json($staff);
  }

  /**
   * Update the specified staff member in storage.
   */
  public function update(Request $request, Staff $staff)
  {
    $validated = $request->validate([
      'name' => 'sometimes|string|max:255',
      'role' => 'sometimes|string|in:waiter,kitchen,admin',
      'pin' => 'sometimes|string|min:4|max:6',
      'status' => 'sometimes|string|in:active,inactive',
    ]);

    // Hash the PIN if it's being updated
    if (isset($validated['pin'])) {
      $validated['pin'] = Hash::make($validated['pin']);
    }

    $staff->update($validated);
    return response()->json($staff);
  }

  /**
   * Remove the specified staff member from storage.
   */
  public function destroy(Staff $staff)
  {
    $staff->delete();
    return response()->json(null, Response::HTTP_NO_CONTENT);
  }

  /**
   * Authenticate staff member using PIN.
   */
  public function authenticate(Request $request)
  {
    $validated = $request->validate([
      'restaurant_id' => 'required|exists:restaurants,id',
      'pin' => 'required|string',
    ]);

    $staff = Staff::where('restaurant_id', $validated['restaurant_id'])
      ->where('status', 'active')
      ->get();

    foreach ($staff as $member) {
      if (Hash::check($validated['pin'], $member->pin)) {
        return response()->json([
          'staff' => $member,
          'message' => 'Authentication successful'
        ]);
      }
    }

    return response()->json([
      'message' => 'Invalid PIN'
    ], Response::HTTP_UNAUTHORIZED);
  }
}
