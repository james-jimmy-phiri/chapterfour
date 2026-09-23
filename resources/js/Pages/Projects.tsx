import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Briefcase, MapPin, Users, ArrowRight,
    CheckCircle2, ArrowUpRight, Search, X,
    Filter, Clock, Activity
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
    featured_image?: string;
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
        beneficiaries: ['Underprivileged Detainees', 'Vulnerable Families'],
        status: 'Active',
        featured_image: '/images/paliament.jpg',
    },
    {
        title: 'Youth Constitutional Literacy & Chapter IV Assemblies',
        slug: 'youth-constitutional-literacy',
        summary: 'Grassroots civic education assemblies training youth leaders, school human rights clubs, and community radio advocates on Bill of Rights protections.',
        locations: ['Blantyre', 'Zomba', 'Mangochi', 'Thyolo'],
        beneficiaries: ['Youth Leaders', 'Student Associations'],
        status: 'Active',
        featured_image: '/images/constitutional_book.jpg',
    },
    {
        title: 'District Social Accountability & Public Resource Monitoring',
        slug: 'district-social-accountability',
        summary: 'Citizen monitoring groups tracking constituency development funds (CDF) and local government healthcare budgets to prevent corruption.',
        locations: ['Mzimba', 'Kasungu', 'Mchinji'],
        beneficiaries: ['Rural Communities', 'Civic Watchdogs'],
        status: 'Active',
        featured_image: '/images/Parliament_Building_of_Malawioutside.jpg',
    },
    {
        title: 'Legal Protection Against Child Marriage & Harmful Traditional Rites',
        slug: 'child-marriage-protection',
        summary: 'Collaborative initiative with traditional authorities and child protection committees to enforce statutory age laws and rescue victims.',
        locations: ['Phalombe', 'Mulanje', 'Machinga'],
        beneficiaries: ['Adolescent Girls', 'Community Mothers Groups'],
        status: 'Completed',
        featured_image: '/images/child_ca.jpg',
    },
    {
        title: 'GBV Survivors Legal Aid & Psychosocial Support Program',
        slug: 'gbv-survivors-legal-aid',
        summary: 'Providing integrated legal assistance and referral pathways for gender-based violence survivors through local courts and community support structures.',
        locations: ['Lilongwe', 'Blantyre', 'Mzuzu'],
        beneficiaries: ['GBV Survivors', 'Women & Girls'],
        status: 'Active',
        featured_image: '/images/woman.jpg',
    },
    {
        title: 'Community-Based Human Rights Monitoring Network',
        slug: 'human-rights-monitoring-network',
        summary: 'Training community monitors to document and report human rights violations at the grassroots level, contributing to national accountability reports.',
        locations: ['Ntchisi', 'Nkhata Bay', 'Karonga'],
        beneficiaries: ['Community Monitors', 'Rights Defenders'],
        status: 'Completed',
        featured_image: '/images/no_justice.jpg',
    },
];

