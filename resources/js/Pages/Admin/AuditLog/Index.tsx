import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Search, Shield, Pencil, Trash2, Upload, Download, Database, User, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginatedData } from '@/types';

interface AuditEntry {
    id: number;
    user: string;
    user_email: string | null;
    action: string;
    entity: string;
    entity_type: string | null;
    entity_id: number | null;
    properties: Record<string, any> | null;
    ip_address: string | null;
    user_agent: string | null;
    time: string;
    created_at: string;
    type: 'create' | 'update' | 'delete' | 'publish' | 'upload' | 'subscribe' | 'login';
}

interface Props {
    logs: PaginatedData<AuditEntry>;
    entityTypes: string[];
    filters: { search: string; action: string; entity: string };
}

const TYPE_COLORS: Record<string, string> = {
    create:    'bg-emerald-100 text-emerald-700 border-emerald-200',
    update:    'bg-blue-100 text-blue-700 border-blue-200',
    delete:    'bg-red-100 text-red-700 border-red-200',
    publish:   'bg-purple-100 text-purple-700 border-purple-200',
    upload:    'bg-amber-100 text-amber-700 border-amber-200',
    subscribe: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    login:     'bg-slate-100 text-slate-700 border-slate-200',
};

const TYPE_ICONS: Record<string, React.ElementType> = {
    create:    Pencil,
    update:    RefreshCw,
    delete:    Trash2,
    publish:   Upload,
    upload:    Upload,
    subscribe: User,
    login:     Shield,
};

export default function AuditLogIndex({ logs, entityTypes, filters }: Props) {
    const [search, setSearch] = useState(filters.search);
    const [action, setAction] = useState(filters.action);
    const [entity, setEntity] = useState(filters.entity);

    const applyFilters = () => {
        router.get('/admin/audit', { search, action, entity }, { preserveState: true });
    };

    const handleKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter') applyFilters(); };

    return (
        <AdminLayout header="Security Audit Log" breadcrumbs={[{ label: 'Audit Log' }]}>
            <Head title="Audit Log — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Shield className="w-5 h-5 text-brand-rust" /> Security Audit Log
                    </h1>
                    <p className="text-sm text-slate-500 mt-0.5">Complete record of all administrative actions — {logs.total} total entries.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-4 mb-6 flex flex-wrap gap-3 items-end">
                <div className="flex-1 min-w-48">
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Search</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleKey} placeholder="User, action, entity…" className="w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-white/10 rounded-lg text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Action Type</label>
                    <select value={action} onChange={e => setAction(e.target.value)} className="border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust">
                        <option value="all">All Actions</option>
                        {['created','updated','deleted','published','uploaded','subscribed'].map(a => (
                            <option key={a} value={a}>{a.charAt(0).toUpperCase() + a.slice(1)}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Entity Type</label>
                    <select value={entity} onChange={e => setEntity(e.target.value)} className="border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-rust">
                        <option value="all">All Entities</option>
                        {entityTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                <button onClick={applyFilters} className="px-4 py-2 bg-brand-rust text-white text-sm font-semibold rounded-lg hover:bg-brand-rust-dark transition">
                    Filter
                </button>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 dark:bg-white/[0.03] border-b border-slate-200 dark:border-white/10">
                            <tr>
                                {['Time', 'User', 'Action', 'Entity', 'IP Address', 'Details'].map(h => (
                                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {logs.data.map(log => {
                                const TypeIcon = TYPE_ICONS[log.type] ?? Database;
                                return (
                                    <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition">
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="text-xs text-slate-500 dark:text-slate-400" title={log.created_at}>{log.time}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-slate-900 dark:text-white text-xs">{log.user}</p>
                                            {log.user_email && <p className="text-[11px] text-slate-400">{log.user_email}</p>}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${TYPE_COLORS[log.type] ?? TYPE_COLORS.update}`}>
                                                <TypeIcon className="w-3 h-3" />
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs font-mono text-slate-700 dark:text-slate-300">{log.entity}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs font-mono text-slate-500">{log.ip_address ?? '—'}</span>
                                        </td>
                                        <td className="px-4 py-3 max-w-xs">
                                            {log.properties ? (
                                                <pre className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/5 rounded px-2 py-1 overflow-hidden truncate">
                                                    {JSON.stringify(log.properties)}
                                                </pre>
                                            ) : <span className="text-slate-300">—</span>}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {logs.last_page > 1 && (
                    <div className="px-4 py-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                        <span className="text-xs text-slate-500">Showing {logs.from}–{logs.to} of {logs.total}</span>
                        <div className="flex gap-1">
                            {logs.links.map((link, i) => (
                                <Link key={i} href={link.url ?? '#'} preserveScroll
                                    className={`px-3 py-1 rounded text-xs font-medium border transition ${link.active ? 'bg-brand-rust text-white border-brand-rust' : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50'} ${!link.url ? 'opacity-30 pointer-events-none' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
