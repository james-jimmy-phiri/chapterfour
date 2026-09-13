<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdminAccess
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user || ! $user->hasAnyRole(['super-admin', 'admin', 'editor', 'contributor'])) {
            abort(403);
        }

        if ($user->requiresTwoFactorSetup() && ! $request->routeIs('admin.two-factor.*', 'logout')) {
            return redirect()->route('admin.two-factor.setup');
        }

        return $next($request);
    }
}
