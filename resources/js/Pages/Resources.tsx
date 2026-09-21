import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, Calendar, Search, Filter, ArrowRight,
    Download, ChevronRight, BookOpen, AlertCircle, X,
    ArrowUpRight
} from 'lucide-react';

interface ResourceItem {
    id?: number;
    title: string;
    slug: string;
    type?: string;
    excerpt?: string;
    published_at?: string;
    pdf_path?: string;
    featured_image?: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface ResourcesProps {
    resources?: {
        data?: ResourceItem[];
        links?: PaginationLink[];
        total?: number;
        current_page?: number;
        last_page?: number;
    } | ResourceItem[];
    filters?: {
        type?: string;
        search?: string;
    };
}

const defaultResourcesList: ResourceItem[] = [
    {
        id: 1,
        title: 'State of Constitutional Rights in Malawi: Annual Barometer',
        slug: 'state-of-constitutional-rights-barometer',
        type: 'Report',
        excerpt: 'A comprehensive national assessment of civil liberties, civic participation, and access to justice across all 28 districts.',
        published_at: 'Oct 14, 2025',
    },
    {
        id: 2,
        title: 'Joint Statement on Freedom of Peaceful Assembly & Civic Space',
        slug: 'joint-statement-peaceful-assembly',
        type: 'Statement',
        excerpt: 'Chapter Four alongside civil society partners urge law enforcement to uphold constitutional protections under Section 38.',
        published_at: 'Nov 02, 2025',
    },
    {
        id: 3,
        title: 'Community Paralegal Handbook: Bail, Police Custody & Fair Trial',
        slug: 'community-paralegal-handbook',
        type: 'Publication',
        excerpt: 'A practical, field-tested guide for grassroots paralegals and human rights defenders defending accused citizens.',
        published_at: 'Sep 28, 2025',
    },
    {
        id: 4,
        title: 'Policy Brief: Transparent Governance & Local Authority Accountability',
        slug: 'policy-brief-transparent-governance',
        type: 'Research',
        excerpt: 'Analyzing the procedural and legal barriers preventing grassroots communities from auditing municipal and district expenditures.',
        published_at: 'Aug 19, 2025',
    },
    {
        id: 5,
        title: 'Press Release: Defending the Independence of the Human Rights Commission',
        slug: 'press-release-human-rights-commission',
        type: 'Press Release',
        excerpt: 'Urging state institutions to respect statutory autonomy, adequate funding, and prompt execution of human rights directives.',
        published_at: 'Jul 11, 2025',
    },
    {
        id: 6,
        title: 'Monitoring Report: Pre-Trial Detention Standards in Subordinate Courts',
        slug: 'monitoring-report-pretrial-detention',
        type: 'Report',
        excerpt: 'Documenting systemic over-detention, bail delays, and unrepresented accused persons in rural magistrates courts.',
        published_at: 'Jun 05, 2025',
    },
];

const resourceTypes = [
    { label: 'All Resources', value: 'All' },
    { label: 'Field Reports', value: 'reports' },
    { label: 'Legal Statements', value: 'statements' },
    { label: 'Press Releases', value: 'press-releases' },
    { label: 'Publications & Guides', value: 'publications' },
    { label: 'Empirical Research', value: 'research' },
];

const images = [
    "/images/animate-img-3.jpg",
    "/images/hero-bg.jpg",
    "/images/child-hero.png",
    "/images/animate-img-1.jpg",
    "/images/animate-img-2.jpg",
    "/images/animate-img-3.jpg",
];

const formatDate = (dateString?: string) => {
    if (!dateString) return 'Recent';
    try {
        const d = new Date(dateString);
        if (isNaN(d.getTime())) return dateString; 
        return d.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    } catch {
        return dateString;
    }
};

export default function Resources({ resources, filters = {} }: ResourcesProps) {
    const isPaginator = resources && !Array.isArray(resources) && 'data' in resources;
    const items: ResourceItem[] = isPaginator
        ? (resources as any).data || []
        : Array.isArray(resources)
        ? resources
        : defaultResourcesList;

    const displayItems = items.length > 0 ? items : defaultResourcesList;
    const paginationLinks = isPaginator ? (resources as any).links || [] : [];
    const totalCount = isPaginator ? (resources as any).total || displayItems.length : displayItems.length;

    const [searchInput, setSearchInput] = useState(filters.search || '');
    const activeType = filters.type || 'All';

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.visit('/resources', {
            data: {
                search: searchInput,
                type: activeType !== 'All' ? activeType : undefined,
            },
            preserveState: true,
            replace: true,
        });
    };

