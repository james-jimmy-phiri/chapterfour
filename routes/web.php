<?php

use App\Http\Controllers\Admin\DashboardController;
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
Route::get('/news', [PublicController::class, 'resources'])->name('news');
Route::get('/contact', [PublicController::class, 'contact'])->name('contact');
Route::get('/get-involved', [PublicController::class, 'getInvolved'])->name('get-involved');

// Static / legal pages (render Inertia pages as they're created)
Route::get('/privacy', fn () => Inertia::render('Privacy'))->name('privacy');
Route::get('/terms', fn () => Inertia::render('Terms'))->name('terms');
Route::get('/safeguarding', fn () => Inertia::render('Safeguarding'))->name('safeguarding');

// ─── ADMIN / CMS ROUTES ───────────────────────────────────────────────────────

Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified'])->group(function () {

    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Stub routes for sidebar links (will be implemented in Phase 2)
    $adminStubs = [
        'pages'          => 'Pages',
        'resources'      => 'Resources',
        'thematic-areas' => 'ThematicAreas',
        'projects'       => 'Projects',
        'publications'   => 'Publications',
        'team'           => 'Team',
        'partners'       => 'Partners',
        'statistics'     => 'Statistics',
        'testimonials'   => 'Testimonials',
        'inquiries'      => 'Inquiries',
        'newsletter'     => 'Newsletter',
        'media'          => 'Media',
        'users'          => 'Users',
        'settings'       => 'Settings',
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
