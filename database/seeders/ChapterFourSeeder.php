<?php

namespace Database\Seeders;

use App\Models\ImpactStatistic;
use App\Models\Partner;
use App\Models\Resource;
use App\Models\ThematicArea;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ChapterFourSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@chapterfour.mw'],
            [
                'name' => 'Chapter Four Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // 2. Thematic Areas
        $thematicAreas = [
            [
                'title' => 'Human Rights & Constitutionalism',
                'slug' => 'human-rights',
                'short_description' => 'Safeguarding fundamental constitutional rights and advancing public interest litigation for Malawians.',
                'full_description' => 'Rooted in Chapter IV of the Malawi Constitution, we uphold civil liberties, freedom of speech, assembly, and dignity through legal vigilance.',
                'sort_order' => 1,
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Access to Justice & Legal Empowerment',
                'slug' => 'access-to-justice',
                'short_description' => 'Delivering mobile community legal aid, paralegal clinics, and bail advocacy for marginalized youth.',
                'full_description' => 'Connecting rural and vulnerable youth to legal remedies, court defense, and community paralegal services.',
                'sort_order' => 2,
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Democracy, Rule of Law & Governance',
                'slug' => 'democracy-governance',
                'short_description' => 'Strengthening democratic institutions, electoral integrity, anti-corruption, and executive accountability.',
                'full_description' => 'Monitoring electoral processes, holding duty-bearers accountable, and defending civic space.',
                'sort_order' => 3,
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Civic & Human Rights Education',
                'slug' => 'civic-education',
                'short_description' => 'Empowering communities and grassroots youth with practical knowledge of their rights under Chapter IV.',
                'full_description' => 'Conducting youth leadership clinics, community radio broadcasts, and rights sensitization sessions.',
                'sort_order' => 4,
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Policy & Legislative Advocacy',
                'slug' => 'policy-advocacy',
                'short_description' => 'Influencing laws, national budgets, and parliamentary oversight through evidence-based policy memos.',
                'full_description' => 'Engaging parliamentary committees, submitting legal memos, and drafting rights-compliant legislative reform bills.',
                'sort_order' => 5,
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Protection of Vulnerable Groups',
                'slug' => 'vulnerable-groups',
                'short_description' => 'Defending women, youth, persons with disabilities, and marginalized minorities against systemic injustice.',
                'full_description' => 'Providing targeted legal aid and advocacy against child exploitation, gender-based violence, and discrimination.',
                'sort_order' => 6,
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Social Accountability & Monitoring',
                'slug' => 'accountability',
                'short_description' => 'Tracking public service delivery, healthcare, education funds, and local council expenditures.',
                'full_description' => 'Empowering youth community scorecards, social audits, and tracking Constituency Development Funds (CDF).',
                'sort_order' => 7,
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Research & Knowledge Generation',
                'slug' => 'research',
                'short_description' => 'Publishing data-driven research papers, human rights barometers, and shadow reports for global forums.',
                'full_description' => 'Producing periodic Human Rights Barometer reports and empirical studies on civic space in Malawi.',
                'sort_order' => 8,
                'status' => 'published',
                'published_at' => now(),
            ],
        ];

        foreach ($thematicAreas as $area) {
            ThematicArea::updateOrCreate(['slug' => $area['slug']], $area);
        }

        // 3. Impact Statistics
        $stats = [
            [
                'label' => 'Youth Reached',
                'value' => '5000',
                'prefix' => '',
                'suffix' => '+',
                'description' => 'Empowered through grassroots civic education and mobile legal awareness clinics.',
                'icon' => 'Users',
                'sort_order' => 1,
                'status' => 'published',
            ],
            [
                'label' => 'Legal Interventions',
                'value' => '120',
                'prefix' => '',
                'suffix' => '+',
                'description' => 'Pro-bono legal cases, police detention visits, and bail support applications.',
                'icon' => 'Scale',
                'sort_order' => 2,
                'status' => 'published',
            ],
            [
                'label' => 'Districts Engaged',
                'value' => '28',
                'prefix' => '',
                'suffix' => '/28',
                'description' => 'Active youth focal networks and partner networks across all Malawi districts.',
                'icon' => 'Globe',
                'sort_order' => 3,
                'status' => 'published',
            ],
            [
                'label' => 'Civil Society Coalitions',
                'value' => '15',
                'prefix' => '',
                'suffix' => '+',
                'description' => 'National and regional coalitions co-convened on electoral and constitutional reform.',
                'icon' => 'Shield',
                'sort_order' => 4,
                'status' => 'published',
            ],
        ];

        foreach ($stats as $st) {
            ImpactStatistic::updateOrCreate(['label' => $st['label']], $st);
        }

        // 4. Sample Resources
        $resources = [
            [
                'title' => 'State of Constitutional Rights in Malawi: 2024 Youth Barometer',
                'slug' => 'state-of-constitutional-rights-2024',
                'type' => 'report',
                'excerpt' => 'A comprehensive national assessment of civil liberties, youth civic participation, and access to justice across all 28 districts.',
                'body' => 'Full report content assessing the implementation of Chapter IV rights in Malawi.',
                'status' => 'published',
                'is_featured' => true,
                'author_id' => $admin->id,
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Joint Statement on Proposed Amendments to the NGO Act',
                'slug' => 'joint-statement-ngo-act',
                'type' => 'press_release',
                'excerpt' => 'Chapter Four alongside civil society partners urge parliament to uphold freedom of association and civic space.',
                'body' => 'Official press release on civic space protection.',
                'status' => 'published',
                'is_featured' => false,
                'author_id' => $admin->id,
                'published_at' => now()->subDays(12),
            ],
            [
                'title' => 'Community Paralegal Handbook: Navigating Bail and Police Custody',
                'slug' => 'community-paralegal-handbook',
                'type' => 'publication',
                'excerpt' => 'A practical, simplified guide for grassroots paralegals and human rights defenders defending accused youth.',
                'body' => 'Handbook guide for paralegals.',
                'status' => 'published',
                'is_featured' => false,
                'author_id' => $admin->id,
                'published_at' => now()->subDays(20),
            ],
        ];

        foreach ($resources as $res) {
            Resource::updateOrCreate(['slug' => $res['slug']], $res);
        }

        // 5. Spatie Roles & Permissions
        $roles = ['super-admin', 'admin', 'editor', 'contributor'];
        foreach ($roles as $roleName) {
            \Spatie\Permission\Models\Role::firstOrCreate(['name' => $roleName, 'guard_name' => 'web']);
        }

        if (!$admin->hasRole('super-admin')) {
            $admin->assignRole('super-admin');
        }

        // 6. Sample Projects
        $projects = [
            [
                'title' => 'Mobile Legal Defense Clinics for Rural Youth',
                'slug' => 'mobile-legal-defense-clinics',
                'summary' => 'Deploying traveling legal clinics to police stations and community courts to provide immediate representation.',
                'description' => 'A frontline legal empowerment project providing immediate legal consultation, bail applications, and constitutional education to accused young people across rural districts in Malawi.',
                'status' => 'published',
                'locations' => ['Lilongwe Rural', 'Dowa', 'Salima', 'Dedza'],
                'beneficiaries' => ['Detained Youth', 'Vulnerable Families', 'Community Paralegals'],
                'published_at' => now()->subMonths(2),
            ],
            [
                'title' => 'Youth Constitutional Literacy & Chapter IV Assemblies',
                'slug' => 'youth-constitutional-literacy',
                'summary' => 'Grassroots civic education assemblies training 1,000+ youth leaders on their Bill of Rights guarantees.',
                'description' => 'Training community youth leaders, student unions, and community radio broadcasters to translate constitutional protections into actionable grassroots civic monitoring.',
                'status' => 'published',
                'locations' => ['Blantyre', 'Zomba', 'Mangochi', 'Thyolo'],
                'beneficiaries' => ['Youth Leaders', 'Student Associations', 'Community Radio Journalists'],
                'published_at' => now()->subMonths(1),
            ],
        ];

        foreach ($projects as $proj) {
            \App\Models\Project::updateOrCreate(['slug' => $proj['slug']], $proj);
        }

        // 7. Sample Inquiries
        $inquiries = [
            [
                'name' => 'Kondwani Phiri',
                'email' => 'kondwani@example.com',
                'phone' => '+265 999 123 456',
                'type' => 'Legal Aid & Rights Defense',
                'subject' => 'Urgent: Unlawful police detention in Kasungu',
                'message' => 'A group of three community youth leaders have been held beyond the 48-hour constitutional limit without formal charge. We urgently request paralegal intervention.',
                'status' => \App\Enums\InquiryStatus::New,
                'ip_address' => '127.0.0.1',
                'created_at' => now()->subHours(3),
            ],
            [
                'name' => 'Grace Mwale',
                'email' => 'grace.mwale@civic-mw.org',
                'phone' => '+265 888 654 321',
                'type' => 'Partnership & Funding',
                'subject' => 'Joint submission on Electoral Law Reforms',
                'message' => 'Our civil society coalition is organizing a parliamentary position paper on youth voter participation. We would like Chapter Four to co-author the section on Chapter IV rights.',
                'status' => \App\Enums\InquiryStatus::InProgress,
                'internal_notes' => 'Executive Director contacted Grace on WhatsApp. Drafting scheduled for next Monday.',
                'ip_address' => '127.0.0.1',
                'created_at' => now()->subDays(1),
            ],
            [
                'name' => 'Tiwonge Banda',
                'email' => 'tiwonge@unima.ac.mw',
                'phone' => '+265 991 112 233',
                'type' => 'Youth Volunteering',
                'subject' => 'Paralegal volunteering application - UNIMA Law Faculty',
                'message' => 'I am a final year law student at the University of Malawi interested in joining the weekend mobile legal aid clinics.',
                'status' => \App\Enums\InquiryStatus::Resolved,
                'internal_notes' => 'Approved. Connected with Lead Counsel for orientation.',
                'ip_address' => '127.0.0.1',
                'created_at' => now()->subDays(3),
            ],
        ];

        foreach ($inquiries as $inq) {
            \App\Models\Inquiry::updateOrCreate(['subject' => $inq['subject']], $inq);
        }

        // 8. Sample Newsletter Subscribers
        $subscribers = [
            ['email' => 'advocate.chisale@justice.mw', 'status' => 'subscribed', 'source' => 'footer', 'consented_at' => now()->subDays(10)],
            ['email' => 'editor@nyasatimes.com', 'status' => 'subscribed', 'source' => 'homepage', 'consented_at' => now()->subDays(8)],
            ['email' => 'malawi.youth.hub@gmail.com', 'status' => 'subscribed', 'source' => 'footer', 'consented_at' => now()->subDays(4)],
            ['email' => 'researcher@chrr.org.mw', 'status' => 'subscribed', 'source' => 'resources', 'consented_at' => now()->subDays(2)],
        ];

        foreach ($subscribers as $sub) {
            \App\Models\NewsletterSubscriber::updateOrCreate(['email' => $sub['email']], $sub);
        }

        // 9. Initial Audit Logs
        \App\Models\AuditLog::create([
            'user_id' => $admin->id,
            'action' => 'published',
            'entity_type' => 'Resource',
            'entity_id' => 1,
            'properties' => ['title' => 'State of Constitutional Rights in Malawi: 2024 Youth Barometer'],
            'ip_address' => '127.0.0.1',
            'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        ]);
        \App\Models\AuditLog::create([
            'user_id' => $admin->id,
            'action' => 'updated',
            'entity_type' => 'ThematicArea',
            'entity_id' => 1,
            'properties' => ['slug' => 'human-rights'],
            'ip_address' => '127.0.0.1',
            'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        ]);

        // 10. Partners & Coalitions
        $partners = [
            [
                'name' => 'Malawi Human Rights Commission',
                'slug' => 'malawi-human-rights-commission',
                'category' => 'statutory_body',
                'description' => 'The national independent constitutional body mandated to protect and investigate human rights violations.',
                'website' => 'https://mhrc.mw',
                'status' => 'published',
                'sort_order' => 1,
            ],
            [
                'name' => 'Legal Aid Bureau of Malawi',
                'slug' => 'legal-aid-bureau',
                'category' => 'statutory_body',
                'description' => 'Government statutory bureau collaborating with paralegals on rural defense and bail applications.',
                'website' => 'https://legalaid.gov.mw',
                'status' => 'published',
                'sort_order' => 2,
            ],
            [
                'name' => 'Youth and Society (YAS)',
                'slug' => 'youth-and-society',
                'category' => 'civil_society',
                'description' => 'A premier Malawian youth civic empowerment and democratic governance alliance partner.',
                'website' => 'https://yasmalawi.org',
                'status' => 'published',
                'sort_order' => 3,
            ],
            [
                'name' => 'Centre for Human Rights & Rehabilitation',
                'slug' => 'chrr-malawi',
                'category' => 'civil_society',
                'description' => 'Leading frontline advocacy organisation defending civic space and human rights defenders.',
                'website' => 'https://chrrmalawi.org',
                'status' => 'published',
                'sort_order' => 4,
            ],
            [
                'name' => 'University of Malawi - Faculty of Law',
                'slug' => 'unima-law',
                'category' => 'academia',
                'description' => 'Collaborating on student paralegal clinical programs and constitutional research jurisprudence.',
                'website' => 'https://law.unima.ac.mw',
                'status' => 'published',
                'sort_order' => 5,
            ],
        ];

        foreach ($partners as $partner) {
            \App\Models\Partner::updateOrCreate(['slug' => $partner['slug']], $partner);
        }

        // 11. Team Members
        $team = [
            [
                'name' => 'Kondwani Nkhoma',
                'role' => 'Executive Director & Lead Advocate',
                'department' => 'Secretariat Leadership',
                'category' => 'staff',
                'biography' => 'Constitutional lawyer and youth civil society leader with over 8 years of public interest litigation and grassroots human rights defense experience across Malawi.',
                'sort_order' => 1,
                'status' => 'published',
            ],
            [
                'name' => 'Chikondi Banda, LLB',
                'role' => 'Head of Legal Aid & Constitutional Defense',
                'department' => 'Legal Defense',
                'category' => 'staff',
                'biography' => 'Specializes in criminal justice reform, unlawful detention response, and managing Chapter Four traveling paralegal legal defense units.',
                'sort_order' => 2,
                'status' => 'published',
            ],
            [
                'name' => 'Thokozani Phiri',
                'role' => 'Director of Research & Civic Education',
                'department' => 'Research & Policy',
                'category' => 'staff',
                'biography' => 'Policy analyst dedicated to authoring the annual Youth Barometer on Chapter IV rights and coordinating citizen scorecards in rural district councils.',
                'sort_order' => 3,
                'status' => 'published',
            ],
            [
                'name' => 'Dr. Mary Mkandawire',
                'role' => 'Chairperson of the Board of Trustees',
                'department' => 'Governance Board',
                'category' => 'board',
                'biography' => 'Senior lecturer in public law, constitutionalism advisor to civil society coalitions, and prominent Malawian gender justice champion.',
                'sort_order' => 4,
                'status' => 'published',
            ],
        ];

        foreach ($team as $member) {
            \App\Models\TeamMember::updateOrCreate(['name' => $member['name']], $member);
        }

        // 12. Site Settings Defaults
        $settings = [
            'org_name' => 'Chapter Four Malawi',
            'tagline' => 'Rights. Justice. Dignity. For Everyone.',
            'contact_email' => 'info@chapterfour.mw',
            'contact_phone' => '+265 (0) 1 770 000',
            'office_address' => 'City Centre / Area 10, Lilongwe, Malawi',
            'emergency_helpline' => '+265 999 000 111',
            'hours' => 'Monday – Friday: 08:00 – 17:00 CAT',
            'twitter_url' => 'https://twitter.com/chapterfour_mw',
            'facebook_url' => 'https://facebook.com/chapterfourmw',
            'linkedin_url' => 'https://linkedin.com/company/chapterfourmw',
            'instagram_url' => 'https://instagram.com/chapterfourmw',
            'mission' => 'To promote and protect constitutional rights, strengthen access to justice, empower citizens, and contribute to accountable governance in Malawi.',
            'vision' => 'A just, democratic and inclusive Malawi where the rights and freedoms guaranteed by the Constitution are respected, protected and enjoyed by all.',
        ];

        foreach ($settings as $k => $v) {
            \App\Models\SiteSetting::updateOrCreate(['key' => $k], ['value' => $v, 'group' => 'general']);
        }
    }
}
