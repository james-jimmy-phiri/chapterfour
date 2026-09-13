import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Scale, Shield, Users, BookOpen, FileText, HeartHandshake,
    Eye, Search, ArrowRight, CheckCircle, Sparkles, Compass
} from 'lucide-react';
import { useState } from 'react';

interface ThematicArea {
    id?: number;
    title: string;
    slug: string;
    short_description?: string;
    description?: string;
    icon?: string;
}

interface WhatWeDoProps {
    thematicAreas?: ThematicArea[];
}

const defaultThematicAreas = [
    {
        title: 'Human Rights & Constitutionalism',
        slug: 'human-rights',
        short_description: 'Safeguarding fundamental constitutional rights and advancing public interest litigation for Malawians.',
        icon: Scale,
        tags: ['Litigation', 'Constitutional Law', 'Civil Liberties'],
    },
    {
        title: 'Access to Justice & Legal Empowerment',
        slug: 'access-to-justice',
        short_description: 'Delivering mobile community legal aid, paralegal clinics, and bail advocacy for marginalized youth.',
        icon: Shield,
        tags: ['Legal Aid', 'Paralegals', 'Detention Monitoring'],
    },
    {
        title: 'Democracy, Rule of Law & Governance',
        slug: 'democracy-governance',
        short_description: 'Strengthening democratic institutions, electoral integrity, anti-corruption, and executive accountability.',
        icon: Compass,
        tags: ['Elections', 'Rule of Law', 'Accountability'],
    },
    {
        title: 'Civic & Human Rights Education',
        slug: 'civic-education',
        short_description: 'Empowering communities and grassroots youth with practical knowledge of their rights under Chapter IV.',
        icon: BookOpen,
        tags: ['Youth Clubs', 'Community Radio', 'Workshops'],
    },
    {
        title: 'Policy & Legislative Advocacy',
        slug: 'policy-advocacy',
        short_description: 'Influencing laws, national budgets, and parliamentary oversight through evidence-based policy memos.',
        icon: FileText,
        tags: ['Law Reform', 'Policy Analysis', 'Parliament'],
    },
    {
        title: 'Protection of Vulnerable Groups',
        slug: 'vulnerable-groups',
        short_description: 'Defending women, youth, persons with disabilities, and marginalized minorities against systemic injustice.',
        icon: HeartHandshake,
        tags: ['Gender Justice', 'Child Rights', 'Inclusion'],
    },
    {
        title: 'Social Accountability & Monitoring',
        slug: 'accountability',
        short_description: 'Tracking public service delivery, healthcare, education funds, and local council expenditures.',
        icon: Eye,
        tags: ['Expenditure Tracking', 'Open Governance', 'Community Audits'],
    },
    {
        title: 'Research & Knowledge Generation',
        slug: 'research',
        short_description: 'Publishing data-driven research papers, human rights barometers, and shadow reports for global forums.',
        icon: Search,
        tags: ['Human Rights Reports', 'Barometer', 'Data Analytics'],
    },
];

export default function WhatWeDo({ thematicAreas = [] }: WhatWeDoProps) {
    const [search, setSearch] = useState('');

    const areasToDisplay = defaultThematicAreas.filter(a =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.short_description.toLowerCase().includes(search.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <PublicLayout>
            <Head title="What We Do - Thematic Pillars | Chapter Four" />

            {/* Header Hero */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(245,158,11,0.12),transparent)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-6">
                            <Sparkles className="w-3.5 h-3.5" /> Our Strategic Pillars
                        </span>
                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-tight">
                            Defending Justice Across <span className="italic text-gradient-gold">Eight Frontlines</span>
                        </h1>
                        <p className="mt-6 text-lg sm:text-xl text-navy-200 leading-relaxed font-light">
                            From the courtroom to rural village assemblies, Chapter Four champions holistic,
                            human rights-based approaches to systemic change in Malawi.
                        </p>

                        {/* Search Filter */}
                        <div className="mt-8 max-w-md mx-auto">
                            <div className="relative">
                                <Search className="w-4 h-4 text-navy-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Filter by keyword (e.g. Legal Aid, Elections, Policy)..."
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-900/90 border border-navy-700 text-white placeholder-navy-400 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Thematic Cards Grid */}
            <section className="py-20 bg-navy-950 border-t border-navy-800/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {areasToDisplay.map((area, i) => {
                            const IconComponent = area.icon;
                            return (
                                <motion.div
                                    key={area.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    className="p-8 rounded-2xl bg-navy-900/50 border border-navy-800 hover:border-amber-500/40 hover:bg-navy-900/80 transition-all flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <h3 className="font-serif text-2xl text-white font-normal mb-3 group-hover:text-amber-300 transition-colors">
                                            {area.title}
                                        </h3>
                                        <p className="text-navy-300 text-sm font-light leading-relaxed mb-6">
                                            {area.short_description}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex flex-wrap gap-1.5 mb-6">
                                            {area.tags.map(t => (
                                                <span key={t} className="text-[11px] px-2.5 py-0.5 rounded-full bg-navy-800/80 text-navy-300 border border-navy-700/60">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <Link
                                            href={`/what-we-do/${area.slug}`}
                                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
                                        >
                                            View Pillar Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {areasToDisplay.length === 0 && (
                        <div className="text-center py-16 text-navy-400">
                            No thematic pillars found matching "{search}".
                        </div>
                    )}
                </div>
            </section>

            {/* Approach Framework */}
            <section className="py-20 bg-navy-900/40 border-t border-navy-800/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-amber-400 font-semibold tracking-wider text-xs uppercase">Methodology</span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-2">
                            The Human Rights-Based Approach (HRBA)
                        </h2>
                        <p className="mt-3 text-navy-200 text-sm font-light">
                            Every program we design operates on international standards of accountability, participation, and equality.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { title: 'Participation', desc: 'Ensuring youth and affected rights-holders actively shape every stage of intervention.' },
                            { title: 'Accountability', desc: 'Holding duty-bearers and state authorities accountable to constitutional pledges.' },
                            { title: 'Non-Discrimination', desc: 'Focusing resources on historically excluded, rural, and vulnerable citizens.' },
                            { title: 'Rule of Law', desc: 'Grounding all claims firmly within domestic constitutional and treaty standards.' },
                        ].map((item, idx) => (
                            <div key={idx} className="p-6 rounded-xl bg-navy-950 border border-navy-800">
                                <div className="text-amber-400 font-serif text-lg font-normal mb-2 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-amber-400" />
                                    {item.title}
                                </div>
                                <p className="text-navy-300 text-xs font-light leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
