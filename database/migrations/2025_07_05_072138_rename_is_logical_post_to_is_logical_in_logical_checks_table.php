<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('logical_checks', function (Blueprint $table) {
            $table->renameColumn('is_logical_post', 'is_logical');
        });
    }

    public function down(): void
    {
        Schema::table('logical_checks', function (Blueprint $table) {
            $table->renameColumn('is_logical', 'is_logical_post');
        });
    }
};
