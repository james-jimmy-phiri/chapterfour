<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VacancyApplicationController extends Controller
{
    public function store(Request $request, $id)
    {
        $vacancy = \App\Models\Vacancy::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'location' => 'nullable|string|max:255',
            'document_file' => 'required|file|mimes:pdf,doc,docx|max:10240',
        ]);

        // Check if user already applied
        if (\App\Models\VacancyApplication::where('vacancy_id', $vacancy->id)->where('email', $validated['email'])->exists()) {
            return back()->withErrors(['email' => 'You have already applied for this vacancy with this email address.']);
        }

        $path = $request->file('document_file')->store('applications', 'public');

        \App\Models\VacancyApplication::create([
            'vacancy_id' => $vacancy->id,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'location' => $validated['location'] ?? null,
            'document_path' => '/storage/' . $path,
        ]);

        return back()->with('success', 'Your application has been submitted successfully.');
    }
}
