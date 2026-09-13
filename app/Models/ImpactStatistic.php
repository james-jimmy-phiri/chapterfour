<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImpactStatistic extends Model
{
    protected $fillable = [
        'label', 'value', 'prefix', 'suffix', 'description', 'icon', 'sort_order', 'status',
    ];
}
