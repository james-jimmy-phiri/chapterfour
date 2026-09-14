import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft, Save, FileText, CheckCircle2, AlertCircle,
    Download, Globe, Sparkles, Loader2
} from 'lucide-react';

interface FormProps {
    resource?: {
        id?: number;
        title: string;
        slug: string;
        type: string;
        excerpt?: string;
        body?: string;
        status: string;
        is_featured: boolean;
        pdf_path?: string | null;
    } | null;
    resourceTypes: Array<{ value: string; label: string }>;
    contentStatuses: Array<{ value: string; label: string }>;
}

export default function Form({ resource, resourceTypes, contentStatuses }: FormProps) {
    const isEdit = !!resource?.id;

    const { data, setData, post, put, processing, errors } = useForm({
        title: resource?.title || '',
        slug: resource?.slug || '',
        type: resource?.type || (resourceTypes[0]?.value || 'publication'),
        excerpt: resource?.excerpt || '',
        body: resource?.body || '',
        status: resource?.status || 'published',
        is_featured: resource?.is_featured ?? false,
        pdf_path: resource?.pdf_path || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(`/admin/resources/${resource.id}`);
        } else {
            post('/admin/resources');
        }
    };

    return (
        <AdminLayout
            header={isEdit ? 'Edit Resource' : 'Create Resource'}
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin' },
                { label: 'Resources', href: '/admin/resources' },
                { label: isEdit ? 'Edit' : 'Create' },
            ]}
        >
            <Head title={`${isEdit ? 'Edit' : 'Create'} Resource - Chapter Four CMS`} />

            <div className="max-w-4xl space-y-6">
                <div className="flex items-center justify-between">
                    <Link
                        href="/admin/resources"
                        className="inline-flex items-center gap-1.5 text-xs text-navy-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Resources list
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Main Card */}
                    <div className="p-8 rounded-2xl bg-navy-900/60 border border-navy-800 space-y-6">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-300 mb-2">
                                Resource Title *
                            </label>
                            <input
                                type="text"
                                required
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                placeholder="e.g. State of Constitutional Rights 2024"
                                className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-navy-700 text-white placeholder-navy-500 text-sm focus:outline-none focus:border-amber-500"
                            />
                            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-navy-300 mb-2">
                                    Slug (URL identifier)
                                </label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={e => setData('slug', e.target.value)}
                                    placeholder="auto-generated from title if blank"
                                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-navy-700 text-white placeholder-navy-500 text-sm focus:outline-none focus:border-amber-500"
                                />
                                {errors.slug && <p className="text-red-400 text-xs mt-1">{errors.slug}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-navy-300 mb-2">
                                    Content Type *
                                </label>
                                <select
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-navy-700 text-white text-sm focus:outline-none focus:border-amber-500 capitalize"
                                >
                                    {resourceTypes.map(t => (
                                        <option key={t.value} value={t.value}>{t.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-300 mb-2">
                                Summary / Excerpt
                            </label>
                            <textarea
                                rows={3}
                                value={data.excerpt}
                                onChange={e => setData('excerpt', e.target.value)}
                                placeholder="A concise 2-3 sentence overview..."
                                className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-navy-700 text-white placeholder-navy-500 text-sm focus:outline-none focus:border-amber-500 resize-none"
                            />
                            {errors.excerpt && <p className="text-red-400 text-xs mt-1">{errors.excerpt}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-300 mb-2">
                                Full Body Content
                            </label>
                            <textarea
                                rows={8}
                                value={data.body}
                                onChange={e => setData('body', e.target.value)}
                                placeholder="Detailed analysis, recommendations, or press statement text (HTML or formatted text supported)..."
                                className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-navy-700 text-white placeholder-navy-500 text-sm focus:outline-none focus:border-amber-500"
                            />
                            {errors.body && <p className="text-red-400 text-xs mt-1">{errors.body}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-navy-800">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-navy-300 mb-2">
                                    Publication Status
                                </label>
                                <select
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-navy-700 text-white text-sm focus:outline-none focus:border-amber-500 capitalize"
                                >
                                    {contentStatuses.map(s => (
                                        <option key={s.value} value={s.value}>{s.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-navy-300 mb-2">
                                    PDF Document Path / Download URL
                                </label>
                                <input
                                    type="text"
                                    value={data.pdf_path || ''}
                                    onChange={e => setData('pdf_path', e.target.value)}
                                    placeholder="/documents/sample-report.pdf"
                                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-navy-700 text-white placeholder-navy-500 text-sm focus:outline-none focus:border-amber-500"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.is_featured}
                                    onChange={e => setData('is_featured', e.target.checked)}
                                    className="w-4 h-4 rounded bg-navy-950 border-navy-700 text-amber-500 focus:ring-amber-500 focus:ring-offset-navy-900"
                                />
                                <span className="text-xs text-navy-200">
                                    Feature this publication on the homepage hero section
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Bottom Save Action */}
                    <div className="flex items-center justify-end gap-3">
                        <Link
                            href="/admin/resources"
                            className="px-5 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-navy-300 text-xs font-medium transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-semibold text-xs shadow-md shadow-amber-500/20 transition-all disabled:opacity-50"
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" /> {isEdit ? 'Update Resource' : 'Publish Resource'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
