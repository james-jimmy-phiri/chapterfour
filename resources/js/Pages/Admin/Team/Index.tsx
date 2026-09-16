import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Users, Plus, Edit3, Trash2, Search, CheckCircle2,
    X, Save, Shield
} from 'lucide-react';

interface TeamMemberItem {
    id: number;
    name: string;
    role: string;
    department?: string;
    category: string;
    biography?: string;
    sort_order: number;
    status: string;
}

interface TeamProps {
    teamMembers: TeamMemberItem[];
}

export default function TeamIndex({ teamMembers = [] }: TeamProps) {
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TeamMemberItem | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        role: '',
        department: '',
        category: 'staff',
        biography: '',
        sort_order: 0,
        status: 'published',
    });

    const openCreate = () => {
        setEditingItem(null);
        reset();
        setData({
            name: '',
            role: '',
            department: 'Secretariat Leadership',
            category: 'staff',
            biography: '',
            sort_order: teamMembers.length + 1,
            status: 'published',
        });
        setModalOpen(true);
    };

    const openEdit = (item: TeamMemberItem) => {
        setEditingItem(item);
        setData({
            name: item.name,
            role: item.role,
            department: item.department || '',
            category: item.category,
            biography: item.biography || '',
            sort_order: item.sort_order,
            status: item.status,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            put(`/admin/team/${editingItem.id}`, {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            post('/admin/team', {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Remove team member '${name}'?`)) {
            router.delete(`/admin/team/${id}`);
        }
    };

    const filtered = teamMembers.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.role.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout
            header="Leadership & Team"
            breadcrumbs={[{ label: 'Institutional' }, { label: 'Team' }]}
        >
            <Head title="Team Management — Chapter Four Admin" />

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search team members..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:ring-2 focus:ring-brand-rust/50 focus:outline-none shadow-sm"
                    />
                </div>

                <button
                    onClick={openCreate}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-brand-rust hover:bg-brand-crimson text-white transition-all shadow-md shadow-brand-rust/20"
                >
                    <Plus className="w-4 h-4" /> Add Team Member
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((member) => (
                    <div
                        key={member.id}
                        className="p-6 rounded-2xl bg-white dark:bg-[#0a0e1a] border border-slate-200 dark:border-white/10 hover:border-brand-rust/40 dark:hover:border-brand-rust/40 transition-all flex flex-col justify-between group shadow-sm"
                    >
                        <div>
                            <div className="flex items-start justify-between gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-brand-rust/10 border border-brand-rust/20 flex items-center justify-center text-brand-rust dark:text-brand-amber font-serif font-bold text-lg">
                                    {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                                </div>
                                <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
                                    member.category === 'board' 
                                        ? 'bg-purple-50 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 border border-purple-200 dark:border-purple-500/20' 
                                        : 'bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20'
                                }`}>
                                    {member.category}
                                </span>
                            </div>

                            <h3 className="font-serif text-lg text-slate-900 dark:text-white font-bold group-hover:text-brand-rust dark:group-hover:text-brand-amber transition-colors">
                                {member.name}
                            </h3>
                            <div className="text-xs text-brand-rust dark:text-brand-amber font-semibold mt-0.5">{member.role}</div>
                            {member.department && (
                                <div className="text-[11px] text-slate-500 dark:text-slate-400">{member.department}</div>
                            )}

                            <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed line-clamp-3">
                                {member.biography || 'No biography details recorded.'}
                            </p>
                        </div>

                        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs">
                            <span className="text-[11px] text-slate-400 font-mono">
                                Order #{member.sort_order}
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => openEdit(member)}
                                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                                    title="Edit profile"
                                >
                                    <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(member.id, member.name)}
                                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 dark:bg-white/5 dark:hover:bg-red-500/20 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                    title="Remove member"
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
                    No team members found. Click "+ Add Team Member" to add one.
                </div>
            )}

            {/* Modal for Create/Edit */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c111e] border border-slate-200 dark:border-white/10 shadow-2xl relative">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10 mb-6">
                            <h2 className="font-serif text-xl text-slate-900 dark:text-white font-bold">
                                {editingItem ? 'Edit Team Member' : 'Add Team Member'}
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
                                    Full Name & Credentials
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-brand-rust/50 focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                        Official Role
                                    </label>
                                    <input
                                        type="text"
                                        value={data.role}
                                        onChange={(e) => setData('role', e.target.value)}
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                        Category
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                    >
                                        <option value="staff" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Secretariat Staff</option>
                                        <option value="board" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Board of Trustees</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                    Department / Division
                                </label>
                                <input
                                    type="text"
                                    value={data.department}
                                    onChange={(e) => setData('department', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                    Professional Biography
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.biography}
                                    onChange={(e) => setData('biography', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs leading-relaxed focus:outline-none focus:border-brand-rust"
                                />
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
                                    {editingItem ? 'Update Profile' : 'Save Member'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
