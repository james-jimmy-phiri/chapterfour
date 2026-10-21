import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { useState } from 'react';
import {
    BookOpen, Plus, Edit3, Trash2, Search, CheckCircle2,
    ExternalLink, X, Save, FileDown, Eye, Filter, Star
} from 'lucide-react';

interface PublicationItem {
    id: number;
    title: string;
    slug: string;
    type: string;
    excerpt?: string;
    body?: string;
    featured_image?: string;
    pdf_path?: string;
    status: string;
    is_featured: boolean;
    author?: { name: string };
    published_at?: string;
    updated_at: string;
}

interface PublicationsProps {
    publications: {
        data: PublicationItem[];
        links: any[];
        total: number;
        current_page: number;
    };
    filters: {
        search: string;
        type: string;
        status: string;
    };
    categories: { value: string; label: string }[];
}

export default function PublicationsIndex({ publications, filters, categories }: PublicationsProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [typeFilter, setTypeFilter] = useState(filters.type || 'all');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PublicationItem | null>(null);

    const { data, setData, reset, processing, errors } = useForm<{
        title: string;
        slug: string;
        type: string;
        excerpt: string;
        body: string;
        featured_image: File | null;
        pdf_file: File | null;
        status: string;
        is_featured: boolean;
    }>({
        title: '',
        slug: '',
        type: 'publication',
        excerpt: '',
        body: '',
        featured_image: null,
        pdf_file: null,
        status: 'published',
        is_featured: false,
    });

    const openCreate = () => {
        setEditingItem(null);
        reset();
        setData({
            title: '',
            slug: '',
            type: 'publication',
            excerpt: '',
            body: '',
            featured_image: null,
            pdf_file: null,
            status: 'published',
            is_featured: false,
        });
        setModalOpen(true);
    };

    const openEdit = (item: PublicationItem) => {
        setEditingItem(item);
        setData({
            title: item.title,
            slug: item.slug,
            type: (item.type as any)?.value || item.type,
            excerpt: item.excerpt || '',
            body: item.body || '',
            featured_image: null,
            pdf_file: null,
            status: (item.status as any)?.value || item.status,
            is_featured: Boolean(item.is_featured),
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            router.post(`/admin/publications/${editingItem.id}`, {
                _method: 'put',
                ...data,
            } as any, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            router.post('/admin/publications', data as any, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (item: PublicationItem) => {
        if (confirm(`Delete publication '${item.title}'?`)) {
            router.delete(`/admin/publications/${item.id}`);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/publications', { search, type: typeFilter, status: statusFilter }, { preserveState: true });
    };

    return (
        <AdminLayout
            header="Publications Management"
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin' },
                { label: 'Publications' },
            ]}
        >
            <Head title="Publications & Research - Chapter Four CMS" />

            <div className="space-y-6 max-w-7xl">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-brand-rust" />
                            Publications, Reports & Research
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Manage statutory publications, constitutional research, human rights reports, and downloadable policy documents.
                        </p>
                    </div>

                    <button
                        onClick={openCreate}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-rust hover:bg-brand-crimson text-white font-semibold text-xs shadow-md shadow-brand-rust/20 transition-all cursor-pointer"
                    >
                        <Plus className="w-4 h-4" /> Add Publication
                    </button>
                </div>

                {/* Filters */}
                <form onSubmit={handleSearch} className="p-4 rounded-xl bg-white dark:bg-[#0a0e1a] border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-xs">
                    <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by publication title or abstract..."
                            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:border-brand-rust"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                        <select
                            value={typeFilter}
                            onChange={(e) => {
                                setTypeFilter(e.target.value);
                                router.get('/admin/publications', { search, type: e.target.value, status: statusFilter }, { preserveState: true });
                            }}
                            className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs focus:outline-none focus:border-brand-rust"
                        >
                            <option value="all">All Document Types</option>
                            {categories.map((cat) => (
                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                        </select>

                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                router.get('/admin/publications', { search, type: typeFilter, status: e.target.value }, { preserveState: true });
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

                {/* Publications Table */}
                <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0e1a] overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-white/10 uppercase tracking-wider font-semibold">
                                <tr>
                                    <th className="py-3.5 px-4">Title & Type</th>
                                    <th className="py-3.5 px-4">Document / PDF</th>
                                    <th className="py-3.5 px-4">Status</th>
                                    <th className="py-3.5 px-4">Author</th>
                                    <th className="py-3.5 px-4">Date</th>
                                    <th className="py-3.5 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-200">
                                {publications.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-slate-400">
                                            <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40" />
                                            No publications found. Click "Add Publication" to upload one.
                                        </td>
                                    </tr>
                                ) : (
                                    publications.data.map((item) => {
                                        const typeVal = (item.type as any)?.value || item.type;
                                        const statusVal = (item.status as any)?.value || item.status;
                                        return (
                                            <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                                <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white">
                                                    <div className="flex items-center gap-3">
                                                        {item.featured_image ? (
                                                            <img src={item.featured_image} alt={item.title} className="w-10 h-12 rounded object-cover border border-slate-200 dark:border-white/10 shadow-xs" />
                                                        ) : (
                                                            <div className="w-10 h-12 rounded bg-brand-rust/10 border border-brand-rust/20 flex items-center justify-center text-brand-rust">
                                                                <BookOpen className="w-5 h-5" />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                                                                {item.title}
                                                                {item.is_featured && (
                                                                    <span className="p-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300" title="Featured">
                                                                        <Star className="w-3 h-3 fill-amber-500" />
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="inline-block px-2 py-0.5 mt-0.5 rounded bg-slate-100 dark:bg-white/5 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                                                                {typeVal.replace('_', ' ')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3.5 px-4">
                                                    {item.pdf_path ? (
                                                        <a
                                                            href={item.pdf_path}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-rust/10 hover:bg-brand-rust/20 text-brand-rust text-xs font-semibold transition"
                                                        >
                                                            <FileDown className="w-3.5 h-3.5" /> PDF File
                                                        </a>
                                                    ) : (
                                                        <span className="text-slate-400 text-[11px]">No file attached</span>
                                                    )}
                                                </td>
                                                <td className="py-3.5 px-4">
                                                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                                                        statusVal === 'published'
                                                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20'
                                                            : 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20'
                                                    }`}>
                                                        {statusVal}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                                                    {item.author?.name || 'Chapter Four Team'}
                                                </td>
                                                <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 text-[11px]">
                                                    {item.published_at ? new Date(item.published_at).toLocaleDateString() : new Date(item.updated_at).toLocaleDateString()}
                                                </td>
                                                <td className="py-3.5 px-4 text-right">
                                                    <div className="inline-flex items-center gap-1">
                                                        <a
                                                            href={`/resources/${item.slug}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            title="View Resource"
                                                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                                                        >
                                                            <ExternalLink className="w-3.5 h-3.5" />
                                                        </a>
                                                        <button
                                                            onClick={() => openEdit(item)}
                                                            title="Edit"
                                                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-brand-rust transition-colors cursor-pointer"
                                                        >
                                                            <Edit3 className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(item)}
                                                            title="Delete"
                                                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal */}
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                        <div className="bg-white dark:bg-[#0c101d] rounded-2xl max-w-2xl w-full border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-white/10">
                                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                                    {editingItem ? 'Edit Publication' : 'Add New Publication'}
                                </h3>
                                <button onClick={() => setModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
                                <div>
                                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                        Publication Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="e.g. Annual Human Rights & Constitutional Monitor 2024"
                                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                            Document Category *
                                        </label>
                                        <select
                                            value={data.type}
                                            onChange={(e) => setData('type', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                        >
                                            {categories.map((c) => (
                                                <option key={c.value} value={c.value}>{c.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                            Status
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                        >
                                            <option value="published">Published</option>
                                            <option value="draft">Draft</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                        Executive Summary / Abstract
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={data.excerpt}
                                        onChange={(e) => setData('excerpt', e.target.value)}
                                        placeholder="Overview of the research findings, scope, and key recommendations..."
                                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                            Attach PDF Document (Max 30MB)
                                        </label>
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => setData('pdf_file', e.target.files?.[0] || null)}
                                            className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-rust file:text-white cursor-pointer"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                            Cover Image Thumbnail
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setData('featured_image', e.target.files?.[0] || null)}
                                            className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-700 file:text-white cursor-pointer"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <input
                                        type="checkbox"
                                        id="pub_featured"
                                        checked={data.is_featured}
                                        onChange={(e) => setData('is_featured', e.target.checked)}
                                        className="rounded border-slate-300 text-brand-rust focus:ring-brand-rust"
                                    />
                                    <label htmlFor="pub_featured" className="text-slate-700 dark:text-slate-300 font-medium">
                                        Feature on homepage and reports highlight reel
                                    </label>
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
                                        {editingItem ? 'Save Changes' : 'Publish Document'}
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
