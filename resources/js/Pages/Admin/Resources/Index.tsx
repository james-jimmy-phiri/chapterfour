import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Plus, Search, Filter, Edit3, Trash2, Eye,
    FileText, Calendar, CheckCircle2, Clock, AlertCircle, ArrowUpRight
} from 'lucide-react';
import { useState } from 'react';

interface ResourceItem {
    id: number;
    title: string;
    slug: string;
    type: string;
    status: string;
    published_at?: string;
    created_at?: string;
    author?: {
        name?: string;
    };
}

interface IndexProps {
    resources: {
        data: ResourceItem[];
        links: any[];
        total: number;
    };
    filters: {
        search: string;
        status: string;
        type: string;
    };
    resourceTypes: Array<{ value: string; label: string }>;
}

export default function Index({ resources, filters, resourceTypes }: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/resources', { ...filters, search }, { preserveState: true });
    };

    const handleStatusFilter = (status: string) => {
        router.get('/admin/resources', { ...filters, status }, { preserveState: true });
    };

    const handleDelete = (id: number, title: string) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            router.delete(`/admin/resources/${id}`);
        }
    };

    return (
        <AdminLayout
            header="Resources & Publications"
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin' },
                { label: 'Resources' },
            ]}
        >
            <Head title="Resources Management - Chapter Four CMS" />

            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">Publications & Resources</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Total {resources.total} reports, policy briefs, press releases, and legal publications.
                        </p>
                    </div>

                    <Link
                        href="/admin/resources/create"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-rust hover:bg-brand-crimson text-white font-semibold text-xs shadow-md shadow-brand-rust/20 transition-all"
                    >
                        <Plus className="w-4 h-4" /> Create Resource
                    </Link>
                </div>

                {/* Filters */}
                <div className="p-4 rounded-xl bg-white dark:bg-[#0a0e1a] border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
                    <form onSubmit={handleSearch} className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search by title or excerpt..."
                            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                        />
                    </form>

                    <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                        {['all', 'published', 'draft', 'review'].map(st => (
                            <button
                                key={st}
                                onClick={() => handleStatusFilter(st)}
                                className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-colors whitespace-nowrap ${
                                    (filters.status || 'all') === st
                                        ? 'bg-brand-rust/10 text-brand-rust dark:bg-brand-rust/20 dark:text-brand-amber border border-brand-rust/30 font-medium'
                                        : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10'
                                }`}
                            >
                                {st}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0e1a] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-white/10 uppercase tracking-wider font-semibold">
                                <tr>
                                    <th className="py-3.5 px-4">Title</th>
                                    <th className="py-3.5 px-4">Type</th>
                                    <th className="py-3.5 px-4">Status</th>
                                    <th className="py-3.5 px-4">Author</th>
                                    <th className="py-3.5 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-200">
                                {resources.data.map(item => (
                                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                        <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white max-w-md">
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-brand-rust shrink-0" />
                                                <span className="truncate">{item.title}</span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                                                {item.type}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium capitalize ${
                                                item.status === 'published'
                                                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20'
                                                    : 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                                            {item.author?.name || 'System'}
                                        </td>
                                        <td className="py-3.5 px-4 text-right">
                                            <div className="inline-flex items-center gap-1.5">
                                                <a
                                                    href={`/resources/${item.slug}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    title="View Public Page"
                                                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                </a>
                                                <Link
                                                    href={`/admin/resources/${item.id}/edit`}
                                                    title="Edit Resource"
                                                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-brand-rust transition-colors"
                                                >
                                                    <Edit3 className="w-3.5 h-3.5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item.id, item.title)}
                                                    title="Delete Resource"
                                                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {resources.data.length === 0 && (
                        <div className="text-center py-16 text-slate-400 dark:text-slate-500">
                            No resources found. Click "+ Create Resource" to add one.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
