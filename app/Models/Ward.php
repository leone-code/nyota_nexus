<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ward extends Model
{
    use HasFactory;

    protected $fillable = [
        'ward_name',
        'county_name',
        'ward_code',
        'ward_officer_id',
        'description',
    ];

    // Relationships
    public function officer()
    {
        return $this->belongsTo(User::class, 'ward_officer_id');
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function disbursements()
    {
        return $this->hasMany(Disbursement::class);
    }
}
