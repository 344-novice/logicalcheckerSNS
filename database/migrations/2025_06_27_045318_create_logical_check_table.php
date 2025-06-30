<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('logical_check', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tweet_id');
            $table->boolean('is_moderate')->default(false);
            $table->boolean('is_logical_post')->default(false);
            $table->text('feedback_comment')->nullable();
            $table->timestamps();

            $table->foreign('tweet_id')->references('id')->on('tweets')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logical_check');
    }
};
