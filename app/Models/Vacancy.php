<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vacancy extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title', 'slug', 'department', 'location', 'type', 'tag', 'organization',
        'description', 'scope_intro', 'scope_sections', 'requirements',
        'evaluation_criteria', 'reservation_of_rights', 'application_email',
        'application_url', 'submission_address', 'is_urgent', 'posted_date',
        'closes_at', 'deadline_text', 'status', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'scope_sections'      => 'array',
            'requirements'        => 'array',
            'evaluation_criteria' => 'array',
            'submission_address'  => 'array',
            'is_urgent'           => 'boolean',
            'posted_date'         => 'date',
            'closes_at'           => 'datetime',
        ];
    }
}
