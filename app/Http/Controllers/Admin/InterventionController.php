<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Intervention;
use App\Models\ThematicArea;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class InterventionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Interventions/Index', [
            'interventions'  => Intervention::orderBy('sort_order')->get(),
            'thematicAreas'  => ThematicArea::orderBy('sort_order')->get(['id', 'title']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'            => 'required|string|max:255',
            'short_title'      => 'nullable|string|max:100',
            'description'      => 'nullable|string',
            'examples'         => 'nullable|array',
            'examples.*'       => 'string|max:255',
            'image'            => 'nullable|image|max:4096',
            'icon'             => 'nullable|string|max:255',
            'icon_file'        => 'nullable|image|max:2048',
            'thematic_area_id' => 'nullable|integer|exists:thematic_areas,id',
            'sort_order'       => 'integer|min:0',
            'status'           => 'required|string|in:published,draft',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('interventions', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        if ($request->hasFile('icon_file')) {
            $path = $request->file('icon_file')->store('interventions', 'public');
            $validated['icon'] = '/storage/' . $path;
        }

        unset($validated['icon_file']);

        $intervention = Intervention::create($validated);

        AuditLogger::log('created', 'Intervention', $intervention->id, ['title' => $intervention->title]);

        return redirect()->back()->with('success', "Intervention '{$intervention->title}' created.");
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $intervention = Intervention::findOrFail($id);

        $validated = $request->validate([
            'title'            => 'required|string|max:255',
            'short_title'      => 'nullable|string|max:100',
            'description'      => 'nullable|string',
            'examples'         => 'nullable|array',
            'examples.*'       => 'string|max:255',
            'image'            => 'nullable|image|max:4096',
            'icon'             => 'nullable|string|max:255',
            'icon_file'        => 'nullable|image|max:2048',
            'thematic_area_id' => 'nullable|integer|exists:thematic_areas,id',
            'sort_order'       => 'integer|min:0',
            'status'           => 'required|string|in:published,draft',
        ]);

        if ($request->hasFile('image')) {
            if ($intervention->image && str_starts_with($intervention->image, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $intervention->image));
            }
            $path = $request->file('image')->store('interventions', 'public');
            $validated['image'] = '/storage/' . $path;
        } else {
            unset($validated['image']);
        }

        if ($request->hasFile('icon_file')) {
            if ($intervention->icon && str_starts_with($intervention->icon, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $intervention->icon));
            }
            $path = $request->file('icon_file')->store('interventions', 'public');
            $validated['icon'] = '/storage/' . $path;
        } elseif (empty($validated['icon'])) {
            unset($validated['icon']);
        }

        unset($validated['icon_file']);

        $intervention->update($validated);

        AuditLogger::log('updated', 'Intervention', $intervention->id, ['title' => $intervention->title]);

        return redirect()->back()->with('success', "Intervention '{$intervention->title}' updated.");
    }

    public function destroy(int $id): RedirectResponse
    {
        $intervention = Intervention::findOrFail($id);
        $title = $intervention->title;

        if ($intervention->image && str_starts_with($intervention->image, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $intervention->image));
        }
        if ($intervention->icon && str_starts_with($intervention->icon, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $intervention->icon));
        }

        $intervention->delete();

        AuditLogger::log('deleted', 'Intervention', $id, ['title' => $title]);

        return redirect()->back()->with('success', "Intervention '{$title}' deleted.");
    }
}
