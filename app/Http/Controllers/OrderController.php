<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
  /**
   * Display a listing of the orders.
   */
  public function index(Request $request)
  {
    $orders = Order::where('restaurant_id', $request->restaurant_id)
      ->when($request->status, function ($query, $status) {
        return $query->where('status', $status);
      })
      ->when($request->table_id, function ($query, $tableId) {
        return $query->where('table_id', $tableId);
      })
      ->with(['table', 'staff', 'orderItems.menuItem'])
      ->latest()
      ->get();

    return response()->json($orders);
  }

  /**
   * Store a newly created order in storage.
   */
  public function store(Request $request)
  {
    $validated = $request->validate([
      'restaurant_id' => 'required|exists:restaurants,id',
      'table_id' => 'required|exists:tables,id',
      'staff_id' => 'required|exists:staff,id',
      'notes' => 'nullable|string',
      'items' => 'required|array|min:1',
      'items.*.menu_item_id' => 'required|exists:menu_items,id',
      'items.*.quantity' => 'required|integer|min:1',
      'items.*.notes' => 'nullable|string',
    ]);

    try {
      DB::beginTransaction();

      // Create the order
      $order = Order::create([
        'restaurant_id' => $validated['restaurant_id'],
        'table_id' => $validated['table_id'],
        'staff_id' => $validated['staff_id'],
        'status' => 'pending',
        'notes' => $validated['notes'],
        'total_amount' => 0,
      ]);

      $totalAmount = 0;

      // Create order items
      foreach ($validated['items'] as $item) {
        $menuItem = \App\Models\MenuItem::findOrFail($item['menu_item_id']);
        $subtotal = $menuItem->price * $item['quantity'];
        $totalAmount += $subtotal;

        OrderItem::create([
          'order_id' => $order->id,
          'menu_item_id' => $item['menu_item_id'],
          'quantity' => $item['quantity'],
          'unit_price' => $menuItem->price,
          'subtotal' => $subtotal,
          'notes' => $item['notes'] ?? null,
        ]);
      }

      // Update order total
      $order->update(['total_amount' => $totalAmount]);

      DB::commit();

      return response()->json(
        $order->load(['table', 'staff', 'orderItems.menuItem']),
        Response::HTTP_CREATED
      );
    } catch (\Exception $e) {
      DB::rollBack();
      throw $e;
    }
  }

  /**
   * Display the specified order.
   */
  public function show(Order $order)
  {
    return response()->json(
      $order->load(['table', 'staff', 'orderItems.menuItem'])
    );
  }

  /**
   * Update the specified order status.
   */
  public function updateStatus(Request $request, Order $order)
  {
    $validated = $request->validate([
      'status' => 'required|string|in:pending,preparing,ready,completed,cancelled',
    ]);

    $order->update(['status' => $validated['status']]);

    return response()->json(
      $order->load(['table', 'staff', 'orderItems.menuItem'])
    );
  }

  /**
   * Add items to an existing order.
   */
  public function addItems(Request $request, Order $order)
  {
    if ($order->status !== 'pending') {
      return response()->json([
        'message' => 'Can only add items to pending orders'
      ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    $validated = $request->validate([
      'items' => 'required|array|min:1',
      'items.*.menu_item_id' => 'required|exists:menu_items,id',
      'items.*.quantity' => 'required|integer|min:1',
      'items.*.notes' => 'nullable|string',
    ]);

    try {
      DB::beginTransaction();

      $totalAmount = $order->total_amount;

      foreach ($validated['items'] as $item) {
        $menuItem = \App\Models\MenuItem::findOrFail($item['menu_item_id']);
        $subtotal = $menuItem->price * $item['quantity'];
        $totalAmount += $subtotal;

        OrderItem::create([
          'order_id' => $order->id,
          'menu_item_id' => $item['menu_item_id'],
          'quantity' => $item['quantity'],
          'unit_price' => $menuItem->price,
          'subtotal' => $subtotal,
          'notes' => $item['notes'] ?? null,
        ]);
      }

      $order->update(['total_amount' => $totalAmount]);

      DB::commit();

      return response()->json(
        $order->load(['table', 'staff', 'orderItems.menuItem'])
      );
    } catch (\Exception $e) {
      DB::rollBack();
      throw $e;
    }
  }

  /**
   * Remove an item from an order.
   */
  public function removeItem(Request $request, Order $order, OrderItem $orderItem)
  {
    if ($order->status !== 'pending') {
      return response()->json([
        'message' => 'Can only remove items from pending orders'
      ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    if ($orderItem->order_id !== $order->id) {
      return response()->json([
        'message' => 'Order item does not belong to this order'
      ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    try {
      DB::beginTransaction();

      $order->update([
        'total_amount' => $order->total_amount - $orderItem->subtotal
      ]);

      $orderItem->delete();

      DB::commit();

      return response()->json(
        $order->load(['table', 'staff', 'orderItems.menuItem'])
      );
    } catch (\Exception $e) {
      DB::rollBack();
      throw $e;
    }
  }

  /**
   * Get kitchen display orders.
   */
  public function kitchenDisplay(Request $request)
  {
    $orders = Order::where('restaurant_id', $request->restaurant_id)
      ->whereIn('status', ['pending', 'preparing'])
      ->with(['table', 'staff', 'orderItems.menuItem'])
      ->orderBy('created_at')
      ->get();

    return response()->json($orders);
  }
}
