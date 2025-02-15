<?php

namespace App\Policies;

use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class RestaurantPolicy
{
  /**
   * Determine whether the user can view any models.
   */
  public function viewAny(User $user): bool
  {
    return true; // Anyone can view the list of restaurants
  }

  /**
   * Determine whether the user can view the model.
   */
  public function view(User $user, Restaurant $restaurant): bool
  {
    return true; // Anyone can view restaurant details
  }

  /**
   * Determine whether the user can create models.
   */
  public function create(User $user): bool
  {
    return true; // Any authenticated user can create a restaurant
  }

  /**
   * Determine whether the user can update the model.
   */
  public function update(User $user, Restaurant $restaurant): Response
  {
    return $user->id === $restaurant->user_id
      ? Response::allow()
      : Response::deny('You do not own this restaurant.');
  }

  /**
   * Determine whether the user can delete the model.
   */
  public function delete(User $user, Restaurant $restaurant): Response
  {
    return $user->id === $restaurant->user_id
      ? Response::allow()
      : Response::deny('You do not own this restaurant.');
  }
}
