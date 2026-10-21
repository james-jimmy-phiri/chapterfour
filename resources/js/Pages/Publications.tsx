import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    BookOpen, FileDown, Search, Filter, Calendar,
    ArrowRight, Star, ExternalLink, Shield, FileText
} from 'lucide-react';

interface PublicationItem {
    id: number;
    title: string;
    slug: string;
    type: string;
    excerpt?: string;
    featured_image?: string;
    pdf_path?: string;
    published_at?: string;
}

interface PublicationsProps {
    publications: {
        data: PublicationItem[];
        links: any[];
        total: number;
        current_page: number;
        last_page: number;
    };
    featuredPublications: PublicationItem[];
    filters: {
        category: string;
        search: string;
        year: string;
    };
}

const CATEGORIES = [
    { value: 'all', label: 'All Publications' },
    { value: 'publication', label: 'Statutory Publications' },
    { value: 'report', label: 'Field & Annual Reports' },
    { value: 'policy_brief', label: 'Policy Briefs' },
    { value: 'research', label: 'Legal Research' },
    { value: 'statement', label: 'Legal Statements' },
];

export default function Publications({ publications, featuredPublications = [], filters }: PublicationsProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || 'all');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/publications', { search, category }, { preserveState: true });
    };

    const handleCategoryClick = (cat: string) => {
        setCategory(cat);
        router.get('/publications', { search, category: cat }, { preserveState: true });
    };

    return (
        <PublicLayout>
            <Head title="Publications, Research & Reports — Chapter Four" />

            {/* Hero Header */}
            <div className="relative bg-gradient-to-br from-[#1a0e08] via-[#2d150b] to-[#120904] text-white pt-36 pb-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d95b38_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-amber border border-white/15 text-xs font-bold uppercase tracking-wider mb-4">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Constitutional Research & Knowledge Repository</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight leading-tight mb-4 max-w-3xl">
                        Publications, Strategic Reports & Legal Analysis
                    </h1>

                    <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                        Access official Chapter Four publications, constitutional monitors, policy submissions, and evidence-based human rights field research.
                    </p>

                    {/* Quick Search */}
                    <form onSubmit={handleSearch} className="mt-8 max-w-xl flex items-center bg-white/10 backdrop-blur-md rounded-2xl p-1.5 border border-white/20">
                        <Search className="w-5 h-5 text-slate-400 ml-3" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search publications by title or topic..."
                            className="bg-transparent border-none text-white placeholder-slate-400 text-sm px-3 py-2 w-full focus:ring-0 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-brand-rust hover:bg-brand-rust-dark text-white text-xs font-bold py-2.5 px-5 rounded-xl transition shrink-0"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="py-16 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => handleCategoryClick(cat.value)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                                    category === cat.value
                                        ? 'bg-brand-rust text-white shadow-md shadow-brand-rust/20'
                                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Featured Publications Showcase */}
                    {featuredPublications.length > 0 && category === 'all' && !search && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
                                <Star className="w-4 h-4 text-brand-rust fill-brand-rust" /> Featured Releases
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {featuredPublications.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                                    >
                                        <div className="h-48 overflow-hidden bg-slate-900 relative">
                                            {item.featured_image ? (
                                                <img src={item.featured_image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-rust to-brand-mahogany text-white">
                                                    <BookOpen className="w-12 h-12 opacity-40" />
                                                </div>
                                            )}
                                            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-xs text-[10px] font-bold text-brand-rust uppercase tracking-wider">
                                                Featured Report
                                            </span>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                            <div>
                                                <span className="text-[11px] font-mono text-slate-400 uppercase">
                                                    {item.type.replace('_', ' ')}
                                                </span>
                                                <h3 className="font-serif font-bold text-slate-900 text-base mt-1 line-clamp-2 group-hover:text-brand-rust transition-colors">
                                                    {item.title}
                                                </h3>
                                                {item.excerpt && (
                                                    <p className="text-slate-600 text-xs mt-2 line-clamp-2 leading-relaxed">
                                                        {item.excerpt}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                                <Link
                                                    href={`/resources/${item.slug}`}
                                                    className="text-xs font-bold text-brand-rust hover:text-brand-rust-dark flex items-center gap-1"
                                                >
                                                    Read Abstract <ArrowRight className="w-3 h-3" />
                                                </Link>
                                                {item.pdf_path && (
                                                    <a
                                                        href={item.pdf_path}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-rust/10 text-brand-rust text-xs font-semibold hover:bg-brand-rust/20 transition"
                                                    >
                                                        <FileDown className="w-3.5 h-3.5" /> PDF
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* All Publications Grid */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-serif font-bold text-slate-900">
                                {category === 'all' ? 'All Repository Documents' : CATEGORIES.find(c => c.value === category)?.label}
                            </h2>
                            <span className="text-xs text-slate-500 font-medium">
                                Showing {publications.data.length} of {publications.total} items
                            </span>
                        </div>

                        {publications.data.length === 0 ? (
                            <div className="py-20 text-center bg-white rounded-2xl border border-slate-200">
                                <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-2 opacity-50" />
                                <h3 className="font-semibold text-slate-700 text-sm">No documents found</h3>
                                <p className="text-xs text-slate-500 mt-1">Try switching categories or clearing search keywords.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {publications.data.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-4"
                                    >
                                        <div className="space-y-2.5">
                                            <div className="flex items-center justify-between">
                                                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                                                    {item.type.replace('_', ' ')}
                                                </span>
                                                {item.published_at && (
                                                    <span className="text-[11px] text-slate-400">
                                                        {new Date(item.published_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                                                    </span>
                                                )}
                                            </div>

                                            <Link href={`/resources/${item.slug}`}>
                                                <h3 className="font-serif font-bold text-slate-900 text-base hover:text-brand-rust transition-colors line-clamp-2">
                                                    {item.title}
                                                </h3>
                                            </Link>

                                            {item.excerpt && (
                                                <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                                                    {item.excerpt}
                                                </p>
                                            )}
                                        </div>

                                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                            <Link
                                                href={`/resources/${item.slug}`}
                                                className="text-xs font-semibold text-slate-700 hover:text-brand-rust flex items-center gap-1"
                                            >
                                                Details <ArrowRight className="w-3 h-3" />
                                            </Link>

                                            {item.pdf_path ? (
                                                <a
                                                    href={item.pdf_path}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-rust text-white text-xs font-semibold hover:bg-brand-rust-dark transition shadow-xs"
                                                >
                                                    <FileDown className="w-3.5 h-3.5" /> Download
                                                </a>
                                            ) : (
                                                <span className="text-[11px] text-slate-400">Full Text Online</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination Links */}
                        {publications.links && publications.links.length > 3 && (
                            <div className="pt-8 flex justify-center gap-1">
                                {publications.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                                            link.active
                                                ? 'bg-brand-rust text-white shadow-xs'
                                                : link.url
                                                ? 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                                                : 'text-slate-400 pointer-events-none'
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
