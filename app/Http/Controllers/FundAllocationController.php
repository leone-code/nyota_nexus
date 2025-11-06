<?php

namespace App\Http\Controllers;

use App\Models\FundAllocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FundAllocationController extends Controller
{
    public function index()
    {
        $allocations = FundAllocation::with('admin', 'ward')->get();
        return Inertia::render('FundAllocations/Index', [
            'allocations' => $allocations,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'county' => 'required|string',
            'ward' => 'nullable|integer|exists:wards,id',
            'amount_allocated' => 'required|numeric|min:0',
            'purpose' => 'nullable|string',
            'allocation_date' => 'required|date',
        ]);

        $validated['admin_id'] = Auth::id();
        $validated['status'] = 'active';
        $validated['amount_utilized'] = 0;

        FundAllocation::create($validated);

        return redirect()->route('fund-allocations.index')
            ->with('success', 'Fund allocation recorded');
    }

    public function show(FundAllocation $fundAllocation)
    {
        $fundAllocation->load('admin', 'ward');
        return Inertia::render('FundAllocations/Show', [
            'fundAllocation' => $fundAllocation,
        ]);
    }

    public function update(Request $request, FundAllocation $fundAllocation)
    {
        $validated = $request->validate([
            'county' => 'sometimes|string',
            'ward' => 'nullable|integer|exists:wards,id',
            'amount_allocated' => 'sometimes|numeric|min:0',
            'amount_utilized' => 'sometimes|numeric|min:0',
            'purpose' => 'nullable|string',
            'allocation_date' => 'sometimes|date',
            'status' => 'sometimes|in:active,inactive,completed',
        ]);

        $fundAllocation->update($validated);

        return redirect()->route('fund-allocations.show', $fundAllocation)
            ->with('success', 'Allocation updated');
    }

    public function destroy(FundAllocation $fundAllocation)
    {
        $fundAllocation->delete();
        return redirect()->route('fund-allocations.index')
            ->with('success', 'Allocation deleted');
    }
}
