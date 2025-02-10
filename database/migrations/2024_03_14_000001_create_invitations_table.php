<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up(): void
  {
    Schema::create('invitations', function (Blueprint $table) {
      $table->id();
      $table->foreignId('organization_id')->constrained()->cascadeOnDelete();
      $table->string('email');
      $table->string('token', 64)->unique();
      $table->string('role')->default('member');
      $table->enum('status', ['pending', 'accepted', 'expired', 'declined'])->default('pending');
      $table->foreignId('created_by')->constrained('users');
      $table->timestamp('expires_at');
      $table->timestamp('accepted_at')->nullable();
      $table->timestamp('declined_at')->nullable();
      $table->timestamps();

      $table->index(['email', 'status']);
    });
  }

  public function down(): void
  {
    Schema::dropIfExists('invitations');
  }
};
