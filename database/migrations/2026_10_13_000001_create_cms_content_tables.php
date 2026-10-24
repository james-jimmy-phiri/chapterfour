<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Core objectives — for the "Core Objectives" section on Who We Are / CoreActivities
        Schema::create('core_objectives', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('icon')->nullable();  // lucide icon name
            $table->json('activities')->nullable(); // array of bullet-point activities
            $table->string('page_scope')->default('who_we_are'); // who_we_are, core_activities
            $table->unsignedInteger('sort_order')->default(0);
            $table->string('status')->default('published');
            $table->timestamps();
        });

        // Page quotes — inspirational quotes shown across pages
        Schema::create('page_quotes', function (Blueprint $table) {
            $table->id();
            $table->text('quote_text');
            $table->string('attribution');    // e.g. "Martin Luther King Jr."
            $table->string('image')->nullable();  // optional background image path
            $table->string('page_key')->nullable(); // e.g. 'who_we_are', 'homepage'
            $table->unsignedInteger('sort_order')->default(0);
            $table->string('status')->default('published');
            $table->timestamps();
        });

        // Cross-cutting activity areas — for the CrossCuttingActivities page
        Schema::create('cross_cutting_activities', function (Blueprint $table) {
            $table->id();
            $table->string('area');              // e.g. "Research and Knowledge Management"
            $table->text('description')->nullable();
            $table->string('icon')->nullable();  // lucide icon name
            $table->string('color_class')->nullable();  // e.g. "text-blue-600"
            $table->string('bg_class')->nullable();     // e.g. "bg-blue-50"
            $table->unsignedInteger('sort_order')->default(0);
            $table->string('status')->default('published');
            $table->timestamps();
        });

        // Site content blocks — reusable text/HTML blocks tied to a page+section key
        Schema::create('site_content_blocks', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();        // e.g. 'who_we_are.org_overview'
            $table->string('page')->nullable();     // e.g. 'who_we_are'
            $table->string('section')->nullable();  // e.g. 'org_overview', 'partnerships'
            $table->string('title')->nullable();
            $table->longText('body')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        // Add published_at to tables that are missing it
        Schema::table('interventions', function (Blueprint $table) {
            if (!Schema::hasColumn('interventions', 'published_at')) {
                $table->timestamp('published_at')->nullable()->after('status');
            }
        });

        Schema::table('team_members', function (Blueprint $table) {
            if (!Schema::hasColumn('team_members', 'published_at')) {
                $table->timestamp('published_at')->nullable()->after('status');
            }
        });

        Schema::table('beneficiary_groups', function (Blueprint $table) {
            if (!Schema::hasColumn('beneficiary_groups', 'published_at')) {
                $table->timestamp('published_at')->nullable()->after('status');
            }
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_content_blocks');
        Schema::dropIfExists('cross_cutting_activities');
        Schema::dropIfExists('page_quotes');
        Schema::dropIfExists('core_objectives');

        if (Schema::hasColumn('beneficiary_groups', 'published_at')) {
            Schema::table('beneficiary_groups', fn (Blueprint $t) => $t->dropColumn('published_at'));
        }
        if (Schema::hasColumn('team_members', 'published_at')) {
            Schema::table('team_members', fn (Blueprint $t) => $t->dropColumn('published_at'));
        }
        if (Schema::hasColumn('interventions', 'published_at')) {
            Schema::table('interventions', fn (Blueprint $t) => $t->dropColumn('published_at'));
        }
    }
};
