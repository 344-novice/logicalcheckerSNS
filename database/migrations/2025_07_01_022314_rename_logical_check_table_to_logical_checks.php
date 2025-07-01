<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameLogicalCheckTableToLogicalChecks extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::rename('logical_check', 'logical_checks');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename('logical_checks', 'logical_check');
    }
}
