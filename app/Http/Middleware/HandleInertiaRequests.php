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
                'name' => $this->settings->get('org_name', $this->settings->get('organization_name', 'Chapter Four')),
                'tagline' => $this->settings->get('tagline', 'Promoting and protecting constitutional rights, human rights, and social justice in Malawi.'),
                'logo' => $this->settings->get('logo'),
                'contact_email' => $this->settings->get('contact_email', 'info@chapterfour.mw'),
                'contact_phone' => $this->settings->get('contact_phone', '+265 (0) 1 770 000'),
                'office_address' => $this->settings->get('office_address', 'Lilongwe, Area 10 / City Centre, Malawi'),
                'emergency_helpline' => $this->settings->get('emergency_helpline', '+265 999 000 111'),
                'hours' => $this->settings->get('hours', 'Monday – Friday: 08:00 – 17:00 CAT'),
                'mission' => $this->settings->get('mission', 'To promote and protect constitutional rights, strengthen access to justice, empower citizens, and contribute to accountable governance in Malawi.'),
                'vision' => $this->settings->get('vision', 'A just, democratic and inclusive Malawi where the rights and freedoms guaranteed by the Constitution are respected, protected and enjoyed by all.'),
                'twitter_url' => $this->settings->get('twitter_url', 'https://twitter.com/chapterfour_mw'),
                'facebook_url' => $this->settings->get('facebook_url', 'https://facebook.com/chapterfourmw'),
                'linkedin_url' => $this->settings->get('linkedin_url', 'https://linkedin.com/company/chapterfourmw'),
                'instagram_url' => $this->settings->get('instagram_url', 'https://instagram.com/chapterfourmw'),
            ],
            'unread_inquiries_count' => fn () => $request->user() && Schema::hasTable('inquiries')
                ? \App\Models\Inquiry::where('status', 'new')->count()
                : 0,
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
