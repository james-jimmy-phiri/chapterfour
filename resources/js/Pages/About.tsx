import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Shield, Scale, Users, Heart, Award, ArrowRight,
    BookOpen, CheckCircle2, Globe, Compass, Target,
    Share2, Mail, ExternalLink, MapPin
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

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* HERO BANNER (Stitch Replica)                                        */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <section className="hero-pattern text-white py-16 px-4 sm:px-8 border-b border-white/10" data-purpose="hero-banner">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb Navigation */}
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-300 mb-4 font-semibold uppercase tracking-wider">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span className="text-slate-500">›</span>
                        <span className="text-brand-amber">About Us</span>
                    </nav>

                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
                        Defending Constitutional Freedoms & Rule of Law
                    </h1>
                    <p className="text-base sm:text-lg text-slate-200 max-w-3xl font-normal leading-relaxed">
                        Real people. Real stories. Real impact. Chapter Four is a non-partisan, citizen-led legal and civic organization dedicated to advancing human rights under Chapter IV of the Constitution of Malawi.
                    </p>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* MISSION & VISION                                                   */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-16 bg-white" aria-label="Mission and Vision">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Mission */}
                        <div className="bg-[#FAF8F5] rounded-xl p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
                            <div className="w-12 h-12 rounded-lg bg-brand-rust-light border border-brand-rust/20 flex items-center justify-center text-brand-rust mb-6">
                                <Target className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-brand-rust block mb-2">Our Mission</span>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">
                                Protecting Rights Through Law & Empowerment
                            </h2>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                To champion constitutionalism, protect and advance human rights, and promote access to justice for all Malawians through strategic litigation, independent research, legal aid, and grassroots civic empowerment.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bg-[#FAF8F5] rounded-xl p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
                            <div className="w-12 h-12 rounded-lg bg-brand-amber-light border border-brand-amber/30 flex items-center justify-center text-brand-amber mb-6">
                                <Compass className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-brand-amber block mb-2">Our Vision</span>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">
                                A Just, Accountable & Democratic Malawi
                            </h2>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                A democratic Malawi where constitutional supremacy reigns, public institutions are accountable to the people, and fundamental human rights and freedoms are enjoyed by all without fear or discrimination.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* CORE VALUES                                                        */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-16 bg-[#FAF8F5] border-y border-slate-200/70" aria-label="Core Values">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-rust block mb-2">Guiding Principles</span>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Our Core Values</h2>
                        <p className="text-sm text-slate-600 mt-2">
                            The ethical foundations that guide our public interest litigation, research, and civic engagement.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {coreValues.map((val) => {
                            const IconComp = val.icon;
                            return (
                                <div key={val.title} className="bg-white rounded-lg p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
                                    <div>
                                        <div className="w-10 h-10 rounded-lg bg-brand-rust-light text-brand-rust flex items-center justify-center mb-4">
                                            <IconComp className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-base mb-2">{val.title}</h3>
                                        <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* THE TEAM SECTION (Google Stitch Replica — chisankho_watch_the_team) */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <section id="team" className="py-20 bg-white" data-purpose="team-members-grid">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-rust block mb-2">Leadership & Experts</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            The Team Behind Chapter Four
                        </h2>
                        <p className="text-sm text-slate-600 mt-2">
                            Dedicated human rights practitioners, constitutional lawyers, and researchers fighting for civic justice.
                        </p>
                    </div>

                    {/* 4-Column Grid mirroring Stitch The Team template */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {displayTeam.map((member, idx) => (
                            <article key={member.name + idx} className="flex flex-col items-center text-center group">
                                <div className="relative w-full aspect-[4/5] bg-gradient-to-br from-brand-dark via-[#382015] to-brand-rust rounded-lg overflow-hidden mb-4 shadow-sm border border-slate-200 flex items-center justify-center">
                                    {member.photo ? (
                                        <img
                                            src={member.photo}
                                            alt={member.name}
                                            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center p-6 text-white text-center">
                                            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-brand-amber font-black text-xl mb-3">
                                                {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                                            </div>
                                            <span className="text-xs font-bold tracking-wider text-brand-amber uppercase">Advocate</span>
                                        </div>
                                    )}

                                    {/* Action Button */}
                                    <button
                                        type="button"
                                        aria-label="Share profile"
                                        className="absolute top-3 right-3 w-8 h-8 rounded bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 shadow-sm flex items-center justify-center transition"
                                        onClick={() => {
                                            if (navigator.clipboard) {
                                                navigator.clipboard.writeText(window.location.href);
                                                alert('Profile link copied to clipboard!');
                                            }
                                        }}
                                    >
                                        <Share2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-brand-rust transition">
                                    {member.name}
                                </h3>
                                <p className="text-xs font-semibold text-brand-rust mt-1 uppercase tracking-wide">
                                    {member.role}
                                </p>
                                {member.bio && (
                                    <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
                                        {member.bio}
                                    </p>
                                )}
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* HUMAN RIGHTS-BASED APPROACH (HRBA) FRAMEWORK                       */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-20 bg-brand-dark text-white relative overflow-hidden" aria-label="Our Approach">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="max-w-3xl mb-12">
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-amber block mb-2">Our Methodology</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                            The Human Rights-Based Approach (HRBA)
                        </h2>
                        <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
                            Our interventions systematically identify duty-bearers and their legal obligations, and rights-holders and their entitlements, ensuring transparent accountability at every stage.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'Empowering Rights Holders', desc: 'Equipping citizens and local communities with the legal knowledge and confidence to claim their entitlements.' },
                            { title: 'Holding Duty Bearers Accountable', desc: 'Ensuring police, ministries, courts, and public officials fulfill their constitutional duties.' },
                            { title: 'Meaningful Participation', desc: 'Promoting direct civic inclusion in national policy-making and legislative reform.' },
                            { title: 'Empirical Evidence', desc: 'Grounding all advocacy in verifiable data, court monitoring, and documented field incidents.' },
                            { title: 'Strategic Litigation', desc: 'Taking key human rights and constitutional questions before superior courts to set enduring precedents.' },
                            { title: 'Accessible Legal Redress', desc: 'Removing barriers of cost, geography, and language to ensure equal access to court justice.' },
                        ].map((point, idx) => (
                            <div key={point.title} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
                                <span className="text-xs font-bold text-brand-amber">0{idx + 1}.</span>
                                <h3 className="text-base font-bold text-white mt-1 mb-2">{point.title}</h3>
                                <p className="text-xs text-slate-300 leading-relaxed">{point.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* CALL TO ACTION                                                     */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-16 bg-[#FAF8F5]" aria-label="Join Us">
                <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
                        Collaborate With Chapter Four
                    </h2>
                    <p className="text-sm text-slate-600 mb-8 max-w-xl mx-auto">
                        Whether you are a human rights organization, legal practitioner, academic researcher, or concerned citizen, there are multiple ways to partner with us.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/contact" className="btn-primary">
                            <span>Get in Touch</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/what-we-do" className="btn-secondary">
                            <span>Explore What We Do</span>
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