    const handleTypeSelect = (typeValue: string) => {
        router.visit('/resources', {
            data: {
                type: typeValue !== 'All' ? typeValue : undefined,
                search: searchInput || undefined,
            },
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        setSearchInput('');
        router.visit('/resources', { replace: true });
    };

    return (
        <PublicLayout>
            <Head>
                <title>Resources & Publications — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Browse Chapter Four's comprehensive repository of constitutional legal briefs, research reports, field statements, and civic education publications."
                />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/hero-bg.jpg"
                        alt="Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-300 mb-6 font-semibold uppercase tracking-wider">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span className="text-slate-500">›</span>
                        <span className="text-brand-amber">Resources</span>
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <span className="text-brand-amber font-bold tracking-widest uppercase mb-4 block flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-brand-amber"></span> Publications
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Resources & Reports
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                            Chapter Four advances credible, evidence-based human rights protections through independent monitoring, legal research, and public reports.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Catalogue */}
            <main className="py-20 bg-slate-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar Filters */}
                        <aside className="w-full lg:w-80 shrink-0">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 sticky top-32">
                                {/* Search Filter */}
                                <div className="mb-10">
                                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Search className="w-4 h-4 text-brand-rust" /> Search
                                    </h3>
                                    <form onSubmit={handleSearch} className="relative group">
                                        <input
                                            type="text"
                                            placeholder="Keywords..."
                                            value={searchInput}
                                            onChange={(e) => setSearchInput(e.target.value)}
                                            className="w-full pl-4 pr-10 py-3.5 text-sm bg-slate-50 rounded-xl border border-transparent focus:border-brand-rust focus:bg-white focus:ring-4 focus:ring-brand-rust/10 outline-none transition-all duration-300"
                                        />
                                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-rust transition-colors p-1">
                                            <Search className="w-4 h-4" />
                                        </button>
                                    </form>
                                </div>

                                {/* Resource Type Category Pills */}
                                <div>
                                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Filter className="w-4 h-4 text-brand-rust" /> Categories
                                    </h3>
                                    <div className="space-y-2">
                                        {resourceTypes.map((type) => {
                                            const isSelected = activeType.toLowerCase() === type.value.toLowerCase();
                                            return (
                                                <button
                                                    key={type.value}
                                                    type="button"
                                                    onClick={() => handleTypeSelect(type.value)}
                                                    className={`w-full text-left px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-between ${
                                                        isSelected
                                                            ? 'bg-brand-rust text-white shadow-md shadow-brand-rust/20 translate-x-1'
                                                            : 'bg-transparent text-slate-600 hover:bg-slate-50 hover:text-brand-rust hover:translate-x-1'
                                                    }`}
                                                >
                                                    <span>{type.label}</span>
                                                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-brand-amber" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Reset Button */}
                                <AnimatePresence>
                                    {(searchInput || activeType !== 'All') && (
                                        <motion.button
                                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                            animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                            type="button"
                                            onClick={clearFilters}
                                            className="w-full text-center py-3 text-sm font-bold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center gap-2 transition-colors overflow-hidden"
                                        >
                                            <X className="w-4 h-4" />
                                            <span>Clear Filters</span>
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>
                        </aside>

                        {/* Catalogue Grid */}
                        <div className="flex-1 min-w-0">
                            {/* Status bar */}
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
                                <span className="text-slate-500 font-medium text-sm">Showing <strong className="text-slate-900 font-black">{totalCount}</strong> resources</span>
                                {activeType !== 'All' && (
                                    <span className="bg-brand-rust/10 text-brand-rust px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-[10px]">
                                        {activeType}
                                    </span>
                                )}
                            </div>

                            {/* Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {displayItems.map((item, idx) => {
                                    const imageSrc = item.featured_image || images[idx % images.length];
                                    return (
                                        <motion.article
                                            key={item.slug || idx}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                                            className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full"
                                        >
                                            <Link href={`/resources/${item.slug}`} className="relative h-56 block overflow-hidden shrink-0">
                                                <img
                                                    src={imageSrc}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                <div className="absolute top-4 left-4">
                                                    <span className="inline-block bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-wider shadow-sm">
                                                        {item.type || 'Publication'}
                                                    </span>
                                                </div>
                                            </Link>

                                            <div className="p-6 sm:p-8 flex flex-col flex-grow relative">
                                                <div className="flex items-center gap-2 text-xs font-semibold text-brand-rust mb-4 uppercase tracking-wider">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <span>{formatDate(item.published_at)}</span>
                                                </div>

                                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-rust transition-colors leading-snug">
                                                    <Link href={`/resources/${item.slug}`}>
                                                        {item.title}
                                                    </Link>
                                                </h2>

                                                {item.excerpt && (
                                                    <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                                                        {item.excerpt}
                                                    </p>
                                                )}

                                                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                                    <Link
                                                        href={`/resources/${item.slug}`}
                                                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-50 hover:bg-brand-rust text-slate-700 hover:text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 group/btn"
                                                    >
                                                        <span>Read More</span>
                                                        <ArrowUpRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                                    </Link>
                                                    {item.pdf_path && (
                                                        <a
                                                            href={item.pdf_path}
                                                            download
                                                            className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-rust hover:text-white transition-colors"
                                                            title="Download PDF"
                                                        >
                                                            <Download className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.article>
                                    );
                                })}
                            </div>

                            {/* Pagination */}
                            {paginationLinks.length > 3 && (
                                <div className="mt-16 flex flex-wrap items-center justify-center gap-2">
                                    {paginationLinks.map((link: any, i: number) => (
                                        <Link
                                            key={i}
                                            href={link.url || '#'}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all duration-300 ${
                                                link.active
                                                    ? 'bg-brand-rust text-white shadow-lg shadow-brand-rust/20 scale-110'
                                                    : link.url
                                                    ? 'bg-white text-slate-600 border border-slate-100 hover:border-brand-rust hover:text-brand-rust hover:-translate-y-1'
                                                    : 'bg-transparent text-slate-400 cursor-not-allowed'
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
}
