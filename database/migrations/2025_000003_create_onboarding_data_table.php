<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('onboarding_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('restaurant_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('business_type')->nullable();
            $table->boolean('is_skipped')->default(false);
            $table->timestamps();
            $table->index(['organization_id', 'restaurant_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('onboarding_data');
    }
};
