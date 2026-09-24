<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vacancy;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class VacancyController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Vacancies/Index', [
            'vacancies' => Vacancy::orderBy('sort_order')->orderByDesc('created_at')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'               => 'required|string|max:255',
            'slug'                => 'nullable|string|max:255|unique:vacancies,slug',
            'department'          => 'nullable|string|max:255',
            'location'            => 'nullable|string|max:255',
            'type'                => 'required|string|max:100',
            'tag'                 => 'nullable|string|max:100',
            'organization'        => 'nullable|string|max:255',
            'description'         => 'required|string',
            'document_file'       => 'nullable|file|mimes:pdf,doc,docx|max:10240',
            'scope_intro'         => 'nullable|string',
            'scope_sections'      => 'nullable|array',
            'requirements'        => 'nullable|array',
            'evaluation_criteria' => 'nullable|array',
            'reservation_of_rights' => 'nullable|string',
            'application_email'   => 'nullable|email|max:255',
            'application_url'     => 'nullable|url|max:500',
            'submission_address'  => 'nullable|array',
            'is_urgent'           => 'boolean',
            'posted_date'         => 'nullable|date',
            'closes_at'           => 'nullable|date',
            'deadline_text'       => 'nullable|string|max:255',
            'status'              => 'required|string|in:open,closed,draft',
            'sort_order'          => 'integer|min:0',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $input = $request->except(['document_file']);
        if ($request->hasFile('document_file')) {
            $path = $request->file('document_file')->store('vacancies', 'public');
            $input['document_path'] = '/storage/' . $path;
        }

        $vacancy = Vacancy::create(array_merge($validated, $input));
        AuditLogger::log('created', 'Vacancy', $vacancy->id, ['title' => $vacancy->title]);

        return redirect()->back()->with('success', "Vacancy '{$vacancy->title}' created.");
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $vacancy = Vacancy::findOrFail($id);

        $validated = $request->validate([
            'title'               => 'required|string|max:255',
            'slug'                => 'nullable|string|max:255|unique:vacancies,slug,' . $id,
            'department'          => 'nullable|string|max:255',
            'location'            => 'nullable|string|max:255',
            'type'                => 'required|string|max:100',
            'tag'                 => 'nullable|string|max:100',
            'organization'        => 'nullable|string|max:255',
            'description'         => 'required|string',
            'document_file'       => 'nullable|file|mimes:pdf,doc,docx|max:10240',
            'scope_intro'         => 'nullable|string',
            'scope_sections'      => 'nullable|array',
            'requirements'        => 'nullable|array',
            'evaluation_criteria' => 'nullable|array',
            'reservation_of_rights' => 'nullable|string',
            'application_email'   => 'nullable|email|max:255',
            'application_url'     => 'nullable|url|max:500',
            'submission_address'  => 'nullable|array',
            'is_urgent'           => 'boolean',
            'posted_date'         => 'nullable|date',
            'closes_at'           => 'nullable|date',
            'deadline_text'       => 'nullable|string|max:255',
            'status'              => 'required|string|in:open,closed,draft',
            'sort_order'          => 'integer|min:0',
        ]);

        $input = $request->except(['document_file']);
        if ($request->hasFile('document_file')) {
            $path = $request->file('document_file')->store('vacancies', 'public');
            $input['document_path'] = '/storage/' . $path;
        }

        $vacancy->update(array_merge($validated, $input));
        AuditLogger::log('updated', 'Vacancy', $vacancy->id, ['title' => $vacancy->title]);

        return redirect()->back()->with('success', "Vacancy '{$vacancy->title}' updated.");
    }

    public function destroy(int $id): RedirectResponse
    {
        $vacancy = Vacancy::findOrFail($id);
        $title = $vacancy->title;
        $vacancy->delete();
        AuditLogger::log('deleted', 'Vacancy', $id, ['title' => $title]);

        return redirect()->back()->with('success', "Vacancy '{$title}' deleted.");
    }
}
