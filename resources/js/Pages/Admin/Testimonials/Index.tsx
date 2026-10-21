import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Star, Plus, Edit3, Trash2, Search, CheckCircle2,
    X, Save, Quote, UserCheck, HeartHandshake
} from 'lucide-react';

interface TestimonialItem {
    id: number;
    name: string;
    role?: string;
    organization?: string;
    quote: string;
    avatar?: string;
    rating: number;
    category: string;
    sort_order: number;
    status: string;
    updated_at: string;
}

interface TestimonialsProps {
    testimonials: TestimonialItem[];
    categories: { value: string; label: string }[];
}

export default function TestimonialsIndex({ testimonials = [], categories }: TestimonialsProps) {
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);

    const { data, setData, reset, processing, errors } = useForm<{
        name: string;
        role: string;
        organization: string;
        quote: string;
        avatar: File | null;
        rating: number;
        category: string;
        sort_order: number;
        status: string;
    }>({
        name: '',
        role: '',
        organization: '',
        quote: '',
        avatar: null,
        rating: 5,
        category: 'community',
        sort_order: 1,
        status: 'published',
    });

    const openCreate = () => {
        setEditingItem(null);
        reset();
        setData({
            name: '',
            role: '',
            organization: '',
            quote: '',
            avatar: null,
            rating: 5,
            category: 'community',
            sort_order: testimonials.length + 1,
            status: 'published',
        });
        setModalOpen(true);
    };

    const openEdit = (item: TestimonialItem) => {
        setEditingItem(item);
        setData({
            name: item.name,
            role: item.role || '',
            organization: item.organization || '',
            quote: item.quote,
            avatar: null,
            rating: item.rating || 5,
            category: item.category || 'community',
            sort_order: item.sort_order || 1,
            status: item.status,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            router.post(`/admin/testimonials/${editingItem.id}`, {
                _method: 'put',
                ...data,
            } as any, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            router.post('/admin/testimonials', data as any, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (item: TestimonialItem) => {
        if (confirm(`Remove testimonial from '${item.name}'?`)) {
            router.delete(`/admin/testimonials/${item.id}`);
        }
    };

    const filtered = testimonials.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        (t.quote && t.quote.toLowerCase().includes(search.toLowerCase())) ||
        (t.organization && t.organization.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <AdminLayout
            header="Testimonials"
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin' },
                { label: 'Testimonials' },
            ]}
        >
            <Head title="Community Stories & Testimonials - Chapter Four CMS" />

            <div className="space-y-6 max-w-7xl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Star className="w-6 h-6 text-brand-rust fill-brand-rust" />
                            Community Voices & Testimonials
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Beneficiary stories, community partner testimonials, and citizen impact reflections.
                        </p>
                    </div>

                    <button
                        onClick={openCreate}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-rust hover:bg-brand-crimson text-white font-semibold text-xs shadow-md shadow-brand-rust/20 transition-all cursor-pointer"
                    >
                        <Plus className="w-4 h-4" /> Add Testimonial
                    </button>
                </div>

                {/* Search */}
                <div className="p-4 rounded-xl bg-white dark:bg-[#0a0e1a] border border-slate-200 dark:border-white/10 flex items-center justify-between shadow-xs">
                    <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by speaker, role, or text..."
                            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:border-brand-rust"
                        />
                    </div>
                </div>

                {/* Testimonial Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.length === 0 ? (
                        <div className="col-span-full py-16 text-center text-slate-400 bg-white dark:bg-[#0a0e1a] rounded-xl border border-slate-200 dark:border-white/10">
                            <Quote className="w-8 h-8 mx-auto mb-2 opacity-30" />
                            No testimonials found. Add a beneficiary or partner quote to display here.
                        </div>
                    ) : (
                        filtered.map((item) => (
                            <div
                                key={item.id}
                                className="p-5 rounded-2xl bg-white dark:bg-[#0a0e1a] border border-slate-200 dark:border-white/10 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative group"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-1 text-amber-400">
                                            {Array.from({ length: item.rating }).map((_, i) => (
                                                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                                            ))}
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                                            item.status === 'published'
                                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20'
                                                : 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </div>

                                    <p className="text-slate-700 dark:text-slate-300 text-xs italic leading-relaxed mb-4">
                                        "{item.quote}"
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {item.avatar ? (
                                            <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-white/10" />
                                        ) : (
                                            <div className="w-9 h-9 rounded-full bg-brand-rust/10 text-brand-rust font-bold flex items-center justify-center text-xs">
                                                {item.name.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <div className="font-semibold text-slate-900 dark:text-white text-xs">{item.name}</div>
                                            <div className="text-[10px] text-slate-500 dark:text-slate-400">
                                                {item.role || item.organization || item.category}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => openEdit(item)}
                                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-brand-rust transition"
                                            title="Edit"
                                        >
                                            <Edit3 className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item)}
                                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-red-500 transition"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Modal */}
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                        <div className="bg-white dark:bg-[#0c101d] rounded-2xl max-w-xl w-full border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-white/10">
                                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                                    {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
                                </h3>
                                <button onClick={() => setModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                            Speaker / Beneficiary Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="e.g. Grace Banda"
                                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                            Category
                                        </label>
                                        <select
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                        >
                                            {categories.map((c) => (
                                                <option key={c.value} value={c.value}>{c.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                            Role / Title
                                        </label>
                                        <input
                                            type="text"
                                            value={data.role}
                                            onChange={(e) => setData('role', e.target.value)}
                                            placeholder="e.g. Community Rights Advocate"
                                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                            Organization / District
                                        </label>
                                        <input
                                            type="text"
                                            value={data.organization}
                                            onChange={(e) => setData('organization', e.target.value)}
                                            placeholder="e.g. Salima District Council"
                                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                        Testimonial / Quote *
                                    </label>
                                    <textarea
                                        rows={4}
                                        required
                                        value={data.quote}
                                        onChange={(e) => setData('quote', e.target.value)}
                                        placeholder="Enter the quote text..."
                                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                            Speaker Photo / Avatar
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setData('avatar', e.target.files?.[0] || null)}
                                            className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-rust file:text-white cursor-pointer"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                            Status
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                        >
                                            <option value="published">Published</option>
                                            <option value="draft">Draft</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setModalOpen(false)}
                                        className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-5 py-2 rounded-lg bg-brand-rust hover:bg-brand-rust-dark text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
                                    >
                                        <Save className="w-3.5 h-3.5" />
                                        {editingItem ? 'Save Changes' : 'Add Testimonial'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
