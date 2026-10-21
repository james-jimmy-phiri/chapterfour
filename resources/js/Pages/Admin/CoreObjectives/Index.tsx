import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp, Target } from 'lucide-react';

interface CoreObjective {
    id: number;
    title: string;
    description: string | null;
    icon: string | null;
    activities: string[] | null;
    page_scope: string;
    sort_order: number;
    status: 'published' | 'draft';
}

interface Props { objectives: CoreObjective[]; }

const PAGE_SCOPES = [
    { value: 'who_we_are', label: 'Who We Are Page' },
    { value: 'core_activities', label: 'Core Activities Page' },
    { value: 'both', label: 'Both Pages' },
];

const emptyForm = { title: '', description: '', icon: '', activities: '' as any, page_scope: 'core_activities', sort_order: 0, status: 'published' as const };

export default function CoreObjectivesIndex({ objectives }: Props) {
    const [editing, setEditing] = useState<CoreObjective | null>(null);
    const [creating, setCreating] = useState(false);
    const [expanded, setExpanded] = useState<number | null>(null);

    const form = useForm<any>(emptyForm);

    const openCreate = () => { form.reset(); form.setData(emptyForm); setCreating(true); setEditing(null); };
    const openEdit = (obj: CoreObjective) => {
        form.reset();
        form.setData({
            title: obj.title, description: obj.description ?? '', icon: obj.icon ?? '',
            activities: (obj.activities ?? []).join('\n'), page_scope: obj.page_scope,
            sort_order: obj.sort_order, status: obj.status,
        });
        setEditing(obj); setCreating(false);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            ...form.data,
            activities: typeof form.data.activities === 'string'
                ? form.data.activities.split('\n').map((s: string) => s.trim()).filter(Boolean)
                : form.data.activities,
        };
        if (editing) {
            router.put(`/admin/core-objectives/${editing.id}`, data, { onSuccess: () => setEditing(null) });
        } else {
            router.post('/admin/core-objectives', data, { onSuccess: () => setCreating(false) });
        }
    };

    const destroy = (id: number, title: string) => {
        if (!confirm(`Delete objective "${title}"?`)) return;
        router.delete(`/admin/core-objectives/${id}`);
    };

    const panelOpen = creating || !!editing;

    return (
        <AdminLayout header="Core Objectives" breadcrumbs={[{ label: 'Core Objectives' }]}>
            <Head title="Core Objectives — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">Core Objectives</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Manage the strategic objectives shown on the Core Activities and Who We Are pages.</p>
                </div>
                <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2 bg-brand-rust text-white text-sm font-semibold rounded-lg hover:bg-brand-rust-dark transition">
                    <Plus className="w-4 h-4" /> Add Objective
                </button>
            </div>

            <div className="space-y-4">
                {objectives.map(obj => (
                    <div key={obj.id} className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
                        <div className="flex items-center gap-4 p-4">
                            <div className="w-10 h-10 rounded-xl bg-brand-rust/10 flex items-center justify-center shrink-0">
                                <Target className="w-5 h-5 text-brand-rust" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{obj.title}</h3>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${obj.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{obj.status}</span>
                                    <span className="text-[10px] text-slate-400">{PAGE_SCOPES.find(s => s.value === obj.page_scope)?.label}</span>
                                    <span className="text-[10px] text-slate-400">• {obj.activities?.length ?? 0} activities</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => openEdit(obj)} className="p-1.5 rounded-lg text-slate-500 hover:text-brand-rust hover:bg-slate-100 dark:hover:bg-white/5 transition"><Pencil className="w-4 h-4" /></button>
                                <button onClick={() => destroy(obj.id, obj.title)} className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"><Trash2 className="w-4 h-4" /></button>
                                <button onClick={() => setExpanded(expanded === obj.id ? null : obj.id)} className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition">
                                    {expanded === obj.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                        {expanded === obj.id && obj.activities && obj.activities.length > 0 && (
                            <div className="px-4 pb-4 pt-0 border-t border-slate-100 dark:border-white/10">
                                <ul className="mt-3 space-y-1.5">
                                    {obj.activities.map((act, i) => (
                                        <li key={i} className="flex gap-2 text-xs text-slate-600 dark:text-slate-300">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-amber mt-1.5 shrink-0" />
                                            {act}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
                {objectives.length === 0 && (
                    <div className="text-center py-16 text-slate-400 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
                        <Target className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p>No objectives yet. Add your first core objective.</p>
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {panelOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-[#0d1120] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-white/10">
                        <div className="p-6 border-b border-slate-100 dark:border-white/10">
                            <h2 className="font-bold text-slate-900 dark:text-white">{editing ? 'Edit Objective' : 'New Core Objective'}</h2>
                        </div>
                        <form onSubmit={submit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Title *</label>
                                <input value={form.data.title} onChange={e => form.setData('title', e.target.value)} required className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Description</label>
                                <textarea value={form.data.description} onChange={e => form.setData('description', e.target.value)} rows={3} className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust resize-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Activities <span className="font-normal text-slate-400">(one per line)</span></label>
                                <textarea value={form.data.activities} onChange={e => form.setData('activities', e.target.value)} rows={8} placeholder="Conduct community human rights awareness...&#10;Facilitate legal aid referrals..." className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm font-mono bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust resize-y" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Page Scope</label>
                                    <select value={form.data.page_scope} onChange={e => form.setData('page_scope', e.target.value)} className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust">
                                        {PAGE_SCOPES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Status</label>
                                    <select value={form.data.status} onChange={e => form.setData('status', e.target.value)} className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust">
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Icon (Lucide name)</label>
                                    <input value={form.data.icon} onChange={e => form.setData('icon', e.target.value)} placeholder="Scale, Globe, ShieldAlert…" className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Sort Order</label>
                                    <input type="number" value={form.data.sort_order} onChange={e => form.setData('sort_order', parseInt(e.target.value))} className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust" />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" className="flex-1 py-2 bg-brand-rust text-white text-sm font-semibold rounded-lg hover:bg-brand-rust-dark transition">
                                    {editing ? 'Update Objective' : 'Create Objective'}
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
