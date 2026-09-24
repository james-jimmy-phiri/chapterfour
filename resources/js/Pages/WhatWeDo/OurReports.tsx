import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    FileText, Download, ArrowRight, BookOpen,
    Search, Users, Globe, Megaphone, Layers, Filter
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';

const crossCuttingAreas = [
    {
        icon: Search,
        label: "Research & Knowledge Management",
        description: "Baseline studies, thematic research, policy analysis, publications, documentation and knowledge-sharing",
        color: "text-brand-rust",
        bg: "bg-brand-rust/10",
    },
    {
        icon: Megaphone,
        label: "Advocacy & Campaigns",
        description: "Public campaigns, media engagement, petitions, policy dialogues and stakeholder advocacy",
        color: "text-amber-700",
        bg: "bg-amber-50",
    },
    {
        icon: Users,
        label: "Capacity Building",
        description: "Training of communities, duty bearers, CSOs, youth, women and community leaders",
        color: "text-emerald-700",
        bg: "bg-emerald-50",
    },
    {
        icon: Layers,
        label: "Monitoring, Evaluation & Learning",
        description: "Programme monitoring, outcome tracking, learning reviews and impact assessments",
        color: "text-slate-700",
        bg: "bg-slate-100",
    },
    {
        icon: Globe,
        label: "Communications & Visibility",
        description: "Website and social media, media partnerships, publications and public information campaigns",
        color: "text-violet-700",
        bg: "bg-violet-50",
    },
    {
        icon: BookOpen,
        label: "Institutional Development",
        description: "Resource mobilization, partnership development, staff capacity, governance strengthening and organizational systems",
        color: "text-teal-700",
        bg: "bg-teal-50",
    },
    {
        icon: Filter,
        label: "Safeguarding & Inclusion",
        description: "Mainstreaming gender, disability inclusion, child protection, safeguarding and non-discrimination across all programmes",
        color: "text-rose-700",
        bg: "bg-rose-50",
    },
];

const typeColors: Record<string, string> = {
    'report': 'bg-brand-rust/10 text-brand-rust border-brand-rust/20',
    'research': 'bg-amber-50 text-amber-700 border-amber-200',
    'policy_brief': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'publication': 'bg-violet-50 text-violet-700 border-violet-200',
    'other': 'bg-slate-100 text-slate-700 border-slate-200',
};

interface Report {
    id: number;
    title: string;
    slug: string;
    type: string;
    excerpt: string;
    published_at: string;
    featured_image: string | null;
    file_url: string | null;
}

