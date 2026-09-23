import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Plus, Edit3, Trash2, Search, CheckCircle2,
    X, Save, FileText
} from 'lucide-react';

interface TimelineEventItem {
    id: number;
    year: number;
    title: string;
    description: string;
    status: string;
}

interface TimelineEventsProps {
    timelineEvents: TimelineEventItem[];
}

export default function TimelineEventsIndex({ timelineEvents = [] }: TimelineEventsProps) {
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TimelineEventItem | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        year: new Date().getFullYear(),
        title: '',
        description: '',
        status: 'published',
    });

    const openCreate = () => {
        setEditingItem(null);
        reset();
        setData({
            year: new Date().getFullYear(),
            title: '',
            description: '',
            status: 'published',
        });
        setModalOpen(true);
    };

    const openEdit = (item: TimelineEventItem) => {
        setEditingItem(item);
        setData({
            year: item.year,
            title: item.title,
            description: item.description,
            status: item.status,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            put(`/admin/timeline-events/${editingItem.id}`, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            post('/admin/timeline-events', {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number, title: string) => {
        if (confirm(`Are you sure you want to remove '${title}'?`)) {
            router.delete(`/admin/timeline-events/${id}`);
        }
    };

    const filtered = timelineEvents.filter((a) =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.year.toString().includes(search)
    );

    return (
        <AdminLayout
            header="Timeline Events"
            description="Manage the events displayed in the history timeline."
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin' },
                { label: 'Timeline Events' },
            ]}
        >
            <Head title="Timeline Events - Admin" />

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search timeline events..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent transition-shadow text-sm"
                    />
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 bg-brand-rust text-white px-4 py-2 rounded-lg hover:bg-brand-rust/90 transition-colors shadow-sm text-sm font-medium whitespace-nowrap"
                >
                    <Plus className="w-4 h-4" />
                    Add Event
                </button>
            </div>

            {/* Data Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Year</th>
                                <th className="px-6 py-4 font-semibold">Title</th>
                                <th className="px-6 py-4 font-semibold text-center">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filtered.length > 0 ? (
                                filtered.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-brand-rust">
                                            {item.year}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900">{item.title}</div>
                                            <div className="text-xs text-slate-500 truncate max-w-md">{item.description}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {item.status === 'published' ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                                    <FileText className="w-3.5 h-3.5" />
                                                    Draft
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEdit(item)}
                                                    className="p-1.5 text-slate-400 hover:text-brand-rust hover:bg-brand-rust/5 rounded-md transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id, item.title)}
                                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                        No timeline events found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-md">
                            <h3 className="text-lg font-bold text-slate-900">
                                {editingItem ? 'Edit Event' : 'Add Event'}
                            </h3>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Year */}
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-slate-700">Year *</label>
                                    <input
                                        type="number"
                                        required
                                        min="1900"
                                        max="2100"
                                        value={data.year}
                                        onChange={e => setData('year', Number(e.target.value))}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent text-sm"
                                    />
                                    {errors.year && <p className="text-red-500 text-xs">{errors.year}</p>}
                                </div>

                                {/* Status */}
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-slate-700">Status</label>
                                    <select
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent text-sm"
                                    >
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>

                                {/* Title */}
                                <div className="space-y-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700">Title *</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent text-sm"
                                    />
                                    {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                                </div>

                                {/* Description */}
                                <div className="space-y-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700">Description *</label>
                                    <textarea
                                        rows={4}
                                        required
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent text-sm resize-y"
                                    />
                                    {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center gap-2 px-4 py-2 bg-brand-rust text-white text-sm font-medium rounded-lg hover:bg-brand-rust/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-4 h-4" />
                                    {processing ? 'Saving...' : 'Save Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
