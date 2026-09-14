<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // ── 1. DEFINE PERMISSIONS BY MODULE ─────────────────────────────────────
        $permissionsByModule = [
            'Users & Security' => [
                'users.view' => 'View users list and profiles',
                'users.create' => 'Create new user accounts',
                'users.edit' => 'Edit user account details and status',
                'users.delete' => 'Delete user accounts',
                'users.restore' => 'Restore deleted user accounts',
                'users.assign_roles' => 'Assign or revoke roles from users',
            ],
            'Roles & Permissions' => [
                'roles.view' => 'View roles and permission sets',
                'roles.create' => 'Create new security roles',
                'roles.edit' => 'Modify role configurations and permissions',
                'roles.delete' => 'Delete custom roles',
                'roles.assign_permissions' => 'Grant or revoke permissions on roles',
            ],
            'News & Resources' => [
                'resources.view' => 'View resources and publications',
                'resources.create' => 'Create publications, news, and briefs',
                'resources.edit' => 'Edit publications and resources',
                'resources.publish' => 'Publish or schedule publications',
                'resources.delete' => 'Delete publications and resources',
            ],
            'Thematic Areas & Projects' => [
                'thematic_areas.view' => 'View constitutional thematic areas',
                'thematic_areas.manage' => 'Create, edit, and organize thematic areas',
                'projects.view' => 'View legal and advocacy field projects',
                'projects.create' => 'Create new field projects',
                'projects.edit' => 'Edit project details, milestones, and impacts',
                'projects.delete' => 'Delete field projects',
            ],
            'Institutional & Governance' => [
                'team.view' => 'View team members directory',
                'team.manage' => 'Manage leadership, staff, and advisors',
                'partners.view' => 'View partner organizations and alliances',
                'partners.manage' => 'Manage statutory bodies and civil society partners',
                'statistics.view' => 'View national impact metrics and indicators',
                'statistics.manage' => 'Manage and update headline metrics',
                'testimonials.view' => 'View community testimonials and legal stories',
                'testimonials.manage' => 'Manage beneficiary quotes and stories',
            ],
            'Public Engagement & Media' => [
                'inquiries.view' => 'View incoming public inquiries and citizen petitions',
                'inquiries.manage' => 'Respond to inquiries and update internal review notes',
                'inquiries.delete' => 'Delete inquiry submissions',
                'newsletter.view' => 'View newsletter subscriber list',
                'newsletter.export' => 'Export newsletter subscriber database to CSV',
                'newsletter.manage' => 'Manage newsletter subscriber status',
                'media.view' => 'Browse media assets library',
                'media.upload' => 'Upload images, documents, and media assets',
                'media.delete' => 'Delete media assets',
            ],
            'System Settings & Audit' => [
                'settings.view' => 'View general organization settings',
                'settings.edit' => 'Modify contact info, emergency hotlines, and metadata',
                'audit.view' => 'Inspect security audit logs and institutional actions',
            ],
        ];

        // Create permissions
        foreach ($permissionsByModule as $module => $permissions) {
            foreach ($permissions as $name => $description) {
                Permission::firstOrCreate(
                    ['name' => $name, 'guard_name' => 'web']
                );
            }
        }

        // ── 2. DEFINE AND CREATE ROLES ─────────────────────────────────────────
        $allPermissions = Permission::all();

        // 1. Super Administrator (System owner / highest authority - Full system)
        $superAdmin = Role::firstOrCreate(['name' => 'super-admin', 'guard_name' => 'web']);
        $superAdmin->syncPermissions($allPermissions);

        // 2. Administrator (Manages organization website and CMS - Very high)
        $admin = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $adminPermissions = $allPermissions->filter(function ($permission) {
            return ! in_array($permission->name, [
                'roles.delete',
            ]);
        });
        $admin->syncPermissions($adminPermissions);

        // 3. Content Manager (Manages and publishes content - High)
        $contentManager = Role::firstOrCreate(['name' => 'content-manager', 'guard_name' => 'web']);
        $contentManager->syncPermissions([
            'resources.view', 'resources.create', 'resources.edit', 'resources.publish', 'resources.delete',
            'thematic_areas.view', 'thematic_areas.manage',
            'projects.view', 'projects.create', 'projects.edit', 'projects.delete',
            'team.view', 'team.manage',
            'partners.view', 'partners.manage',
            'statistics.view', 'statistics.manage',
            'testimonials.view', 'testimonials.manage',
            'media.view', 'media.upload', 'media.delete',
            'inquiries.view',
            'newsletter.view',
        ]);

        // 4. Editor (Creates, edits and reviews content - Medium)
        $editor = Role::firstOrCreate(['name' => 'editor', 'guard_name' => 'web']);
        $editor->syncPermissions([
            'resources.view', 'resources.create', 'resources.edit',
            'thematic_areas.view',
            'projects.view', 'projects.create', 'projects.edit',
            'team.view',
            'partners.view',
            'statistics.view',
            'testimonials.view',
            'media.view', 'media.upload',
        ]);

        // 5. Contributor (Creates content/drafts - Limited)
        $contributor = Role::firstOrCreate(['name' => 'contributor', 'guard_name' => 'web']);
        $contributor->syncPermissions([
            'resources.view', 'resources.create', 'resources.edit',
            'projects.view',
            'media.view',
        ]);

        // 6. Communications Officer (News, publications, media, social/communications content - Specialized)
        $commsOfficer = Role::firstOrCreate(['name' => 'communications-officer', 'guard_name' => 'web']);
        $commsOfficer->syncPermissions([
            'resources.view', 'resources.create', 'resources.edit', 'resources.publish',
            'media.view', 'media.upload', 'media.delete',
            'inquiries.view', 'inquiries.manage',
            'newsletter.view', 'newsletter.export', 'newsletter.manage',
            'statistics.view', 'statistics.manage',
            'testimonials.view', 'testimonials.manage',
            'partners.view',
        ]);

        // ── 3. ENSURE ROOT ADMIN EXISTS AND HAS SUPER-ADMIN ROLE ───────────────
        $defaultAdmin = User::firstOrCreate(
            ['email' => 'admin@chapterfour.mw'],
            [
                'first_name' => 'Chapter Four',
                'last_name' => 'Executive',
                'name' => 'Chapter Four Executive Admin',
                'job_title' => 'Executive Director',
                'department' => 'Executive',
                'employee_id' => 'C4-EXEC-001',
                'phone' => '+265 999 000 111',
                'status' => 'active',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        if (! $defaultAdmin->hasRole('super-admin')) {
            $defaultAdmin->assignRole('super-admin');
        }

        // Seed sample users with different roles for demonstration
        $sampleUsers = [
            [
                'first_name' => 'Chisomo',
                'last_name' => 'Banda',
                'name' => 'Chisomo Banda',
                'email' => 'chisomo.banda@chapterfour.mw',
                'job_title' => 'Head of Legal & Litigation',
                'department' => 'Legal & Advocacy',
                'employee_id' => 'C4-LEG-002',
                'phone' => '+265 888 123 456',
                'status' => 'active',
                'role' => 'admin',
            ],
            [
                'first_name' => 'Tiwonge',
                'last_name' => 'Phiri',
                'name' => 'Tiwonge Phiri',
                'email' => 'tiwonge.phiri@chapterfour.mw',
                'job_title' => 'Senior Content & Publications Lead',
                'department' => 'Communications',
                'employee_id' => 'C4-COM-003',
                'phone' => '+265 991 234 567',
                'status' => 'active',
                'role' => 'content-manager',
            ],
            [
                'first_name' => 'Blessings',
                'last_name' => 'Msiska',
                'name' => 'Blessings Msiska',
                'email' => 'blessings.msiska@chapterfour.mw',
                'job_title' => 'Strategic Communications Officer',
                'department' => 'Communications',
                'employee_id' => 'C4-COM-004',
                'phone' => '+265 882 345 678',
                'status' => 'active',
                'role' => 'communications-officer',
            ],
            [
                'first_name' => 'Limbani',
                'last_name' => 'Chirwa',
                'name' => 'Limbani Chirwa',
                'email' => 'limbani.chirwa@chapterfour.mw',
                'job_title' => 'Civic Education Editor',
                'department' => 'Programs',
                'employee_id' => 'C4-PRO-005',
                'phone' => '+265 993 456 789',
                'status' => 'active',
                'role' => 'editor',
            ],
            [
                'first_name' => 'Madalitso',
                'last_name' => 'Kaunda',
                'name' => 'Madalitso Kaunda',
                'email' => 'madalitso.kaunda@chapterfour.mw',
                'job_title' => 'Community Paralegal Fellow',
                'department' => 'Legal & Advocacy',
                'employee_id' => 'C4-LEG-006',
                'phone' => '+265 884 567 890',
                'status' => 'pending',
                'role' => 'contributor',
            ],
        ];

        foreach ($sampleUsers as $data) {
            $roleName = $data['role'];
            unset($data['role']);

            $user = User::firstOrCreate(
                ['email' => $data['email']],
                array_merge($data, [
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                ])
            );

            if (! $user->hasRole($roleName)) {
                $user->assignRole($roleName);
            }
        }
    }
}
