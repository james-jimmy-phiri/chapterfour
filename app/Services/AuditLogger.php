<?php

namespace App\Services;

use App\Models\AuditLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class AuditLogger
{
    /**
     * Log an administrative or significant system action.
     */
    public static function log(string $action, string $entityType, ?int $entityId = null, array $properties = []): ?AuditLog
    {
        try {
            return AuditLog::create([
                'user_id' => Auth::id(),
                'action' => $action,
                'entity_type' => $entityType,
                'entity_id' => $entityId,
                'properties' => $properties ?: null,
                'ip_address' => Request::ip(),
                'user_agent' => Request::userAgent(),
            ]);
        } catch (\Throwable $e) {
            // Fail silently to never block main application execution
            report($e);
            return null;
        }
    }
}
