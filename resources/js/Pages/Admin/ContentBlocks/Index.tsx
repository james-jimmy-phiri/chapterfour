import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Plus, Pencil, Trash2, FileText, Search } from 'lucide-react';

interface ContentBlock {
    id: number;
    key: string;
    page: string | null;
    section: string | null;
    title: string | null;
    body: string | null;
    sort_order: number;
}

interface Props { blocks: ContentBlock[]; }

const PAGE_OPTIONS = [
    'who_we_are', 'core_activities', 'cross_cutting_activities', 'about',
    'homepage', 'resources', 'projects', 'contact', 'global',
];

const emptyForm = { key: '', page: '', section: '', title: '', body: '', sort_order: 0 };

export default function ContentBlocksIndex({ blocks }: Props) {
    const [editing, setEditing] = useState<ContentBlock | null>(null);
    const [creating, setCreating] = useState(false);
    const [search, setSearch] = useState('');

    const form = useForm<any>(emptyForm);

    const openCreate = () => { form.reset(); form.setData(emptyForm); setCreating(true); setEditing(null); };
    const openEdit = (b: ContentBlock) => {
        form.reset();
        form.setData({ key: b.key, page: b.page ?? '', section: b.section ?? '', title: b.title ?? '', body: b.body ?? '', sort_order: b.sort_order });
        setEditing(b); setCreating(false);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing) {
            router.put(`/admin/content-blocks/${editing.id}`, form.data, { onSuccess: () => setEditing(null) });
        } else {
            router.post('/admin/content-blocks', form.data, { onSuccess: () => setCreating(false) });
        }
    };

    const destroy = (id: number, key: string) => {
        if (!confirm(`Delete content block "${key}"?`)) return;
        router.delete(`/admin/content-blocks/${id}`);
    };

    const panelOpen = creating || !!editing;
    const filtered = blocks.filter(b =>
        !search || b.key.includes(search.toLowerCase()) || (b.title ?? '').toLowerCase().includes(search.toLowerCase()) || (b.page ?? '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout header="Content Blocks" breadcrumbs={[{ label: 'Content Blocks' }]}>
            <Head title="Content Blocks — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">Site Content Blocks</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Reusable rich-text blocks referenced by public pages by unique key.</p>
                </div>
                <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2 bg-brand-rust text-white text-sm font-semibold rounded-lg hover:bg-brand-rust-dark transition">
                    <Plus className="w-4 h-4" /> Add Block
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-5 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by key, page, or title…" className="w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-white/10 rounded-lg text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust" />
            </div>

            <div className="space-y-3">
                {filtered.map(b => (
                    <div key={b.id} className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-4 flex items-start gap-4 group shadow-sm">
                        <div className="w-8 h-8 rounded-lg bg-brand-rust/10 flex items-center justify-center shrink-0 mt-0.5">
                            <FileText className="w-4 h-4 text-brand-rust" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <code className="text-xs font-mono bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">{b.key}</code>
                                {b.page && <span className="text-[10px] bg-blue-50 dark:bg-blue-900/20 text-blue-600 border border-blue-100 dark:border-blue-700 px-2 py-0.5 rounded-full font-medium">{b.page}</span>}
                                {b.section && <span className="text-[10px] bg-purple-50 dark:bg-purple-900/20 text-purple-600 border border-purple-100 dark:border-purple-700 px-2 py-0.5 rounded-full font-medium">{b.section}</span>}
                            </div>
                            {b.title && <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">{b.title}</p>}
                            {b.body && <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{b.body.replace(/<[^>]*>/g, '')}</p>}
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                            <button onClick={() => openEdit(b)} className="p-1.5 rounded-lg text-slate-500 hover:text-brand-rust hover:bg-slate-100 dark:hover:bg-white/5 transition"><Pencil className="w-4 h-4" /></button>
                            <button onClick={() => destroy(b.id, b.key)} className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <div className="text-center py-16 text-slate-400 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
                        <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p>{search ? 'No blocks match your search.' : 'No content blocks yet. Add your first block.'}</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {panelOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-[#0d1120] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-white/10">
                        <div className="p-6 border-b border-slate-100 dark:border-white/10">
                            <h2 className="font-bold text-slate-900 dark:text-white">{editing ? 'Edit Content Block' : 'New Content Block'}</h2>
                            <p className="text-xs text-slate-400 mt-1">The <strong>key</strong> is used in code to fetch this block — choose it carefully.</p>
                        </div>
                        <form onSubmit={submit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Unique Key *</label>
                                <input value={form.data.key} onChange={e => form.setData('key', e.target.value.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_.]/g, ''))} required placeholder="who_we_are.org_overview" className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm font-mono bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust" />
                                {form.errors.key && <p className="text-xs text-red-600 mt-1">{form.errors.key}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Page</label>
                                    <select value={form.data.page} onChange={e => form.setData('page', e.target.value)} className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust">
                                        <option value="">— None —</option>
                                        {PAGE_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Section</label>
                                    <input value={form.data.section} onChange={e => form.setData('section', e.target.value)} placeholder="org_overview, partnerships…" className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Title <span className="font-normal text-slate-400">(optional heading)</span></label>
                                <input value={form.data.title} onChange={e => form.setData('title', e.target.value)} className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Body Content</label>
                                <textarea value={form.data.body} onChange={e => form.setData('body', e.target.value)} rows={10} placeholder="Supports plain text or HTML markup…" className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust resize-y" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Sort Order</label>
                                <input type="number" value={form.data.sort_order} onChange={e => form.setData('sort_order', parseInt(e.target.value))} className="w-32 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust" />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" className="flex-1 py-2 bg-brand-rust text-white text-sm font-semibold rounded-lg hover:bg-brand-rust-dark transition">
                                    {editing ? 'Update Block' : 'Create Block'}
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
