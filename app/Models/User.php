<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'role',
        'county',
        'ward',
        'id_number',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_secret',
        'two_factor_recovery_codes',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Relationships
    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function ward()
    {
        return $this->belongsTo(Ward::class);
    }

    public function fundAllocations()
    {
        return $this->hasMany(FundAllocation::class, 'admin_id');
    }

    public function disbursementsRequested()
    {
        return $this->hasMany(Disbursement::class, 'requested_by');
    }

    public function disbursementsApproved()
    {
        return $this->hasMany(Disbursement::class, 'approved_by');
    }
}
