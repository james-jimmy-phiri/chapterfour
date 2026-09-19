import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Briefcase, MapPin, Calendar, Users, ArrowRight,
    CheckCircle2, ChevronRight, Tag, ArrowUpRight
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
    },
    {
        title: 'Youth Constitutional Literacy & Chapter IV Assemblies',
        slug: 'youth-constitutional-literacy',
        summary: 'Grassroots civic education assemblies training youth leaders, school human rights clubs, and community radio advocates on Bill of Rights protections.',
        locations: ['Blantyre', 'Zomba', 'Mangochi', 'Thyolo'],
        beneficiaries: ['Youth Leaders', 'Student Associations'],
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

const images = [
    "https://images.unsplash.com/photo-1541872526845-866d9ab184ee?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&q=80&w=800",
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

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=2000"
                        alt="Background"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-300 mb-6 font-semibold uppercase tracking-wider">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span className="text-slate-500">›</span>
                        <span className="text-brand-amber">Projects</span>
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <span className="text-brand-amber font-bold tracking-widest uppercase mb-4 block flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-brand-amber"></span> Implementation
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Field Projects & Interventions
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                            Translating constitutional ideals into tangible protections through direct legal defense, local community empowerment, and empirical court monitoring.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Catalogue */}
            <main className="py-20 bg-slate-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    {/* Status Filter Tabs */}
                    <div className="flex flex-wrap items-center gap-4 mb-12 border-b border-slate-200 pb-6">
                        {['All', 'Active', 'Completed'].map((s) => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => setStatusFilter(s)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                                    statusFilter === s
                                        ? 'bg-brand-rust text-white shadow-md transform scale-105'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-rust hover:text-brand-rust'
                                }`}
                            >
                                {s} Projects
                            </button>
                        ))}
                    </div>

                    {/* Project Cards Grid */}
                    <motion.div 
                        layout 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8"
                    >
                        <AnimatePresence>
                            {filtered.map((item, idx) => {
                                const imageSrc = item.featured_image || images[idx % images.length];
                                return (
                                    <motion.article
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        key={item.slug || idx}
                                        className="bg-white rounded-3xl border border-slate-100 overflow-hidden flex flex-col md:flex-row shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                                    >
                                        <div className="md:w-2/5 relative h-60 md:h-auto overflow-hidden shrink-0">
                                            <img
                                                src={imageSrc}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 md:bg-gradient-to-r md:from-transparent md:to-slate-900/40 to-transparent"></div>
                                            <div className="absolute top-4 left-4">
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md backdrop-blur-sm ${
                                                    item.status === 'Completed'
                                                        ? 'bg-white/90 text-slate-700'
                                                        : 'bg-emerald-500/90 text-white'
                                                }`}>
                                                    {item.status || 'Active'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h2 className="text-xl lg:text-2xl font-bold text-slate-900 leading-tight mb-4 group-hover:text-brand-rust transition-colors">
                                                    <Link href={`/projects/${item.slug}`}>
                                                        {item.title}
                                                    </Link>
                                                </h2>

                                                {item.summary && (
                                                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
                                                        {item.summary}
                                                    </p>
                                                )}

                                                {/* Locations & Beneficiaries */}
                                                <div className="space-y-3 mb-6">
                                                    {item.locations && item.locations.length > 0 && (
                                                        <div className="flex items-start gap-2 text-xs text-slate-500">
                                                            <MapPin className="w-4 h-4 text-brand-rust shrink-0 mt-0.5" />
                                                            <span className="font-medium">
                                                                {Array.isArray(item.locations) ? item.locations.join(', ') : item.locations}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {item.beneficiaries && item.beneficiaries.length > 0 && (
                                                        <div className="flex items-start gap-2 text-xs text-slate-500">
                                                            <Users className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" />
                                                            <span className="font-medium">
                                                                {Array.isArray(item.beneficiaries) ? item.beneficiaries.join(', ') : item.beneficiaries}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                                                <Link
                                                    href={`/projects/${item.slug}`}
                                                    className="inline-flex items-center gap-2 text-sm font-bold text-brand-rust hover:text-brand-rust-dark transition-colors"
                                                >
                                                    <span>View Details</span>
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </main>
        </PublicLayout>
    );
}
