<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Create testimonials table
        if (!Schema::hasTable('testimonials')) {
            Schema::create('testimonials', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('role')->nullable();
                $table->string('organization')->nullable();
                $table->text('quote');
                $table->string('avatar')->nullable();
                $table->unsignedTinyInteger('rating')->default(5);
                $table->string('category')->default('community'); // community, beneficiary, partner, client
                $table->unsignedInteger('sort_order')->default(0);
                $table->string('status')->default('published');
                $table->timestamps();
            });
        }

        // 2. Add body and featured_image to pages table if not present
        if (Schema::hasTable('pages')) {
            Schema::table('pages', function (Blueprint $table) {
                if (!Schema::hasColumn('pages', 'body')) {
                    $table->longText('body')->nullable()->after('excerpt');
                }
                if (!Schema::hasColumn('pages', 'featured_image')) {
                    $table->string('featured_image')->nullable()->after('body');
                }
            });
        }

        // 3. Add short_title to interventions table if not present
        if (Schema::hasTable('interventions')) {
            Schema::table('interventions', function (Blueprint $table) {
                if (!Schema::hasColumn('interventions', 'short_title')) {
                    $table->string('short_title')->nullable()->after('title');
                }
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('testimonials');

        if (Schema::hasTable('pages')) {
            Schema::table('pages', function (Blueprint $table) {
                if (Schema::hasColumn('pages', 'featured_image')) {
                    $table->dropColumn('featured_image');
                }
                if (Schema::hasColumn('pages', 'body')) {
                    $table->dropColumn('body');
                }
            });
        }
    }
};
