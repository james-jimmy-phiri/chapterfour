<?php

namespace App\Http\Controllers;

use App\Models\Vacancy;
use App\Models\VacancyApplication;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class VacancyApplicationController extends Controller
{
    public function store(Request $request, int $id): RedirectResponse
    {
        $vacancy = Vacancy::findOrFail($id);

        $validated = $request->validate([
            'name'          => 'required|string|max:255',
            'email'         => 'required|email|max:255',
            'phone'         => 'nullable|string|max:50',
            'location'      => 'nullable|string|max:255',
            'cover_letter'  => 'nullable|string|max:3000',
            'document_file' => [
                'required',
                'file',
                'mimes:pdf,doc,docx',
                'max:5120', // 5 MB limit
                function ($attribute, $value, $fail) {
                    // Extra check: ensure the detected MIME is truly a document
                    $realMime = $value->getMimeType();
                    $allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                    if (!in_array($realMime, $allowed)) {
                        $fail('Only PDF and Word documents are accepted.');
                    }
                },
            ],
        ]);

        // Check for duplicate application
        if (VacancyApplication::where('vacancy_id', $vacancy->id)
            ->where('email', $validated['email'])
            ->exists()) {
            return back()->withErrors(['email' => 'You have already applied for this vacancy with this email address.']);
        }

        $path = $request->file('document_file')->store('applications', 'public');

        VacancyApplication::create([
            'vacancy_id'    => $vacancy->id,
            'name'          => $validated['name'],
            'email'         => $validated['email'],
            'phone'         => $validated['phone'] ?? null,
            'location'      => $validated['location'] ?? null,
            'cover_letter'  => $validated['cover_letter'] ?? null,
            'document_path' => '/storage/' . $path,
        ]);

        return back()->with('success', 'Your application has been submitted successfully. We will be in touch.');
    }
}
