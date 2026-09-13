import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    FileText, Newspaper, Users, MessageSquare, Mail, Image,
    ArrowRight, ArrowUpRight, TrendingUp, Clock, CheckCircle,
    AlertCircle, Plus, Eye, Edit3, Trash2, Globe, BarChart3,
    Shield, BookOpen
} from 'lucide-react';

interface DashboardProps {
    stats?: {
        publishedContent: number;
        drafts: number;
        scheduled: number;
        inquiries: number;
        subscribers: number;
        mediaItems: number;
    };
    recentActivity?: Array<{
        user: string;
        action: string;
        entity: string;
        time: string;
        type: 'create' | 'update' | 'publish' | 'delete' | 'upload';
    }>;
}

const defaultStats = {
    publishedContent: 12,
    drafts: 4,
    scheduled: 2,
    inquiries: 3,
    subscribers: 147,
    mediaItems: 56,
};

const defaultActivity = [
    { user: 'Admin', action: 'published', entity: 'State of Human Rights Report 2024', time: '2 minutes ago', type: 'publish' as const },
    { user: 'Editor', action: 'updated', entity: 'About Page', time: '1 hour ago', type: 'update' as const },
    { user: 'Admin', action: 'uploaded', entity: '3 media files', time: '3 hours ago', type: 'upload' as const },
    { user: 'Editor', action: 'created', entity: 'New press release draft', time: '5 hours ago', type: 'create' as const },
    { user: 'Admin', action: 'published', entity: 'Thematic Area: Access to Justice', time: 'Yesterday', type: 'publish' as const },
    { user: 'Editor', action: 'updated', entity: 'Impact Statistics', time: 'Yesterday', type: 'update' as const },
];

const activityIcon = {
    create: Plus,
    update: Edit3,
    publish: CheckCircle,
    delete: Trash2,
    upload: Image,
};

const activityColor = {
    create: 'text-blue-400',
    update: 'text-gold-400',
    publish: 'text-emerald-400',
    delete: 'text-crimson-400',
    upload: 'text-purple-400',
};

const quickActions = [
    { label: 'New Article', href: '/admin/resources/create', icon: Newspaper, color: 'from-blue-600/20 to-navy-900/20', border: 'border-blue-500/20' },
    { label: 'New Page', href: '/admin/pages/create', icon: FileText, color: 'from-gold-600/20 to-navy-900/20', border: 'border-gold-500/20' },
    { label: 'Upload Media', href: '/admin/media', icon: Image, color: 'from-purple-600/20 to-navy-900/20', border: 'border-purple-500/20' },
    { label: 'View Inquiries', href: '/admin/inquiries', icon: MessageSquare, color: 'from-crimson-600/20 to-navy-900/20', border: 'border-crimson-500/20' },
    { label: 'Manage Team', href: '/admin/team', icon: Users, color: 'from-emerald-600/20 to-navy-900/20', border: 'border-emerald-500/20' },
    { label: 'Site Settings', href: '/admin/settings', icon: Globe, color: 'from-teal-600/20 to-navy-900/20', border: 'border-teal-500/20' },
];

const contentSummary = [
    { label: 'Thematic Areas', count: 8, published: 8, icon: Globe, href: '/admin/thematic-areas' },
    { label: 'News & Resources', count: 12, published: 10, icon: Newspaper, href: '/admin/resources' },
    { label: 'Team Members', count: 6, published: 6, icon: Users, href: '/admin/team' },
    { label: 'Partners', count: 9, published: 7, icon: Shield, href: '/admin/partners' },
];

