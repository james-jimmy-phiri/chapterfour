<?php

namespace Tests\Feature;

use App\Models\Partner;
use App\Models\Project;
use App\Models\TeamMember;
use App\Models\ThematicArea;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class PhaseThreeTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        Role::firstOrCreate(['name' => 'super-admin', 'guard_name' => 'web']);

        $this->admin = User::firstOrCreate(
            ['email' => 'admin@chapterfour.mw'],
            [
                'name' => 'Chapter Four Executive Admin',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );

        if (!$this->admin->hasRole('super-admin')) {
            $this->admin->assignRole('super-admin');
        }
    }

    public function test_login_page_renders_with_redesigned_ui(): void
    {
        $response = $this->get('/login');
        $response->assertOk();
        $response->assertInertia(fn ($page) => $page->component('Auth/Login'));
    }

    public function test_about_page_receives_database_team_and_partners(): void
    {
        TeamMember::create([
            'name' => 'Kondwani Nkhoma',
            'role' => 'Executive Director',
            'category' => 'staff',
            'status' => 'published',
            'sort_order' => 1,
        ]);

        Partner::create([
            'name' => 'Malawi Human Rights Commission',
            'slug' => 'mhrc-test',
            'category' => 'statutory_body',
            'status' => 'published',
            'sort_order' => 1,
        ]);

        $this->get('/about')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('About')
                ->has('teamMembers')
                ->has('partners')
            );
    }

    public function test_admin_thematic_areas_crud(): void
    {
        $this->actingAs($this->admin)
            ->get('/admin/thematic-areas')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Admin/ThematicAreas/Index'));

        $response = $this->actingAs($this->admin)->post('/admin/thematic-areas', [
            'title' => 'Digital Rights & Freedom of Expression',
            'slug' => 'digital-rights',
            'short_description' => 'Safeguarding civic spaces online in Malawi.',
            'status' => 'published',
            'sort_order' => 9,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('thematic_areas', [
            'slug' => 'digital-rights',
        ]);
    }

    public function test_admin_field_projects_crud(): void
    {
        $this->actingAs($this->admin)
            ->get('/admin/projects')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Admin/Projects/Index'));

        $response = $this->actingAs($this->admin)->post('/admin/projects', [
            'title' => 'Salima Bail Assistance Mobile Unit',
            'summary' => 'Providing bail applications in Salima magistrate courts.',
            'locations' => ['Salima', 'Chipoka'],
            'beneficiaries' => ['Detained Youths'],
            'status' => 'published',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('projects', [
            'title' => 'Salima Bail Assistance Mobile Unit',
        ]);
    }

    public function test_admin_team_and_partners_management(): void
    {
        // Team
        $this->actingAs($this->admin)
            ->get('/admin/team')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Admin/Team/Index'));

        $this->actingAs($this->admin)->post('/admin/team', [
            'name' => 'Blessings Kaunda',
            'role' => 'Paralegal Coordinator',
            'category' => 'staff',
            'status' => 'published',
            'sort_order' => 5,
        ])->assertRedirect();

        $this->assertDatabaseHas('team_members', [
            'name' => 'Blessings Kaunda',
        ]);

        // Partners
        $this->actingAs($this->admin)
            ->get('/admin/partners')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Admin/Partners/Index'));

        $this->actingAs($this->admin)->post('/admin/partners', [
            'name' => 'Open Society Foundation',
            'category' => 'donor_agency',
            'status' => 'published',
            'sort_order' => 6,
        ])->assertRedirect();

        $this->assertDatabaseHas('partners', [
            'name' => 'Open Society Foundation',
        ]);
    }

    public function test_admin_dashboard_receives_enriched_metrics(): void
    {
        $this->actingAs($this->admin)
            ->get('/admin')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Dashboard')
                ->has('stats')
                ->has('recentInquiries')
                ->has('recentResources')
                ->has('recentActivity')
            );
    }
}
