<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up(): void
  {
    Schema::create('menus', function (Blueprint $table) {
      $table->id();
      $table->foreignId('restaurant_id')->constrained()->cascadeOnDelete();

      // Menu information
      $table->string('name');
      $table->string('slug')->unique();
      $table->text('description')->nullable();
      $table->string('type')->nullable()->comment('e.g., lunch, dinner, special, seasonal');
      $table->boolean('is_active')->default(true);

      // Time constraints
      $table->time('available_from')->nullable();
      $table->time('available_until')->nullable();
      $table->json('available_days')->nullable()->comment('Days of week when menu is available');

      // Menu structure
      $table->json('categories_order')->nullable()->comment('Ordered list of categories for display');

      $table->timestamps();
      $table->softDeletes();

      // Indexes
      $table->index('type');
      $table->index('is_active');
      $table->index(['restaurant_id', 'type']);
    });
  }

  public function down(): void
  {
    Schema::dropIfExists('menus');
  }
};
