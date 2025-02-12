<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // Single JSON field for all settings
            $table->json('settings')->default(json_encode([
                'theme' => 'system',
                'analytics_opt_out' => false,
                'notifications' => [
                    'email' => true,
                    'push' => true
                ],
                'onboarding' => [
                    'skip' => false,
                    'steps' => [
                        'verify_email' => [
                            'status' => 'pending', // pending, in_progress, completed, skipped
                            'started_at' => null,
                            'completed_at' => null
                        ],
                        'business_setup' => [
                            'status' => 'pending',
                            'started_at' => null,
                            'completed_at' => null,
                            'temp_data' => null // Store form data before creating organization
                        ],
                        'restaurant_setup' => [
                            'status' => 'pending',
                            'started_at' => null,
                            'completed_at' => null,
                            'temp_data' => null // Store form data before creating restaurant
                        ]
                    ]
                ]
            ]));

            $table->timestamps();

            // Index for quick lookups
            $table->index(['user_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_settings');
    }
};
