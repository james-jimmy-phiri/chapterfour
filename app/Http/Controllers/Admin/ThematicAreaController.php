<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ThematicArea;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
            'icon' => 'nullable|string|max:50',
            'sort_order' => 'integer|min:0',
            'status' => 'required|string',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

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
            'icon' => 'nullable|string|max:50',
            'sort_order' => 'integer|min:0',
            'status' => 'required|string',
        ]);

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
        $area->delete();

        AuditLogger::log('deleted', 'ThematicArea', $id, [
            'title' => $title,
        ]);

        return redirect()->back()->with('success', "Thematic pillar '{$title}' deleted.");
    }
}
