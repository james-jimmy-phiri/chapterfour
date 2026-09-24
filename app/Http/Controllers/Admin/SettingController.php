<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use App\Services\AuditLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    /**
     * Display the site settings page.
     */
    public function index(): Response
    {
        $allSettings = SiteSetting::all()->pluck('value', 'key')->toArray();

        $defaults = [
            'org_name' => 'Chapter Four Malawi',
            'tagline' => 'Rights. Justice. Dignity. For Everyone.',
            'contact_email' => 'info@chapterfour.mw',
            'contact_phone' => '+265 (0) 1 770 000',
            'office_address' => 'Lilongwe, Area 10 / City Centre, Malawi',
            'hours' => 'Monday – Friday: 08:00 – 17:00 CAT',
            'twitter_url' => 'https://twitter.com/chapterfour_mw',
            'facebook_url' => 'https://facebook.com/chapterfourmw',
            'linkedin_url' => 'https://linkedin.com/company/chapterfourmw',
            'instagram_url' => 'https://instagram.com/chapterfourmw',
            'emergency_helpline' => '+265 999 000 111',
            'mission' => 'To promote and protect constitutional rights, strengthen access to justice, empower citizens, and contribute to accountable governance in Malawi.',
            'vision' => 'A just, democratic and inclusive Malawi where the rights and freedoms guaranteed by the Constitution are respected, protected and enjoyed by all.',
            'contact_image' => '/images/child-hero.png',
        ];

        $settings = array_merge($defaults, $allSettings);

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update settings.
     */
    public function update(Request $request): RedirectResponse
    {
        $input = $request->except(['_token', '_method', 'contact_image_file']);

        if ($request->hasFile('contact_image_file')) {
            $path = $request->file('contact_image_file')->store('settings', 'public');
            $input['contact_image'] = '/storage/' . $path;
        }

        foreach ($input as $key => $value) {
            SiteSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value, 'group' => 'general']
            );
        }

        AuditLogger::log('updated', 'SiteSetting', null, [
            'keys_updated' => array_keys($input),
        ]);

        return redirect()->back()->with('success', 'Site settings updated successfully.');
    }
}
