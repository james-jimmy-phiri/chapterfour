import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Layers } from 'lucide-react';

interface CrossCuttingActivity {
    id: number;
    area: string;
    description: string | null;
    icon: string | null;
    color_class: string | null;
    bg_class: string | null;
    sort_order: number;
    status: 'published' | 'draft';
}

interface Props { activities: CrossCuttingActivity[]; }

const ICON_SUGGESTIONS = ['Search', 'Megaphone', 'GraduationCap', 'LineChart', 'Wifi', 'Layers', 'HeartPulse', 'Globe', 'Shield', 'Users', 'BookOpen'];
const COLOR_PRESETS = [
    { color: 'text-blue-600', bg: 'bg-blue-50' },
    { color: 'text-red-700', bg: 'bg-red-50' },
    { color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { color: 'text-purple-600', bg: 'bg-purple-50' },
    { color: 'text-sky-600', bg: 'bg-sky-50' },
    { color: 'text-amber-600', bg: 'bg-amber-50' },
    { color: 'text-rose-600', bg: 'bg-rose-50' },
];

const emptyForm = { area: '', description: '', icon: '', color_class: 'text-blue-600', bg_class: 'bg-blue-50', sort_order: 0, status: 'published' as const };

export default function CrossCuttingActivitiesIndex({ activities }: Props) {
    const [editing, setEditing] = useState<CrossCuttingActivity | null>(null);
    const [creating, setCreating] = useState(false);
    const form = useForm<any>(emptyForm);

    const openCreate = () => { form.reset(); form.setData(emptyForm); setCreating(true); setEditing(null); };
    const openEdit = (a: CrossCuttingActivity) => {
        form.reset();
        form.setData({ area: a.area, description: a.description ?? '', icon: a.icon ?? '', color_class: a.color_class ?? '', bg_class: a.bg_class ?? '', sort_order: a.sort_order, status: a.status });
        setEditing(a); setCreating(false);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing) {
            router.put(`/admin/cross-cutting-activities/${editing.id}`, form.data, { onSuccess: () => setEditing(null) });
        } else {
            router.post('/admin/cross-cutting-activities', form.data, { onSuccess: () => setCreating(false) });
        }
    };

    const destroy = (id: number, area: string) => {
        if (!confirm(`Delete activity "${area}"?`)) return;
        router.delete(`/admin/cross-cutting-activities/${id}`);
    };

    const panelOpen = creating || !!editing;

    return (
        <AdminLayout header="Cross-Cutting Activities" breadcrumbs={[{ label: 'Cross-Cutting Activities' }]}>
            <Head title="Cross-Cutting Activities — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">Cross-Cutting Activities</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Manage the activity cards on the Cross-Cutting Activities page.</p>
                </div>
                <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2 bg-brand-rust text-white text-sm font-semibold rounded-lg hover:bg-brand-rust-dark transition">
                    <Plus className="w-4 h-4" /> Add Activity
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {activities.map(act => (
                    <div key={act.id} className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-5 group relative shadow-sm">
                        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition">
                            <button onClick={() => openEdit(act)} className="p-1.5 bg-slate-100 dark:bg-white/10 rounded-lg hover:text-brand-rust transition"><Pencil className="w-3.5 h-3.5" /></button>
                            <button onClick={() => destroy(act.id, act.area)} className="p-1.5 bg-slate-100 dark:bg-white/10 rounded-lg hover:text-red-600 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                        <div className={`w-12 h-12 rounded-xl ${act.bg_class ?? 'bg-slate-100'} flex items-center justify-center mb-4`}>
                            <Layers className={`w-6 h-6 ${act.color_class ?? 'text-slate-500'}`} />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">{act.area}</h3>
                        {act.description && <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{act.description}</p>}
                        <div className="flex items-center gap-2 mt-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${act.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{act.status}</span>
                            {act.icon && <span className="text-[10px] text-slate-400 font-mono">{act.icon}</span>}
                        </div>
                    </div>
                ))}
                {activities.length === 0 && (
                    <div className="col-span-full text-center py-16 text-slate-400 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
                        <Layers className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p>No activities yet. Add cross-cutting activity cards.</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {panelOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-[#0d1120] rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-white/10">
                        <div className="p-6 border-b border-slate-100 dark:border-white/10">
                            <h2 className="font-bold text-slate-900 dark:text-white">{editing ? 'Edit Activity' : 'New Activity'}</h2>
                        </div>
                        <form onSubmit={submit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Area Name *</label>
                                <input value={form.data.area} onChange={e => form.setData('area', e.target.value)} required className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Description</label>
                                <textarea value={form.data.description} onChange={e => form.setData('description', e.target.value)} rows={3} className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust resize-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Icon <span className="font-normal text-slate-400">(Lucide icon name)</span></label>
                                <input value={form.data.icon} onChange={e => form.setData('icon', e.target.value)} placeholder="Layers, Search, Globe…" className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust" />
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                    {ICON_SUGGESTIONS.map(ic => (
                                        <button key={ic} type="button" onClick={() => form.setData('icon', ic)} className={`px-2 py-0.5 rounded text-[10px] font-mono border transition ${form.data.icon === ic ? 'bg-brand-rust text-white border-brand-rust' : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'}`}>{ic}</button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Color Theme</label>
                                <div className="flex flex-wrap gap-2">
                                    {COLOR_PRESETS.map((p, i) => (
                                        <button key={i} type="button" onClick={() => { form.setData('color_class', p.color); form.setData('bg_class', p.bg); }}
                                            className={`w-8 h-8 rounded-lg border-2 transition ${p.bg} ${form.data.color_class === p.color ? 'border-brand-rust scale-110' : 'border-transparent'}`}>
                                            <Layers className={`w-4 h-4 mx-auto ${p.color}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Sort Order</label>
                                    <input type="number" value={form.data.sort_order} onChange={e => form.setData('sort_order', parseInt(e.target.value))} className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Status</label>
                                    <select value={form.data.status} onChange={e => form.setData('status', e.target.value)} className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust">
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" className="flex-1 py-2 bg-brand-rust text-white text-sm font-semibold rounded-lg hover:bg-brand-rust-dark transition">
                                    {editing ? 'Update Activity' : 'Create Activity'}
                                </button>
                                <button type="button" onClick={() => { setCreating(false); setEditing(null); }} className="flex-1 py-2 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-sm font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
