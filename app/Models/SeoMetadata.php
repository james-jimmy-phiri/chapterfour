<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class SeoMetadata extends Model
{
    protected $fillable = [
        'meta_title', 'meta_description', 'canonical_url',
        'og_title', 'og_description', 'og_image', 'robots',
    ];

    public function seoable(): MorphTo
    {
        return $this->morphTo();
    }
}
