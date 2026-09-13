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
    }
}
