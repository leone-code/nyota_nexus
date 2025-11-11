<?php

namespace App\Http\Controllers;

use App\Models\Disbursement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DisbursementController extends Controller
{
    public function index()
    {
        $disbursements = Disbursement::with('application', 'ward', 'requester', 'approver')->get();
        return Inertia::render('Disbursements/Index', [
            'disbursements' => $disbursements,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'application_id' => 'required|exists:applications,id',
            'ward_id' => 'required|exists:wards,id',
            'amount' => 'required|numeric',
            'disbursement_notes' => 'nullable|string',
        ]);

        $validated['requested_by'] = Auth::id();
        $validated['status'] = 'pending';
        $validated['requested_at'] = now();

        Disbursement::create($validated);

        return redirect()->route('disbursements.index')
            ->with('success', 'Disbursement request created');
    }

    public function approve(Request $request, Disbursement $disbursement)
    {
        $disbursement->update([
            'status' => 'approved',
            'approved_by' => Auth::id(),
            'approved_at' => now(),
        ]);

        return redirect()->back()
            ->with('success', 'Disbursement approved');
    }

    public function reject(Disbursement $disbursement)
    {
        $disbursement->update([
            'status' => 'rejected',
            'approved_by' => Auth::id(),
        ]);

        return redirect()->back()
            ->with('success', 'Disbursement rejected');
    }

    public function disburse(Disbursement $disbursement)
    {
        $disbursement->update([
            'status' => 'disbursed',
            'disbursed_at' => now(),
        ]);

        // Update application status
        if ($disbursement->application) {
            $disbursement->application->update(['status' => 'disbursed']);
        }

        return redirect()->back()
            ->with('success', 'Funds disbursed');
    }
}
