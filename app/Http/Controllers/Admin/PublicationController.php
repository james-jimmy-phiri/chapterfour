<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ContentStatus;
use App\Enums\ResourceType;
use App\Http\Controllers\Controller;
use App\Models\Resource;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PublicationController extends Controller
{
    /**
     * Display a listing of publications, research papers, and policy briefs.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $type = $request->query('type');
        $status = $request->query('status');

        $publicationTypes = ['publication', 'report', 'policy_brief', 'research', 'statement'];

        $query = Resource::with('author')
            ->whereIn('type', $publicationTypes)
            ->latest();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        if ($type && $type !== 'all') {
            $query->where('type', $type);
        }

        if ($status && $status !== 'all') {
            $query->where('status', $status);
        }

        $publications = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/Publications/Index', [
            'publications' => $publications,
            'filters' => [
                'search' => $search ?? '',
                'type' => $type ?? 'all',
                'status' => $status ?? 'all',
            ],
            'categories' => [
                ['value' => 'publication', 'label' => 'Statutory Publication'],
                ['value' => 'report', 'label' => 'Annual & Field Report'],
                ['value' => 'policy_brief', 'label' => 'Policy Brief'],
                ['value' => 'research', 'label' => 'Constitutional & Legal Research'],
                ['value' => 'statement', 'label' => 'Official Legal Statement'],
            ],
        ]);
    }

    /**
     * Store a newly created publication.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'slug'           => 'nullable|string|max:255|unique:resources,slug',
            'type'           => 'required|string|in:publication,report,policy_brief,research,statement',
            'excerpt'        => 'nullable|string|max:1000',
            'body'           => 'nullable|string',
            'featured_image' => 'nullable|image|max:4096',
            'pdf_file'       => 'nullable|file|mimes:pdf,doc,docx|max:30720',
            'pdf_path'       => 'nullable|string|max:255',
            'status'         => 'required|string|in:published,draft,archived',
            'is_featured'    => 'boolean',
        ]);

        $slug = !empty($validated['slug'])
            ? Str::slug($validated['slug'])
            : Str::slug($validated['title']);

        $baseSlug = $slug;
        $count = 1;
        while (Resource::where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$count}";
            $count++;
        }
        $validated['slug'] = $slug;

        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('publications/covers', 'public');
            $validated['featured_image'] = '/storage/' . $path;
        }

        if ($request->hasFile('pdf_file')) {
            $path = $request->file('pdf_file')->store('publications/docs', 'public');
            $validated['pdf_path'] = '/storage/' . $path;
        }

        $validated['author_id'] = $request->user()?->id;
        $validated['is_featured'] = $request->boolean('is_featured');
        if ($validated['status'] === 'published') {
            $validated['published_at'] = now();
        }

        $pub = Resource::create($validated);

        AuditLogger::log('created', 'Publication', $pub->id, [
            'title' => $pub->title,
            'type' => $pub->type->value ?? $pub->type,
        ]);

        return redirect()->back()->with('success', "Publication '{$pub->title}' created successfully.");
    }

    /**
     * Update an existing publication.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $pub = Resource::findOrFail($id);

        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'slug'           => 'nullable|string|max:255|unique:resources,slug,' . $id,
            'type'           => 'required|string|in:publication,report,policy_brief,research,statement',
            'excerpt'        => 'nullable|string|max:1000',
            'body'           => 'nullable|string',
            'featured_image' => 'nullable|image|max:4096',
            'pdf_file'       => 'nullable|file|mimes:pdf,doc,docx|max:30720',
            'pdf_path'       => 'nullable|string|max:255',
            'status'         => 'required|string|in:published,draft,archived',
            'is_featured'    => 'boolean',
        ]);

        if (!empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['slug']);
        } else {
            $validated['slug'] = $pub->slug;
        }

        if ($request->hasFile('featured_image')) {
            if ($pub->featured_image && str_starts_with($pub->featured_image, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $pub->featured_image));
            }
            $path = $request->file('featured_image')->store('publications/covers', 'public');
            $validated['featured_image'] = '/storage/' . $path;
        } else {
            unset($validated['featured_image']);
        }

        if ($request->hasFile('pdf_file')) {
            if ($pub->pdf_path && str_starts_with($pub->pdf_path, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $pub->pdf_path));
            }
            $path = $request->file('pdf_file')->store('publications/docs', 'public');
            $validated['pdf_path'] = '/storage/' . $path;
        } else {
            unset($validated['pdf_file']);
        }

        $validated['is_featured'] = $request->boolean('is_featured');
        if ($validated['status'] === 'published' && !$pub->published_at) {
            $validated['published_at'] = now();
        }

        $pub->update($validated);

        AuditLogger::log('updated', 'Publication', $pub->id, [
            'title' => $pub->title,
        ]);

        return redirect()->back()->with('success', "Publication '{$pub->title}' updated successfully.");
    }

    /**
     * Delete a publication.
     */
    public function destroy(int $id): RedirectResponse
    {
        $pub = Resource::findOrFail($id);
        $title = $pub->title;

        if ($pub->featured_image && str_starts_with($pub->featured_image, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $pub->featured_image));
        }
        if ($pub->pdf_path && str_starts_with($pub->pdf_path, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $pub->pdf_path));
        }

        $pub->delete();

        AuditLogger::log('deleted', 'Publication', $id, ['title' => $title]);

        return redirect()->back()->with('success', "Publication '{$title}' removed.");
    }
}
