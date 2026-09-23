import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Plus, Edit3, Trash2, Search, CheckCircle2,
    X, Save, FileText
} from 'lucide-react';

interface HrbaPrincipleItem {
    id: number;
    title: string;
    description: string;
    icon?: string;
    sort_order: number;
    status: string;
}

interface HrbaPrinciplesProps {
    hrbaPrinciples: HrbaPrincipleItem[];
}

export default function HrbaPrinciplesIndex({ hrbaPrinciples = [] }: HrbaPrinciplesProps) {
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<HrbaPrincipleItem | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<{
        title: string;
        description: string;
        icon: string;
        icon_file: File | null;
        sort_order: number;
        status: string;
    }>({
        title: '',
        description: '',
        icon: '',
        icon_file: null,
        sort_order: 0,
        status: 'published',
    });

    const openCreate = () => {
        setEditingItem(null);
        reset();
        setData({
            title: '',
            description: '',
            icon: '',
            icon_file: null,
            sort_order: hrbaPrinciples.length + 1,
            status: 'published',
        });
        setModalOpen(true);
    };

    const openEdit = (item: HrbaPrincipleItem) => {
        setEditingItem(item);
        setData({
            title: item.title,
            description: item.description,
            icon: item.icon || '',
            icon_file: null,
            sort_order: item.sort_order,
            status: item.status,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            router.post(`/admin/hrba-principles/${editingItem.id}`, {
                _method: 'put',
                ...data,
            } as any, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            post('/admin/hrba-principles', {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number, title: string) => {
        if (confirm(`Are you sure you want to remove '${title}'?`)) {
            router.delete(`/admin/hrba-principles/${id}`);
        }
    };

    const filtered = hrbaPrinciples.filter((a) =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout
            header="HRBA Principles"
            description="Manage the Human Rights-Based Approach (HRBA) principles."
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin' },
                { label: 'HRBA Principles' },
            ]}
        >
            <Head title="HRBA Principles - Admin" />

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search HRBA principles..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent transition-shadow text-sm"
                    />
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 bg-brand-rust text-white px-4 py-2 rounded-lg hover:bg-brand-rust/90 transition-colors shadow-sm text-sm font-medium whitespace-nowrap"
                >
                    <Plus className="w-4 h-4" />
                    Add Principle
                </button>
            </div>

            {/* Data Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Title</th>
                                <th className="px-6 py-4 font-semibold text-center">Order</th>
                                <th className="px-6 py-4 font-semibold text-center">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filtered.length > 0 ? (
                                filtered.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {item.icon && item.icon.startsWith('/storage/') && (
                                                    <img src={item.icon} alt="" className="w-8 h-8 object-contain rounded-lg bg-slate-50 border border-slate-200 p-1" />
                                                )}
                                                <div>
                                                    <div className="font-medium text-slate-900">{item.title}</div>
                                                    <div className="text-xs text-slate-500 truncate max-w-md mt-1">{item.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center text-slate-600">
                                            {item.sort_order}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {item.status === 'published' ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                                    <FileText className="w-3.5 h-3.5" />
                                                    Draft
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEdit(item)}
                                                    className="p-1.5 text-slate-400 hover:text-brand-rust hover:bg-brand-rust/5 rounded-md transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id, item.title)}
                                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                        No HRBA principles found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-md">
                            <h3 className="text-lg font-bold text-slate-900">
                                {editingItem ? 'Edit Principle' : 'Add Principle'}
                            </h3>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Title */}
                                <div className="space-y-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700">Title *</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent text-sm"
                                    />
                                    {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                                </div>

                                {/* Description */}
                                <div className="space-y-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700">Description *</label>
                                    <textarea
                                        rows={4}
                                        required
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent text-sm resize-y"
                                    />
                                    {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
                                </div>

                                {/* Icon */}
                                <div className="space-y-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700">Icon (Upload SVG/Image or Name)</label>
                                    {editingItem?.icon && editingItem.icon.startsWith('/storage/') && (
                                        <div className="mb-2 flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 border border-slate-200">
                                            <img src={editingItem.icon} alt="Current icon" className="w-8 h-8 object-contain rounded bg-white p-1" />
                                            <span className="text-[11px] text-slate-500">Current icon file saved.</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setData('icon_file', e.target.files ? e.target.files[0] : null)}
                                        className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-rust/10 file:text-brand-rust hover:file:bg-brand-rust/20 cursor-pointer mb-2"
                                    />
                                    <input
                                        type="text"
                                        value={data.icon}
                                        onChange={e => setData('icon', e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent text-sm"
                                        placeholder="Or Lucide icon name, e.g. Scale, ShieldCheck"
                                    />
                                </div>

                                {/* Order & Status */}
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-slate-700">Sort Order</label>
                                    <input
                                        type="number"
                                        value={data.sort_order}
                                        onChange={e => setData('sort_order', Number(e.target.value))}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent text-sm"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-slate-700">Status</label>
                                    <select
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent text-sm"
                                    >
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center gap-2 px-4 py-2 bg-brand-rust text-white text-sm font-medium rounded-lg hover:bg-brand-rust/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-4 h-4" />
                                    {processing ? 'Saving...' : 'Save Principle'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
