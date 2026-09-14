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
        $mediaItems = 12;

        // Recent inquiries needing triage
        $recentInquiries = Inquiry::latest()
            ->take(4)
            ->get(['id', 'name', 'email', 'type', 'subject', 'status', 'created_at'])
            ->map(fn ($inq) => [
                'id' => $inq->id,
                'name' => $inq->name,
                'email' => $inq->email,
                'type' => $inq->type,
                'subject' => $inq->subject,
                'status' => $inq->status->value,
                'time' => $inq->created_at->diffForHumans(),
            ])
            ->toArray();

        // Recent content items
        $recentResources = Resource::latest()
            ->take(4)
            ->get(['id', 'title', 'slug', 'type', 'status', 'published_at', 'updated_at'])
            ->map(fn ($res) => [
                'id' => $res->id,
                'title' => $res->title,
                'slug' => $res->slug,
                'type' => $res->type->value,
                'status' => $res->status->value,
                'time' => ($res->published_at ?? $res->updated_at)->diffForHumans(),
            ])
            ->toArray();

        // Content counts
        $thematicAreasCount = ThematicArea::count();
        $projectsCount = \App\Models\Project::count();
        $teamCount = \App\Models\TeamMember::count();
        $partnersCount = Partner::count();

        // Recent audit activity
        $recentActivity = AuditLog::with('user')
            ->latest()
            ->take(10)
            ->get()
            ->map(fn ($log) => [
                'user'   => $log->user?->name ?? 'System Admin',
                'action' => $log->action,
                'entity' => $log->entity_type . ($log->entity_id ? " #{$log->entity_id}" : ''),
                'details' => is_array($log->properties) ? json_encode($log->properties) : null,
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
                'thematicAreas'    => $thematicAreasCount,
                'projects'         => $projectsCount,
                'teamMembers'      => $teamCount,
                'partners'         => $partnersCount,
            ],
            'recentInquiries' => $recentInquiries ?: [],
            'recentResources' => $recentResources ?: [],
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
