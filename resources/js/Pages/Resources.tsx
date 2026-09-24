import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, Search, ChevronLeft, ChevronRight, X, ExternalLink
} from 'lucide-react';

// Extended Interface to support new filters
interface ResourceItem {
    id?: number;
    title: string;
    slug: string;
    type?: string;
    author?: string;
    tags?: string[];
    year?: string;
    published_at?: string;
    excerpt?: string;
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
        type?: string[];
        author?: string[];
        tags?: string[];
        year?: string[];
        search?: string;
        sort?: string;
    };
    filterCategories?: {
        id: string;
        title: string;
        options: { label: string; value: string; count: number }[];
    }[];
}

// Single Placeholder image to use when an image is missing or broken
const PLACEHOLDER_IMAGE = "/images/hero-bg.jpg";

// Dummy data
const defaultResourcesList: ResourceItem[] = [
    {
        id: 1,
        title: 'AT THE FOOT OF A NEW MOUNTAIN',
        slug: 'at-the-foot-of-a-new-mountain',
        type: 'Report',
        author: 'Chisankho Watch',
        year: '2025',
        excerpt: 'A comprehensive national assessment of civil liberties, civic participation, and access to justice across all 28 districts during the pre-election phase.',
        published_at: '2025-12-04',
        featured_image: '/images/animate-img-1.jpg',
    },
    {
        id: 2,
        title: "One of Seventeen: Malawi's 2025 Gender Gap from Wards to State House: A data-driven look at who runs by level, region, and party.",
        slug: 'one-of-seventeen-malawi-gender-gap',
        type: 'Article/OP-ED',
        author: 'Chikondi Basikolo',
        year: '2025',
        excerpt: 'Analyzing the severe gender disparity in political representation ahead of the 2025 tripartite elections, focusing on structural barriers preventing women from participating.',
        published_at: '2025-11-10',
        featured_image: '/images/animate-img-2.jpg',
    },
    {
        id: 3,
        title: 'Manipulated Might: How Politicians Exploit Youth in Elections',
        slug: 'manipulated-might-politicians-exploit-youth',
        type: 'Article/OP-ED',
        author: 'Frackson Makwangwala & Henry Chilobwe',
        year: '2025',
        excerpt: 'An in-depth look at how political parties utilize youth wings for violence and intimidation rather than empowering them for democratic leadership roles.',
        published_at: '2025-10-30',
        featured_image: '/images/animate-img-3.jpg',
    },
    {
        id: 4,
        title: '2025 Elections Verification Statement',
        slug: '2025-elections-verification-statement',
        type: 'Election Statement',
        author: 'Chisankho Watch',
        year: '2025',
        excerpt: 'Official statement regarding the biometric voter registration verification process, highlighting critical gaps in rural accessibility and network failures.',
        published_at: '2025-09-25',
        featured_image: '/images/paliament.jpg',
    },
    {
        id: 5,
        title: 'Statement on the Voting & Counting Processes',
        slug: 'statement-voting-counting-processes',
        type: 'Election Statement',
        author: 'Chisankho Watch Secretariat',
        year: '2025',
        excerpt: 'Preliminary observations on ballot counting transparency, party monitor intimidation, and the role of electoral officers in dispute resolution at polling centers.',
        published_at: '2025-09-17',
        featured_image: '/images/Chief_Justice.jpg',
    },
    {
        id: 6,
        title: 'ELECTION DAY MID-DAY STATEMENT',
        slug: 'election-day-mid-day-statement',
        type: 'Election Statement',
        author: 'Chisankho Watch',
        year: '2025',
        excerpt: 'Mid-day situational report on voter turnout, logistical challenges, and isolated incidents of unrest reported by our nationwide observer network.',
        published_at: '2025-09-16',
        featured_image: '/images/constitutional_book.jpg',
    },
];


