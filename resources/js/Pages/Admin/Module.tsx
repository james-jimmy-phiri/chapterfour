import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import {
    Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye,
    ArrowUpDown, FileText, CheckCircle2, Clock, AlertCircle
} from 'lucide-react';
import { useState } from 'react';

interface ModuleProps {
    title: string;
    slug: string;
}

export default function Module({ title, slug }: ModuleProps) {
    const [search, setSearch] = useState('');

    const formattedTitle = title.replace(/([A-Z])/g, ' $1').trim();

    const sampleItems = [
        { id: 1, name: `${formattedTitle} Item 1`, status: 'Published', date: 'Oct 24, 2024', author: 'Admin' },
        { id: 2, name: `${formattedTitle} Item 2`, status: 'Draft', date: 'Nov 02, 2024', author: 'Editor' },
        { id: 3, name: `${formattedTitle} Item 3`, status: 'Published', date: 'Nov 12, 2024', author: 'Admin' },
        { id: 4, name: `${formattedTitle} Item 4`, status: 'Under Review', date: 'Dec 01, 2024', author: 'Contributor' },
    ];

    return (
        <AdminLayout
            header={formattedTitle}
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin' },
                { label: formattedTitle },
            ]}
        >
            <Head title={`${formattedTitle} - Chapter Four CMS`} />

            <div className="space-y-6">
                {/* Header Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-serif font-normal text-white">{formattedTitle} Management</h1>
                        <p className="text-xs text-navy-400 mt-1">Manage, update, and publish records for {formattedTitle.toLowerCase()}.</p>
                    </div>

                    <button
                        onClick={() => alert(`Creating new record for ${formattedTitle}.`)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-semibold text-xs shadow-md shadow-amber-500/20 transition-all"
                    >
                        <Plus className="w-4 h-4" /> Add New
                    </button>
                </div>

                {/* Filters & Search */}
                <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full sm:w-72">
                        <Search className="w-4 h-4 text-navy-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder={`Search ${formattedTitle.toLowerCase()}...`}
                            className="w-full pl-9 pr-4 py-2 rounded-lg bg-navy-950 border border-navy-700 text-white placeholder-navy-500 text-xs focus:outline-none focus:border-amber-500"
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-navy-200 text-xs border border-navy-700 transition-colors">
                            <Filter className="w-3.5 h-3.5" /> All Statuses
                        </button>
                    </div>
                </div>

                {/* Data Table */}
                <div className="rounded-xl border border-navy-800 bg-navy-900/40 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-navy-900/80 text-navy-400 border-b border-navy-800 uppercase tracking-wider font-semibold">
                                <tr>
                                    <th className="py-3 px-4">Title / Label</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Author</th>
                                    <th className="py-3 px-4">Last Updated</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-navy-800/60 text-navy-200">
                                {sampleItems.map(item => (
                                    <tr key={item.id} className="hover:bg-navy-800/30 transition-colors">
                                        <td className="py-3.5 px-4 font-medium text-white flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-amber-400/80" />
                                            {item.name}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                                                item.status === 'Published'
                                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                    : item.status === 'Draft'
                                                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                    : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-navy-300">{item.author}</td>
                                        <td className="py-3.5 px-4 text-navy-400">{item.date}</td>
                                        <td className="py-3.5 px-4 text-right">
                                            <div className="inline-flex items-center gap-1">
                                                <button
                                                    title="View"
                                                    className="p-1 rounded hover:bg-navy-800 text-navy-400 hover:text-white transition-colors"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    title="Edit"
                                                    className="p-1 rounded hover:bg-navy-800 text-navy-400 hover:text-amber-400 transition-colors"
                                                >
                                                    <Edit className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    title="Delete"
                                                    className="p-1 rounded hover:bg-navy-800 text-navy-400 hover:text-red-400 transition-colors"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
