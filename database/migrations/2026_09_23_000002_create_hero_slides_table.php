<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hero_slides', function (Blueprint $table) {
            $table->id();
            $table->string('word');             // typewriter word, e.g. "human rights,"
            $table->string('bg_image')->nullable();    // background image path
            $table->string('right_image')->nullable(); // cutout PNG image path
            $table->string('right_alt')->nullable();   // alt text for cutout
            $table->string('accent_label')->nullable(); // pill text
            $table->string('status')->default('published');
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hero_slides');
    }
};
