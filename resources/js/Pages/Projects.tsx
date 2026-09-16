import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import {
    Briefcase, MapPin, Calendar, Users, ArrowRight,
    CheckCircle2, ChevronRight, Tag
} from 'lucide-react';

interface ProjectItem {
    id?: number;
    title: string;
    slug: string;
    summary?: string;
    description?: string;
    status?: string;
    locations?: string[];
    beneficiaries?: string[];
    start_date?: string;
}

interface ProjectsProps {
    projects?: ProjectItem[];
}

const defaultProjects: ProjectItem[] = [
    {
        title: 'Mobile Legal Defense Clinics for Rural Communities',
        slug: 'mobile-legal-defense-clinics',
        summary: 'Deploying traveling legal clinics to police posts, magistrate benches, and community centers to provide immediate representation and bail assistance.',
        locations: ['Lilongwe Rural', 'Dowa', 'Salima', 'Dedza'],
        beneficiaries: ['Underprivileged Detainees', 'Vulnerable Families', 'Community Paralegals'],
        status: 'Active',
    },
    {
        title: 'Youth Constitutional Literacy & Chapter IV Assemblies',
        slug: 'youth-constitutional-literacy',
        summary: 'Grassroots civic education assemblies training youth leaders, school human rights clubs, and community radio advocates on Bill of Rights protections.',
        locations: ['Blantyre', 'Zomba', 'Mangochi', 'Thyolo'],
        beneficiaries: ['Youth Leaders', 'Student Associations', 'Community Journalists'],
        status: 'Active',
    },
    {
        title: 'District Social Accountability & Public Resource Monitoring',
        slug: 'district-social-accountability',
        summary: 'Citizen monitoring groups tracking constituency development funds (CDF) and local government healthcare budgets to prevent corruption.',
        locations: ['Mzimba', 'Kasungu', 'Mchinji'],
        beneficiaries: ['Rural Communities', 'Civic Watchdogs'],
        status: 'Active',
    },
    {
        title: 'Legal Protection Against Child Marriage & Harmful Traditional Rites',
        slug: 'child-marriage-protection',
        summary: 'Collaborative initiative with traditional authorities and child protection committees to enforce statutory age laws and rescue victims.',
        locations: ['Phalombe', 'Mulanje', 'Machinga'],
        beneficiaries: ['Adolescent Girls', 'Community Mothers Groups'],
        status: 'Completed',
    },
];

export default function Projects({ projects = [] }: ProjectsProps) {
    const items = projects.length > 0 ? projects : defaultProjects;
    const [statusFilter, setStatusFilter] = useState('All');

    const filtered = statusFilter === 'All'
        ? items
        : items.filter((p) => p.status?.toLowerCase() === statusFilter.toLowerCase());

    return (
        <PublicLayout>
            <Head>
                <title>Field Projects & Interventions — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Explore Chapter Four's active human rights field interventions, legal clinics, and community accountability projects across Malawi."
                />
            </Head>

            {/* ─── HERO BANNER ─────────────────────────────────────────────── */}
            <section className="hero-pattern text-white py-16 px-4 sm:px-8 border-b border-white/10" data-purpose="hero-banner">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300 mb-4 font-semibold">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span className="text-slate-500">›</span>
                        <span className="text-brand-amber">Projects</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
                        Field Projects & Interventions
                    </h1>
                    <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
                        Translating constitutional ideals into tangible protections through direct legal defense, local community empowerment, and empirical court monitoring.
                    </p>
                </div>
            </section>

            {/* ─── MAIN CATALOGUE ──────────────────────────────────────────── */}
            <main className="py-14 bg-[#fafafa]">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    {/* Status Filter Tabs */}
                    <div className="flex items-center gap-2 mb-10 border-b border-slate-200 pb-4">
                        {['All', 'Active', 'Completed'].map((s) => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => setStatusFilter(s)}
                                className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition ${
                                    statusFilter === s
                                        ? 'bg-brand-rust text-white shadow-xs'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                                }`}
                            >
                                {s} Projects
                            </button>
                        ))}
                    </div>

                    {/* Project Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((item, idx) => (
                            <article
                                key={item.slug || idx}
                                className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-brand-rust/30 transition group"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                            item.status === 'Completed'
                                                ? 'bg-slate-100 text-slate-600'
                                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                        }`}>
                                            {item.status || 'Active'}
                                        </span>
                                    </div>

                                    <h2 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-brand-rust transition">
                                        <Link href={`/projects/${item.slug}`}>
                                            {item.title}
                                        </Link>
                                    </h2>

                                    {item.summary && (
                                        <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                                            {item.summary}
                                        </p>
                                    )}

                                    {/* Locations */}
                                    {item.locations && item.locations.length > 0 && (
                                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-1.5 text-xs text-slate-500">
                                            <MapPin className="w-3.5 h-3.5 text-brand-rust shrink-0 mt-0.5" />
                                            <span className="line-clamp-1">
                                                {Array.isArray(item.locations) ? item.locations.join(', ') : item.locations}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-rust">
                                    <Link
                                        href={`/projects/${item.slug}`}
                                        className="inline-flex items-center gap-1 hover:text-brand-brick transition"
                                    >
                                        <span>View Case Studies & Details</span>
                                        <ChevronRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
}
