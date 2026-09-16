import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { X, Shield, CheckCircle2, AlertCircle, CheckSquare, Square } from 'lucide-react';
import { Role } from '@/types';

interface GroupedModule {
    description: string;
    permissions: Array<{
        id: number;
        name: string;
        label: string;
    }>;
}

interface RoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    role: Role | null;
    groupedPermissions: Record<string, GroupedModule>;
}

export default function RoleModal({
    isOpen,
    onClose,
    role,
    groupedPermissions,
}: RoleModalProps) {
    if (!isOpen) return null;

    const isEdit = !!role;
    const initialPermissionNames = role?.permissions?.map(p => p.name) || [];

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm<{
        name: string;
        permissions: string[];
    }>({
        name: role?.display_name || role?.name || '',
        permissions: initialPermissionNames,
    });

    useEffect(() => {
        if (role) {
            setData({
                name: role.display_name || role.name || '',
                permissions: role.permissions?.map(p => p.name) || [],
            });
        } else {
            reset();
            setData({
                name: '',
                permissions: [],
            });
        }
        clearErrors();
    }, [role, isOpen]);

    const handleTogglePermission = (permissionName: string) => {
        const current = [...data.permissions];
        const index = current.indexOf(permissionName);
        if (index > -1) {
            current.splice(index, 1);
        } else {
            current.push(permissionName);
        }
        setData('permissions', current);
    };

    const handleToggleModule = (modulePermissions: Array<{ name: string }>) => {
        const moduleNames = modulePermissions.map(p => p.name);
        const allSelected = moduleNames.every(name => data.permissions.includes(name));

        if (allSelected) {
            setData('permissions', data.permissions.filter(name => !moduleNames.includes(name)));
        } else {
            const combined = Array.from(new Set([...data.permissions, ...moduleNames]));
            setData('permissions', combined);
        }
    };

    const handleSelectAllGlobal = () => {
        const allNames: string[] = [];
        Object.values(groupedPermissions).forEach(group => {
            group.permissions.forEach(p => allNames.push(p.name));
        });
        setData('permissions', allNames);
    };

    const handleClearAllGlobal = () => {
        setData('permissions', []);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit && role) {
            put(`/admin/roles/${role.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    onClose();
                },
            });
        } else {
            post('/admin/roles', {
                preserveScroll: true,
                onSuccess: () => {
                    onClose();
                },
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 dark:bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-[#0c111e] border border-slate-200 dark:border-white/[0.08] shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100 flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-brand-rust/10 border border-brand-rust/20 flex items-center justify-center text-brand-rust dark:text-brand-amber">
                            <Shield className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                                {isEdit ? `Configure Role: ${role.display_name || role.name}` : 'Create Security Role'}
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {isEdit ? 'Adjust role label and fine-tune operational access permissions' : 'Define a new role and grant modular administrative privileges'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Role Title */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Role Title <span className="text-brand-rust">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            disabled={role?.is_protected}
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            placeholder="e.g. Legal Research Officer"
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust disabled:opacity-60"
                        />
                        {role?.is_protected && (
                            <p className="text-[11px] text-amber-600 dark:text-amber-400/80 mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> System role identifier cannot be renamed.
                            </p>
                        )}
                        {errors.name && (
                            <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>
                        )}
                    </div>

                    {/* Permissions Matrix Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t border-slate-200 dark:border-white/[0.06]">
                        <div>
                            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                                Permissions Matrix ({data.permissions.length} granted)
                            </h3>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                Toggle specific capabilities or entire functional suites.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleSelectAllGlobal}
                                className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-300 transition-colors"
                            >
                                Grant All
                            </button>
                            <button
                                type="button"
                                onClick={handleClearAllGlobal}
                                className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition-colors"
                            >
                                Revoke All
                            </button>
                        </div>
                    </div>

                    {/* Grouped Modules */}
                    <div className="space-y-4">
                        {Object.entries(groupedPermissions).map(([moduleName, moduleData]) => {
                            const moduleNames = moduleData.permissions.map(p => p.name);
                            const selectedCount = moduleNames.filter(name => data.permissions.includes(name)).length;
                            const isAllSelected = selectedCount === moduleNames.length;
                            const isPartial = selectedCount > 0 && !isAllSelected;

                            return (
                                <div
                                    key={moduleName}
                                    className="rounded-xl border border-slate-200 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.01] overflow-hidden"
                                >
                                    {/* Module Bar */}
                                    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100/70 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.04]">
                                        <div>
                                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                                                {moduleName}
                                            </span>
                                            <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                                                {moduleData.description}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleToggleModule(moduleData.permissions)}
                                            className="flex items-center gap-1.5 text-[11px] font-medium text-brand-rust dark:text-brand-amber hover:underline transition-colors"
                                        >
                                            {isAllSelected ? (
                                                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                                                    <CheckSquare className="w-3.5 h-3.5" /> All Selected
                                                </span>
                                            ) : isPartial ? (
                                                <span className="flex items-center gap-1 text-brand-rust dark:text-brand-amber font-semibold">
                                                    <CheckSquare className="w-3.5 h-3.5" /> {selectedCount}/{moduleNames.length}
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-slate-400">
                                                    <Square className="w-3.5 h-3.5" /> Select All
                                                </span>
                                            )}
                                        </button>
                                    </div>

                                    {/* Permissions Checkbox Grid */}
                                    <div className="p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {moduleData.permissions.map(perm => {
                                            const isChecked = data.permissions.includes(perm.name);
                                            return (
                                                <label
                                                    key={perm.id}
                                                    className={`p-2.5 rounded-lg border cursor-pointer flex items-start gap-2.5 transition-all ${
                                                        isChecked
                                                            ? 'bg-brand-rust/10 border-brand-rust/30 text-slate-900 dark:text-white font-medium'
                                                            : 'bg-white dark:bg-white/[0.01] border-slate-200 dark:border-white/[0.04] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/[0.03]'
                                                    }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={() => handleTogglePermission(perm.name)}
                                                        className="mt-0.5 rounded border-slate-300 dark:border-white/20 text-brand-rust focus:ring-0 cursor-pointer"
                                                    />
                                                    <div className="min-w-0 flex-1">
                                                        <div className="text-xs leading-tight">
                                                            {perm.label}
                                                        </div>
                                                        <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                                                            {perm.name}
                                                        </div>
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-end gap-2.5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-5 py-2 rounded-xl bg-brand-rust hover:bg-brand-crimson text-white font-semibold text-xs shadow-lg shadow-brand-rust/20 disabled:opacity-50 transition-all flex items-center gap-1.5"
                        >
                            {processing ? (
                                <span>Saving...</span>
                            ) : (
                                <>
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    {isEdit ? 'Save Role & Privileges' : 'Create Role'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
