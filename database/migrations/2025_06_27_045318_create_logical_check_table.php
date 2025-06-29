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
            $table->unsignedBigInteger('post_id');
            $table->boolean('is_moderate')->default(false);
            $table->boolean('is_logical_post')->default(false);
            $table->tinyInteger('logical_level')->default(0);
            $table->text('feedback_comment')->nullable();
            $table->timestamps();

            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
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