export default function OurReports({ reports }: { reports: Report[] }) {
    return (
        <PublicLayout>
            <Head>
                <title>Research, Reports & Publications — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Access Chapter Four Malawi's research reports, policy briefs, legal handbooks, and annual human rights publications. Evidence-based knowledge for rights protection, advocacy and reform."
                />
            </Head>

            {/* ─── HERO SECTION ────────────────────────────────────────────── */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/legal_books.webp"
                        alt="Chapter Four Research & Reports"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/70 to-slate-900/30" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                    {/* Breadcrumbs */}
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-bold uppercase tracking-wider">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span>/</span>
                        <Link href="/what-we-do" className="hover:text-brand-amber transition">What We Do</Link>
                        <span>/</span>
                        <span className="text-brand-amber">Our Reports</span>
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
                            <span className="w-8 h-0.5 bg-brand-amber" /> Research & Knowledge
                        </motion.span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Research, Reports<br />
                            <span className="text-brand-amber">& Publications</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
                            Evidence-based research, policy analysis, legal handbooks, and annual human rights documentation — generating credible knowledge to drive advocacy, litigation support, and policy reform in Malawi.
                        </p>
                    </motion.div>

                    {/* Type chips */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-wrap gap-2 mt-10"
                    >
                        {['Annual Reports', 'Research Papers', 'Policy Briefs', 'Legal Handbooks', 'Country Profiles', 'Press Releases'].map((t) => (
                            <span key={t} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                                {t}
                            </span>
                        ))}
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent" />
            </section>

            {/* ─── KNOWLEDGE GENERATION INTRO ──────────────────────────────── */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-xs font-bold uppercase tracking-widest text-brand-rust block mb-3">Thematic Area 08</span>
                            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-6">
                                Research & Knowledge<br />Generation
                            </h2>
                            <p className="text-slate-500 leading-relaxed text-base mb-5">
                                Chapter Four undertakes rigorous research, assessments, policy analysis and documentation to generate evidence for human rights programming, strategic advocacy and policy reform. Our knowledge products are designed to be accessible, credible, and action-oriented.
                            </p>
                            <p className="text-slate-500 leading-relaxed text-base mb-8">
                                Our publications range from field monitoring reports and baseline surveys to simplified community legal handbooks and high-level policy briefs — each serving a distinct audience and purpose within our broader rights protection mandate.
                            </p>
                            <Link
                                href="/resources"
                                className="inline-flex items-center gap-2 bg-brand-rust hover:bg-brand-rust-dark text-white font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-brand-rust/20 text-sm"
                            >
                                <Search className="w-4 h-4" />
                                Browse All Resources
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <img src="/images/open_book.jpg" alt="Research books" className="rounded-2xl w-full h-52 object-cover shadow-lg" />
                            <img src="/images/legal_books.webp" alt="Legal publications" className="rounded-2xl w-full h-52 object-cover shadow-lg mt-8" />
                            <img src="/images/constitutional_book.jpg" alt="Constitution" className="rounded-2xl w-full h-52 object-cover shadow-lg -mt-4" />
                            <img src="/images/animate-img-2.jpg" alt="Documentation" className="rounded-2xl w-full h-52 object-cover shadow-lg mt-4" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── CROSS-CUTTING THEMATIC AREAS ────────────────────────────── */}
            <section className="py-20 bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-rust block mb-3">Cross-Cutting Work</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                            Mainstreamed Across All Programmes
                        </h2>
                        <p className="text-slate-500 mt-4 leading-relaxed">
                            These seven cross-cutting activities run through every Chapter Four programme — ensuring coherence, learning, and systemic impact across all our work.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {crossCuttingAreas.map((area, idx) => {
                            const Icon = area.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                                    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all group"
                                >
                                    <div className={`w-11 h-11 ${area.bg} rounded-xl flex items-center justify-center mb-4`}>
                                        <Icon className={`w-5 h-5 ${area.color}`} />
                                    </div>
                                    <h3 className="font-bold text-slate-800 text-sm mb-2">{area.label}</h3>
                                    <p className="text-slate-500 text-xs leading-relaxed">{area.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── PUBLICATIONS GRID ───────────────────────────────────────── */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-brand-rust block mb-2">Latest Publications</span>
                            <h2 className="text-3xl font-black text-slate-900">Featured Reports</h2>
                        </div>
                        <Link
                            href="/resources"
                            className="inline-flex items-center gap-2 text-sm font-bold text-brand-rust hover:underline transition-colors shrink-0"
                        >
                            View All Resources <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {reports && reports.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {reports.map((report, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: idx * 0.08 }}
                                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col"
                                >
                                    {/* Image */}
                                    <div className="relative h-52 overflow-hidden shrink-0">
                                        <img
                                            src={report.featured_image || '/images/default_report.jpg'}
                                            alt={report.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            onError={(e) => { e.currentTarget.src = '/images/animate-img-2.jpg'; }}
                                        />
                                        <div className="absolute inset-0 bg-slate-900/25 group-hover:bg-slate-900/10 transition-colors duration-500" />
                                        {/* Hover bar */}
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-rust via-brand-amber to-brand-rust scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${typeColors[report.type] || typeColors['other']}`}>
                                                {report.type.replace('_', ' ')}
                                            </span>
                                            <span className="text-xs font-medium text-slate-400">{new Date(report.published_at).toLocaleDateString()}</span>
                                        </div>

                                        <h3 className="text-base font-bold text-slate-900 mb-3 group-hover:text-brand-rust transition-colors leading-snug line-clamp-2">
                                            {report.title}
                                        </h3>

                                        <p className="text-slate-500 leading-relaxed text-sm mb-6 line-clamp-3 flex-1">
                                            {report.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                                            {report.file_url ? (
                                                <a
                                                    href={report.file_url}
                                                    download
                                                    className="text-brand-rust hover:text-brand-rust-dark font-semibold text-xs flex items-center gap-1.5 transition-colors"
                                                >
                                                    <Download className="w-3.5 h-3.5" />
                                                    <span>Download File</span>
                                                </a>
                                            ) : (
                                                <span className="text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors">
                                                    No file attached
                                                </span>
                                            )}
                                            <Link
                                                href={`/resources/${report.slug}`}
                                                className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-rust group-hover:text-white transition-all"
                                            >
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
                            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-700 mb-2">No Reports Available</h3>
                            <p className="text-slate-500">Check back later for our latest research and publications.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ─── CTA ─────────────────────────────────────────────────────── */}
            <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/images/animate-img-1.jpg" alt="" className="w-full h-full object-cover opacity-10" />
                    <div className="absolute inset-0 bg-slate-900/80" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-brand-amber font-bold tracking-widest uppercase text-sm block mb-4">Knowledge Hub</span>
                        <h2 className="text-3xl sm:text-4xl font-black mb-6 leading-tight">
                            Access Our Full<br />Research Repository
                        </h2>
                        <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                            Browse our comprehensive library of legal briefs, field reports, policy analyses, and civic education resources — all freely available to communities, researchers, and advocates.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/resources"
                                className="inline-flex items-center justify-center gap-2 bg-brand-rust hover:bg-brand-rust-dark text-white font-bold px-8 py-4 rounded-xl transition shadow-xl shadow-brand-rust/30"
                            >
                                <FileText className="w-4 h-4" />
                                <span>All Resources & Publications</span>
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-4 rounded-xl transition backdrop-blur-sm"
                            >
                                <span>Request a Report</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </PublicLayout>
    );
}
