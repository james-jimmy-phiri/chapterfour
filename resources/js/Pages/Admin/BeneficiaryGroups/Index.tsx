import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Plus, Edit3, Trash2, Search, CheckCircle2,
    X, Save, FileText
} from 'lucide-react';

interface BeneficiaryGroupItem {
    id: number;
    name: string;
    description?: string;
    image?: string;
    icon?: string;
    sort_order: number;
    status: string;
}

interface BeneficiaryGroupsProps {
    beneficiaryGroups: BeneficiaryGroupItem[];
}

export default function BeneficiaryGroupsIndex({ beneficiaryGroups = [] }: BeneficiaryGroupsProps) {
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<BeneficiaryGroupItem | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<{
        name: string;
        description: string;
        image: File | null;
        icon: string;
        icon_file: File | null;
        sort_order: number;
        status: string;
    }>({
        name: '',
        description: '',
        image: null,
        icon: '',
        icon_file: null,
        sort_order: 0,
        status: 'published',
    });

    const openCreate = () => {
        setEditingItem(null);
        reset();
        setData({
            name: '',
            description: '',
            image: null,
            icon: '',
            icon_file: null,
            sort_order: beneficiaryGroups.length + 1,
            status: 'published',
        });
        setModalOpen(true);
    };

    const openEdit = (item: BeneficiaryGroupItem) => {
        setEditingItem(item);
        setData({
            name: item.name,
            description: item.description || '',
            image: null,
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
            router.post(`/admin/beneficiary-groups/${editingItem.id}`, {
                _method: 'put',
                ...data,
            } as any, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            post('/admin/beneficiary-groups', {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to remove '${name}'?`)) {
            router.delete(`/admin/beneficiary-groups/${id}`);
        }
    };

    const filtered = beneficiaryGroups.filter((a) =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        (a.description && a.description.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <AdminLayout
            header="Beneficiary Groups"
            description="Manage the beneficiary groups we serve."
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin' },
                { label: 'Beneficiary Groups' },
            ]}
        >
            <Head title="Beneficiary Groups - Admin" />

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search beneficiary groups..."
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
                    Add Group
                </button>
            </div>

            {/* Data Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Name</th>
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
                                                {item.image && (
                                                    <img src={item.image} alt="" className="w-10 h-10 object-cover rounded-lg border border-slate-200" />
                                                )}
                                                <div className="font-medium text-slate-900">{item.name}</div>
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
                                                    onClick={() => handleDelete(item.id, item.name)}
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
                                        No beneficiary groups found.
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
                                {editingItem ? 'Edit Group' : 'Add Group'}
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
                                {/* Name */}
                                <div className="space-y-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700">Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent text-sm"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                                </div>

                                {/* Description */}
                                <div className="space-y-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700">Description</label>
                                    <textarea
                                        rows={3}
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent text-sm resize-y"
                                    />
                                </div>

                                {/* Image & Icon */}
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-slate-700">Image Upload</label>
                                    {editingItem?.image && (
                                        <div className="mb-2 flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 border border-slate-200">
                                            <img src={editingItem.image} alt="Current" className="w-10 h-8 object-cover rounded" />
                                            <span className="text-[11px] text-slate-500">Current image saved.</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setData('image', e.target.files ? e.target.files[0] : null)}
                                        className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-rust/10 file:text-brand-rust hover:file:bg-brand-rust/20 cursor-pointer"
                                    />
                                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-slate-700">Icon (Upload or Component Name)</label>
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
                                        placeholder="Or Lucide icon name, e.g. Users"
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
                                    {processing ? 'Saving...' : 'Save Group'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
