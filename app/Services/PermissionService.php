<?php

namespace App\Services;

use Spatie\Permission\Models\Permission;

class PermissionService
{
    public function getGroupedPermissions(): array
    {
        $permissions = Permission::all();

        $modules = [
            'Users & Security' => [
                'prefix' => 'users.',
                'description' => 'Staff accounts, profiles, credential status, and access suspension',
                'permissions' => [],
            ],
            'Roles & Permissions' => [
                'prefix' => 'roles.',
                'description' => 'Security roles, privilege matrices, and authorization boundaries',
                'permissions' => [],
            ],
            'News & Resources' => [
                'prefix' => 'resources.',
                'description' => 'Legal publications, policy briefs, press releases, and articles',
                'permissions' => [],
            ],
            'Thematic Areas & Projects' => [
                'prefix' => ['thematic_areas.', 'projects.'],
                'description' => 'Chapter IV pillars, constitutional literacy, and mobile legal aid clinics',
                'permissions' => [],
            ],
            'Institutional & Governance' => [
                'prefix' => ['team.', 'partners.', 'statistics.', 'testimonials.'],
                'description' => 'Executive team, statutory partners, impact indicators, and beneficiary stories',
                'permissions' => [],
            ],
            'Public Engagement & Media' => [
                'prefix' => ['inquiries.', 'newsletter.', 'media.'],
                'description' => 'Citizen inquiry inbox, legal petitions, newsletter list, and media library',
                'permissions' => [],
            ],
            'System Settings & Audit' => [
                'prefix' => ['settings.', 'audit.'],
                'description' => 'Organization configuration, helplines, and immutable security audit log',
                'permissions' => [],
            ],
        ];

        foreach ($permissions as $permission) {
            $assigned = false;
            foreach ($modules as $moduleName => &$moduleData) {
                $prefixes = (array) $moduleData['prefix'];
                foreach ($prefixes as $prefix) {
                    if (str_starts_with($permission->name, $prefix)) {
                        $moduleData['permissions'][] = [
                            'id' => $permission->id,
                            'name' => $permission->name,
                            'label' => $this->humanizePermission($permission->name),
                        ];
                        $assigned = true;
                        break 2;
                    }
                }
            }

            if (! $assigned) {
                $modules['Other']['permissions'][] = [
                    'id' => $permission->id,
                    'name' => $permission->name,
                    'label' => $this->humanizePermission($permission->name),
                ];
            }
        }

        return array_filter($modules, fn ($mod) => ! empty($mod['permissions']));
    }

    protected function humanizePermission(string $name): string
    {
        $parts = explode('.', $name);
        $action = $parts[1] ?? $parts[0];
        $entity = $parts[0] ?? '';

        return ucwords(str_replace('_', ' ', $action . ' ' . $entity));
    }
}
