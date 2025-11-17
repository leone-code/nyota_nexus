<?php

namespace App\Http\Controllers;

use App\Models\Ward;
use Illuminate\Http\Request;

class WardController extends Controller
{
    public function index()
    {
        $wards = Ward::with('officer')->get();

        $wards->each(function ($ward) {
            $ward->applications_count = $ward->applications()->count();
        });
        return inertia('Wards/Index', [
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
        return response()->json($ward->load('officer', 'applications'));
    }

    public function update(Request $request, Ward $ward)
    {
        $ward->update($request->all());
        return response()->json(['message' => 'Ward updated successfully']);
    }

    public function destroy(Ward $ward)
    {
        $ward->delete();
        return response()->json(['message' => 'Ward deleted']);
    }
}