export default function Projects({ projects = [] }: ProjectsProps) {
    const items = projects.length > 0 ? projects : defaultProjects;
    const [statusFilter, setStatusFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = useMemo(() => {
        let result = items;
        if (statusFilter !== 'All') {
            result = result.filter((p) => p.status?.toLowerCase() === statusFilter.toLowerCase());
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.summary?.toLowerCase().includes(q) ||
                    p.locations?.some((l) => l.toLowerCase().includes(q)) ||
                    p.beneficiaries?.some((b) => b.toLowerCase().includes(q))
            );
        }
        return result;
    }, [items, statusFilter, searchQuery]);

    const activeCount = items.filter((p) => p.status?.toLowerCase() === 'active').length;
    const completedCount = items.filter((p) => p.status?.toLowerCase() === 'completed').length;

    return (
        <PublicLayout>
            <Head>
                <title>Field Projects & Interventions — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Explore Chapter Four's active human rights field interventions, legal clinics, and community accountability projects across Malawi."
                />
            </Head>

            {/* ─── HERO SECTION ─────────────────────────────────────────────── */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/Parliament_Building_of_Malawioutside.jpg"
                        alt="Chapter Four Field Projects"
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/70 to-slate-900/20" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-bold uppercase tracking-wider">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span>/</span>
                        <span className="text-brand-amber">Projects</span>
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="max-w-3xl"
                    >
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-brand-amber font-bold tracking-widest uppercase mb-4 flex items-center gap-2 text-sm"
                        >
                            <span className="w-8 h-0.5 bg-brand-amber" /> Implementation
                        </motion.span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Field Projects &<br />
                            <span className="text-brand-amber">Interventions</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                            Translating constitutional ideals into tangible protections through direct legal defense, community empowerment, and empirical court monitoring across Malawi.
                        </p>
                    </motion.div>


                </div>

                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent" />
            </section>

            {/* ─── FILTER & SEARCH BAR ─────────────────────────────────────── */}
            <section className="bg-slate-50 border-b border-slate-200 py-6 sticky top-[100px] lg:top-[112px] z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    {/* Status Filter Tabs */}
                    <div className="flex items-center gap-2 shrink-0">
                        <Filter className="w-4 h-4 text-slate-400 mr-1" />
                        {['All', 'Active', 'Completed'].map((s) => (
                            <button
                                key={s}
                                type="button"
                                id={`filter-${s.toLowerCase()}`}
                                onClick={() => setStatusFilter(s)}
                                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${statusFilter === s
                                    ? 'bg-brand-rust text-white shadow-md shadow-brand-rust/25 scale-105'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-rust hover:text-brand-rust'
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Search Box */}
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input
                            id="projects-search"
                            type="text"
                            placeholder="Search projects, locations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-rust/30 focus:border-brand-rust transition"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* ─── PROJECTS GRID ────────────────────────────────────────────── */}
            <main className="py-16 bg-slate-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    {/* Results count */}
                    <div className="mb-8 flex items-center justify-between">
                        <p className="text-sm text-slate-500 font-medium">
                            Showing <span className="font-bold text-slate-900">{filtered.length}</span>{' '}
                            {filtered.length === 1 ? 'project' : 'projects'}
                            {searchQuery && <> matching <span className="text-brand-rust font-bold">"{searchQuery}"</span></>}
                        </p>
                        {(searchQuery || statusFilter !== 'All') && (
                            <button
                                onClick={() => { setSearchQuery(''); setStatusFilter('All'); }}
                                className="text-xs text-brand-rust hover:text-brand-rust-dark font-bold flex items-center gap-1"
                            >
                                <X className="w-3 h-3" /> Clear filters
                            </button>
                        )}
                    </div>

                    {/* Empty state */}
                    {filtered.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-500 mb-2">No projects found</h3>
                            <p className="text-sm text-slate-400">Try adjusting your search or filter criteria.</p>
                        </motion.div>
                    )}

                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filtered.map((item, idx) => (
                                <motion.article
                                    layout
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                    key={item.slug || idx}
                                    className="group bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
                                >
                                    {/* Image */}
                                    <div className="relative h-52 overflow-hidden shrink-0">
                                        <img
                                            src={item.featured_image || '/images/paliament.jpg'}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                                        {/* Status badge */}
                                        <div className="absolute top-3 left-3">
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md backdrop-blur-sm flex items-center gap-1.5 ${item.status === 'Completed'
                                                ? 'bg-slate-700/90 text-white'
                                                : 'bg-emerald-500/90 text-white'
                                                }`}>
                                                {item.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                                                {item.status || 'Active'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Orange hover bar between image and text */}
                                    <div className="h-1 bg-gradient-to-r from-brand-rust via-brand-amber to-brand-rust scale-x-0 group-hover:scale-x-100 opacity-0 group-hover:opacity-100 transition-all duration-500 origin-left shrink-0" />

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h2 className="text-lg font-bold text-slate-900 leading-tight mb-3 group-hover:text-brand-rust transition-colors line-clamp-2">
                                            <Link href={`/projects/${item.slug}`}>{item.title}</Link>
                                        </h2>

                                        {item.summary && (
                                            <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4 flex-grow">
                                                {item.summary}
                                            </p>
                                        )}

                                        {/* Tags */}
                                        <div className="space-y-2 mt-auto">
                                            {item.locations && item.locations.length > 0 && (
                                                <div className="flex items-start gap-2 text-xs text-slate-500">
                                                    <MapPin className="w-3.5 h-3.5 text-brand-rust shrink-0 mt-0.5" />
                                                    <span className="font-medium line-clamp-1">
                                                        {Array.isArray(item.locations) ? item.locations.join(', ') : item.locations}
                                                    </span>
                                                </div>
                                            )}
                                            {item.beneficiaries && item.beneficiaries.length > 0 && (
                                                <div className="flex items-start gap-2 text-xs text-slate-500">
                                                    <Users className="w-3.5 h-3.5 text-brand-amber shrink-0 mt-0.5" />
                                                    <span className="font-medium line-clamp-1">
                                                        {Array.isArray(item.beneficiaries) ? item.beneficiaries.join(', ') : item.beneficiaries}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-slate-100">
                                            <Link
                                                href={`/projects/${item.slug}`}
                                                className="inline-flex items-center gap-2 text-sm font-bold text-brand-rust hover:text-brand-rust-dark transition-colors group/link"
                                            >
                                                <span>View Details</span>
                                                <ArrowUpRight className="w-4 h-4 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </main>
        </PublicLayout>
    );
}
