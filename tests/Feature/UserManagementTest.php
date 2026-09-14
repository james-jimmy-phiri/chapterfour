<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class UserManagementTest extends TestCase
{
    use RefreshDatabase;

    protected User $superAdmin;
    protected Role $superAdminRole;
    protected Role $editorRole;

    protected function setUp(): void
    {
        parent::setUp();

        $this->superAdminRole = Role::firstOrCreate(['name' => 'super-admin', 'guard_name' => 'web']);
        $this->editorRole = Role::firstOrCreate(['name' => 'editor', 'guard_name' => 'web']);

        $viewPerm = Permission::firstOrCreate(['name' => 'users.view', 'guard_name' => 'web']);
        $createPerm = Permission::firstOrCreate(['name' => 'users.create', 'guard_name' => 'web']);
        $editPerm = Permission::firstOrCreate(['name' => 'users.edit', 'guard_name' => 'web']);
        $deletePerm = Permission::firstOrCreate(['name' => 'users.delete', 'guard_name' => 'web']);

        $this->superAdminRole->syncPermissions([$viewPerm, $createPerm, $editPerm, $deletePerm]);

        $this->superAdmin = User::firstOrCreate(
            ['email' => 'admin@chapterfour.mw'],
            [
                'first_name' => 'Executive',
                'last_name' => 'Director',
                'name' => 'Executive Director',
                'job_title' => 'Executive Director',
                'department' => 'Executive',
                'employee_id' => 'C4-EXEC-001',
                'phone' => '+265 999 000 111',
                'status' => 'active',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );

        if (! $this->superAdmin->hasRole('super-admin')) {
            $this->superAdmin->assignRole('super-admin');
        }
    }

    public function test_admin_can_view_users_index_page(): void
    {
        $response = $this->actingAs($this->superAdmin)->get('/admin/users');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Users/Index')
            ->has('users.data')
            ->has('stats')
            ->has('roles')
            ->has('departments')
        );
    }

    public function test_admin_can_create_user_with_roles_and_employee_id(): void
    {
        $payload = [
            'first_name' => 'Tamanda',
            'last_name' => 'Chirwa',
            'name' => 'Tamanda Chirwa',
            'email' => 'tamanda.chirwa@chapterfour.mw',
            'phone' => '+265 888 777 666',
            'job_title' => 'Legal Fellow',
            'department' => 'Legal & Advocacy',
            'employee_id' => 'C4-LEG-099',
            'status' => 'active',
            'password' => 'Password123!',
            'roles' => ['editor'],
        ];

        $response = $this->actingAs($this->superAdmin)->post('/admin/users', $payload);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('users', [
            'email' => 'tamanda.chirwa@chapterfour.mw',
            'first_name' => 'Tamanda',
            'last_name' => 'Chirwa',
            'employee_id' => 'C4-LEG-099',
            'department' => 'Legal & Advocacy',
            'status' => 'active',
        ]);

        $created = User::where('email', 'tamanda.chirwa@chapterfour.mw')->first();
        $this->assertNotNull($created);
        $this->assertTrue($created->hasRole('editor'));
    }

    public function test_user_creation_validates_unique_email_and_employee_id(): void
    {
        $payload = [
            'first_name' => 'Duplicate',
            'last_name' => 'Admin',
            'email' => 'admin@chapterfour.mw', // already exists
            'employee_id' => 'C4-EXEC-001', // already exists
            'status' => 'active',
        ];

        $response = $this->actingAs($this->superAdmin)->post('/admin/users', $payload);

        $response->assertSessionHasErrors(['email', 'employee_id']);
    }

    public function test_admin_can_update_user_and_roles(): void
    {
        $user = User::factory()->create([
            'first_name' => 'Old',
            'last_name' => 'Name',
            'email' => 'old.name@chapterfour.mw',
            'department' => 'Communications',
        ]);

        $updatePayload = [
            'first_name' => 'Updated',
            'last_name' => 'Official',
            'name' => 'Updated Official',
            'email' => 'updated.official@chapterfour.mw',
            'department' => 'Programs',
            'job_title' => 'Program Specialist',
            'employee_id' => 'C4-PRO-888',
            'status' => 'active',
            'roles' => ['editor'],
        ];

        $response = $this->actingAs($this->superAdmin)->put("/admin/users/{$user->id}", $updatePayload);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'email' => 'updated.official@chapterfour.mw',
            'first_name' => 'Updated',
            'last_name' => 'Official',
            'department' => 'Programs',
        ]);

        $this->assertTrue($user->fresh()->hasRole('editor'));
    }

    public function test_admin_can_toggle_user_status(): void
    {
        $user = User::factory()->create(['status' => 'active']);

        $response = $this->actingAs($this->superAdmin)->patch("/admin/users/{$user->id}/status", [
            'status' => 'suspended',
        ]);

        $response->assertRedirect();
        $this->assertEquals('suspended', $user->fresh()->status->value);
    }

    public function test_admin_cannot_suspend_their_own_account(): void
    {
        $response = $this->actingAs($this->superAdmin)->patch("/admin/users/{$this->superAdmin->id}/status", [
            'status' => 'suspended',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('error');
        $this->assertEquals('active', $this->superAdmin->fresh()->status->value);
    }

    public function test_admin_can_soft_delete_and_restore_user(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($this->superAdmin)->delete("/admin/users/{$user->id}");

        $response->assertRedirect();
        $this->assertSoftDeleted('users', ['id' => $user->id]);

        $restoreResponse = $this->actingAs($this->superAdmin)->post("/admin/users/{$user->id}/restore");
        $restoreResponse->assertRedirect();

        $this->assertNotSoftDeleted('users', ['id' => $user->id]);
    }

    public function test_admin_cannot_delete_their_own_account(): void
    {
        $response = $this->actingAs($this->superAdmin)->delete("/admin/users/{$this->superAdmin->id}");

        $response->assertRedirect();
        $response->assertSessionHas('error');
        $this->assertNotSoftDeleted('users', ['id' => $this->superAdmin->id]);
    }

    public function test_admin_can_view_roles_and_permissions_matrix(): void
    {
        $response = $this->actingAs($this->superAdmin)->get('/admin/roles');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Roles/Index')
            ->has('roles')
            ->has('groupedPermissions')
        );
    }

    public function test_admin_can_create_custom_role_with_permissions(): void
    {
        $payload = [
            'name' => 'Paralegal Officer',
            'permissions' => ['users.view'],
        ];

        $response = $this->actingAs($this->superAdmin)->post('/admin/roles', $payload);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('roles', [
            'name' => 'paralegal-officer',
        ]);

        $role = Role::where('name', 'paralegal-officer')->first();
        $this->assertTrue($role->hasPermissionTo('users.view'));
    }

    public function test_admin_cannot_delete_protected_super_admin_role(): void
    {
        $response = $this->actingAs($this->superAdmin)->delete("/admin/roles/{$this->superAdminRole->id}");

        $response->assertRedirect();
        $response->assertSessionHas('error');
        $this->assertDatabaseHas('roles', ['name' => 'super-admin']);
    }
}