export default function Dashboard({ stats = defaultStats, recentActivity = defaultActivity }: DashboardProps) {
    return (
        <AdminLayout header="Dashboard">
            <Head title="CMS Dashboard — Chapter Four" />

            {/* ─── Welcome banner ──────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-2xl overflow-hidden mb-6 p-6 lg:p-8"
                style={{
                    background: 'linear-gradient(135deg, rgba(30, 40, 130, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%)',
                    border: '1px solid rgba(245, 158, 11, 0.15)',
                }}
            >
                <div className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(245,158,11,0.15) 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                    }}
                />
                <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="font-sans font-bold text-white text-xl mb-1">Welcome to the CMS</h2>
                        <p className="text-white/50 text-sm">Manage Chapter Four's content, media and communications from here.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <a
                            href="/"
                            target="_blank"
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white text-sm transition-all hover:border-white/20"
                        >
                            <Eye className="w-4 h-4" />
                            Preview Site
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                        <Link
                            href="/admin/resources/create"
                            id="dashboard-new-content"
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-500 text-navy-950 font-semibold text-sm hover:bg-gold-400 transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            New Content
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* ─── Stat cards ──────────────────────────────────────────── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                {[
                    { label: 'Published', value: stats.publishedContent, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10', trend: '+2 this week' },
                    { label: 'Drafts', value: stats.drafts, icon: Edit3, color: 'text-gold-400', bg: 'bg-gold-400/10', trend: '4 pending' },
                    { label: 'Scheduled', value: stats.scheduled, icon: Clock, color: 'text-blue-400', bg: 'bg-blue-400/10', trend: 'Next: tomorrow' },
                    { label: 'Inquiries', value: stats.inquiries, icon: MessageSquare, color: 'text-crimson-400', bg: 'bg-crimson-400/10', trend: '3 unread' },
                    { label: 'Subscribers', value: stats.subscribers, icon: Mail, color: 'text-purple-400', bg: 'bg-purple-400/10', trend: '+12 this month' },
                    { label: 'Media Items', value: stats.mediaItems, icon: Image, color: 'text-teal-400', bg: 'bg-teal-400/10', trend: '56 files' },
                ].map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <motion.div
                            key={card.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.4 }}
                            className="rounded-2xl p-4 border border-white/6 hover:border-white/10 transition-all duration-300"
                            style={{ background: 'rgba(255,255,255,0.03)' }}
                        >
                            <div className={`w-8 h-8 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>
                                <Icon className={`w-4 h-4 ${card.color}`} />
                            </div>
                            <div className="font-bold text-white text-2xl mb-0.5">{card.value}</div>
                            <div className="text-white/40 text-xs font-medium">{card.label}</div>
                            <div className={`text-[10px] mt-1.5 ${card.color} opacity-70`}>{card.trend}</div>
                        </motion.div>
                    );
                })}
            </div>

            {/* ─── Main grid ───────────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Quick actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2"
                >
                    <div className="rounded-2xl border border-white/6 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <div className="px-5 py-4 border-b border-white/6 flex items-center justify-between">
                            <h3 className="font-sans font-semibold text-white text-sm">Quick Actions</h3>
                        </div>
                        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {quickActions.map((action, i) => {
                                const Icon = action.icon;
                                return (
                                    <Link
                                        key={action.label}
                                        href={action.href}
                                        id={`quick-action-${i}`}
                                        className={`flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-br ${action.color} border ${action.border} hover:opacity-80 transition-all duration-200 group`}
                                    >
                                        <Icon className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                                        <span className="text-white/80 group-hover:text-white text-sm font-medium transition-colors">{action.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content summary */}
                    <div className="rounded-2xl border border-white/6 overflow-hidden mt-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <div className="px-5 py-4 border-b border-white/6 flex items-center justify-between">
                            <h3 className="font-sans font-semibold text-white text-sm">Content Overview</h3>
                            <Link href="/admin/resources" className="text-gold-400/70 hover:text-gold-400 text-xs transition-colors">
                                View All
                            </Link>
                        </div>
                        <div className="divide-y divide-white/4">
                            {contentSummary.map((item) => {
                                const Icon = item.icon;
                                const pct = Math.round((item.published / item.count) * 100);
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/2 transition-colors group"
                                    >
                                        <Icon className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="text-white/70 text-sm group-hover:text-white transition-colors">{item.label}</span>
                                                <span className="text-white/30 text-xs">{item.published}/{item.count} published</span>
                                            </div>
                                            <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-700"
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                        </div>
                                        <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* Activity feed */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-2xl border border-white/6 overflow-hidden flex flex-col"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <div className="px-5 py-4 border-b border-white/6 flex items-center justify-between">
                        <h3 className="font-sans font-semibold text-white text-sm">Recent Activity</h3>
                        <Link href="/admin/audit" className="text-gold-400/70 hover:text-gold-400 text-xs transition-colors">
                            View Log
                        </Link>
                    </div>
                    <div className="flex-1 divide-y divide-white/4 overflow-auto">
                        {recentActivity.map((activity, i) => {
                            const Icon = activityIcon[activity.type];
                            const color = activityColor[activity.type];
                            return (
                                <div key={i} className="px-5 py-3.5 hover:bg-white/2 transition-colors">
                                    <div className="flex items-start gap-3">
                                        <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center`}>
                                            <Icon className={`w-3 h-3 ${color}`} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-white/70 text-sm leading-snug">
                                                <span className="text-white font-medium">{activity.user}</span>
                                                {' '}{activity.action}{' '}
                                                <span className="text-white/60">"{activity.entity}"</span>
                                            </p>
                                            <p className="text-white/25 text-xs mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="px-5 py-3 border-t border-white/6">
                        <Link href="/admin/audit" className="flex items-center justify-center gap-1.5 text-white/30 hover:text-white/60 text-xs transition-colors py-1">
                            View full audit log <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* ─── System status bar ───────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 flex flex-wrap gap-6 px-5 py-3.5 rounded-2xl border border-white/6"
                style={{ background: 'rgba(255,255,255,0.02)' }}
            >
                {[
                    { label: 'Site Status', value: 'Online', color: 'text-emerald-400' },
                    { label: 'Database', value: 'Connected', color: 'text-emerald-400' },
                    { label: 'Storage', value: '23% used', color: 'text-gold-400' },
                    { label: 'Laravel', value: '12.x', color: 'text-white/40' },
                    { label: 'Last backup', value: 'Today 06:00', color: 'text-white/40' },
                ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                        <span className="text-white/25 text-xs">{item.label}:</span>
                        <span className={`text-xs font-medium ${item.color}`}>{item.value}</span>
                    </div>
                ))}
            </motion.div>
        </AdminLayout>
    );
}
