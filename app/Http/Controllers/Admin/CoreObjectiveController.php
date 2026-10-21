<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CoreObjective;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CoreObjectiveController extends Controller
{
    public function index(): Response
    {
        $objectives = CoreObjective::orderBy('sort_order')->get();

        return Inertia::render('Admin/CoreObjectives/Index', [
            'objectives' => $objectives,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'      => 'required|string|max:255',
            'description'=> 'nullable|string',
            'icon'       => 'nullable|string|max:100',
            'activities' => 'nullable|array',
            'activities.*'=> 'string',
            'page_scope' => 'required|string|in:who_we_are,core_activities,both',
            'sort_order' => 'nullable|integer',
            'status'     => 'required|string|in:published,draft',
        ]);

        $obj = CoreObjective::create($validated);

        AuditLogger::log('created', 'CoreObjective', $obj->id, ['title' => $obj->title]);

        return redirect()->back()->with('success', "Objective '{$obj->title}' created.");
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $obj = CoreObjective::findOrFail($id);

        $validated = $request->validate([
            'title'      => 'required|string|max:255',
            'description'=> 'nullable|string',
            'icon'       => 'nullable|string|max:100',
            'activities' => 'nullable|array',
            'activities.*'=> 'string',
            'page_scope' => 'required|string|in:who_we_are,core_activities,both',
            'sort_order' => 'nullable|integer',
            'status'     => 'required|string|in:published,draft',
        ]);

        $obj->update($validated);

        AuditLogger::log('updated', 'CoreObjective', $obj->id, ['title' => $obj->title]);

        return redirect()->back()->with('success', "Objective '{$obj->title}' updated.");
    }

    public function destroy(int $id): RedirectResponse
    {
        $obj = CoreObjective::findOrFail($id);
        $title = $obj->title;
        $obj->delete();

        AuditLogger::log('deleted', 'CoreObjective', $id, ['title' => $title]);

        return redirect()->back()->with('success', "Objective '{$title}' removed.");
    }
}
