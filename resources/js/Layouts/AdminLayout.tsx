import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, useState } from 'react';
import {
    LayoutDashboard, FileText, Newspaper, Users, Briefcase, BookOpen,
    Globe, Settings, Bell, Search, ChevronRight, LogOut, Menu, X,
    Shield, MessageSquare, Mail, Image, BarChart3, ChevronDown,
    Building2, Star
} from 'lucide-react';

interface AdminLayoutProps extends PropsWithChildren {
    header?: string;
    breadcrumbs?: { label: string; href?: string }[];
}

const navGroups = [
    {
        label: 'Overview',
        items: [
            { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, id: 'admin-nav-dashboard' },
        ],
    },
    {
        label: 'Content',
        items: [
            { label: 'Pages', href: '/admin/pages', icon: FileText, id: 'admin-nav-pages' },
            { label: 'News & Resources', href: '/admin/resources', icon: Newspaper, id: 'admin-nav-resources' },
            { label: 'Thematic Areas', href: '/admin/thematic-areas', icon: Globe, id: 'admin-nav-thematic' },
            { label: 'Projects', href: '/admin/projects', icon: Briefcase, id: 'admin-nav-projects' },
            { label: 'Publications', href: '/admin/publications', icon: BookOpen, id: 'admin-nav-publications' },
        ],
    },
    {
        label: 'Organisation',
        items: [
            { label: 'Team', href: '/admin/team', icon: Users, id: 'admin-nav-team' },
            { label: 'Partners', href: '/admin/partners', icon: Building2, id: 'admin-nav-partners' },
            { label: 'Impact Statistics', href: '/admin/statistics', icon: BarChart3, id: 'admin-nav-stats' },
            { label: 'Testimonials', href: '/admin/testimonials', icon: Star, id: 'admin-nav-testimonials' },
        ],
    },
    {
        label: 'Engagement',
        items: [
            { label: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare, id: 'admin-nav-inquiries', badge: 3 },
            { label: 'Newsletter', href: '/admin/newsletter', icon: Mail, id: 'admin-nav-newsletter' },
            { label: 'Media Library', href: '/admin/media', icon: Image, id: 'admin-nav-media' },
        ],
    },
    {
        label: 'System',
        items: [
            { label: 'Users & Roles', href: '/admin/users', icon: Shield, id: 'admin-nav-users' },
            { label: 'Site Settings', href: '/admin/settings', icon: Settings, id: 'admin-nav-settings' },
            { label: 'Audit Log', href: '/admin/audit', icon: FileText, id: 'admin-nav-audit' },
        ],
    },
];

