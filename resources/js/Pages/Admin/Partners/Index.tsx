import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Building2, Plus, Edit3, Trash2, Search, Globe,
    ExternalLink, X, Save
} from 'lucide-react';

interface PartnerItem {
    id: number;
    name: string;
    slug: string;
    category: string;
    description?: string;
    website?: string;
    sort_order: number;
    status: string;
}

interface PartnersProps {
    partners: PartnerItem[];
}

export default function PartnersIndex({ partners = [] }: PartnersProps) {
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PartnerItem | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        slug: '',
        category: 'civil_society',
        description: '',
        website: '',
        sort_order: 0,
        status: 'published',
    });

    const openCreate = () => {
        setEditingItem(null);
        reset();
        setData({
            name: '',
            slug: '',
            category: 'civil_society',
            description: '',
            website: 'https://',
            sort_order: partners.length + 1,
            status: 'published',
        });
        setModalOpen(true);
    };

    const openEdit = (item: PartnerItem) => {
        setEditingItem(item);
        setData({
            name: item.name,
            slug: item.slug,
            category: item.category,
            description: item.description || '',
            website: item.website || '',
            sort_order: item.sort_order,
            status: item.status,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            put(`/admin/partners/${editingItem.id}`, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            post('/admin/partners', {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Remove partner '${name}'?`)) {
            router.delete(`/admin/partners/${id}`);
        }
    };

    const filtered = partners.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <AdminLayout
            header="Coalition Partners"
            breadcrumbs={[{ label: 'Institutional' }, { label: 'Partners' }]}
        >
            <Head title="Partners Management — Chapter Four Admin" />

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search partners..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-amber-500/50"
                    />
                </div>

                <button
                    onClick={openCreate}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-navy-950 transition-all shadow-md"
                >
                    <Plus className="w-4 h-4" /> Add Partner
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((partner) => (
                    <div
                        key={partner.id}
                        className="p-6 rounded-2xl bg-[#0a0e1a]/90 border border-white/[0.06] hover:border-amber-500/30 transition-all flex flex-col justify-between group"
                    >
                        <div>
                            <div className="flex items-start justify-between gap-2 mb-3">
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                    {partner.category.replace('_', ' ')}
                                </span>
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                    partner.status === 'published' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-500/20 text-slate-400'
                                }`}>
                                    {partner.status}
                                </span>
                            </div>

                            <h3 className="font-serif text-lg text-white font-normal group-hover:text-amber-300 transition-colors">
                                {partner.name}
                            </h3>

                            <p className="mt-2 text-xs text-slate-400 font-light leading-relaxed line-clamp-3">
                                {partner.description || 'No description provided.'}
                            </p>
                        </div>

                        <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                            {partner.website ? (
                                <a
                                    href={partner.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 text-[11px] font-medium"
                                >
                                    Visit Site <ExternalLink className="w-3 h-3" />
                                </a>
                            ) : (
                                <span className="text-[11px] text-slate-500 font-mono">No URL</span>
                            )}

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => openEdit(partner)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                                    title="Edit partner"
                                >
                                    <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(partner.id, partner.name)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                                    title="Remove partner"
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
                    <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#0c111e] border border-white/10 shadow-2xl relative">
                        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                            <h2 className="font-serif text-xl text-white font-normal">
                                {editingItem ? 'Edit Partner' : 'Add Coalition Partner'}
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
                                    Institution / Organization Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:ring-2 focus:ring-amber-500/50"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                                        Partner Category
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#090d16] border border-white/10 text-white text-xs"
                                    >
                                        <option value="civil_society">Civil Society</option>
                                        <option value="statutory_body">Statutory Constitutional Body</option>
                                        <option value="donor_agency">International / Donor Agency</option>
                                        <option value="academia">Academic Institution</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                                        Website URL
                                    </label>
                                    <input
                                        type="url"
                                        value={data.website}
                                        onChange={(e) => setData('website', e.target.value)}
                                        placeholder="https://example.org"
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                                    Brief Collaboration Summary
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs leading-relaxed"
                                />
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
                                    {editingItem ? 'Update Partner' : 'Save Partner'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
