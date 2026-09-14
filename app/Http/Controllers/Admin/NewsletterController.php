<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class NewsletterController extends Controller
{
    /**
     * Display a listing of newsletter subscribers.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $status = $request->query('status');

        $query = NewsletterSubscriber::latest();

        if ($search) {
            $query->where('email', 'like', "%{$search}%");
        }

        if ($status && $status !== 'all') {
            $query->where('status', $status);
        }

        $subscribers = $query->paginate(20)->withQueryString();

        return Inertia::render('Admin/Newsletter/Index', [
            'subscribers' => $subscribers,
            'filters' => [
                'search' => $search ?? '',
                'status' => $status ?? 'all',
            ],
            'totalActive' => NewsletterSubscriber::where('status', 'subscribed')->count(),
        ]);
    }

    /**
     * Toggle subscription status between subscribed and unsubscribed.
     */
    public function toggleStatus(int $id): RedirectResponse
    {
        $subscriber = NewsletterSubscriber::findOrFail($id);

        $newStatus = $subscriber->status === 'subscribed' ? 'unsubscribed' : 'subscribed';
        $subscriber->update([
            'status' => $newStatus,
            'unsubscribed_at' => $newStatus === 'unsubscribed' ? now() : null,
        ]);

        AuditLogger::log('updated_status', 'NewsletterSubscriber', $subscriber->id, [
            'status' => $newStatus,
            'email' => $subscriber->email,
        ]);

        return redirect()->back()->with('success', "Subscriber status updated to {$newStatus}.");
    }

    /**
     * Delete a subscriber.
     */
    public function destroy(int $id): RedirectResponse
    {
        $subscriber = NewsletterSubscriber::findOrFail($id);
        $email = $subscriber->email;
        $subscriber->delete();

        AuditLogger::log('deleted', 'NewsletterSubscriber', $id, [
            'email' => $email,
        ]);

        return redirect()->back()->with('success', 'Subscriber removed.');
    }

    /**
     * Export all subscribers to CSV.
     */
    public function exportCsv(): StreamedResponse
    {
        $fileName = 'chapter-four-subscribers-' . now()->format('Y-m-d') . '.csv';

        AuditLogger::log('exported_csv', 'NewsletterSubscriber');

        return response()->streamDownload(function () {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['ID', 'Email', 'Status', 'Source', 'Consented At', 'Unsubscribed At']);

            NewsletterSubscriber::chunk(100, function ($subscribers) use ($handle) {
                foreach ($subscribers as $sub) {
                    fputcsv($handle, [
                        $sub->id,
                        $sub->email,
                        $sub->status,
                        $sub->source,
                        $sub->consented_at?->toIso8601String(),
                        $sub->unsubscribed_at?->toIso8601String(),
                    ]);
                }
            });

            fclose($handle);
        }, $fileName, [
            'Content-Type' => 'text/csv',
        ]);
    }
}
