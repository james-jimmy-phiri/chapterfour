import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { FileText, Calendar, User, ArrowLeft, Share2, Shield } from 'lucide-react';

interface PageProps {
    page: {
        id: number;
        title: string;
        slug: string;
        template: string;
        excerpt?: string;
        body?: string;
        featured_image?: string;
        author?: { name: string };
        published_at?: string;
    };
}

export default function PageDetail({ page }: PageProps) {
    const formattedDate = page.published_at
        ? new Date(page.published_at).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
          })
        : null;

    return (
        <PublicLayout>
            <Head>
                <title>{`${page.title} | Chapter Four Malawi`}</title>
                <meta
                    head-key="description"
                    name="description"
                    content={page.excerpt || page.title}
                />
                <meta
                    head-key="robots"
                    name="robots"
                    content="index, follow"
                />
            </Head>

            {/* Page Header / Hero */}
            <div className="relative bg-gradient-to-br from-[#1a0e08] via-[#2d150b] to-[#120904] text-white pt-36 pb-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d95b38_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-amber hover:text-white transition mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>

                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-brand-amber border border-white/15 text-xs font-bold uppercase tracking-wider mb-4">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Chapter Four Document</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight leading-tight mb-6">
                        {page.title}
                    </h1>

                    {page.excerpt && (
                        <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl mb-6">
                            {page.excerpt}
                        </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 border-t border-white/10 pt-4">
                        {formattedDate && (
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-brand-amber" />
                                <span>Published {formattedDate}</span>
                            </div>
                        )}
                        {page.author?.name && (
                            <div className="flex items-center gap-1.5">
                                <User className="w-4 h-4 text-brand-amber" />
                                <span>{page.author.name}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Body */}
            <article className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    {page.featured_image && (
                        <div className="mb-10 rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                            <img
                                src={page.featured_image}
                                alt={page.title}
                                className="w-full h-auto max-h-[500px] object-cover"
                            />
                        </div>
                    )}

                    {page.body ? (
                        <div className="prose prose-slate lg:prose-lg max-w-none prose-headings:font-serif prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed whitespace-pre-line">
                            {page.body}
                        </div>
                    ) : (
                        <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-center">
                            This document is currently being prepared. Check back shortly.
                        </div>
                    )}

                    {/* Footer Share & Legal Box */}
                    <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Shield className="w-4 h-4 text-brand-rust" />
                            <span>Chapter Four Malawi • Promoting and Defending Constitutionalism</span>
                        </div>
                        <button
                            onClick={() => {
                                if (navigator.clipboard) {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('Page URL copied to clipboard!');
                                }
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition"
                        >
                            <Share2 className="w-4 h-4" /> Share Document
                        </button>
                    </div>
                </div>
            </article>
        </PublicLayout>
    );
}
