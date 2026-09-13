<?php

namespace App\Models;

use App\Concerns\HasSeo;
use App\Traits\PublishesContent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasSeo, PublishesContent, SoftDeletes;

    protected $fillable = [
        'title', 'slug', 'summary', 'description', 'objectives', 'start_date',
        'end_date', 'status', 'locations', 'beneficiaries', 'featured_image',
        'gallery', 'outputs', 'impact_stats', 'donors', 'published_at',
    ];

    protected function casts(): array
    {
        return [
            'objectives' => 'array',
            'locations' => 'array',
            'beneficiaries' => 'array',
            'gallery' => 'array',
            'outputs' => 'array',
            'impact_stats' => 'array',
            'donors' => 'array',
            'start_date' => 'date',
            'end_date' => 'date',
            'published_at' => 'datetime',
        ];
    }

    public function thematicAreas(): BelongsToMany
    {
        return $this->belongsToMany(ThematicArea::class);
    }

    public function partners(): BelongsToMany
    {
        return $this->belongsToMany(Partner::class);
    }

    public function resources(): BelongsToMany
    {
        return $this->belongsToMany(Resource::class);
    }
}
