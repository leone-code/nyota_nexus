<?php

namespace App\Policies;

use App\Models\Application;
use App\Models\User;

class ApplicationPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->role === 'admin';
    }

    public function view(User $user, Application $application): bool
    {
        return $user->role === 'admin' || $application->user_id === $user->id;
    }

    public function create(User $user): bool
    {
        return in_array($user->role, ['applicant', 'ward_officer', 'county_officer', 'admin']);
    }

    public function update(User $user, Application $application): bool
    {
        return $application->user_id === $user->id && in_array($application->status, ['draft', 'submitted']);
    }

    public function delete(User $user, Application $application): bool
    {
        return $application->user_id === $user->id && $application->status === 'draft';
    }

    public function updateStatus(User $user, Application $application): bool
    {
        return $user->role === 'admin';
    }
}


