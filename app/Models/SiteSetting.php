<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = ['group', 'key', 'value', 'type'];

    // No array cast — value is stored as plain text/json string
    // SiteSettingsService::get() reads it as-is
    protected function casts(): array
    {
        return [];
    }
}
