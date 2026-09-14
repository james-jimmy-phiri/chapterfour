<?php

namespace App\Services;

use Exception;
use Illuminate\Database\Eloquent\Collection;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleService
{
    protected const PROTECTED_ROLES = [
        'super-admin',
        'admin',
    ];

    public function __construct(
        protected AuditService $audit
    ) {}

    public function getAllRoles(): Collection
    {
        $roles = Role::with(['permissions', 'users'])->get();

        return $roles->map(function (Role $role) {
            $metadata = $this->getRoleMetadata($role->name);
            $role->display_name = $metadata['display_name'];
            $role->purpose = $metadata['purpose'];
            $role->access_level = $metadata['access_level'];
            $role->is_protected = in_array($role->name, self::PROTECTED_ROLES);
            $role->users_count = $role->users->count();
            return $role;
        });
    }

    public function getRoleMetadata(string $roleName): array
    {
        return match ($roleName) {
            'super-admin' => [
                'display_name' => 'Super Administrator',
                'purpose' => 'System owner / highest authority',
                'access_level' => 'Full System',
                'badge' => 'bg-amber-500/10 text-amber-400 border-amber-500/30',
            ],
            'admin' => [
                'display_name' => 'Administrator',
                'purpose' => 'Manages organization website and CMS',
                'access_level' => 'Very High',
                'badge' => 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
            ],
            'content-manager' => [
                'display_name' => 'Content Manager',
                'purpose' => 'Manages and publishes institutional content',
                'access_level' => 'High',
                'badge' => 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
            ],
            'editor' => [
                'display_name' => 'Editor',
                'purpose' => 'Creates, edits and reviews content submissions',
                'access_level' => 'Medium',
                'badge' => 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
            ],
            'contributor' => [
                'display_name' => 'Contributor',
                'purpose' => 'Creates content and field project drafts',
                'access_level' => 'Limited',
                'badge' => 'bg-slate-500/10 text-slate-400 border-slate-500/30',
            ],
            'communications-officer' => [
                'display_name' => 'Communications Officer',
                'purpose' => 'News, publications, media, social/communications content',
                'access_level' => 'Specialized',
                'badge' => 'bg-violet-500/10 text-violet-400 border-violet-500/30',
            ],
            default => [
                'display_name' => ucwords(str_replace(['-', '_'], ' ', $roleName)),
                'purpose' => 'Custom organizational security role',
                'access_level' => 'Custom',
                'badge' => 'bg-sky-500/10 text-sky-400 border-sky-500/30',
            ],
        };
    }

    public function createRole(string $name, array $permissions = []): Role
    {
        $role = Role::create([
            'name' => strtolower(str_replace(' ', '-', trim($name))),
            'guard_name' => 'web',
        ]);

        if (! empty($permissions)) {
            $role->syncPermissions($permissions);
        }

        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $this->audit->log('role.created', $role, [
            'name' => $role->name,
            'permissions_count' => count($permissions),
        ]);

        return $role;
    }

    public function updateRole(Role $role, ?string $name = null, ?array $permissions = null): Role
    {
        if ($name && ! in_array($role->name, self::PROTECTED_ROLES)) {
            $role->update([
                'name' => strtolower(str_replace(' ', '-', trim($name))),
            ]);
        }

        if ($permissions !== null) {
            $role->syncPermissions($permissions);
        }

        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $this->audit->log('role.updated', $role, [
            'name' => $role->name,
            'permissions_count' => $role->permissions()->count(),
        ]);

        return $role;
    }

    public function deleteRole(Role $role): bool
    {
        if (in_array($role->name, self::PROTECTED_ROLES)) {
            throw new Exception("The role '{$role->name}' is a core system role and cannot be deleted.");
        }

        if ($role->users()->count() > 0) {
            throw new Exception("Cannot delete role '{$role->name}' while users are currently assigned to it. Reassign users first.");
        }

        $this->audit->log('role.deleted', $role, [
            'name' => $role->name,
        ]);

        $deleted = (bool) $role->delete();

        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        return $deleted;
    }
}
