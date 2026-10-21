<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $status = $request->query('status');

        $query = Page::with('author')->latest();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        if ($status && $status !== 'all') {
            $query->where('status', $status);
        }

        $pages = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/Pages/Index', [
            'pages' => $pages,
            'filters' => [
                'search' => $search ?? '',
                'status' => $status ?? 'all',
            ],
            'templates' => [
                ['value' => 'default', 'label' => 'Default Standard Page'],
                ['value' => 'full_width', 'label' => 'Full Width Canvas'],
                ['value' => 'policy', 'label' => 'Legal & Policy Document'],
                ['value' => 'report', 'label' => 'Executive Report Layout'],
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'slug'           => 'nullable|string|max:255|unique:pages,slug',
            'template'       => 'nullable|string|max:100',
            'excerpt'        => 'nullable|string|max:1000',
            'body'           => 'nullable|string',
            'featured_image' => 'nullable|image|max:4096',
            'status'         => 'required|string|in:published,draft,archived',
        ]);

        $slug = !empty($validated['slug'])
            ? Str::slug($validated['slug'])
            : Str::slug($validated['title']);

        $baseSlug = $slug;
        $count = 1;
        while (Page::where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$count}";
            $count++;
        }
        $validated['slug'] = $slug;

        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('pages', 'public');
            $validated['featured_image'] = '/storage/' . $path;
        }

        $validated['author_id'] = $request->user()?->id;
        $validated['template'] = $validated['template'] ?? 'default';
        if ($validated['status'] === 'published') {
            $validated['published_at'] = now();
        }

        $page = Page::create($validated);

        AuditLogger::log('created', 'Page', $page->id, [
            'title' => $page->title,
            'slug' => $page->slug,
            'status' => $page->status,
        ]);

        return redirect()->back()->with('success', "Page '{$page->title}' created successfully.");
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $page = Page::findOrFail($id);

        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'slug'           => 'nullable|string|max:255|unique:pages,slug,' . $id,
            'template'       => 'nullable|string|max:100',
            'excerpt'        => 'nullable|string|max:1000',
            'body'           => 'nullable|string',
            'featured_image' => 'nullable|image|max:4096',
            'status'         => 'required|string|in:published,draft,archived',
        ]);

        if (!empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['slug']);
        } else {
            $validated['slug'] = $page->slug;
        }

        if ($request->hasFile('featured_image')) {
            if ($page->featured_image && str_starts_with($page->featured_image, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $page->featured_image));
            }
            $path = $request->file('featured_image')->store('pages', 'public');
            $validated['featured_image'] = '/storage/' . $path;
        } else {
            unset($validated['featured_image']);
        }

        if ($validated['status'] === 'published' && !$page->published_at) {
            $validated['published_at'] = now();
        }

        $page->update($validated);

        AuditLogger::log('updated', 'Page', $page->id, [
            'title' => $page->title,
            'status' => $page->status,
        ]);

        return redirect()->back()->with('success', "Page '{$page->title}' updated successfully.");
    }

    public function destroy(int $id): RedirectResponse
    {
        $page = Page::findOrFail($id);
        $title = $page->title;

        if ($page->featured_image && str_starts_with($page->featured_image, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $page->featured_image));
        }

        $page->delete();

        AuditLogger::log('deleted', 'Page', $id, ['title' => $title]);

        return redirect()->back()->with('success', "Page '{$title}' removed.");
    }
}
