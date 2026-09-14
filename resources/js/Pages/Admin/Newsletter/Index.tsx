import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import {
    Mail, Search, Download, Trash2, CheckCircle2,
    XCircle, Clock, Globe, ArrowDownToLine
} from 'lucide-react';
import { useState } from 'react';

interface SubscriberItem {
    id: number;
    email: string;
    status: string;
    source?: string;
    consented_at?: string;
    created_at: string;
}

interface IndexProps {
    subscribers: {
        data: SubscriberItem[];
        links: any[];
        total: number;
    };
    filters: {
        search: string;
        status: string;
    };
    totalActive: number;
}

export default function Index({ subscribers, filters, totalActive }: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/newsletter', { ...filters, search }, { preserveState: true });
    };

    const handleStatusFilter = (status: string) => {
        router.get('/admin/newsletter', { ...filters, status }, { preserveState: true });
    };

    const handleToggleStatus = (id: number) => {
        router.patch(`/admin/newsletter/${id}/toggle`, {}, { preserveScroll: true });
    };

    const handleDelete = (id: number, email: string) => {
        if (confirm(`Remove "${email}" from the newsletter list?`)) {
            router.delete(`/admin/newsletter/${id}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout
            header="Newsletter Subscribers"
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin' },
                { label: 'Newsletter' },
            ]}
        >
            <Head title="Newsletter Subscribers - Chapter Four CMS" />

            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-serif font-normal text-white">Newsletter Audience</h1>
                        <p className="text-xs text-navy-400 mt-1">
                            {totalActive} active subscribers ({subscribers.total} total recorded).
                        </p>
                    </div>

                    <a
                        href="/admin/newsletter/export"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-amber-400 font-semibold text-xs border border-navy-700 transition-colors shadow-sm"
                    >
                        <ArrowDownToLine className="w-4 h-4" /> Export CSV
                    </a>
                </div>

                {/* Filters */}
                <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <form onSubmit={handleSearch} className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 text-navy-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search by email..."
                            className="w-full pl-9 pr-4 py-2 rounded-lg bg-navy-950 border border-navy-700 text-white placeholder-navy-500 text-xs focus:outline-none focus:border-amber-500"
                        />
                    </form>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        {['all', 'subscribed', 'unsubscribed'].map(st => (
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
                                    <th className="py-3 px-4">Email Address</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Source</th>
                                    <th className="py-3 px-4">Subscribed At</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-navy-800/60 text-navy-200">
                                {subscribers.data.map(item => (
                                    <tr key={item.id} className="hover:bg-navy-800/30 transition-colors">
                                        <td className="py-3.5 px-4 font-medium text-white flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-amber-400/80 shrink-0" />
                                            <span>{item.email}</span>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <button
                                                onClick={() => handleToggleStatus(item.id)}
                                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium capitalize cursor-pointer transition-opacity hover:opacity-80 ${
                                                    item.status === 'subscribed'
                                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                                }`}
                                            >
                                                {item.status}
                                            </button>
                                        </td>
                                        <td className="py-3.5 px-4 text-navy-400 uppercase tracking-wider text-[10px]">
                                            {item.source || 'Website'}
                                        </td>
                                        <td className="py-3.5 px-4 text-navy-400">
                                            {item.consented_at || item.created_at}
                                        </td>
                                        <td className="py-3.5 px-4 text-right">
                                            <div className="inline-flex items-center gap-1.5">
                                                <button
                                                    onClick={() => handleToggleStatus(item.id)}
                                                    title={item.status === 'subscribed' ? 'Unsubscribe' : 'Reactivate'}
                                                    className="p-1 rounded hover:bg-navy-800 text-navy-400 hover:text-amber-400 transition-colors text-[11px]"
                                                >
                                                    {item.status === 'subscribed' ? 'Unsubscribe' : 'Subscribe'}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id, item.email)}
                                                    title="Delete Subscriber"
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

                    {subscribers.data.length === 0 && (
                        <div className="text-center py-16 text-navy-400">
                            No newsletter subscribers found.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
