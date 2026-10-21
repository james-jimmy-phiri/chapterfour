import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { useState } from 'react';
import {
    FileText, Plus, Edit3, Trash2, Search, CheckCircle2,
    ExternalLink, X, Save, Clock, Eye, AlertCircle, Layout
} from 'lucide-react';

interface PageItem {
    id: number;
    title: string;
    slug: string;
    template: string;
    excerpt?: string;
    body?: string;
    featured_image?: string;
    status: string;
    author?: { name: string };
    published_at?: string;
    updated_at: string;
}

interface PagesProps {
    pages: {
        data: PageItem[];
        links: any[];
        total: number;
        current_page: number;
    };
    filters: {
        search: string;
        status: string;
    };
    templates: { value: string; label: string }[];
}

export default function PagesIndex({ pages, filters, templates }: PagesProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PageItem | null>(null);

    const { data, setData, reset, processing, errors } = useForm<{
        title: string;
        slug: string;
        template: string;
        excerpt: string;
        body: string;
        featured_image: File | null;
        status: string;
    }>({
        title: '',
        slug: '',
        template: 'default',
        excerpt: '',
        body: '',
        featured_image: null,
        status: 'published',
    });

    const openCreate = () => {
        setEditingItem(null);
        reset();
        setData({
            title: '',
            slug: '',
            template: 'default',
            excerpt: '',
            body: '',
            featured_image: null,
            status: 'published',
        });
        setModalOpen(true);
    };

    const openEdit = (item: PageItem) => {
        setEditingItem(item);
        setData({
            title: item.title,
            slug: item.slug,
            template: item.template || 'default',
            excerpt: item.excerpt || '',
            body: item.body || '',
            featured_image: null,
            status: item.status,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            router.post(`/admin/pages/${editingItem.id}`, {
                _method: 'put',
                ...data,
            } as any, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            router.post('/admin/pages', data as any, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (item: PageItem) => {
        if (confirm(`Are you sure you want to delete page '${item.title}'?`)) {
            router.delete(`/admin/pages/${item.id}`);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/pages', { search, status: statusFilter }, { preserveState: true });
    };

    return (
        <AdminLayout
            header="Pages Management"
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin' },
                { label: 'Pages Management' },
            ]}
        >
            <Head title="Custom Pages - Chapter Four CMS" />

            <div className="space-y-6 max-w-7xl">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <FileText className="w-6 h-6 text-brand-rust" />
                            Custom Pages & Documents
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Create, publish, and manage standalone informational and programmatic pages with custom templates.
                        </p>
                    </div>

                    <button
                        onClick={openCreate}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-rust hover:bg-brand-crimson text-white font-semibold text-xs shadow-md shadow-brand-rust/20 transition-all cursor-pointer"
                    >
                        <Plus className="w-4 h-4" /> Create New Page
                    </button>
                </div>

                {/* Filter and Search Bar */}
                <form onSubmit={handleSearch} className="p-4 rounded-xl bg-white dark:bg-[#0a0e1a] border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-xs">
                    <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title, slug, or excerpt..."
                            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                router.get('/admin/pages', { search, status: e.target.value }, { preserveState: true });
                            }}
                            className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs focus:outline-none focus:border-brand-rust"
                        >
                            <option value="all">All Statuses</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                            <option value="archived">Archived</option>
                        </select>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-white rounded-lg text-xs font-semibold transition"
                        >
                            Filter
                        </button>
                    </div>
                </form>

                {/* Pages Table */}
                <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0e1a] overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-white/10 uppercase tracking-wider font-semibold">
                                <tr>
                                    <th className="py-3.5 px-4">Page Title & Slug</th>
                                    <th className="py-3.5 px-4">Template</th>
                                    <th className="py-3.5 px-4">Status</th>
                                    <th className="py-3.5 px-4">Author</th>
                                    <th className="py-3.5 px-4">Updated</th>
                                    <th className="py-3.5 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-200">
                                {pages.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-slate-400">
                                            <FileText className="w-8 h-8 mx-auto mb-2 opacity-40" />
                                            No pages found. Click "Create New Page" to publish one.
                                        </td>
                                    </tr>
                                ) : (
                                    pages.data.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                            <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white">
                                                <div className="flex items-center gap-3">
                                                    {item.featured_image ? (
                                                        <img src={item.featured_image} alt={item.title} className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-white/10" />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400">
                                                            <FileText className="w-5 h-5 text-brand-rust" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="font-semibold text-slate-900 dark:text-white">{item.title}</div>
                                                        <div className="text-[11px] font-mono text-slate-400">/page/{item.slug}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-4 capitalize text-slate-600 dark:text-slate-300">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 dark:bg-white/5 text-[11px]">
                                                    <Layout className="w-3 h-3 text-slate-400" />
                                                    {item.template.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                                                    item.status === 'published'
                                                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20'
                                                        : item.status === 'draft'
                                                        ? 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20'
                                                        : 'bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400 border border-slate-200 dark:border-white/10'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                                                {item.author?.name || 'Administrator'}
                                            </td>
                                            <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 text-[11px]">
                                                {new Date(item.updated_at).toLocaleDateString()}
                                            </td>
                                            <td className="py-3.5 px-4 text-right">
                                                <div className="inline-flex items-center gap-1">
                                                    <a
                                                        href={`/page/${item.slug}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        title="View Live Page"
                                                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                                                    >
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </a>
                                                    <button
                                                        onClick={() => openEdit(item)}
                                                        title="Edit Page"
                                                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-brand-rust transition-colors cursor-pointer"
                                                    >
                                                        <Edit3 className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item)}
                                                        title="Delete Page"
                                                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Create/Edit Modal */}
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                        <div className="bg-white dark:bg-[#0c101d] rounded-2xl max-w-3xl w-full border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-white/10">
                                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                                    {editingItem ? 'Edit Page' : 'Create New Page'}
                                </h3>
                                <button onClick={() => setModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                            Page Title *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="e.g. Strategic Plan 2024-2028"
                                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                        />
                                        {errors.title && <p className="text-red-500 text-[11px] mt-1">{errors.title}</p>}
                                    </div>

                                    <div>
                                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                            URL Slug (Optional, auto-generated)
                                        </label>
                                        <input
                                            type="text"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            placeholder="strategic-plan-2024-2028"
                                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust font-mono"
                                        />
                                        {errors.slug && <p className="text-red-500 text-[11px] mt-1">{errors.slug}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                            Page Template
                                        </label>
                                        <select
                                            value={data.template}
                                            onChange={(e) => setData('template', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                        >
                                            {templates.map((tpl) => (
                                                <option key={tpl.value} value={tpl.value}>{tpl.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                            Publishing Status
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                        >
                                            <option value="published">Published</option>
                                            <option value="draft">Draft (Private)</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                        Summary / Excerpt
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={data.excerpt}
                                        onChange={(e) => setData('excerpt', e.target.value)}
                                        placeholder="A concise summary of this page's purpose and contents..."
                                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                        Page Content (Markdown / HTML)
                                    </label>
                                    <textarea
                                        rows={8}
                                        value={data.body}
                                        onChange={(e) => setData('body', e.target.value)}
                                        placeholder="Write page narrative, sections, objectives, and text here..."
                                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust font-mono"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                        Featured Header Image
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('featured_image', e.target.files?.[0] || null)}
                                        className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-rust file:text-white hover:file:bg-brand-rust-dark cursor-pointer"
                                    />
                                </div>

                                <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setModalOpen(false)}
                                        className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-5 py-2 rounded-lg bg-brand-rust hover:bg-brand-rust-dark text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
                                    >
                                        <Save className="w-3.5 h-3.5" />
                                        {editingItem ? 'Save Changes' : 'Create Page'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
