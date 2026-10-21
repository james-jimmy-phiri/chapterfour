<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Seeder;

class SamplePagesAndTestimonialsSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::first();

        // 1. Seed Sample Pages
        if (Page::count() === 0) {
            Page::create([
                'title' => 'Strategic Plan 2024–2028: Advancing Constitutional Justice',
                'slug' => 'strategic-plan-2024-2028',
                'template' => 'policy',
                'excerpt' => 'Chapter Four multi-year strategic roadmap focusing on public interest litigation, grassroots civic accountability, and institutional oversight.',
                'body' => "## Executive Summary\n\nThe Chapter Four 2024–2028 Strategic Plan outlines our commitment to safeguarding civic space and defending the constitutional freedoms enshrined in Chapter IV of the Constitution.\n\n### Strategic Pillars\n\n1. **Strategic & Public Interest Litigation**: Providing pro-bono defense for indigent citizens and challenging unconstitutional statutory provisions in the High Court and Supreme Court.\n2. **Community Paralegal Empowerment**: Training rural community champions to resolve rights infringements and mediate disputes within customary frameworks.\n3. **Constitutional Research & Knowledge**: Conducting empirical studies on pre-trial detention, freedom of assembly, and judicial integrity.\n\n### Expected Outcomes by 2028\n\n- Over 25,000 citizens provided with free constitutional legal representation.\n- 500 accredited community paralegals operating across all 28 districts.\n- Annual release of the Constitutional Rights Monitor report.",
                'featured_image' => '/images/constitutional_book.jpg',
                'status' => 'published',
                'author_id' => $admin?->id,
                'published_at' => now(),
            ]);

            Page::create([
                'title' => 'Access to Legal Aid Charter',
                'slug' => 'access-to-legal-aid-charter',
                'template' => 'report',
                'excerpt' => 'Our service standard and institutional commitment to providing prompt, non-discriminatory legal counsel for indigent citizens and civil society leaders.',
                'body' => "## Chapter Four Legal Aid Service Commitment\n\nEvery person has the inherent right to a fair trial, access to legal representation, and dignity before the law.\n\n### Our Services Include:\n- Emergency legal hotline response for arbitrary arrests.\n- Bail applications and habeas corpus proceedings.\n- Legal advice for journalists, activists, and marginalized communities.\n- Referral services to statutory human rights commissions.\n\nTo report an emergency rights violation, contact our toll-free legal clinic hotline or submit an inquiry through our secure portal.",
                'featured_image' => '/images/hero/pexels-akoonie-10875242.jpg',
                'status' => 'published',
                'author_id' => $admin?->id,
                'published_at' => now(),
            ]);
        }

        // 2. Seed Sample Testimonials
        if (Testimonial::count() === 0) {
            Testimonial::create([
                'name' => 'Mary Chinkhunda',
                'role' => 'Community Rights Advocate',
                'organization' => 'Dedza Women\'s Assembly',
                'quote' => 'Chapter Four constitutional awareness clinics gave our rural women the courage to speak up against arbitrary land seizures. For the first time, our community leaders know our rights are protected by the highest law in the land.',
                'category' => 'community',
                'rating' => 5,
                'sort_order' => 1,
                'status' => 'published',
            ]);

            Testimonial::create([
                'name' => 'Counsel Patrick Mkandawire',
                'role' => 'Public Interest Litigator',
                'organization' => 'Civil Society Legal Network',
                'quote' => 'Collaborating with Chapter Four on strategic constitutional appeals has transformed access to justice. Their legal research and court interventions are among the most thorough and principled in Southern Africa.',
                'category' => 'partner',
                'rating' => 5,
                'sort_order' => 2,
                'status' => 'published',
            ]);

            Testimonial::create([
                'name' => 'Eliza Phiri',
                'role' => 'Beneficiary',
                'organization' => 'Lilongwe Rural Community',
                'quote' => 'When my family was threatened with unlawful eviction, the Chapter Four paralegal team intervened within 24 hours and represented us free of charge. They restored our dignity and our livelihood.',
                'category' => 'beneficiary',
                'rating' => 5,
                'sort_order' => 3,
                'status' => 'published',
            ]);
        }
    }
}
