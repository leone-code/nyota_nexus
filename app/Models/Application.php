<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'ward_id',
        'date_of_birth',
        'id_number',
        'phone',
        'address',
        'education_level',
        'institution_name',
        'graduation_year',
        'business_type',
        'business_description',
        'requested_amount',
        'business_plan',
        'status',
        'submitted_at',
        'reviewed_by',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ward()
    {
        return $this->belongsTo(Ward::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function disbursement()
    {
        return $this->hasOne(Disbursement::class);
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
