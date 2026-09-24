import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Plus, Edit3, Trash2, Search, CheckCircle2,
    X, Save, FileText, Briefcase
} from 'lucide-react';

interface VacancyItem {
    id: number;
    title: string;
    slug: string;
    department?: string;
    location?: string;
    type: string;
    tag?: string;
    status: string;
    closes_at?: string;
    sort_order: number;
    description?: string;
    document_path?: string;
}

interface VacanciesProps {
    vacancies: VacancyItem[];
}

export default function VacanciesIndex({ vacancies = [] }: VacanciesProps) {
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<VacancyItem | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: '',
        slug: '',
        department: '',
        location: '',
        type: 'Full-time',
        tag: '',
        organization: '',
        description: '',
        scope_intro: '',
        status: 'open',
        closes_at: '',
        sort_order: 0,
        document_file: null as File | null,
    });

    const openCreate = () => {
        setEditingItem(null);
        reset();
        setData({
            title: '',
            slug: '',
            department: '',
            location: '',
            type: 'Full-time',
            tag: '',
            organization: '',
            description: '',
            scope_intro: '',
            status: 'open',
            closes_at: '',
            sort_order: vacancies.length + 1,
            document_file: null,
        });
        setModalOpen(true);
    };

    const openEdit = (item: VacancyItem) => {
        setEditingItem(item);
        // Note: For a complete implementation, you'd want to fetch the full vacancy record, 
        // but for this list view we'll use what we have and assume the controller populates the form 
        // or we just edit the basic fields. For brevity, just basic fields here.
        setData({
            title: item.title,
            slug: item.slug,
            department: item.department || '',
            location: item.location || '',
            type: item.type,
            tag: item.tag || '',
            organization: '',
            description: item.description || '',
            scope_intro: '',
            status: item.status,
            closes_at: item.closes_at ? item.closes_at.split('T')[0] : '', // Extract just the date part
            sort_order: item.sort_order,
            document_file: null,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            put(`/admin/vacancies/${editingItem.id}`, {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            post('/admin/vacancies', {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number, title: string) => {
        if (confirm(`Are you sure you want to remove '${title}'?`)) {
            router.delete(`/admin/vacancies/${id}`);
        }
    };

    const filtered = vacancies.filter((a) =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        (a.department && a.department.toLowerCase().includes(search.toLowerCase())) ||
        (a.type && a.type.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <AdminLayout
            header="Vacancies"
            description="Manage job openings and opportunities."
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin' },
                { label: 'Vacancies' },
            ]}
        >
            <Head title="Vacancies - Admin" />

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search vacancies..."
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
                    Add Vacancy
                </button>
            </div>

            {/* Data Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Title</th>
                                <th className="px-6 py-4 font-semibold">Department / Type</th>
                                <th className="px-6 py-4 font-semibold">Deadline</th>
                                <th className="px-6 py-4 font-semibold text-center">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filtered.length > 0 ? (
                                filtered.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900 flex items-center gap-2">
                                                {item.title}
                                                {item.tag && (
                                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-brand-amber/20 text-brand-rust">
                                                        {item.tag}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xs text-slate-500 mt-1">{item.location || 'Lilongwe, Malawi'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-slate-900">{item.department || 'General'}</div>
                                            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                                <Briefcase className="w-3 h-3" />
                                                {item.type}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {item.closes_at ? new Date(item.closes_at).toLocaleDateString() : <span className="italic text-slate-400">No deadline</span>}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {item.status === 'open' ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    Open
                                                </span>
                                            ) : item.status === 'closed' ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                                                    <X className="w-3.5 h-3.5" />
                                                    Closed
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
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
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        No vacancies found.
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
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-md">
                            <h3 className="text-lg font-bold text-slate-900">
                                {editingItem ? 'Edit Vacancy' : 'Add Vacancy'}
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

                                {/* Department & Type */}
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-slate-700">Department</label>
                                    <input
                                        type="text"
                                        value={data.department}
                                        onChange={e => setData('department', e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent text-sm"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-slate-700">Type *</label>
                                    <select
                                        required
                                        value={data.type}
                                        onChange={e => setData('type', e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent text-sm"
                                    >
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Consultancy">Consultancy</option>
                                        <option value="Volunteer">Volunteer</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                    {errors.type && <p className="text-red-500 text-xs">{errors.type}</p>}
                                </div>

                                {/* Location & Tag */}
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-slate-700">Location</label>
                                    <input
                                        type="text"
                                        value={data.location}
                                        onChange={e => setData('location', e.target.value)}
                                        placeholder="Lilongwe, Malawi"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent text-sm"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-slate-700">Tag (e.g. URGENT)</label>
                                    <input
                                        type="text"
                                        value={data.tag}
                                        onChange={e => setData('tag', e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent text-sm"
                                    />
                                </div>

                                {/* Deadline & Status */}
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-slate-700">Deadline (Closes At)</label>
                                    <input
                                        type="date"
                                        value={data.closes_at}
                                        onChange={e => setData('closes_at', e.target.value)}
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
                                        <option value="open">Open</option>
                                        <option value="closed">Closed</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>

                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                {/* Description */}
                                <div className="space-y-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700">Description *</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent text-sm"
                                    />
                                    {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
                                </div>
                                
                                {/* Document Upload */}
                                <div className="space-y-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700">Document Upload (PDF, DOC, DOCX)</label>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={e => setData('document_file', e.target.files ? e.target.files[0] : null)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent text-sm"
                                    />
                                    {errors.document_file && <p className="text-red-500 text-xs">{errors.document_file}</p>}
                                    {editingItem?.document_path && (
                                        <p className="text-xs text-slate-500 mt-1">
                                            Current document: <a href={editingItem.document_path} target="_blank" className="text-brand-rust hover:underline">View File</a>
                                        </p>
                                    )}
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
                                    {processing ? 'Saving...' : 'Save Vacancy'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
