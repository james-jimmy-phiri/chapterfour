<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TimelineEvent;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TimelineEventController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/TimelineEvents/Index', [
            'timelineEvents' => TimelineEvent::orderBy('year', 'asc')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'year'        => 'required|integer|min:1900|max:2100',
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'status'      => 'required|string|in:published,draft',
        ]);

        $event = TimelineEvent::create($validated);
        AuditLogger::log('created', 'TimelineEvent', $event->id, ['title' => $event->title]);

        return redirect()->back()->with('success', "Timeline event '{$event->title}' created.");
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $event = TimelineEvent::findOrFail($id);

        $validated = $request->validate([
            'year'        => 'required|integer|min:1900|max:2100',
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'status'      => 'required|string|in:published,draft',
        ]);

        $event->update($validated);
        AuditLogger::log('updated', 'TimelineEvent', $event->id, ['title' => $event->title]);

        return redirect()->back()->with('success', "Timeline event '{$event->title}' updated.");
    }

    public function destroy(int $id): RedirectResponse
    {
        $event = TimelineEvent::findOrFail($id);
        $title = $event->title;
        $event->delete();
        AuditLogger::log('deleted', 'TimelineEvent', $id, ['title' => $title]);

        return redirect()->back()->with('success', "Timeline event '{$title}' deleted.");
    }
}
