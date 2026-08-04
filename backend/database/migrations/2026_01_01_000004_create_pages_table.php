<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('slug');        // home, about, services, results, contact, audit
            $table->string('section_key'); // hero, services, testimonials, ...
            $table->json('content')->nullable();
            $table->timestamps();

            $table->unique(['slug', 'section_key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
