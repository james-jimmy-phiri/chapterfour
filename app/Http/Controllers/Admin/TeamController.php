<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    /**
     * Display a listing of team members.
     */
    public function index(): Response
    {
        $team = TeamMember::orderBy('sort_order')->get();

        return Inertia::render('Admin/Team/Index', [
            'teamMembers' => $team,
        ]);
    }

    /**
     * Store a newly created team member.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'department' => 'nullable|string|max:255',
            'category' => 'required|string',
            'biography' => 'nullable|string',
            'sort_order' => 'integer|min:0',
            'status' => 'required|string',
        ]);

        $member = TeamMember::create($validated);

        AuditLogger::log('created', 'TeamMember', $member->id, [
            'name' => $member->name,
            'role' => $member->role,
        ]);

        return redirect()->back()->with('success', "Team member '{$member->name}' added successfully.");
    }

    /**
     * Update the specified team member.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $member = TeamMember::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'department' => 'nullable|string|max:255',
            'category' => 'required|string',
            'biography' => 'nullable|string',
            'sort_order' => 'integer|min:0',
            'status' => 'required|string',
        ]);

        $member->update($validated);

        AuditLogger::log('updated', 'TeamMember', $member->id, [
            'name' => $member->name,
        ]);

        return redirect()->back()->with('success', "Team member '{$member->name}' updated successfully.");
    }

    /**
     * Remove the specified team member.
     */
    public function destroy(int $id): RedirectResponse
    {
        $member = TeamMember::findOrFail($id);
        $name = $member->name;
        $member->delete();

        AuditLogger::log('deleted', 'TeamMember', $id, [
            'name' => $name,
        ]);

        return redirect()->back()->with('success', "Team member '{$name}' removed.");
    }
}
