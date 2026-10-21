<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ResourceController;
use App\Http\Controllers\Admin\InquiryController;
use App\Http\Controllers\Admin\NewsletterController;
use App\Http\Controllers\Admin\StatisticController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\ThematicAreaController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\TeamController;
use App\Http\Controllers\Admin\PartnerController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\InterventionController;
use App\Http\Controllers\Admin\BeneficiaryGroupController;
use App\Http\Controllers\Admin\VacancyController;
use App\Http\Controllers\Admin\TimelineEventController;
use App\Http\Controllers\Admin\HrbaPrincipleController;
use App\Http\Controllers\Admin\HeroSlideController;
use App\Http\Controllers\Admin\AuditLogController;
use App\Http\Controllers\Admin\CoreObjectiveController;
use App\Http\Controllers\Admin\PageQuoteController;
use App\Http\Controllers\Admin\CrossCuttingActivityController;
use App\Http\Controllers\Admin\SiteContentBlockController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\PublicationController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\SeoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ─── PUBLIC WEBSITE ROUTES ────────────────────────────────────────────────────

Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
Route::get('/robots.txt', function () {
    $content = "User-agent: *\nDisallow: /admin\nDisallow: /login\nDisallow: /register\n\nSitemap: " . config('app.url') . "/sitemap.xml\n";
    return response($content, 200, ['Content-Type' => 'text/plain']);
})->name('robots');

Route::get('/', [PublicController::class, 'home'])->name('home');
Route::get('/about', [PublicController::class, 'about'])->name('about');
Route::get('/what-we-do', [PublicController::class, 'whatWeDo'])->name('what-we-do');
// What We Do Subpages — must be defined BEFORE the {slug} wildcard
Route::get('/what-we-do/thematic-areas', [PublicController::class, 'thematicAreasPage'])->name('what-we-do.thematic-areas');
Route::get('/what-we-do/approach-to-programming', [PublicController::class, 'approachToProgramming'])->name('what-we-do.approach-to-programming');
Route::get('/what-we-do/key-interventions', [PublicController::class, 'keyInterventions'])->name('what-we-do.key-interventions');
Route::get('/what-we-do/our-reports', [PublicController::class, 'ourReports'])->name('what-we-do.our-reports');
Route::get('/what-we-do/{slug}', [PublicController::class, 'thematicArea'])->name('thematic-area');
Route::get('/resources', [PublicController::class, 'resources'])->name('resources');
Route::get('/resources/{slug}', [PublicController::class, 'resourceDetail'])->name('resources.detail');
Route::get('/news', [PublicController::class, 'resources'])->name('news');
Route::get('/projects', [PublicController::class, 'projects'])->name('projects');
Route::get('/projects/{slug}', [PublicController::class, 'projectDetail'])->name('projects.detail');
Route::get('/contact', [PublicController::class, 'contact'])->name('contact');
Route::post('/contact', [PublicController::class, 'submitContact'])->middleware('throttle:6,1')->name('contact.submit');
Route::post('/newsletter/subscribe', [PublicController::class, 'subscribeNewsletter'])->middleware('throttle:10,1')->name('newsletter.subscribe');
Route::get('/publications', [PublicController::class, 'publications'])->name('publications');
Route::get('/search', [PublicController::class, 'search'])->name('search');
Route::get('/newsletter', [PublicController::class, 'newsletter'])->name('newsletter');
Route::get('/page/{slug}', [PublicController::class, 'page'])->name('page.show');
Route::get('/get-involved', [PublicController::class, 'getInvolved'])->name('get-involved');

// Static / legal pages (render Inertia pages as they're created)
Route::get('/privacy', fn () => Inertia::render('Privacy'))->name('privacy');
Route::get('/terms', fn () => Inertia::render('Terms'))->name('terms');
Route::get('/safeguarding', fn () => Inertia::render('Safeguarding'))->name('safeguarding');