export default function AdminLayout({ children, header, breadcrumbs = [] }: AdminLayoutProps) {
    const { url, props } = usePage();
    const auth = (props as any).auth;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    const isActive = (href: string) => href === '/admin' ? url === '/admin' : url.startsWith(href);

    return (
        <div className="min-h-screen flex bg-slate-950 font-sans">
            {/* ─── SIDEBAR ──────────────────────────────────────────────── */}
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen w-64 flex flex-col z-50 transition-transform duration-300
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    border-r border-white/6`}
                style={{ background: 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(20px)' }}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 h-16 px-5 border-b border-white/6 flex-shrink-0">
                    <div className="w-8 h-8 bg-gold-500/20 rounded-lg flex items-center justify-center border border-gold-500/30">
                        <span className="font-display text-gold-400 text-sm">IV</span>
                    </div>
                    <div>
                        <div className="font-display text-white text-sm leading-tight">Chapter Four</div>
                        <div className="text-gold-500/60 text-[9px] tracking-[0.15em] uppercase font-sans">Admin Panel</div>
                    </div>
                    <button
                        className="ml-auto lg:hidden text-white/40 hover:text-white"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Nav groups */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6" aria-label="Admin navigation">
                    {navGroups.map((group) => (
                        <div key={group.label}>
                            <p className="text-[10px] font-semibold text-white/20 uppercase tracking-[0.2em] px-3 mb-2">{group.label}</p>
                            <div className="space-y-0.5">
                                {group.items.map((item) => {
                                    const Icon = item.icon;
                                    const active = isActive(item.href);
                                    return (
                                        <Link
                                            key={item.id}
                                            href={item.href}
                                            id={item.id}
                                            className={`admin-nav-item ${active ? 'active' : ''}`}
                                        >
                                            <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-gold-400' : 'text-white/30'}`} />
                                            <span className="flex-1">{item.label}</span>
                                            {(item as any).badge && (
                                                <span className="ml-auto flex items-center justify-center w-5 h-5 rounded-full bg-crimson-600 text-white text-[10px] font-bold">
                                                    {(item as any).badge}
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* User profile */}
                <div className="border-t border-white/6 p-4 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                            <span className="text-gold-400 text-xs font-bold">
                                {auth?.user?.name?.charAt(0) ?? 'A'}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">{auth?.user?.name ?? 'Admin'}</p>
                            <p className="text-white/30 text-xs truncate">{auth?.user?.email ?? 'admin@chapterfour.org'}</p>
                        </div>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            id="admin-logout"
                            className="text-white/30 hover:text-crimson-400 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </aside>

            {/* ─── MAIN CONTENT ─────────────────────────────────────────── */}
            <div className="flex-1 flex flex-col min-w-0 min-h-screen">
                {/* Top bar */}
                <header className="sticky top-0 z-30 h-16 flex items-center gap-4 px-4 lg:px-6 border-b border-white/6 flex-shrink-0"
                    style={{ background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(20px)' }}>

                    {/* Mobile menu toggle */}
                    <button
                        id="admin-mobile-menu"
                        className="lg:hidden p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    {/* Breadcrumbs */}
                    <nav className="hidden lg:flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
                        <Link href="/admin" className="text-white/40 hover:text-white transition-colors">Dashboard</Link>
                        {breadcrumbs.map((crumb, i) => (
                            <span key={i} className="flex items-center gap-1.5">
                                <ChevronRight className="w-3.5 h-3.5 text-white/20" />
                                {crumb.href ? (
                                    <Link href={crumb.href} className="text-white/40 hover:text-white transition-colors">{crumb.label}</Link>
                                ) : (
                                    <span className="text-white/80">{crumb.label}</span>
                                )}
                            </span>
                        ))}
                        {header && breadcrumbs.length === 0 && (
                            <>
                                <ChevronRight className="w-3.5 h-3.5 text-white/20" />
                                <span className="text-white/80">{header}</span>
                            </>
                        )}
                    </nav>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Search */}
                    <button
                        id="admin-search"
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-white/40 hover:text-white hover:border-white/20 transition-all text-sm"
                        onClick={() => setSearchOpen(true)}
                    >
                        <Search className="w-4 h-4" />
                        <span className="hidden sm:block">Search...</span>
                        <kbd className="hidden sm:block ml-4 text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/30">⌘K</kbd>
                    </button>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            id="admin-notifications"
                            onClick={() => setNotifOpen(!notifOpen)}
                            className="relative p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-crimson-500" />
                        </button>

                        {notifOpen && (
                            <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-white/10 overflow-hidden shadow-glass z-50"
                                style={{ background: 'rgba(2, 6, 23, 0.98)', backdropFilter: 'blur(20px)' }}>
                                <div className="p-4 border-b border-white/8 flex items-center justify-between">
                                    <span className="text-white font-semibold text-sm">Notifications</span>
                                    <span className="text-xs text-gold-400">3 new</span>
                                </div>
                                {[
                                    { message: 'New inquiry from contact form', time: '2m ago', unread: true },
                                    { message: 'Newsletter subscriber added', time: '1h ago', unread: true },
                                    { message: 'Admin updated About page', time: '3h ago', unread: false },
                                ].map((notif, i) => (
                                    <div key={i} className={`p-4 border-b border-white/5 hover:bg-white/3 transition-colors cursor-pointer ${notif.unread ? 'bg-gold-500/3' : ''}`}>
                                        <div className="flex items-start gap-3">
                                            {notif.unread && <div className="w-2 h-2 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />}
                                            <div className={!notif.unread ? 'ml-5' : ''}>
                                                <p className="text-white/80 text-sm">{notif.message}</p>
                                                <p className="text-white/30 text-xs mt-1">{notif.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="p-3">
                                    <button className="w-full text-center text-gold-400/70 hover:text-gold-400 text-xs py-1 transition-colors">
                                        View all notifications
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* View site link */}
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        id="admin-view-site"
                        className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-medium hover:bg-gold-500/20 transition-all"
                    >
                        <Globe className="w-3.5 h-3.5" />
                        View Site
                    </a>
                </header>

                {/* Page content */}
                <main className="flex-1 p-4 lg:p-6 overflow-auto">
                    {/* Page header */}
                    {header && (
                        <div className="mb-6">
                            <h1 className="font-sans font-bold text-white text-2xl tracking-normal">{header}</h1>
                        </div>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
