<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ImpactStatistic;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StatisticController extends Controller
{
    /**
     * Display a listing of impact statistics.
     */
    public function index(): Response
    {
        $statistics = ImpactStatistic::orderBy('sort_order')->get();

        return Inertia::render('Admin/Statistics/Index', [
            'statistics' => $statistics,
        ]);
    }

    /**
     * Store a newly created statistic.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'value' => 'required|string|max:100',
            'prefix' => 'nullable|string|max:20',
            'suffix' => 'nullable|string|max:20',
            'description' => 'nullable|string|max:500',
            'icon' => 'nullable|string|max:50',
            'sort_order' => 'nullable|integer',
            'status' => 'nullable|string',
        ]);

        $stat = ImpactStatistic::create([
            'label' => $validated['label'],
            'value' => $validated['value'],
            'prefix' => $validated['prefix'] ?? null,
            'suffix' => $validated['suffix'] ?? null,
            'description' => $validated['description'] ?? null,
            'icon' => $validated['icon'] ?? 'Users',
            'sort_order' => $validated['sort_order'] ?? (ImpactStatistic::max('sort_order') + 1),
            'status' => $validated['status'] ?? 'published',
        ]);

        AuditLogger::log('created', 'ImpactStatistic', $stat->id, [
            'label' => $stat->label,
            'value' => $stat->value,
        ]);

        return redirect()->back()->with('success', 'Impact statistic added.');
    }

    /**
     * Update an impact statistic.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $stat = ImpactStatistic::findOrFail($id);

        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'value' => 'required|string|max:100',
            'prefix' => 'nullable|string|max:20',
            'suffix' => 'nullable|string|max:20',
            'description' => 'nullable|string|max:500',
            'icon' => 'nullable|string|max:50',
            'sort_order' => 'nullable|integer',
            'status' => 'nullable|string',
        ]);

        $stat->update($validated);

        AuditLogger::log('updated', 'ImpactStatistic', $stat->id, [
            'label' => $stat->label,
            'value' => $stat->value,
        ]);

        return redirect()->back()->with('success', 'Impact statistic updated.');
    }

    /**
     * Remove an impact statistic.
     */
    public function destroy(int $id): RedirectResponse
    {
        $stat = ImpactStatistic::findOrFail($id);
        $label = $stat->label;
        $stat->delete();

        AuditLogger::log('deleted', 'ImpactStatistic', $id, [
            'label' => $label,
        ]);

        return redirect()->back()->with('success', 'Impact statistic deleted.');
    }
}
