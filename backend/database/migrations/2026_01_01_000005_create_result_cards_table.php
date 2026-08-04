<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('result_cards', function (Blueprint $table) {
            $table->id();
            $table->string('niche');
            $table->string('timeframe');
            $table->string('headline_result');
            $table->text('description')->nullable();
            $table->string('metric_1')->nullable();
            $table->string('metric_2')->nullable();
            $table->string('metric_3')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('result_cards');
    }
};
