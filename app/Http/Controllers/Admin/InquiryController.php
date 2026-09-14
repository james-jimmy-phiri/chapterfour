<?php

namespace App\Http\Controllers\Admin;

use App\Enums\InquiryStatus;
use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InquiryController extends Controller
{
    /**
     * Display a listing of inquiries.
     */
    public function index(Request $request): Response
    {
        $status = $request->query('status');
        $search = $request->query('search');

        $query = Inquiry::latest();

        if ($status && $status !== 'all') {
            $query->where('status', $status);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%");
            });
        }

        $inquiries = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/Inquiries/Index', [
            'inquiries' => $inquiries,
            'filters' => [
                'status' => $status ?? 'all',
                'search' => $search ?? '',
            ],
            'statuses' => array_map(fn ($case) => [
                'value' => $case->value,
                'label' => ucwords(str_replace('_', ' ', $case->value)),
            ], InquiryStatus::cases()),
        ]);
    }

    /**
     * Update the status of an inquiry.
     */
    public function updateStatus(Request $request, int $id): RedirectResponse
    {
        $inquiry = Inquiry::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|string',
        ]);

        $inquiry->update(['status' => $validated['status']]);

        AuditLogger::log('updated', 'Inquiry', $inquiry->id, [
            'status' => $validated['status'],
            'subject' => $inquiry->subject,
        ]);

        return redirect()->back()->with('success', 'Inquiry status updated.');
    }

    /**
     * Update internal staff notes on an inquiry.
     */
    public function updateNotes(Request $request, int $id): RedirectResponse
    {
        $inquiry = Inquiry::findOrFail($id);

        $validated = $request->validate([
            'internal_notes' => 'nullable|string|max:5000',
        ]);

        $inquiry->update(['internal_notes' => $validated['internal_notes']]);

        AuditLogger::log('updated_notes', 'Inquiry', $inquiry->id, [
            'subject' => $inquiry->subject,
        ]);

        return redirect()->back()->with('success', 'Internal notes updated.');
    }

    /**
     * Delete an inquiry.
     */
    public function destroy(int $id): RedirectResponse
    {
        $inquiry = Inquiry::findOrFail($id);
        $subject = $inquiry->subject;
        $inquiry->delete();

        AuditLogger::log('deleted', 'Inquiry', $id, [
            'subject' => $subject,
        ]);

        return redirect()->back()->with('success', 'Inquiry removed.');
    }
}
