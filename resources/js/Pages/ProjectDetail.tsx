import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft, MapPin, Users, Calendar, CheckCircle2,
    Briefcase, ArrowRight, Shield
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
}

interface ProjectDetailProps {
    project: ProjectItem;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
    return (
        <PublicLayout>
            <Head>
                <title>{`${project.title} — Chapter Four Projects`}</title>
                <meta name="description" content={project.summary || project.title} />
            </Head>

            {/* ─── HERO BANNER ─────────────────────────────────────────────── */}
            <section className="hero-pattern text-white py-14 px-4 sm:px-8 border-b border-white/10">
                <div className="max-w-5xl mx-auto">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300 mb-4 font-semibold">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span className="text-slate-500">›</span>
                        <Link href="/projects" className="hover:text-brand-amber transition">Projects</Link>
                        <span className="text-slate-500">›</span>
                        <span className="text-brand-amber truncate max-w-xs">{project.title}</span>
                    </div>

                    <div className="space-y-4">
                        <span className="inline-block bg-brand-rust text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                            {project.status || 'Active Initiative'}
                        </span>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                            {project.title}
                        </h1>

                        {project.summary && (
                            <p className="text-base text-slate-200 max-w-3xl leading-relaxed">
                                {project.summary}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* ─── MAIN CONTENT ────────────────────────────────────────────── */}
            <main className="py-14 bg-[#fafafa]">
                <div className="max-w-5xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Main Description */}
                        <div className="lg:col-span-8 space-y-8">
                            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-xs">
                                <h2 className="text-xl font-bold text-slate-900 mb-4">Project Overview & Objectives</h2>
                                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 text-sm sm:text-base">
                                    {project.description ? (
                                        <p>{project.description}</p>
                                    ) : (
                                        <>
                                            <p>
                                                This intervention directly addresses structural human rights vulnerabilities through grassroots engagement, mobile court monitoring, and capacity strengthening for local paralegals and rights defenders.
                                            </p>
                                            <p>
                                                By bringing legal literacy and procedural safeguards directly to local communities, Chapter Four eliminates geographical and economic barriers that prevent citizens from securing lawful bail, fair hearing, and prompt remedy.
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-xs">
                                <h2 className="text-xl font-bold text-slate-900 mb-4">Key Outcomes & Deliverables</h2>
                                <div className="space-y-3">
                                    {[
                                        'Direct pro-bono defense and bail assistance in magistrate courts.',
                                        'Continuous monitoring of police custody facilities and compliance with the 48-hour rule.',
                                        'Training community paralegals and youth rights champions on fundamental Chapter IV rights.',
                                        'Compilation of empirical detention and human rights abuse case records for institutional advocacy.',
                                    ].map((res, i) => (
                                        <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                                            <CheckCircle2 className="w-5 h-5 text-brand-rust shrink-0 mt-0.5" />
                                            <span>{res}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Metadata Sidebar */}
                        <aside className="lg:col-span-4 space-y-6">
                            {/* Project Details Box */}
                            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-5">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
                                    Project Parameters
                                </h3>

                                {project.locations && project.locations.length > 0 && (
                                    <div>
                                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Target Locations</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {(Array.isArray(project.locations) ? project.locations : [project.locations]).map((loc, i) => (
                                                <span key={i} className="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-md font-medium">
                                                    {loc}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {project.beneficiaries && project.beneficiaries.length > 0 && (
                                    <div>
                                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Target Groups</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {(Array.isArray(project.beneficiaries) ? project.beneficiaries : [project.beneficiaries]).map((ben, i) => (
                                                <span key={i} className="bg-brand-rust-light text-brand-rust text-xs px-2.5 py-1 rounded-md font-medium">
                                                    {ben}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Project Lead</span>
                                    <span className="text-xs font-bold text-slate-800">Chapter Four Field Operations Unit</span>
                                </div>
                            </div>

                            {/* Contact Box */}
                            <div className="bg-brand-dark rounded-xl p-6 text-white shadow-md">
                                <h3 className="text-base font-bold text-brand-amber mb-2">Support This Intervention</h3>
                                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                    Partner with us or support our community paralegals and mobile legal defense clinics.
                                </p>
                                <Link
                                    href="/contact"
                                    className="w-full btn-primary text-xs py-2.5 block text-center"
                                >
                                    Partner With Chapter Four
                                </Link>
                            </div>
                        </aside>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-200">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-xs font-bold text-brand-rust hover:text-brand-brick uppercase tracking-wider"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to All Projects</span>
                        </Link>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
}
