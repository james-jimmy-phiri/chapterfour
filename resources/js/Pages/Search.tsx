import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Search as SearchIcon, FileText, Globe, Briefcase, Users,
    ArrowRight, Sparkles, Filter, Calendar
} from 'lucide-react';

interface SearchProps {
    query: string;
    tab: string;
    results: {
        resources: Array<{ id: number; title: string; slug: string; type: string; excerpt?: string; published_at?: string }>;
        thematicAreas: Array<{ id: number; title: string; slug: string; short_description?: string; icon?: string }>;
        projects: Array<{ id: number; title: string; slug: string; summary?: string }>;
        team: Array<{ id: number; name: string; role: string; department?: string; photo?: string }>;
        vacancies: Array<{ id: number; title: string; department?: string; location?: string; deadline?: string }>;
        total: number;
    };
}

export default function SearchPage({ query: initialQuery = '', tab: initialTab = 'all', results }: SearchProps) {
    const [query, setQuery] = useState(initialQuery);
    const [activeTab, setActiveTab] = useState(initialTab);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/search', { q: query, tab: activeTab }, { preserveState: true });
    };

    const handleTabChange = (t: string) => {
        setActiveTab(t);
        router.get('/search', { q: query, tab: t }, { preserveState: true });
    };

    const tabs = [
        { id: 'all', label: 'All Results', count: results.total },
        { id: 'resources', label: 'News & Publications', count: results.resources.length },
        { id: 'thematic', label: 'Thematic Areas', count: results.thematicAreas.length },
        { id: 'projects', label: 'Field Projects', count: results.projects.length },
        { id: 'team', label: 'Team & Leadership', count: results.team.length },
        { id: 'vacancies', label: 'Vacancies', count: results.vacancies.length },
    ];

    return (
        <PublicLayout>
            <Head title={`Search Results for "${initialQuery}" — Chapter Four`} />

            {/* Header Banner */}
            <div className="relative bg-gradient-to-br from-[#1a0e08] via-[#2d150b] to-[#120904] text-white pt-36 pb-16 overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-amber border border-white/15 text-xs font-bold uppercase tracking-wider">
                        <SearchIcon className="w-3.5 h-3.5" />
                        <span>Site Search</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-serif font-extrabold tracking-tight">
                        Search Chapter Four Repository
                    </h1>

                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex items-center bg-white/15 backdrop-blur-md rounded-2xl p-1.5 border border-white/20 shadow-2xl">
                        <SearchIcon className="w-5 h-5 text-slate-300 ml-3 shrink-0" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search legal advisories, reports, thematic areas, projects, or team..."
                            className="bg-transparent border-none text-white placeholder-slate-300 text-sm px-3 py-2.5 w-full focus:ring-0 focus:outline-none"
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="bg-brand-rust hover:bg-brand-rust-dark text-white text-xs font-bold py-2.5 px-6 rounded-xl transition shrink-0"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>

            {/* Results Section */}
            <div className="py-12 bg-slate-50 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
                    {/* Tabs */}
                    <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
                        {tabs.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => handleTabChange(t.id)}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                                    activeTab === t.id
                                        ? 'bg-brand-rust text-white shadow-xs'
                                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                                }`}
                            >
                                <span>{t.label}</span>
                                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === t.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                    {t.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Summary Line */}
                    {initialQuery && (
                        <p className="text-xs text-slate-500">
                            Found <strong className="text-slate-900">{results.total}</strong> results matching "<span className="text-brand-rust font-semibold">{initialQuery}</span>"
                        </p>
                    )}

                    {results.total === 0 ? (
                        <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 p-8">
                            <SearchIcon className="w-12 h-12 mx-auto text-slate-400 mb-3 opacity-40" />
                            <h3 className="font-serif font-bold text-slate-800 text-lg">No matching results found</h3>
                            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                                Check your spelling or try broader terms like "constitutional", "rights", "paralegal", or "governance".
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Resources Matches */}
                            {(activeTab === 'all' || activeTab === 'resources') && results.resources.length > 0 && (
                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                        <FileText className="w-3.5 h-3.5 text-brand-rust" /> Publications & News ({results.resources.length})
                                    </h3>
                                    <div className="space-y-2">
                                        {results.resources.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/resources/${item.slug}`}
                                                className="block p-4 rounded-xl bg-white border border-slate-200 hover:border-brand-rust hover:shadow-md transition group"
                                            >
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="px-2 py-0.5 rounded bg-brand-rust/10 text-brand-rust text-[10px] font-bold uppercase tracking-wider">
                                                        {item.type.replace('_', ' ')}
                                                    </span>
                                                    {item.published_at && (
                                                        <span className="text-[11px] text-slate-400">
                                                            {new Date(item.published_at).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                                <h4 className="font-serif font-bold text-slate-900 text-sm group-hover:text-brand-rust transition-colors">
                                                    {item.title}
                                                </h4>
                                                {item.excerpt && (
                                                    <p className="text-slate-600 text-xs mt-1 line-clamp-2">
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
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                        <Globe className="w-3.5 h-3.5 text-brand-rust" /> Thematic Areas ({results.thematicAreas.length})
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {results.thematicAreas.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/what-we-do/${item.slug}`}
                                                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-brand-rust hover:shadow-md transition group flex flex-col justify-between"
                                            >
                                                <div>
                                                    <h4 className="font-serif font-bold text-slate-900 text-sm group-hover:text-brand-rust transition-colors">
                                                        {item.title}
                                                    </h4>
                                                    {item.short_description && (
                                                        <p className="text-slate-600 text-xs mt-1 line-clamp-2">
                                                            {item.short_description}
                                                        </p>
                                                    )}
                                                </div>
                                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-rust mt-3">
                                                    View Thematic Pillar <ArrowRight className="w-3 h-3" />
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Projects Matches */}
                            {(activeTab === 'all' || activeTab === 'projects') && results.projects.length > 0 && (
                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                        <Briefcase className="w-3.5 h-3.5 text-brand-rust" /> Field Projects ({results.projects.length})
                                    </h3>
                                    <div className="space-y-2">
                                        {results.projects.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/projects/${item.slug}`}
                                                className="block p-4 rounded-xl bg-white border border-slate-200 hover:border-brand-rust hover:shadow-md transition group"
                                            >
                                                <h4 className="font-serif font-bold text-slate-900 text-sm group-hover:text-brand-rust transition-colors">
                                                    {item.title}
                                                </h4>
                                                {item.summary && (
                                                    <p className="text-slate-600 text-xs mt-1 line-clamp-2">
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
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                        <Users className="w-3.5 h-3.5 text-brand-rust" /> Leadership & Team ({results.team.length})
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {results.team.map((item) => (
                                            <Link
                                                key={item.id}
                                                href="/about/our-team"
                                                className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-brand-rust transition flex items-center gap-3"
                                            >
                                                {item.photo ? (
                                                    <img src={item.photo} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-brand-rust/10 text-brand-rust font-bold flex items-center justify-center text-xs">
                                                        {item.name.charAt(0)}
                                                    </div>
                                                )}
                                                <div>
                                                    <h4 className="font-bold text-slate-900 text-xs">{item.name}</h4>
                                                    <p className="text-[11px] text-slate-500">{item.role}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Vacancies Matches */}
                            {(activeTab === 'all' || activeTab === 'vacancies') && results.vacancies.length > 0 && (
                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                        <Briefcase className="w-3.5 h-3.5 text-brand-rust" /> Open Vacancies ({results.vacancies.length})
                                    </h3>
                                    <div className="space-y-2">
                                        {results.vacancies.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/about/vacancies/${item.id}`}
                                                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-brand-rust transition flex items-center justify-between group"
                                            >
                                                <div>
                                                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-brand-rust transition-colors">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-[11px] text-slate-500 mt-0.5">
                                                        {item.department} • {item.location}
                                                    </p>
                                                </div>
                                                <span className="text-xs font-bold text-brand-rust flex items-center gap-1">
                                                    Apply <ArrowRight className="w-3 h-3" />
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
