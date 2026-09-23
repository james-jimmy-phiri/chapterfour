<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Display a listing of field projects.
     */
    public function index(): Response
    {
        $projects = Project::latest('published_at')->get();

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
        ]);
    }

    /**
     * Store a newly created project.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:projects,slug',
            'summary' => 'required|string|max:1000',
            'description' => 'nullable|string',
            'locations' => 'nullable|array',
            'beneficiaries' => 'nullable|array',
            'featured_image' => 'nullable|image|max:4096',
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'image|max:4096',
            'status' => 'required|string',
            'published_at' => 'nullable|date',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('projects', 'public');
            $validated['featured_image'] = '/storage/' . $path;
        }

        if ($request->hasFile('gallery_images')) {
            $gallery = [];
            foreach ($request->file('gallery_images') as $file) {
                $path = $file->store('projects/gallery', 'public');
                $gallery[] = '/storage/' . $path;
            }
            $validated['gallery'] = $gallery;
        }

        unset($validated['gallery_images']);

        $project = Project::create($validated);

        AuditLogger::log('created', 'Project', $project->id, [
            'title' => $project->title,
        ]);

        return redirect()->back()->with('success', "Project '{$project->title}' registered successfully.");
    }

    /**
     * Update the specified project.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects,slug,' . $id,
            'summary' => 'required|string|max:1000',
            'description' => 'nullable|string',
            'locations' => 'nullable|array',
            'beneficiaries' => 'nullable|array',
            'featured_image' => 'nullable|image|max:4096',
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'image|max:4096',
            'status' => 'required|string',
            'published_at' => 'nullable|date',
        ]);

        if ($request->hasFile('featured_image')) {
            if ($project->featured_image && str_starts_with($project->featured_image, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $project->featured_image));
            }
            $path = $request->file('featured_image')->store('projects', 'public');
            $validated['featured_image'] = '/storage/' . $path;
        } else {
            unset($validated['featured_image']);
        }

        if ($request->hasFile('gallery_images')) {
            $gallery = $project->gallery ?? [];
            foreach ($request->file('gallery_images') as $file) {
                $path = $file->store('projects/gallery', 'public');
                $gallery[] = '/storage/' . $path;
            }
            $validated['gallery'] = $gallery;
        }

        unset($validated['gallery_images']);

        $project->update($validated);

        AuditLogger::log('updated', 'Project', $project->id, [
            'title' => $project->title,
        ]);

        return redirect()->back()->with('success', "Project '{$project->title}' updated successfully.");
    }

    /**
     * Remove the specified project.
     */
    public function destroy(int $id): RedirectResponse
    {
        $project = Project::findOrFail($id);
        $title = $project->title;

        if ($project->featured_image && str_starts_with($project->featured_image, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $project->featured_image));
        }

        if (!empty($project->gallery) && is_array($project->gallery)) {
            foreach ($project->gallery as $img) {
                if ($img && str_starts_with($img, '/storage/')) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $img));
                }
            }
        }

        $project->delete();

        AuditLogger::log('deleted', 'Project', $id, [
            'title' => $title,
        ]);

        return redirect()->back()->with('success', "Project '{$title}' removed.");
    }
}
