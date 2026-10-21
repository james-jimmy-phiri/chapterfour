<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Resource;
use App\Models\Project;
use App\Models\ThematicArea;
use App\Models\Vacancy;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $urls = collect();

        // Static pages
        $staticPages = [
            ['url' => '/',                                'priority' => '1.0', 'changefreq' => 'weekly'],
            ['url' => '/about',                           'priority' => '0.9', 'changefreq' => 'monthly'],
            ['url' => '/about/who-we-are',                'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => '/about/our-team',                  'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => '/about/board-of-trustees',         'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => '/about/beneficiaries',             'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => '/about/institutional-partnerships','priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => '/about/core-activities',           'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => '/about/cross-cutting-activities',  'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => '/about/vacancies',                 'priority' => '0.7', 'changefreq' => 'weekly'],
            ['url' => '/what-we-do',                      'priority' => '0.9', 'changefreq' => 'monthly'],
            ['url' => '/what-we-do/thematic-areas',       'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => '/what-we-do/approach-to-programming','priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => '/what-we-do/key-interventions',    'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => '/what-we-do/our-reports',          'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => '/resources',                       'priority' => '0.8', 'changefreq' => 'daily'],
            ['url' => '/publications',                    'priority' => '0.8', 'changefreq' => 'weekly'],
            ['url' => '/projects',                        'priority' => '0.8', 'changefreq' => 'weekly'],
            ['url' => '/contact',                         'priority' => '0.7', 'changefreq' => 'yearly'],
            ['url' => '/get-involved',                    'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => '/newsletter',                      'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => '/search',                          'priority' => '0.5', 'changefreq' => 'monthly'],
        ];
        $urls = $urls->merge($staticPages);

        // Dynamic: resources
        try {
            $resources = Resource::where('status', 'published')
                ->select(['slug', 'updated_at'])
                ->get()
                ->map(fn ($r) => [
                    'url'        => '/resources/' . $r->slug,
                    'lastmod'    => $r->updated_at?->toAtomString(),
                    'priority'   => '0.6',
                    'changefreq' => 'yearly',
                ]);
            $urls = $urls->merge($resources);
        } catch (\Throwable) {}

        // Dynamic: projects
        try {
            $projects = Project::where('status', 'published')
                ->select(['slug', 'updated_at'])
                ->get()
                ->map(fn ($p) => [
                    'url'        => '/projects/' . $p->slug,
                    'lastmod'    => $p->updated_at?->toAtomString(),
                    'priority'   => '0.6',
                    'changefreq' => 'yearly',
                ]);
            $urls = $urls->merge($projects);
        } catch (\Throwable) {}

        // Dynamic: thematic areas
        try {
            $areas = ThematicArea::where('status', 'published')
                ->select(['slug', 'updated_at'])
                ->get()
                ->map(fn ($a) => [
                    'url'        => '/what-we-do/' . $a->slug,
                    'lastmod'    => $a->updated_at?->toAtomString(),
                    'priority'   => '0.5',
                    'changefreq' => 'monthly',
                ]);
            $urls = $urls->merge($areas);
        } catch (\Throwable) {}

        // Dynamic: custom pages
        try {
            $pages = Page::where('status', 'published')
                ->select(['slug', 'updated_at'])
                ->get()
                ->map(fn ($p) => [
                    'url'        => '/page/' . $p->slug,
                    'lastmod'    => $p->updated_at?->toAtomString(),
                    'priority'   => '0.6',
                    'changefreq' => 'monthly',
                ]);
            $urls = $urls->merge($pages);
        } catch (\Throwable) {}

        $xml = view('sitemap', ['urls' => $urls, 'baseUrl' => config('app.url')])->render();

        return response($xml, 200, ['Content-Type' => 'application/xml']);
    }
}
