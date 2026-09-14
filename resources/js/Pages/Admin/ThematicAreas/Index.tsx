import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Globe, Plus, Edit3, Trash2, Search, CheckCircle2,
    ExternalLink, X, Save, Scale, ArrowRight
} from 'lucide-react';

interface ThematicAreaItem {
    id: number;
    title: string;
    slug: string;
    short_description?: string;
    body?: string;
    icon?: string;
    sort_order: number;
    status: string;
}

interface ThematicAreasProps {
    thematicAreas: ThematicAreaItem[];
}

export default function ThematicAreasIndex({ thematicAreas = [] }: ThematicAreasProps) {
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ThematicAreaItem | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: '',
        slug: '',
        short_description: '',
        body: '',
        icon: 'Globe',
        sort_order: 0,
        status: 'published',
    });

    const openCreate = () => {
        setEditingItem(null);
        reset();
        setData({
            title: '',
            slug: '',
            short_description: '',
            body: '',
            icon: 'Globe',
            sort_order: thematicAreas.length + 1,
            status: 'published',
        });
        setModalOpen(true);
    };

    const openEdit = (item: ThematicAreaItem) => {
        setEditingItem(item);
        setData({
            title: item.title,
            slug: item.slug,
            short_description: item.short_description || '',
            body: item.body || '',
            icon: item.icon || 'Globe',
            sort_order: item.sort_order,
            status: item.status,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            put(`/admin/thematic-areas/${editingItem.id}`, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            post('/admin/thematic-areas', {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number, title: string) => {
        if (confirm(`Are you sure you want to remove '${title}'?`)) {
            router.delete(`/admin/thematic-areas/${id}`);
        }
    };

    const filtered = thematicAreas.filter((a) =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        (a.short_description && a.short_description.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <AdminLayout
            header="Thematic Areas"
            breadcrumbs={[{ label: 'Content Engine' }, { label: 'Thematic Areas' }]}
        >
            <Head title="Thematic Areas — Chapter Four Admin" />

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search thematic pillars..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                </div>

                <button
                    onClick={openCreate}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-navy-950 transition-all shadow-md shadow-amber-500/10"
                >
                    <Plus className="w-4 h-4" /> Add Thematic Area
                </button>
            </div>

            {/* Grid of Thematic Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((item) => (
                    <div
                        key={item.id}
                        className="p-5 rounded-2xl bg-[#0a0e1a]/90 border border-white/[0.06] hover:border-amber-500/30 transition-all flex flex-col justify-between group"
                    >
                        <div>
                            <div className="flex items-center justify-between gap-2 mb-3">
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                    Priority #{item.sort_order}
                                </span>
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                    item.status === 'published' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-500/20 text-slate-400'
                                }`}>
                                    {item.status}
                                </span>
                            </div>

                            <h3 className="font-serif text-lg text-white font-normal group-hover:text-amber-300 transition-colors">
                                {item.title}
                            </h3>

                            <p className="mt-2 text-xs text-slate-400 font-light leading-relaxed line-clamp-3">
                                {item.short_description || 'No summary description provided.'}
                            </p>
                        </div>

                        <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                            <a
                                href={`/what-we-do/${item.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-400 hover:text-amber-400 inline-flex items-center gap-1 text-[11px] transition-colors"
                            >
                                View Portal <ExternalLink className="w-3 h-3" />
                            </a>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => openEdit(item)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                                    title="Edit pillar"
                                >
                                    <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id, item.title)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                                    title="Delete pillar"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Create/Edit */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-[#0c111e] border border-white/10 shadow-2xl relative">
                        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                            <h2 className="font-serif text-xl text-white font-normal">
                                {editingItem ? 'Edit Thematic Area' : 'Create New Thematic Area'}
                            </h2>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                                    Pillar Title
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:ring-2 focus:ring-amber-500/50"
                                />
                                {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                                        Slug (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        placeholder="e.g. human-rights"
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                                        Sort Priority
                                    </label>
                                    <input
                                        type="number"
                                        value={data.sort_order}
                                        onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                                    Short Summary Description
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.short_description}
                                    onChange={(e) => setData('short_description', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs leading-relaxed"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                                    Status
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#090d16] border border-white/10 text-white text-xs"
                                >
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white bg-white/5"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-navy-950 transition-all shadow-md"
                                >
                                    <Save className="w-3.5 h-3.5" />
                                    {editingItem ? 'Update Pillar' : 'Save Pillar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
