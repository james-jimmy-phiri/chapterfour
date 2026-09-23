<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Intervention extends Model
{
    protected $fillable = [
        'title', 'short_title', 'description', 'examples',
        'image', 'icon', 'thematic_area_id', 'sort_order', 'status',
    ];

    protected function casts(): array
    {
        return [
            'examples' => 'array',
        ];
    }

    public function thematicArea(): BelongsTo
    {
        return $this->belongsTo(ThematicArea::class);
    }
}