// About Subpages
Route::get('/about/who-we-are', [PublicController::class, 'whoWeAre'])->name('about.who-we-are');
Route::get('/about/our-team', [PublicController::class, 'ourTeam'])->name('about.our-team');
Route::get('/about/board-of-trustees', [PublicController::class, 'boardOfTrustees'])->name('about.board-of-trustees');
Route::get('/about/beneficiaries', [PublicController::class, 'beneficiaries'])->name('about.beneficiaries');
Route::get('/about/institutional-partnerships', [PublicController::class, 'institutionalPartnerships'])->name('about.institutional-partnerships');
Route::get('/about/core-activities', [PublicController::class, 'coreActivities'])->name('about.core-activities');
Route::get('/about/cross-cutting-activities', [PublicController::class, 'crossCuttingActivities'])->name('about.cross-cutting-activities');
Route::get('/about/vacancies', [PublicController::class, 'vacancies'])->name('about.vacancies');
Route::get('/about/vacancies/{id}', [PublicController::class, 'vacancyDetail'])->name('about.vacancies.detail');
Route::get('/vacancies', fn () => redirect()->route('about.vacancies'))->name('vacancies');
Route::get('/vacancies/{id}', [PublicController::class, 'vacancyDetail'])->name('vacancies.detail');
Route::post('/vacancies/{id}/apply', [\App\Http\Controllers\VacancyApplicationController::class, 'store'])->name('vacancies.apply');

// What We Do Subpages (now defined above near the wildcard; keeping this section for reference)

