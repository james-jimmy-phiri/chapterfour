<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function index(Request $request): Response
    {
        $testimonials = Testimonial::orderBy('sort_order')->latest()->get();

        return Inertia::render('Admin/Testimonials/Index', [
            'testimonials' => $testimonials,
            'categories' => [
                ['value' => 'community', 'label' => 'Community Member / Citizen'],
                ['value' => 'beneficiary', 'label' => 'Direct Legal Beneficiary'],
                ['value' => 'partner', 'label' => 'Civil Society / Institutional Partner'],
                ['value' => 'paralegal', 'label' => 'Community Paralegal / Field Advocate'],
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'role'         => 'nullable|string|max:255',
            'organization' => 'nullable|string|max:255',
            'quote'        => 'required|string',
            'avatar'       => 'nullable|image|max:4096',
            'rating'       => 'nullable|integer|min:1|max:5',
            'category'     => 'required|string|max:50',
            'sort_order'   => 'nullable|integer',
            'status'       => 'required|string|in:published,draft',
        ]);

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('testimonials', 'public');
            $validated['avatar'] = '/storage/' . $path;
        }

        $validated['rating'] = $validated['rating'] ?? 5;
        $validated['sort_order'] = $validated['sort_order'] ?? (Testimonial::count() + 1);

        $testimonial = Testimonial::create($validated);

        AuditLogger::log('created', 'Testimonial', $testimonial->id, [
            'name' => $testimonial->name,
            'category' => $testimonial->category,
        ]);

        return redirect()->back()->with('success', "Testimonial from '{$testimonial->name}' added.");
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $testimonial = Testimonial::findOrFail($id);

        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'role'         => 'nullable|string|max:255',
            'organization' => 'nullable|string|max:255',
            'quote'        => 'required|string',
            'avatar'       => 'nullable|image|max:4096',
            'rating'       => 'nullable|integer|min:1|max:5',
            'category'     => 'required|string|max:50',
            'sort_order'   => 'nullable|integer',
            'status'       => 'required|string|in:published,draft',
        ]);

        if ($request->hasFile('avatar')) {
            if ($testimonial->avatar && str_starts_with($testimonial->avatar, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $testimonial->avatar));
            }
            $path = $request->file('avatar')->store('testimonials', 'public');
            $validated['avatar'] = '/storage/' . $path;
        } else {
            unset($validated['avatar']);
        }

        $testimonial->update($validated);

        AuditLogger::log('updated', 'Testimonial', $testimonial->id, [
            'name' => $testimonial->name,
        ]);

        return redirect()->back()->with('success', "Testimonial from '{$testimonial->name}' updated.");
    }

    public function destroy(int $id): RedirectResponse
    {
        $testimonial = Testimonial::findOrFail($id);
        $name = $testimonial->name;

        if ($testimonial->avatar && str_starts_with($testimonial->avatar, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $testimonial->avatar));
        }

        $testimonial->delete();

        AuditLogger::log('deleted', 'Testimonial', $id, ['name' => $name]);

        return redirect()->back()->with('success', "Testimonial from '{$name}' removed.");
    }
}
