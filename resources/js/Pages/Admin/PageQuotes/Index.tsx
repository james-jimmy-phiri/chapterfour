import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Quote } from 'lucide-react';

interface PageQuote {
    id: number;
    quote_text: string;
    attribution: string;
    image: string | null;
    page_key: string | null;
    sort_order: number;
    status: 'published' | 'draft';
}

interface Props { quotes: PageQuote[]; }

const PAGE_KEYS = [
    { value: '', label: 'Global (any page)' },
    { value: 'homepage', label: 'Homepage' },
    { value: 'who_we_are', label: 'Who We Are' },
    { value: 'core_activities', label: 'Core Activities' },
    { value: 'about', label: 'About' },
    { value: 'resources', label: 'Resources' },
];

const emptyForm = { quote_text: '', attribution: '', page_key: '', sort_order: 0, status: 'published' as const };

export default function PageQuotesIndex({ quotes }: Props) {
    const [editing, setEditing] = useState<PageQuote | null>(null);
    const [creating, setCreating] = useState(false);

    const form = useForm<any>({ ...emptyForm, image: null as File | null });

    const openCreate = () => { form.reset(); form.setData({ ...emptyForm, image: null }); setCreating(true); setEditing(null); };
    const openEdit = (q: PageQuote) => {
        form.reset();
        form.setData({ quote_text: q.quote_text, attribution: q.attribution, page_key: q.page_key ?? '', sort_order: q.sort_order, status: q.status, image: null });
        setEditing(q); setCreating(false);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing) {
            form.post(`/admin/page-quotes/${editing.id}`, { method: 'put', forceFormData: true, onSuccess: () => setEditing(null) });
        } else {
            form.post('/admin/page-quotes', { forceFormData: true, onSuccess: () => setCreating(false) });
        }
    };

    const destroy = (id: number, attribution: string) => {
        if (!confirm(`Remove quote by "${attribution}"?`)) return;
        router.delete(`/admin/page-quotes/${id}`);
    };

    const panelOpen = creating || !!editing;

    return (
        <AdminLayout header="Inspirational Quotes" breadcrumbs={[{ label: 'Quotes' }]}>
            <Head title="Page Quotes — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">Inspirational Quotes</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Quotes shown across the site — filter by page key to target specific sections.</p>
                </div>
                <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2 bg-brand-rust text-white text-sm font-semibold rounded-lg hover:bg-brand-rust-dark transition">
                    <Plus className="w-4 h-4" /> Add Quote
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {quotes.map(q => (
                    <div key={q.id} className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-5 relative group shadow-sm">
                        <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition">
                            <button onClick={() => openEdit(q)} className="p-1.5 bg-slate-100 dark:bg-white/10 rounded-lg hover:text-brand-rust transition"><Pencil className="w-3.5 h-3.5" /></button>
                            <button onClick={() => destroy(q.id, q.attribution)} className="p-1.5 bg-slate-100 dark:bg-white/10 rounded-lg hover:text-red-600 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                        <Quote className="w-6 h-6 text-brand-amber mb-3 opacity-60" />
                        <blockquote className="text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed mb-3 line-clamp-4">
                            "{q.quote_text}"
                        </blockquote>
                        <p className="text-xs font-bold text-slate-500">— {q.attribution}</p>
                        <div className="flex items-center gap-2 mt-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${q.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{q.status}</span>
                            {q.page_key && <span className="text-[10px] text-slate-400">{PAGE_KEYS.find(p => p.value === q.page_key)?.label ?? q.page_key}</span>}
                        </div>
                    </div>
                ))}
                {quotes.length === 0 && (
                    <div className="col-span-full text-center py-16 text-slate-400 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
                        <Quote className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p>No quotes yet. Add an inspirational quote.</p>
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {panelOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-[#0d1120] rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-white/10">
                        <div className="p-6 border-b border-slate-100 dark:border-white/10">
                            <h2 className="font-bold text-slate-900 dark:text-white">{editing ? 'Edit Quote' : 'New Quote'}</h2>
                        </div>
                        <form onSubmit={submit} className="p-6 space-y-4" encType="multipart/form-data">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Quote Text *</label>
                                <textarea value={form.data.quote_text} onChange={e => form.setData('quote_text', e.target.value)} rows={5} required className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust resize-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Attribution *</label>
                                <input value={form.data.attribution} onChange={e => form.setData('attribution', e.target.value)} required placeholder="Nelson Mandela" className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Background Image <span className="font-normal text-slate-400">(optional)</span></label>
                                <input type="file" accept="image/*" onChange={e => form.setData('image', e.target.files?.[0] ?? null)} className="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-brand-rust/10 file:text-brand-rust" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Page</label>
                                    <select value={form.data.page_key} onChange={e => form.setData('page_key', e.target.value)} className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust">
                                        {PAGE_KEYS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
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
                            <div className="flex gap-3 pt-2">
                                <button type="submit" disabled={form.processing} className="flex-1 py-2 bg-brand-rust text-white text-sm font-semibold rounded-lg hover:bg-brand-rust-dark disabled:opacity-50 transition">
                                    {editing ? 'Update Quote' : 'Save Quote'}
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
