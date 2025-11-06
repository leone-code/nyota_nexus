<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fund_allocations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('admin_id')->constrained('users')->onDelete('cascade');
            $table->string('county', 100);
            $table->string('ward', 100)->nullable();
            $table->decimal('amount_allocated', 12, 2);
            $table->decimal('amount_utilized', 12, 2)->default(0);
            $table->text('purpose')->nullable();
            $table->dateTime('allocation_date');
            $table->enum('status', ['active', 'exhausted', 'cancelled'])->default('active');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fund_allocations');
    }
};
