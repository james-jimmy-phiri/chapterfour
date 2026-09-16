import { useState, useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import {
    X, Upload, User as UserIcon, Shield, Building2, Lock,
    CheckCircle2, AlertCircle, Eye, EyeOff
} from 'lucide-react';
import { User, Role } from '@/types';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
    roles: Role[];
    departments: string[];
}

export default function UserModal({
    isOpen,
    onClose,
    user,
    roles,
    departments,
}: UserModalProps) {
    if (!isOpen) return null;

    const isEdit = !!user;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(
        user?.avatar_url || null
    );
    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState<'identity' | 'organization' | 'access'>('identity');

    const initialRoleNames = user?.roles?.map(r => r.name) || [];

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm<{
        first_name: string;
        last_name: string;
        name: string;
        email: string;
        phone: string;
        avatar: File | null;
        job_title: string;
        department: string;
        employee_id: string;
        status: 'active' | 'inactive' | 'suspended' | 'pending';
        password: string;
        roles: string[];
        _method?: string;
    }>({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        avatar: null,
        job_title: user?.job_title || '',
        department: user?.department || (departments[0] || 'Legal & Advocacy'),
        employee_id: user?.employee_id || '',
        status: user?.status || 'active',
        password: '',
        roles: initialRoleNames,
        ...(isEdit ? { _method: 'PUT' } : {}),
    });

    useEffect(() => {
        if (user) {
            setData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                avatar: null,
                job_title: user.job_title || '',
                department: user.department || (departments[0] || 'Legal & Advocacy'),
                employee_id: user.employee_id || '',
                status: user.status || 'active',
                password: '',
                roles: user.roles?.map(r => r.name) || [],
                _method: 'PUT',
            });
            setAvatarPreview(user.avatar_url || null);
        } else {
            reset();
            setData({
                first_name: '',
                last_name: '',
                name: '',
                email: '',
                phone: '',
                avatar: null,
                job_title: '',
                department: departments[0] || 'Legal & Advocacy',
                employee_id: '',
                status: 'active',
                password: '',
                roles: ['editor'],
            });
            setAvatarPreview(null);
        }
        clearErrors();
        setActiveTab('identity');
    }, [user, isOpen]);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('avatar', file);
            const reader = new FileReader();
            reader.onload = () => setAvatarPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleRoleToggle = (roleName: string) => {
        const current = [...data.roles];
        const index = current.indexOf(roleName);
        if (index > -1) {
            current.splice(index, 1);
        } else {
            current.push(roleName);
        }
        setData('roles', current);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit && user) {
            post(`/admin/users/${user.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    onClose();
                },
            });
        } else {
            post('/admin/users', {
                preserveScroll: true,
                onSuccess: () => {
                    onClose();
                },
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 dark:bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-[#0c111e] border border-slate-200 dark:border-white/[0.08] shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100 flex flex-col max-h-[90vh]">
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-brand-rust/10 border border-brand-rust/20 flex items-center justify-center text-brand-rust dark:text-brand-amber">
                            {isEdit ? <UserIcon className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                                {isEdit ? `Edit User: ${user.full_name || user.name}` : 'Add New Staff User'}
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {isEdit ? 'Update identity, department placement, and role credentials' : 'Register a new institutional staff or team account'}
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

                {/* Section Navigation Tabs */}
                <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.01]">
                    <button
                        type="button"
                        onClick={() => setActiveTab('identity')}
                        className={`pb-3 px-3 text-xs font-medium border-b-2 flex items-center gap-1.5 transition-all ${
                            activeTab === 'identity'
                                ? 'border-brand-rust text-brand-rust dark:border-brand-amber dark:text-brand-amber font-semibold'
                                : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                        }`}
                    >
                        <UserIcon className="w-3.5 h-3.5" /> Identity & Contact
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('organization')}
                        className={`pb-3 px-3 text-xs font-medium border-b-2 flex items-center gap-1.5 transition-all ${
                            activeTab === 'organization'
                                ? 'border-brand-rust text-brand-rust dark:border-brand-amber dark:text-brand-amber font-semibold'
                                : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                        }`}
                    >
                        <Building2 className="w-3.5 h-3.5" /> Department & Placement
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('access')}
                        className={`pb-3 px-3 text-xs font-medium border-b-2 flex items-center gap-1.5 transition-all ${
                            activeTab === 'access'
                                ? 'border-brand-rust text-brand-rust dark:border-brand-amber dark:text-brand-amber font-semibold'
                                : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                        }`}
                    >
                        <Lock className="w-3.5 h-3.5" /> Access & Roles
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
                    {/* ── TAB 1: IDENTITY ── */}
                    {activeTab === 'identity' && (
                        <div className="space-y-4">
                            {/* Avatar Upload */}
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06]">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-brand-rust/30 bg-slate-100 dark:bg-navy-950 flex items-center justify-center shrink-0">
                                    {avatarPreview ? (
                                        <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <UserIcon className="w-8 h-8 text-slate-400" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Profile Photo</h4>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                        Upload a clear headshot or institutional photo (JPG, PNG, WebP up to 2MB).
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] text-[11px] font-medium text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors shadow-sm"
                                        >
                                            <Upload className="w-3 h-3 text-brand-rust dark:text-brand-amber" /> Choose Image
                                        </button>
                                        {avatarPreview && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setAvatarPreview(null);
                                                    setData('avatar', null);
                                                }}
                                                className="px-2 py-1.5 text-[11px] text-slate-400 hover:text-rose-500 transition-colors"
                                            >
                                                Clear
                                            </button>
                                        )}
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAvatarChange}
                                            className="hidden"
                                        />
                                    </div>
                                    {errors.avatar && (
                                        <p className="text-[11px] text-rose-500 mt-1">{errors.avatar}</p>
                                    )}
                                </div>
                            </div>

                            {/* Names */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                        First Name <span className="text-brand-rust">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.first_name}
                                        onChange={e => setData('first_name', e.target.value)}
                                        placeholder="e.g. Grace"
                                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                                    />
                                    {errors.first_name && (
                                        <p className="text-[11px] text-rose-500 mt-1">{errors.first_name}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                        Last Name <span className="text-brand-rust">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.last_name}
                                        onChange={e => setData('last_name', e.target.value)}
                                        placeholder="e.g. Chinkono"
                                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                                    />
                                    {errors.last_name && (
                                        <p className="text-[11px] text-rose-500 mt-1">{errors.last_name}</p>
                                    )}
                                </div>
                            </div>

                            {/* Email & Phone */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                        Work Email <span className="text-brand-rust">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="name@chapterfour.mw"
                                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                                    />
                                    {errors.email && (
                                        <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        placeholder="+265 999 000 000"
                                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                                    />
                                    {errors.phone && (
                                        <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── TAB 2: ORGANIZATION ── */}
                    {activeTab === 'organization' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                        Department
                                    </label>
                                    <select
                                        value={data.department}
                                        onChange={e => setData('department', e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                    >
                                        {departments.map(dept => (
                                            <option key={dept} value={dept} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                                                {dept}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.department && (
                                        <p className="text-[11px] text-rose-500 mt-1">{errors.department}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                        Job Title
                                    </label>
                                    <input
                                        type="text"
                                        value={data.job_title}
                                        onChange={e => setData('job_title', e.target.value)}
                                        placeholder="e.g. Legal Researcher / Officer"
                                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                                    />
                                    {errors.job_title && (
                                        <p className="text-[11px] text-rose-500 mt-1">{errors.job_title}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                    Employee / Staff ID
                                </label>
                                <input
                                    type="text"
                                    value={data.employee_id}
                                    onChange={e => setData('employee_id', e.target.value)}
                                    placeholder="e.g. C4-STAFF-012"
                                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                                />
                                {errors.employee_id && (
                                    <p className="text-[11px] text-rose-500 mt-1">{errors.employee_id}</p>
                                )}
                            </div>

                            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05] text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                Institutional placement specifies internal jurisdiction and assists in accountability audits and thematic allocation.
                            </div>
                        </div>
                    )}

                    {/* ── TAB 3: ACCESS & ROLES ── */}
                    {activeTab === 'access' && (
                        <div className="space-y-5">
                            {/* Status and Password */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                        Account Status <span className="text-brand-rust">*</span>
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value as any)}
                                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-rust"
                                    >
                                        <option value="active" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Active (Full access)</option>
                                        <option value="pending" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Pending (Awaiting setup)</option>
                                        <option value="suspended" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Suspended (Access blocked)</option>
                                        <option value="inactive" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Inactive (Deactivated)</option>
                                    </select>
                                    {errors.status && (
                                        <p className="text-[11px] text-rose-500 mt-1">{errors.status}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                        {isEdit ? 'New Password (leave blank to keep current)' : 'Account Password'}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                            placeholder={isEdit ? '••••••••••••' : 'Min 8 characters'}
                                            className="w-full px-3.5 py-2 pr-10 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                        >
                                            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-[11px] text-rose-500 mt-1">{errors.password}</p>
                                    )}
                                </div>
                            </div>

                            {/* Assigned Roles */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                    Assigned Security Roles <span className="text-brand-rust">*</span>
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {roles.map(role => {
                                        const isChecked = data.roles.includes(role.name);
                                        return (
                                            <div
                                                key={role.id}
                                                onClick={() => handleRoleToggle(role.name)}
                                                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                                                    isChecked
                                                        ? 'bg-brand-rust/10 border-brand-rust/30 dark:bg-brand-rust/20'
                                                        : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={() => {}}
                                                    className="mt-0.5 rounded border-slate-300 dark:border-white/20 text-brand-rust focus:ring-0 cursor-pointer"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                                                            {role.display_name || role.name}
                                                        </span>
                                                        {role.access_level && (
                                                            <span className="text-[9px] px-1.5 py-0.2 rounded border bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10">
                                                                {role.access_level}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                                                        {role.purpose || 'Custom institutional security role'}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                {errors.roles && (
                                    <p className="text-[11px] text-rose-500 mt-1.5">{errors.roles}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Modal Footer Buttons */}
                    <div className="pt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {activeTab !== 'identity' && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (activeTab === 'access') setActiveTab('organization');
                                        else if (activeTab === 'organization') setActiveTab('identity');
                                    }}
                                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/[0.08] text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors"
                                >
                                    Previous Step
                                </button>
                            )}
                            {activeTab !== 'access' && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (activeTab === 'identity') setActiveTab('organization');
                                        else if (activeTab === 'organization') setActiveTab('access');
                                    }}
                                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-xs text-slate-700 dark:text-slate-200 transition-colors"
                                >
                                    Next: {activeTab === 'identity' ? 'Organization' : 'Access & Roles'}
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-2.5">
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
                                        {isEdit ? 'Save Changes' : 'Create User'}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
