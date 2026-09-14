<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreRoleRequest;
use App\Http\Requests\Admin\UpdateRoleRequest;
use App\Services\PermissionService;
use App\Services\RoleService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function __construct(
        protected RoleService $roleService,
        protected PermissionService $permissionService
    ) {}

    public function index(): Response
    {
        $roles = $this->roleService->getAllRoles();
        $groupedPermissions = $this->permissionService->getGroupedPermissions();

        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles,
            'groupedPermissions' => $groupedPermissions,
        ]);
    }

    public function store(StoreRoleRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $permissions = $validated['permissions'] ?? [];

        $this->roleService->createRole($validated['name'], $permissions);

        return redirect()->back()->with('success', 'Security role created successfully.');
    }

    public function update(UpdateRoleRequest $request, Role $role): RedirectResponse
    {
        $validated = $request->validated();
        $permissions = $validated['permissions'] ?? [];

        $this->roleService->updateRole($role, $validated['name'], $permissions);

        return redirect()->back()->with('success', 'Security role updated successfully.');
    }

    public function destroy(Role $role): RedirectResponse
    {
        try {
            $this->roleService->deleteRole($role);
            return redirect()->back()->with('success', 'Security role deleted successfully.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
