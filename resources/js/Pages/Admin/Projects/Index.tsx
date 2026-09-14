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
    status: string;
    published_at?: string;
}

interface ProjectsProps {
    projects: ProjectItem[];
}

export default function ProjectsIndex({ projects = [] }: ProjectsProps) {
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ProjectItem | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: '',
        slug: '',
        summary: '',
        description: '',
        locations: '',
        beneficiaries: '',
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
            locations: 'Lilongwe, Dowa, Dedza',
            beneficiaries: 'Accused Youth, Rural Families',
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
            status: item.status,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...data,
            locations: data.locations.split(',').map((s) => s.trim()).filter(Boolean),
            beneficiaries: data.beneficiaries.split(',').map((s) => s.trim()).filter(Boolean),
        };

        if (editingItem) {
            router.put(`/admin/projects/${editingItem.id}`, payload, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            router.post('/admin/projects', payload, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number, title: string) => {
        if (confirm(`Delete project '${title}'?`)) {
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
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-amber-500/50"
                    />
                </div>

                <button
                    onClick={openCreate}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-navy-950 transition-all shadow-md"
                >
                    <Plus className="w-4 h-4" /> New Field Project
                </button>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
                {filtered.map((item) => (
                    <div
                        key={item.id}
                        className="p-6 rounded-2xl bg-[#0a0e1a]/90 border border-white/[0.06] hover:border-amber-500/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
                    >
                        <div className="max-w-3xl space-y-2">
                            <div className="flex items-center gap-2.5">
                                <h3 className="font-serif text-lg text-white font-normal group-hover:text-amber-300 transition-colors">
                                    {item.title}
                                </h3>
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                    item.status === 'published' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-500/20 text-slate-400'
                                }`}>
                                    {item.status}
                                </span>
                            </div>

                            <p className="text-xs text-slate-400 font-light leading-relaxed">
                                {item.summary}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400">
                                {item.locations && item.locations.length > 0 && (
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                        <span>{item.locations.join(', ')}</span>
                                    </div>
                                )}
                                {item.beneficiaries && item.beneficiaries.length > 0 && (
                                    <div className="flex items-center gap-1">
                                        <Users className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                        <span>{item.beneficiaries.join(', ')}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                            <a
                                href={`/projects/${item.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 rounded-xl bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 transition-colors text-xs"
                                title="Preview on portal"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                            <button
                                onClick={() => openEdit(item)}
                                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-xs"
                                title="Edit project"
                            >
                                <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDelete(item.id, item.title)}
                                className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors text-xs"
                                title="Delete project"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Create/Edit */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-[#0c111e] border border-white/10 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                            <h2 className="font-serif text-xl text-white font-normal">
                                {editingItem ? 'Edit Field Project' : 'Register New Project'}
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
                                    Project Title
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:ring-2 focus:ring-amber-500/50"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                                    Executive Summary
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.summary}
                                    onChange={(e) => setData('summary', e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs leading-relaxed"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                                        Districts / Locations (Comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.locations}
                                        onChange={(e) => setData('locations', e.target.value)}
                                        placeholder="Lilongwe, Blantyre, Zomba"
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                                        Beneficiaries (Comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.beneficiaries}
                                        onChange={(e) => setData('beneficiaries', e.target.value)}
                                        placeholder="Youth, Detained Persons, Women"
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs"
                                    />
                                </div>
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
