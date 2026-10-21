<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuditLogController extends Controller
{
    public function index(Request $request): Response
    {
        $search  = $request->query('search');
        $action  = $request->query('action');
        $entity  = $request->query('entity');

        $query = AuditLog::with('user')->latest();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('action', 'like', "%{$search}%")
                  ->orWhere('entity_type', 'like', "%{$search}%")
                  ->orWhereHas('user', fn ($u) => $u->where('name', 'like', "%{$search}%"));
            });
        }

        if ($action && $action !== 'all') {
            $query->where('action', 'like', "%{$action}%");
        }

        if ($entity && $entity !== 'all') {
            $query->where('entity_type', $entity);
        }

        $logs = $query->paginate(25)->withQueryString()->through(fn ($log) => [
            'id'         => $log->id,
            'user'       => $log->user?->name ?? 'System',
            'user_email' => $log->user?->email ?? null,
            'action'     => $log->action,
            'entity'     => $log->entity_type . ($log->entity_id ? " #{$log->entity_id}" : ''),
            'entity_type'=> $log->entity_type,
            'entity_id'  => $log->entity_id,
            'properties' => $log->properties,
            'ip_address' => $log->ip_address,
            'user_agent' => $log->user_agent,
            'time'       => $log->created_at->diffForHumans(),
            'created_at' => $log->created_at->format('Y-m-d H:i:s'),
            'type'       => $this->resolveType($log->action),
        ]);

        // Entity types for filter dropdown
        $entityTypes = AuditLog::select('entity_type')
            ->distinct()
            ->whereNotNull('entity_type')
            ->orderBy('entity_type')
            ->pluck('entity_type');

        return Inertia::render('Admin/AuditLog/Index', [
            'logs'        => $logs,
            'entityTypes' => $entityTypes,
            'filters'     => [
                'search' => $search ?? '',
                'action' => $action ?? 'all',
                'entity' => $entity ?? 'all',
            ],
        ]);
    }

    private function resolveType(string $action): string
    {
        return match (true) {
            str_contains($action, 'publish')    => 'publish',
            str_contains($action, 'creat')      => 'create',
            str_contains($action, 'delet')      => 'delete',
            str_contains($action, 'upload')     => 'upload',
            str_contains($action, 'subscrib')   => 'subscribe',
            str_contains($action, 'login')      => 'login',
            default                             => 'update',
        };
    }
}
