<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ContentStatus;
use App\Enums\ResourceType;
use App\Http\Controllers\Controller;
use App\Models\Resource;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ResourceController extends Controller
{
    /**
     * Display a listing of the resources.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $status = $request->query('status');
        $type = $request->query('type');

        $query = Resource::with('author')->latest();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        if ($status && $status !== 'all') {
            $query->where('status', $status);
        }

        if ($type && $type !== 'all') {
            $query->where('type', $type);
        }

        $resources = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/Resources/Index', [
            'resources' => $resources,
            'filters' => [
                'search' => $search ?? '',
                'status' => $status ?? 'all',
                'type' => $type ?? 'all',
            ],
            'resourceTypes' => array_map(fn ($case) => [
                'value' => $case->value,
                'label' => $case->label(),
            ], ResourceType::cases()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Resources/Form', [
            'resource' => null,
            'resourceTypes' => array_map(fn ($case) => [
                'value' => $case->value,
                'label' => $case->label(),
            ], ResourceType::cases()),
            'contentStatuses' => array_map(fn ($case) => [
                'value' => $case->value,
                'label' => $case->label(),
            ], ContentStatus::cases()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:resources,slug',
            'type' => 'required|string',
            'excerpt' => 'nullable|string|max:1000',
            'body' => 'nullable|string',
            'status' => 'required|string',
            'is_featured' => 'boolean',
            'pdf_path' => 'nullable|string|max:255',
        ]);

        $slug = !empty($validated['slug'])
            ? Str::slug($validated['slug'])
            : Str::slug($validated['title']);

        // Ensure unique slug
        $baseSlug = $slug;
        $count = 1;
        while (Resource::where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$count}";
            $count++;
        }

        $resource = Resource::create([
            'title' => $validated['title'],
            'slug' => $slug,
            'type' => $validated['type'],
            'excerpt' => $validated['excerpt'] ?? null,
            'body' => $validated['body'] ?? null,
            'status' => $validated['status'],
            'is_featured' => $request->boolean('is_featured'),
            'pdf_path' => $validated['pdf_path'] ?? null,
            'author_id' => $request->user()->id,
            'published_at' => $validated['status'] === 'published' ? now() : null,
        ]);

        AuditLogger::log('created', 'Resource', $resource->id, [
            'title' => $resource->title,
            'status' => $resource->status->value ?? $resource->status,
        ]);

        return redirect()->route('admin.resources.index')
            ->with('success', 'Resource created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id): Response
    {
        $resource = Resource::findOrFail($id);

        return Inertia::render('Admin/Resources/Form', [
            'resource' => $resource,
            'resourceTypes' => array_map(fn ($case) => [
                'value' => $case->value,
                'label' => $case->label(),
            ], ResourceType::cases()),
            'contentStatuses' => array_map(fn ($case) => [
                'value' => $case->value,
                'label' => $case->label(),
            ], ContentStatus::cases()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $resource = Resource::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => "nullable|string|max:255|unique:resources,slug,{$id}",
            'type' => 'required|string',
            'excerpt' => 'nullable|string|max:1000',
            'body' => 'nullable|string',
            'status' => 'required|string',
            'is_featured' => 'boolean',
            'pdf_path' => 'nullable|string|max:255',
        ]);

        $slug = !empty($validated['slug'])
            ? Str::slug($validated['slug'])
            : $resource->slug;

        $resource->update([
            'title' => $validated['title'],
            'slug' => $slug,
            'type' => $validated['type'],
            'excerpt' => $validated['excerpt'] ?? null,
            'body' => $validated['body'] ?? null,
            'status' => $validated['status'],
            'is_featured' => $request->boolean('is_featured'),
            'pdf_path' => $validated['pdf_path'] ?? null,
            'published_at' => ($validated['status'] === 'published' && !$resource->published_at) ? now() : $resource->published_at,
        ]);

        AuditLogger::log('updated', 'Resource', $resource->id, [
            'title' => $resource->title,
            'status' => $resource->status->value ?? $resource->status,
        ]);

        return redirect()->route('admin.resources.index')
            ->with('success', 'Resource updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        $resource = Resource::findOrFail($id);
        $title = $resource->title;
        $resource->delete();

        AuditLogger::log('deleted', 'Resource', $id, [
            'title' => $title,
        ]);

        return redirect()->route('admin.resources.index')
            ->with('success', 'Resource deleted successfully.');
    }
}
