import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useRef } from 'react';
import {
    Image as ImageIcon, Upload, Search, Trash2, Copy, Check,
    FileText, ExternalLink, Grid, List, X, HardDrive, Filter, Eye
} from 'lucide-react';

interface MediaItem {
    id: string;
    path: string;
    name: string;
    url: string;
    mime: string;
    size: number;
    size_formatted: string;
    type: 'image' | 'pdf' | 'document' | 'file';
    updated_at: string;
}

interface MediaProps {
    media: MediaItem[];
    stats: {
        total_files: number;
        total_size: string;
    };
    filters: {
        search: string;
        type: string;
    };
}

export default function MediaIndex({ media = [], stats, filters }: MediaProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [typeFilter, setTypeFilter] = useState(filters.type || 'all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleCopyUrl = (item: MediaItem) => {
        const fullUrl = window.location.origin + item.url;
        navigator.clipboard.writeText(fullUrl);
        setCopiedId(item.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleUploadFiles = (files: FileList | null) => {
        if (!files || files.length === 0) return;
        setUploading(true);

        const formData = new FormData();
        Array.from(files).forEach((f) => formData.append('files[]', f));

        router.post('/admin/media', formData as any, {
            onSuccess: () => {
                setUploading(false);
                if (fileInputRef.current) fileInputRef.current.value = '';
            },
            onError: () => setUploading(false),
        });
    };

    const handleDelete = (item: MediaItem) => {
        if (confirm(`Delete file '${item.name}'?`)) {
            router.post('/admin/media/delete', { path: item.path, _method: 'delete' });
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/media', { search, type: typeFilter }, { preserveState: true });
    };

    return (
        <AdminLayout
            header="Media Library"
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin' },
                { label: 'Media Library' },
            ]}
        >
            <Head title="Media Library - Chapter Four CMS" />

            <div className="space-y-6 max-w-7xl">
                {/* Header Actions & Stats */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <ImageIcon className="w-6 h-6 text-brand-rust" />
                            Media & Document Asset Library
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Browse, upload, preview, and copy URLs of organizational photos, cover images, and legal PDFs.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-600 dark:text-slate-300">
                            <HardDrive className="w-4 h-4 text-brand-rust" />
                            <span>{stats.total_files} assets ({stats.total_size})</span>
                        </div>

                        <input
                            type="file"
                            multiple
                            ref={fileInputRef}
                            className="hidden"
                            onChange={(e) => handleUploadFiles(e.target.files)}
                        />

                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-rust hover:bg-brand-crimson text-white font-semibold text-xs shadow-md shadow-brand-rust/20 transition-all cursor-pointer disabled:opacity-50"
                        >
                            <Upload className="w-4 h-4" />
                            {uploading ? 'Uploading...' : 'Upload Media'}
                        </button>
                    </div>
                </div>

                {/* Search & Filter Bar */}
                <form onSubmit={handleSearch} className="p-4 rounded-xl bg-white dark:bg-[#0a0e1a] border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-xs">
                    <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Filter by filename..."
                            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:border-brand-rust"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="flex rounded-lg border border-slate-200 dark:border-white/10 p-0.5 bg-slate-50 dark:bg-white/5">
                            <button
                                type="button"
                                onClick={() => {
                                    setTypeFilter('all');
                                    router.get('/admin/media', { search, type: 'all' }, { preserveState: true });
                                }}
                                className={`px-2.5 py-1 text-xs font-semibold rounded ${typeFilter === 'all' ? 'bg-white dark:bg-white/10 text-brand-rust shadow-xs' : 'text-slate-500'}`}
                            >
                                All
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setTypeFilter('image');
                                    router.get('/admin/media', { search, type: 'image' }, { preserveState: true });
                                }}
                                className={`px-2.5 py-1 text-xs font-semibold rounded ${typeFilter === 'image' ? 'bg-white dark:bg-white/10 text-brand-rust shadow-xs' : 'text-slate-500'}`}
                            >
                                Images
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setTypeFilter('document');
                                    router.get('/admin/media', { search, type: 'document' }, { preserveState: true });
                                }}
                                className={`px-2.5 py-1 text-xs font-semibold rounded ${typeFilter === 'document' ? 'bg-white dark:bg-white/10 text-brand-rust shadow-xs' : 'text-slate-500'}`}
                            >
                                Documents
                            </button>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex rounded-lg border border-slate-200 dark:border-white/10 p-0.5 bg-slate-50 dark:bg-white/5">
                            <button
                                type="button"
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-white/10 text-brand-rust shadow-xs' : 'text-slate-400'}`}
                                title="Grid View"
                            >
                                <Grid className="w-3.5 h-3.5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white dark:bg-white/10 text-brand-rust shadow-xs' : 'text-slate-400'}`}
                                title="List View"
                            >
                                <List className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </form>

                {/* Media Content */}
                {media.length === 0 ? (
                    <div className="py-20 text-center bg-white dark:bg-[#0a0e1a] rounded-2xl border border-dashed border-slate-300 dark:border-white/10">
                        <Upload className="w-10 h-10 mx-auto text-slate-400 mb-3" />
                        <h3 className="font-semibold text-slate-700 dark:text-slate-300 text-sm">No media files found</h3>
                        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                            Upload photos, publications, or documents to build your asset library.
                        </p>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="mt-4 px-4 py-2 bg-brand-rust text-white rounded-lg text-xs font-semibold hover:bg-brand-rust-dark transition"
                        >
                            Select Files to Upload
                        </button>
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {media.map((item) => (
                            <div
                                key={item.id}
                                className="group relative rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0e1a] overflow-hidden shadow-xs hover:shadow-md transition flex flex-col"
                            >
                                {/* Thumbnail */}
                                <div
                                    onClick={() => setPreviewItem(item)}
                                    className="aspect-square bg-slate-100 dark:bg-white/5 flex items-center justify-center overflow-hidden cursor-pointer relative"
                                >
                                    {item.type === 'image' ? (
                                        <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    ) : (
                                        <div className="text-center p-3">
                                            <FileText className="w-10 h-10 text-brand-rust mx-auto mb-1 opacity-70" />
                                            <span className="text-[10px] font-mono uppercase font-bold text-slate-500">{item.type}</span>
                                        </div>
                                    )}

                                    {/* Hover overlay preview button */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                        <Eye className="w-6 h-6 drop-shadow" />
                                    </div>
                                </div>

                                {/* Details & Actions */}
                                <div className="p-2.5 flex-1 flex flex-col justify-between text-[11px]">
                                    <div className="truncate font-medium text-slate-800 dark:text-slate-200" title={item.name}>
                                        {item.name}
                                    </div>
                                    <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                                        <span>{item.size_formatted}</span>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleCopyUrl(item)}
                                                className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-white/10 transition ${copiedId === item.id ? 'text-emerald-500' : 'text-slate-400 hover:text-brand-rust'}`}
                                                title={copiedId === item.id ? 'Copied URL!' : 'Copy Asset URL'}
                                            >
                                                {copiedId === item.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item)}
                                                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-red-500 transition"
                                                title="Delete File"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0e1a] overflow-hidden shadow-xs">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-white/10 font-semibold uppercase tracking-wider">
                                <tr>
                                    <th className="py-3 px-4">File Name</th>
                                    <th className="py-3 px-4">Type</th>
                                    <th className="py-3 px-4">Size</th>
                                    <th className="py-3 px-4">Uploaded</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                                {media.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition">
                                        <td className="py-3 px-4 font-medium flex items-center gap-3">
                                            {item.type === 'image' ? (
                                                <img src={item.url} alt={item.name} className="w-8 h-8 rounded object-cover border border-slate-200 dark:border-white/10" />
                                            ) : (
                                                <FileText className="w-6 h-6 text-brand-rust" />
                                            )}
                                            <span className="truncate max-w-md">{item.name}</span>
                                        </td>
                                        <td className="py-3 px-4 uppercase font-mono text-[11px] text-slate-500">{item.type}</td>
                                        <td className="py-3 px-4 text-slate-500">{item.size_formatted}</td>
                                        <td className="py-3 px-4 text-slate-500">{item.updated_at}</td>
                                        <td className="py-3 px-4 text-right">
                                            <div className="inline-flex items-center gap-1">
                                                <button
                                                    onClick={() => handleCopyUrl(item)}
                                                    className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-brand-rust transition"
                                                    title="Copy URL"
                                                >
                                                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                                                </button>
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-white transition"
                                                    title="Open Full File"
                                                >
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                </a>
                                                <button
                                                    onClick={() => handleDelete(item)}
                                                    className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-red-500 transition"
                                                    title="Delete"
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
                )}

                {/* Preview Modal */}
                {previewItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
                        <div className="bg-white dark:bg-[#0c101d] rounded-2xl max-w-2xl w-full border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col">
                            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-white/10">
                                <h3 className="font-semibold text-sm text-slate-900 dark:text-white truncate max-w-md">
                                    {previewItem.name}
                                </h3>
                                <button onClick={() => setPreviewItem(null)} className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 flex items-center justify-center bg-slate-100 dark:bg-black/50 max-h-[60vh] overflow-hidden">
                                {previewItem.type === 'image' ? (
                                    <img src={previewItem.url} alt={previewItem.name} className="max-h-[55vh] max-w-full object-contain rounded-lg shadow-md" />
                                ) : (
                                    <div className="text-center p-8">
                                        <FileText className="w-16 h-16 text-brand-rust mx-auto mb-3" />
                                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{previewItem.name}</p>
                                        <a
                                            href={previewItem.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 bg-brand-rust text-white text-xs font-semibold rounded-lg hover:bg-brand-rust-dark transition"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" /> Download / Open Document
                                        </a>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs bg-slate-50 dark:bg-white/[0.02]">
                                <div className="text-slate-500 font-mono text-[11px]">
                                    {previewItem.size_formatted} • {previewItem.mime}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleCopyUrl(previewItem)}
                                        className="px-3 py-1.5 bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white rounded-lg font-semibold flex items-center gap-1.5 hover:bg-slate-300 transition"
                                    >
                                        {copiedId === previewItem.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                                        {copiedId === previewItem.id ? 'Copied' : 'Copy URL'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
