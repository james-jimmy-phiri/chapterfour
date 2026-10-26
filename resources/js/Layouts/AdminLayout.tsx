import { Link, usePage, router } from '@inertiajs/react';
import { PropsWithChildren, useState, useEffect } from 'react';
import {
    LayoutDashboard, FileText, Newspaper, Users, Briefcase, BookOpen,
    Globe, Settings, Bell, Search, ChevronRight, LogOut, Menu, X,
    Shield, MessageSquare, Mail, Image, BarChart3, ChevronDown,
    Building2, Star, Sparkles, ExternalLink, Plus, CheckCircle2, UserCheck,
    Sun, Moon, Target, History, HeartHandshake, Layers,
    UploadCloud, RefreshCw, Trash2, Loader2
} from 'lucide-react';
import ChapterFourLogo from '@/Components/ChapterFourLogo';

interface AdminLayoutProps extends PropsWithChildren {
    header?: string;
    description?: string;
    breadcrumbs?: { label: string; href?: string }[];
}

export default function AdminLayout({ children, header, description, breadcrumbs = [] }: AdminLayoutProps) {
    const { url, props } = usePage();
    const auth = (props as any).auth;
    const unreadInquiries = (props as any).unread_inquiries_count || 0;
    const flash = (props as any).flash;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState('');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // Theme initialization and listener
    useEffect(() => {
        const savedTheme = localStorage.getItem('chapterfour_admin_theme') as 'light' | 'dark' | null;
        const initialTheme = savedTheme || 'light';
        setTheme(initialTheme);
        if (initialTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('chapterfour_admin_theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(
                now.toLocaleTimeString('en-GB', {
                    timeZone: 'Africa/Blantyre',
                    hour: '2-digit',
                    minute: '2-digit',
                }) + ' CAT'
            );
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    // Async Mutation & Upload tracking for all admin operations
    const [isProcessing, setIsProcessing] = useState(false);
    const [progressPercent, setProgressPercent] = useState<number | null>(null);
    const [processType, setProcessType] = useState<'upload' | 'save' | 'delete'>('save');
    const [processTitle, setProcessTitle] = useState('Saving Changes');
    const [processDetail, setProcessDetail] = useState('Updating record on the server...');

    useEffect(() => {
        const removeStart = router.on('start', (event) => {
            const method = (event.detail.visit.method || 'get').toLowerCase();
            if (method !== 'get') {
                setIsProcessing(true);
                setProgressPercent(null);

                const visitData = event.detail.visit.data;
                const hasFiles = visitData instanceof FormData ||
                    (visitData && typeof visitData === 'object' && Object.values(visitData).some(
                        v => v instanceof File || (Array.isArray(v) && v.some(f => f instanceof File))
                    ));

                if (method === 'delete') {
                    setProcessType('delete');
                    setProcessTitle('Deleting Record');
                    setProcessDetail('Removing item and updating records...');
                } else if (hasFiles) {
                    setProcessType('upload');
                    setProcessTitle('Uploading Media & Files');
                    setProcessDetail('Transferring assets and publishing records...');
                } else if (method === 'post') {
                    setProcessType('save');
                    setProcessTitle('Creating Record');
                    setProcessDetail('Saving new content to database...');
                } else {
                    setProcessType('save');
                    setProcessTitle('Updating Record');
                    setProcessDetail('Applying modifications and syncing data...');
                }
            }
        });

        const removeProgress = router.on('progress', (event) => {
            if (event.detail.progress?.percentage !== undefined) {
                const pct = Math.round(event.detail.progress.percentage);
                setProgressPercent(pct);
                setProcessType('upload');
                setProcessTitle(`Uploading... ${pct}%`);
                setProcessDetail(`${Math.round((event.detail.progress.loaded || 0) / 1024)} KB of ${Math.round((event.detail.progress.total || 0) / 1024)} KB transferred`);
            }
        });

        const removeFinish = router.on('finish', () => {
            setIsProcessing(false);
            setProgressPercent(null);
        });

        const removeCancel = router.on('cancel', () => {
            setIsProcessing(false);
            setProgressPercent(null);
        });

        return () => {
            removeStart();
            removeProgress();
            removeFinish();
            removeCancel();
        };
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
                { label: 'Key Interventions', href: '/admin/interventions', icon: Target, id: 'admin-nav-interventions' },
                { label: 'HRBA Principles', href: '/admin/hrba-principles', icon: Sparkles, id: 'admin-nav-hrba' },
                { label: 'Field Projects', href: '/admin/projects', icon: Briefcase, id: 'admin-nav-projects' },
                { label: 'Hero Slides', href: '/admin/hero-slides', icon: Image, id: 'admin-nav-hero-slides' },
                { label: 'Publications', href: '/admin/publications', icon: BookOpen, id: 'admin-nav-publications' },
                { label: 'Pages Management', href: '/admin/pages', icon: FileText, id: 'admin-nav-pages' },
            ],
        },
        {
            label: 'Institutional',
            items: [
                { label: 'Leadership & Team', href: '/admin/team', icon: Users, id: 'admin-nav-team' },
                { label: 'Beneficiary Groups', href: '/admin/beneficiary-groups', icon: HeartHandshake, id: 'admin-nav-beneficiaries' },
                { label: 'Allies & Partners', href: '/admin/partners', icon: Building2, id: 'admin-nav-partners' },
                { label: 'Timeline Events', href: '/admin/timeline-events', icon: History, id: 'admin-nav-timeline' },
                { label: 'Core Objectives', href: '/admin/core-objectives', icon: Target, id: 'admin-nav-objectives' },
                { label: 'Cross-Cutting Activities', href: '/admin/cross-cutting-activities', icon: Layers, id: 'admin-nav-crosscutting' },
                { label: 'Vacancies', href: '/admin/vacancies', icon: Briefcase, id: 'admin-nav-vacancies' },
                { label: 'Applications', href: '/admin/vacancy-applications', icon: FileText, id: 'admin-nav-vacancy-applications' },
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
                { label: 'Inspirational Quotes', href: '/admin/page-quotes', icon: Star, id: 'admin-nav-quotes' },
                { label: 'Content Blocks', href: '/admin/content-blocks', icon: FileText, id: 'admin-nav-content-blocks' },
                { label: 'Media Library', href: '/admin/media', icon: Image, id: 'admin-nav-media' },
            ],
        },
        {
            label: 'Administration',
            items: [
                { label: 'Users & Permissions', href: '/admin/users', icon: Shield, id: 'admin-nav-users' },
                { label: 'Site Settings', href: '/admin/settings', icon: Settings, id: 'admin-nav-settings' },
                { label: 'SEO & Discovery', href: '/admin/seo', icon: Globe, id: 'admin-nav-seo' },
                { label: 'Security Audit Log', href: '/admin/audit', icon: FileText, id: 'admin-nav-audit' },
            ],
        },
    ];

    const isActive = (href: string) => {
        if (href === '/admin') return url === '/admin';
        if (href === '/admin/users') return url.startsWith('/admin/users') || url.startsWith('/admin/roles');
        return url.startsWith(href);
    };

    const isLight = theme === 'light';

    return (
        <div className={`min-h-screen flex font-sans antialiased transition-colors duration-200 ${
            isLight
                ? 'bg-slate-50 text-slate-800 selection:bg-brand-rust selection:text-white'
                : 'bg-[#070a11] text-slate-100 selection:bg-brand-amber selection:text-brand-dark'
        }`}>
            {/* ─── SIDEBAR ──────────────────────────────────────────────── */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen w-72 flex flex-col z-50 transition-all duration-300
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    ${
                        isLight
                            ? 'bg-white border-r border-slate-200 shadow-sm'
                            : 'bg-[#090d16] border-r border-white/10 shadow-2xl'
                    }`}
            >
                {/* Brand Logo Header */}
                <div className={`flex items-center justify-between h-20 px-6 shrink-0 ${
                    isLight ? 'border-b border-slate-200 bg-white' : 'border-b border-white/10 bg-white/[0.01]'
                }`}>
                    <Link href="/admin" className="flex items-center gap-3">
                        <ChapterFourLogo
                            variant={isLight ? 'full' : 'white'}
                            imgClassName="h-9 w-auto"
                        />
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                            isLight
                                ? 'bg-brand-rust-light text-brand-rust border border-brand-rust/30'
                                : 'bg-brand-amber/20 text-brand-amber border border-brand-amber/30'
                        }`}>
                            CMS
                        </span>
                    </Link>

                    <button
                        className="lg:hidden p-1.5 text-slate-400 hover:text-slate-800 rounded-lg transition"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Sections */}
                <nav className="flex-1 overflow-y-auto py-5 px-3.5 space-y-6" aria-label="Admin navigation">
                    {navGroups.map((group) => (
                        <div key={group.label} className="space-y-1">
                            <div className="px-3 pb-1.5">
                                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                                    isLight ? 'text-slate-400' : 'text-slate-500'
                                }`}>
                                    {group.label}
                                </span>
                            </div>

                            <div className="space-y-0.5">
                                {group.items.map((item) => {
                                    const Icon = item.icon;
                                    const active = isActive(item.href);

                                    let activeClass = '';
                                    if (active) {
                                        activeClass = isLight
                                            ? 'bg-brand-rust text-white font-bold shadow-xs'
                                            : 'bg-gradient-to-r from-brand-rust/25 to-brand-amber/10 text-brand-amber font-semibold border-l-2 border-brand-amber shadow-sm';
                                    } else {
                                        activeClass = isLight
                                            ? 'text-slate-600 hover:text-brand-rust hover:bg-slate-100'
                                            : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]';
                                    }

                                    return (
                                        <Link
                                            key={item.id}
                                            href={item.href}
                                            id={item.id}
                                            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition group ${activeClass}`}
                                        >
                                            <Icon
                                                className={`w-4 h-4 shrink-0 transition-colors ${
                                                    active
                                                        ? isLight ? 'text-white' : 'text-brand-amber'
                                                        : isLight ? 'text-slate-500 group-hover:text-brand-rust' : 'text-slate-400 group-hover:text-slate-200'
                                                }`}
                                            />
                                            <span className="flex-1 truncate">{item.label}</span>
                                            {item.badge && (
                                                <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                                    active && isLight
                                                        ? 'bg-white text-brand-rust'
                                                        : 'bg-red-500/20 text-red-600 border border-red-500/30 animate-pulse'
                                                }`}>
                                                    {item.badge}
                                                </span>
                                            )}
                                            {(item as any).soon && (
                                                <span className="ml-auto px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-slate-200 text-slate-500 border border-slate-300">
                                                    Soon
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
                <div className={`p-4 shrink-0 ${
                    isLight ? 'border-t border-slate-200 bg-slate-50' : 'border-t border-white/10 bg-white/[0.01]'
                }`}>
                    <div className={`flex items-center gap-3 p-2 rounded-xl ${
                        isLight ? 'bg-white border border-slate-200' : 'bg-white/[0.02] border border-white/[0.04]'
                    }`}>
                        <div className="w-9 h-9 rounded-full bg-brand-rust text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                            {auth?.user?.name?.charAt(0) ?? 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className={`text-xs font-bold truncate leading-none ${
                                isLight ? 'text-slate-900' : 'text-white'
                            }`}>
                                {auth?.user?.name ?? 'Admin User'}
                            </p>
                            <span className="inline-block mt-1 px-1.5 py-0.2 rounded text-[9px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                Administrator
                            </span>
                        </div>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            id="admin-logout"
                            title="Sign out of Admin"
                            className={`p-2 rounded-lg transition shrink-0 ${
                                isLight ? 'text-slate-500 hover:text-red-600 hover:bg-slate-100' : 'text-slate-400 hover:text-red-400 hover:bg-white/5'
                            }`}
                        >
                            <LogOut className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </aside>

            {/* ─── MAIN APP CONTAINER ───────────────────────────────────── */}
            <div className="flex-1 flex flex-col min-w-0 min-h-screen">
                {/* Top Header */}
                <header className={`sticky top-0 z-30 h-16 px-4 lg:px-8 flex items-center justify-between gap-4 shrink-0 transition-colors ${
                    isLight
                        ? 'bg-white border-b border-slate-200 shadow-xs'
                        : 'bg-[#070a11]/90 border-b border-white/10 backdrop-blur-xl'
                }`}>
                    {/* Left: Mobile Toggle & Breadcrumbs */}
                    <div className="flex items-center gap-3">
                        <button
                            id="admin-mobile-menu"
                            className={`lg:hidden p-2 rounded-lg transition ${
                                isLight ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <nav className="hidden sm:flex items-center gap-2 text-xs" aria-label="Breadcrumb">
                            <Link href="/admin" className={isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'}>
                                Dashboard
                            </Link>
                            {breadcrumbs.map((crumb, i) => (
                                <span key={i} className="flex items-center gap-2">
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                                    {crumb.href ? (
                                        <Link href={crumb.href} className={isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'}>
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span className={`font-semibold ${isLight ? 'text-brand-rust' : 'text-brand-amber'}`}>
                                            {crumb.label}
                                        </span>
                                    )}
                                </span>
                            ))}
                            {header && breadcrumbs.length === 0 && (
                                <>
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                                    <span className={`font-semibold ${isLight ? 'text-brand-rust' : 'text-brand-amber'}`}>
                                        {header}
                                    </span>
                                </>
                            )}
                        </nav>
                    </div>

                    {/* Right: Theme Switcher, Quick Links & Actions */}
                    <div className="flex items-center gap-3">
                        {/* Live Local Time */}
                        <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono ${
                            isLight
                                ? 'bg-slate-100 border border-slate-200 text-slate-600'
                                : 'bg-emerald-500/[0.07] border border-emerald-500/20 text-emerald-400'
                        }`}>
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>{currentTime}</span>
                        </div>

                        {/* ─── DARK / LIGHT MODE TOGGLE BUTTON ─────────────── */}
                        <button
                            type="button"
                            id="admin-theme-toggle"
                            onClick={toggleTheme}
                            title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                            className={`p-2 rounded-xl border transition flex items-center gap-1.5 text-xs font-semibold ${
                                isLight
                                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-amber-300'
                            }`}
                        >
                            {isLight ? (
                                <>
                                    <Moon className="w-4 h-4 text-slate-700" />
                                    <span className="hidden sm:inline">Dark</span>
                                </>
                            ) : (
                                <>
                                    <Sun className="w-4 h-4 text-amber-400" />
                                    <span className="hidden sm:inline">Light</span>
                                </>
                            )}
                        </button>

                        {/* Quick New Resource Button */}
                        <Link
                            href="/admin/resources/create"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-brand-rust hover:bg-brand-rust-dark text-white transition shadow-xs"
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
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                                isLight
                                    ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                                    : 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white'
                            }`}
                        >
                            <ExternalLink className="w-3.5 h-3.5 text-brand-rust" />
                            <span className="hidden sm:inline">Public Site</span>
                        </a>

                        {/* Notifications */}
                        <div className="relative">
                            <button
                                id="admin-notifications"
                                onClick={() => setNotifOpen(!notifOpen)}
                                className={`relative p-2 rounded-lg transition ${
                                    isLight ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                                title="Notifications"
                            >
                                <Bell className="w-4 h-4" />
                                {unreadInquiries > 0 && (
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-rust ring-2 ring-white" />
                                )}
                            </button>

                            {notifOpen && (
                                <div className={`absolute right-0 top-full mt-2 w-80 rounded-xl border overflow-hidden shadow-xl z-50 ${
                                    isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#0c101c] border-white/10 text-white'
                                }`}>
                                    <div className={`p-4 border-b flex items-center justify-between ${
                                        isLight ? 'border-slate-100 bg-slate-50' : 'border-white/10'
                                    }`}>
                                        <span className="font-bold text-xs uppercase tracking-wider">Inquiries Inbox</span>
                                        <span className="text-xs font-semibold text-brand-rust">{unreadInquiries} active</span>
                                    </div>
                                    <div className="p-3">
                                        <Link
                                            href="/admin/inquiries"
                                            className={`block p-3 rounded-lg text-xs transition ${
                                                isLight ? 'hover:bg-slate-50' : 'hover:bg-white/5'
                                            }`}
                                            onClick={() => setNotifOpen(false)}
                                        >
                                            <div className="font-bold">Public Inquiries Received</div>
                                            <p className="text-[11px] text-slate-500 mt-1">
                                                {unreadInquiries} new citizen reports and legal consultation inquiries awaiting review.
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Floating Flash Message */}
                {flash?.success && (
                    <div className="mx-4 lg:mx-8 mt-4 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                        <span>{flash.success}</span>
                    </div>
                )}

                {/* Page Content Body */}
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>

            {/* Top Multi-Gradient Progress Bar */}
            {isProcessing && (
                <div className="fixed top-0 left-0 right-0 z-[999] h-1.5 overflow-hidden bg-slate-900/20">
                    <div
                        className="h-full bg-gradient-to-r from-brand-rust via-brand-amber to-emerald-400 transition-all duration-300"
                        style={{
                            width: progressPercent !== null ? `${progressPercent}%` : '100%',
                            animation: progressPercent === null ? 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none',
                        }}
                    />
                </div>
            )}

            {/* Floating Glassmorphism Upload / Update Modal */}
            {isProcessing && (
                <div className="fixed bottom-6 right-6 z-[999] max-w-sm w-full select-none animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto">
                    <div className="p-4 rounded-2xl bg-slate-900/95 dark:bg-black/95 text-white backdrop-blur-md border border-white/15 shadow-2xl flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-brand-rust/20 border border-brand-rust/40 flex items-center justify-center shrink-0 text-brand-amber relative">
                            {processType === 'upload' ? (
                                <UploadCloud className="w-6 h-6 text-brand-amber animate-bounce" />
                            ) : processType === 'delete' ? (
                                <Trash2 className="w-6 h-6 text-red-400 animate-pulse" />
                            ) : (
                                <RefreshCw className="w-6 h-6 text-brand-amber animate-spin" />
                            )}
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-amber opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-amber"></span>
                            </span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                                <h4 className="text-sm font-bold text-white truncate">{processTitle}</h4>
                                {progressPercent !== null && (
                                    <span className="text-xs font-mono font-bold text-brand-amber shrink-0">{progressPercent}%</span>
                                )}
                            </div>
                            <p className="text-xs text-slate-300 truncate mt-0.5">{processDetail}</p>

                            {progressPercent !== null ? (
                                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mt-2">
                                    <div
                                        className="h-full bg-gradient-to-r from-brand-rust to-brand-amber transition-all duration-200 rounded-full"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-2">
                                    <div className="w-full h-full bg-gradient-to-r from-brand-rust via-brand-amber to-brand-rust animate-pulse"></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
