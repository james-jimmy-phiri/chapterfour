import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Shield, Scale, Users, Heart, ArrowRight,
    CheckCircle2, Globe, Target, Share2
} from 'lucide-react';

interface TeamMemberItem {
    id?: number;
    name: string;
    role: string;
    bio?: string;
    photo?: string;
    email?: string;
    linkedin?: string;
}

interface StatItem {
    label: string;
    value: string | number;
    prefix?: string;
    suffix?: string;
    description?: string;
}

interface PartnerItem {
    name: string;
    logo?: string;
    website?: string;
    description?: string;
}

interface AboutProps {
    teamMembers?: TeamMemberItem[];
    stats?: StatItem[];
    partners?: PartnerItem[];
}

const coreValues = [
    {
        title: 'Constitutional Supremacy',
        desc: 'Upholding Chapter IV of the Republic of Malawi Constitution as the cornerstone of our freedoms, rights, and administrative governance.',
        icon: Scale,
    },
    {
        title: 'Integrity & Independence',
        desc: 'Operating with unwavering ethical rigor, transparency, and non-partisan independence in all research, reports, and litigation.',
        icon: Shield,
    },
    {
        title: 'Grassroots Empowerment',
        desc: 'Placing vulnerable citizens, youth, women, and rural communities at the center of legal literacy and civic action.',
        icon: Users,
    },
    {
        title: 'Equality & Non-Discrimination',
        desc: 'Ensuring that rights and institutional protections apply equally without prejudice across all sectors of society.',
        icon: Heart,
    },
];

const defaultTeam: TeamMemberItem[] = [
    {
        name: 'Tuntufye Simwimba',
        role: 'Programs Coordinator',
        bio: 'Constitutional legal advocate leading strategic human rights programs, grassroots paralegal deployments, and public interest litigation.',
    },
    {
        name: 'Monica Ndalama',
        role: 'Project Officer (Human Rights)',
        bio: 'Specialist in human rights monitoring, community civic literacy, and defending civic space freedoms in regional jurisdictions.',
    },
    {
        name: 'Frackson Makangwala',
        role: 'Monitoring & Evidence Lead',
        bio: 'Statistician and empirical researcher analyzing justice indicators, detention metrics, and institutional accountability data.',
    },
    {
        name: 'Stella Chikombole',
        role: 'Legal Aid & Community Outreach',
        bio: 'Community legal counsel coordinating grassroots mobile clinics, pro-bono defense, and rights education for vulnerable youth.',
    },
];

export default function About({
    teamMembers = [],
    stats = [],
    partners = [],
}: AboutProps) {
    const displayTeam = teamMembers.length > 0 ? teamMembers : defaultTeam;

    return (
        <PublicLayout>
            <Head>
                <title>About Us — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Learn about Chapter Four Malawi: our mission, values, leadership team, and our commitment to constitutional rights."
                />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1541872526845-866d9ab184ee?auto=format&fit=crop&q=80&w=2000"
                        alt="Background"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-300 mb-6 font-semibold uppercase tracking-wider">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span className="text-slate-500">›</span>
                        <span className="text-brand-amber">About Us</span>
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Defending Constitutional Freedoms & Rule of Law
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                            Chapter Four is a youth-led non-governmental organization established to promote, protect and advance human rights, constitutionalism, democracy, social-cohesion, good governance and social justice.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-20 bg-slate-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-white p-10 rounded-2xl shadow-lg border border-slate-100 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-amber/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                            <Globe className="w-12 h-12 text-brand-amber mb-6 relative z-10" />
                            <span className="text-xs font-bold uppercase tracking-wider text-brand-amber block mb-2 relative z-10">Our Vision</span>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">A Just, Accountable & Democratic Malawi</h2>
                            <p className="text-lg text-slate-600 leading-relaxed relative z-10 font-medium">
                                A just, democratic and inclusive Malawi where the rights and freedoms guaranteed by the Constitution are respected, protected and enjoyed by all.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-white p-10 rounded-2xl shadow-lg border border-slate-100 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-rust/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                            <Target className="w-12 h-12 text-brand-rust mb-6 relative z-10" />
                            <span className="text-xs font-bold uppercase tracking-wider text-brand-rust block mb-2 relative z-10">Our Mission</span>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">Protecting Rights Through Law & Empowerment</h2>
                            <p className="text-lg text-slate-600 leading-relaxed relative z-10 font-medium">
                                To promote and protect constitutional rights, strengthen access to justice, empower citizens, and contribute to accountable, democratic and rights-respecting governance in Malawi.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-white" aria-label="Core Values">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-rust block mb-2">Guiding Principles</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Our Core Values</h2>
                        <p className="text-slate-600 mt-4 text-lg">
                            The ethical foundations that guide our public interest litigation, research, and civic engagement.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {coreValues.map((val, idx) => {
                            const IconComp = val.icon;
                            return (
                                <motion.div
                                    key={val.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow group"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-rust mb-6 group-hover:bg-brand-rust group-hover:text-white transition-colors duration-300">
                                        <IconComp className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-lg mb-3">{val.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{val.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* The Team Section */}
            <section className="py-20 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <span className="text-xs font-bold uppercase tracking-wider text-brand-rust block mb-2">Leadership & Experts</span>
                            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                                The Team Behind Chapter Four
                            </h2>
                            <p className="text-slate-600 mt-4 text-lg">
                                Dedicated human rights practitioners, constitutional lawyers, and researchers fighting for civic justice.
                            </p>
                        </div>
                        <Link href="/about/our-team" className="inline-flex items-center gap-2 text-brand-rust font-bold hover:text-brand-rust-dark transition-colors whitespace-nowrap">
                            Meet the full team <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {displayTeam.map((member, idx) => (
                            <motion.article
                                key={member.name + idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group"
                            >
                                <div className="relative w-full aspect-[4/5] bg-gradient-to-br from-brand-dark via-[#382015] to-brand-rust rounded-2xl overflow-hidden mb-6 shadow-md border border-slate-200">
                                    {member.photo ? (
                                        <img
                                            src={member.photo}
                                            alt={member.name}
                                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full p-6 text-white text-center">
                                            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-brand-amber font-black text-xl mb-3">
                                                {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                                            </div>
                                            <span className="text-xs font-bold tracking-wider text-brand-amber uppercase">Advocate</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-rust transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-sm font-semibold text-brand-amber mt-1 uppercase tracking-wide">
                                    {member.role}
                                </p>
                                {member.bio && (
                                    <p className="text-sm text-slate-500 mt-3 leading-relaxed line-clamp-3">
                                        {member.bio}
                                    </p>
                                )}
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call To Action */}
            <section className="py-24 bg-brand-dark text-white text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6">
                        Join Us in Defending Constitutional Rights
                    </h2>
                    <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
                        Whether you are a human rights organization, legal practitioner, academic researcher, or concerned citizen, there are multiple ways to partner with us.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/contact" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-rust hover:bg-brand-rust-dark text-white font-bold text-base rounded-lg transition duration-200 shadow-lg hover:scale-105">
                            <span>Get in Touch</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/what-we-do" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-base rounded-lg transition duration-200 backdrop-blur-sm hover:scale-105 border border-white/20">
                            <span>Explore Our Work</span>
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
