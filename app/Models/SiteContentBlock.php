<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteContentBlock extends Model
{
    protected $fillable = ['key', 'page', 'section', 'title', 'body', 'sort_order'];
}
