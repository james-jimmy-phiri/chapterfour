<?php

namespace App\Http\Controllers;

use App\Models\ImpactStatistic;
use App\Models\ThematicArea;
use App\Models\Resource;
use App\Models\Partner;
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
        return Inertia::render('About');
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

        return Inertia::render('ThematicArea', [
            'area' => $area,
        ]);
    }

    /**
     * Serve the Resources / News listing page.
     */
    public function resources(): Response
    {
        $resources = Resource::where('status', 'published')
            ->latest('published_at')
            ->paginate(12);

        return Inertia::render('Resources', [
            'resources' => $resources,
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
     * Serve the Get Involved page.
     */
    public function getInvolved(): Response
    {
        return Inertia::render('GetInvolved');
    }
}