// ─── ADMIN / CMS ROUTES ───────────────────────────────────────────────────────

Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified', 'ensure.admin'])->group(function () {

    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Resources CRUD
    Route::get('/resources', [ResourceController::class, 'index'])->name('resources.index');
    Route::get('/resources/create', [ResourceController::class, 'create'])->name('resources.create');
    Route::post('/resources', [ResourceController::class, 'store'])->name('resources.store');
    Route::get('/resources/{id}/edit', [ResourceController::class, 'edit'])->name('resources.edit');
    Route::put('/resources/{id}', [ResourceController::class, 'update'])->name('resources.update');
    Route::delete('/resources/{id}', [ResourceController::class, 'destroy'])->name('resources.destroy');

    // Inquiries
    Route::get('/inquiries', [InquiryController::class, 'index'])->name('inquiries.index');
    Route::patch('/inquiries/{id}/status', [InquiryController::class, 'updateStatus'])->name('inquiries.status');
    Route::patch('/inquiries/{id}/notes', [InquiryController::class, 'updateNotes'])->name('inquiries.notes');
    Route::delete('/inquiries/{id}', [InquiryController::class, 'destroy'])->name('inquiries.destroy');

    // Newsletter
    Route::get('/newsletter', [NewsletterController::class, 'index'])->name('newsletter.index');
    Route::patch('/newsletter/{id}/toggle', [NewsletterController::class, 'toggleStatus'])->name('newsletter.toggle');
    Route::get('/newsletter/export', [NewsletterController::class, 'exportCsv'])->name('newsletter.export');
    Route::delete('/newsletter/{id}', [NewsletterController::class, 'destroy'])->name('newsletter.destroy');

    // Statistics
    Route::get('/statistics', [StatisticController::class, 'index'])->name('statistics.index');
    Route::post('/statistics', [StatisticController::class, 'store'])->name('statistics.store');
    Route::put('/statistics/{id}', [StatisticController::class, 'update'])->name('statistics.update');
    Route::delete('/statistics/{id}', [StatisticController::class, 'destroy'])->name('statistics.destroy');

    // Site Settings
    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [SettingController::class, 'update'])->name('settings.update');

    // Thematic Areas
    Route::get('/thematic-areas', [ThematicAreaController::class, 'index'])->name('thematic-areas');
    Route::post('/thematic-areas', [ThematicAreaController::class, 'store'])->name('thematic-areas.store');
    Route::put('/thematic-areas/{id}', [ThematicAreaController::class, 'update'])->name('thematic-areas.update');
    Route::delete('/thematic-areas/{id}', [ThematicAreaController::class, 'destroy'])->name('thematic-areas.destroy');

    // Projects
    Route::get('/projects', [ProjectController::class, 'index'])->name('projects');
    Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');
    Route::put('/projects/{id}', [ProjectController::class, 'update'])->name('projects.update');
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy'])->name('projects.destroy');

    // Team
    Route::get('/team', [TeamController::class, 'index'])->name('team');
    Route::post('/team', [TeamController::class, 'store'])->name('team.store');
    Route::put('/team/{id}', [TeamController::class, 'update'])->name('team.update');
    Route::delete('/team/{id}', [TeamController::class, 'destroy'])->name('team.destroy');

    // Partners
    Route::get('/partners', [PartnerController::class, 'index'])->name('partners');
    Route::post('/partners', [PartnerController::class, 'store'])->name('partners.store');
    Route::put('/partners/{id}', [PartnerController::class, 'update'])->name('partners.update');
    Route::delete('/partners/{id}', [PartnerController::class, 'destroy'])->name('partners.destroy');

    // Users Management
    Route::get('/users', [UserController::class, 'index'])->name('users');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    Route::post('/users/{id}/restore', [UserController::class, 'restore'])->name('users.restore');
    Route::patch('/users/{user}/status', [UserController::class, 'updateStatus'])->name('users.status');

    // Roles & Permissions Management
    Route::get('/roles', [RoleController::class, 'index'])->name('roles');
    Route::post('/roles', [RoleController::class, 'store'])->name('roles.store');
    Route::put('/roles/{role}', [RoleController::class, 'update'])->name('roles.update');
    Route::delete('/roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');

    // Interventions
    Route::get('/interventions', [InterventionController::class, 'index'])->name('interventions');
    Route::post('/interventions', [InterventionController::class, 'store'])->name('interventions.store');
    Route::put('/interventions/{id}', [InterventionController::class, 'update'])->name('interventions.update');
    Route::delete('/interventions/{id}', [InterventionController::class, 'destroy'])->name('interventions.destroy');

    // Beneficiary Groups
    Route::get('/beneficiary-groups', [BeneficiaryGroupController::class, 'index'])->name('beneficiary-groups');
    Route::post('/beneficiary-groups', [BeneficiaryGroupController::class, 'store'])->name('beneficiary-groups.store');
    Route::put('/beneficiary-groups/{id}', [BeneficiaryGroupController::class, 'update'])->name('beneficiary-groups.update');
    Route::delete('/beneficiary-groups/{id}', [BeneficiaryGroupController::class, 'destroy'])->name('beneficiary-groups.destroy');

    // Vacancies
    Route::get('/vacancies', [VacancyController::class, 'index'])->name('vacancies');
    Route::post('/vacancies', [VacancyController::class, 'store'])->name('vacancies.store');
    Route::put('/vacancies/{id}', [VacancyController::class, 'update'])->name('vacancies.update');
    Route::delete('/vacancies/{id}', [VacancyController::class, 'destroy'])->name('vacancies.destroy');
    Route::get('/vacancy-applications', [\App\Http\Controllers\Admin\VacancyApplicationController::class, 'index'])->name('vacancy-applications');

    // Timeline Events
    Route::get('/timeline-events', [TimelineEventController::class, 'index'])->name('timeline-events');
    Route::post('/timeline-events', [TimelineEventController::class, 'store'])->name('timeline-events.store');
    Route::put('/timeline-events/{id}', [TimelineEventController::class, 'update'])->name('timeline-events.update');
    Route::delete('/timeline-events/{id}', [TimelineEventController::class, 'destroy'])->name('timeline-events.destroy');


    // HRBA Principles
    Route::get('/hrba-principles', [HrbaPrincipleController::class, 'index'])->name('hrba-principles');
    Route::post('/hrba-principles', [HrbaPrincipleController::class, 'store'])->name('hrba-principles.store');
    Route::put('/hrba-principles/{id}', [HrbaPrincipleController::class, 'update'])->name('hrba-principles.update');
    Route::delete('/hrba-principles/{id}', [HrbaPrincipleController::class, 'destroy'])->name('hrba-principles.destroy');

    // Hero Slides
    Route::get('/hero-slides', [HeroSlideController::class, 'index'])->name('hero-slides');
    Route::post('/hero-slides', [HeroSlideController::class, 'store'])->name('hero-slides.store');
    Route::put('/hero-slides/{id}', [HeroSlideController::class, 'update'])->name('hero-slides.update');
    Route::delete('/hero-slides/{id}', [HeroSlideController::class, 'destroy'])->name('hero-slides.destroy');
    Route::post('/hero-slides/reorder', [HeroSlideController::class, 'reorder'])->name('hero-slides.reorder');

    // Audit Log (read-only)
    Route::get('/audit', [AuditLogController::class, 'index'])->name('audit');

    // Core Objectives
    Route::get('/core-objectives', [CoreObjectiveController::class, 'index'])->name('core-objectives');
    Route::post('/core-objectives', [CoreObjectiveController::class, 'store'])->name('core-objectives.store');
    Route::put('/core-objectives/{id}', [CoreObjectiveController::class, 'update'])->name('core-objectives.update');
    Route::delete('/core-objectives/{id}', [CoreObjectiveController::class, 'destroy'])->name('core-objectives.destroy');

    // Page Quotes
    Route::get('/page-quotes', [PageQuoteController::class, 'index'])->name('page-quotes');
    Route::post('/page-quotes', [PageQuoteController::class, 'store'])->name('page-quotes.store');
    Route::put('/page-quotes/{id}', [PageQuoteController::class, 'update'])->name('page-quotes.update');
    Route::delete('/page-quotes/{id}', [PageQuoteController::class, 'destroy'])->name('page-quotes.destroy');

    // Cross-Cutting Activities
    Route::get('/cross-cutting-activities', [CrossCuttingActivityController::class, 'index'])->name('cross-cutting-activities');
    Route::post('/cross-cutting-activities', [CrossCuttingActivityController::class, 'store'])->name('cross-cutting-activities.store');
    Route::put('/cross-cutting-activities/{id}', [CrossCuttingActivityController::class, 'update'])->name('cross-cutting-activities.update');
    Route::delete('/cross-cutting-activities/{id}', [CrossCuttingActivityController::class, 'destroy'])->name('cross-cutting-activities.destroy');

    // Site Content Blocks
    Route::get('/content-blocks', [SiteContentBlockController::class, 'index'])->name('content-blocks');
    Route::post('/content-blocks', [SiteContentBlockController::class, 'store'])->name('content-blocks.store');
    Route::put('/content-blocks/{id}', [SiteContentBlockController::class, 'update'])->name('content-blocks.update');
    Route::delete('/content-blocks/{id}', [SiteContentBlockController::class, 'destroy'])->name('content-blocks.destroy');

    // Pages Management
    Route::get('/pages', [PageController::class, 'index'])->name('pages');
    Route::post('/pages', [PageController::class, 'store'])->name('pages.store');
    Route::put('/pages/{id}', [PageController::class, 'update'])->name('pages.update');
    Route::delete('/pages/{id}', [PageController::class, 'destroy'])->name('pages.destroy');

    // Publications
    Route::get('/publications', [PublicationController::class, 'index'])->name('publications');
    Route::post('/publications', [PublicationController::class, 'store'])->name('publications.store');
    Route::put('/publications/{id}', [PublicationController::class, 'update'])->name('publications.update');
    Route::delete('/publications/{id}', [PublicationController::class, 'destroy'])->name('publications.destroy');

    // Testimonials
    Route::get('/testimonials', [TestimonialController::class, 'index'])->name('testimonials');
    Route::post('/testimonials', [TestimonialController::class, 'store'])->name('testimonials.store');
    Route::put('/testimonials/{id}', [TestimonialController::class, 'update'])->name('testimonials.update');
    Route::delete('/testimonials/{id}', [TestimonialController::class, 'destroy'])->name('testimonials.destroy');

    // Media Library
    Route::get('/media', [MediaController::class, 'index'])->name('media');
    Route::post('/media', [MediaController::class, 'store'])->name('media.store');
    Route::delete('/media/delete', [MediaController::class, 'destroy'])->name('media.destroy');

    // SEO Management
    Route::get('/seo', [SeoController::class, 'index'])->name('seo.index');
    Route::post('/seo/pages/{key}', [SeoController::class, 'updatePage'])->name('seo.page.update');
    Route::post('/seo/global', [SeoController::class, 'updateGlobal'])->name('seo.global.update');
});


// Redirect /dashboard (Breeze default) to /admin
Route::get('/dashboard', fn () => redirect()->route('admin.dashboard'))
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// ─── AUTH PROFILE ROUTES ─────────────────────────────────────────────────────

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
