<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FundAllocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'admin_id',
        'county',
        'ward',
        'amount_allocated',
        'amount_utilized',
        'purpose',
        'allocation_date',
        'status',
    ];

    // Relationships
    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function ward()
    {
        return $this->belongsTo(Ward::class, 'ward');
    }
}
    