export interface ScopeSection {
    title: string;
    items: string[];
}

export interface Vacancy {
    id: number | string;
    title: string;
    department: string;
    location: string;
    type: 'Full-Time' | 'Part-Time' | 'Volunteer' | 'Internship' | 'Consultancy';
    tag?: string;
    postedDate?: string;
    closingDate: string;
    deadlineText?: string;
    isUrgent?: boolean;
    organization?: string;
    description: string;
    scopeIntro?: string;
    scopeSections?: ScopeSection[];
    requirements: string[];
    evaluationCriteria?: string[];
    reservationOfRights?: string;
    submissionEmail?: string;
    submissionAddress?: {
        recipient: string;
        organization: string;
        addressLines: string[];
        email: string;
    };
}

export const defaultVacancies: Vacancy[] = [
    {
        id: 1,
        title: 'Request For Proposals (RFP) – Provision Of Event Planning, Management And Decoration Services',
        department: 'Operations & Procurement',
        location: 'Lilongwe, Malawi',
        type: 'Consultancy',
        tag: 'RFP',
        postedDate: '4 days ago',
        closingDate: '2026-10-25',
        deadlineText: '25 October 2026, 5:00 PM CAT',
        isUrgent: true,
        organization: 'Chapter Four Malawi',
        description: 'Chapter Four Malawi is a non-governmental organization committed to advancing constitutionalism, social justice, and human rights through strategic public interest litigation, research, and community empowerment. Chapter Four invites qualified, experienced, and reputable event planning and management service providers to submit proposals for our upcoming flagship symposia and national dialogue conferences.',
        scopeIntro: 'The successful bidder shall provide comprehensive event planning, management, coordination, and decoration services, including but not limited to:',
        scopeSections: [
            {
                title: 'Event Planning and Management',
                items: [
                    'Event planning and coordination from inception through to completion.',
                    'Development of detailed event plans, timelines, and implementation schedules.',
                    'Coordination with Chapter Four leadership, relevant stakeholders, service providers, and event participants.',
                    'Venue identification, assessment, setup, and coordination, where required.',
                    'Coordination and supervision of suppliers and other third-party service providers.',
                    'Management and coordination of event setup, rehearsal, and breakdown.',
                    'On-site event management and troubleshooting throughout the event duration.',
                ]
            },
            {
                title: 'Event Decoration and Branding',
                items: [
                    'Development of a suitable event decoration and styling concept in consultation with Chapter Four.',
                    'Provision and installation of appropriate décor, including backdrops, stage décor, table décor, centrepieces, and ceremonial elements as required.',
                    'Event branding and visual presentation, including branded backdrops, banners, and digital signage where applicable.',
                    'Provision of executive tables, chairs, linen, and other décor-related materials where required.',
                    'Decoration and arrangement of the venue in line with the approved human rights conference theme.',
                    'Timely setup and dismantling of all décor and branding materials after the event.',
                    'Ensuring that all decoration and branding materials are of premium quality and professionally installed.',
                ]
            }
        ],
        requirements: [
            'Company profile detailing the organization\'s experience in corporate event planning, management, and high-level decoration.',
            'Certificate of incorporation or official business registration in Malawi.',
            'Evidence of statutory compliance, including a valid MRA Tax Clearance Certificate.',
            'Evidence of at least three (3) years of relevant experience in event planning, management, coordination, and decoration services.',
            'At least three (3) corporate references from current or recent clients for similar scope of services.',
            'Portfolio or photographic evidence of previous national or corporate events successfully managed and decorated.',
            'Profiles/CVs of key lead personnel who will be responsible for managing and executing the event.',
            'Detailed financial proposal/quotation clearly itemizing the costs for planning, logistics, decoration, and all associated services.',
        ],
        evaluationCriteria: [
            'Compliance with all mandatory documentation requirements of the RFP.',
            'Demonstrated experience of at least three (3) years in high-level conference and event planning and decoration.',
            'Quality and relevance of the submitted corporate references and track record.',
            'Demonstrated capacity, equipment availability, and technical expertise to deliver the required services.',
            'Quality of previous work and submitted portfolio aesthetic appeal.',
            'Cost competitiveness, transparent pricing structure, and value for money.',
        ],
        reservationOfRights: 'Chapter Four Malawi reserves the right to accept or reject any quotation and is not bound to award the contract to the lowest-priced bidder. Chapter Four further reserves the right to seek clarification from any bidder where necessary during the evaluation process.',
        submissionEmail: 'info@chapterfourmw.org',
        submissionAddress: {
            recipient: 'The Internal Procurement Committee',
            organization: 'Chapter Four Malawi',
            addressLines: ['Private Bag B324, Capital City', 'Area 47/3/149, Lilongwe, Malawi'],
            email: 'info@chapterfourmw.org',
        },
    },
    {
        id: 2,
        title: 'Legal Officer – Public Interest Litigation',
        department: 'Legal & Advocacy',
        location: 'Lilongwe, Malawi',
        type: 'Full-Time',
        tag: 'Litigation',
        postedDate: '1 week ago',
        closingDate: '2026-10-31',
        deadlineText: '31 October 2026, 5:00 PM CAT',
        isUrgent: true,
        organization: 'Chapter Four Malawi',
        description: 'Chapter Four is seeking a qualified, proactive Legal Officer to lead our public interest litigation portfolio, represent clients in constitutional matters, file amicus curiae briefs, and provide rigorous legal analysis on human rights issues affecting vulnerable populations.',
        scopeIntro: 'The Legal Officer will be under the direct supervision of the Head of Legal Services and will execute the following key duties:',
        scopeSections: [
            {
                title: 'Strategic Litigation & Court Representation',
                items: [
                    'Draft pleadings, affidavits, notices of motion, and legal submissions for cases before the High Court and Supreme Court of Appeal.',
                    'Conduct client interviews and prepare witnesses for constitutional and human rights hearings.',
                    'Represent Chapter Four and indigent litigants in landmark public interest cases.',
                    'Collaborate with external pro-bono senior counsels on complex constitutional challenges.',
                ]
            },
            {
                title: 'Legal Research & Policy Advocacy',
                items: [
                    'Monitor legislative developments, bills, and policy enactments that impact Chapter IV fundamental rights.',
                    'Prepare legal opinions, position papers, and human rights compliance advisories for parliamentary committees.',
                    'Lead stakeholder dialogues with judicial officers, the Malawi Law Society, and law enforcement agencies.',
                ]
            }
        ],
        requirements: [
            'Bachelor of Laws (LLB) Honours degree from an accredited institution.',
            'Valid practicing certificate and admission to the Malawi Bar (minimum 3 years post-admission experience).',
            'Demonstrable commitment to and experience in human rights law, constitutional litigation, or administrative justice.',
            'Exceptional legal drafting, case analysis, oral advocacy, and dispute resolution capabilities.',
            'Impeccable ethical standing and active membership in the Malawi Law Society.',
        ],
        evaluationCriteria: [
            'Proven courtroom litigation experience and quality of legal drafting samples.',
            'Depth of knowledge in the Constitution of Malawi (Chapter IV) and international human rights jurisprudence.',
            'Interview performance and presentation of strategic legal case analysis.',
            'Strong interpersonal communication and client care acumen.',
        ],
        reservationOfRights: 'Chapter Four reserves the right to appoint a candidate at an adjusted grade or decline appointments if circumstances warrant.',
        submissionEmail: 'info@chapterfourmw.org',
        submissionAddress: {
            recipient: 'The Recruitment Panel - Legal Unit',
            organization: 'Chapter Four Malawi',
            addressLines: ['Private Bag B324, Capital City', 'Lilongwe, Malawi'],
            email: 'info@chapterfourmw.org',
        },
    },
    {
        id: 3,
        title: 'Programs Manager – Civic Education & Community Action',
        department: 'Programs',
        location: 'Blantyre, Malawi',
        type: 'Full-Time',
        tag: 'Programs',
        postedDate: '2 weeks ago',
        closingDate: '2026-10-25',
        deadlineText: '25 October 2026, 5:00 PM CAT',
        isUrgent: false,
        organization: 'Chapter Four Malawi',
        description: 'Lead and coordinate Chapter Four\'s community-based civic education and youth assembly programs, overseeing a network of regional community facilitators across targeted districts in the Southern and Central regions of Malawi.',
        scopeIntro: 'The Programs Manager will oversee program delivery, partner collaboration, and field monitoring with the following core responsibilities:',
        scopeSections: [
            {
                title: 'Program Planning and Management',
                items: [
                    'Develop annual and quarterly program workplans, performance indicators, and budgets.',
                    'Coordinate grassroots human rights sensitization clinics and constitutional education dialogues.',
                    'Manage district-level field officers, community paralegals, and youth forum leaders.',
                    'Prepare timely, high-impact narrative reports for institutional donors and board oversight.',
                ]
            },
            {
                title: 'Stakeholder & Community Engagement',
                items: [
                    'Liaise with traditional authorities, local government councils, and grassroots civil society groups.',
                    'Facilitate participatory community problem-solving assemblies on access to justice and governance.',
                ]
            }
        ],
        requirements: [
            'Master\'s or Bachelor\'s Degree in Development Studies, Social Sciences, Project Management, or Law.',
            'Minimum 4 years progressive experience in donor-funded NGO program management.',
            'Proven expertise in managing multi-district community development or civic education initiatives.',
            'Fluency in Chichewa and English with exceptional written reporting skills.',
        ],
        evaluationCriteria: [
            'Demonstrated track record of delivering community-based governance or rights programs.',
            'Budget oversight and compliance track record with international development donors.',
            'Team leadership, mentoring, and conflict resolution capability.',
        ],
        submissionEmail: 'info@chapterfourmw.org',
    },
    {
        id: 4,
        title: 'Communications & Media Officer',
        department: 'Communications',
        location: 'Lilongwe, Malawi',
        type: 'Full-Time',
        tag: 'Media',
        postedDate: '1 week ago',
        closingDate: '2026-10-20',
        deadlineText: '20 October 2026, 5:00 PM CAT',
        isUrgent: false,
        organization: 'Chapter Four Malawi',
        description: 'Develop and execute Chapter Four\'s communications strategy across digital, print, and broadcast media. Produce compelling multimedia content that amplifies our human rights advocacy, court victories, and grassroots stories.',
        scopeIntro: 'Key responsibilities encompass strategic storytelling, digital asset production, and press relations:',
        scopeSections: [
            {
                title: 'Content Creation & Brand Visibility',
                items: [
                    'Draft press releases, media advisories, monthly newsletters, and impact briefs.',
                    'Create engaging social media campaigns, infographics, short videos, and human interest stories.',
                    'Oversee Chapter Four web presence and coordinate media coverage for major litigation milestones.',
                ]
            }
        ],
        requirements: [
            'Degree in Journalism, Mass Communications, Public Relations, or related field.',
            'At least 3 years practical experience in NGO communications or journalism.',
            'High proficiency with digital design tools (Canva/Adobe Suite) and social media management platforms.',
            'Exceptional command of spoken and written English.',
        ],
        evaluationCriteria: [
            'Quality and creativity of writing and digital media portfolio.',
            'Media relations network and responsiveness under breaking news cycles.',
        ],
        submissionEmail: 'info@chapterfourmw.org',
    },
    {
        id: 5,
        title: 'Human Rights Monitor – Northern Region',
        department: 'Monitoring & Research',
        location: 'Mzuzu, Malawi',
        type: 'Full-Time',
        tag: 'Monitoring',
        postedDate: '5 days ago',
        closingDate: '2026-11-05',
        deadlineText: '05 November 2026, 5:00 PM CAT',
        isUrgent: false,
        organization: 'Chapter Four Malawi',
        description: 'Document and investigate human rights violations in the Northern Region, maintain an incident tracking registry, conduct fact-finding missions, and compile periodic human rights situation reports.',
        scopeIntro: 'The Monitor will act as the primary eyes and ears on the ground for Chapter Four across Northern districts:',
        scopeSections: [
            {
                title: 'Incident Monitoring & Fact-Finding',
                items: [
                    'Receive, verify, and document complaints of arbitrary arrests, discrimination, and civil rights violations.',
                    'Conduct sensitive on-site investigations, interview witnesses, and safeguard confidential evidence.',
                    'Refer verified emergency cases to the Chapter Four legal team for immediate court relief.',
                ]
            }
        ],
        requirements: [
            'Degree in Law, Human Rights, Criminology, or Social Sciences.',
            'Minimum 2 years experience in human rights documentation, paralegal work, or investigative journalism.',
            'Ability to conduct field visits across remote areas with sensitivity and strict confidentiality.',
            'Fluency in Tumbuka and English.',
        ],
        evaluationCriteria: [
            'Familiarity with investigative fact-finding standards and regional social dynamics.',
            'Integrity, emotional resilience, and thorough incident documentation ability.',
        ],
        submissionEmail: 'info@chapterfourmw.org',
    },
    {
        id: 6,
        title: 'Research & Policy Analyst – Constitutional Jurisprudence',
        department: 'Research & Policy',
        location: 'Lilongwe, Malawi',
        type: 'Consultancy',
        tag: 'Research',
        postedDate: '3 days ago',
        closingDate: '2026-10-15',
        deadlineText: '15 October 2026, 5:00 PM CAT',
        isUrgent: false,
        organization: 'Chapter Four Malawi',
        description: 'Conduct an in-depth empirical assessment on the transformative impact of Chapter IV constitutional litigation on criminal justice reform and human rights protection in Malawi over the past decade.',
        scopeIntro: 'The consultant will be commissioned to produce a high-level peer-reviewed research publication:',
        scopeSections: [
            {
                title: 'Deliverables & Research Scope',
                items: [
                    'Inception report detailing methodology, sample judgments, and key informant interview protocols.',
                    'Comprehensive draft research paper synthesizing 10 years of High Court and Supreme Court case law.',
                    'Validation workshop facilitation with civil society leaders and judicial actors.',
                    'Final polished policy monograph and executive advocacy summary.',
                ]
            }
        ],
        requirements: [
            'Advanced degree (LLM, PhD, or Master\'s) in Law, Political Science, or Public Policy.',
            'Demonstrated track record of published legal or socio-legal research in Malawi or Southern Africa.',
            'Expertise in constitutional jurisprudence and quantitative/qualitative analysis.',
        ],
        evaluationCriteria: [
            'Technical research proposal quality and methodology robustness.',
            'Prior publications track record in peer-reviewed or authoritative legal journals.',
            'Value for money and realistic timeline delivery schedule.',
        ],
        submissionEmail: 'info@chapterfourmw.org',
    },
    {
        id: 7,
        title: 'Legal Aid Volunteer Network (Community Paralegals)',
        department: 'Legal & Advocacy',
        location: 'Various Districts, Malawi',
        type: 'Volunteer',
        tag: 'Paralegal',
        postedDate: '1 week ago',
        closingDate: '2026-12-31',
        deadlineText: '31 December 2026, 5:00 PM CAT',
        isUrgent: false,
        organization: 'Chapter Four Malawi',
        description: 'Join our grassroots network of trained community paralegals providing first-line legal information, mediation, referrals, and human rights assistance at community centers, police stations, and local courts across Malawi.',
        scopeIntro: 'Volunteers will receive comprehensive paralegal training and support community justice initiatives:',
        scopeSections: [
            {
                title: 'Community Legal Support',
                items: [
                    'Assist community members in understanding their constitutional rights under Chapter IV.',
                    'Facilitate community-level alternative dispute resolution for non-criminal family and land disputes.',
                    'Escalate severe rights violations and unlawful detentions to Chapter Four legal officers.',
                ]
            }
        ],
        requirements: [
            'Diploma, Degree, or ongoing studies in Law, Community Development, Social Work, or related fields.',
            'Availability to dedicate at least 2 days per week to community legal service.',
            'Deep connection to and understanding of local community traditions and languages.',
            'Empathetic listening and strong communication skills.',
        ],
        submissionEmail: 'info@chapterfourmw.org',
    }
];

export const typeColors: Record<string, string> = {
    'Full-Time': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Part-Time': 'bg-blue-50 text-blue-700 border-blue-200',
    'Volunteer': 'bg-amber-50 text-amber-700 border-amber-200',
    'Internship': 'bg-purple-50 text-purple-700 border-purple-200',
    'Consultancy': 'bg-slate-100 text-slate-700 border-slate-200',
};

export function formatDate(dateStr: string) {
    try {
        return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
        return dateStr;
    }
}

export function isClosingSoon(dateStr: string) {
    const closing = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.ceil((closing.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
}
