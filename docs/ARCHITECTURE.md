# Chapter Four — System Architecture

## Overview

Production URL: `https://chapterfour.org/`  
Admin URL: `https://chapterfour.org/admin`

Monolithic Laravel 12 application with Inertia.js + React + TypeScript frontend. Laravel is the single source of truth — no separate Node API.

## Stack

| Layer | Technology |
|-------|------------|
| Backend | Laravel 12, PHP 8.2+, MySQL |
| Frontend | Inertia.js 2, React 18, TypeScript, Tailwind CSS 3 |
| Animation | Framer Motion |
| 3D | React Three Fiber, Drei (lazy-loaded) |
| Auth | Laravel Breeze + Fortify 2FA |
| RBAC | spatie/laravel-permission |
| Media | spatie/laravel-medialibrary |
| Routing | Ziggy (named routes in React) |

## Route Structure

### Public
- `/` — Homepage
- `/about` — About
- `/what-we-do` — Thematic areas overview
- `/what-we-do/{slug}` — Thematic area detail
- `/projects`, `/projects/{slug}`
- `/resources`, `/resources/{slug}`
- `/partners`
- `/get-involved`
- `/contact`
- `/search`
- `/sitemap.xml`, `/robots.txt`

### Admin (`/admin/*`)
Protected by `auth`, `verified`, `admin`, role/permission middleware.

## Database ERD (Core)

```
users ──┬── pages (author)
        ├── resources (author)
        ├── inquiries (assigned_to)
        └── audit_logs

thematic_areas ──┬── interventions
                 ├── project_thematic_area ── projects
                 └── resource_thematic_area ── resources

projects ──┬── project_partner ── partners
           └── project_resource ── resources

resources ── resource_tag ── resource_tags

* ── seo_metadata (polymorphic)
```

## CMS-First Principle

All organizational content lives in the database. Frontend components receive props from Laravel controllers — never hard-code mission, stats, partners, or contact details.

## Security

- Mandatory 2FA for Super Admin and Admin roles
- Server-side authorization via Policies + Spatie permissions
- Rate limiting on public forms
- Audit logging for privileged actions
- CSRF, HttpOnly cookies, input validation, upload MIME validation

## Phases

1. ✅ Architecture, database, auth, RBAC
2. Design system, layout, navigation
3. Homepage + 3D hero
4. About, What We Do, Projects
5. Resources, search
6. Forms (contact, newsletter, get involved)
7. Admin CMS modules
8. Media, SEO, settings
9. Security hardening
10. Tests, performance, deployment
