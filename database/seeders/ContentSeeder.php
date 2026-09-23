<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HeroSlide;
use App\Models\ImpactStatistic;
use App\Models\ThematicArea;
use App\Models\TeamMember;
use App\Models\Partner;
use App\Models\BeneficiaryGroup;
use App\Models\Intervention;
use App\Models\TimelineEvent;
use App\Models\HrbaPrinciple;
use App\Models\Vacancy;
use App\Models\SiteSetting;
use Illuminate\Support\Str;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedSiteSettings();
        $this->seedHeroSlides();
        $this->seedImpactStatistics();
        $this->seedThematicAreas();
        $this->seedInterventions();
        $this->seedBeneficiaryGroups();
        $this->seedTeamMembers();
        $this->seedPartners();
        $this->seedTimelineEvents();
        $this->seedHrbaPrinciples();
        $this->seedVacancies();
    }

    // ─── SITE SETTINGS ────────────────────────────────────────────────────────

    private function seedSiteSettings(): void
    {
        $settings = [
            ['key' => 'org_name',           'value' => 'Chapter Four Malawi',    'group' => 'general'],
            ['key' => 'tagline',            'value' => 'Rights. Justice. Dignity. For Everyone.', 'group' => 'general'],
            ['key' => 'contact_email',      'value' => 'info@chapterfour.mw',    'group' => 'contact'],
            ['key' => 'contact_phone',      'value' => '+265 (0) 1 770 000',     'group' => 'contact'],
            ['key' => 'office_address',     'value' => 'Lilongwe, Area 10 / City Centre, Malawi', 'group' => 'contact'],
            ['key' => 'hours',              'value' => 'Monday – Friday: 08:00 – 17:00 CAT', 'group' => 'contact'],
            ['key' => 'emergency_helpline', 'value' => '+265 999 000 111',        'group' => 'contact'],
            ['key' => 'twitter_url',        'value' => 'https://twitter.com/chapterfour_mw',      'group' => 'social'],
            ['key' => 'facebook_url',       'value' => 'https://facebook.com/chapterfourmw',      'group' => 'social'],
            ['key' => 'linkedin_url',       'value' => 'https://linkedin.com/company/chapterfourmw', 'group' => 'social'],
            ['key' => 'instagram_url',      'value' => 'https://instagram.com/chapterfourmw',     'group' => 'social'],
            ['key' => 'mission', 'value' => 'To promote and protect constitutional rights, strengthen access to justice, empower citizens, and contribute to accountable, democratic and rights-respecting governance.', 'group' => 'mission'],
            ['key' => 'vision',  'value' => 'A just, democratic and inclusive Malawi where the rights and freedoms guaranteed by the Constitution are respected, protected and enjoyed by all.', 'group' => 'mission'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::updateOrCreate(
                ['key' => $setting['key']],
                ['value' => $setting['value'], 'group' => $setting['group'], 'type' => 'string']
            );
        }
    }

    // ─── HERO SLIDES ──────────────────────────────────────────────────────────

    private function seedHeroSlides(): void
    {
        if (HeroSlide::count() > 0) return;

        $slides = [
            [
                'word'         => 'human rights,',
                'bg_image'     => '/images/hero-bg.jpg',
                'right_image'  => '/images/child-hero.png',
                'right_alt'    => 'Child supported by Chapter Four public interest legal aid and child protection',
                'accent_label' => 'Human Rights & Constitutionalism',
                'sort_order'   => 1,
            ],
            [
                'word'         => 'constitutionalism,',
                'bg_image'     => '/images/hero/pexels-akoonie-10875242.jpg',
                'right_image'  => '/images/hero/smiling-african-mother-with-child-in-traditional-attire-on-transparent-background-png.png',
                'right_alt'    => 'Families and communities empowered by constitutional rights advocacy',
                'accent_label' => 'Constitutional Supremacy',
                'sort_order'   => 2,
            ],
            [
                'word'         => 'access to justice,',
                'bg_image'     => '/images/hero/pexels-dsd-143941-1502311.jpg',
                'right_image'  => '/images/child-hero.png',
                'right_alt'    => 'Grassroots citizens gaining access to pro-bono legal defense',
                'accent_label' => 'Access to Justice & Legal Aid',
                'sort_order'   => 3,
            ],
            [
                'word'         => 'accountable democracy,',
                'bg_image'     => '/images/hero/pexels-safari-consoler-3290243-26769827.jpg',
                'right_image'  => '/images/hero/ai-generated-poor-little-african-child-transparent-background-free-png.png',
                'right_alt'    => 'Empowering future generations through civic monitoring and integrity',
                'accent_label' => 'Democracy & Good Governance',
                'sort_order'   => 4,
            ],
        ];

        foreach ($slides as $slide) {
            HeroSlide::create(array_merge($slide, ['status' => 'published']));
        }
    }

    // ─── IMPACT STATISTICS ────────────────────────────────────────────────────

    private function seedImpactStatistics(): void
    {
        if (ImpactStatistic::count() > 0) return;

        $stats = [
            ['label' => 'Citizens Reached',             'value' => '45000', 'suffix' => '+', 'description' => 'Across all 28 districts through legal empowerment and civic outreach', 'sort_order' => 1],
            ['label' => 'Legal Cases Supported',        'value' => '1240',  'suffix' => '',  'description' => 'Pro-bono legal defense, mediation, and constitutional petitions',      'sort_order' => 2],
            ['label' => 'Community Paralegals',         'value' => '380',   'suffix' => '+', 'description' => 'Trained and deployed to provide grassroots legal triage and advice',   'sort_order' => 3],
            ['label' => 'Advocacy Reports & Briefs',    'value' => '65',    'suffix' => '+', 'description' => 'In-depth research publications informing policy and judicial discourse', 'sort_order' => 4],
        ];

        foreach ($stats as $stat) {
            ImpactStatistic::create(array_merge($stat, ['status' => 'published']));
        }
    }

    // ─── THEMATIC AREAS ───────────────────────────────────────────────────────

    private function seedThematicAreas(): void
    {
        if (ThematicArea::count() > 0) return;

        $areas = [
            [
                'title'             => 'Human Rights & Constitutionalism',
                'slug'              => 'human-rights',
                'short_description' => 'Safeguarding civil liberties, fundamental freedoms, and constitutional supremacy under Chapter IV of the Malawi Constitution.',
                'full_description'  => 'We work to ensure that the constitutional guarantees of human rights are upheld in practice, through strategic litigation, monitoring, and civic empowerment.',
                'icon'              => 'shield',
                'sort_order'        => 1,
            ],
            [
                'title'             => 'Access to Justice & Legal Aid',
                'slug'              => 'access-to-justice',
                'short_description' => 'Empowering underprivileged communities and vulnerable groups to navigate justice institutions and seek effective redress.',
                'full_description'  => 'We bridge the justice gap by deploying community paralegals, running mobile legal aid clinics, and supporting public interest litigation.',
                'icon'              => 'scale',
                'sort_order'        => 2,
            ],
            [
                'title'             => 'Democracy & Good Governance',
                'slug'              => 'democracy-governance',
                'short_description' => 'Promoting transparent, participatory, and responsive governance while strengthening citizens in democratic processes.',
                'full_description'  => 'We monitor elections, engage duty bearers, and build civil society capacity to hold public institutions accountable.',
                'icon'              => 'globe',
                'sort_order'        => 3,
            ],
            [
                'title'             => 'Civic & Rights Education',
                'slug'              => 'civic-education',
                'short_description' => 'Equipping grassroots citizens, youth, and duty bearers with legal literacy to claim rights and demand accountability.',
                'full_description'  => 'Through community dialogues, radio programmes, and school clubs, we build a culture of rights awareness from the ground up.',
                'icon'              => 'book-open',
                'sort_order'        => 4,
            ],
            [
                'title'             => 'Policy & Legislative Advocacy',
                'slug'              => 'policy-advocacy',
                'short_description' => 'Rigorous legal analysis and strategic litigation advocating for laws that comply with constitutional standards.',
                'full_description'  => 'We produce policy briefs, engage Parliament, and submit to international human rights mechanisms to drive law reform.',
                'icon'              => 'file-text',
                'sort_order'        => 5,
            ],
            [
                'title'             => 'Protection of Vulnerable Groups',
                'slug'              => 'vulnerable-groups',
                'short_description' => 'Defending the rights of women, children, persons with disabilities, and marginalized communities against systemic discrimination.',
                'full_description'  => 'We run targeted programmes addressing gender-based violence, child protection, disability rights, and refugee protection.',
                'icon'              => 'heart',
                'sort_order'        => 6,
            ],
        ];

        foreach ($areas as $area) {
            ThematicArea::create(array_merge($area, ['status' => 'published']));
        }
    }

    // ─── INTERVENTIONS ────────────────────────────────────────────────────────

    private function seedInterventions(): void
    {
        if (Intervention::count() > 0) return;

        $interventions = [
            [
                'title'       => 'Constitutional & Human Rights Education',
                'short_title' => 'Rights Education',
                'description' => 'We deliver structured rights education across communities, schools, police posts, courts, and local government offices — building a culture of constitutional awareness from the grassroots up.',
                'examples'    => [
                    'Community human rights awareness dialogues',
                    'School-based human rights clubs and youth assemblies',
                    'Simplified constitutional guides in local languages',
                    'Radio civic education programmes and jingles',
                ],
                'image'       => '/images/constitutional_book.jpg',
                'icon'        => 'BookOpen',
                'sort_order'  => 1,
            ],
            [
                'title'       => 'Legal Aid & Access to Justice Support',
                'short_title' => 'Legal Aid',
                'description' => 'We bridge the access-to-justice gap by providing community legal awareness, training paralegals, facilitating referrals to formal legal aid, and supporting strategic public interest litigation before competent courts.',
                'examples'    => [
                    'Mobile legal aid clinics at magistrate courts',
                    'Community paralegal training and deployment',
                    'Bail assistance and detention monitoring',
                    'Strategic public interest litigation support',
                ],
                'image'       => '/images/Chief_Justice.jpg',
                'icon'        => 'Gavel',
                'sort_order'  => 2,
            ],
            [
                'title'       => 'Human Rights Monitoring & Documentation',
                'short_title' => 'Monitoring',
                'description' => 'We systematically monitor, document, and report human rights violations — generating credible evidence that informs advocacy, litigation, and policy reform at national and international levels.',
                'examples'    => [
                    'Police facility and detention monitoring visits',
                    'Annual human rights situation reports',
                    'Shadow reports to UN treaty bodies',
                    'Digital case documentation databases',
                ],
                'image'       => '/images/no_justice.jpg',
                'icon'        => 'Search',
                'sort_order'  => 3,
            ],
            [
                'title'       => 'Strategic Advocacy & Policy Engagement',
                'short_title' => 'Advocacy',
                'description' => 'We translate research evidence into targeted advocacy — engaging Parliament, line ministries, regulatory bodies, and international human rights mechanisms to promote laws and policies that uphold constitutional standards.',
                'examples'    => [
                    'Parliamentary submissions and legislative reviews',
                    'Policy briefs and position papers',
                    'Public dialogues with lawmakers and duty bearers',
                    'Universal Periodic Review shadow reporting',
                ],
                'image'       => '/images/Parliament_Building_of_Malawioutside.jpg',
                'icon'        => 'Megaphone',
                'sort_order'  => 4,
            ],
            [
                'title'       => 'Civic Education & Democratic Participation',
                'short_title' => 'Civic Education',
                'description' => 'We promote active citizenship and democratic participation — equipping communities, especially youth and women, to meaningfully engage in electoral, civic, and governance processes.',
                'examples'    => [
                    'Voter and civic education campaigns',
                    'Youth democracy forums and mock parliaments',
                    "Women's leadership and civic engagement training",
                    'Local government accountability dialogues',
                ],
                'image'       => '/images/animate-img-1.jpg',
                'icon'        => 'Users',
                'sort_order'  => 5,
            ],
            [
                'title'       => 'Protection of Vulnerable & Marginalized Groups',
                'short_title' => 'Vulnerable Groups',
                'description' => 'We run targeted programmes to address the compounded human rights challenges facing women, children, persons with disabilities, albinism, refugees, and other marginalized communities.',
                'examples'    => [
                    'GBV legal support and case referral pathways',
                    'Child protection and anti-child marriage campaigns',
                    'Disability and albinism rights advocacy',
                    'Refugee and displaced persons legal orientation',
                ],
                'image'       => '/images/woman.jpg',
                'icon'        => 'HeartHandshake',
                'sort_order'  => 6,
            ],
            [
                'title'       => 'Peace Building & Social Cohesion',
                'short_title' => 'Peace Building',
                'description' => 'We facilitate community dialogue, conflict prevention, and reconciliation processes — building peaceful, tolerant, and socially cohesive communities capable of resolving disputes through constitutional and non-violent means.',
                'examples'    => [
                    'Community conflict mediation and dialogue facilitation',
                    'Peace and tolerance education workshops',
                    'Community-based early warning and response structures',
                    'Campaigns promoting peaceful civic participation',
                ],
                'image'       => '/images/Tithetse.jpg',
                'icon'        => 'Globe',
                'sort_order'  => 7,
            ],
            [
                'title'       => 'Capacity Building for Communities & Duty Bearers',
                'short_title' => 'Capacity Building',
                'description' => 'We invest in durable human capacity — training community leaders, civil society organizations, government officials, law enforcement, and justice institutions in human rights standards and their practical application.',
                'examples'    => [
                    'Human rights training for law enforcement officers',
                    'CSO capacity building in governance and advocacy',
                    'Community leader sensitization on rights obligations',
                    'Training of duty bearers on international human rights standards',
                ],
                'image'       => '/images/animate-img-2.jpg',
                'icon'        => 'Shield',
                'sort_order'  => 8,
            ],
            [
                'title'       => 'Research & Knowledge Generation',
                'short_title' => 'Research',
                'description' => 'We produce rigorous, evidence-based research, policy analysis, and publications that strengthen the credibility of our advocacy, inform programme design, and contribute to Malawi\'s human rights knowledge base.',
                'examples'    => [
                    'Baseline surveys and thematic field research',
                    'Constitutional jurisprudence analysis papers',
                    'Policy briefs and legislative reform recommendations',
                    'Knowledge products for civil society and duty bearers',
                ],
                'image'       => '/images/legal_books.webp',
                'icon'        => 'Network',
                'sort_order'  => 9,
            ],
            [
                'title'       => 'Stakeholder Consultations & Partnership Building',
                'short_title' => 'Partnerships',
                'description' => 'We actively develop strategic partnerships and networks — convening multi-stakeholder dialogues, coordinating with civil society, government, academia, development partners, and international human rights bodies.',
                'examples'    => [
                    'Multi-stakeholder human rights dialogues',
                    'CSO coalition building and coordination',
                    'Joint advocacy campaigns with partner organizations',
                    'International and regional human rights body engagement',
                ],
                'image'       => '/images/iStock-1369137588.jpg',
                'icon'        => 'Handshake',
                'sort_order'  => 10,
            ],
        ];

        foreach ($interventions as $item) {
            Intervention::create(array_merge($item, ['status' => 'published']));
        }
    }

    // ─── BENEFICIARY GROUPS ───────────────────────────────────────────────────

    private function seedBeneficiaryGroups(): void
    {
        if (BeneficiaryGroup::count() > 0) return;

        $groups = [
            ['name' => 'Women and Girls',                   'description' => 'Empowering women and girls to claim their rights and challenging discriminatory practices.',                    'icon' => 'HeartHandshake', 'sort_order' => 1],
            ['name' => 'Children and Young People',         'description' => 'Protecting the rights of the next generation and promoting youth participation.',                              'icon' => 'Baby',           'sort_order' => 2],
            ['name' => 'Persons with Disabilities',         'description' => 'Advocating for inclusive policies and equal access to justice and services.',                                  'icon' => 'Accessibility',  'sort_order' => 3],
            ['name' => 'Refugees and Displaced Persons',    'description' => 'Ensuring protection and rights for those forced to flee their homes.',                                         'icon' => 'Tent',           'sort_order' => 4],
            ['name' => 'Rural and Disadvantaged Communities','description' => 'Bridging the justice gap for economically marginalized populations.',                                         'icon' => 'TreePine',       'sort_order' => 5],
            ['name' => 'Survivors of Human Rights Violations','description' => 'Providing legal support and seeking redress for victims of abuse.',                                         'icon' => 'Users',          'sort_order' => 6],
        ];

        foreach ($groups as $group) {
            BeneficiaryGroup::create(array_merge($group, ['status' => 'published']));
        }
    }

    // ─── TEAM MEMBERS ─────────────────────────────────────────────────────────

    private function seedTeamMembers(): void
    {
        if (TeamMember::count() > 0) return;

        $members = [
            // Secretariat Staff
            [
                'name'       => 'Tuntufye Simwimba',
                'role'       => 'Programs Coordinator',
                'department' => 'Programs',
                'category'   => 'staff',
                'biography'  => 'Constitutional legal advocate leading strategic human rights programs, grassroots paralegal deployments, and public interest litigation.',
                'photo'      => '/images/animate-img-4.jpg',
                'sort_order' => 1,
            ],
            [
                'name'       => 'Monica Ndalama',
                'role'       => 'Project Officer (Human Rights)',
                'department' => 'Human Rights',
                'category'   => 'staff',
                'biography'  => 'Specialist in human rights monitoring, community civic literacy, and defending civic space freedoms in regional jurisdictions.',
                'photo'      => '/images/animate-img-5.jpg',
                'sort_order' => 2,
            ],
            [
                'name'       => 'Frackson Makangwala',
                'role'       => 'Monitoring & Evidence Lead',
                'department' => 'Research & Evidence',
                'category'   => 'staff',
                'biography'  => 'Statistician and empirical researcher analyzing justice indicators, detention metrics, and institutional accountability data.',
                'photo'      => '/images/animate-img-6.jpg',
                'sort_order' => 3,
            ],
            // Board of Trustees
            [
                'name'       => 'Board Chairperson',
                'role'       => 'Chairperson',
                'department' => 'Board of Trustees',
                'category'   => 'board',
                'biography'  => 'Experienced legal professional guiding the strategic direction of Chapter Four.',
                'photo'      => '/images/animate-img-4.jpg',
                'sort_order' => 1,
            ],
            [
                'name'       => 'Board Vice Chairperson',
                'role'       => 'Vice Chairperson',
                'department' => 'Board of Trustees',
                'category'   => 'board',
                'biography'  => 'Advocate for human rights and constitutionalism with over 20 years of experience.',
                'photo'      => '/images/animate-img-5.jpg',
                'sort_order' => 2,
            ],
            [
                'name'       => 'Board Treasurer',
                'role'       => 'Treasurer',
                'department' => 'Board of Trustees',
                'category'   => 'board',
                'biography'  => 'Ensuring financial accountability and transparency in all our operations.',
                'photo'      => '/images/animate-img-6.jpg',
                'sort_order' => 3,
            ],
        ];

        foreach ($members as $member) {
            TeamMember::create(array_merge($member, ['status' => 'published']));
        }
    }

    // ─── PARTNERS ─────────────────────────────────────────────────────────────

    private function seedPartners(): void
    {
        if (Partner::count() > 0) return;

        $partners = [
            ['name' => 'UNDP Malawi',             'slug' => 'undp-malawi',             'category' => 'international', 'description' => 'United Nations Development Programme supporting democratic governance.', 'website' => 'https://www.undp.org', 'sort_order' => 1],
            ['name' => 'Open Society Foundations', 'slug' => 'open-society-foundations','category' => 'international', 'description' => 'Supporting justice and accountability across Africa.',                  'website' => 'https://www.opensocietyfoundations.org', 'sort_order' => 2],
            ['name' => 'EU Delegation Malawi',    'slug' => 'eu-delegation-malawi',    'category' => 'government',    'description' => 'European Union partnership for rule of law and human rights.',          'website' => 'https://www.eeas.europa.eu', 'sort_order' => 3],
            ['name' => 'USAID',                   'slug' => 'usaid',                   'category' => 'international', 'description' => 'U.S. Agency for International Development supporting civil society.',    'website' => 'https://www.usaid.gov', 'sort_order' => 4],
            ['name' => 'Malawi Human Rights Commission','slug' => 'mhrc',              'category' => 'government',    'description' => 'Independent national human rights institution.',                       'website' => 'https://www.mhrcmalawi.org', 'sort_order' => 5],
            ['name' => 'CHRR',                    'slug' => 'chrr',                    'category' => 'civil_society', 'description' => 'Centre for Human Rights and Rehabilitation.',                          'website' => 'https://www.chrrmalawi.org', 'sort_order' => 6],
        ];

        foreach ($partners as $partner) {
            Partner::create(array_merge($partner, ['status' => 'published']));
        }
    }

    // ─── TIMELINE EVENTS ─────────────────────────────────────────────────────

    private function seedTimelineEvents(): void
    {
        if (TimelineEvent::count() > 0) return;

        $events = [
            ['year' => '2015', 'title' => 'Chapter Four Founded',          'description' => 'Established as a youth-led organization to advance constitutionalism and human rights in Malawi.',           'sort_order' => 1],
            ['year' => '2016', 'title' => 'First Legal Clinics Launched',  'description' => 'Launched community-based legal aid clinics in rural districts, reaching over 500 citizens in the first year.','sort_order' => 2],
            ['year' => '2018', 'title' => 'Paralegal Network Expanded',    'description' => 'Trained and deployed 100+ community paralegals across 10 districts to provide grassroots legal triage.',       'sort_order' => 3],
            ['year' => '2019', 'title' => 'First Constitutional Petition', 'description' => 'Filed a landmark constitutional petition challenging unlawful detention practices in police custody.',          'sort_order' => 4],
            ['year' => '2020', 'title' => 'COVID-19 Rights Response',      'description' => 'Led advocacy for rights-compliant COVID-19 responses, monitoring detentions and lockdown enforcement.',        'sort_order' => 5],
            ['year' => '2022', 'title' => '45,000 Citizens Reached',       'description' => 'Surpassed 45,000 citizens reached across all 28 districts through legal empowerment programmes.',             'sort_order' => 6],
            ['year' => '2024', 'title' => 'National HRDs Symposium',       'description' => 'Convened the first national symposium for Human Rights Defenders in Malawi.',                                   'sort_order' => 7],
        ];

        foreach ($events as $event) {
            TimelineEvent::create(array_merge($event, ['status' => 'published']));
        }
    }

    // ─── HRBA PRINCIPLES ─────────────────────────────────────────────────────

    private function seedHrbaPrinciples(): void
    {
        if (HrbaPrinciple::count() > 0) return;

        $principles = [
            ['title' => 'Participation',       'description' => 'All people have the right to participate in decisions affecting their lives. We ensure inclusive engagement in all our programmes.', 'icon' => 'Users',       'sort_order' => 1],
            ['title' => 'Accountability',      'description' => 'Duty bearers are held accountable for upholding human rights obligations. We monitor and document failures and successes.',         'icon' => 'Shield',      'sort_order' => 2],
            ['title' => 'Non-Discrimination',  'description' => 'We actively identify and address discrimination, prioritizing those facing multiple and intersecting forms of marginalization.',     'icon' => 'Scale',       'sort_order' => 3],
            ['title' => 'Transparency',        'description' => 'We promote open, accessible information sharing between rights holders and duty bearers to build trust and informed decision-making.','icon' => 'Eye',        'sort_order' => 4],
            ['title' => 'Human Dignity',       'description' => 'Every person has inherent dignity that must be respected and upheld by all institutions and actors in society.',                    'icon' => 'Heart',       'sort_order' => 5],
            ['title' => 'Empowerment',         'description' => 'Rights holders must be equipped with the knowledge, skills, and support to claim their rights and participate in civic life.',     'icon' => 'Zap',         'sort_order' => 6],
        ];

        foreach ($principles as $principle) {
            HrbaPrinciple::create(array_merge($principle, ['status' => 'published']));
        }
    }

    // ─── VACANCIES ────────────────────────────────────────────────────────────

    private function seedVacancies(): void
    {
        if (Vacancy::count() > 0) return;

        Vacancy::create([
            'title'             => 'Request For Proposals (RFP) – Provision Of Event Planning, Management And Decoration Services',
            'slug'              => Str::slug('Request For Proposals RFP Provision Of Event Planning Management And Decoration Services'),
            'department'        => 'Operations & Procurement',
            'location'          => 'Lilongwe, Malawi',
            'type'              => 'Consultancy',
            'tag'               => 'RFP',
            'organization'      => 'Chapter Four Malawi',
            'description'       => 'Chapter Four Malawi is a non-governmental organization committed to advancing constitutionalism, social justice, and human rights through strategic public interest litigation, research, and community empowerment. Chapter Four invites qualified, experienced, and reputable event planning and management service providers to submit proposals for our upcoming flagship symposia and national dialogue conferences.',
            'scope_intro'       => 'The successful bidder shall provide comprehensive event planning, management, coordination, and decoration services, including but not limited to:',
            'scope_sections'    => [
                [
                    'title' => 'Event Planning and Management',
                    'items' => [
                        'Event planning and coordination from inception through to completion.',
                        'Development of detailed event plans, timelines, and implementation schedules.',
                        'Coordination with Chapter Four leadership, relevant stakeholders, service providers, and event participants.',
                        'Venue identification, assessment, setup, and coordination, where required.',
                        'Coordination and supervision of suppliers and other third-party service providers.',
                        'Management and coordination of event setup, rehearsal, and breakdown.',
                        'On-site event management and troubleshooting throughout the event duration.',
                    ],
                ],
                [
                    'title' => 'Event Decoration and Branding',
                    'items' => [
                        'Development of a suitable event decoration and styling concept in consultation with Chapter Four.',
                        'Provision and installation of appropriate décor, including backdrops, stage décor, table décor, centrepieces, and ceremonial elements as required.',
                        'Event branding and visual presentation, including branded backdrops, banners, and digital signage where applicable.',
                        'Provision of executive tables, chairs, linen, and other décor-related materials where required.',
                        'Decoration and arrangement of the venue in line with the approved human rights conference theme.',
                        'Timely setup and dismantling of all décor and branding materials after the event.',
                        'Ensuring that all decoration and branding materials are of premium quality and professionally installed.',
                    ],
                ],
            ],
            'requirements'      => [
                'Company profile detailing the organization\'s experience in corporate event planning, management, and high-level decoration.',
                'Certificate of incorporation or official business registration in Malawi.',
                'Evidence of statutory compliance, including a valid MRA Tax Clearance Certificate.',
                'Evidence of at least three (3) years of relevant experience in event planning, management, coordination, and decoration services.',
                'At least three (3) corporate references from current or recent clients for similar scope of services.',
                'Portfolio or photographic evidence of previous national or corporate events successfully managed and decorated.',
                'Detailed financial proposal clearly indicating all costs including VAT.',
            ],
            'application_email' => 'info@chapterfour.mw',
            'is_urgent'         => true,
            'posted_date'       => now()->subDays(4)->toDateString(),
            'closes_at'         => '2026-10-25 17:00:00',
            'deadline_text'     => '25 October 2026, 5:00 PM CAT',
            'status'            => 'open',
            'sort_order'        => 1,
        ]);
    }
}
