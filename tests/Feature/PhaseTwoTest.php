<?php

namespace Tests\Feature;

use App\Enums\ContentStatus;
use App\Enums\InquiryStatus;
use App\Enums\ResourceType;
use App\Models\AuditLog;
use App\Models\Inquiry;
use App\Models\NewsletterSubscriber;
use App\Models\Project;
use App\Models\Resource;
use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class PhaseTwoTest extends TestCase
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

    public function test_public_contact_submission_creates_inquiry_and_audit(): void
    {
        $payload = [
            'name' => 'Grace Chinkono',
            'email' => 'grace.test@chapterfour.mw',
            'phone' => '+265 999 111 222',
            'inquiry_type' => 'Constitutional Literacy',
            'subject' => 'Partnership Inquiry for Lilongwe Clinic',
            'message' => 'We would love to coordinate with Chapter Four on the upcoming paralegal training.',
        ];

        $response = $this->post('/contact', $payload);
        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('inquiries', [
            'email' => 'grace.test@chapterfour.mw',
            'status' => InquiryStatus::New->value,
        ]);

        $this->assertDatabaseHas('audit_logs', [
            'action' => 'submitted',
        ]);
    }

    public function test_newsletter_subscription_records_subscriber(): void
    {
        $response = $this->post('/newsletter/subscribe', [
            'email' => 'subscriber.test@chapterfour.mw',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('newsletter_subscribers', [
            'email' => 'subscriber.test@chapterfour.mw',
            'status' => 'subscribed',
        ]);
    }

    public function test_resource_detail_page_renders_inertia_component(): void
    {
        $resource = Resource::firstOrCreate(
            ['slug' => 'state-of-constitutional-rights-2024'],
            [
                'title' => 'State of Constitutional Rights in Malawi: 2024 Youth Barometer',
                'type' => ResourceType::Report,
                'status' => ContentStatus::Published,
                'excerpt' => 'A comprehensive national assessment of civil liberties and youth civic participation.',
                'body' => 'Full report text on Chapter IV rights.',
                'is_featured' => true,
                'published_at' => now(),
            ]
        );

        $this->get("/resources/{$resource->slug}")
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('ResourceDetail')
                ->has('resource')
                ->where('resource.slug', $resource->slug)
            );
    }

    public function test_projects_catalog_and_detail_render(): void
    {
        $project = Project::firstOrCreate(
            ['slug' => 'mobile-legal-defense-clinics'],
            [
                'title' => 'Mobile Legal Defense Clinics for Rural Youth',
                'summary' => 'Deploying traveling legal clinics to police stations and community courts.',
                'description' => 'A frontline legal empowerment project providing immediate legal consultation.',
                'status' => 'published',
                'locations' => ['Lilongwe Rural', 'Dowa'],
                'beneficiaries' => ['Detained Youth', 'Vulnerable Families'],
                'published_at' => now(),
            ]
        );

        $this->get('/projects')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Projects')
                ->has('projects')
            );

        $this->get("/projects/{$project->slug}")
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('ProjectDetail')
                ->has('project')
                ->where('project.slug', $project->slug)
            );
    }

    public function test_admin_resource_crud_lifecycle(): void
    {
        $this->actingAs($this->admin)
            ->get('/admin/resources')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Admin/Resources/Index'));

        // Create Resource
        $createPayload = [
            'title' => 'Automated Human Rights Brief 2026',
            'type' => 'policy_brief',
            'excerpt' => 'Automated test summary for human rights brief.',
            'body' => 'Full brief content for testing.',
            'status' => 'published',
            'is_featured' => false,
            'published_at' => now()->toDateString(),
        ];

        $createResponse = $this->actingAs($this->admin)->post('/admin/resources', $createPayload);
        $createResponse->assertRedirect(route('admin.resources.index'));

        $created = Resource::where('title', 'Automated Human Rights Brief 2026')->first();
        $this->assertNotNull($created);

        // Edit View
        $this->actingAs($this->admin)
            ->get("/admin/resources/{$created->id}/edit")
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Admin/Resources/Form'));

        // Delete Resource
        $deleteResponse = $this->actingAs($this->admin)->delete("/admin/resources/{$created->id}");
        $deleteResponse->assertRedirect(route('admin.resources.index'));
        $this->assertSoftDeleted('resources', ['id' => $created->id]);
    }

    public function test_admin_inquiries_management(): void
    {
        $inquiry = Inquiry::create([
            'name' => 'Jane Doe',
            'email' => 'jane.doe@example.mw',
            'type' => 'Legal Defense',
            'subject' => 'Civic Education Material Request',
            'message' => 'Please send constitutional materials to Mzuzu.',
            'status' => InquiryStatus::New,
        ]);

        $this->actingAs($this->admin)
            ->get('/admin/inquiries')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Admin/Inquiries/Index'));

        // Update status
        $this->actingAs($this->admin)
            ->patch("/admin/inquiries/{$inquiry->id}/status", ['status' => 'in_progress'])
            ->assertRedirect();

        $inquiry->refresh();
        $this->assertEquals(InquiryStatus::InProgress, $inquiry->status);

        // Update internal notes
        $this->actingAs($this->admin)
            ->patch("/admin/inquiries/{$inquiry->id}/notes", ['internal_notes' => 'Materials dispatched via courier.'])
            ->assertRedirect();

        $inquiry->refresh();
        $this->assertEquals('Materials dispatched via courier.', $inquiry->internal_notes);
    }

    public function test_admin_newsletter_and_export(): void
    {
        $this->actingAs($this->admin)
            ->get('/admin/newsletter')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Admin/Newsletter/Index'));

        $exportResponse = $this->actingAs($this->admin)->get('/admin/newsletter/export');
        $exportResponse->assertOk();
        $this->assertStringContainsString('text/csv', $exportResponse->headers->get('content-type'));
    }

    public function test_admin_statistics_and_settings(): void
    {
        // Statistics index
        $this->actingAs($this->admin)
            ->get('/admin/statistics')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Admin/Statistics/Index'));

        // Settings index
        $this->actingAs($this->admin)
            ->get('/admin/settings')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Admin/Settings/Index'));

        // Settings update
        $this->actingAs($this->admin)
            ->post('/admin/settings', [
                'org_name' => 'Chapter Four Malawi NGO',
                'contact_email' => 'secretariat@chapterfour.mw',
            ])
            ->assertRedirect();

        $setting = SiteSetting::where('key', 'org_name')->first();
        $this->assertNotNull($setting);
        $this->assertEquals('Chapter Four Malawi NGO', $setting->value);
    }
}
