import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, useState, useEffect } from 'react';
import {
    LayoutDashboard, FileText, Newspaper, Users, Briefcase, BookOpen,
    Globe, Settings, Bell, Search, ChevronRight, LogOut, Menu, X,
    Shield, MessageSquare, Mail, Image, BarChart3, ChevronDown,
    Building2, Star, Sparkles, ExternalLink, Plus, CheckCircle2, UserCheck
} from 'lucide-react';

interface AdminLayoutProps extends PropsWithChildren {
    header?: string;
    breadcrumbs?: { label: string; href?: string }[];
}

export default function AdminLayout({ children, header, breadcrumbs = [] }: AdminLayoutProps) {
    const { url, props } = usePage();
    const auth = (props as any).auth;
    const unreadInquiries = (props as any).unread_inquiries_count || 0;
    const flash = (props as any).flash;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('en-GB', { timeZone: 'Africa/Blantyre', hour: '2-digit', minute: '2-digit' }) + ' CAT');
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    const navGroups = [
        {
            label: 'Overview',
            items: [
                { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, id: 'admin-nav-dashboard' },
            ],
        },
        {
            label: 'Content Engine',
            items: [
                { label: 'News & Resources', href: '/admin/resources', icon: Newspaper, id: 'admin-nav-resources' },
                { label: 'Thematic Areas', href: '/admin/thematic-areas', icon: Globe, id: 'admin-nav-thematic' },
                { label: 'Field Projects', href: '/admin/projects', icon: Briefcase, id: 'admin-nav-projects' },
                { label: 'Publications', href: '/admin/publications', icon: BookOpen, id: 'admin-nav-publications' },
                { label: 'Pages Management', href: '/admin/pages', icon: FileText, id: 'admin-nav-pages' },
            ],
        },
        {
            label: 'Institutional',
            items: [
                { label: 'Leadership & Team', href: '/admin/team', icon: Users, id: 'admin-nav-team' },
                { label: 'Allies & Partners', href: '/admin/partners', icon: Building2, id: 'admin-nav-partners' },
                { label: 'Impact Metrics', href: '/admin/statistics', icon: BarChart3, id: 'admin-nav-stats' },
                { label: 'Testimonials', href: '/admin/testimonials', icon: Star, id: 'admin-nav-testimonials' },
            ],
        },
        {
            label: 'Public Engagement',
            items: [
                {
                    label: 'Inquiries Inbox',
                    href: '/admin/inquiries',
                    icon: MessageSquare,
                    id: 'admin-nav-inquiries',
                    badge: unreadInquiries > 0 ? unreadInquiries : null,
                },
                { label: 'Newsletter Subscribers', href: '/admin/newsletter', icon: Mail, id: 'admin-nav-newsletter' },
                { label: 'Media Assets', href: '/admin/media', icon: Image, id: 'admin-nav-media' },
            ],
        },
        {
            label: 'Administration',
            items: [
                { label: 'Users & Permissions', href: '/admin/users', icon: Shield, id: 'admin-nav-users' },
                { label: 'Site Settings', href: '/admin/settings', icon: Settings, id: 'admin-nav-settings' },
                { label: 'Security Audit Log', href: '/admin/audit', icon: FileText, id: 'admin-nav-audit' },
            ],
        },
    ];

    const isActive = (href: string) => {
        if (href === '/admin') return url === '/admin';
        if (href === '/admin/users') return url.startsWith('/admin/users') || url.startsWith('/admin/roles');
        return url.startsWith(href);
    };

    return (
        <div className="min-h-screen flex bg-[#070a11] text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-navy-950">
            {/* ─── SIDEBAR ──────────────────────────────────────────────── */}
            {/* Mobile backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen w-72 flex flex-col z-50 transition-all duration-300
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    border-r border-white/[0.06] bg-[#090d16]/95 backdrop-blur-2xl shadow-2xl`}
            >
                {/* Brand Logo Header */}
                <div className="flex items-center gap-3.5 h-20 px-6 border-b border-white/[0.06] shrink-0 bg-white/[0.01]">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500/20 to-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md shadow-amber-500/10 shrink-0">
                        <span className="font-serif font-bold text-lg tracking-tight">IV</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                            <span className="font-serif text-white font-medium text-base tracking-tight truncate">Chapter Four</span>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                CMS
                            </span>
                        </div>
                        <div className="text-[10px] text-slate-400 tracking-[0.2em] uppercase font-mono truncate">
                            Malawi Civil Gateway
                        </div>
                    </div>
                    <button
                        className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Sections */}
                <nav className="flex-1 overflow-y-auto py-5 px-3.5 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent" aria-label="Admin navigation">
                    {navGroups.map((group) => (
                        <div key={group.label} className="space-y-1">
                            <div className="px-3 pb-1.5">
                                <span className="text-[10px] font-bold text-slate-400/80 uppercase tracking-[0.2em]">
                                    {group.label}
                                </span>
                            </div>

                            <div className="space-y-0.5">
                                {group.items.map((item) => {
                                    const Icon = item.icon;
                                    const active = isActive(item.href);
                                    return (
                                        <Link
                                            key={item.id}
                                            href={item.href}
                                            id={item.id}
                                            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                                                active
                                                    ? 'bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent text-amber-300 font-semibold border-l-2 border-amber-400 shadow-sm'
                                                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                                            }`}
                                        >
                                            <Icon
                                                className={`w-4 h-4 shrink-0 transition-colors ${
                                                    active ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'
                                                }`}
                                            />
                                            <span className="flex-1 truncate">{item.label}</span>
                                            {item.badge && (
                                                <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/30 animate-pulse">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Logged in User Bar */}
                <div className="border-t border-white/[0.06] p-4 bg-white/[0.01] shrink-0">
                    <div className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500/30 to-amber-600/10 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xs font-bold shrink-0 shadow-sm">
                            {auth?.user?.name?.charAt(0) ?? 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                                <p className="text-white text-xs font-semibold truncate leading-none">
                                    {auth?.user?.name ?? 'Admin User'}
                                </p>
                            </div>
                            <span className="inline-block mt-1 px-1.5 py-0.2 rounded text-[9px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                Super Administrator
                            </span>
                        </div>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            id="admin-logout"
                            title="Sign out of Admin"
                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors shrink-0"
                        >
                            <LogOut className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </aside>

            {/* ─── MAIN APP CONTAINER ───────────────────────────────────── */}
            <div className="flex-1 flex flex-col min-w-0 min-h-screen">
                {/* Top Glass Header */}
                <header className="sticky top-0 z-30 h-18 px-4 lg:px-8 flex items-center justify-between gap-4 border-b border-white/[0.06] bg-[#070a11]/85 backdrop-blur-xl shrink-0">
                    {/* Left: Mobile Toggle & Breadcrumbs */}
                    <div className="flex items-center gap-3">
                        <button
                            id="admin-mobile-menu"
                            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <nav className="hidden sm:flex items-center gap-2 text-xs" aria-label="Breadcrumb">
                            <Link href="/admin" className="text-slate-400 hover:text-white transition-colors">
                                Dashboard
                            </Link>
                            {breadcrumbs.map((crumb, i) => (
                                <span key={i} className="flex items-center gap-2">
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                                    {crumb.href ? (
                                        <Link href={crumb.href} className="text-slate-400 hover:text-white transition-colors">
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span className="text-amber-300 font-medium">{crumb.label}</span>
                                    )}
                                </span>
                            ))}
                            {header && breadcrumbs.length === 0 && (
                                <>
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                                    <span className="text-amber-300 font-medium">{header}</span>
                                </>
                            )}
                        </nav>
                    </div>

                    {/* Right: Status Beacon, Quick Create, View Site & Avatar */}
                    <div className="flex items-center gap-3">
                        {/* Live Local Time Beacon */}
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/[0.07] border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Systems Active • {currentTime}</span>
                        </div>

                        {/* Quick New Button */}
                        <Link
                            href="/admin/resources/create"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-navy-950 transition-all shadow-sm"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">New Resource</span>
                        </Link>

                        {/* View Public Site */}
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            id="admin-view-site"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-amber-500/30 text-slate-300 hover:text-white text-xs font-medium transition-all"
                        >
                            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                            <span className="hidden sm:inline">Public Site</span>
                        </a>

                        {/* Notifications Toggle */}
                        <div className="relative">
                            <button
                                id="admin-notifications"
                                onClick={() => setNotifOpen(!notifOpen)}
                                className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                                title="Notifications"
                            >
                                <Bell className="w-4 h-4" />
                                {unreadInquiries > 0 && (
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-[#070a11]" />
                                )}
                            </button>

                            {notifOpen && (
                                <div
                                    className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-white/10 overflow-hidden shadow-2xl z-50 bg-[#0c101c]/95 backdrop-blur-2xl"
                                >
                                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                                        <span className="text-white font-semibold text-sm">System Notifications</span>
                                        <span className="text-xs text-amber-400">{unreadInquiries} active</span>
                                    </div>
                                    <div className="divide-y divide-white/5">
                                        <Link
                                            href="/admin/inquiries"
                                            className="block p-3.5 hover:bg-white/[0.04] transition-colors"
                                            onClick={() => setNotifOpen(false)}
                                        >
                                            <div className="text-xs font-medium text-white">Public Inquiries Pending</div>
                                            <p className="text-[11px] text-slate-400 mt-0.5">
                                                {unreadInquiries} new citizens seeking paralegal consultation or human rights partnership.
                                            </p>
                                        </Link>
                                        <Link
                                            href="/admin/audit"
                                            className="block p-3.5 hover:bg-white/[0.04] transition-colors"
                                            onClick={() => setNotifOpen(false)}
                                        >
                                            <div className="text-xs font-medium text-white">Security Audit Clean</div>
                                            <p className="text-[11px] text-slate-400 mt-0.5">
                                                All administrative modifications authenticated via Spatie RBAC.
                                            </p>
                                        </Link>
                                    </div>
                                    <div className="p-2 border-t border-white/10 text-center">
                                        <Link
                                            href="/admin/inquiries"
                                            className="text-xs text-amber-400 hover:text-amber-300 font-medium"
                                            onClick={() => setNotifOpen(false)}
                                        >
                                            View Inquiries Inbox →
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Floating Flash Message Banner */}
                {flash?.success && (
                    <div className="mx-4 lg:mx-8 mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-2.5 animate-fadeIn">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>{flash.success}</span>
                    </div>
                )}

                {/* Page Content Body */}
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
