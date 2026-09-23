<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vacancies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('department')->nullable();
            $table->string('location')->default('Lilongwe, Malawi');
            $table->string('type')->default('Full-Time'); // Full-Time, Part-Time, Internship, Consultancy, Volunteer
            $table->string('tag')->nullable(); // e.g. "RFP", "Urgent"
            $table->string('organization')->nullable()->default('Chapter Four Malawi');
            $table->longText('description');
            $table->string('scope_intro')->nullable();
            $table->json('scope_sections')->nullable(); // [{title, items[]}]
            $table->json('requirements')->nullable(); // array of strings
            $table->json('evaluation_criteria')->nullable();
            $table->string('reservation_of_rights')->nullable();
            $table->string('application_email')->nullable();
            $table->string('application_url')->nullable();
            $table->json('submission_address')->nullable(); // {recipient, organization, addressLines[], email}
            $table->boolean('is_urgent')->default(false);
            $table->date('posted_date')->nullable();
            $table->timestamp('closes_at')->nullable();
            $table->string('deadline_text')->nullable(); // human-readable e.g. "25 October 2026, 5:00 PM CAT"
            $table->string('status')->default('open'); // open, closed, draft
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vacancies');
    }
};
