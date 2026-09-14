import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Users, Shield, Plus, Search, Filter, Edit3, Trash2,
    CheckCircle2, AlertTriangle, Clock, RefreshCw, MoreVertical,
    UserCheck, UserX, Building2, Mail, Phone, Lock, ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { PaginatedData, User, Role } from '@/types';
import UserModal from './UserModal';

interface IndexProps {
    users: PaginatedData<User>;
    stats: {
        total: number;
        active: number;
        pending: number;
        suspended: number;
        inactive: number;
        trashed: number;
    };
    filters: {
        search: string;
        status: string;
        role: string;
        department: string;
    };
    roles: Role[];
    departments: string[];
}

export default function Index({
    users,
    stats,
    filters,
    roles,
    departments,
}: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeActionMenu, setActiveActionMenu] = useState<number | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/users', { ...filters, search }, { preserveState: true });
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get('/admin/users', { ...filters, [key]: value }, { preserveState: true });
    };

    const handleDelete = (user: User) => {
        if (confirm(`Are you sure you want to deactivate and remove access for "${user.full_name || user.name}"?`)) {
            router.delete(`/admin/users/${user.id}`, {
                preserveScroll: true,
            });
        }
    };

    const handleRestore = (id: number) => {
        router.post(`/admin/users/${id}/restore`, {}, {
            preserveScroll: true,
        });
    };

    const handleToggleStatus = (user: User, newStatus: 'active' | 'suspended') => {
        router.patch(`/admin/users/${user.id}/status`, { status: newStatus }, {
            preserveScroll: true,
        });
        setActiveActionMenu(null);
    };

    const openCreateModal = () => {
        setSelectedUser(null);
        setIsModalOpen(true);
    };

    const openEditModal = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
        setActiveActionMenu(null);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Active
                    </span>
                );
            case 'pending':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Clock className="w-3 h-3" />
                        Pending
                    </span>
                );
            case 'suspended':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        <UserX className="w-3 h-3" />
                        Suspended
                    </span>
                );
            case 'inactive':
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20">
                        Inactive
                    </span>
                );
        }
    };

    const getRoleBadge = (roleName: string) => {
        switch (roleName) {
            case 'super-admin':
                return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
            case 'admin':
                return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
            case 'content-manager':
                return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
            case 'communications-officer':
                return 'bg-violet-500/10 text-violet-400 border-violet-500/30';
            case 'editor':
                return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
            default:
                return 'bg-slate-500/10 text-slate-400 border-white/[0.08]';
        }
    };

    return (
        <AdminLayout
            header="Staff & User Access Control"
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin' },
                { label: 'Users & Permissions' },
            ]}
        >
            <Head title="Staff Directory & Access Control - Chapter Four CMS" />

            <div className="space-y-6">
                {/* Header Actions & Nav Tabs */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-serif font-normal text-white">
                                Staff & Access Management
                            </h1>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                RBAC Enabled
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                            Control organizational staff profiles, security credentials, and granular Spatie permissions.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/roles"
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 font-medium text-xs transition-colors"
                        >
                            <Shield className="w-3.5 h-3.5 text-amber-400" />
                            Manage Roles & Privileges
                        </Link>
                        <button
                            onClick={openCreateModal}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-semibold text-xs shadow-md shadow-amber-500/20 transition-all"
                        >
                            <Plus className="w-4 h-4" /> Add Staff User
                        </button>
                    </div>
                </div>

                {/* Sub Navigation Tabs */}
                <div className="flex items-center gap-1 border-b border-white/[0.06] pb-px">
                    <Link
                        href="/admin/users"
                        className="px-4 py-2 text-xs font-semibold border-b-2 border-amber-500 text-amber-400 flex items-center gap-2"
                    >
                        <Users className="w-3.5 h-3.5" /> Staff Directory ({stats.total})
                    </Link>
                    <Link
                        href="/admin/roles"
                        className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 border-b-2 border-transparent flex items-center gap-2 transition-colors"
                    >
                        <Shield className="w-3.5 h-3.5" /> Roles & Permissions Matrix
                    </Link>
                </div>

                {/* KPI Metrics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-[#090d16] border border-white/[0.06] shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-400">Total Users</span>
                            <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-slate-300">
                                <Users className="w-3.5 h-3.5" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold font-mono text-white mt-2">
                            {stats.total}
                        </div>
                        <span className="text-[11px] text-slate-500 mt-0.5 block">Across all departments</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#090d16] border border-white/[0.06] shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-emerald-400">Active Accounts</span>
                            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                <UserCheck className="w-3.5 h-3.5" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold font-mono text-emerald-400 mt-2">
                            {stats.active}
                        </div>
                        <span className="text-[11px] text-emerald-500/80 mt-0.5 block">Full operational access</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#090d16] border border-white/[0.06] shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-amber-400">Pending Setup</span>
                            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                                <Clock className="w-3.5 h-3.5" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold font-mono text-amber-400 mt-2">
                            {stats.pending}
                        </div>
                        <span className="text-[11px] text-amber-500/80 mt-0.5 block">Awaiting confirmation</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#090d16] border border-white/[0.06] shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-rose-400">Suspended / Deactivated</span>
                            <div className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400">
                                <UserX className="w-3.5 h-3.5" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold font-mono text-rose-400 mt-2">
                            {stats.suspended + stats.inactive}
                        </div>
                        <span className="text-[11px] text-rose-500/80 mt-0.5 block">Access blocked</span>
                    </div>
                </div>

                {/* Search & Filters Toolbar */}
                <div className="p-4 rounded-2xl bg-[#090d16] border border-white/[0.06] space-y-3">
                    <div className="flex flex-col md:flex-row items-center gap-3 justify-between">
                        {/* Search Input */}
                        <form onSubmit={handleSearch} className="relative w-full md:w-80">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search by name, email, employee ID..."
                                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500/50"
                            />
                        </form>

                        {/* Dropdown Filters */}
                        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                            {/* Department Filter */}
                            <select
                                value={filters.department}
                                onChange={e => handleFilterChange('department', e.target.value)}
                                className="px-3 py-2 rounded-xl bg-[#0b0f19] border border-white/[0.08] text-slate-300 text-xs focus:outline-none focus:border-amber-500/50"
                            >
                                <option value="all">All Departments</option>
                                {departments.map(dept => (
                                    <option key={dept} value={dept}>
                                        {dept}
                                    </option>
                                ))}
                            </select>

                            {/* Role Filter */}
                            <select
                                value={filters.role}
                                onChange={e => handleFilterChange('role', e.target.value)}
                                className="px-3 py-2 rounded-xl bg-[#0b0f19] border border-white/[0.08] text-slate-300 text-xs focus:outline-none focus:border-amber-500/50"
                            >
                                <option value="all">All Roles</option>
                                {roles.map(r => (
                                    <option key={r.id} value={r.name}>
                                        {r.display_name || r.name}
                                    </option>
                                ))}
                            </select>

                            {(filters.search || filters.status !== 'all' || filters.role !== 'all' || filters.department !== 'all') && (
                                <button
                                    onClick={() => router.get('/admin/users')}
                                    className="px-2.5 py-2 text-xs text-amber-400 hover:text-amber-300 transition-colors"
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Status Pills */}
                    <div className="flex items-center gap-1.5 pt-2 border-t border-white/[0.04] overflow-x-auto">
                        <span className="text-[11px] text-slate-500 mr-2 flex items-center gap-1 shrink-0">
                            <Filter className="w-3 h-3" /> Status:
                        </span>
                        {[
                            { key: 'all', label: 'All Users' },
                            { key: 'active', label: 'Active' },
                            { key: 'pending', label: 'Pending' },
                            { key: 'suspended', label: 'Suspended' },
                            { key: 'inactive', label: 'Inactive' },
                            { key: 'trashed', label: 'Trash Archive' },
                        ].map(st => (
                            <button
                                key={st.key}
                                onClick={() => handleFilterChange('status', st.key)}
                                className={`px-2.5 py-1 rounded-lg text-xs transition-all shrink-0 ${
                                    filters.status === st.key
                                        ? 'bg-amber-500 text-navy-950 font-semibold shadow-sm'
                                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                                }`}
                            >
                                {st.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Users Table */}
                <div className="rounded-2xl bg-[#090d16] border border-white/[0.06] overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/[0.06] bg-white/[0.02] text-[11px] uppercase tracking-wider text-slate-400">
                                    <th className="py-3.5 px-4 font-medium">User Profile</th>
                                    <th className="py-3.5 px-4 font-medium">Department & Title</th>
                                    <th className="py-3.5 px-4 font-medium">Security Roles</th>
                                    <th className="py-3.5 px-4 font-medium">Status</th>
                                    <th className="py-3.5 px-4 font-medium">Joined / Activity</th>
                                    <th className="py-3.5 px-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.04] text-xs">
                                {users.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-slate-400">
                                            <div className="max-w-sm mx-auto space-y-2">
                                                <Users className="w-8 h-8 text-slate-500 mx-auto" />
                                                <p className="text-sm font-medium text-slate-300">No staff accounts found</p>
                                                <p className="text-xs text-slate-500">
                                                    Try adjusting your search criteria or register a new team member.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    users.data.map(u => (
                                        <tr key={u.id} className="hover:bg-white/[0.02] transition-colors group">
                                            {/* Profile Info */}
                                            <td className="py-3.5 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/[0.1] bg-navy-950 shrink-0">
                                                        <img
                                                            src={u.avatar_url}
                                                            alt={u.full_name || u.name || 'User'}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="font-medium text-white group-hover:text-amber-400 transition-colors truncate">
                                                                {u.full_name || u.name}
                                                            </span>
                                                            {u.employee_id && (
                                                                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded border bg-white/[0.03] text-slate-400 border-white/[0.06]">
                                                                    {u.employee_id}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                                                            <span className="truncate">{u.email}</span>
                                                            {u.phone && (
                                                                <span className="text-slate-500 hidden sm:inline">• {u.phone}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Department & Title */}
                                            <td className="py-3.5 px-4 text-slate-300">
                                                <div className="font-medium">{u.job_title || 'Staff Member'}</div>
                                                <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                                                    <Building2 className="w-3 h-3 text-slate-500" />
                                                    {u.department || 'Unassigned'}
                                                </div>
                                            </td>

                                            {/* Roles */}
                                            <td className="py-3.5 px-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {u.roles && u.roles.length > 0 ? (
                                                        u.roles.map(r => (
                                                            <span
                                                                key={r.id}
                                                                className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${getRoleBadge(r.name)}`}
                                                            >
                                                                {r.name === 'super-admin' ? 'Super Admin' : (r.display_name || r.name)}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-[10px] text-slate-500 italic">No role</span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="py-3.5 px-4">
                                                {getStatusBadge(u.status)}
                                            </td>

                                            {/* Joined / Last Activity */}
                                            <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                                                <div>
                                                    {u.created_at ? new Date(u.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                                                </div>
                                                {u.last_login_at && (
                                                    <div className="text-slate-500 text-[10px] mt-0.5">
                                                        Login: {new Date(u.last_login_at).toLocaleDateString()}
                                                    </div>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="py-3.5 px-4 text-right">
                                                {filters.status === 'trashed' ? (
                                                    <button
                                                        onClick={() => handleRestore(u.id)}
                                                        className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-xs transition-colors flex items-center gap-1 ml-auto"
                                                    >
                                                        <RefreshCw className="w-3 h-3" /> Restore
                                                    </button>
                                                ) : (
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <button
                                                            onClick={() => openEditModal(u)}
                                                            title="Edit User"
                                                            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-white/[0.06] transition-colors"
                                                        >
                                                            <Edit3 className="w-3.5 h-3.5" />
                                                        </button>

                                                        {u.status === 'active' ? (
                                                            <button
                                                                onClick={() => handleToggleStatus(u, 'suspended')}
                                                                title="Suspend User"
                                                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/[0.06] transition-colors"
                                                            >
                                                                <UserX className="w-3.5 h-3.5" />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleToggleStatus(u, 'active')}
                                                                title="Activate User"
                                                                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-white/[0.06] transition-colors"
                                                            >
                                                                <UserCheck className="w-3.5 h-3.5" />
                                                            </button>
                                                        )}

                                                        <button
                                                            onClick={() => handleDelete(u)}
                                                            title="Delete User"
                                                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/[0.06] transition-colors"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {users.links && users.links.length > 3 && (
                        <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                            <div>
                                Showing <span className="text-white font-medium">{users.from || 0}</span> to{' '}
                                <span className="text-white font-medium">{users.to || 0}</span> of{' '}
                                <span className="text-white font-medium">{users.total}</span> staff accounts
                            </div>
                            <div className="flex items-center gap-1">
                                {users.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        disabled={!link.url || link.active}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-1.5 rounded-lg transition-all ${
                                            link.active
                                                ? 'bg-amber-500 text-navy-950 font-bold'
                                                : link.url
                                                ? 'hover:bg-white/[0.06] text-slate-300'
                                                : 'text-slate-600 cursor-not-allowed'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Create / Edit User Modal */}
            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={selectedUser}
                roles={roles}
                departments={departments}
            />
        </AdminLayout>
    );
}
