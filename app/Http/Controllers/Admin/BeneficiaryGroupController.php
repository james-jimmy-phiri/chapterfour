<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BeneficiaryGroup;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BeneficiaryGroupController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/BeneficiaryGroups/Index', [
            'beneficiaryGroups' => BeneficiaryGroup::orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon'        => 'nullable|string|max:255',
            'icon_file'   => 'nullable|image|max:2048',
            'image'       => 'nullable|image|max:4096',
            'sort_order'  => 'integer|min:0',
            'status'      => 'required|string|in:published,draft',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('beneficiary_groups', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        if ($request->hasFile('icon_file')) {
            $path = $request->file('icon_file')->store('beneficiary_groups', 'public');
            $validated['icon'] = '/storage/' . $path;
        }

        unset($validated['icon_file']);

        $group = BeneficiaryGroup::create($validated);
        AuditLogger::log('created', 'BeneficiaryGroup', $group->id, ['name' => $group->name]);

        return redirect()->back()->with('success', "Beneficiary group '{$group->name}' created.");
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $group = BeneficiaryGroup::findOrFail($id);

        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon'        => 'nullable|string|max:255',
            'icon_file'   => 'nullable|image|max:2048',
            'image'       => 'nullable|image|max:4096',
            'sort_order'  => 'integer|min:0',
            'status'      => 'required|string|in:published,draft',
        ]);

        if ($request->hasFile('image')) {
            if ($group->image && str_starts_with($group->image, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $group->image));
            }
            $path = $request->file('image')->store('beneficiary_groups', 'public');
            $validated['image'] = '/storage/' . $path;
        } else {
            unset($validated['image']);
        }

        if ($request->hasFile('icon_file')) {
            if ($group->icon && str_starts_with($group->icon, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $group->icon));
            }
            $path = $request->file('icon_file')->store('beneficiary_groups', 'public');
            $validated['icon'] = '/storage/' . $path;
        } elseif (empty($validated['icon'])) {
            unset($validated['icon']);
        }

        unset($validated['icon_file']);

        $group->update($validated);
        AuditLogger::log('updated', 'BeneficiaryGroup', $group->id, ['name' => $group->name]);

        return redirect()->back()->with('success', "Beneficiary group '{$group->name}' updated.");
    }

    public function destroy(int $id): RedirectResponse
    {
        $group = BeneficiaryGroup::findOrFail($id);
        $name = $group->name;

        if ($group->image && str_starts_with($group->image, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $group->image));
        }
        if ($group->icon && str_starts_with($group->icon, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $group->icon));
        }

        $group->delete();
        AuditLogger::log('deleted', 'BeneficiaryGroup', $id, ['name' => $name]);

        return redirect()->back()->with('success', "Beneficiary group '{$name}' deleted.");
    }
}
