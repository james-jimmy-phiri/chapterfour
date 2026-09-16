import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import {
    ArrowLeft, Calendar, User, Download, Share2,
    BookOpen, Check, Copy, FileText, ArrowRight, ChevronRight
} from 'lucide-react';

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
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <PublicLayout>
            <Head>
                <title>{`${resource.title} — Chapter Four Malawi`}</title>
                <meta name="description" content={resource.excerpt || resource.title} />
            </Head>

            {/* ─── HERO BANNER ─────────────────────────────────────────────── */}
            <section className="hero-pattern text-white py-14 px-4 sm:px-8 border-b border-white/10">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300 mb-4 font-semibold">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span className="text-slate-500">›</span>
                        <Link href="/resources" className="hover:text-brand-amber transition">Resources</Link>
                        <span className="text-slate-500">›</span>
                        <span className="text-brand-amber">{resource.type || 'Document'}</span>
                    </div>

                    <div className="space-y-4">
                        <span className="inline-block bg-brand-rust text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                            {resource.type || 'Publication'}
                        </span>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                            {resource.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 border-t border-white/10">
                            {resource.published_at && (
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-brand-amber" />
                                    <span>Published {resource.published_at}</span>
                                </div>
                            )}
                            {resource.author?.name && (
                                <div className="flex items-center gap-1.5">
                                    <User className="w-4 h-4 text-brand-amber" />
                                    <span>{resource.author.name}</span>
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-brand-amber hover:text-white transition ml-auto"
                            >
                                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                <span>{copied ? 'Link Copied!' : 'Share Document'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── DOCUMENT READER AREA ────────────────────────────────────── */}
            <main className="py-14 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-8">
                    {/* Excerpt Summary Box */}
                    {resource.excerpt && (
                        <div className="bg-[#FAF8F5] border-l-4 border-brand-rust rounded-r-lg p-6 mb-10 text-slate-700 text-base leading-relaxed font-medium">
                            {resource.excerpt}
                        </div>
                    )}

                    {/* PDF Download Callout if Available */}
                    {resource.pdf_path && (
                        <div className="bg-brand-rust-light border border-brand-rust/30 rounded-xl p-6 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-brand-rust text-white flex items-center justify-center shrink-0 shadow-sm">
                                    <Download className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-slate-900">Download Full PDF Report</h2>
                                    <p className="text-xs text-slate-600">Complete text, judicial citations, and survey appendices.</p>
                                </div>
                            </div>
                            <a
                                href={resource.pdf_path}
                                download
                                className="btn-primary text-xs py-2.5 px-5 shrink-0"
                            >
                                <span>Download PDF</span>
                                <Download className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    )}

                    {/* Document Body */}
                    <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:leading-relaxed prose-a:text-brand-rust">
                        {resource.body ? (
                            <div dangerouslySetInnerHTML={{ __html: resource.body }} />
                        ) : (
                            <div className="space-y-5 text-slate-700 leading-relaxed text-base">
                                <p>
                                    Under Chapter IV of the Republic of Malawi Constitution, fundamental human rights and freedoms are not mere statutory privileges—they are supreme constitutional mandates that bind the legislature, executive, judiciary, and all organs of the state.
                                </p>
                                <p>
                                    Chapter Four’s legal and research units systematically monitor the operationalization of these rights across subordinate courts, detention facilities, and local administrative authorities. Our empirical findings inform public interest strategic litigation, legislative reform memorandums, and ongoing community paralegal support.
                                </p>
                                <h2 className="text-xl font-bold text-slate-900 pt-4">Key Findings & Legal Analysis</h2>
                                <p>
                                    Through grassroots clinic documentation and court observation logs, our team identifies persistent institutional barriers, including excessive pre-trial detention, inadequate access to pro-bono counsel in rural magistrate benches, and arbitrary restrictions on the freedom of assembly and association.
                                </p>
                                <h3 className="text-lg font-bold text-slate-900 pt-2">Actionable Recommendations</h3>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                                    <li>Strict adherence by law enforcement to the 48-hour constitutional presentation rule following arrest.</li>
                                    <li>Broadening community paralegal formal recognition to facilitate immediate bail applications.</li>
                                    <li>Continuous legal literacy campaigns targeting rural traditional jurisdictions.</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Back Link */}
                    <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between">
                        <Link
                            href="/resources"
                            className="inline-flex items-center gap-2 text-xs font-bold text-brand-rust hover:text-brand-brick uppercase tracking-wider"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Catalogue</span>
                        </Link>
                    </div>

                    {/* ─── RELATED RESOURCES ─────────────────────────────────── */}
                    {relatedResources && relatedResources.length > 0 && (
                        <div className="mt-16 pt-12 border-t border-slate-200">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Related Publications</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {relatedResources.map((item, idx) => (
                                    <Link
                                        key={item.slug || idx}
                                        href={`/resources/${item.slug}`}
                                        className="p-4 rounded-lg border border-slate-200 hover:border-brand-rust/40 hover:shadow-xs transition block group"
                                    >
                                        <span className="text-[10px] font-bold text-brand-rust uppercase tracking-wider block mb-1">
                                            {item.type || 'Publication'}
                                        </span>
                                        <h3 className="font-bold text-xs text-slate-900 group-hover:text-brand-rust transition leading-snug line-clamp-2">
                                            {item.title}
                                        </h3>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </PublicLayout>
    );
}
