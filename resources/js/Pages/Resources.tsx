import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    FileText, Calendar, Search, Filter, ArrowRight,
    Download, ChevronRight, BookOpen, AlertCircle, X
} from 'lucide-react';

interface ResourceItem {
    id?: number;
    title: string;
    slug: string;
    type?: string;
    excerpt?: string;
    published_at?: string;
    pdf_path?: string;
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

            {/* ─── HERO BANNER (Stitch Replica) ─────────────────────────────── */}
            <section className="hero-pattern text-white pt-12 pb-16 px-4 sm:px-8 border-b border-white/10" data-purpose="hero-banner">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="text-xs text-slate-300 font-semibold mb-3 flex items-center space-x-2 uppercase tracking-wider">
                        <Link className="hover:text-brand-amber transition" href="/">Home</Link>
                        <span className="text-slate-500">›</span>
                        <span className="text-brand-amber">Resources</span>
                    </nav>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
                        Resources & Publications
                    </h1>
                    <p className="text-sm sm:text-base text-slate-200 max-w-2xl font-normal leading-relaxed">
                        Chapter Four advances credible, evidence-based human rights protections and constitutional compliance in Malawi through independent monitoring, legal research, and public reports.
                    </p>
                </div>
            </section>

            {/* ─── MAIN CATALOGUE WITH SIDEBAR FILTERS (Stitch Replica) ─────── */}
            <main className="flex-grow bg-[#fafafa] py-12 px-4 sm:px-8" data-purpose="resources-catalogue">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                    {/* ─── Sidebar Filters ─────────────────────────────────────── */}
                    <aside className="w-full lg:w-64 shrink-0" data-purpose="search-and-filters">
                        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-6">
                            {/* Search Filter */}
                            <div>
                                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">Search</h3>
                                <form onSubmit={handleSearch} className="relative">
                                    <input
                                        type="text"
                                        placeholder="Keywords..."
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 text-xs rounded border border-slate-300 focus:border-brand-rust focus:ring-1 focus:ring-brand-rust outline-none"
                                    />
                                    <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                                </form>
                            </div>

                            {/* Resource Type Category Pills */}
                            <div>
                                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">Resource Type</h3>
                                <div className="space-y-1">
                                    {resourceTypes.map((type) => {
                                        const isSelected = activeType.toLowerCase() === type.value.toLowerCase();
                                        return (
                                            <button
                                                key={type.value}
                                                type="button"
                                                onClick={() => handleTypeSelect(type.value)}
                                                className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition flex items-center justify-between ${
                                                    isSelected
                                                        ? 'bg-brand-rust text-white font-semibold shadow-xs'
                                                        : 'text-slate-700 hover:bg-slate-100 hover:text-brand-rust'
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
                            {(searchInput || activeType !== 'All') && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="w-full text-center py-2 text-xs font-semibold text-slate-500 hover:text-brand-rust border border-dashed border-slate-300 rounded flex items-center justify-center gap-1.5"
                                >
                                    <X className="w-3.5 h-3.5" />
                                    <span>Reset Filters</span>
                                </button>
                            )}
                        </div>
                    </aside>

                    {/* ─── Catalogue Grid & Results ────────────────────────────── */}
                    <div className="flex-1 min-w-0">
                        {/* Status bar */}
                        <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
                            <span>Showing <strong className="text-slate-800">{totalCount}</strong> resources</span>
                            {activeType !== 'All' && (
                                <span className="bg-brand-rust-light text-brand-rust px-2.5 py-0.5 rounded-full font-semibold uppercase text-[10px]">
                                    Filter: {activeType}
                                </span>
                            )}
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {displayItems.map((item, idx) => (
                                <article
                                    key={item.slug || idx}
                                    className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-brand-rust/30 transition group"
                                >
                                    <div className="p-6">
                                        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                                            <span className="bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                                                {item.type || 'Publication'}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5 text-brand-rust" />
                                                <span>{item.published_at || 'Recent'}</span>
                                            </div>
                                        </div>

                                        <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-brand-rust transition">
                                            <Link href={`/resources/${item.slug}`}>
                                                {item.title}
                                            </Link>
                                        </h2>

                                        {item.excerpt && (
                                            <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                                                {item.excerpt}
                                            </p>
                                        )}
                                    </div>

                                    <div className="px-6 pb-5 pt-0 border-t border-slate-100 mt-auto flex items-center justify-between pt-4">
                                        <Link
                                            href={`/resources/${item.slug}`}
                                            className="text-xs font-bold text-brand-rust hover:text-brand-brick inline-flex items-center gap-1"
                                        >
                                            <span>Read Document</span>
                                            <ChevronRight className="w-3.5 h-3.5" />
                                        </Link>
                                        {item.pdf_path && (
                                            <a
                                                href={item.pdf_path}
                                                download
                                                className="text-slate-400 hover:text-brand-rust transition p-1"
                                                title="Download PDF"
                                            >
                                                <Download className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        {paginationLinks.length > 3 && (
                            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                                {paginationLinks.map((link: any, i: number) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-1.5 text-xs rounded border transition ${
                                            link.active
                                                ? 'bg-brand-rust text-white border-brand-rust font-bold'
                                                : link.url
                                                ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                                : 'text-slate-400 border-transparent cursor-not-allowed'
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
}
