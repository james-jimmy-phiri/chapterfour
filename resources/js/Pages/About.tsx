import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Shield, Scale, Users, Heart, Award, ArrowRight,
    BookOpen, CheckCircle2, Globe, Compass, Target, Sparkles
} from 'lucide-react';

const values = [
    {
        title: 'Constitutional Supremacy',
        desc: 'Upholding Chapter IV of the Republic of Malawi Constitution as the cornerstone of our freedoms and governance.',
        icon: Scale,
        color: 'from-amber-500/20 to-amber-600/5',
        border: 'border-amber-500/30',
        textColor: 'text-amber-400',
    },
    {
        title: 'Youth Agency',
        desc: 'Placing young Malawians at the center of civic leadership, human rights defense, and national policy transformation.',
        icon: Users,
        color: 'from-red-500/20 to-red-600/5',
        border: 'border-red-500/30',
        textColor: 'text-red-400',
    },
    {
        title: 'Integrity & Independence',
        desc: 'Operating with unwavering ethical standards, transparency, and principled independence in all advocacy.',
        icon: Shield,
        color: 'from-emerald-500/20 to-emerald-600/5',
        border: 'border-emerald-500/30',
        textColor: 'text-emerald-400',
    },
    {
        title: 'Intersectionality & Inclusion',
        desc: 'Ensuring women, persons with disabilities, marginalized communities, and rural citizens are never left behind.',
        icon: Heart,
        color: 'from-purple-500/20 to-purple-600/5',
        border: 'border-purple-500/30',
        textColor: 'text-purple-400',
    },
];

const team = [
    {
        name: 'Executive Director',
        role: 'Leadership & Strategy',
        bio: 'Constitutional lawyer and human rights activist dedicated to public interest litigation and civic empowerment in Malawi.',
        initials: 'ED',
    },
    {
        name: 'Head of Programs & Advocacy',
        role: 'Programmatic Oversight',
        bio: 'Specialist in human rights-based approaches, civic education campaigns, and regional advocacy networks.',
        initials: 'PA',
    },
    {
        name: 'Lead Counsel - Legal Aid',
        role: 'Access to Justice Unit',
        bio: 'Pioneering community mobile legal clinics and pro-bono defense for vulnerable youth across Malawian districts.',
        initials: 'LC',
    },
    {
        name: 'Research & Policy Director',
        role: 'Knowledge & Monitoring',
        bio: 'Economist and policy analyst tracking legislative governance, public expenditure, and civic space freedoms.',
        initials: 'RP',
    },
];

const milestones = [
    { year: 'Founding', title: 'Named After Chapter IV', text: 'Established with inspiration from Chapter IV (The Bill of Rights) of the 1994 Constitution of the Republic of Malawi.' },
    { year: 'Expansion', title: 'Community Legal Clinics', text: 'Launched mobile legal awareness and legal clinics reaching thousands of youth and vulnerable community members.' },
    { year: 'Impact', title: 'Policy Advocacy', text: 'Successfully contributed to policy submissions on electoral reform, youth access to justice, and digital freedom.' },
    { year: 'Today', title: 'Pan-Malawian Movement', text: 'Mobilizing youth leaders across all regions of Malawi to champion democracy, rule of law, and active citizenship.' },
];

