<?php

namespace App\Http\Controllers;

use App\Models\BeneficiaryGroup;
use App\Models\HeroSlide;
use App\Models\HrbaPrinciple;
use App\Models\ImpactStatistic;
use App\Models\Inquiry;
use App\Models\Intervention;
use App\Models\NewsletterSubscriber;
use App\Models\Partner;
use App\Models\Project;
use App\Models\Resource;
use App\Models\TeamMember;
use App\Models\ThematicArea;
use App\Models\TimelineEvent;
use App\Models\Vacancy;
use App\Enums\InquiryStatus;
use App\Services\AuditLogger;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    // ─── HOMEPAGE ─────────────────────────────────────────────────────────────

    public function home(): Response
    {
        $stats = $this->fetch(fn () =>
            ImpactStatistic::where('status', 'published')
                ->orderBy('sort_order')
                ->get(['label', 'value', 'prefix', 'suffix', 'description', 'icon'])
                ->toArray()
        );

        $thematicAreas = $this->fetch(fn () =>
            ThematicArea::where('status', 'published')
                ->orderBy('sort_order')
                ->get(['title', 'slug', 'short_description', 'icon'])
                ->toArray()
        );

        $latestResources = $this->fetch(fn () =>
            Resource::where('status', 'published')
                ->latest('published_at')
                ->take(3)
                ->get(['title', 'slug', 'type', 'excerpt', 'published_at', 'featured_image'])
                ->toArray()
        );

        $featuredResource = $this->fetch(fn () =>
            Resource::where('status', 'published')
                ->where('is_featured', true)
                ->latest('published_at')
                ->first(['title', 'slug', 'excerpt'])
        );

        $partners = $this->fetch(fn () =>
            Partner::where('status', 'published')
                ->orderBy('sort_order')
                ->get(['name', 'logo', 'website'])
                ->toArray()
        );

        $heroSlides = $this->fetch(fn () =>
            HeroSlide::where('status', 'published')
                ->orderBy('sort_order')
                ->get(['word', 'bg_image', 'right_image', 'right_alt', 'accent_label'])
                ->toArray()
        );

        return Inertia::render('Welcome', [
            'stats'           => $stats ?: [],
            'thematicAreas'   => $thematicAreas ?: [],
            'latestResources' => $latestResources ?: [],
            'featuredResource'=> $featuredResource,
            'partners'        => $partners ?: [],
            'heroSlides'      => $heroSlides ?: [],
        ]);
    }

    // ─── ABOUT ────────────────────────────────────────────────────────────────

    public function about(): Response
    {
        $teamMembers = $this->fetch(fn () =>
            TeamMember::where('status', 'published')
                ->orderBy('sort_order')
                ->get()
                ->toArray()
        );

        $stats = $this->fetch(fn () =>
            ImpactStatistic::where('status', 'published')
                ->orderBy('sort_order')
                ->get(['label', 'value', 'prefix', 'suffix', 'description', 'icon'])
                ->toArray()
        );

        $partners = $this->fetch(fn () =>
            Partner::where('status', 'published')
                ->orderBy('sort_order')
                ->get(['name', 'description', 'website', 'category'])
                ->toArray()
        );

        return Inertia::render('About', [
            'teamMembers' => $teamMembers ?: [],
            'stats'       => $stats ?: [],
            'partners'    => $partners ?: [],
        ]);
    }

    // ─── ABOUT SUBPAGES ───────────────────────────────────────────────────────

    public function ourTeam(): Response
    {
        $teamMembers = $this->fetch(fn () =>
            TeamMember::where('status', 'published')
                ->where('category', 'staff')
                ->orderBy('sort_order')
                ->get()
                ->toArray()
        );

        return Inertia::render('About/OurTeam', [
            'teamMembers' => $teamMembers ?: [],
        ]);
    }

    public function boardOfTrustees(): Response
    {
        $trustees = $this->fetch(fn () =>
            TeamMember::where('status', 'published')
                ->where('category', 'board')
                ->orderBy('sort_order')
                ->get()
                ->toArray()
        );

        return Inertia::render('About/BoardOfTrustees', [
            'trustees' => $trustees ?: [],
        ]);
    }

    public function beneficiaries(): Response
    {
        $groups = $this->fetch(fn () =>
            BeneficiaryGroup::where('status', 'published')
                ->orderBy('sort_order')
                ->get(['id', 'name', 'description', 'icon', 'image'])
                ->toArray()
        );

        return Inertia::render('About/Beneficiaries', [
            'beneficiaryGroups' => $groups ?: [],
        ]);
    }

    public function institutionalPartnerships(): Response
    {
        $partners = $this->fetch(fn () =>
            Partner::where('status', 'published')
                ->orderBy('sort_order')
                ->get()
                ->toArray()
        );

        return Inertia::render('About/InstitutionalPartnerships', [
            'partners' => $partners ?: [],
        ]);
    }

    public function vacancies(): Response
    {
        $vacancies = $this->fetch(fn () =>
            Vacancy::where('status', 'open')
                ->orderBy('sort_order')
                ->get()
                ->toArray()
        );

        return Inertia::render('About/Vacancies', [
            'vacancies' => $vacancies ?: [],
        ]);
    }

    public function vacancyDetail(int|string $id): Response
    {
        $vacancy = $this->fetch(fn () =>
            Vacancy::where('id', $id)
                ->orWhere('slug', $id)
                ->where('status', 'open')
                ->first()
        );

        return Inertia::render('About/VacancyDetails', [
            'vacancy' => $vacancy,
            'id'      => $id,
        ]);
    }

    // ─── WHAT WE DO ───────────────────────────────────────────────────────────

    public function whatWeDo(): Response
    {
        $thematicAreas = $this->fetch(fn () =>
            ThematicArea::where('status', 'published')
                ->orderBy('sort_order')
                ->get()
                ->toArray()
        );

        return Inertia::render('WhatWeDo', [
            'thematicAreas' => $thematicAreas,
        ]);
    }

    public function thematicArea(string $slug): Response
    {
        $area = $this->fetch(fn () =>
            ThematicArea::where('slug', $slug)
                ->where('status', 'published')
                ->first()
        );

        if (!$area) {
            $title = ucwords(str_replace('-', ' ', $slug));
            $area = [
                'title'             => $title,
                'slug'              => $slug,
                'short_description' => "Advancing {$title} through grassroots legal empowerment, policy research, and civic education.",
            ];
        }

        $relatedResources = $this->fetch(fn () =>
            Resource::where('status', 'published')
                ->latest('published_at')
                ->take(3)
                ->get(['title', 'slug', 'type', 'excerpt', 'published_at'])
                ->toArray()
        );

        $relatedProjects = $this->fetch(fn () =>
            Project::where('status', 'published')
                ->take(2)
                ->get(['title', 'slug', 'summary', 'locations'])
                ->toArray()
        );

        return Inertia::render('ThematicArea', [
            'area'             => $area,
            'relatedResources' => $relatedResources,
            'relatedProjects'  => $relatedProjects,
        ]);
    }

    public function keyInterventions(): Response
    {
        $interventions = $this->fetch(fn () =>
            Intervention::where('status', 'published')
                ->orderBy('sort_order')
                ->get(['id', 'title', 'short_title', 'description', 'examples', 'image', 'icon'])
                ->toArray()
        );

        return Inertia::render('WhatWeDo/KeyInterventions', [
            'interventions' => $interventions ?: [],
        ]);
    }

    public function whoWeAre(): Response
    {
        return Inertia::render('About/WhoWeAre');
    }

    public function coreActivities(): Response
    {
        return Inertia::render('About/CoreActivities');
    }

    public function crossCuttingActivities(): Response
    {
        return Inertia::render('About/CrossCuttingActivities');
    }

    public function approachToProgramming(): Response
    {
        $principles = $this->fetch(fn () =>
            HrbaPrinciple::where('status', 'published')
                ->orderBy('sort_order')
                ->get()
                ->toArray()
        );

        return Inertia::render('WhatWeDo/ApproachToProgramming', [
            'hrbaPrinciples' => $principles ?: [],
        ]);
    }

    public function ourReports(): Response
    {
        $reports = $this->fetch(fn () =>
            Resource::where('status', 'published')
                ->whereIn('type', ['report', 'publication'])
                ->latest('published_at')
                ->get(['id', 'title', 'slug', 'type', 'excerpt', 'published_at', 'featured_image', 'file_url'])
                ->toArray()
        );

        return Inertia::render('WhatWeDo/OurReports', [
            'reports' => $reports ?: [],
        ]);
    }

    public function thematicAreasPage(): Response
    {
        $thematicAreas = $this->fetch(fn () =>
            ThematicArea::where('status', 'published')
                ->orderBy('sort_order')
                ->get()
                ->toArray()
        );

        return Inertia::render('WhatWeDo/ThematicAreas', [
            'thematicAreas' => $thematicAreas ?: [],
        ]);
    }

    // ─── RESOURCES ────────────────────────────────────────────────────────────

    public function resources(Request $request): Response
    {
        $rawType = $request->query('type');
        $type = is_array($rawType) ? $rawType : ($rawType !== null && $rawType !== '' ? explode(',', (string) $rawType) : []);

        $rawAuthor = $request->query('author');
        $author = is_array($rawAuthor) ? $rawAuthor : ($rawAuthor !== null && $rawAuthor !== '' ? explode(',', (string) $rawAuthor) : []);

        $rawYear = $request->query('year');
        $year = is_array($rawYear) ? $rawYear : ($rawYear !== null && $rawYear !== '' ? explode(',', (string) $rawYear) : []);

        $search = $request->query('search');

        $query = Resource::where('status', 'published')->latest('published_at');

        if ($request->routeIs('news')) {
            $type = ['news'];
        }

        // Map friendly slugs/plurals from links to actual database enum values
        $typeMap = [
            'statements'      => 'statement',
            'reports'         => 'report',
            'press-releases'  => 'press_release',
            'press_releases'  => 'press_release',
            'publications'    => 'publication',
            'success-stories' => 'success_story',
            'success_stories' => 'success_story',
            'policy-briefs'   => 'policy_brief',
            'policy_briefs'   => 'policy_brief',
            'researches'      => 'research',
        ];

        $normalizedType = array_values(array_filter(array_map(function ($t) use ($typeMap) {
            $trimmed = strtolower(trim((string) $t));
            return $typeMap[$trimmed] ?? $trimmed;
        }, $type)));

        if (!empty($normalizedType)) {
            $query->whereIn('type', $normalizedType);
        }
        if (!empty($author)) {
            $query->whereIn('author_id', array_values($author));
        }
        if (!empty($year)) {
            $query->where(function ($q) use ($year) {
                foreach ($year as $y) {
                    $q->orWhereYear('published_at', $y);
                }
            });
        }
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        $resources = $query->paginate(12)->withQueryString();

        // Compute filters
        $all = Resource::where('status', 'published')->with('author')->get();

        $types = $all->groupBy('type')->map->count()->map(function($count, $key) {
            // $key might be an Enum if cast, or a string
            $val = $key instanceof \App\Enums\ResourceType ? $key->value : $key;
            $label = $key instanceof \App\Enums\ResourceType ? $key->label() : (\App\Enums\ResourceType::tryFrom($val)?->label() ?? ucfirst($val));
            return ['label' => $label, 'value' => $val, 'count' => $count];
        })->values();

        $authors = $all->groupBy('author_id')->map->count()->map(function($count, $key) use ($all) {
            $authorName = $all->where('author_id', $key)->first()->author?->name ?? 'Unknown';
            return ['label' => $authorName, 'value' => (string)$key, 'count' => $count];
        })->values();

        $years = $all->groupBy(function($item) {
            return $item->published_at ? $item->published_at->format('Y') : 'N/A';
        })->map->count()->map(function($count, $key) {
            return ['label' => $key, 'value' => $key, 'count' => $count];
        })->filter(fn($i) => $i['label'] !== 'N/A')->sortByDesc('label')->values();

        $filterCategories = [
            [
                'id' => 'type',
                'title' => 'Resource Type',
                'options' => $types
            ],
            [
                'id' => 'author',
                'title' => 'Author',
                'options' => $authors
            ],
            [
                'id' => 'year',
                'title' => 'Date (Year)',
                'options' => $years
            ]
        ];

        return Inertia::render('Resources', [
            'resources' => $resources,
            'filterCategories' => $filterCategories,
            'filters'   => [
                'type'   => $normalizedType,
                'author' => array_values($author),
                'year'   => array_values($year),
                'search' => $search ?? '',
            ],
        ]);
    }

    public function resourceDetail(string $slug): Response
    {
        $resource = Resource::with(['author'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->first();

        if (!$resource) {
            $title    = ucwords(str_replace('-', ' ', $slug));
            $resource = (object) [
                'title'        => $title,
                'slug'         => $slug,
                'type'         => 'publication',
                'excerpt'      => 'An in-depth human rights publication defending constitutional principles under Chapter IV.',
                'body'         => '<p>In Malawi\'s contemporary democratic landscape, constitutional rights and administrative accountability serve as the baseline for human dignity.</p>',
                'published_at' => now()->format('M d, Y'),
                'author'       => (object) ['name' => 'Chapter Four Legal Research Unit'],
                'pdf_path'     => null,
            ];
        }

        $relatedResources = Resource::where('status', 'published')
            ->where('slug', '!=', $slug)
            ->latest('published_at')
            ->take(3)
            ->get(['title', 'slug', 'type', 'excerpt', 'published_at']);

        return Inertia::render('ResourceDetail', [
            'resource'         => $resource,
            'relatedResources' => $relatedResources,
        ]);
    }

    // ─── PROJECTS ─────────────────────────────────────────────────────────────

    public function projects(): Response
    {
        $projects = Project::where('status', 'published')
            ->latest('published_at')
            ->get();

        return Inertia::render('Projects', [
            'projects' => $projects,
        ]);
    }

    public function projectDetail(string $slug): Response
    {
        $project = Project::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        return Inertia::render('ProjectDetail', [
            'project' => $project,
        ]);
    }

    // ─── CONTACT ──────────────────────────────────────────────────────────────

    public function contact(): Response
    {
        return Inertia::render('Contact');
    }

    public function submitContact(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'email'        => 'required|email|max:255',
            'phone'        => 'nullable|string|max:50',
            'inquiry_type' => 'required|string|max:100',
            'subject'      => 'required|string|max:255',
            'message'      => 'required|string|max:5000',
        ]);

        $inquiry = Inquiry::create([
            'name'       => $validated['name'],
            'email'      => $validated['email'],
            'phone'      => $validated['phone'] ?? null,
            'type'       => $validated['inquiry_type'],
            'subject'    => $validated['subject'],
            'message'    => $validated['message'],
            'status'     => InquiryStatus::New,
            'ip_address' => $request->ip(),
        ]);

        AuditLogger::log('submitted', 'Inquiry', $inquiry->id, [
            'subject' => $inquiry->subject,
            'email'   => $inquiry->email,
        ]);

        return redirect()->back()->with('success', 'Thank you! Your message has been received. Our legal and advocacy team will review it promptly.');
    }

    // ─── NEWSLETTER ───────────────────────────────────────────────────────────

    public function subscribeNewsletter(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email'  => 'required|email|max:255',
            'source' => 'nullable|string|max:50',
        ]);

        $subscriber = NewsletterSubscriber::updateOrCreate(
            ['email' => strtolower($validated['email'])],
            [
                'status'          => 'subscribed',
                'source'          => $validated['source'] ?? 'website',
                'consented_at'    => now(),
                'unsubscribed_at' => null,
            ]
        );

        AuditLogger::log('subscribed', 'NewsletterSubscriber', $subscriber->id, [
            'email' => $subscriber->email,
        ]);

        return redirect()->back()->with('success', 'Thank you for subscribing to Chapter Four updates!');
    }

    // ─── GET INVOLVED ─────────────────────────────────────────────────────────

    public function getInvolved(): Response
    {
        return Inertia::render('GetInvolved');
    }

    // ─── HELPER ───────────────────────────────────────────────────────────────

    /**
     * Safe DB fetch with fallback to null on any error.
     */
    private function fetch(callable $callback): mixed
    {
        try {
            return $callback();
        } catch (\Throwable) {
            return null;
        }
    }
}
