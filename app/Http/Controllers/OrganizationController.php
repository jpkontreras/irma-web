<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OrganizationController extends Controller
{
  public function index()
  {
    $organizations = Organization::whereHas('users', function ($query) {
      $query->where('users.id', auth()->id());
    })->paginate(10);

    return Inertia::render('Organizations/Index', [
      'organizations' => $organizations,
    ]);
  }

  public function create()
  {
    return Inertia::render('Organizations/Create');
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'nullable|string',
      'is_active' => 'boolean',
    ]);

    $validated['slug'] = Str::slug($validated['name']);

    $organization = Organization::create($validated);

    // Add current user as owner
    $organization->users()->attach(auth()->id(), ['role' => 'owner']);

    return redirect()
      ->route('organizations.index')
      ->with('success', 'Organization created successfully.');
  }

  public function show(Organization $organization)
  {
    $this->authorize('view', $organization);

    return Inertia::render('Organizations/Show', [
      'organization' => $organization->load(['restaurants', 'menuItems']),
    ]);
  }

  public function edit(Organization $organization)
  {
    $this->authorize('update', $organization);

    return Inertia::render('Organizations/Edit', [
      'organization' => $organization,
    ]);
  }

  public function update(Request $request, Organization $organization)
  {
    $this->authorize('update', $organization);

    $validated = $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'nullable|string',
      'is_active' => 'boolean',
    ]);

    $validated['slug'] = Str::slug($validated['name']);

    $organization->update($validated);

    return redirect()
      ->route('organizations.show', $organization)
      ->with('success', 'Organization updated successfully.');
  }

  public function destroy(Organization $organization)
  {
    $this->authorize('delete', $organization);

    if ($organization->restaurants()->exists() || $organization->menuItems()->exists()) {
      return back()->with('error', 'Cannot delete organization with existing relationships.');
    }

    $organization->delete();

    return redirect()
      ->route('organizations.index')
      ->with('success', 'Organization deleted successfully.');
  }
}
