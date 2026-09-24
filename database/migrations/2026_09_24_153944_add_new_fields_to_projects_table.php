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
        // These fields are already created with the projects table.
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // The fields belong to the projects table migration and must not be removed here.
    }
};
