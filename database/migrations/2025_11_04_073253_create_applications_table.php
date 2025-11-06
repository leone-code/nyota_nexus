<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('ward_id')->constrained()->onDelete('cascade');
            $table->date('date_of_birth');
            $table->string('id_number', 50)->unique();
            $table->string('phone', 20);
            $table->text('address');
            $table->string('education_level', 100);
            $table->string('institution_name', 150)->nullable();
            $table->year('graduation_year')->nullable();
            $table->string('business_type', 150);
            $table->text('business_description');
            $table->decimal('requested_amount', 10, 2);
            $table->text('business_plan');
            $table->enum('status', ['draft', 'submitted', 'under_review', 'approved', 'rejected', 'disbursed'])->default('draft');
            $table->timestamp('submitted_at')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
