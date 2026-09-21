import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Scale, Shield, Users, BookOpen, FileText, Heart,
    Search, Globe, ArrowRight, ChevronRight, CheckCircle2,
    Activity, ArrowUpRight
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

const hrbaPrinciples = [
    {
        title: "Equality and Non-discrimination",
        desc: "Ensuring all individuals, irrespective of their background, have equal access to rights and opportunities."
    },
    {
        title: "Participation and Inclusion",
        desc: "Guaranteeing that marginalized groups have a voice in decision-making processes that affect their lives."
    },
    {
        title: "Accountability and Rule of Law",
        desc: "Holding duty-bearers accountable for human rights violations and ensuring mechanisms for redress."
    }
];

export default function WhatWeDo({ thematicAreas = [] }: WhatWeDoProps) {
    const displayAreas = thematicAreas.length > 0 ? thematicAreas : defaultThematicAreas;
    const icons = [Scale, Shield, Globe, BookOpen, FileText, Heart, Search, Users];

    const images = [
        "/images/Parliament_Building_of_Malawioutside.jpg",
        "/images/paliament.jpg",
        "/images/Chief_Justice.jpg",
        "/images/chiefjusticeof malawi.jpg",
        "/images/constitutional_book.jpg",
        "/images/Parliament_Building_of_Malawioutside.jpg",
        "/images/paliament.jpg",
        "/images/Chief_Justice.jpg"
    ];

    return (
        <PublicLayout>
            <Head>
                <title>What We Do — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Discover our key thematic focus areas: Human Rights, Access to Justice, Constitutionalism, Civic Education, and Public Interest Advocacy."
                />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/chiefjusticeof malawi.jpg"
                        alt="Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-300 mb-6 font-semibold uppercase tracking-wider">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span className="text-slate-500">›</span>
                        <span className="text-brand-amber">What We Do</span>
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <span className="text-brand-amber font-bold tracking-widest uppercase mb-4 block flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-brand-amber"></span> Our Mandate
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Advancing Rights, Justice & Accountability
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                            Chapter Four is more than a legal organization — we are a civic watchdog, an educator, and a frontline legal defender spanning the full spectrum of constitutional rights in Malawi.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Strategic Thematic Focus Areas */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-brand-rust font-bold tracking-widest uppercase mb-4 block">Core Programs</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Strategic Thematic Focus Areas</h2>
                        <p className="text-slate-600 text-lg">
                            Explore our specific interventions, grassroots legal clinics, and public interest litigation programs designed to transform constitutional promises into lived realities.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {displayAreas.map((area, idx) => {
                            const IconComp = icons[idx % icons.length];
                            const imageSrc = images[idx % images.length];
                            return (
                                <motion.div
                                    key={area.slug || idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 group flex flex-col h-full hover:-translate-y-1 transition-transform duration-300"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={imageSrc}
                                            alt={area.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 w-12 h-12 bg-brand-rust rounded-xl flex items-center justify-center text-white shadow-lg">
                                            <IconComp className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="font-bold text-slate-900 text-xl mb-3 group-hover:text-brand-rust transition-colors">
                                            {area.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                                            {area.short_description || area.description}
                                        </p>
                                        <Link
                                            href={`/what-we-do/${area.slug}`}
                                            className="inline-flex items-center gap-2 text-sm font-bold text-brand-rust hover:text-brand-rust-dark transition-colors mt-auto"
                                        >
                                            <span>Learn more</span>
                                            <ArrowUpRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Approach to Programming (HRBA) */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-brand-rust font-bold tracking-widest uppercase mb-4 block">Methodology</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                                Approach to Programming
                            </h2>
                            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                                We utilize a Human Rights-Based Approach (HRBA) to programming, which places human rights principles at the center of all interventions.
                            </p>
                            <p className="text-slate-600 leading-relaxed mb-8">
                                This approach focuses on empowering rights-holders to claim their rights and ensuring that duty-bearers (state actors) meet their obligations under national and international law. Our methodology is rooted in:
                            </p>

                            <div className="space-y-6">
                                {hrbaPrinciples.map((principle, idx) => (
                                    <div key={idx} className="flex gap-4 items-start">
                                        <div className="w-10 h-10 rounded-full bg-brand-amber/10 flex items-center justify-center text-brand-amber shrink-0 mt-1">
                                            <Activity className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">{principle.title}</h4>
                                            <p className="text-sm text-slate-600">{principle.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="/images/constitutional_book.jpg"
                                    alt="Community Engagement"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-8 -left-8 bg-brand-rust p-8 rounded-2xl shadow-xl hidden sm:block max-w-xs text-white">
                                <CheckCircle2 className="w-10 h-10 mb-4" />
                                <h3 className="font-bold text-lg mb-2">Empowering Rights Holders</h3>
                                <p className="text-sm opacity-90">Building capacity and confidence in vulnerable communities to demand accountability.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Target Beneficiaries & Resources Callout */}
            <section className="py-24 bg-brand-dark text-white relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10">
                    <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)"></path>
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                            </pattern>
                        </defs>
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl sm:text-4xl font-black mb-6">
                                Delivering Impact Through Evidence
                            </h2>
                            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                                Our programmatic interventions prioritize marginalized populations, including women, youth, children, persons with disabilities, and minorities facing systemic discrimination and barriers to justice.
                            </p>
                            <Link href="/about/beneficiaries" className="inline-flex items-center gap-2 text-brand-amber font-bold hover:text-amber-300 transition-colors">
                                Learn more about our Beneficiaries <ArrowRight className="w-5 h-5" />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-3xl"
                        >
                            <h3 className="text-2xl font-bold mb-4">Explore Our Research & Reports</h3>
                            <p className="text-slate-300 mb-8 leading-relaxed">
                                We publish baseline studies, policy briefs, and court monitoring digests to foster informed judicial debate, public awareness, and evidence-based advocacy.
                            </p>
                            <Link
                                href="/resources?type=reports"
                                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-amber hover:bg-amber-500 text-slate-900 font-bold text-base rounded-lg transition duration-200 shadow-lg hover:scale-105 w-full sm:w-auto"
                            >
                                <span>View Evidence & Reports</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
