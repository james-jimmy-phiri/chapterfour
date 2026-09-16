import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Scale, Shield, Users, BookOpen, FileText, Heart,
    Search, Globe, ArrowRight, ChevronRight, CheckCircle2
} from 'lucide-react';

interface ThematicAreaItem {
    id?: number;
    title: string;
    slug: string;
    short_description?: string;
    description?: string;
    icon?: string;
}

interface WhatWeDoProps {
    thematicAreas?: ThematicAreaItem[];
}

const defaultThematicAreas: ThematicAreaItem[] = [
    {
        title: 'Human Rights & Constitutionalism',
        slug: 'human-rights',
        short_description: 'Safeguarding fundamental civil liberties, rights guarantees, and defending constitutional supremacy under Chapter IV of the Malawi Constitution.',
    },
    {
        title: 'Access to Justice & Legal Aid',
        slug: 'access-to-justice',
        short_description: 'Providing mobile legal aid clinics, pro-bono defense, paralegal training, and bail assistance for underprivileged citizens in magistrate courts.',
    },
    {
        title: 'Democracy & Good Governance',
        slug: 'democracy-governance',
        short_description: 'Strengthening democratic institutions, promoting electoral integrity, anti-corruption safeguards, and responsive public governance.',
    },
    {
        title: 'Civic & Rights Education',
        slug: 'civic-education',
        short_description: 'Equipping youth, women, and local community leaders with practical knowledge and skills to understand, exercise, and defend their constitutional rights.',
    },
    {
        title: 'Policy & Legislative Advocacy',
        slug: 'policy-advocacy',
        short_description: 'Drafting policy briefs, conducting rigorous legal analyses, and engaging Parliament and executive bodies to ensure statutory compliance with human rights.',
    },
    {
        title: 'Protection of Vulnerable Groups',
        slug: 'vulnerable-groups',
        short_description: 'Promoting substantive equality and dismantling discriminatory practices affecting women, children, persons with disabilities, and marginalized groups.',
    },
    {
        title: 'Accountability & Rights Monitoring',
        slug: 'accountability',
        short_description: 'Empirically monitoring law enforcement conduct, detention centers, and public bodies to document violations and demand transparent remedial action.',
    },
    {
        title: 'Research & Legal Knowledge',
        slug: 'research',
        short_description: 'Publishing baseline studies, court monitoring digests, and evidence-based reports to foster informed judicial debate and public awareness.',
    },
];

export default function WhatWeDo({ thematicAreas = [] }: WhatWeDoProps) {
    const displayAreas = thematicAreas.length > 0 ? thematicAreas : defaultThematicAreas;

    const icons = [Scale, Shield, Globe, BookOpen, FileText, Heart, Search, Users];

    return (
        <PublicLayout>
            <Head>
                <title>What We Do — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Discover our key thematic focus areas: Human Rights, Access to Justice, Constitutionalism, Civic Education, and Public Interest Advocacy."
                />
            </Head>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* HERO BANNER (Stitch Replica)                                        */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <section className="hero-pattern text-white py-16 sm:py-20 px-4 sm:px-8 border-b border-white/10" data-purpose="hero-banner">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300 mb-4 font-semibold">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span className="text-slate-500">›</span>
                        <span className="text-brand-amber">What We Do</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5 text-white">
                        What We Do
                    </h1>
                    <p className="max-w-3xl text-slate-200 text-sm sm:text-base leading-relaxed">
                        Chapter Four is more than a legal organization — we are a civic watchdog, an educator, and a frontline legal defender. Our work spans the full spectrum of constitutional rights enshrined in Chapter IV of the Malawi Constitution.
                    </p>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* 2X2 OR 3-COLUMN SERVICE GRID (Stitch Replica)                      */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <main className="max-w-7xl mx-auto px-4 sm:px-8 py-16 w-full">
                <div className="mb-10">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-rust block mb-1">Our Mandate</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                        Strategic Thematic Focus Areas
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base mt-1">
                        Explore our specific interventions, grassroots legal clinics, and public interest litigation programs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {displayAreas.map((area, idx) => {
                        const IconComp = icons[idx % icons.length];
                        return (
                            <div
                                key={area.slug || idx}
                                className="bg-white rounded-lg p-6 sm:p-7 flex items-start gap-5 shadow-xs border border-slate-200 hover:shadow-md hover:border-brand-rust/30 transition group"
                            >
                                <div className="shrink-0 w-14 h-14 rounded-lg bg-brand-dark text-brand-amber flex items-center justify-center group-hover:bg-brand-rust group-hover:text-white transition">
                                    <IconComp className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2 group-hover:text-brand-rust transition">
                                        {area.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                                        {area.short_description || area.description}
                                    </p>
                                    <Link
                                        href={`/what-we-do/${area.slug}`}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-rust hover:text-brand-brick transition"
                                    >
                                        <span>View Interventions</span>
                                        <ChevronRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View Our Reports Button */}
                <div className="mt-10">
                    <Link
                        href="/resources?type=reports"
                        className="btn-amber"
                    >
                        <span>View Our Evidence & Reports</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* ─── Stitch Replica Orange Guide Banner ─────────────────────── */}
                <div className="mt-16 rounded-xl relative overflow-hidden rust-pattern p-8 sm:p-12 shadow-lg text-white">
                    <div className="max-w-2xl relative z-10">
                        <span className="text-xs font-semibold tracking-wider uppercase text-amber-100 block mb-2">
                            Constitutional Accountability in Practice
                        </span>
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight mb-4">
                            Practical, field-tested public interest legal methods that protect ordinary citizens.
                        </h3>
                        <p className="text-sm text-slate-100 mb-6 leading-relaxed">
                            Learn how Chapter Four partners with community paralegals, traditional leaders, and magistrates courts to secure immediate legal remedies for vulnerable individuals.
                        </p>
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 bg-white text-brand-dark hover:bg-amber-50 text-xs sm:text-sm font-bold px-6 py-3 rounded shadow transition"
                        >
                            <span>Learn About Our Methodology</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
}
