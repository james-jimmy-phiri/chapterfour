<?php

namespace App\Models;

use App\Concerns\HasSeo;
use App\Enums\ContentStatus;
use App\Traits\PublishesContent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ThematicArea extends Model
{
    use HasSeo, PublishesContent, SoftDeletes;

    protected $fillable = [
        'title', 'slug', 'short_description', 'full_description', 'why_it_matters',
        'objectives', 'interventions', 'beneficiaries', 'approach', 'icon',
        'cover_image', 'hero_image', 'sort_order', 'status', 'published_at',
    ];

    protected function casts(): array
    {
        return [
            'objectives' => 'array',
            'interventions' => 'array',
            'beneficiaries' => 'array',
            'published_at' => 'datetime',
            'status' => ContentStatus::class,
        ];
    }

    public function resources(): BelongsToMany
    {
        return $this->belongsToMany(Resource::class);
    }

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class);
    }

    public function interventionItems(): HasMany
    {
        return $this->hasMany(Intervention::class);
    }
}