export default function About() {
    return (
        <PublicLayout>
            <Head title="About Us - Chapter Four" />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(245,158,11,0.15),transparent)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-6">
                            <Compass className="w-3.5 h-3.5" /> Our Identity & Purpose
                        </span>
                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-tight">
                            The Guardians of <span className="italic text-gradient-gold">Chapter IV</span>
                        </h1>
                        <p className="mt-6 text-lg sm:text-xl text-navy-200 leading-relaxed font-light">
                            Chapter Four is a vibrant, youth-led Malawian civil society organization dedicated to defending
                            constitutionalism, amplifying democratic participation, and ensuring social justice for every citizen.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* The Story & Bill of Rights Origin */}
            <section className="py-20 bg-navy-950 border-t border-navy-800/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-6 space-y-6"
                        >
                            <span className="text-amber-400 font-semibold tracking-wider text-xs uppercase">Why Chapter Four?</span>
                            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-snug">
                                Rooted in Malawi’s Bill of Rights
                            </h2>
                            <p className="text-navy-200 leading-relaxed font-light">
                                In the 1994 Constitution of the Republic of Malawi, <strong className="text-white font-medium">Chapter IV</strong> enshrines the fundamental Human Rights of all people: the right to life, human dignity, equality, freedom of expression, access to justice, and lawful administrative action.
                            </p>
                            <p className="text-navy-200 leading-relaxed font-light">
                                Our organization takes its name and mandate directly from this sacred constitutional charter. We believe constitutional rights are not abstract declarations—they are living guarantees that must protect every market vendor, youth organizer, student, and rural family.
                            </p>
                            <div className="pt-2">
                                <Link
                                    href="/what-we-do"
                                    className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium text-sm transition-colors group"
                                >
                                    Explore our thematic work areas
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-6"
                        >
                            <div className="p-8 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-950 border border-navy-800 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
                                <div className="flex items-center gap-3 text-amber-400 mb-6">
                                    <BookOpen className="w-6 h-6" />
                                    <span className="font-serif text-xl text-white">Constitution of Malawi</span>
                                </div>
                                <blockquote className="italic font-serif text-lg text-navy-100 border-l-2 border-amber-500/50 pl-4 my-4">
                                    "The fundamental human rights and freedoms enshrined in this Chapter shall be respected and upheld by the executive, legislature and judiciary and all organs of the Government and its agencies and, where applicable to them, by all natural and legal persons in Malawi."
                                </blockquote>
                                <div className="mt-4 text-xs uppercase tracking-widest text-navy-400">
                                    — Section 15(1), Chapter IV, Constitution of Malawi
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-20 bg-navy-900/60 border-t border-navy-800/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 sm:p-10 rounded-2xl bg-navy-950/80 border border-navy-800 hover:border-amber-500/30 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h3 className="font-serif text-2xl text-white font-normal mb-4">Our Vision</h3>
                            <p className="text-navy-200 leading-relaxed font-light">
                                A democratic, just, and prosperous Malawi where constitutionalism is upheld, human rights are respected, young people actively lead governance, and the rule of law guarantees dignity and equality for all.
                            </p>
                        </div>

                        <div className="p-8 sm:p-10 rounded-2xl bg-navy-950/80 border border-red-500/20 hover:border-red-500/40 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-6">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="font-serif text-2xl text-white font-normal mb-4">Our Mission</h3>
                            <p className="text-navy-200 leading-relaxed font-light">
                                To champion constitutionalism, defend human rights, foster social cohesion, and expand access to justice through youth empowerment, strategic advocacy, civic education, and rigorous public monitoring.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-navy-950 border-t border-navy-800/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-amber-400 font-semibold tracking-wider text-xs uppercase">What Guides Us</span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-2">
                            Our Core Principles
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v, i) => (
                            <div
                                key={i}
                                className={`p-6 rounded-xl bg-navy-900/50 border ${v.border} relative overflow-hidden group hover:bg-navy-900/80 transition-all`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${v.textColor} bg-white/5`}>
                                    <v.icon className="w-5 h-5" />
                                </div>
                                <h4 className="text-white font-medium text-base mb-2">{v.title}</h4>
                                <p className="text-navy-300 text-sm font-light leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Milestones / Journey */}
            <section className="py-20 bg-navy-900/40 border-t border-navy-800/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-amber-400 font-semibold tracking-wider text-xs uppercase">Our Path</span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-2">
                            The Chapter Four Journey
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {milestones.map((m, idx) => (
                            <div key={idx} className="relative p-6 rounded-xl bg-navy-950 border border-navy-800">
                                <div className="text-amber-400 font-serif text-2xl mb-2">{m.year}</div>
                                <h4 className="text-white font-medium text-base mb-2">{m.title}</h4>
                                <p className="text-navy-300 text-xs font-light leading-relaxed">{m.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 bg-navy-950 border-t border-navy-800/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-amber-400 font-semibold tracking-wider text-xs uppercase">People & Leadership</span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-2">
                            Led by Passionate Malawian Youth
                        </h2>
                        <p className="mt-3 text-sm text-navy-300 font-light">
                            Combining legal acumen, grassroots organizing, research rigour, and unyielding dedication.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-navy-900/60 border border-navy-800 text-center flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500/20 to-red-500/20 border border-amber-500/30 flex items-center justify-center text-xl font-serif text-amber-400 mb-4">
                                    {member.initials}
                                </div>
                                <h4 className="text-white font-medium text-base">{member.name}</h4>
                                <span className="text-xs text-amber-400 font-medium mb-3">{member.role}</span>
                                <p className="text-xs text-navy-300 font-light leading-relaxed">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 bg-gradient-to-r from-amber-600/20 via-navy-900 to-red-600/20 border-t border-navy-800">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                        Ready to Stand with Malawi’s Youth?
                    </h2>
                    <p className="mt-4 text-navy-200 text-base font-light max-w-2xl mx-auto">
                        Whether you want to partner on public interest advocacy, volunteer as a paralegal, or support our community outreach clinics, there is a place for you.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/get-involved"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-navy-950 font-semibold text-sm transition-all shadow-lg shadow-amber-500/20"
                        >
                            Get Involved <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900/80 hover:bg-navy-800 text-white font-medium text-sm border border-navy-700 transition-all"
                        >
                            Contact Our Team
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
