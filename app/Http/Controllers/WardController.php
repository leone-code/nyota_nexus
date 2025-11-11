<?php

namespace App\Http\Controllers;

use App\Models\Ward;
use Illuminate\Http\Request;

class WardController extends Controller
{
    public function index()
    {
        return response()->json(Ward::with('officer')->get());
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

        $ward = Ward::create($validated);

        return response()->json(['message' => 'Ward created successfully', 'ward' => $ward]);
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
