<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteContentBlock;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class SiteContentBlockController extends Controller
{
    public function index(): Response
    {
        $blocks = SiteContentBlock::orderBy('page')->orderBy('sort_order')->get();

        return Inertia::render('Admin/ContentBlocks/Index', [
            'blocks' => $blocks,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'key'        => 'required|string|max:255|unique:site_content_blocks,key',
            'page'       => 'nullable|string|max:100',
            'section'    => 'nullable|string|max:100',
            'title'      => 'nullable|string|max:255',
            'body'       => 'nullable|string',
            'sort_order' => 'nullable|integer',
        ]);

        $block = SiteContentBlock::create($validated);

        Cache::forget('site_content_blocks');

        AuditLogger::log('created', 'SiteContentBlock', $block->id, ['key' => $block->key]);

        return redirect()->back()->with('success', "Content block '{$block->key}' created.");
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $block = SiteContentBlock::findOrFail($id);

        $validated = $request->validate([
            'key'        => 'required|string|max:255|unique:site_content_blocks,key,' . $id,
            'page'       => 'nullable|string|max:100',
            'section'    => 'nullable|string|max:100',
            'title'      => 'nullable|string|max:255',
            'body'       => 'nullable|string',
            'sort_order' => 'nullable|integer',
        ]);

        $block->update($validated);

        Cache::forget('site_content_blocks');

        AuditLogger::log('updated', 'SiteContentBlock', $block->id, ['key' => $block->key]);

        return redirect()->back()->with('success', "Content block '{$block->key}' updated.");
    }

    public function destroy(int $id): RedirectResponse
    {
        $block = SiteContentBlock::findOrFail($id);
        $key = $block->key;
        $block->delete();

        Cache::forget('site_content_blocks');

        AuditLogger::log('deleted', 'SiteContentBlock', $id, ['key' => $key]);

        return redirect()->back()->with('success', "Content block '{$key}' removed.");
    }
}
