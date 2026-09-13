<?php

namespace App\Services;

use App\Models\SiteSetting;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;

class SiteSettingsService
{
    public function get(string $key, mixed $default = null): mixed
    {
        $settings = $this->all();

        return $settings[$key] ?? $default;
    }

    public function all(): array
    {
        if (! Schema::hasTable('site_settings')) {
            return [];
        }

        return Cache::remember('site_settings', 3600, function () {
            return SiteSetting::query()
                ->get()
                ->mapWithKeys(fn (SiteSetting $setting) => [$setting->key => $setting->value])
                ->all();
        });
    }

    public function set(string $key, mixed $value, string $group = 'general', string $type = 'string'): SiteSetting
    {
        $setting = SiteSetting::updateOrCreate(
            ['key' => $key],
            ['value' => $value, 'group' => $group, 'type' => $type]
        );

        Cache::forget('site_settings');

        return $setting;
    }
}
