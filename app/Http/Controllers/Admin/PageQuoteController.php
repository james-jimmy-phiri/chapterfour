<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageQuote;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PageQuoteController extends Controller
{
    public function index(): Response
    {
        $quotes = PageQuote::orderBy('page_key')->orderBy('sort_order')->get();

        return Inertia::render('Admin/PageQuotes/Index', [
            'quotes' => $quotes,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'quote_text'  => 'required|string',
            'attribution' => 'required|string|max:255',
            'image'       => 'nullable|image|max:4096',
            'page_key'    => 'nullable|string|max:100',
            'sort_order'  => 'nullable|integer',
            'status'      => 'required|string|in:published,draft',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('quotes', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $quote = PageQuote::create($validated);

        AuditLogger::log('created', 'PageQuote', $quote->id, ['attribution' => $quote->attribution]);

        return redirect()->back()->with('success', 'Quote added successfully.');
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $quote = PageQuote::findOrFail($id);

        $validated = $request->validate([
            'quote_text'  => 'required|string',
            'attribution' => 'required|string|max:255',
            'image'       => 'nullable|image|max:4096',
            'page_key'    => 'nullable|string|max:100',
            'sort_order'  => 'nullable|integer',
            'status'      => 'required|string|in:published,draft',
        ]);

        if ($request->hasFile('image')) {
            if ($quote->image && str_starts_with($quote->image, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $quote->image));
            }
            $path = $request->file('image')->store('quotes', 'public');
            $validated['image'] = '/storage/' . $path;
        } else {
            unset($validated['image']);
        }

        $quote->update($validated);

        AuditLogger::log('updated', 'PageQuote', $quote->id, ['attribution' => $quote->attribution]);

        return redirect()->back()->with('success', 'Quote updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $quote = PageQuote::findOrFail($id);

        if ($quote->image && str_starts_with($quote->image, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $quote->image));
        }

        $attr = $quote->attribution;
        $quote->delete();

        AuditLogger::log('deleted', 'PageQuote', $id, ['attribution' => $attr]);

        return redirect()->back()->with('success', "Quote by '{$attr}' removed.");
    }
}
