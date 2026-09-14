import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft, MapPin, Users, Calendar, CheckCircle2,
    Briefcase, Sparkles, ArrowRight
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
            <Head title={`${project.title} - Chapter Four Projects`} />

            {/* Top Bar */}
            <div className="pt-28 pb-4 bg-navy-950 border-b border-navy-800/60">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to all projects
                    </Link>
                </div>
            </div>

            {/* Hero */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {project.status || 'Active Initiative'}
                        </span>
                        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-lg text-navy-200 font-light leading-relaxed max-w-3xl">
                            {project.summary}
                        </p>
                    </div>
                </div>
            </section>

            {/* Details Section */}
            <section className="py-16 bg-navy-950 border-t border-navy-800/60">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8 space-y-8">
                            <div>
                                <h2 className="font-serif text-2xl text-white font-normal mb-4">Project Overview</h2>
                                <p className="text-navy-200 text-base font-light leading-relaxed">
                                    {project.description || project.summary}
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-navy-900/60 border border-navy-800">
                                <h3 className="font-serif text-xl text-white font-normal mb-4">Key Objectives</h3>
                                <div className="space-y-3">
                                    {[
                                        'Expand legal consultation access for youth facing custody or bail barriers.',
                                        'Train community duty-bearers and village authorities on Chapter IV rights.',
                                        'Establish sustainable monitoring links between civil society and local magistrates.',
                                    ].map((obj, i) => (
                                        <div key={i} className="flex items-start gap-3 text-sm text-navy-200 font-light">
                                            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                                            <span>{obj}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Metadata sidebar */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="p-6 rounded-2xl bg-navy-900/60 border border-navy-800 space-y-4">
                                <h4 className="font-serif text-lg text-white font-normal border-b border-navy-800 pb-3">Project Metadata</h4>

                                {project.locations && (
                                    <div>
                                        <div className="text-xs text-navy-400 uppercase font-semibold mb-1">Target Districts</div>
                                        <div className="text-sm text-navy-200 font-light">{project.locations.join(', ')}</div>
                                    </div>
                                )}

                                {project.beneficiaries && (
                                    <div>
                                        <div className="text-xs text-navy-400 uppercase font-semibold mb-1">Beneficiary Groups</div>
                                        <div className="text-sm text-navy-200 font-light">{project.beneficiaries.join(', ')}</div>
                                    </div>
                                )}

                                <div className="pt-4 border-t border-navy-800">
                                    <Link
                                        href="/contact?type=partner"
                                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-semibold text-xs transition-colors"
                                    >
                                        Partner on this Project <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