const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
        const d = new Date(dateString);
        if (isNaN(d.getTime())) return dateString;
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    } catch {
        return dateString;
    }
};

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function Resources({ resources, filters = {}, filterCategories = [] }: ResourcesProps) {
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
    
    const toArray = (val: any): string[] => {
        if (!val) return [];
        return Array.isArray(val) ? val.map(String) : [String(val)];
    };

    // Manage checkbox states
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
        type: toArray(filters.type),
        author: toArray(filters.author),
        tags: toArray(filters.tags),
        year: toArray(filters.year),
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    const toggleFilter = (category: string, value: string) => {
        setSelectedFilters(prev => {
            const current = prev[category] || [];
            const updated = current.includes(value) 
                ? current.filter(item => item !== value)
                : [...current, value];
            
            return { ...prev, [category]: updated };
        });
    };

    const applyFilters = () => {
        router.visit('/resources', {
            data: {
                search: searchInput,
                ...selectedFilters
            },
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        setSearchInput('');
        setSelectedFilters({ type: [], author: [], tags: [], year: [] });
        router.visit('/resources', { replace: true });
    };

    const hasActiveFilters = searchInput || Object.values(selectedFilters).some(arr => arr.length > 0);

    return (
        <PublicLayout>
            <Head>
                <title>Resources & Publications — Chapter Four Malawi</title>
                <meta name="description" content="Browse Chapter Four's comprehensive repository of constitutional legal briefs, research reports, field statements, and civic education publications." />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img src="/images/hero-bg.jpg" alt="Background" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-300 mb-6 font-semibold uppercase tracking-wider">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span className="text-slate-500">›</span>
                        <span className="text-brand-amber">Resources</span>
                    </nav>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
                        <span className="text-brand-amber font-bold tracking-widest uppercase mb-4 block flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-brand-amber"></span> Publications
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">Resources & Reports</h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                            Chapter Four advances credible, evidence-based human rights protections through independent monitoring, legal research, and public reports.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Catalogue */}
            <main className="py-10 bg-white relative">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
                    <div className="flex flex-col lg:flex-row gap-8">
                        
                        {/* ── Sidebar Filters ── */}
                        <aside className="w-full lg:w-[260px] shrink-0">
                            <div className="sticky top-28 bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                                
                                {/* Search */}
                                <div className="mb-6">
                                    <h3 className="text-[13px] font-bold text-slate-900 mb-3">Search</h3>
                                    <form onSubmit={handleSearch} className="relative group">
                                        <input
                                            type="text"
                                            placeholder="Search Resources..."
                                            value={searchInput}
                                            onChange={(e) => setSearchInput(e.target.value)}
                                            className="w-full pl-3 pr-8 py-2 text-[13px] bg-slate-50 rounded border border-slate-200 focus:border-slate-400 focus:bg-white focus:ring-0 outline-none transition-all placeholder:text-slate-400"
                                        />
                                        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1">
                                            <Search className="w-3.5 h-3.5" />
                                        </button>
                                    </form>
                                </div>

                                {/* Dynamic Filter Groups */}
                                <div className="space-y-6">
                                    {filterCategories.map((category) => (
                                        <div key={category.id}>
                                            <h3 className="text-[13px] font-bold text-slate-900 mb-3">{category.title}</h3>
                                            <ul className="space-y-2.5">
                                                {category.options.map((opt) => {
                                                    const isChecked = selectedFilters[category.id]?.includes(opt.value);
                                                    return (
                                                        <li key={opt.value} className="flex items-start gap-2">
                                                            <div className="flex items-center h-4 mt-0.5">
                                                                <input
                                                                    id={`filter-${category.id}-${opt.value}`}
                                                                    type="checkbox"
                                                                    checked={isChecked}
                                                                    onChange={() => toggleFilter(category.id, opt.value)}
                                                                    className="w-3.5 h-3.5 rounded-sm border-slate-300 text-slate-800 focus:ring-slate-800 cursor-pointer"
                                                                />
                                                            </div>
                                                            <div className="flex-1 min-w-0 flex justify-between gap-2 items-start">
                                                                <label 
                                                                    htmlFor={`filter-${category.id}-${opt.value}`}
                                                                    className="text-[13px] text-slate-600 hover:text-slate-900 cursor-pointer leading-tight truncate"
                                                                    title={opt.label}
                                                                >
                                                                    {opt.label}
                                                                </label>
                                                                <span className="text-[12px] text-slate-400 shrink-0">({opt.count})</span>
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                {/* Apply / Clear Filters */}
                                <div className="mt-6 flex flex-col gap-2">
                                    <button
                                        type="button"
                                        onClick={applyFilters}
                                        className="w-full py-2.5 text-[13px] font-bold text-white bg-slate-900 hover:bg-slate-800 border border-transparent rounded flex items-center justify-center transition-colors shadow-sm"
                                    >
                                        Apply Filters
                                    </button>
                                    <AnimatePresence>
                                        {hasActiveFilters && (
                                            <motion.button
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                type="button"
                                                onClick={clearFilters}
                                                className="w-full py-2 text-[13px] font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 rounded flex items-center justify-center gap-2 transition-colors"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                                <span>Clear All Filters</span>
                                            </motion.button>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </aside>

                        {/* ── Catalogue Grid ── */}
                        <div className="flex-1 min-w-0">
                            
                            {/* Top Bar: Sort & Count */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-2">
                                <div className="flex items-center gap-3 text-[13px] text-slate-600 mb-2 sm:mb-0">
                                    <span>Sort By</span>
                                    <select className="border-none bg-transparent py-1 pl-0 pr-6 focus:ring-0 text-slate-900 font-semibold cursor-pointer text-[13px]">
                                        <option>Newest</option>
                                        <option>Oldest</option>
                                        <option>A-Z</option>
                                    </select>
                                </div>
                                <div className="text-[13px] text-slate-600">
                                    1-{displayItems.length} of {totalCount} results
                                </div>
                            </div>

                            {/* Cards Grid (3 Columns) */}
                            <motion.div 
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                            >
                                {displayItems.map((item, idx) => {
                                    return (
                                        <motion.article
                                            variants={itemVariants}
                                            key={item.slug || idx}
                                            className="group relative bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full"
                                        >
                                            {/* Image container */}
                                            <Link href={`/resources/${item.slug}`} className="relative h-44 block overflow-hidden shrink-0 bg-slate-100 border-b border-slate-100">
                                                <img
                                                    src={item.featured_image || PLACEHOLDER_IMAGE}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        // Swap to placeholder if the provided link is broken
                                                        e.currentTarget.src = PLACEHOLDER_IMAGE;
                                                    }}
                                                />
                                            </Link>

                                            {/* Content (Reduced Padding) */}
                                            <div className="p-4 flex flex-col flex-grow">
                                                
                                                {/* Date */}
                                                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 mb-2 tracking-wider">
                                                    <Calendar className="w-3 h-3" />
                                                    <span>{formatDate(item.published_at)}</span>
                                                </div>

                                                {/* Title (Max 2 Lines) */}
                                                <h2 className="text-[14px] font-bold text-slate-900 mb-1.5 group-hover:text-slate-600 transition-colors leading-snug line-clamp-2">
                                                    <Link href={`/resources/${item.slug}`} className="focus:outline-none">
                                                        <span className="absolute inset-0" aria-hidden="true" />
                                                        {item.title}
                                                    </Link>
                                                </h2>

                                                {/* Description/Excerpt (Max 3 Lines) */}
                                                <p className="text-[13px] text-slate-500 leading-relaxed mb-4 line-clamp-3 flex-grow">
                                                    {item.excerpt || "Click to view more details about this resource publication."}
                                                </p>

                                                {/* Type Badge */}
                                                <div className="mt-auto pt-3 border-t border-slate-100">
                                                    <span className="inline-block bg-indigo-50/50 text-indigo-700 px-2 py-1 rounded text-[10px] font-semibold tracking-wide">
                                                        {item.type || 'Publication'}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.article>
                                    );
                                })}
                            </motion.div>

                            {/* Pagination */}
                            {paginationLinks.length > 3 && (
                                <div className="mt-10 pt-6 flex flex-wrap items-center justify-center gap-1.5">
                                    {paginationLinks.map((link: any, i: number) => (
                                        <Link
                                            key={i}
                                            href={link.url || '#'}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`min-w-[32px] h-8 flex items-center justify-center px-2 rounded-full font-medium text-[13px] transition-colors ${
                                                link.active
                                                    ? 'bg-slate-900 text-white'
                                                    : link.url
                                                    ? 'bg-transparent text-slate-600 hover:bg-slate-100'
                                                    : 'bg-transparent text-slate-300 cursor-not-allowed'
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