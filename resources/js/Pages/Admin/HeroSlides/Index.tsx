import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Plus, Pencil, Trash2, GripVertical, Eye, EyeOff, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface HeroSlide {
    id: number;
    word: string;
    accent_label: string | null;
    bg_image: string | null;
    right_image: string | null;
    right_alt: string | null;
    sort_order: number;
    status: 'published' | 'draft';
}

interface Props { slides: HeroSlide[]; }

const emptyForm = { word: '', accent_label: '', right_alt: '', sort_order: 0, status: 'published' as const };

export default function HeroSlidesIndex({ slides }: Props) {
    const [editing, setEditing] = useState<HeroSlide | null>(null);
    const [creating, setCreating] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const form = useForm<any>({ ...emptyForm, bg_image: null as File | null, right_image: null as File | null });

    const openCreate = () => { form.reset(); form.setData(emptyForm); setCreating(true); setEditing(null); };
    const openEdit = (s: HeroSlide) => {
        form.reset();
        form.setData({ word: s.word, accent_label: s.accent_label ?? '', right_alt: s.right_alt ?? '', sort_order: s.sort_order, status: s.status, bg_image: null, right_image: null });
        setEditing(s);
        setCreating(false);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing) {
            form.post(`/admin/hero-slides/${editing.id}`, {
                method: 'put',
                forceFormData: true,
                onSuccess: () => setEditing(null),
            });
        } else {
            form.post('/admin/hero-slides', {
                forceFormData: true,
                onSuccess: () => setCreating(false),
            });
        }
    };

    const destroy = (id: number) => {
        if (!confirm('Delete this hero slide?')) return;
        router.delete(`/admin/hero-slides/${id}`, { onSuccess: () => setDeletingId(null) });
    };

    const panelOpen = creating || !!editing;

    return (
        <AdminLayout header="Hero Slides" breadcrumbs={[{ label: 'Hero Slides' }]}>
            <Head title="Hero Slides — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">Hero Slides</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Manage the rotating hero section on the homepage.</p>
                </div>
                <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2 bg-brand-rust text-white text-sm font-semibold rounded-lg hover:bg-brand-rust-dark transition">
                    <Plus className="w-4 h-4" /> Add Slide
                </button>
            </div>

            {/* Slide Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
                {slides.map(slide => (
                    <div key={slide.id} className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm group">
                        <div className="relative h-32 bg-slate-100 dark:bg-slate-800">
                            {slide.bg_image
                                ? <img src={slide.bg_image} alt={slide.word} className="w-full h-full object-cover" />
                                : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-8 h-8 text-slate-300" /></div>
                            }
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                            <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${slide.status === 'published' ? 'bg-emerald-500 text-white' : 'bg-slate-400 text-white'}`}>
                                {slide.status}
                            </span>
                            <p className="absolute bottom-2 left-3 text-white font-black text-xl">{slide.word}</p>
                        </div>
                        <div className="p-3 flex items-center justify-between">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Order: {slide.sort_order}</span>
                            <div className="flex gap-2">
                                <button onClick={() => openEdit(slide)} className="p-1.5 rounded-lg text-slate-500 hover:text-brand-rust hover:bg-slate-100 dark:hover:bg-white/5 transition"><Pencil className="w-4 h-4" /></button>
                                <button onClick={() => destroy(slide.id)} className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </div>
                ))}
                {slides.length === 0 && (
                    <div className="col-span-full text-center py-16 text-slate-400">
                        <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="font-medium">No hero slides yet. Add your first slide.</p>
                    </div>
                )}
            </div>

            {/* Create / Edit Panel */}
            {panelOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-[#0d1120] rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-white/10">
                        <div className="p-6 border-b border-slate-100 dark:border-white/10">
                            <h2 className="font-bold text-slate-900 dark:text-white">{editing ? 'Edit Slide' : 'New Hero Slide'}</h2>
                        </div>
                        <form onSubmit={submit} className="p-6 space-y-4" encType="multipart/form-data">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Headline Word *</label>
                                <input value={form.data.word} onChange={e => form.setData('word', e.target.value)} className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust" required />
                                {form.errors.word && <p className="text-xs text-red-600 mt-1">{form.errors.word}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Accent Label</label>
                                <input value={form.data.accent_label} onChange={e => form.setData('accent_label', e.target.value)} className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Background Image</label>
                                    <input type="file" accept="image/*" onChange={e => form.setData('bg_image', e.target.files?.[0] ?? null)} className="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-brand-rust/10 file:text-brand-rust" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Right Image</label>
                                    <input type="file" accept="image/*" onChange={e => form.setData('right_image', e.target.files?.[0] ?? null)} className="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-brand-rust/10 file:text-brand-rust" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Right Image Alt Text</label>
                                <input value={form.data.right_alt} onChange={e => form.setData('right_alt', e.target.value)} className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Sort Order</label>
                                    <input type="number" value={form.data.sort_order} onChange={e => form.setData('sort_order', parseInt(e.target.value))} className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Status</label>
                                    <select value={form.data.status} onChange={e => form.setData('status', e.target.value as any)} className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust">
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" disabled={form.processing} className="flex-1 py-2 bg-brand-rust text-white text-sm font-semibold rounded-lg hover:bg-brand-rust-dark disabled:opacity-50 transition">
                                    {form.processing ? 'Saving…' : editing ? 'Update Slide' : 'Create Slide'}
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
