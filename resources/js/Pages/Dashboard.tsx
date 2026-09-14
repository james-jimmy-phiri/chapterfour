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
            color: 'text-amber-400',
            bg: 'bg-amber-500/10 border-amber-500/20',
            href: '/admin/resources?status=published',
            detail: 'Live on public portal',
        },
        {
            label: 'Content Drafts',
            value: stats.drafts,
            icon: Edit3,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10 border-blue-500/20',
            href: '/admin/resources?status=draft',
            detail: 'Pending editorial review',
        },
        {
            label: 'Citizen Inquiries',
            value: stats.inquiries,
            icon: MessageSquare,
            color: 'text-red-400',
            bg: 'bg-red-500/10 border-red-500/20',
            href: '/admin/inquiries?status=new',
            detail: 'Awaiting triage response',
            badge: stats.inquiries > 0 ? 'Urgent' : null,
        },
        {
            label: 'Subscribers',
            value: stats.subscribers,
            icon: Mail,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10 border-emerald-500/20',
            href: '/admin/newsletter',
            detail: 'Consented email alerts',
        },
        {
            label: 'Thematic Pillars',
            value: stats.thematicAreas ?? 8,
            icon: Globe,
            color: 'text-purple-400',
            bg: 'bg-purple-500/10 border-purple-500/20',
            href: '/admin/thematic-areas',
            detail: 'Constitutional programs',
        },
        {
            label: 'Field Projects',
            value: stats.projects ?? 2,
            icon: Shield,
            color: 'text-teal-400',
            bg: 'bg-teal-500/10 border-teal-500/20',
            href: '/admin/projects',
            detail: 'Legal defense units',
        },
    ];

    return (
        <AdminLayout header="Executive Dashboard">
            <Head title="CMS Executive Console — Chapter Four" />

            {/* ─── Hero Banner ────────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-3xl p-6 sm:p-8 mb-8 overflow-hidden border border-white/10 bg-gradient-to-r from-[#0d1424] via-[#090d18] to-[#0d1424] shadow-2xl"
            >
                {/* Background Ambient Lights */}
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
                            <Sparkles className="w-3.5 h-3.5" /> Institutional Administration
                        </div>
                        <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight">
                            Malawian Constitutional & Human Rights <span className="italic text-gradient-gold">Management Console</span>
                        </h1>
                        <p className="mt-2 text-sm text-slate-400 font-light leading-relaxed">
                            Oversee civic publications, triage public human rights defense inquiries, manage traveling paralegal projects, and update national impact metrics.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                        <a
                            href="/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 transition-all shadow-sm"
                        >
                            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                            Live Website
                        </a>
                        <Link
                            href="/admin/resources/create"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-navy-950 transition-all shadow-lg shadow-amber-500/20"
                        >
                            <Plus className="w-4 h-4" />
                            Publish Resource
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* ─── Metric Cards Grid ──────────────────────────────────────── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {metricCards.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <motion.div
                            key={card.label}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                        >
                            <Link
                                href={card.href}
                                className="block p-5 rounded-2xl bg-[#0a0e1a]/90 border border-white/[0.06] hover:border-amber-500/40 transition-all group relative overflow-hidden"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${card.bg}`}>
                                        <Icon className={`w-4 h-4 ${card.color}`} />
                                    </div>
                                    {card.badge && (
                                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/30">
                                            {card.badge}
                                        </span>
                                    )}
                                </div>
                                <div className="font-serif text-2xl sm:text-3xl text-white font-normal group-hover:text-amber-300 transition-colors">
                                    {card.value}
                                </div>
                                <div className="text-xs font-medium text-slate-300 mt-1 truncate">
                                    {card.label}
                                </div>
                                <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                                    {card.detail}
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>

            {/* ─── Main Two-Column Workbench ──────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                {/* Left: Actionable Inquiries & Content Pipeline (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Urgent Citizen Inquiries Triage */}
                    <div className="rounded-2xl bg-[#0a0e1a]/90 border border-white/[0.06] overflow-hidden">
                        <div className="p-5 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
                            <div className="flex items-center gap-2.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
                                <h2 className="text-sm font-semibold text-white">Recent Public Inquiries</h2>
                            </div>
                            <Link
                                href="/admin/inquiries"
                                className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1"
                            >
                                Inbox ({stats.inquiries} pending) <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        <div className="divide-y divide-white/[0.04]">
                            {recentInquiries.length > 0 ? (
                                recentInquiries.map((inq) => (
                                    <Link
                                        key={inq.id}
                                        href="/admin/inquiries"
                                        className="block p-4 hover:bg-white/[0.03] transition-colors"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-semibold text-white">{inq.name}</span>
                                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                                                        {inq.type}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-300 font-medium mt-1 truncate max-w-md">
                                                    {inq.subject}
                                                </p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                                    inq.status === 'new' ? 'bg-red-500/20 text-red-300' : 'bg-blue-500/20 text-blue-300'
                                                }`}>
                                                    {inq.status}
                                                </span>
                                                <div className="text-[10px] text-slate-500 mt-1">{inq.time}</div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="p-8 text-center text-slate-400 text-xs">
                                    No pending inquiries. All incoming rights requests have been triaged!
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content Publications Pipeline */}
                    <div className="rounded-2xl bg-[#0a0e1a]/90 border border-white/[0.06] overflow-hidden">
                        <div className="p-5 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
                            <div className="flex items-center gap-2.5">
                                <BookOpen className="w-4 h-4 text-amber-400" />
                                <h2 className="text-sm font-semibold text-white">Recent Publications & Statements</h2>
                            </div>
                            <Link
                                href="/admin/resources"
                                className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1"
                            >
                                All Resources <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        <div className="divide-y divide-white/[0.04]">
                            {recentResources.map((res) => (
                                <div key={res.id} className="p-4 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-white/5 text-slate-300">
                                                {res.type}
                                            </span>
                                            <span className="text-[10px] text-slate-400">{res.time}</span>
                                        </div>
                                        <h3 className="text-xs font-medium text-white truncate max-w-md">
                                            {res.title}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <Link
                                            href={`/admin/resources/${res.id}/edit`}
                                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-xs"
                                            title="Edit resource"
                                        >
                                            <Edit3 className="w-3.5 h-3.5" />
                                        </Link>
                                        <a
                                            href={`/resources/${res.slug}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-1.5 rounded-lg bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 transition-colors text-xs"
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

                {/* Right: Real-time Audit Activity Stream (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="rounded-2xl bg-[#0a0e1a]/90 border border-white/[0.06] overflow-hidden flex flex-col h-full">
                        <div className="p-5 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
                            <div className="flex items-center gap-2">
                                <Activity className="w-4 h-4 text-emerald-400" />
                                <h2 className="text-sm font-semibold text-white">Live Audit Stream</h2>
                            </div>
                            <Link
                                href="/admin/audit"
                                className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1"
                            >
                                Audit Log <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        <div className="p-5 flex-1 divide-y divide-white/[0.04] space-y-4">
                            {recentActivity.map((activity, idx) => (
                                <div key={idx} className="pt-3 first:pt-0 flex items-start gap-3">
                                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xs shrink-0 mt-0.5">
                                        <Shield className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-slate-300 leading-snug">
                                            <span className="font-semibold text-white">{activity.user}</span>
                                            {' '}performed{' '}
                                            <span className="text-amber-400 font-mono text-[11px] px-1.5 py-0.2 rounded bg-amber-500/10">
                                                {activity.action}
                                            </span>
                                            {' '}on{' '}
                                            <span className="text-slate-200 font-medium">{activity.entity}</span>
                                        </p>
                                        <p className="text-[10px] text-slate-500 mt-1 font-mono">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-white/[0.06] bg-white/[0.01]">
                            <div className="flex items-center justify-between text-[11px] text-slate-400">
                                <span>Security Engine: Active</span>
                                <span className="text-emerald-400 font-medium">● 0 Vulnerabilities Detected</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Institutional Infrastructure Summary ───────────────────── */}
            <div className="p-6 rounded-2xl bg-[#0a0e1a]/90 border border-white/[0.06] flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                        <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-white">Chapter Four Secretariat • Lilongwe</div>
                        <div className="text-[11px] text-slate-400">Youth-led Civil Society Organization in Human Rights & Constitutionalism</div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono">
                    <div>
                        <span className="text-slate-500">Database:</span> <span className="text-emerald-400">SQLite Connected</span>
                    </div>
                    <div>
                        <span className="text-slate-500">Framework:</span> <span className="text-white">Laravel 12 + Inertia + React 19</span>
                    </div>
                    <div>
                        <span className="text-slate-500">Jurisdiction:</span> <span className="text-amber-400">Republic of Malawi</span>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
