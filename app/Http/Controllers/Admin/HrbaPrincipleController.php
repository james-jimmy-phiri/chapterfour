<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HrbaPrinciple;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HrbaPrincipleController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/HrbaPrinciples/Index', [
            'hrbaPrinciples' => HrbaPrinciple::orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'icon'        => 'nullable|string|max:255',
            'icon_file'   => 'nullable|image|max:2048',
            'sort_order'  => 'integer|min:0',
            'status'      => 'required|string|in:published,draft',
        ]);

        if ($request->hasFile('icon_file')) {
            $path = $request->file('icon_file')->store('hrba_principles', 'public');
            $validated['icon'] = '/storage/' . $path;
        }

        unset($validated['icon_file']);

        $principle = HrbaPrinciple::create($validated);
        AuditLogger::log('created', 'HrbaPrinciple', $principle->id, ['title' => $principle->title]);

        return redirect()->back()->with('success', "HRBA Principle '{$principle->title}' created.");
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $principle = HrbaPrinciple::findOrFail($id);

        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'icon'        => 'nullable|string|max:255',
            'icon_file'   => 'nullable|image|max:2048',
            'sort_order'  => 'integer|min:0',
            'status'      => 'required|string|in:published,draft',
        ]);

        if ($request->hasFile('icon_file')) {
            if ($principle->icon && str_starts_with($principle->icon, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $principle->icon));
            }
            $path = $request->file('icon_file')->store('hrba_principles', 'public');
            $validated['icon'] = '/storage/' . $path;
        } elseif (empty($validated['icon'])) {
            unset($validated['icon']);
        }

        unset($validated['icon_file']);

        $principle->update($validated);
        AuditLogger::log('updated', 'HrbaPrinciple', $principle->id, ['title' => $principle->title]);

        return redirect()->back()->with('success', "HRBA Principle '{$principle->title}' updated.");
    }

    public function destroy(int $id): RedirectResponse
    {
        $principle = HrbaPrinciple::findOrFail($id);
        $title = $principle->title;

        if ($principle->icon && str_starts_with($principle->icon, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $principle->icon));
        }

        $principle->delete();
        AuditLogger::log('deleted', 'HrbaPrinciple', $id, ['title' => $title]);

        return redirect()->back()->with('success', "HRBA Principle '{$title}' deleted.");
    }
}
