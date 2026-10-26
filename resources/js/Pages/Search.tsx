import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    Search as SearchIcon, FileText, Globe, Briefcase, Users,
    ArrowRight, Sparkles, Filter, Calendar, X as ClearIcon
} from 'lucide-react';

interface SearchProps {
    query: string;
    tab: string;
    results: {
        resources: Array<{ id: number; title: string; slug: string; type: string; excerpt?: string; published_at?: string }>;
        thematicAreas: Array<{ id: number; title: string; slug: string; short_description?: string; icon?: string }>;
        projects: Array<{ id: number; title: string; slug: string; summary?: string }>;
        team: Array<{ id: number; name: string; role: string; department?: string; photo?: string }>;
        vacancies: Array<{ id: number; title: string; slug?: string; department?: string; location?: string; deadline?: string }>;
        total: number;
    };
}

const POPULAR_SEARCHES = [
    'Constitutional Rights',
    'Civic Space',
    'Legal Aid',
    'Climate Justice',
    'Human Rights',
    'Rule of Law',
    'Youth Empowerment',
    'Reports'
];

export default function SearchPage({ query: initialQuery = '', tab: initialTab = 'all', results }: SearchProps) {
    const [query, setQuery] = useState(initialQuery);
    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        setQuery(initialQuery);
    }, [initialQuery]);

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    const handleSearch = (e?: React.FormEvent, explicitQuery?: string) => {
        if (e) e.preventDefault();
        const q = explicitQuery !== undefined ? explicitQuery : query;
        router.get('/search', { q: q.trim(), tab: activeTab }, { preserveState: false });
    };

    const handleTabChange = (t: string) => {
        setActiveTab(t);
        router.get('/search', { q: query.trim(), tab: t }, { preserveState: false });
    };

    const handleQuickSearch = (keyword: string) => {
        setQuery(keyword);
        handleSearch(undefined, keyword);
    };

    const tabs = [
        { id: 'all', label: 'All Results', count: results?.total ?? 0 },
        { id: 'resources', label: 'News & Publications', count: results?.resources?.length ?? 0 },
        { id: 'thematic', label: 'Thematic Areas', count: results?.thematicAreas?.length ?? 0 },
        { id: 'projects', label: 'Field Projects', count: results?.projects?.length ?? 0 },
        { id: 'team', label: 'Team & Leadership', count: results?.team?.length ?? 0 },
        { id: 'vacancies', label: 'Vacancies', count: results?.vacancies?.length ?? 0 },
    ];

    return (
        <PublicLayout>
            <Head>
                <title>{initialQuery ? `Search: "${initialQuery}" | Chapter Four Malawi` : 'Search Repository | Chapter Four Malawi'}</title>
                <meta
                    head-key="description"
                    name="description"
                    content={`Search results for "${initialQuery}" across Chapter Four Malawi's human rights repository, reports, thematic areas, and publications.`}
                />
                <meta
                    head-key="robots"
                    name="robots"
                    content="noindex, follow"
                />
            </Head>

            {/* Header Banner */}
            <div className="relative bg-gradient-to-br from-[#1a0e08] via-[#2d150b] to-[#120904] text-white pt-36 pb-16 overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-brand-amber border border-white/15 text-sm font-bold uppercase tracking-wider">
                        <SearchIcon className="w-4 h-4" />
                        <span>Site Search</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold tracking-tight">
                        Search Chapter Four Repository
                    </h1>

                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex items-center bg-white/15 backdrop-blur-md rounded-2xl p-2 border border-white/20 shadow-2xl">
                        <SearchIcon className="w-5 h-5 text-slate-300 ml-3 shrink-0" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search legal advisories, reports, thematic areas, projects, or team..."
                            className="bg-transparent border-none text-white placeholder-slate-300 text-base sm:text-lg px-4 py-2.5 w-full focus:ring-0 focus:outline-none"
                            autoFocus
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => { setQuery(''); }}
                                className="p-1.5 mr-1 text-white/60 hover:text-white transition"
                                title="Clear input"
                            >
                                <ClearIcon className="w-4 h-4" />
                            </button>
                        )}
                        <button
                            type="submit"
                            className="bg-brand-rust hover:bg-brand-rust-dark text-white text-sm sm:text-base font-bold py-3 px-7 rounded-xl transition shrink-0 shadow-sm"
                        >
                            Search
                        </button>
                    </form>

                    {/* Quick Search Suggestions */}
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                        <span className="text-xs text-white/60 font-medium mr-1">Popular:</span>
                        {POPULAR_SEARCHES.map((term) => (
                            <button
                                key={term}
                                type="button"
                                onClick={() => handleQuickSearch(term)}
                                className="text-xs bg-white/10 hover:bg-white/20 text-white/90 px-3 py-1 rounded-full border border-white/10 transition-colors"
                            >
                                {term}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="py-12 bg-slate-50 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
                    {/* Tabs */}
                    <div className="flex flex-wrap items-center gap-2.5 border-b border-slate-200 pb-4">
                        {tabs.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => handleTabChange(t.id)}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2 cursor-pointer ${
                                    activeTab === t.id
                                        ? 'bg-brand-rust text-white shadow-sm'
                                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                                }`}
                            >
                                <span>{t.label}</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === t.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                                    {t.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Summary Line */}
                    {initialQuery && (
                        <p className="text-sm sm:text-base text-slate-600">
                            Found <strong className="text-slate-900">{results?.total ?? 0}</strong> results matching "<span className="text-brand-rust font-semibold">{initialQuery}</span>"
                        </p>
                    )}

                    {!initialQuery ? (
                        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
                            <Sparkles className="w-12 h-12 mx-auto text-brand-rust mb-3 opacity-80" />
                            <h3 className="font-serif font-bold text-slate-900 text-xl">Search the Chapter Four Repository</h3>
                            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-md mx-auto">
                                Type a topic, project name, publication title, or team member name above, or click any of the popular search terms to explore.
                            </p>
                        </div>
                    ) : results.total === 0 ? (
                        <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 p-8">
                            <SearchIcon className="w-12 h-12 mx-auto text-slate-400 mb-3 opacity-40" />
                            <h3 className="font-serif font-bold text-slate-800 text-xl">No matching results found</h3>
                            <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-sm mx-auto">
                                Check your spelling or try broader terms like "constitutional", "rights", "paralegal", or "governance".
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Resources Matches */}
                            {(activeTab === 'all' || activeTab === 'resources') && results.resources.length > 0 && (
                                <div className="space-y-3">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-brand-rust" /> Publications & News ({results.resources.length})
                                    </h3>
                                    <div className="space-y-3">
                                        {results.resources.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/resources/${item.slug}`}
                                                className="block p-4 sm:p-5 rounded-xl bg-white border border-slate-200 hover:border-brand-rust hover:shadow-md transition group"
                                            >
                                                <div className="flex items-center gap-2.5 mb-1.5">
                                                    <span className="px-2.5 py-0.5 rounded bg-brand-rust/10 text-brand-rust text-xs font-bold uppercase tracking-wider">
                                                        {(item.type || 'resource').replace('_', ' ')}
                                                    </span>
                                                    {item.published_at && (
                                                        <span className="text-xs text-slate-500">
                                                            {new Date(item.published_at).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                                <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg group-hover:text-brand-rust transition-colors">
                                                    {item.title}
                                                </h4>
                                                {item.excerpt && (
                                                    <p className="text-slate-600 text-sm sm:text-base mt-1.5 line-clamp-2 leading-relaxed">
                                                        {item.excerpt}
                                                    </p>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Thematic Areas Matches */}
                            {(activeTab === 'all' || activeTab === 'thematic') && results.thematicAreas.length > 0 && (
                                <div className="space-y-3">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-brand-rust" /> Thematic Areas ({results.thematicAreas.length})
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        {results.thematicAreas.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/what-we-do/${item.slug}`}
                                                className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 hover:border-brand-rust hover:shadow-md transition group flex flex-col justify-between"
                                            >
                                                <div>
                                                    <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg group-hover:text-brand-rust transition-colors">
                                                        {item.title}
                                                    </h4>
                                                    {item.short_description && (
                                                        <p className="text-slate-600 text-sm sm:text-base mt-1.5 line-clamp-2 leading-relaxed">
                                                            {item.short_description}
                                                        </p>
                                                    )}
                                                </div>
                                                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-rust mt-3.5">
                                                    View Thematic Pillar <ArrowRight className="w-3.5 h-3.5" />
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Projects Matches */}
                            {(activeTab === 'all' || activeTab === 'projects') && results.projects.length > 0 && (
                                <div className="space-y-3">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-brand-rust" /> Field Projects ({results.projects.length})
                                    </h3>
                                    <div className="space-y-3">
                                        {results.projects.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/projects/${item.slug}`}
                                                className="block p-4 sm:p-5 rounded-xl bg-white border border-slate-200 hover:border-brand-rust hover:shadow-md transition group"
                                            >
                                                <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg group-hover:text-brand-rust transition-colors">
                                                    {item.title}
                                                </h4>
                                                {item.summary && (
                                                    <p className="text-slate-600 text-sm sm:text-base mt-1.5 line-clamp-2 leading-relaxed">
                                                        {item.summary}
                                                    </p>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Team Matches */}
                            {(activeTab === 'all' || activeTab === 'team') && results.team.length > 0 && (
                                <div className="space-y-3">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                                        <Users className="w-4 h-4 text-brand-rust" /> Leadership & Team ({results.team.length})
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        {results.team.map((item) => (
                                            <Link
                                                key={item.id}
                                                href="/about/our-team"
                                                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-brand-rust transition flex items-center gap-3.5"
                                            >
                                                {item.photo ? (
                                                    <img src={item.photo} alt={item.name} className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0" />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-full bg-brand-rust/10 text-brand-rust font-bold flex items-center justify-center text-sm shrink-0">
                                                        {item.name.charAt(0)}
                                                    </div>
                                                )}
                                                <div>
                                                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">{item.name}</h4>
                                                    <p className="text-xs sm:text-sm text-slate-500">{item.role}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Vacancies Matches */}
                            {(activeTab === 'all' || activeTab === 'vacancies') && results.vacancies.length > 0 && (
                                <div className="space-y-3">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-brand-rust" /> Open Vacancies ({results.vacancies.length})
                                    </h3>
                                    <div className="space-y-3">
                                        {results.vacancies.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/about/vacancies/${item.id}`}
                                                className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 hover:border-brand-rust transition flex items-center justify-between group"
                                            >
                                                <div>
                                                    <h4 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-brand-rust transition-colors">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                                        {item.department} • {item.location}
                                                    </p>
                                                </div>
                                                <span className="text-sm font-bold text-brand-rust flex items-center gap-1.5 shrink-0 ml-4">
                                                    Apply <ArrowRight className="w-3.5 h-3.5" />
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
