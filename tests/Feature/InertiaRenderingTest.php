<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InertiaRenderingTest extends TestCase
{
    use RefreshDatabase;

    public function test_homepage_renders_welcome_inertia_page(): void
    {
        $this->get('/')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Welcome'));
    }

    public function test_login_renders_auth_login_inertia_page(): void
    {
        $this->get('/login')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Auth/Login'));
    }

    public function test_register_renders_auth_register_inertia_page(): void
    {
        $this->get('/register')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Auth/Register'));
    }

    public function test_dashboard_renders_inertia_for_authenticated_user(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get('/dashboard')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Dashboard'));
    }

    public function test_first_load_includes_inertia_root_and_vite_assets(): void
    {
        $response = $this->get('/');

        $response->assertOk();
        $content = $response->getContent();

        $this->assertStringContainsString('id="app"', $content);
        $this->assertStringContainsString('data-page=', $content);
        $this->assertStringContainsString('/build/assets/', $content);
    }
}
