<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disbursement extends Model
{
    use HasFactory;

    protected $fillable = [
        'application_id',
        'ward_id',
        'amount',
        'status',
        'disbursement_notes',
        'requested_by',
        'approved_by',
        'requested_at',
        'approved_at',
        'disbursed_at',
        'transaction_reference',
    ];

    // Relationships
    public function application()
    {
        return $this->belongsTo(Application::class);
    }

    public function ward()
    {
        return $this->belongsTo(Ward::class);
    }

    public function requester()
    {
        return $this->belongsTo(User::class, 'requested_by');
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
