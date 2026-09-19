import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Calendar, User, Download, Share2,
    Check, Copy, ArrowUpRight, FileText
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
    featured_image?: string;
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

    const imageSrc = resource.featured_image || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000";

    return (
        <PublicLayout>
            <Head>
                <title>{`${resource.title} — Chapter Four Malawi`}</title>
                <meta name="description" content={resource.excerpt || resource.title} />
            </Head>

            {/* ─── EDITORIAL HERO ─────────────────────────────────────────────── */}
            <article className="pt-24 lg:pt-32 pb-0 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-8">
                    {/* Breadcrumbs & Meta */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
                            <Link href="/" className="hover:text-brand-rust transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/resources" className="hover:text-brand-rust transition-colors">Resources</Link>
                            <span>/</span>
                            <span className="text-brand-rust">{resource.type || 'Publication'}</span>
                        </nav>
                        
                        <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                            {resource.published_at && (
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-brand-amber" />
                                    <span>{resource.published_at}</span>
                                </div>
                            )}
                            {resource.author?.name && (
                                <div className="flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5 text-brand-amber" />
                                    <span>{resource.author.name}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Title Area */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-12"
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8 font-serif">
                            {resource.title}
                        </h1>
                        
                        {resource.excerpt && (
                            <p className="text-xl sm:text-2xl text-slate-600 leading-relaxed font-medium border-l-4 border-brand-amber pl-6">
                                {resource.excerpt}
                            </p>
                        )}
                    </motion.div>

                    {/* Featured Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl mb-16"
                    >
                        <img 
                            src={imageSrc} 
                            alt={resource.title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>
            </article>

            {/* ─── DOCUMENT READER AREA ────────────────────────────────────── */}
            <main className="pb-24 bg-white relative">
                <div className="max-w-3xl mx-auto px-4 sm:px-8">
                    {/* Share Action */}
                    <div className="flex justify-end mb-8">
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-sm border border-slate-200"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
                            <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
                        </button>
                    </div>

                    {/* Document Body */}
                    <div className="prose prose-lg sm:prose-xl prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-headings:font-serif prose-p:leading-relaxed prose-a:text-brand-rust hover:prose-a:text-brand-rust-dark prose-blockquote:border-brand-amber prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-slate-700">
                        {resource.body ? (
                            <div dangerouslySetInnerHTML={{ __html: resource.body }} />
                        ) : (
                            <div className="space-y-6 text-slate-800 leading-loose">
                                <p className="text-xl">
                                    <span className="float-left text-7xl font-black text-slate-300 mr-4 mt-2 leading-none font-serif">U</span>nder Chapter IV of the Republic of Malawi Constitution, fundamental human rights and freedoms are not mere statutory privileges—they are supreme constitutional mandates that bind the legislature, executive, judiciary, and all organs of the state.
                                </p>
                                <p>
                                    Chapter Four’s legal and research units systematically monitor the operationalization of these rights across subordinate courts, detention facilities, and local administrative authorities. Our empirical findings inform public interest strategic litigation, legislative reform memorandums, and ongoing community paralegal support.
                                </p>
                                <h2>Key Findings & Legal Analysis</h2>
                                <p>
                                    Through grassroots clinic documentation and court observation logs, our team identifies persistent institutional barriers, including excessive pre-trial detention, inadequate access to pro-bono counsel in rural magistrate benches, and arbitrary restrictions on the freedom of assembly and association.
                                </p>
                                <blockquote>
                                    "The true measure of our constitutional democracy lies not in the words written on paper, but in how effectively those rights are realized by the most marginalized citizens."
                                </blockquote>
                                <h3>Actionable Recommendations</h3>
                                <ul>
                                    <li>Strict adherence by law enforcement to the 48-hour constitutional presentation rule following arrest.</li>
                                    <li>Broadening community paralegal formal recognition to facilitate immediate bail applications.</li>
                                    <li>Continuous legal literacy campaigns targeting rural traditional jurisdictions.</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* PDF Download Callout if Available */}
                    {resource.pdf_path && (
                        <div className="mt-16 bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-amber/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-white text-brand-rust flex items-center justify-center mx-auto mb-6 shadow-md shadow-slate-200/50">
                                    <FileText className="w-8 h-8" />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 mb-3">Download Full Report</h2>
                                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                                    Get the complete text, including judicial citations, survey appendices, and detailed methodology.
                                </p>
                                <a
                                    href={resource.pdf_path}
                                    download
                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-rust hover:bg-brand-rust-dark text-white text-sm font-bold uppercase tracking-wider rounded-full shadow-lg shadow-brand-rust/30 hover:-translate-y-1 transition-all duration-300"
                                >
                                    <span>Download PDF</span>
                                    <Download className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Back Link */}
                    <div className="mt-16 pt-8 border-t border-slate-200">
                        <Link
                            href="/resources"
                            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-rust uppercase tracking-wider transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Catalogue</span>
                        </Link>
                    </div>
                </div>
            </main>

            {/* ─── RELATED RESOURCES ─────────────────────────────────── */}
            {relatedResources && relatedResources.length > 0 && (
                <section className="py-24 bg-slate-50 border-t border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-8">
                        <div className="mb-12 text-center sm:text-left">
                            <span className="text-sm font-bold uppercase tracking-widest text-brand-rust mb-2 block">
                                Discover More
                            </span>
                            <h2 className="text-3xl font-black text-slate-900">Related Publications</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedResources.map((item, idx) => (
                                <motion.div
                                    key={item.slug || idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 flex flex-col h-full"
                                >
                                    <div className="p-8 flex flex-col flex-grow relative">
                                        <span className="inline-block px-3 py-1 bg-slate-50 text-brand-rust rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 self-start">
                                            {item.type || 'Publication'}
                                        </span>
                                        
                                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-rust transition-colors leading-snug mb-4">
                                            <Link href={`/resources/${item.slug}`}>
                                                {item.title}
                                            </Link>
                                        </h3>
                                        
                                        <div className="mt-auto pt-4 flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            <Calendar className="w-3.5 h-3.5 mr-2" />
                                            <span>{item.published_at || 'Recent'}</span>
                                        </div>
                                        
                                        <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-rust group-hover:text-white transition-colors">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
