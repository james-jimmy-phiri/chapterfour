import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft, MapPin, Users, Calendar, CheckCircle2,
    Briefcase, ArrowRight, Shield, Target, ArrowUpRight
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
    end_date?: string;
    featured_image?: string;
}

interface ProjectDetailProps {
    project: ProjectItem;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
    const imageSrc = project.featured_image || "/images/animate-img-1.jpg";

    const isCompleted = project.status?.toLowerCase() === 'completed';

    return (
        <PublicLayout>
            <Head>
                <title>{`${project.title} — Chapter Four Projects`}</title>
                <meta name="description" content={project.summary || project.title} />
            </Head>

            {/* ─── HERO BANNER ─────────────────────────────────────────────── */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src={imageSrc}
                        alt="Project Background"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/40"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                    {/* Breadcrumbs */}
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-bold uppercase tracking-wider">
                        <Link href="/" className="hover:text-brand-amber transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/projects" className="hover:text-brand-amber transition-colors">Projects</Link>
                        <span>/</span>
                        <span className="text-brand-amber truncate max-w-xs">{project.title}</span>
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 ${
                            isCompleted ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-brand-rust/20 text-brand-rust border border-brand-rust/30'
                        }`}>
                            {project.status || 'Active Initiative'}
                        </span>

                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tight">
                            {project.title}
                        </h1>

                        {project.summary && (
                            <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed max-w-3xl font-medium border-l-4 border-brand-amber pl-6">
                                {project.summary}
                            </p>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* ─── MAIN CONTENT ────────────────────────────────────────────── */}
            <main className="py-20 bg-slate-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Main Description */}
                        <div className="lg:col-span-8 space-y-12">
                            {/* Content Block */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100"
                            >
                                <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                                    <div className="w-12 h-12 rounded-xl bg-brand-amber/10 flex items-center justify-center text-brand-amber shrink-0">
                                        <Target className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Project Overview & Objectives</h2>
                                </div>
                                
                                <div className="prose prose-lg prose-slate max-w-none text-slate-700 leading-relaxed">
                                    {project.description ? (
                                        <p>{project.description}</p>
                                    ) : (
                                        <div className="space-y-6">
                                            <p className="text-xl leading-relaxed text-slate-800">
                                                This intervention directly addresses structural human rights vulnerabilities through grassroots engagement, mobile court monitoring, and capacity strengthening for local paralegals and rights defenders.
                                            </p>
                                            <p>
                                                By bringing legal literacy and procedural safeguards directly to local communities, Chapter Four eliminates geographical and economic barriers that prevent citizens from securing lawful bail, fair hearing, and prompt remedy. Our approach is multi-faceted, involving both direct legal representation and systemic advocacy to ensure lasting impact.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Outcomes Block */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden"
                            >
                                {/* Decorative bg */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-rust/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                
                                <div className="relative z-10">
                                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-8">Key Outcomes & Deliverables</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {[
                                            'Direct pro-bono defense and bail assistance in magistrate courts.',
                                            'Continuous monitoring of police custody facilities and compliance with the 48-hour rule.',
                                            'Training community paralegals and youth rights champions on fundamental Chapter IV rights.',
                                            'Compilation of empirical detention and human rights abuse case records for institutional advocacy.',
                                        ].map((res, i) => (
                                            <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col gap-4 group hover:bg-white/20 transition-colors">
                                                <div className="w-10 h-10 rounded-full bg-brand-rust/20 flex items-center justify-center text-brand-amber group-hover:scale-110 transition-transform">
                                                    <CheckCircle2 className="w-5 h-5" />
                                                </div>
                                                <p className="text-slate-200 font-medium leading-relaxed">{res}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Metadata Sidebar */}
                        <aside className="lg:col-span-4 space-y-8 sticky top-32">
                            {/* Project Parameters Card */}
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
                            >
                                <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                    <Briefcase className="w-5 h-5 text-brand-rust" /> Project Details
                                </h3>

                                <div className="space-y-8">
                                    {project.locations && project.locations.length > 0 && (
                                        <div>
                                            <span className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                                <MapPin className="w-4 h-4" /> Target Locations
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {(Array.isArray(project.locations) ? project.locations : [project.locations]).map((loc, i) => (
                                                    <span key={i} className="bg-slate-50 border border-slate-200 text-slate-700 text-sm px-3 py-1.5 rounded-lg font-semibold shadow-sm">
                                                        {loc}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {project.beneficiaries && project.beneficiaries.length > 0 && (
                                        <div>
                                            <span className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                                <Users className="w-4 h-4" /> Target Groups
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {(Array.isArray(project.beneficiaries) ? project.beneficiaries : [project.beneficiaries]).map((ben, i) => (
                                                    <span key={i} className="bg-brand-rust/10 text-brand-rust text-sm px-3 py-1.5 rounded-lg font-bold shadow-sm">
                                                        {ben}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-6 border-t border-slate-100">
                                        <span className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                            <Shield className="w-4 h-4" /> Project Lead
                                        </span>
                                        <span className="text-base font-black text-slate-900">Chapter Four Field Operations Unit</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Contact Box */}
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-gradient-to-br from-brand-rust to-brand-rust-dark rounded-3xl p-8 text-white shadow-xl shadow-brand-rust/20 text-center"
                            >
                                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-black mb-3">Support This Intervention</h3>
                                <p className="text-slate-100/90 leading-relaxed mb-8">
                                    Partner with us or support our community paralegals and mobile legal defense clinics to scale our impact.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 w-full bg-white text-brand-rust hover:bg-slate-50 text-sm font-bold uppercase tracking-wider px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
                                >
                                    <span>Partner With Us</span>
                                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </aside>
                    </div>

                    <div className="mt-20 pt-10 border-t border-slate-200">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-rust uppercase tracking-wider transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                            <span>Back to All Projects</span>
                        </Link>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
}
