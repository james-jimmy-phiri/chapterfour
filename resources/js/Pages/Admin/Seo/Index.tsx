import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Globe, Save, Search, Share2, CheckCircle2,
    ExternalLink, Eye, Shield, Sparkles, FileText
} from 'lucide-react';

interface PageSeoData {
    key: string;
    name: string;
    url: string;
    meta_title: string;
    meta_description: string;
    canonical_url: string;
    og_title: string;
    og_description: string;
    og_image: string;
    robots: string;
}

interface SeoProps {
    pages: Record<string, PageSeoData>;
    globalSettings: {
        meta_title_suffix: string;
        google_analytics_id: string;
        default_og_image: string;
        sitemap_url: string;
        robots_url: string;
    };
}

export default function SeoIndex({ pages, globalSettings }: SeoProps) {
    const pageKeys = Object.keys(pages);
    const [selectedKey, setSelectedKey] = useState<string>(pageKeys[0] || 'home');

    const currentPage = pages[selectedKey] || {
        key: selectedKey,
        name: 'Page',
        url: '/',
        meta_title: '',
        meta_description: '',
        canonical_url: '',
        og_title: '',
        og_description: '',
        og_image: '',
        robots: 'index,follow',
    };

    const { data, setData, post, processing, errors } = useForm<{
        meta_title: string;
        meta_description: string;
        canonical_url: string;
        og_title: string;
        og_description: string;
        og_image: string;
        og_image_file: File | null;
        robots: string;
    }>({
        meta_title: currentPage.meta_title,
        meta_description: currentPage.meta_description,
        canonical_url: currentPage.canonical_url,
        og_title: currentPage.og_title,
        og_description: currentPage.og_description,
        og_image: currentPage.og_image,
        og_image_file: null,
        robots: currentPage.robots,
    });

    const handleSelectPage = (key: string) => {
        setSelectedKey(key);
        const p = pages[key];
        setData({
            meta_title: p.meta_title,
            meta_description: p.meta_description,
            canonical_url: p.canonical_url,
            og_title: p.og_title,
            og_description: p.og_description,
            og_image: p.og_image,
            og_image_file: null,
            robots: p.robots,
        });
    };

    const handleSavePage = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(`/admin/seo/pages/${selectedKey}`, data as any, {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout
            header="SEO & Search Discovery"
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin' },
                { label: 'SEO Manager' },
            ]}
        >
            <Head title="SEO & Search Engine Metadata - Chapter Four CMS" />

            <div className="space-y-6 max-w-7xl">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Globe className="w-6 h-6 text-brand-rust" />
                            Search Engine Optimization (SEO) & Social Sharing
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Control how Chapter Four ranks on Google, displays in search results, and renders on Facebook, LinkedIn, and X.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <a
                            href={globalSettings.sitemap_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-white/10 transition"
                        >
                            <ExternalLink className="w-3.5 h-3.5 text-brand-rust" /> View Sitemap.xml
                        </a>
                        <a
                            href={globalSettings.robots_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-white/10 transition"
                        >
                            <ExternalLink className="w-3.5 h-3.5 text-brand-rust" /> Robots.txt
                        </a>
                    </div>
                </div>

                {/* Main 2-column Layout: Page Selector & Preview */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Page Tabs (4 cols) */}
                    <div className="lg:col-span-4 space-y-3">
                        <div className="p-3 bg-white dark:bg-[#0a0e1a] rounded-xl border border-slate-200 dark:border-white/10 shadow-xs">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
                                Site Pages
                            </h3>
                            <div className="space-y-1">
                                {pageKeys.map((key) => {
                                    const p = pages[key];
                                    const isActive = selectedKey === key;
                                    return (
                                        <button
                                            key={key}
                                            type="button"
                                            onClick={() => handleSelectPage(key)}
                                            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium transition flex items-center justify-between cursor-pointer ${
                                                isActive
                                                    ? 'bg-brand-rust text-white font-semibold shadow-xs'
                                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                                            }`}
                                        >
                                            <span>{p.name}</span>
                                            <span className={`text-[10px] font-mono ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                                                {p.url}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Search Discovery Status Card */}
                        <div className="p-4 bg-brand-dark text-white rounded-xl border border-white/10 shadow-xs space-y-3">
                            <div className="flex items-center gap-2 text-brand-amber text-xs font-bold uppercase tracking-wider">
                                <Sparkles className="w-4 h-4" /> Discovery Health
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                Chapter Four XML Sitemap dynamically registers 20+ constitutional pages, field reports, and thematic areas.
                            </p>
                            <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400">
                                Status: <span className="text-emerald-400 font-semibold">Active & Crawlable</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: SEO Form & Live Previews (8 cols) */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Live Google Search Preview Card */}
                        <div className="p-5 rounded-xl bg-white dark:bg-[#0a0e1a] border border-slate-200 dark:border-white/10 shadow-xs">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                                <Search className="w-4 h-4 text-brand-rust" /> Google Search SERP Preview
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5 max-w-xl">
                                <div className="text-[11px] text-slate-600 dark:text-slate-400 truncate font-mono">
                                    https://chapterfourmw.org{currentPage.url}
                                </div>
                                <h3 className="text-base text-blue-700 dark:text-blue-400 hover:underline font-medium cursor-pointer truncate mt-0.5">
                                    {data.meta_title || 'Chapter Four — Defending Constitutional Rights'}
                                </h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                                    {data.meta_description || 'Chapter Four is a non-partisan public interest legal organization defending constitutional rights in Malawi.'}
                                </p>
                            </div>
                        </div>

                        {/* SEO Form */}
                        <form onSubmit={handleSavePage} className="p-6 rounded-xl bg-white dark:bg-[#0a0e1a] border border-slate-200 dark:border-white/10 shadow-xs space-y-5 text-xs">
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
                                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                                    Edit Metadata: {currentPage.name}
                                </h3>
                                <span className="font-mono text-[11px] text-slate-400">Path: {currentPage.url}</span>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <label className="font-semibold text-slate-700 dark:text-slate-300">
                                        Meta Title (Browser Tab & Search Headline) *
                                    </label>
                                    <span className={`text-[10px] ${data.meta_title.length > 60 ? 'text-amber-500' : 'text-slate-400'}`}>
                                        {data.meta_title.length}/60 recommended chars
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={data.meta_title}
                                    onChange={(e) => setData('meta_title', e.target.value)}
                                    placeholder="Page title displayed in search engines"
                                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <label className="font-semibold text-slate-700 dark:text-slate-300">
                                        Meta Description (Search Snippet) *
                                    </label>
                                    <span className={`text-[10px] ${data.meta_description.length > 160 ? 'text-amber-500' : 'text-slate-400'}`}>
                                        {data.meta_description.length}/160 recommended chars
                                    </span>
                                </div>
                                <textarea
                                    rows={3}
                                    required
                                    value={data.meta_description}
                                    onChange={(e) => setData('meta_description', e.target.value)}
                                    placeholder="Enter a compelling summary that encourages click-throughs in search results..."
                                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                        Canonical URL
                                    </label>
                                    <input
                                        type="text"
                                        value={data.canonical_url}
                                        onChange={(e) => setData('canonical_url', e.target.value)}
                                        placeholder="https://chapterfourmw.org/..."
                                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-brand-rust"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                        Robots Indexing Directive
                                    </label>
                                    <select
                                        value={data.robots}
                                        onChange={(e) => setData('robots', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                    >
                                        <option value="index,follow">index, follow (Default - Allow search crawlers)</option>
                                        <option value="noindex,nofollow">noindex, nofollow (Private - Block all engines)</option>
                                        <option value="noindex,follow">noindex, follow (Hide page, follow links)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Social Sharing (OpenGraph) Fields */}
                            <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-4">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                                    <Share2 className="w-4 h-4 text-brand-rust" /> OpenGraph & Social Sharing Card
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                            Social Card Title
                                        </label>
                                        <input
                                            type="text"
                                            value={data.og_title}
                                            onChange={(e) => setData('og_title', e.target.value)}
                                            placeholder="Defaults to Meta Title"
                                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                            Upload Social Share Image (1200x630px)
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setData('og_image_file', e.target.files?.[0] || null)}
                                            className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-rust file:text-white cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2.5 rounded-xl bg-brand-rust hover:bg-brand-rust-dark text-white text-xs font-semibold shadow-md shadow-brand-rust/20 transition flex items-center gap-2 cursor-pointer"
                                >
                                    <Save className="w-4 h-4" /> Save SEO Metadata
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
