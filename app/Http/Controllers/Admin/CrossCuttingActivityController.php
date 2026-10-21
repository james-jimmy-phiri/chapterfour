<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CrossCuttingActivity;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CrossCuttingActivityController extends Controller
{
    public function index(): Response
    {
        $activities = CrossCuttingActivity::orderBy('sort_order')->get();

        return Inertia::render('Admin/CrossCuttingActivities/Index', [
            'activities' => $activities,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'area'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon'        => 'nullable|string|max:100',
            'color_class' => 'nullable|string|max:100',
            'bg_class'    => 'nullable|string|max:100',
            'sort_order'  => 'nullable|integer',
            'status'      => 'required|string|in:published,draft',
        ]);

        $act = CrossCuttingActivity::create($validated);

        AuditLogger::log('created', 'CrossCuttingActivity', $act->id, ['area' => $act->area]);

        return redirect()->back()->with('success', "Activity '{$act->area}' created.");
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $act = CrossCuttingActivity::findOrFail($id);

        $validated = $request->validate([
            'area'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon'        => 'nullable|string|max:100',
            'color_class' => 'nullable|string|max:100',
            'bg_class'    => 'nullable|string|max:100',
            'sort_order'  => 'nullable|integer',
            'status'      => 'required|string|in:published,draft',
        ]);

        $act->update($validated);

        AuditLogger::log('updated', 'CrossCuttingActivity', $act->id, ['area' => $act->area]);

        return redirect()->back()->with('success', "Activity '{$act->area}' updated.");
    }

    public function destroy(int $id): RedirectResponse
    {
        $act = CrossCuttingActivity::findOrFail($id);
        $area = $act->area;
        $act->delete();

        AuditLogger::log('deleted', 'CrossCuttingActivity', $id, ['area' => $area]);

        return redirect()->back()->with('success', "Activity '{$area}' removed.");
    }
}
