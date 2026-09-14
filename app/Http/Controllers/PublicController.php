<?php

namespace App\Http\Controllers;

use App\Models\ImpactStatistic;
use App\Models\ThematicArea;
use App\Models\Resource;
use App\Models\Partner;
use App\Models\Project;
use App\Models\Inquiry;
use App\Models\NewsletterSubscriber;
use App\Enums\InquiryStatus;
use App\Services\AuditLogger;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    /**
     * Serve the public homepage.
     */
    public function home(): Response
    {
        try {
            $stats = ImpactStatistic::where('status', 'published')
                ->orderBy('sort_order')
                ->get(['label', 'value', 'prefix', 'suffix', 'description', 'icon'])
                ->toArray();
        } catch (\Throwable $e) {
            $stats = [];
        }

        try {
            $thematicAreas = ThematicArea::where('status', 'published')
                ->orderBy('sort_order')
                ->get(['title', 'slug', 'short_description', 'icon'])
                ->toArray();
        } catch (\Throwable $e) {
            $thematicAreas = [];
        }

        try {
            $latestResources = Resource::where('status', 'published')
                ->latest('published_at')
                ->take(3)
                ->get(['title', 'slug', 'type', 'excerpt', 'published_at', 'featured_image'])
                ->toArray();

            $featuredResource = Resource::where('status', 'published')
                ->where('is_featured', true)
                ->latest('published_at')
                ->first(['title', 'slug', 'excerpt']);
        } catch (\Throwable $e) {
            $latestResources = [];
            $featuredResource = null;
        }

        try {
            $partners = Partner::where('status', 'published')
                ->orderBy('sort_order')
                ->get(['name', 'logo', 'website'])
                ->toArray();
        } catch (\Throwable $e) {
            $partners = [];
        }

        return Inertia::render('Welcome', [
            'stats' => $stats ?: [],
            'thematicAreas' => $thematicAreas ?: [],
            'latestResources' => $latestResources ?: [],
            'featuredResource' => $featuredResource,
            'partners' => $partners ?: [],
        ]);
    }

    /**
     * Serve the About page.
     */
    public function about(): Response
    {
        try {
            $teamMembers = \App\Models\TeamMember::where('status', 'published')
                ->orderBy('sort_order')
                ->get()
                ->toArray();
        } catch (\Throwable $e) {
            $teamMembers = [];
        }

        try {
            $stats = ImpactStatistic::where('status', 'published')
                ->orderBy('sort_order')
                ->get(['label', 'value', 'prefix', 'suffix', 'description', 'icon'])
                ->toArray();
        } catch (\Throwable $e) {
            $stats = [];
        }

        try {
            $partners = Partner::where('status', 'published')
                ->orderBy('sort_order')
                ->get(['name', 'description', 'website', 'category'])
                ->toArray();
        } catch (\Throwable $e) {
            $partners = [];
        }

        return Inertia::render('About', [
            'teamMembers' => $teamMembers ?: [],
            'stats' => $stats ?: [],
            'partners' => $partners ?: [],
        ]);
    }

    /**
     * Serve the What We Do overview page.
     */
    public function whatWeDo(): Response
    {
        try {
            $thematicAreas = ThematicArea::where('status', 'published')
                ->orderBy('sort_order')
                ->get()
                ->toArray();
        } catch (\Throwable $e) {
            $thematicAreas = [];
        }

        return Inertia::render('WhatWeDo', [
            'thematicAreas' => $thematicAreas,
        ]);
    }

    /**
     * Serve an individual thematic area page.
     */
    public function thematicArea(string $slug): Response
    {
        try {
            $area = ThematicArea::where('slug', $slug)
                ->where('status', 'published')
                ->first();
        } catch (\Throwable $e) {
            $area = null;
        }

        if (!$area) {
            $title = ucwords(str_replace('-', ' ', $slug));
            $area = [
                'title' => $title,
                'slug' => $slug,
                'short_description' => "Advancing {$title} through grassroots legal empowerment, policy research, and civic education.",
            ];
        }

        try {
            $relatedResources = Resource::where('status', 'published')
                ->latest('published_at')
                ->take(3)
                ->get(['title', 'slug', 'type', 'excerpt', 'published_at'])
                ->toArray();

            $relatedProjects = Project::where('status', 'published')
                ->take(2)
                ->get(['title', 'slug', 'summary', 'locations'])
                ->toArray();
        } catch (\Throwable $e) {
            $relatedResources = [];
            $relatedProjects = [];
        }

        return Inertia::render('ThematicArea', [
            'area' => $area,
            'relatedResources' => $relatedResources,
            'relatedProjects' => $relatedProjects,
        ]);
    }

    /**
     * Serve the Resources / News listing page.
     */
    public function resources(Request $request): Response
    {
        $type = $request->query('type');
        $search = $request->query('search');

        $query = Resource::where('status', 'published')->latest('published_at');

        if ($type && $type !== 'All') {
            $query->where('type', strtolower($type));
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        $resources = $query->paginate(12)->withQueryString();

        return Inertia::render('Resources', [
            'resources' => $resources,
            'filters' => [
                'type' => $type ?? 'All',
                'search' => $search ?? '',
            ],
        ]);
    }

    /**
     * Serve a single Resource / Publication detail page.
     */
    public function resourceDetail(string $slug): Response
    {
        $resource = Resource::with(['author'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->first();

        if (!$resource) {
            $title = ucwords(str_replace('-', ' ', $slug));
            $resource = (object) [
                'title' => $title,
                'slug' => $slug,
                'type' => 'publication',
                'excerpt' => 'An in-depth human rights publication defending constitutional principles under Chapter IV.',
                'body' => "<p>In Malawi's contemporary democratic landscape, constitutional rights and administrative accountability serve as the baseline for human dignity. This publication unpacks the structural mechanisms required to ensure public bodies, law enforcement, and courts adhere strictly to Chapter IV obligations.</p><p>Through grassroots legal clinics and continuous empirical monitoring across all regions, Chapter Four works directly with affected citizens, local paralegals, and duty-bearers to convert constitutional promises into everyday protections.</p>",
                'published_at' => now()->format('M d, Y'),
                'author' => (object) ['name' => 'Chapter Four Legal Research Unit'],
                'pdf_path' => null,
            ];
        }

        $relatedResources = Resource::where('status', 'published')
            ->where('slug', '!=', $slug)
            ->latest('published_at')
            ->take(3)
            ->get(['title', 'slug', 'type', 'excerpt', 'published_at']);

        return Inertia::render('ResourceDetail', [
            'resource' => $resource,
            'relatedResources' => $relatedResources,
        ]);
    }

    /**
     * Serve the Projects catalog page.
     */
    public function projects(): Response
    {
        $projects = Project::where('status', 'published')
            ->latest('published_at')
            ->get();

        return Inertia::render('Projects', [
            'projects' => $projects,
        ]);
    }

    /**
     * Serve a single Project detail page.
     */
    public function projectDetail(string $slug): Response
    {
        $project = Project::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        return Inertia::render('ProjectDetail', [
            'project' => $project,
        ]);
    }

    /**
     * Serve the Contact page.
     */
    public function contact(): Response
    {
        return Inertia::render('Contact');
    }

    /**
     * Handle public contact form submissions.
     */
    public function submitContact(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'inquiry_type' => 'required|string|max:100',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        $inquiry = Inquiry::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'type' => $validated['inquiry_type'],
            'subject' => $validated['subject'],
            'message' => $validated['message'],
            'status' => InquiryStatus::New,
            'ip_address' => $request->ip(),
        ]);

        AuditLogger::log('submitted', 'Inquiry', $inquiry->id, [
            'subject' => $inquiry->subject,
            'email' => $inquiry->email,
        ]);

        return redirect()->back()->with('success', 'Thank you! Your message has been received. Our legal and advocacy team will review it promptly.');
    }

    /**
     * Handle newsletter subscriptions.
     */
    public function subscribeNewsletter(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
            'source' => 'nullable|string|max:50',
        ]);

        $subscriber = NewsletterSubscriber::updateOrCreate(
            ['email' => strtolower($validated['email'])],
            [
                'status' => 'subscribed',
                'source' => $validated['source'] ?? 'website',
                'consented_at' => now(),
                'unsubscribed_at' => null,
            ]
        );

        AuditLogger::log('subscribed', 'NewsletterSubscriber', $subscriber->id, [
            'email' => $subscriber->email,
        ]);

        return redirect()->back()->with('success', 'Thank you for subscribing to Chapter Four updates!');
    }

    /**
     * Serve the Get Involved page.
     */
    public function getInvolved(): Response
    {
        return Inertia::render('GetInvolved');
    }
}
