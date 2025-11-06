<?php

namespace App\Http\Controllers;

use App\Models\Ward;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WardController extends Controller
{
    public function index()
    {
        $wards = Ward::with('officer')->get();
        return Inertia::render('Wards/Index', [
            'wards' => $wards,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ward_name' => 'required|string',
            'county_name' => 'required|string',
            'ward_code' => 'required|unique:wards',
            'ward_officer_id' => 'nullable|exists:users,id',
            'description' => 'nullable|string',
        ]);

        Ward::create($validated);

        return redirect()->route('wards.index')
            ->with('success', 'Ward created successfully');
    }

    public function show(Ward $ward)
    {
        $ward->load('officer', 'applications');
        return Inertia::render('Wards/Show', [
            'ward' => $ward,
        ]);
    }

    public function update(Request $request, Ward $ward)
    {
        $validated = $request->validate([
            'ward_name' => 'sometimes|string',
            'county_name' => 'sometimes|string',
            'ward_code' => 'sometimes|unique:wards,ward_code,' . $ward->id,
            'ward_officer_id' => 'nullable|exists:users,id',
            'description' => 'nullable|string',
        ]);

        $ward->update($validated);

        return redirect()->route('wards.show', $ward)
            ->with('success', 'Ward updated successfully');
    }

    public function destroy(Ward $ward)
    {
        $ward->delete();
        return redirect()->route('wards.index')
            ->with('success', 'Ward deleted successfully');
    }
}
