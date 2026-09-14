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
                        <h1 className="text-2xl font-serif font-normal text-white">Publications & Resources</h1>
                        <p className="text-xs text-navy-400 mt-1">
                            Total {resources.total} reports, policy briefs, press releases, and articles.
                        </p>
                    </div>

                    <Link
                        href="/admin/resources/create"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-semibold text-xs shadow-md shadow-amber-500/20 transition-all"
                    >
                        <Plus className="w-4 h-4" /> Create Resource
                    </Link>
                </div>

                {/* Filters */}
                <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <form onSubmit={handleSearch} className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 text-navy-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search by title or excerpt..."
                            className="w-full pl-9 pr-4 py-2 rounded-lg bg-navy-950 border border-navy-700 text-white placeholder-navy-500 text-xs focus:outline-none focus:border-amber-500"
                        />
                    </form>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        {['all', 'published', 'draft', 'review'].map(st => (
                            <button
                                key={st}
                                onClick={() => handleStatusFilter(st)}
                                className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-colors ${
                                    filters.status === st
                                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 font-medium'
                                        : 'bg-navy-800 text-navy-300 hover:text-white border border-navy-700/60'
                                }`}
                            >
                                {st}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-xl border border-navy-800 bg-navy-900/40 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-navy-900/80 text-navy-400 border-b border-navy-800 uppercase tracking-wider font-semibold">
                                <tr>
                                    <th className="py-3 px-4">Title</th>
                                    <th className="py-3 px-4">Type</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Author</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-navy-800/60 text-navy-200">
                                {resources.data.map(item => (
                                    <tr key={item.id} className="hover:bg-navy-800/30 transition-colors">
                                        <td className="py-3.5 px-4 font-medium text-white max-w-md">
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                                                <span className="truncate">{item.title}</span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-navy-800 text-navy-300 border border-navy-700">
                                                {item.type}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium capitalize ${
                                                item.status === 'published'
                                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-navy-300">
                                            {item.author?.name || 'System'}
                                        </td>
                                        <td className="py-3.5 px-4 text-right">
                                            <div className="inline-flex items-center gap-1.5">
                                                <a
                                                    href={`/resources/${item.slug}`}
                                                    target="_blank"
                                                    title="View Public Page"
                                                    className="p-1 rounded hover:bg-navy-800 text-navy-400 hover:text-white transition-colors"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                </a>
                                                <Link
                                                    href={`/admin/resources/${item.id}/edit`}
                                                    title="Edit Resource"
                                                    className="p-1 rounded hover:bg-navy-800 text-navy-400 hover:text-amber-400 transition-colors"
                                                >
                                                    <Edit3 className="w-3.5 h-3.5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item.id, item.title)}
                                                    title="Delete Resource"
                                                    className="p-1 rounded hover:bg-navy-800 text-navy-400 hover:text-red-400 transition-colors"
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
                        <div className="text-center py-16 text-navy-400">
                            No resources found. Click "+ Create Resource" to add one.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
