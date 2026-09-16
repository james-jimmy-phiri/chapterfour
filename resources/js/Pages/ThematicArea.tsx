import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Scale, Shield, Compass, ArrowLeft, ArrowRight,
    CheckCircle2, BookOpen, Users, FileText, Calendar,
    ChevronRight, MapPin
} from 'lucide-react';

interface ResourceItem {
    title: string;
    slug: string;
    type: string;
    excerpt?: string;
    published_at?: string;
}

interface ProjectItem {
    title: string;
    slug: string;
    summary?: string;
    locations?: string[];
}

interface ThematicAreaProps {
    area?: {
        title: string;
        slug: string;
        short_description?: string;
        description?: string;
        objectives?: string[];
        key_interventions?: string[];
    };
    relatedResources?: ResourceItem[];
    relatedProjects?: ProjectItem[];
}

export default function ThematicArea({
    area,
    relatedResources = [],
    relatedProjects = [],
}: ThematicAreaProps) {
    const title = area?.title || 'Thematic Area';
    const description = area?.description || area?.short_description || 'Detailed strategic pillar focusing on defending rights and empowering youth.';

    const defaultObjectives = [
        'Promote widespread legal literacy and constitutional rights awareness in rural and urban communities.',
        'Facilitate access to judicial, quasi-judicial, and administrative remedies for vulnerable victims of rights violations.',
        'Conduct rigorous empirical research and legislative review to inform national law and policy reforms.',
        'Strengthen institutional accountability of law enforcement, correctional services, and local authorities.',
    ];

    const defaultInterventions = [
        'Community Legal Aid & Paralegal Help Desks at Magistrates Courts',
        'Strategic Public Interest Litigation on Constitutional Questions',
        'Youth and Civic Human Rights Clubs in Secondary Schools and Colleges',
        'Multi-Stakeholder Dialogues with Judiciary, Police, and Civil Society',
        'Independent Human Rights Monitoring and Periodic Situation Briefings',
    ];

    const objectives = area?.objectives && area.objectives.length > 0 ? area.objectives : defaultObjectives;
    const interventions = area?.key_interventions && area.key_interventions.length > 0 ? area.key_interventions : defaultInterventions;

    return (
        <PublicLayout>
            <Head>
                <title>{`${title} — Chapter Four Malawi`}</title>
                <meta name="description" content={description} />
            </Head>

            {/* ─── HERO BANNER ─────────────────────────────────────────────── */}
            <section className="hero-pattern text-white py-16 px-4 sm:px-8 border-b border-white/10">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300 mb-4 font-semibold">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span className="text-slate-500">›</span>
                        <Link href="/what-we-do" className="hover:text-brand-amber transition">What We Do</Link>
                        <span className="text-slate-500">›</span>
                        <span className="text-brand-amber truncate max-w-xs sm:max-w-md">{title}</span>
                    </div>

                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 text-brand-amber text-xs font-bold px-3 py-1 rounded-full mb-4 border border-white/15">
                            <span>Strategic Pillar Focus</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                            {title}
                        </h1>
                        <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── MAIN CONTENT ────────────────────────────────────────────── */}
            <main className="py-16 bg-[#FAF8F5]">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Main Pillar Details */}
                        <div className="lg:col-span-8 space-y-10">
                            {/* Strategic Objectives */}
                            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-xs">
                                <span className="text-xs font-bold uppercase tracking-wider text-brand-rust block mb-2">Programmatic Focus</span>
                                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">Strategic Objectives</h2>
                                <div className="space-y-3.5">
                                    {objectives.map((obj, i) => (
                                        <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                                            <CheckCircle2 className="w-5 h-5 text-brand-rust shrink-0 mt-0.5" />
                                            <span className="leading-relaxed">{obj}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Key Interventions */}
                            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-xs">
                                <span className="text-xs font-bold uppercase tracking-wider text-brand-amber-dark block mb-2">Field Operations</span>
                                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">Key Interventions & Activities</h2>
                                <div className="space-y-4">
                                    {interventions.map((act, i) => (
                                        <div key={i} className="flex items-start gap-3.5 p-4 rounded-lg bg-slate-50 border border-slate-200/70">
                                            <span className="w-6 h-6 rounded-full bg-brand-dark text-white text-xs font-bold flex items-center justify-center shrink-0">
                                                {i + 1}
                                            </span>
                                            <span className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">{act}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Related Projects */}
                            {relatedProjects && relatedProjects.length > 0 && (
                                <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-xs">
                                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">Associated Field Projects</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {relatedProjects.map((proj, idx) => (
                                            <Link
                                                key={proj.slug || idx}
                                                href={`/projects/${proj.slug}`}
                                                className="p-4 rounded-lg border border-slate-200 hover:border-brand-rust/40 hover:shadow-xs transition block group"
                                            >
                                                <h3 className="font-bold text-sm text-slate-900 group-hover:text-brand-rust transition mb-1">{proj.title}</h3>
                                                {proj.summary && <p className="text-xs text-slate-600 line-clamp-2">{proj.summary}</p>}
                                                {proj.locations && (
                                                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-2">
                                                        <MapPin className="w-3 h-3 text-brand-rust" />
                                                        <span>{Array.isArray(proj.locations) ? proj.locations.join(', ') : proj.locations}</span>
                                                    </div>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4 space-y-6">
                            {/* Related Resources / Reports */}
                            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 border-b border-slate-100 pb-2">
                                    Related Publications
                                </h3>
                                {relatedResources && relatedResources.length > 0 ? (
                                    <div className="space-y-4">
                                        {relatedResources.map((res, i) => (
                                            <Link
                                                key={res.slug || i}
                                                href={`/resources/${res.slug}`}
                                                className="block p-3 rounded-lg bg-slate-50 hover:bg-brand-rust-light transition group"
                                            >
                                                <span className="text-[10px] font-bold text-brand-rust uppercase tracking-wider block mb-1">
                                                    {res.type || 'Resource'}
                                                </span>
                                                <h4 className="text-xs font-bold text-slate-900 group-hover:text-brand-rust transition leading-snug">
                                                    {res.title}
                                                </h4>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-slate-500">Related publications will appear here as they are published.</p>
                                )}
                            </div>

                            {/* Contact Box */}
                            <div className="bg-brand-dark rounded-xl p-6 text-white shadow-md">
                                <h3 className="text-base font-bold text-brand-amber mb-2">Engage Our Team</h3>
                                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                    Interested in collaborating, seeking legal guidance, or requesting an intervention under this thematic area?
                                </p>
                                <Link
                                    href="/contact"
                                    className="w-full btn-primary text-xs py-2.5 block text-center"
                                >
                                    Contact Program Lead
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
}
