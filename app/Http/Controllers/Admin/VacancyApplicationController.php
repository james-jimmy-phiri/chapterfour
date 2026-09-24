<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VacancyApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VacancyApplicationController extends Controller
{
    public function index(Request $request): Response
    {
        $vacancy_id = $request->query('vacancy_id');
        
        $query = VacancyApplication::with('vacancy')->latest();
        
        if ($vacancy_id) {
            $query->where('vacancy_id', $vacancy_id);
        }
        
        return Inertia::render('Admin/VacancyApplications/Index', [
            'applications' => $query->paginate(20)->withQueryString(),
        ]);
    }
}
