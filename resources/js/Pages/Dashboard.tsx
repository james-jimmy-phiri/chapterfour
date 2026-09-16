import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    FileText, Newspaper, Users, MessageSquare, Mail, Image,
    ArrowRight, ArrowUpRight, TrendingUp, Clock, CheckCircle2,
    AlertCircle, Plus, Eye, Edit3, Trash2, Globe, BarChart3,
    Shield, BookOpen, Sparkles, Building2, ExternalLink, Activity
} from 'lucide-react';

interface InquiryItem {
    id: number;
    name: string;
    email: string;
    type: string;
    subject: string;
    status: string;
    time: string;
}

interface ResourceItem {
    id: number;
    title: string;
    slug: string;
    type: string;
    status: string;
    time: string;
}

interface ActivityItem {
    user: string;
    action: string;
    entity: string;
    details?: string;
    time: string;
    type: string;
}

interface DashboardProps {
    stats?: {
        publishedContent: number;
        drafts: number;
        scheduled: number;
        inquiries: number;
        subscribers: number;
        mediaItems: number;
        thematicAreas?: number;
        projects?: number;
        teamMembers?: number;
        partners?: number;
    };
    recentInquiries?: InquiryItem[];
    recentResources?: ResourceItem[];
    recentActivity?: ActivityItem[];
}

