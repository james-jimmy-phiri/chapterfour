<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CoreObjective extends Model
{
    protected $fillable = ['title', 'description', 'icon', 'activities', 'page_scope', 'sort_order', 'status'];

    protected function casts(): array
    {
        return [
            'activities' => 'array',
        ];
    }
}
