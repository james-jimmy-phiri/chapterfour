import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Briefcase, MapPin, Calendar, Users, ArrowRight,
    CheckCircle2, Sparkles, FolderKanban
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

export default function Projects({ projects = [] }: ProjectsProps) {
    const defaultProjects: ProjectItem[] = [
        {
            title: 'Mobile Legal Defense Clinics for Rural Youth',
            slug: 'mobile-legal-defense-clinics',
            summary: 'Deploying traveling legal clinics to police stations and community courts to provide immediate representation.',
            locations: ['Lilongwe Rural', 'Dowa', 'Salima', 'Dedza'],
            beneficiaries: ['Detained Youth', 'Vulnerable Families', 'Community Paralegals'],
            status: 'Active',
        },
        {
            title: 'Youth Constitutional Literacy & Chapter IV Assemblies',
            slug: 'youth-constitutional-literacy',
            summary: 'Grassroots civic education assemblies training 1,000+ youth leaders on their Bill of Rights guarantees.',
            locations: ['Blantyre', 'Zomba', 'Mangochi', 'Thyolo'],
            beneficiaries: ['Youth Leaders', 'Student Associations', 'Community Radio Journalists'],
            status: 'Active',
        },
        {
            title: 'District Social Accountability & CDF Monitoring',
            slug: 'district-social-accountability',
            summary: 'Citizen monitoring groups tracking local government healthcare and education fund allocations.',
            locations: ['Mzimba', 'Kasungu', 'Mchinji'],
            beneficiaries: ['Rural Communities', 'Youth Advocates'],
            status: 'Active',
        },
    ];

    const items = projects.length > 0 ? projects : defaultProjects;

    return (
        <PublicLayout>
            <Head title="Our Projects & Initiatives - Chapter Four" />

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
                            <FolderKanban className="w-3.5 h-3.5" /> Programs in Action
                        </span>
                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-tight">
                            Frontline Advocacy & <span className="italic text-gradient-gold">Community Projects</span>
                        </h1>
                        <p className="mt-6 text-lg sm:text-xl text-navy-200 leading-relaxed font-light">
                            Discover our targeted field programs delivering legal aid, civic literacy, and social accountability across Malawi.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-20 bg-navy-950 border-t border-navy-800/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map((project, i) => (
                            <motion.div
                                key={project.slug || i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                className="p-8 rounded-2xl bg-navy-900/50 border border-navy-800 hover:border-amber-500/40 hover:bg-navy-900/80 transition-all flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                            {project.status || 'Active'}
                                        </span>
                                    </div>

                                    <h3 className="font-serif text-2xl text-white font-normal mb-3 group-hover:text-amber-300 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-navy-300 text-sm font-light leading-relaxed mb-6">
                                        {project.summary}
                                    </p>

                                    {project.locations && (
                                        <div className="flex items-start gap-2 text-xs text-navy-400 mb-3">
                                            <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                            <span>{project.locations.join(', ')}</span>
                                        </div>
                                    )}

                                    {project.beneficiaries && (
                                        <div className="flex items-start gap-2 text-xs text-navy-400 mb-6">
                                            <Users className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                            <span>{project.beneficiaries.join(', ')}</span>
                                        </div>
                                    )}
                                </div>

                                <Link
                                    href={`/projects/${project.slug}`}
                                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
                                >
                                    View Project Overview <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
