<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    protected $fillable = [
        'word', 'bg_image', 'right_image', 'right_alt',
        'accent_label', 'status', 'sort_order',
    ];
}
