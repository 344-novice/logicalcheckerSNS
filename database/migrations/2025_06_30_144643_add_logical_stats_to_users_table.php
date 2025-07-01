<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLogicalStatsToUsersTable extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedInteger('total_moderate_false_count')->default(0)->after('remember_token');
            $table->unsignedInteger('total_logical_true_count')->default(0)->after('total_moderate_false_count');
            $table->unsignedInteger('total_tweet_count')->default(0)->after('total_logical_true_count');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'total_moderate_false_count',
                'total_logical_true_count',
                'total_tweet_count',
            ]);
        });
    }
}
