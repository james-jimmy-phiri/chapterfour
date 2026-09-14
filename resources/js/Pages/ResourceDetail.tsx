import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Calendar, User, Download, Share2,
    BookOpen, Check, Copy, FileText, ArrowRight, Tag
} from 'lucide-react';
import { useState } from 'react';

interface ResourceItem {
    id?: number;
    title: string;
    slug: string;
    type?: string;
    excerpt?: string;
    body?: string;
    published_at?: string;
    pdf_path?: string | null;
    author?: {
        name?: string;
        role?: string;
    };
}

interface ResourceDetailProps {
    resource: ResourceItem;
    relatedResources?: ResourceItem[];
}

export default function ResourceDetail({ resource, relatedResources = [] }: ResourceDetailProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <PublicLayout>
            <Head title={`${resource.title} - Chapter Four`} />

            {/* Back navigation bar */}
            <div className="pt-28 pb-4 bg-navy-950 border-b border-navy-800/60">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/resources"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to all resources
                    </Link>
                </div>
            </div>

            {/* Header / Meta */}
            <article className="py-12 md:py-20 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                {resource.type || 'Publication'}
                            </span>
                            {resource.published_at && (
                                <span className="text-xs text-navy-400 flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {resource.published_at}
                                </span>
                            )}
                            <span className="text-xs text-navy-400 flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5" /> 5 min read
                            </span>
                        </div>

                        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight">
                            {resource.title}
                        </h1>

                        {resource.excerpt && (
                            <p className="text-lg sm:text-xl text-navy-200 font-light leading-relaxed border-l-2 border-amber-500/40 pl-4 py-1">
                                {resource.excerpt}
                            </p>
                        )}

                        {/* Author & Action Bar */}
                        <div className="pt-6 border-t border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500/20 to-red-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-serif">
                                    CF
                                </div>
                                <div>
                                    <div className="text-sm text-white font-medium">
                                        {resource.author?.name || 'Chapter Four Team'}
                                    </div>
                                    <div className="text-xs text-navy-400">Human Rights & Legal Advocacy Unit</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleCopy}
                                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-navy-900 hover:bg-navy-800 text-navy-200 text-xs border border-navy-700 transition-colors"
                                >
                                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                    {copied ? 'Copied' : 'Share'}
                                </button>
                                <a
                                    href="#download"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        alert('Official document PDF download is being prepared for release.');
                                    }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-navy-950 font-semibold text-xs transition-colors shadow-md shadow-amber-500/20"
                                >
                                    <Download className="w-3.5 h-3.5" /> Download PDF
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {/* Body Content */}
            <section className="py-16 bg-navy-950 border-t border-navy-800/60">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-navy-100 font-light text-base sm:text-lg leading-relaxed space-y-6">
                        {resource.body ? (
                            <div
                                className="space-y-6 [&>p]:leading-relaxed [&>p]:mb-4"
                                dangerouslySetInnerHTML={{ __html: resource.body }}
                            />
                        ) : (
                            <>
                                <p>
                                    Under the 1994 Constitution of the Republic of Malawi, constitutionalism represents the principle that government authority is derived from and limited by a body of fundamental law. Chapter IV domesticates the core protections of the International Bill of Rights, rendering arbitrary state interference unlawful.
                                </p>
                                <p>
                                    In practice, however, vulnerable rights-holders—including youth in informal settlements, detained suspects, and rural women—regularly experience structural barriers in claiming these guarantees. Chapter Four's monitoring across all districts highlights systemic deficiencies in bail enforcement, paralegal access, and civic literacy.
                                </p>
                                <h3 className="font-serif text-2xl text-white font-normal mt-8 mb-4">
                                    Recommendations for Duty-Bearers
                                </h3>
                                <p>
                                    To close the gap between constitutional provisions and community realities, state agencies must ensure strict compliance with Section 42 rights upon arrest, expand legal aid funding, and protect civic space against disproportionate statutory restrictions.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Related Resources */}
            {relatedResources.length > 0 && (
                <section className="py-20 bg-navy-900/40 border-t border-navy-800/60">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-serif text-2xl text-white font-normal">Related Publications</h3>
                            <Link href="/resources" className="text-xs text-amber-400 hover:text-amber-300 font-semibold uppercase tracking-wider flex items-center gap-1">
                                View all <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedResources.map((item, idx) => (
                                <Link
                                    key={idx}
                                    href={`/resources/${item.slug}`}
                                    className="p-6 rounded-xl bg-navy-950 border border-navy-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group"
                                >
                                    <div>
                                        <span className="text-[10px] uppercase font-semibold text-amber-400 tracking-wider">
                                            {item.type || 'Publication'}
                                        </span>
                                        <h4 className="font-serif text-lg text-white font-normal mt-2 group-hover:text-amber-300 transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs text-navy-300 font-light mt-2 line-clamp-3">
                                            {item.excerpt}
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-navy-800/60 text-xs text-amber-400 font-semibold flex items-center gap-1">
                                        Read Article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
