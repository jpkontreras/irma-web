<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up(): void
  {
    Schema::create('organizations', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->string('slug')->unique();
      $table->text('description')->nullable();
      $table->boolean('is_active')->default(true);
      $table->timestamps();
      $table->softDeletes();
    });

    Schema::create('organization_user', function (Blueprint $table) {
      $table->id();
      $table->foreignId('organization_id')->constrained()->cascadeOnDelete();
      $table->foreignId('user_id')->constrained()->cascadeOnDelete();
      $table->string('role')->default('member'); // owner, admin, member
      $table->timestamps();

      $table->unique(['organization_id', 'user_id']);
    });

    // Update restaurants table to belong to an organization
    Schema::table('restaurants', function (Blueprint $table) {
      $table->foreignId('organization_id')->nullable()->after('user_id')->constrained();
    });

    // Update menu_items table to belong to an organization instead of restaurant
    Schema::table('menu_items', function (Blueprint $table) {
      $table->foreignId('organization_id')->nullable()->after('restaurant_id')->constrained();
      // Don't drop restaurant_id yet - we'll need it for migration
    });
  }

  public function down(): void
  {
    Schema::table('menu_items', function (Blueprint $table) {
      $table->dropForeign(['organization_id']);
      $table->dropColumn('organization_id');
    });

    Schema::table('restaurants', function (Blueprint $table) {
      $table->dropForeign(['organization_id']);
      $table->dropColumn('organization_id');
    });

    Schema::dropIfExists('organization_user');
    Schema::dropIfExists('organizations');
  }
};
