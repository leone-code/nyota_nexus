<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;  //Used to return Inertia pages (React/Vue components) instead of Blade templates.
use App\Notifications\ApplicationStatusUpdated;  // Imports a custom notification class to send alerts when the application status changes.

class ApplicationController extends Controller
{
    // List all applications (admin or officer)
    public function index()
    {
        $this->authorize('viewAny', Application::class);

        $applications = Application::with('user', 'ward')->get();
        return Inertia::render('applications/Index', [
            'applications' => $applications,
        ]);
    }

    // Store new application
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ward_id' => 'required|exists:wards,id',
            'date_of_birth' => 'required|date',
            'id_number' => 'required|unique:applications',
            'phone' => 'required',
            'address' => 'required',
            'education_level' => 'required',
            'institution_name' => 'nullable|string',
            'graduation_year' => 'nullable|integer',
            'business_type' => 'required',
            'business_description' => 'required',
            'requested_amount' => 'required|numeric',
            'business_plan' => 'required',
        ]);

        $validated['user_id'] = Auth::id();
        $validated['status'] = 'submitted';
        $validated['submitted_at'] = now();

        $application = Application::create($validated); // Create and save the new application to the database

        return redirect()->route('applications.index')
            ->with('success', 'Application submitted successfully');
    }

    // Show application details
    public function show(Application $application)
    {
        $this->authorize('view', $application);
        $application->load('user', 'documents', 'ward', 'reviewer');
        return Inertia::render('applications/Show', [
            'application' => $application,
        ]);
    }

    // Update application before submission
    public function update(Request $request, Application $application)
    {
        $validated = $request->validate([
            'ward_id' => 'sometimes|exists:wards,id',
            'date_of_birth' => 'sometimes|date',
            'id_number' => 'sometimes|unique:applications,id_number,' . $application->id,
            'phone' => 'sometimes',
            'address' => 'sometimes',
            'education_level' => 'sometimes',
            'institution_name' => 'nullable|string',
            'graduation_year' => 'nullable|integer',
            'business_type' => 'sometimes',
            'business_description' => 'sometimes',
            'requested_amount' => 'sometimes|numeric',
            'business_plan' => 'sometimes',
        ]);

        $this->authorize('update', $application); // Ensure only the owner or authorized admin  has permission to update the application
        $application->update($validated);

        return redirect()->route('applications.show', $application)
            ->with('success', 'Application updated successfully');
    }

    // Approve or reject
    public function updateStatus(Request $request, Application $application)
    {
        $validated = $request->validate([
            'status' => 'required|in:under_review,approved,rejected',
        ]);

        $this->authorize('updateStatus', $application);
        $application->update([
            'status' => $validated['status'],
            'reviewed_by' => Auth::id(),
        ]); //sends a notification to the applicant

        // Notify applicant
        if ($application->user) {
            $application->user->notify(new ApplicationStatusUpdated($application));
        }

        return redirect()->back()
            ->with('success', 'Application status updated');
    }

    // Delete application
    public function destroy(Application $application)
    {
        $this->authorize('delete', $application);
        $application->delete();
        return redirect()->route('applications.index')
            ->with('success', 'Application deleted successfully');
    }

    // List only the authenticated user's applications
    public function my()
    {
        $apps = Application::with('ward')
            ->where('user_id', Auth::id())
            ->get();

        return Inertia::render('applications/Index', [
            'applications' => $apps,
        ]);
    }
}
