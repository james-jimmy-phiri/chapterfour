<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CrossCuttingActivity extends Model
{
    protected $fillable = ['area', 'description', 'icon', 'color_class', 'bg_class', 'sort_order', 'status'];
}