export default function Dashboard({
    stats = {
        publishedContent: 0,
        drafts: 0,
        scheduled: 0,
        inquiries: 0,
        subscribers: 0,
        mediaItems: 12,
        thematicAreas: 8,
        projects: 2,
        teamMembers: 4,
        partners: 5,
    },
    recentInquiries = [],
    recentResources = [],
    recentActivity = [],
}: DashboardProps) {
    const metricCards = [
        {
            label: 'Published Resources',
            value: stats.publishedContent,
            icon: BookOpen,
            color: 'text-brand-rust',
            bg: 'bg-brand-rust-light border-brand-rust/20',
            href: '/admin/resources?status=published',
            detail: 'Active on public catalogue',
        },
        {
            label: 'Content Drafts',
            value: stats.drafts,
            icon: Edit3,
            color: 'text-blue-600',
            bg: 'bg-blue-50 border-blue-200',
            href: '/admin/resources?status=draft',
            detail: 'Pending editorial review',
        },
        {
            label: 'Citizen Inquiries',
            value: stats.inquiries,
            icon: MessageSquare,
            color: 'text-brand-brick',
            bg: 'bg-red-50 border-red-200',
            href: '/admin/inquiries?status=new',
            detail: 'Awaiting triage response',
            badge: stats.inquiries > 0 ? 'Urgent' : null,
        },
        {
            label: 'Subscribers',
            value: stats.subscribers,
            icon: Mail,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50 border-emerald-200',
            href: '/admin/newsletter',
            detail: 'Consented email alerts',
        },
        {
            label: 'Thematic Pillars',
            value: stats.thematicAreas ?? 8,
            icon: Globe,
            color: 'text-purple-600',
            bg: 'bg-purple-50 border-purple-200',
            href: '/admin/thematic-areas',
            detail: 'Constitutional programs',
        },
        {
            label: 'Field Projects',
            value: stats.projects ?? 2,
            icon: Shield,
            color: 'text-brand-amber-dark',
            bg: 'bg-amber-50 border-amber-200',
            href: '/admin/projects',
            detail: 'Active legal units',
        },
    ];

    return (
        <AdminLayout header="Executive Dashboard">
            <Head title="CMS Executive Console — Chapter Four" />

            {/* ─── Hero Banner (Brand Styling) ────────────────────────────── */}
            <div className="relative rounded-2xl p-6 sm:p-8 mb-8 overflow-hidden bg-gradient-to-r from-brand-rust via-brand-brick to-brand-dark text-white shadow-md">
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/15 text-amber-200 border border-white/20 mb-3">
                            <Sparkles className="w-3.5 h-3.5" /> Institutional Administration
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                            Chapter Four Management Console
                        </h1>
                        <p className="mt-2 text-xs sm:text-sm text-slate-100 font-light leading-relaxed">
                            Oversee legal publications, triage citizen human rights inquiries, coordinate field defense projects, and track national impact indicators.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                        <a
                            href="/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition shadow-xs"
                        >
                            <ExternalLink className="w-3.5 h-3.5 text-brand-amber" />
                            <span>Live Website</span>
                        </a>
                        <Link
                            href="/admin/resources/create"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-white hover:bg-slate-50 text-brand-dark transition shadow-sm"
                        >
                            <Plus className="w-4 h-4 text-brand-rust" />
                            <span>Publish Resource</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* ─── Metric Cards Grid ──────────────────────────────────────── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {metricCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <Link
                            key={card.label}
                            href={card.href}
                            className="p-5 rounded-xl bg-white dark:bg-[#0d131f] border border-slate-200 dark:border-white/10 hover:border-brand-rust/50 transition-all shadow-xs hover:shadow-md group block"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${card.bg}`}>
                                    <Icon className={`w-4 h-4 ${card.color}`} />
                                </div>
                                {card.badge && (
                                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-red-100 text-red-700 border border-red-200">
                                        {card.badge}
                                    </span>
                                )}
                            </div>
                            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white group-hover:text-brand-rust transition-colors">
                                {card.value}
                            </div>
                            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1 truncate">
                                {card.label}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                                {card.detail}
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* ─── Main Two-Column Workbench ──────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                {/* Left: Actionable Inquiries & Content Pipeline (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Citizen Inquiries Triage */}
                    <div className="rounded-xl bg-white dark:bg-[#0d131f] border border-slate-200 dark:border-white/10 shadow-xs overflow-hidden">
                        <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-white/[0.02]">
                            <div className="flex items-center gap-2.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                                    Recent Public Inquiries
                                </h2>
                            </div>
                            <Link
                                href="/admin/inquiries"
                                className="text-xs text-brand-rust hover:text-brand-brick font-bold inline-flex items-center gap-1"
                            >
                                <span>Inbox ({stats.inquiries} pending)</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        <div className="divide-y divide-slate-100 dark:divide-white/5">
                            {recentInquiries.length > 0 ? (
                                recentInquiries.map((inq) => (
                                    <Link
                                        key={inq.id}
                                        href="/admin/inquiries"
                                        className="block p-4 hover:bg-slate-50 dark:hover:bg-white/[0.03] transition"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold text-slate-900 dark:text-white">{inq.name}</span>
                                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-rust-light text-brand-rust border border-brand-rust/20 font-semibold">
                                                        {inq.type}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-1 truncate max-w-md">
                                                    {inq.subject}
                                                </p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                                    inq.status === 'new'
                                                        ? 'bg-red-100 text-red-700'
                                                        : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                    {inq.status}
                                                </span>
                                                <div className="text-[10px] text-slate-400 mt-1">{inq.time}</div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="p-8 text-center text-slate-400 text-xs">
                                    No pending inquiries. All incoming citizen requests have been reviewed!
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content Publications Pipeline */}
                    <div className="rounded-xl bg-white dark:bg-[#0d131f] border border-slate-200 dark:border-white/10 shadow-xs overflow-hidden">
                        <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-white/[0.02]">
                            <div className="flex items-center gap-2.5">
                                <BookOpen className="w-4 h-4 text-brand-rust" />
                                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                                    Recent Publications & Statements
                                </h2>
                            </div>
                            <Link
                                href="/admin/resources"
                                className="text-xs text-brand-rust hover:text-brand-brick font-bold inline-flex items-center gap-1"
                            >
                                <span>All Resources</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        <div className="divide-y divide-slate-100 dark:divide-white/5">
                            {recentResources.map((res) => (
                                <div key={res.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300">
                                                {res.type}
                                            </span>
                                            <span className="text-[10px] text-slate-400">{res.time}</span>
                                        </div>
                                        <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-md">
                                            {res.title}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <Link
                                            href={`/admin/resources/${res.id}/edit`}
                                            className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition text-xs"
                                            title="Edit resource"
                                        >
                                            <Edit3 className="w-3.5 h-3.5" />
                                        </Link>
                                        <a
                                            href={`/resources/${res.slug}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-brand-rust hover:text-white text-slate-600 dark:text-slate-300 transition text-xs"
                                            title="View published article"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Live Audit Stream (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="rounded-xl bg-white dark:bg-[#0d131f] border border-slate-200 dark:border-white/10 shadow-xs overflow-hidden flex flex-col h-full">
                        <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-white/[0.02]">
                            <div className="flex items-center gap-2">
                                <Activity className="w-4 h-4 text-emerald-600" />
                                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                                    Live Audit Stream
                                </h2>
                            </div>
                            <Link
                                href="/admin/audit"
                                className="text-xs text-brand-rust hover:text-brand-brick font-bold inline-flex items-center gap-1"
                            >
                                <span>Audit Log</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        <div className="p-5 flex-1 divide-y divide-slate-100 dark:divide-white/5 space-y-4">
                            {recentActivity.map((activity, idx) => (
                                <div key={idx} className="pt-3 first:pt-0 flex items-start gap-3">
                                    <div className="w-7 h-7 rounded-lg bg-brand-rust-light text-brand-rust flex items-center justify-center text-xs shrink-0 mt-0.5">
                                        <Shield className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                                            <span className="font-bold text-slate-900 dark:text-white">{activity.user}</span>
                                            {' '}performed{' '}
                                            <span className="text-brand-rust font-mono text-[11px] px-1.5 py-0.2 rounded bg-brand-rust-light font-bold">
                                                {activity.action}
                                            </span>
                                            {' '}on{' '}
                                            <span className="text-slate-800 dark:text-slate-200 font-semibold">{activity.entity}</span>
                                        </p>
                                        <p className="text-[10px] text-slate-400 mt-1 font-mono">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.01]">
                            <div className="flex items-center justify-between text-[11px] text-slate-500">
                                <span>Security Engine: Active</span>
                                <span className="text-emerald-600 font-bold">● RBAC Verified</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Institutional Infrastructure Summary ───────────────────── */}
            <div className="p-6 rounded-xl bg-white dark:bg-[#0d131f] border border-slate-200 dark:border-white/10 shadow-xs flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-rust-light text-brand-rust flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">Chapter Four Secretariat • Lilongwe</div>
                        <div className="text-[11px] text-slate-500">Public Interest Human Rights & Constitutional Defense Portal</div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 font-mono">
                    <div>
                        <span>Status:</span> <span className="text-emerald-600 font-bold">Online</span>
                    </div>
                    <div>
                        <span>Jurisdiction:</span> <span className="text-brand-rust font-bold">Republic of Malawi</span>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
