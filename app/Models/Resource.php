<?php

namespace App\Models;

use App\Concerns\HasSeo;
use App\Enums\ContentStatus;
use App\Enums\ResourceType;
use App\Traits\PublishesContent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Resource extends Model
{
    use HasSeo, PublishesContent, SoftDeletes;

    protected $fillable = [
        'title', 'slug', 'type', 'excerpt', 'body', 'featured_image',
        'author_id', 'status', 'is_featured', 'pdf_path', 'published_at', 'scheduled_at',
    ];

    protected function casts(): array
    {
        return [
            'type' => ResourceType::class,
            'status' => ContentStatus::class,
            'is_featured' => 'boolean',
            'published_at' => 'datetime',
            'scheduled_at' => 'datetime',
        ];
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(ResourceTag::class);
    }

    public function thematicAreas(): BelongsToMany
    {
        return $this->belongsToMany(ThematicArea::class);
    }

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class);
    }
}
