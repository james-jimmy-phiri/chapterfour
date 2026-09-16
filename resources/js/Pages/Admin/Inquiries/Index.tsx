import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import {
    Search, Filter, Mail, Phone, Clock, CheckCircle2,
    AlertCircle, MessageSquare, Trash2, Eye, X, Send, Save
} from 'lucide-react';
import { useState } from 'react';

interface InquiryItem {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    type: string;
    subject: string;
    message: string;
    status: string;
    internal_notes?: string | null;
    created_at: string;
}

interface IndexProps {
    inquiries: {
        data: InquiryItem[];
        links: any[];
        total: number;
    };
    filters: {
        status: string;
        search: string;
    };
    statuses: Array<{ value: string; label: string }>;
}

export default function Index({ inquiries, filters, statuses }: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [activeInquiry, setActiveInquiry] = useState<InquiryItem | null>(null);
    const [notes, setNotes] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/inquiries', { ...filters, search }, { preserveState: true });
    };

    const handleStatusFilter = (status: string) => {
        router.get('/admin/inquiries', { ...filters, status }, { preserveState: true });
    };

    const handleUpdateStatus = (id: number, newStatus: string) => {
        router.patch(`/admin/inquiries/${id}/status`, { status: newStatus }, {
            preserveScroll: true,
            onSuccess: () => {
                if (activeInquiry && activeInquiry.id === id) {
                    setActiveInquiry({ ...activeInquiry, status: newStatus });
                }
            },
        });
    };

    const handleSaveNotes = (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeInquiry) return;
        router.patch(`/admin/inquiries/${activeInquiry.id}/notes`, { internal_notes: notes }, {
            preserveScroll: true,
            onSuccess: () => {
                setActiveInquiry({ ...activeInquiry, internal_notes: notes });
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this inquiry?')) {
            router.delete(`/admin/inquiries/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    if (activeInquiry?.id === id) setActiveInquiry(null);
                },
            });
        }
    };

    const openInquiryModal = (item: InquiryItem) => {
        setActiveInquiry(item);
        setNotes(item.internal_notes || '');
    };

    return (
        <AdminLayout
            header="Inquiries & Rights Alerts"
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin' },
                { label: 'Inquiries' },
            ]}
        >
            <Head title="Inquiries Inbox — Chapter Four Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Public Inquiries & Case Intake</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {inquiries.total} total citizen reports and inquiries logged across all channels.
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="p-4 rounded-xl bg-white dark:bg-[#0a0e1a] border border-slate-200 dark:border-white/10 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <form onSubmit={handleSearch} className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search by name, email, or subject..."
                            className="w-full pl-9 pr-4 py-2 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:ring-1 focus:ring-brand-rust"
                        />
                    </form>

                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                        {['all', 'new', 'in_progress', 'resolved'].map(st => (
                            <button
                                key={st}
                                onClick={() => handleStatusFilter(st)}
                                className={`px-3 py-1.5 rounded-lg text-xs capitalize transition font-medium ${
                                    filters.status === st
                                        ? 'bg-brand-rust text-white shadow-xs'
                                        : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                                }`}
                            >
                                {st.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0e1a] shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 dark:bg-white/[0.02] text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10 uppercase tracking-wider font-semibold">
                                <tr>
                                    <th className="py-3 px-4">Sender</th>
                                    <th className="py-3 px-4">Type</th>
                                    <th className="py-3 px-4">Subject</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                                {inquiries.data.map(item => (
                                    <tr
                                        key={item.id}
                                        onClick={() => openInquiryModal(item)}
                                        className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition cursor-pointer"
                                    >
                                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                                            <div>{item.name}</div>
                                            <div className="text-[11px] text-slate-500 font-normal">{item.email}</div>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-brand-rust-light text-brand-rust border border-brand-rust/20">
                                                {item.type}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 max-w-xs truncate text-slate-800 dark:text-slate-200 font-medium">
                                            {item.subject}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                                                item.status === 'new'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : item.status === 'in_progress'
                                                    ? 'bg-amber-100 text-amber-800'
                                                    : 'bg-emerald-100 text-emerald-800'
                                            }`}>
                                                {item.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-right" onClick={e => e.stopPropagation()}>
                                            <div className="inline-flex items-center gap-1.5">
                                                <button
                                                    onClick={() => openInquiryModal(item)}
                                                    title="View Details"
                                                    className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 hover:text-brand-rust transition"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    title="Delete"
                                                    className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 hover:text-red-600 transition"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {inquiries.data.length === 0 && (
                        <div className="text-center py-16 text-slate-400">
                            No inquiries found matching this criteria.
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Detail View */}
            {activeInquiry && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-[#0c111e] border border-slate-200 dark:border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex items-start justify-between border-b border-slate-100 dark:border-white/10 pb-4">
                            <div>
                                <span className="text-[10px] uppercase font-bold text-brand-rust tracking-wider">
                                    {activeInquiry.type}
                                </span>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{activeInquiry.subject}</h3>
                            </div>
                            <button
                                onClick={() => setActiveInquiry(null)}
                                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Sender Info */}
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div>
                                <span className="text-slate-400 block mb-0.5">Sender Name</span>
                                <span className="text-slate-900 dark:text-white font-bold">{activeInquiry.name}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 block mb-0.5">Email Address</span>
                                <a href={`mailto:${activeInquiry.email}`} className="text-brand-rust font-semibold hover:underline">
                                    {activeInquiry.email}
                                </a>
                            </div>
                            {activeInquiry.phone && (
                                <div>
                                    <span className="text-slate-400 block mb-0.5">Phone</span>
                                    <span className="text-slate-900 dark:text-white font-medium">{activeInquiry.phone}</span>
                                </div>
                            )}
                            <div>
                                <span className="text-slate-400 block mb-0.5">Workflow Status</span>
                                <select
                                    value={activeInquiry.status}
                                    onChange={e => handleUpdateStatus(activeInquiry.id, e.target.value)}
                                    className="px-2.5 py-1 rounded bg-white dark:bg-[#0c111e] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs capitalize"
                                >
                                    {statuses.map(s => (
                                        <option key={s.value} value={s.value}>{s.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Message Body */}
                        <div>
                            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-2">Message Content</h4>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 text-sm leading-relaxed whitespace-pre-line">
                                {activeInquiry.message}
                            </div>
                        </div>

                        {/* Internal Notes */}
                        <form onSubmit={handleSaveNotes} className="space-y-3 pt-2 border-t border-slate-100 dark:border-white/10">
                            <label className="block text-xs uppercase font-bold tracking-wider text-slate-500">
                                Staff Internal Notes / Actions Taken
                            </label>
                            <textarea
                                rows={3}
                                value={notes}
                                onChange={e => setNotes(e.target.value)}
                                placeholder="Add private notes on follow-up calls, assigned lawyer, or case resolution..."
                                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs resize-none"
                            />
                            <div className="flex items-center justify-between">
                                <a
                                    href={`mailto:${activeInquiry.email}?subject=Re: ${encodeURIComponent(activeInquiry.subject)}`}
                                    className="inline-flex items-center gap-1.5 text-xs text-brand-rust font-bold hover:underline"
                                >
                                    <Send className="w-3.5 h-3.5" /> Reply via Email Client
                                </a>
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-rust hover:bg-brand-rust-dark text-white font-semibold text-xs shadow-sm"
                                >
                                    <Save className="w-3.5 h-3.5" /> Save Notes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
