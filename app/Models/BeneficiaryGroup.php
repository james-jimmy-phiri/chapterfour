<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BeneficiaryGroup extends Model
{
    protected $fillable = ['name', 'description', 'icon', 'image', 'sort_order', 'status'];
}
