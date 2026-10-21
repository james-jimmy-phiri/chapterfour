<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HeroSlideController extends Controller
{
    public function index(): Response
    {
        $slides = HeroSlide::orderBy('sort_order')->get();

        return Inertia::render('Admin/HeroSlides/Index', [
            'slides' => $slides,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'word'         => 'required|string|max:255',
            'accent_label' => 'nullable|string|max:100',
            'bg_image'     => 'nullable|image|max:8096',
            'right_image'  => 'nullable|image|max:8096',
            'right_alt'    => 'nullable|string|max:255',
            'sort_order'   => 'nullable|integer',
            'status'       => 'required|string|in:published,draft',
        ]);

        if ($request->hasFile('bg_image')) {
            $path = $request->file('bg_image')->store('hero-slides', 'public');
            $validated['bg_image'] = '/storage/' . $path;
        }

        if ($request->hasFile('right_image')) {
            $path = $request->file('right_image')->store('hero-slides', 'public');
            $validated['right_image'] = '/storage/' . $path;
        }

        $slide = HeroSlide::create($validated);

        AuditLogger::log('created', 'HeroSlide', $slide->id, ['word' => $slide->word]);

        return redirect()->back()->with('success', "Hero slide '{$slide->word}' created successfully.");
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $slide = HeroSlide::findOrFail($id);

        $validated = $request->validate([
            'word'         => 'required|string|max:255',
            'accent_label' => 'nullable|string|max:100',
            'bg_image'     => 'nullable|image|max:8096',
            'right_image'  => 'nullable|image|max:8096',
            'right_alt'    => 'nullable|string|max:255',
            'sort_order'   => 'nullable|integer',
            'status'       => 'required|string|in:published,draft',
        ]);

        if ($request->hasFile('bg_image')) {
            if ($slide->bg_image && str_starts_with($slide->bg_image, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $slide->bg_image));
            }
            $path = $request->file('bg_image')->store('hero-slides', 'public');
            $validated['bg_image'] = '/storage/' . $path;
        } else {
            unset($validated['bg_image']);
        }

        if ($request->hasFile('right_image')) {
            if ($slide->right_image && str_starts_with($slide->right_image, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $slide->right_image));
            }
            $path = $request->file('right_image')->store('hero-slides', 'public');
            $validated['right_image'] = '/storage/' . $path;
        } else {
            unset($validated['right_image']);
        }

        $slide->update($validated);

        AuditLogger::log('updated', 'HeroSlide', $slide->id, ['word' => $slide->word]);

        return redirect()->back()->with('success', "Hero slide '{$slide->word}' updated.");
    }

    public function destroy(int $id): RedirectResponse
    {
        $slide = HeroSlide::findOrFail($id);

        foreach (['bg_image', 'right_image'] as $field) {
            if ($slide->$field && str_starts_with($slide->$field, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $slide->$field));
            }
        }

        $word = $slide->word;
        $slide->delete();

        AuditLogger::log('deleted', 'HeroSlide', $id, ['word' => $word]);

        return redirect()->back()->with('success', "Hero slide '{$word}' removed.");
    }

    public function reorder(Request $request): RedirectResponse
    {
        $request->validate(['order' => 'required|array', 'order.*' => 'integer']);

        foreach ($request->order as $index => $slideId) {
            HeroSlide::where('id', $slideId)->update(['sort_order' => $index]);
        }

        return redirect()->back()->with('success', 'Slide order updated.');
    }
}
