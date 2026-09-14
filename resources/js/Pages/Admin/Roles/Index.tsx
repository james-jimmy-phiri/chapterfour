import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Shield, Users, Plus, Edit3, Trash2, CheckCircle2,
    Lock, AlertTriangle, Key, ChevronRight, ShieldAlert, ShieldCheck
} from 'lucide-react';
import { useState } from 'react';
import { Role } from '@/types';
import RoleModal from './RoleModal';

interface GroupedModule {
    description: string;
    permissions: Array<{
        id: number;
        name: string;
        label: string;
    }>;
}

interface RolesIndexProps {
    roles: Role[];
    groupedPermissions: Record<string, GroupedModule>;
}

export default function Index({ roles, groupedPermissions }: RolesIndexProps) {
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateRole = () => {
        setSelectedRole(null);
        setIsModalOpen(true);
    };

    const handleEditRole = (role: Role) => {
        setSelectedRole(role);
        setIsModalOpen(true);
    };

    const handleDeleteRole = (role: Role) => {
        if (role.is_protected) {
            alert(`The role "${role.display_name || role.name}" is an essential system role and cannot be deleted.`);
            return;
        }

        if ((role.users_count || 0) > 0) {
            alert(`Cannot delete "${role.display_name || role.name}" because it is currently assigned to ${role.users_count} user(s). Please reassign them first.`);
            return;
        }

        if (confirm(`Are you sure you want to permanently delete the "${role.display_name || role.name}" security role?`)) {
            router.delete(`/admin/roles/${role.id}`, {
                preserveScroll: true,
            });
        }
    };

    const getAccessBadge = (accessLevel?: string) => {
        switch (accessLevel) {
            case 'Full System':
                return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
            case 'Very High':
                return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
            case 'High':
                return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
            case 'Medium':
                return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
            case 'Specialized':
                return 'bg-violet-500/10 text-violet-400 border-violet-500/30';
            case 'Limited':
            default:
                return 'bg-slate-500/10 text-slate-400 border-white/[0.08]';
        }
    };

    return (
        <AdminLayout
            header="Security Roles & Privilege Matrices"
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin' },
                { label: 'Users & Permissions', href: '/admin/users' },
                { label: 'Roles' },
            ]}
        >
            <Head title="Security Roles & Access Control - Chapter Four CMS" />

            <div className="space-y-6">
                {/* Header & Nav */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-serif font-normal text-white">
                                Roles & Privilege Matrices
                            </h1>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                Spatie v6
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                            Architect institutional authority, administrative boundaries, and granular functional permissions.
                        </p>
                    </div>

                    <button
                        onClick={handleCreateRole}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-semibold text-xs shadow-md shadow-amber-500/20 transition-all self-start sm:self-auto"
                    >
                        <Plus className="w-4 h-4" /> Create Custom Role
                    </button>
                </div>

                {/* Sub Navigation Tabs */}
                <div className="flex items-center gap-1 border-b border-white/[0.06] pb-px">
                    <Link
                        href="/admin/users"
                        className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 border-b-2 border-transparent flex items-center gap-2 transition-colors"
                    >
                        <Users className="w-3.5 h-3.5" /> Staff Directory
                    </Link>
                    <Link
                        href="/admin/roles"
                        className="px-4 py-2 text-xs font-semibold border-b-2 border-amber-500 text-amber-400 flex items-center gap-2"
                    >
                        <Shield className="w-3.5 h-3.5" /> Roles & Permissions Matrix ({roles.length})
                    </Link>
                </div>

                {/* Roles Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {roles.map(role => {
                        const permCount = role.permissions?.length || 0;
                        const isSuperAdmin = role.name === 'super-admin';

                        return (
                            <div
                                key={role.id}
                                className="p-5 rounded-2xl bg-[#090d16] border border-white/[0.06] hover:border-amber-500/30 shadow-lg shadow-black/40 transition-all flex flex-col justify-between group"
                            >
                                <div className="space-y-3">
                                    {/* Card Top Badges */}
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center text-amber-400 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-colors">
                                            {isSuperAdmin ? (
                                                <ShieldAlert className="w-5 h-5 text-amber-400" />
                                            ) : (
                                                <Shield className="w-5 h-5 text-slate-300 group-hover:text-amber-400" />
                                            )}
                                        </div>

                                        <div className="flex items-center gap-1.5 flex-wrap justify-end">
                                            {role.access_level && (
                                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${getAccessBadge(role.access_level)}`}>
                                                    {role.access_level}
                                                </span>
                                            )}
                                            {role.is_protected && (
                                                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-white/[0.04] text-slate-400 border border-white/[0.06]" title="Protected system role">
                                                    System
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Title & Slug */}
                                    <div>
                                        <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                                            {role.display_name || role.name}
                                        </h3>
                                        <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                                            identifier: {role.name}
                                        </div>
                                    </div>

                                    {/* Purpose Description */}
                                    <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">
                                        {role.purpose || 'Custom institutional security role with specific capability sets.'}
                                    </p>

                                    {/* Stats Info */}
                                    <div className="pt-3 border-t border-white/[0.04] grid grid-cols-2 gap-2 text-xs">
                                        <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                            <span className="text-[10px] text-slate-500 block">Assigned Staff</span>
                                            <span className="font-semibold text-white font-mono mt-0.5 block">
                                                {role.users_count || 0} users
                                            </span>
                                        </div>
                                        <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                            <span className="text-[10px] text-slate-500 block">Permissions</span>
                                            <span className="font-semibold text-amber-400 font-mono mt-0.5 block">
                                                {isSuperAdmin ? 'All Capabilities' : `${permCount} granted`}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
                                    <button
                                        onClick={() => handleEditRole(role)}
                                        className="flex-1 py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-slate-200 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                                    >
                                        <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                                        Configure Privileges
                                    </button>

                                    {!role.is_protected && (
                                        <button
                                            onClick={() => handleDeleteRole(role)}
                                            title="Delete Custom Role"
                                            className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Role Modal */}
            <RoleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                role={selectedRole}
                groupedPermissions={groupedPermissions}
            />
        </AdminLayout>
    );
}
