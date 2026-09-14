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
            <Head title="Inquiries Inbox - Chapter Four CMS" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-serif font-normal text-white">Public Inquiries & Case Intake</h1>
                        <p className="text-xs text-navy-400 mt-1">
                            {inquiries.total} total inquiries logged across all channels.
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <form onSubmit={handleSearch} className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 text-navy-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search by name, email, or subject..."
                            className="w-full pl-9 pr-4 py-2 rounded-lg bg-navy-950 border border-navy-700 text-white placeholder-navy-500 text-xs focus:outline-none focus:border-amber-500"
                        />
                    </form>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        {['all', 'new', 'in_progress', 'resolved'].map(st => (
                            <button
                                key={st}
                                onClick={() => handleStatusFilter(st)}
                                className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-colors ${
                                    filters.status === st
                                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 font-medium'
                                        : 'bg-navy-800 text-navy-300 hover:text-white border border-navy-700/60'
                                }`}
                            >
                                {st.replace('_', ' ')}
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
                                    <th className="py-3 px-4">Sender</th>
                                    <th className="py-3 px-4">Type</th>
                                    <th className="py-3 px-4">Subject</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-navy-800/60 text-navy-200">
                                {inquiries.data.map(item => (
                                    <tr
                                        key={item.id}
                                        onClick={() => openInquiryModal(item)}
                                        className="hover:bg-navy-800/30 transition-colors cursor-pointer"
                                    >
                                        <td className="py-3.5 px-4 font-medium text-white">
                                            <div>{item.name}</div>
                                            <div className="text-[11px] text-navy-400 font-normal">{item.email}</div>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-navy-800 text-amber-400 border border-navy-700">
                                                {item.type}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 max-w-xs truncate text-navy-100">
                                            {item.subject}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium capitalize ${
                                                item.status === 'new'
                                                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                    : item.status === 'in_progress'
                                                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            }`}>
                                                {item.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-right" onClick={e => e.stopPropagation()}>
                                            <div className="inline-flex items-center gap-1.5">
                                                <button
                                                    onClick={() => openInquiryModal(item)}
                                                    title="View Details"
                                                    className="p-1 rounded hover:bg-navy-800 text-navy-400 hover:text-white transition-colors"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    title="Delete"
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

                    {inquiries.data.length === 0 && (
                        <div className="text-center py-16 text-navy-400">
                            No inquiries found matching this criteria.
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Detail View */}
            {activeInquiry && (
                <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-navy-900 border border-navy-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex items-start justify-between border-b border-navy-800 pb-4">
                            <div>
                                <span className="text-[10px] uppercase font-semibold text-amber-400 tracking-wider">
                                    {activeInquiry.type}
                                </span>
                                <h3 className="font-serif text-xl text-white font-normal mt-1">{activeInquiry.subject}</h3>
                            </div>
                            <button
                                onClick={() => setActiveInquiry(null)}
                                className="p-1 rounded-lg hover:bg-navy-800 text-navy-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Sender Info */}
                        <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div>
                                <span className="text-navy-400 block mb-0.5">Sender Name</span>
                                <span className="text-white font-medium">{activeInquiry.name}</span>
                            </div>
                            <div>
                                <span className="text-navy-400 block mb-0.5">Email Address</span>
                                <a href={`mailto:${activeInquiry.email}`} className="text-amber-400 hover:underline">
                                    {activeInquiry.email}
                                </a>
                            </div>
                            {activeInquiry.phone && (
                                <div>
                                    <span className="text-navy-400 block mb-0.5">Phone / WhatsApp</span>
                                    <span className="text-white font-medium">{activeInquiry.phone}</span>
                                </div>
                            )}
                            <div>
                                <span className="text-navy-400 block mb-0.5">Workflow Status</span>
                                <select
                                    value={activeInquiry.status}
                                    onChange={e => handleUpdateStatus(activeInquiry.id, e.target.value)}
                                    className="px-2.5 py-1 rounded bg-navy-900 border border-navy-700 text-white text-xs focus:outline-none focus:border-amber-500 capitalize"
                                >
                                    {statuses.map(s => (
                                        <option key={s.value} value={s.value}>{s.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Message Body */}
                        <div>
                            <h4 className="text-xs uppercase font-semibold tracking-wider text-navy-400 mb-2">Message Content</h4>
                            <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 text-navy-200 text-sm font-light leading-relaxed whitespace-pre-line">
                                {activeInquiry.message}
                            </div>
                        </div>

                        {/* Internal Notes */}
                        <form onSubmit={handleSaveNotes} className="space-y-3 pt-2 border-t border-navy-800">
                            <label className="block text-xs uppercase font-semibold tracking-wider text-navy-400">
                                Staff Internal Notes / Legal Actions Taken
                            </label>
                            <textarea
                                rows={3}
                                value={notes}
                                onChange={e => setNotes(e.target.value)}
                                placeholder="Add private notes on follow-up calls, assigned lawyer, or case resolution..."
                                className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-white placeholder-navy-500 text-xs focus:outline-none focus:border-amber-500 resize-none"
                            />
                            <div className="flex items-center justify-between">
                                <a
                                    href={`mailto:${activeInquiry.email}?subject=Re: ${encodeURIComponent(activeInquiry.subject)}`}
                                    className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline"
                                >
                                    <Send className="w-3.5 h-3.5" /> Reply via Email Client
                                </a>
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-semibold text-xs transition-colors"
                                >
                                    <Save className="w-3.5 h-3.5" /> Save Internal Notes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
