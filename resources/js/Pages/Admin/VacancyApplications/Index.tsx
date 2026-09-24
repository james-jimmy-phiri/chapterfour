import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Search, FileText, Download, Briefcase } from 'lucide-react';

interface Vacancy {
    id: number;
    title: string;
}

interface Application {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    location: string | null;
    document_path: string;
    created_at: string;
    vacancy?: Vacancy;
}

interface Props {
    applications: {
        data: Application[];
        links: any[];
    };
}

export default function ApplicationsIndex({ applications }: Props) {
    const [search, setSearch] = useState('');

    const filtered = applications.data.filter((a) =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase()) ||
        (a.vacancy?.title.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <AdminLayout
            header="Applications"
            description="View received vacancy and consultancy applications."
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin' },
                { label: 'Applications' },
            ]}
        >
            <Head title="Applications - Admin" />

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search applications..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent transition-shadow text-sm"
                    />
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Applicant</th>
                                <th className="px-6 py-4 font-semibold">Contact</th>
                                <th className="px-6 py-4 font-semibold">Vacancy</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold text-right">Document</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filtered.length > 0 ? (
                                filtered.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900">{item.name}</div>
                                            <div className="text-xs text-slate-500 mt-1">{item.location || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-slate-900">{item.email}</div>
                                            <div className="text-xs text-slate-500 mt-1">{item.phone || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-700">
                                                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                                                <span className="truncate max-w-[200px]" title={item.vacancy?.title}>
                                                    {item.vacancy?.title || 'Unknown Vacancy'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a
                                                href={item.document_path}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 rounded-md transition-colors text-xs font-medium"
                                                title="Download Document"
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                                Download
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        No applications found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
