import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm } from '@inertiajs/react';
import {
    BarChart3, Plus, Edit3, Trash2, Save, X,
    CheckCircle2, Sparkles, TrendingUp
} from 'lucide-react';
import { useState } from 'react';

interface StatItem {
    id: number;
    label: string;
    value: string;
    prefix?: string | null;
    suffix?: string | null;
    description?: string | null;
    icon?: string | null;
    sort_order: number;
    status: string;
}

interface IndexProps {
    statistics: StatItem[];
}

export default function Index({ statistics = [] }: IndexProps) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const { data, setData, put, post, reset, processing } = useForm({
        label: '',
        value: '',
        prefix: '',
        suffix: '',
        description: '',
        sort_order: 1,
        status: 'published',
    });

    const startEditing = (stat: StatItem) => {
        setIsCreating(false);
        setEditingId(stat.id);
        setData({
            label: stat.label,
            value: stat.value,
            prefix: stat.prefix || '',
            suffix: stat.suffix || '',
            description: stat.description || '',
            sort_order: stat.sort_order,
            status: stat.status,
        });
    };

    const startCreating = () => {
        setEditingId(null);
        setIsCreating(true);
        reset();
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            put(`/admin/statistics/${editingId}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setEditingId(null);
                    reset();
                },
            });
        } else {
            post('/admin/statistics', {
                preserveScroll: true,
                onSuccess: () => {
                    setIsCreating(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number, label: string) => {
        if (confirm(`Delete statistic "${label}"?`)) {
            router.delete(`/admin/statistics/${id}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout
            header="Impact Statistics"
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin' },
                { label: 'Statistics' },
            ]}
        >
            <Head title="Impact Statistics — Chapter Four Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Impact Numbers & Metrics</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Live statistics presented to the public on the homepage counter section.
                        </p>
                    </div>

                    {!isCreating && !editingId && (
                        <button
                            onClick={startCreating}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-rust hover:bg-brand-rust-dark text-white font-semibold text-xs shadow-sm transition"
                        >
                            <Plus className="w-4 h-4" /> Add Metric
                        </button>
                    )}
                </div>

                {/* Create / Edit Drawer */}
                {(isCreating || editingId) && (
                    <form onSubmit={handleSave} className="p-6 rounded-xl bg-white dark:bg-[#0c111e] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                {isCreating ? 'Add New Impact Number' : 'Edit Impact Metric'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => { setIsCreating(false); setEditingId(null); }}
                                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs uppercase font-bold text-slate-700 dark:text-slate-300 mb-1">Prefix</label>
                                <input
                                    type="text"
                                    value={data.prefix}
                                    onChange={e => setData('prefix', e.target.value)}
                                    placeholder=""
                                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-brand-rust"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase font-bold text-slate-700 dark:text-slate-300 mb-1">Numeric Value *</label>
                                <input
                                    type="text"
                                    required
                                    value={data.value}
                                    onChange={e => setData('value', e.target.value)}
                                    placeholder="5000"
                                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-brand-rust"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase font-bold text-slate-700 dark:text-slate-300 mb-1">Suffix (e.g. + or %)</label>
                                <input
                                    type="text"
                                    value={data.suffix}
                                    onChange={e => setData('suffix', e.target.value)}
                                    placeholder="+"
                                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-brand-rust"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs uppercase font-bold text-slate-700 dark:text-slate-300 mb-1">Label *</label>
                                <input
                                    type="text"
                                    required
                                    value={data.label}
                                    onChange={e => setData('label', e.target.value)}
                                    placeholder="e.g. Youth Reached"
                                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-brand-rust"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase font-bold text-slate-700 dark:text-slate-300 mb-1">Display Order</label>
                                <input
                                    type="number"
                                    value={data.sort_order}
                                    onChange={e => setData('sort_order', parseInt(e.target.value) || 1)}
                                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-bold text-slate-700 dark:text-slate-300 mb-1">Description / Context</label>
                            <input
                                type="text"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                placeholder="Empowered through grassroots civic education and mobile clinics..."
                                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs"
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => { setIsCreating(false); setEditingId(null); }}
                                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 text-xs"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-rust hover:bg-brand-rust-dark text-white font-semibold text-xs shadow-sm"
                            >
                                <Save className="w-3.5 h-3.5" /> Save Metric
                            </button>
                        </div>
                    </form>
                )}

                {/* Table of Statistics */}
                <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0e1a] shadow-xs overflow-hidden">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 dark:bg-white/[0.02] text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10 uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="py-3 px-4">Order</th>
                                <th className="py-3 px-4">Display Number</th>
                                <th className="py-3 px-4">Metric Label</th>
                                <th className="py-3 px-4">Context Description</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                            {statistics.map(stat => (
                                <tr key={stat.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition">
                                    <td className="py-3.5 px-4 text-slate-400 font-mono">#{stat.sort_order}</td>
                                    <td className="py-3.5 px-4 text-lg font-black text-brand-rust">
                                        {stat.prefix}{stat.value}{stat.suffix}
                                    </td>
                                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{stat.label}</td>
                                    <td className="py-3.5 px-4 text-slate-500 max-w-sm truncate">{stat.description || '—'}</td>
                                    <td className="py-3.5 px-4 text-right">
                                        <div className="inline-flex items-center gap-1.5">
                                            <button
                                                onClick={() => startEditing(stat)}
                                                title="Edit Metric"
                                                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 hover:text-brand-rust transition"
                                            >
                                                <Edit3 className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(stat.id, stat.label)}
                                                title="Delete Metric"
                                                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 hover:text-red-600 transition"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {statistics.length === 0 && (
                        <div className="text-center py-16 text-slate-400">
                            No impact statistics created yet.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
