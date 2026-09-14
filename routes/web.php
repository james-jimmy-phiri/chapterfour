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
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ─── PUBLIC WEBSITE ROUTES ────────────────────────────────────────────────────

Route::get('/', [PublicController::class, 'home'])->name('home');
Route::get('/about', [PublicController::class, 'about'])->name('about');
Route::get('/what-we-do', [PublicController::class, 'whatWeDo'])->name('what-we-do');
Route::get('/what-we-do/{slug}', [PublicController::class, 'thematicArea'])->name('thematic-area');
Route::get('/resources', [PublicController::class, 'resources'])->name('resources');
Route::get('/resources/{slug}', [PublicController::class, 'resourceDetail'])->name('resources.detail');
Route::get('/news', [PublicController::class, 'resources'])->name('news');
Route::get('/projects', [PublicController::class, 'projects'])->name('projects');
Route::get('/projects/{slug}', [PublicController::class, 'projectDetail'])->name('projects.detail');
Route::get('/contact', [PublicController::class, 'contact'])->name('contact');
Route::post('/contact', [PublicController::class, 'submitContact'])->middleware('throttle:6,1')->name('contact.submit');
Route::post('/newsletter/subscribe', [PublicController::class, 'subscribeNewsletter'])->middleware('throttle:10,1')->name('newsletter.subscribe');
Route::get('/get-involved', [PublicController::class, 'getInvolved'])->name('get-involved');

// Static / legal pages (render Inertia pages as they're created)
Route::get('/privacy', fn () => Inertia::render('Privacy'))->name('privacy');
Route::get('/terms', fn () => Inertia::render('Terms'))->name('terms');
Route::get('/safeguarding', fn () => Inertia::render('Safeguarding'))->name('safeguarding');

// ─── ADMIN / CMS ROUTES ───────────────────────────────────────────────────────

Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified'])->group(function () {

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

    // Remaining stub routes for sidebar links
    $adminStubs = [
        'pages'          => 'Pages',
        'publications'   => 'Publications',
        'testimonials'   => 'Testimonials',
        'media'          => 'Media',
        'audit'          => 'Audit',
    ];

    foreach ($adminStubs as $path => $component) {
        Route::get($path, fn () => Inertia::render('Admin/Module', [
            'title' => $component,
            'slug' => $path,
        ]))->name($path);
    }
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
