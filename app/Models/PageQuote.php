<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageQuote extends Model
{
    protected $fillable = ['quote_text', 'attribution', 'image', 'page_key', 'sort_order', 'status'];
}
