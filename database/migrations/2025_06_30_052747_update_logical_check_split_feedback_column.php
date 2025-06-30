<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('logical_check', function (Blueprint $table) {
            $table->text('reason')->nullable()->after('is_logical_post');
            $table->text('hints')->nullable()->after('reason');
            $table->dropColumn('feedback_comment');
        });
    }

    public function down(): void
    {
        Schema::table('logical_check', function (Blueprint $table) {
            $table->text('feedback_comment')->nullable()->after('is_logical_post');
            $table->dropColumn('reason');
            $table->dropColumn('hints');
        });
    }
};
