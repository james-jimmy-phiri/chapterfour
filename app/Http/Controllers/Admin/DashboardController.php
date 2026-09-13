<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Resource;
use App\Models\Inquiry;
use App\Models\NewsletterSubscriber;
use App\Models\AuditLog;
use App\Models\Partner;
use App\Models\ThematicArea;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Serve the admin CMS dashboard.
     */
    public function index(): Response
    {
        // Content stats
        $publishedContent = Resource::where('status', 'published')->count();
        $drafts = Resource::where('status', 'draft')->count();
        $scheduled = Resource::where('status', 'scheduled')->count();

        // Engagement stats
        $inquiries = Inquiry::where('status', 'new')->count();
        $subscribers = NewsletterSubscriber::where('status', 'subscribed')->count();
        $mediaItems = 0; // Will be updated when media library is integrated

        // Recent audit activity
        $recentActivity = AuditLog::with('user')
            ->latest()
            ->take(10)
            ->get()
            ->map(fn ($log) => [
                'user'   => $log->user?->name ?? 'System',
                'action' => $log->action,
                'entity' => $log->entity_type . ($log->entity_id ? " #{$log->entity_id}" : ''),
                'time'   => $log->created_at->diffForHumans(),
                'type'   => $this->resolveActivityType($log->action),
            ])
            ->toArray();

        return Inertia::render('Dashboard', [
            'stats' => [
                'publishedContent' => $publishedContent,
                'drafts'           => $drafts,
                'scheduled'        => $scheduled,
                'inquiries'        => $inquiries,
                'subscribers'      => $subscribers,
                'mediaItems'       => $mediaItems,
            ],
            'recentActivity' => $recentActivity ?: [],
        ]);
    }

    /**
     * Map an audit log action string to an activity type for the UI.
     */
    private function resolveActivityType(string $action): string
    {
        return match (true) {
            str_contains($action, 'publish') => 'publish',
            str_contains($action, 'create') => 'create',
            str_contains($action, 'delete') => 'delete',
            str_contains($action, 'upload') => 'upload',
            default => 'update',
        };
    }
}
