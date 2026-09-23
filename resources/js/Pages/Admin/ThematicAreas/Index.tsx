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
    cover_image?: string;
    hero_image?: string;
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

    const { data, setData, post, processing, errors, reset } = useForm<{
        title: string;
        slug: string;
        short_description: string;
        body: string;
        icon: string;
        icon_file: File | null;
        cover_image: File | null;
        hero_image: File | null;
        sort_order: number;
        status: string;
    }>({
        title: '',
        slug: '',
        short_description: '',
        body: '',
        icon: 'Globe',
        icon_file: null,
        cover_image: null,
        hero_image: null,
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
            icon_file: null,
            cover_image: null,
            hero_image: null,
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
            icon_file: null,
            cover_image: null,
            hero_image: null,
            sort_order: item.sort_order,
            status: item.status,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            router.post(`/admin/thematic-areas/${editingItem.id}`, {
                _method: 'put',
                ...data,
            } as any, {
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
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-brand-rust/50 shadow-sm"
                    />
                </div>

                <button
                    onClick={openCreate}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-brand-rust hover:bg-brand-crimson text-white transition-all shadow-md shadow-brand-rust/20"
                >
                    <Plus className="w-4 h-4" /> Add Thematic Area
                </button>
            </div>

            {/* Grid of Thematic Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((item) => (
                    <div
                        key={item.id}
                        className="p-5 rounded-2xl bg-white dark:bg-[#0a0e1a] border border-slate-200 dark:border-white/10 hover:border-brand-rust/40 dark:hover:border-brand-rust/40 transition-all flex flex-col justify-between group shadow-sm"
                    >
                        <div>
                            <div className="flex items-center justify-between gap-2 mb-3">
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-brand-rust/10 text-brand-rust dark:bg-brand-rust/20 dark:text-brand-amber border border-brand-rust/20">
                                    Priority #{item.sort_order}
                                </span>
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                    item.status === 'published' 
                                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20' 
                                        : 'bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-400 border border-slate-200 dark:border-slate-500/20'
                                }`}>
                                    {item.status}
                                </span>
                            </div>

                            {item.cover_image && (
                                <div className="mb-3 rounded-xl overflow-hidden h-28 bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
                                    <img
                                        src={item.cover_image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            )}

                            <h3 className="font-serif text-lg text-slate-900 dark:text-white font-bold group-hover:text-brand-rust dark:group-hover:text-brand-amber transition-colors">
                                {item.title}
                            </h3>

                            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed line-clamp-3">
                                {item.short_description || 'No summary description provided.'}
                            </p>
                        </div>

                        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs">
                            <a
                                href={`/what-we-do/${item.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-500 dark:text-slate-400 hover:text-brand-rust dark:hover:text-brand-amber inline-flex items-center gap-1 text-[11px] transition-colors"
                            >
                                View Portal <ExternalLink className="w-3 h-3" />
                            </a>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => openEdit(item)}
                                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                                    title="Edit pillar"
                                >
                                    <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id, item.title)}
                                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 dark:bg-white/5 dark:hover:bg-red-500/20 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                    title="Delete pillar"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-16 text-slate-400 dark:text-slate-500 bg-white dark:bg-[#0a0e1a] rounded-2xl border border-slate-200 dark:border-white/10">
                    No thematic areas found. Click "+ Add Thematic Area" to create one.
                </div>
            )}

            {/* Modal for Create/Edit */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c111e] border border-slate-200 dark:border-white/10 shadow-2xl relative">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10 mb-6">
                            <h2 className="font-serif text-xl text-slate-900 dark:text-white font-bold">
                                {editingItem ? 'Edit Thematic Area' : 'Create New Thematic Area'}
                            </h2>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                    Pillar Title
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-brand-rust/50 focus:outline-none"
                                />
                                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                        Slug (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        placeholder="e.g. human-rights"
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                        Sort Priority
                                    </label>
                                    <input
                                        type="number"
                                        value={data.sort_order}
                                        onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                    Short Summary Description
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.short_description}
                                    onChange={(e) => setData('short_description', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs leading-relaxed focus:outline-none focus:border-brand-rust"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                        Cover Image (Card Preview)
                                    </label>
                                    {editingItem?.cover_image && (
                                        <div className="mb-2 flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                                            <img src={editingItem.cover_image} alt="Current cover" className="w-12 h-10 object-cover rounded-lg" />
                                            <span className="text-[11px] text-slate-500">Current cover. Uploading new replaces it.</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('cover_image', e.target.files ? e.target.files[0] : null)}
                                        className="w-full text-xs text-slate-500 dark:text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-rust/10 file:text-brand-rust hover:file:bg-brand-rust/20 file:transition-colors cursor-pointer"
                                    />
                                    {errors.cover_image && <p className="text-xs text-red-500 mt-1">{errors.cover_image}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                        Hero Background Image
                                    </label>
                                    {editingItem?.hero_image && (
                                        <div className="mb-2 flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                                            <img src={editingItem.hero_image} alt="Current hero" className="w-12 h-10 object-cover rounded-lg" />
                                            <span className="text-[11px] text-slate-500">Current hero. Uploading new replaces it.</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('hero_image', e.target.files ? e.target.files[0] : null)}
                                        className="w-full text-xs text-slate-500 dark:text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-rust/10 file:text-brand-rust hover:file:bg-brand-rust/20 file:transition-colors cursor-pointer"
                                    />
                                    {errors.hero_image && <p className="text-xs text-red-500 mt-1">{errors.hero_image}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                    Icon (Image / SVG Upload or Name)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('icon_file', e.target.files ? e.target.files[0] : null)}
                                    className="w-full text-xs text-slate-500 dark:text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-rust/10 file:text-brand-rust hover:file:bg-brand-rust/20 file:transition-colors cursor-pointer mb-2"
                                />
                                <input
                                    type="text"
                                    value={data.icon}
                                    onChange={(e) => setData('icon', e.target.value)}
                                    placeholder="Or specify Lucide icon name (e.g. Globe, Scale)"
                                    className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                    Status
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                >
                                    <option value="published" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Published</option>
                                    <option value="draft" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Draft</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-brand-rust hover:bg-brand-crimson text-white transition-all shadow-md"
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
