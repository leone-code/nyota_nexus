<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\WardController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\DisbursementController;
use App\Http\Controllers\FundAllocationController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/applications/index', function () {
    return Inertia::render('applications/index');
});

// API routes (used by frontend)
Route::get('/api/wards', function () {
    return response()->json(\App\Models\Ward::all());
});

Route::get('/api/users', function () {
    return response()->json(\App\Models\User::select('id', 'name', 'email')->get());
});

Route::get('/api/applications', function () {
    return response()->json(\App\Models\Application::select('id', 'business_type', 'requested_amount')->get());
});


Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('dashboard', function () {
        $stats = [
            'total_applications' => \App\Models\Application::count(),
            'pending_applications' => \App\Models\Application::where('status', 'submitted')->count(),
            'approved_applications' => \App\Models\Application::where('status', 'approved')->count(),
            'total_disbursements' => \App\Models\Disbursement::count(),
            'total_wards' => \App\Models\Ward::count(),
            'total_allocations' => \App\Models\FundAllocation::sum('amount_allocated'),
            'total_utilized' => \App\Models\FundAllocation::sum('amount_utilized'),
        ];
        return Inertia::render('dashboard', $stats);
    })->name('dashboard');

    // Applications routes
    Route::get('/applications', [ApplicationController::class, 'index'])->name('applications.index');
    Route::get('/my/applications', [ApplicationController::class, 'my'])->name('applications.my');
    Route::get('/applications/create', function () {
        return Inertia::render('applications/create');
    })->name('applications.create');
    Route::post('/applications', [ApplicationController::class, 'store'])->name('applications.store');
    Route::get('/applications/{application}', [ApplicationController::class, 'show'])->name('applications.show');
    Route::get('/applications/{application}/edit', function (\App\Models\Application $application) {
        return Inertia::render('applications/Edit', [
            'application' => $application->load('user', 'documents', 'ward'),
        ]);
    })->name('applications.edit');
    Route::put('/applications/{application}', [ApplicationController::class, 'update'])->name('applications.update');
    Route::patch('/applications/{application}/status', [ApplicationController::class, 'updateStatus'])->name('applications.updateStatus');
    Route::delete('/applications/{application}', [ApplicationController::class, 'destroy'])->name('applications.destroy');

    // Wards routes
    Route::get('/wards', [App\Http\Controllers\WardController::class, 'index'])->name('wards.index');
    Route::get('/wards/create', function () {
        return Inertia::render('Wards/Create');
    })->name('wards.create');
    Route::post('/wards', [App\Http\Controllers\WardController::class, 'store'])->name('wards.store');
    Route::get('/wards/{ward}', [App\Http\Controllers\WardController::class, 'show'])->name('wards.show');
    Route::get('/wards/{ward}/edit', function (\App\Models\Ward $ward) {
        return Inertia::render('Wards/Edit', [
            'ward' => $ward->load('officer'),
        ]);
    })->name('wards.edit');
    Route::put('/wards/{ward}', [App\Http\Controllers\WardController::class, 'update'])->name('wards.update');
    Route::delete('/wards/{ward}', [App\Http\Controllers\WardController::class, 'destroy'])->name('wards.destroy');

    // Documents routes
    Route::post('/documents', [App\Http\Controllers\DocumentController::class, 'store'])->name('documents.store');
    Route::delete('/documents/{document}', [App\Http\Controllers\DocumentController::class, 'destroy'])->name('documents.destroy');

    // Disbursements routes
    Route::get('/disbursements', [App\Http\Controllers\DisbursementController::class, 'index'])->name('disbursements.index');
    Route::get('/disbursements/create', function () {
        return Inertia::render('Disbursements/Create');
    })->name('disbursements.create');
    Route::post('/disbursements', [App\Http\Controllers\DisbursementController::class, 'store'])->name('disbursements.store');
    Route::patch('/disbursements/{disbursement}/approve', [App\Http\Controllers\DisbursementController::class, 'approve'])->name('disbursements.approve');
    Route::patch('/disbursements/{disbursement}/reject', [App\Http\Controllers\DisbursementController::class, 'reject'])->name('disbursements.reject');
    Route::patch('/disbursements/{disbursement}/disburse', [App\Http\Controllers\DisbursementController::class, 'disburse'])->name('disbursements.disburse');

    // Fund Allocations routes
    Route::get('/fund-allocations', [App\Http\Controllers\FundAllocationController::class, 'index'])->name('fund-allocations.index');
    Route::get('/fund-allocations/create', function () {
        return Inertia::render('FundAllocations/Create');
    })->name('fund-allocations.create');
    Route::post('/fund-allocations', [App\Http\Controllers\FundAllocationController::class, 'store'])->name('fund-allocations.store');
    Route::get('/fund-allocations/{fundAllocation}', [App\Http\Controllers\FundAllocationController::class, 'show'])->name('fund-allocations.show');
    Route::get('/fund-allocations/{fundAllocation}/edit', function (\App\Models\FundAllocation $fundAllocation) {
        return Inertia::render('FundAllocations/Edit', [
            'fundAllocation' => $fundAllocation->load('admin'),
        ]);
    })->name('fund-allocations.edit');
    Route::put('/fund-allocations/{fundAllocation}', [App\Http\Controllers\FundAllocationController::class, 'update'])->name('fund-allocations.update');
    Route::delete('/fund-allocations/{fundAllocation}', [App\Http\Controllers\FundAllocationController::class, 'destroy'])->name('fund-allocations.destroy');
});


require __DIR__.'/settings.php';
