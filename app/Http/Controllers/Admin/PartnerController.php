<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PartnerController extends Controller
{
    /**
     * Display a listing of institutional partners.
     */
    public function index(): Response
    {
        $partners = Partner::orderBy('sort_order')->get();

        return Inertia::render('Admin/Partners/Index', [
            'partners' => $partners,
        ]);
    }

    /**
     * Store a newly created partner.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:partners,slug',
            'category' => 'required|string',
            'description' => 'nullable|string',
            'website' => 'nullable|url|max:255',
            'logo' => 'nullable|image|max:2048',
            'sort_order' => 'integer|min:0',
            'status' => 'required|string',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('partners', 'public');
            $validated['logo'] = '/storage/' . $path;
        }

        $partner = Partner::create($validated);

        AuditLogger::log('created', 'Partner', $partner->id, [
            'name' => $partner->name,
        ]);

        return redirect()->back()->with('success', "Partner '{$partner->name}' added successfully.");
    }

    /**
     * Update the specified partner.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $partner = Partner::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:partners,slug,' . $id,
            'category' => 'required|string',
            'description' => 'nullable|string',
            'website' => 'nullable|url|max:255',
            'logo' => 'nullable|image|max:2048',
            'sort_order' => 'integer|min:0',
            'status' => 'required|string',
        ]);

        if ($request->hasFile('logo')) {
            if ($partner->logo && str_starts_with($partner->logo, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $partner->logo));
            }
            $path = $request->file('logo')->store('partners', 'public');
            $validated['logo'] = '/storage/' . $path;
        } else {
            unset($validated['logo']);
        }

        $partner->update($validated);

        AuditLogger::log('updated', 'Partner', $partner->id, [
            'name' => $partner->name,
        ]);

        return redirect()->back()->with('success', "Partner '{$partner->name}' updated successfully.");
    }

    /**
     * Remove the specified partner.
     */
    public function destroy(int $id): RedirectResponse
    {
        $partner = Partner::findOrFail($id);
        $name = $partner->name;

        if ($partner->logo && str_starts_with($partner->logo, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $partner->logo));
        }

        $partner->delete();

        AuditLogger::log('deleted', 'Partner', $id, [
            'name' => $name,
        ]);

        return redirect()->back()->with('success', "Partner '{$name}' removed.");
    }
}
