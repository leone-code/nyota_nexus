<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'application_id' => 'required|exists:applications,id',
            'file' => 'required|file|max:5120', // 5MB max
            'doc_type' => 'required|in:id_card,certificate,proposal,other',
        ]);

        $path = $request->file('file')->store('documents', 'public');

        Document::create([
            'application_id' => $validated['application_id'],
            'file_name' => $request->file('file')->getClientOriginalName(),
            'file_path' => $path,
            'doc_type' => $validated['doc_type'],
        ]);

        return redirect()->back()
            ->with('success', 'Document uploaded successfully');
    }

    public function destroy(Document $document)
    {
        // Delete file from storage
        if ($document->file_path && Storage::disk('public')->exists($document->file_path)) {
            Storage::disk('public')->delete($document->file_path);
        }

        $document->delete();

        return redirect()->back()
            ->with('success', 'Document deleted successfully');
    }
}
