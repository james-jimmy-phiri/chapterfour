import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Briefcase, Plus, Edit3, Trash2, Search, MapPin, Users,
    CheckCircle2, ExternalLink, X, Save
} from 'lucide-react';

interface ProjectItem {
    id: number;
    title: string;
    slug: string;
    summary: string;
    description?: string;
    locations?: string[];
    beneficiaries?: string[];
    featured_image?: string;
    gallery?: string[];
    status: string;
    published_at?: string;
    start_date?: string;
    end_date?: string;
    outputs?: string[];
}

interface ProjectsProps {
    projects: ProjectItem[];
}

export default function ProjectsIndex({ projects = [] }: ProjectsProps) {
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ProjectItem | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<{
        title: string;
        slug: string;
        summary: string;
        description: string;
        locations: string;
        beneficiaries: string;
        outputs: string;
        start_date: string;
        end_date: string;
        featured_image: File | null;
        gallery_images: File[];
        status: string;
    }>({
        title: '',
        slug: '',
        summary: '',
        description: '',
        locations: '',
        beneficiaries: '',
        outputs: '',
        start_date: '',
        end_date: '',
        featured_image: null,
        gallery_images: [],
        status: 'published',
    });

    const openCreate = () => {
        setEditingItem(null);
        reset();
        setData({
            title: '',
            slug: '',
            summary: '',
            description: '',
            locations: '',
            beneficiaries: '',
            outputs: '',
            start_date: '',
            end_date: '',
            featured_image: null,
            gallery_images: [],
            status: 'published',
        });
        setModalOpen(true);
    };

    const openEdit = (item: ProjectItem) => {
        setEditingItem(item);
        setData({
            title: item.title,
            slug: item.slug,
            summary: item.summary,
            description: item.description || '',
            locations: Array.isArray(item.locations) ? item.locations.join(', ') : '',
            beneficiaries: Array.isArray(item.beneficiaries) ? item.beneficiaries.join(', ') : '',
            outputs: Array.isArray(item.outputs) ? item.outputs.join('\n') : '',
            start_date: item.start_date || '',
            end_date: item.end_date || '',
            featured_image: null,
            gallery_images: [],
            status: item.status,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        if (data.slug) formData.append('slug', data.slug);
        formData.append('summary', data.summary);
        if (data.description) formData.append('description', data.description);
        formData.append('status', data.status);

        const locs = data.locations.split(',').map((s) => s.trim()).filter(Boolean);
        locs.forEach((l) => formData.append('locations[]', l));

        const bens = data.beneficiaries.split(',').map((s) => s.trim()).filter(Boolean);
        bens.forEach((b) => formData.append('beneficiaries[]', b));

        const outs = data.outputs.split('\n').map((s) => s.trim()).filter(Boolean);
        outs.forEach((o) => formData.append('outputs[]', o));

        if (data.start_date) formData.append('start_date', data.start_date);
        if (data.end_date) formData.append('end_date', data.end_date);

        if (data.featured_image) {
            formData.append('featured_image', data.featured_image);
        }

        if (data.gallery_images && data.gallery_images.length > 0) {
            data.gallery_images.forEach((file) => {
                formData.append('gallery_images[]', file);
            });
        }

        if (editingItem) {
            formData.append('_method', 'put');
            router.post(`/admin/projects/${editingItem.id}`, formData as any, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            router.post('/admin/projects', formData as any, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this field project?')) {
            router.delete(`/admin/projects/${id}`);
        }
    };

    const filtered = projects.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.summary.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout
            header="Field Projects"
            breadcrumbs={[{ label: 'Content Engine' }, { label: 'Projects' }]}
        >
            <Head title="Projects Management — Chapter Four Admin" />

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search field projects..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:ring-1 focus:ring-brand-rust"
                    />
                </div>

                <button
                    onClick={openCreate}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold bg-brand-rust hover:bg-brand-rust-dark text-white transition shadow-sm"
                >
                    <Plus className="w-4 h-4" /> New Field Project
                </button>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
                {filtered.map((item) => (
                    <div
                        key={item.id}
                        className="p-6 rounded-xl bg-white dark:bg-[#0a0e1a] border border-slate-200 dark:border-white/[0.06] hover:border-brand-rust/40 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs group"
                    >
                        <div className="flex items-start gap-4 max-w-3xl">
                            {item.featured_image ? (
                                <img
                                    src={item.featured_image}
                                    alt=""
                                    className="w-20 h-20 rounded-xl object-cover border border-slate-200 dark:border-white/10 shrink-0"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0">
                                    <Briefcase className="w-7 h-7 text-slate-300 dark:text-white/20" />
                                </div>
                            )}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2.5">
                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-rust transition-colors">
                                        {item.title}
                                    </h3>
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                    item.status === 'published'
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                        : 'bg-slate-100 text-slate-600'
                                }`}>
                                    {item.status}
                                </span>
                            </div>

                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                {item.summary}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-500">
                                {item.locations && item.locations.length > 0 && (
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5 text-brand-rust shrink-0" />
                                        <span>{item.locations.join(', ')}</span>
                                    </div>
                                )}
                                {item.beneficiaries && item.beneficiaries.length > 0 && (
                                    <div className="flex items-center gap-1">
                                        <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                        <span>{item.beneficiaries.join(', ')}</span>
                                    </div>
                                )}
                                {item.gallery && item.gallery.length > 0 && (
                                    <div className="flex items-center gap-1">
                                        <Briefcase className="w-3.5 h-3.5 text-brand-rust shrink-0" />
                                        <span>{item.gallery.length} photos</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                            <a
                                href={`/projects/${item.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-brand-rust transition text-xs"
                                title="Preview on portal"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                            <button
                                onClick={() => openEdit(item)}
                                className="p-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-brand-rust transition text-xs"
                                title="Edit Project"
                            >
                                <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="p-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-red-600 transition text-xs"
                                title="Delete Project"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="p-12 text-center text-xs text-slate-500 bg-white dark:bg-[#0a0e1a] rounded-xl border border-slate-200 dark:border-white/10">
                        No projects found matching your search.
                    </div>
                )}
            </div>

            {/* Modal for Create/Edit */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <div className="w-full max-w-2xl p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0c111e] border border-slate-200 dark:border-white/10 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-6">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                {editingItem ? 'Edit Field Project' : 'Register New Project'}
                            </h2>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                    Project Title
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-brand-rust"
                                />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                    Executive Summary
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.summary}
                                    onChange={(e) => setData('summary', e.target.value)}
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs leading-relaxed"
                                />
                                {errors.summary && <p className="text-red-500 text-xs mt-1">{errors.summary}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                    Full Description (Paragraphs preserved)
                                </label>
                                <textarea
                                    rows={8}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs leading-relaxed"
                                    placeholder="Enter full project description..."
                                />
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                        Districts / Locations (Comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.locations}
                                        onChange={(e) => setData('locations', e.target.value)}
                                        placeholder="Lilongwe, Blantyre, Zomba"
                                        className="w-full px-4 py-2 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs"
                                    />
                                    {errors.locations && <p className="text-red-500 text-xs mt-1">{errors.locations}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                        Beneficiaries (Comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.beneficiaries}
                                        onChange={(e) => setData('beneficiaries', e.target.value)}
                                        placeholder="Youth, Detained Persons, Women"
                                        className="w-full px-4 py-2 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs"
                                    />
                                    {errors.beneficiaries && <p className="text-red-500 text-xs mt-1">{errors.beneficiaries}</p>}
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs"
                                    />
                                    {errors.start_date && <p className="text-red-500 text-xs mt-1">{errors.start_date}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs"
                                    />
                                    {errors.end_date && <p className="text-red-500 text-xs mt-1">{errors.end_date}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                    Key Outcomes / Outputs (One per line)
                                </label>
                                <textarea
                                    rows={4}
                                    value={data.outputs}
                                    onChange={(e) => setData('outputs', e.target.value)}
                                    placeholder="Enter multiple outcomes..."
                                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs leading-relaxed"
                                />
                                {errors.outputs && <p className="text-red-500 text-xs mt-1">{errors.outputs}</p>}
                            </div>

                            {/* Featured Image & Gallery */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                        Featured Image
                                    </label>
                                    {editingItem?.featured_image && (
                                        <div className="mb-2 flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                                            <img src={editingItem.featured_image} alt="Current" className="w-12 h-10 object-cover rounded-lg" />
                                            <span className="text-[11px] text-slate-500">Current image saved.</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('featured_image', e.target.files ? e.target.files[0] : null)}
                                        className="w-full text-xs text-slate-500 dark:text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-rust/10 file:text-brand-rust hover:file:bg-brand-rust/20 cursor-pointer"
                                    />
                                    {errors.featured_image && <p className="text-red-500 text-xs mt-1">{errors.featured_image}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                        Gallery Images (Multiple)
                                    </label>
                                    {editingItem?.gallery && editingItem.gallery.length > 0 && (
                                        <div className="mb-2 flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                                            {editingItem.gallery.map((g, idx) => (
                                                <img key={idx} src={g} alt="" className="w-8 h-8 object-cover rounded" />
                                            ))}
                                            <span className="text-[10px] text-slate-500 ml-1">({editingItem.gallery.length} saved)</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => setData('gallery_images', e.target.files ? Array.from(e.target.files) : [])}
                                        className="w-full text-xs text-slate-500 dark:text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-rust/10 file:text-brand-rust hover:file:bg-brand-rust/20 cursor-pointer"
                                    />
                                    {errors.gallery_images && <p className="text-red-500 text-xs mt-1">{errors.gallery_images}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                    Status
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-[#090d16] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs"
                                >
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-brand-rust hover:bg-brand-rust-dark text-white transition shadow-sm"
                                >
                                    <Save className="w-3.5 h-3.5" />
                                    {editingItem ? 'Update Project' : 'Save Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
