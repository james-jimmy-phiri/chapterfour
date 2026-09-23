<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ThematicArea;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ThematicAreaController extends Controller
{
    /**
     * Display a listing of thematic areas.
     */
    public function index(): Response
    {
        $thematicAreas = ThematicArea::orderBy('sort_order')->get();

        return Inertia::render('Admin/ThematicAreas/Index', [
            'thematicAreas' => $thematicAreas,
        ]);
    }

    /**
     * Store a newly created thematic area.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:thematic_areas,slug',
            'short_description' => 'nullable|string|max:500',
            'body' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
            'icon_file' => 'nullable|image|max:2048',
            'cover_image' => 'nullable|image|max:4096',
            'hero_image' => 'nullable|image|max:4096',
            'sort_order' => 'integer|min:0',
            'status' => 'required|string',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        if ($request->hasFile('icon_file')) {
            $path = $request->file('icon_file')->store('thematic_areas', 'public');
            $validated['icon'] = '/storage/' . $path;
        }

        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('thematic_areas', 'public');
            $validated['cover_image'] = '/storage/' . $path;
        }

        if ($request->hasFile('hero_image')) {
            $path = $request->file('hero_image')->store('thematic_areas', 'public');
            $validated['hero_image'] = '/storage/' . $path;
        }

        unset($validated['icon_file']);

        $area = ThematicArea::create($validated);

        AuditLogger::log('created', 'ThematicArea', $area->id, [
            'title' => $area->title,
        ]);

        return redirect()->back()->with('success', "Thematic pillar '{$area->title}' created successfully.");
    }

    /**
     * Update the specified thematic area.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $area = ThematicArea::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:thematic_areas,slug,' . $id,
            'short_description' => 'nullable|string|max:500',
            'body' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
            'icon_file' => 'nullable|image|max:2048',
            'cover_image' => 'nullable|image|max:4096',
            'hero_image' => 'nullable|image|max:4096',
            'sort_order' => 'integer|min:0',
            'status' => 'required|string',
        ]);

        if ($request->hasFile('icon_file')) {
            if ($area->icon && str_starts_with($area->icon, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $area->icon));
            }
            $path = $request->file('icon_file')->store('thematic_areas', 'public');
            $validated['icon'] = '/storage/' . $path;
        } elseif (empty($validated['icon'])) {
            unset($validated['icon']);
        }

        if ($request->hasFile('cover_image')) {
            if ($area->cover_image && str_starts_with($area->cover_image, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $area->cover_image));
            }
            $path = $request->file('cover_image')->store('thematic_areas', 'public');
            $validated['cover_image'] = '/storage/' . $path;
        } else {
            unset($validated['cover_image']);
        }

        if ($request->hasFile('hero_image')) {
            if ($area->hero_image && str_starts_with($area->hero_image, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $area->hero_image));
            }
            $path = $request->file('hero_image')->store('thematic_areas', 'public');
            $validated['hero_image'] = '/storage/' . $path;
        } else {
            unset($validated['hero_image']);
        }

        unset($validated['icon_file']);

        $area->update($validated);

        AuditLogger::log('updated', 'ThematicArea', $area->id, [
            'title' => $area->title,
        ]);

        return redirect()->back()->with('success', "Thematic pillar '{$area->title}' updated successfully.");
    }

    /**
     * Remove the specified thematic area.
     */
    public function destroy(int $id): RedirectResponse
    {
        $area = ThematicArea::findOrFail($id);
        $title = $area->title;

        if ($area->icon && str_starts_with($area->icon, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $area->icon));
        }
        if ($area->cover_image && str_starts_with($area->cover_image, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $area->cover_image));
        }
        if ($area->hero_image && str_starts_with($area->hero_image, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $area->hero_image));
        }

        $area->delete();

        AuditLogger::log('deleted', 'ThematicArea', $id, [
            'title' => $title,
        ]);

        return redirect()->back()->with('success', "Thematic pillar '{$title}' deleted.");
    }
}
