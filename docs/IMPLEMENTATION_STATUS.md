# Chapter Four — Implementation Status

Last verified: local Laragon + automated tests.

## Working now (tested)

### Application shell
- Laravel 12 + Inertia.js + React 18 + TypeScript + Tailwind
- Single Blade shell: `resources/views/app.blade.php` (`@inertia` only — **no PHP page templates**)
- All user-facing routes use `Inertia::render(...)` → React pages under `resources/js/Pages/`

### Routes → React pages

| URL | React component |
|-----|-----------------|
| `/` | `Pages/Welcome.tsx` |
| `/login` | `Pages/Auth/Login.tsx` |
| `/register` | `Pages/Auth/Register.tsx` |
| `/dashboard` | `Pages/Dashboard.tsx` |
| `/profile` | `Pages/Profile/Edit.tsx` |
| Password / verify email flows | `Pages/Auth/*` |

### Database
- Migrations applied: users, cache, jobs, Spatie permissions, media, Fortify 2FA/passkeys, Chapter Four CMS tables
- Models: thematic areas, resources, projects, partners, inquiries, settings, etc. (backend only — **no public CMS UI yet**)

### Auth & security packages (installed, partial wiring)
- Laravel Breeze (session auth UI)
- Laravel Fortify (2FA/passkey routes present; full admin 2FA policy not finished)
- Spatie Permission on `User` model (roles seeder **not** added yet)

### Tests
- `php artisan test` — Breeze auth/profile tests + `InertiaRenderingTest` (confirms React/Inertia, not Blade pages)

## Not implemented yet (from original brief)

- Chapter Four public design (hero, 3D, About, What We Do, Resources, etc.)
- `/admin` CMS dashboard and modules
- Seeders for org content, navigation, RBAC roles
- Contact / newsletter / get-involved forms
- SEO, sitemap, search

## Local URLs (Laragon)

- **Project folder URL:** `http://dev.test/chapterfour/public/`
- **Recommended:** create a Laragon vhost with document root `...\chapterfour\public` (e.g. `http://chapterfour.test`)

## Commands

```bash
cd c:\laragon\www\dev\chapterfour
composer install
npm install
cp .env.example .env   # if needed
php artisan key:generate
php artisan migrate
npm run build          # production assets (required without `npm run dev`)
php artisan serve      # optional; Laragon can serve public/ directly
php artisan test
```

For development with hot reload: `npm run dev` alongside Laragon/Apache.
