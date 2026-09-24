<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VacancyApplication extends Model
{
    protected $fillable = [
        'vacancy_id',
        'name',
        'email',
        'phone',
        'location',
        'document_path'
    ];

    public function vacancy()
    {
        return $this->belongsTo(Vacancy::class);
    }
}
