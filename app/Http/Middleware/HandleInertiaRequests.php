<?php

namespace App\Http\Middleware;

use App\Models\NavigationItem;
use App\Services\SiteSettingsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function __construct(private SiteSettingsService $settings) {}

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'roles' => $request->user()?->getRoleNames(),
                'permissions' => $request->user()?->getAllPermissions()->pluck('name'),
            ],
            'site' => [
                'name' => $this->settings->get('organization_name', 'Chapter Four'),
                'tagline' => $this->settings->get('tagline'),
                'logo' => $this->settings->get('logo'),
            ],
            'navigation' => fn () => Schema::hasTable('navigation_items')
                ? NavigationItem::query()
                    ->where('is_visible', true)
                    ->whereNull('parent_id')
                    ->orderBy('sort_order')
                    ->with('children')
                    ->get()
                    ->groupBy('location')
                : collect(),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }
}
