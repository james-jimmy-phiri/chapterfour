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

export default function Index({ statistics }: IndexProps) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    // Form for editing / creating
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
            <Head title="Impact Statistics - Chapter Four CMS" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-serif font-normal text-white">Impact Numbers & Metrics</h1>
                        <p className="text-xs text-navy-400 mt-1">
                            Live statistics presented to the public on the homepage counter section.
                        </p>
                    </div>

                    {!isCreating && !editingId && (
                        <button
                            onClick={startCreating}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-semibold text-xs shadow-md shadow-amber-500/20 transition-all"
                        >
                            <Plus className="w-4 h-4" /> Add Metric
                        </button>
                    )}
                </div>

                {/* Create / Edit Drawer */}
                {(isCreating || editingId) && (
                    <form onSubmit={handleSave} className="p-6 rounded-2xl bg-navy-900 border border-amber-500/30 space-y-4">
                        <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                            <h3 className="font-serif text-lg text-white">
                                {isCreating ? 'Add New Impact Number' : 'Edit Impact Metric'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => { setIsCreating(false); setEditingId(null); }}
                                className="p-1 rounded hover:bg-navy-800 text-navy-400 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs uppercase font-semibold text-navy-300 mb-1">Prefix (e.g. $)</label>
                                <input
                                    type="text"
                                    value={data.prefix}
                                    onChange={e => setData('prefix', e.target.value)}
                                    placeholder=""
                                    className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-white text-xs focus:outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase font-semibold text-navy-300 mb-1">Numeric Value *</label>
                                <input
                                    type="text"
                                    required
                                    value={data.value}
                                    onChange={e => setData('value', e.target.value)}
                                    placeholder="5000"
                                    className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-white text-xs focus:outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase font-semibold text-navy-300 mb-1">Suffix (e.g. + or %)</label>
                                <input
                                    type="text"
                                    value={data.suffix}
                                    onChange={e => setData('suffix', e.target.value)}
                                    placeholder="+"
                                    className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-white text-xs focus:outline-none focus:border-amber-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs uppercase font-semibold text-navy-300 mb-1">Label *</label>
                                <input
                                    type="text"
                                    required
                                    value={data.label}
                                    onChange={e => setData('label', e.target.value)}
                                    placeholder="e.g. Youth Reached"
                                    className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-white text-xs focus:outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase font-semibold text-navy-300 mb-1">Display Order</label>
                                <input
                                    type="number"
                                    value={data.sort_order}
                                    onChange={e => setData('sort_order', parseInt(e.target.value) || 1)}
                                    className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-white text-xs focus:outline-none focus:border-amber-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase font-semibold text-navy-300 mb-1">Description / Context</label>
                            <input
                                type="text"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                placeholder="Empowered through grassroots civic education and mobile clinics..."
                                className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-white text-xs focus:outline-none focus:border-amber-500"
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => { setIsCreating(false); setEditingId(null); }}
                                className="px-4 py-2 rounded-lg bg-navy-800 text-navy-300 hover:text-white text-xs"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-navy-950 font-semibold text-xs transition-colors shadow-sm disabled:opacity-50"
                            >
                                <Save className="w-3.5 h-3.5" /> Save Metric
                            </button>
                        </div>
                    </form>
                )}

                {/* Table of Statistics */}
                <div className="rounded-xl border border-navy-800 bg-navy-900/40 overflow-hidden">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-navy-900/80 text-navy-400 border-b border-navy-800 uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="py-3 px-4">Order</th>
                                <th className="py-3 px-4">Display Number</th>
                                <th className="py-3 px-4">Metric Label</th>
                                <th className="py-3 px-4">Context Description</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-navy-800/60 text-navy-200">
                            {statistics.map(stat => (
                                <tr key={stat.id} className="hover:bg-navy-800/30 transition-colors">
                                    <td className="py-3.5 px-4 text-navy-400 font-mono">#{stat.sort_order}</td>
                                    <td className="py-3.5 px-4 font-serif text-lg text-amber-400">
                                        {stat.prefix}{stat.value}{stat.suffix}
                                    </td>
                                    <td className="py-3.5 px-4 font-medium text-white">{stat.label}</td>
                                    <td className="py-3.5 px-4 text-navy-400 max-w-sm truncate">{stat.description || '—'}</td>
                                    <td className="py-3.5 px-4 text-right">
                                        <div className="inline-flex items-center gap-1.5">
                                            <button
                                                onClick={() => startEditing(stat)}
                                                title="Edit Metric"
                                                className="p-1 rounded hover:bg-navy-800 text-navy-400 hover:text-amber-400 transition-colors"
                                            >
                                                <Edit3 className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(stat.id, stat.label)}
                                                title="Delete Metric"
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

                    {statistics.length === 0 && (
                        <div className="text-center py-16 text-navy-400">
                            No impact statistics created yet.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
