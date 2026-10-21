<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SeoMetadata;
use App\Models\SiteSetting;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SeoController extends Controller
{
    /**
     * Display the SEO & Metadata Manager.
     */
    public function index(): Response
    {
        $siteSettings = SiteSetting::where('group', 'seo')->pluck('value', 'key')->toArray();

        // Standard defined pages
        $definedPages = [
            'home' => [
                'name' => 'Home Page',
                'url' => '/',
                'default_title' => 'Chapter Four — Defending Constitutional Rights in Malawi',
                'default_desc' => 'Chapter Four is a non-partisan public interest legal and civic organization dedicated to defending constitutionalism, human rights, and the rule of law in Malawi.',
            ],
            'about' => [
                'name' => 'About Us',
                'url' => '/about',
                'default_title' => 'About Chapter Four — Governance, Mission & People',
                'default_desc' => 'Learn about Chapter Four Uganda/Malawi, our leadership, governing board of trustees, core objectives, and mission to advance fundamental freedoms.',
            ],
            'what-we-do' => [
                'name' => 'What We Do',
                'url' => '/what-we-do',
                'default_title' => 'What We Do — Rights-Based Programmes & Interventions',
                'default_desc' => 'Discover our strategic thematic areas, human rights based approach (HRBA), strategic litigation, and community paralegal interventions.',
            ],
            'resources' => [
                'name' => 'News & Resources',
                'url' => '/resources',
                'default_title' => 'News, Statements & Legal Publications — Chapter Four',
                'default_desc' => 'Access constitutional advisories, policy briefs, human rights monitors, press statements, and research publications.',
            ],
            'projects' => [
                'name' => 'Field Projects',
                'url' => '/projects',
                'default_title' => 'Advocacy & Field Projects — Chapter Four',
                'default_desc' => 'Explore Chapter Four active field projects defending civic space, electoral integrity, and access to constitutional justice.',
            ],
            'contact' => [
                'name' => 'Contact Us',
                'url' => '/contact',
                'default_title' => 'Contact Chapter Four & Rights Violation Hotline',
                'default_desc' => 'Get in touch with Chapter Four legal team, report constitutional rights violations, or seek emergency legal support.',
            ],
            'vacancies' => [
                'name' => 'Careers & Vacancies',
                'url' => '/about/vacancies',
                'default_title' => 'Vacancies & Opportunities — Chapter Four',
                'default_desc' => 'Join the Chapter Four team of human rights lawyers, field advocates, and civic researchers.',
            ],
            'get-involved' => [
                'name' => 'Get Involved',
                'url' => '/get-involved',
                'default_title' => 'Get Involved & Support Human Rights — Chapter Four',
                'default_desc' => 'Stand with Chapter Four to defend democracy, sponsor public interest litigation, or volunteer as a legal advocate.',
            ],
        ];

        $pagesMetadata = [];
        foreach ($definedPages as $key => $page) {
            $meta = SeoMetadata::where('seoable_type', 'page:' . $key)->where('seoable_id', 0)->first();

            $pagesMetadata[$key] = [
                'key'              => $key,
                'name'             => $page['name'],
                'url'              => $page['url'],
                'meta_title'       => $meta?->meta_title ?? $siteSettings["seo_{$key}_title"] ?? $page['default_title'],
                'meta_description' => $meta?->meta_description ?? $siteSettings["seo_{$key}_desc"] ?? $page['default_desc'],
                'canonical_url'    => $meta?->canonical_url ?? config('app.url') . $page['url'],
                'og_title'         => $meta?->og_title ?? $page['default_title'],
                'og_description'   => $meta?->og_description ?? $page['default_desc'],
                'og_image'         => $meta?->og_image ?? '/images/hero/pexels-akoonie-10875242.jpg',
                'robots'           => $meta?->robots ?? 'index,follow',
            ];
        }

        $globalSettings = [
            'meta_title_suffix' => $siteSettings['seo_title_suffix'] ?? ' | Chapter Four',
            'google_analytics_id' => $siteSettings['seo_ga_id'] ?? '',
            'default_og_image'  => $siteSettings['seo_default_og_image'] ?? '/images/hero/pexels-akoonie-10875242.jpg',
            'sitemap_url'       => config('app.url') . '/sitemap.xml',
            'robots_url'        => config('app.url') . '/robots.txt',
        ];

        return Inertia::render('Admin/Seo/Index', [
            'pages'          => $pagesMetadata,
            'globalSettings' => $globalSettings,
        ]);
    }

    /**
     * Update SEO metadata for a specific page.
     */
    public function updatePage(Request $request, string $key): RedirectResponse
    {
        $validated = $request->validate([
            'meta_title'       => 'required|string|max:255',
            'meta_description' => 'required|string|max:500',
            'canonical_url'    => 'nullable|string|max:255',
            'og_title'         => 'nullable|string|max:255',
            'og_description'   => 'nullable|string|max:500',
            'og_image'         => 'nullable|string|max:255',
            'og_image_file'    => 'nullable|image|max:4096',
            'robots'           => 'required|string|in:index,follow,noindex,nofollow,noindex,follow',
        ]);

        if ($request->hasFile('og_image_file')) {
            $path = $request->file('og_image_file')->store('seo', 'public');
            $validated['og_image'] = '/storage/' . $path;
        }

        SeoMetadata::updateOrCreate(
            ['seoable_type' => 'page:' . $key, 'seoable_id' => 0],
            [
                'meta_title'       => $validated['meta_title'],
                'meta_description' => $validated['meta_description'],
                'canonical_url'    => $validated['canonical_url'] ?? null,
                'og_title'         => $validated['og_title'] ?? $validated['meta_title'],
                'og_description'   => $validated['og_description'] ?? $validated['meta_description'],
                'og_image'         => $validated['og_image'] ?? null,
                'robots'           => $validated['robots'],
            ]
        );

        AuditLogger::log('updated', 'SeoMetadata', 0, ['page' => $key]);

        return redirect()->back()->with('success', "SEO metadata for '{$key}' updated.");
    }

    /**
     * Update global SEO defaults.
     */
    public function updateGlobal(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'meta_title_suffix'   => 'nullable|string|max:100',
            'google_analytics_id' => 'nullable|string|max:50',
            'default_og_image'    => 'nullable|string|max:255',
        ]);

        SiteSetting::updateOrCreate(['key' => 'seo_title_suffix'], ['value' => $validated['meta_title_suffix'] ?? '', 'group' => 'seo']);
        SiteSetting::updateOrCreate(['key' => 'seo_ga_id'], ['value' => $validated['google_analytics_id'] ?? '', 'group' => 'seo']);
        SiteSetting::updateOrCreate(['key' => 'seo_default_og_image'], ['value' => $validated['default_og_image'] ?? '', 'group' => 'seo']);

        AuditLogger::log('updated', 'SiteSetting', null, ['group' => 'seo']);

        return redirect()->back()->with('success', 'Global SEO settings updated.');
    }
}
