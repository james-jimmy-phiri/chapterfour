import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Calendar, User, Download, Share2,
    Check, FileText, ChevronRight
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

const formatDate = (dateString?: string) => {
    if (!dateString) return 'Recent';
    try {
        const d = new Date(dateString);
        if (isNaN(d.getTime())) return dateString;
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    } catch {
        return dateString;
    }
};

const PLACEHOLDER_IMAGE = "/images/hero-bg.jpg";

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function ResourceDetail({ resource, relatedResources = [] }: ResourceDetailProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const imageSrc = resource.featured_image || PLACEHOLDER_IMAGE;

    return (
        <PublicLayout>
            <Head>
                <title>{`${resource.title} — Chapter Four Malawi`}</title>
                <meta name="description" content={resource.excerpt || resource.title} />
            </Head>

            {/* ─── EDITORIAL HEADER ─────────────────────────────────────────────── */}
            <article className="pt-28 lg:pt-36 pb-12 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-8">
                    
                    {/* Breadcrumbs */}
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-8">
                        <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/resources" className="hover:text-slate-900 transition-colors">Resources</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-slate-900">{resource.type || 'Publication'}</span>
                    </nav>

                    {/* Title Area */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="mb-10"
                    >
                        <div className="inline-block bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider mb-5">
                            {resource.type || 'Publication'}
                        </div>
                        
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                            {resource.title}
                        </h1>
                        
                        {resource.excerpt && (
                            <p className="text-lg sm:text-xl text-slate-500 leading-relaxed font-medium max-w-4xl border-l-[3px] border-slate-300 pl-5">
                                {resource.excerpt}
                            </p>
                        )}
                    </motion.div>

                    {/* Meta & Primary Action Bar */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-y border-slate-100 mb-12"
                    >
                        <div className="flex flex-wrap items-center gap-6 text-[13px] font-semibold text-slate-600">
                            {resource.published_at && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    <span>{formatDate(resource.published_at)}</span>
                                </div>
                            )}
                            {resource.author?.name && (
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-slate-400" />
                                    <span>{resource.author.name}</span>
                                </div>
                            )}
                        </div>

                        {/* Top Download Button */}
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="flex items-center justify-center w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors border border-slate-200"
                                title="Share Link"
                            >
                                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                            </button>
                            
                            {resource.pdf_path && (
                                <a
                                    href={resource.pdf_path}
                                    download
                                    className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Download PDF</span>
                                </a>
                            )}
                        </div>
                    </motion.div>

                    {/* Featured Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden shadow-sm border border-slate-200"
                    >
                        <img 
                            src={imageSrc} 
                            alt={resource.title}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
                        />
                    </motion.div>
                </div>
            </article>

            {/* ─── DOCUMENT READER AREA ────────────────────────────────────── */}
            <main className="pb-24 bg-white relative">
                <div className="max-w-3xl mx-auto px-4 sm:px-8">
                    
                    {/* Document Body */}
                    <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-brand-rust hover:prose-a:text-brand-rust-dark prose-blockquote:border-slate-300 prose-blockquote:bg-slate-50 prose-blockquote:py-1 prose-blockquote:px-5 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-slate-700">
                        {resource.body ? (
                            <div dangerouslySetInnerHTML={{ __html: resource.body }} />
                        ) : (
                            <div className="space-y-6 text-slate-600 leading-relaxed">
                                <p className="text-lg font-medium text-slate-800">
                                    Under Chapter IV of the Republic of Malawi Constitution, fundamental human rights and freedoms are not mere statutory privileges—they are supreme constitutional mandates that bind the legislature, executive, judiciary, and all organs of the state.
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

                    {/* Bottom PDF Download Banner */}
                    {resource.pdf_path && (
                        <div className="mt-16 bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center gap-6 justify-between">
                            <div className="flex items-center gap-5 w-full sm:w-auto">
                                <div className="w-14 h-14 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                                    <FileText className="w-7 h-7 text-slate-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">Download Full Document</h3>
                                    <p className="text-sm text-slate-500 mt-1 max-w-sm">
                                        Access the complete text, including full citations, appendices, and detailed methodology.
                                    </p>
                                </div>
                            </div>
                            <a
                                href={resource.pdf_path}
                                download
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors shrink-0"
                            >
                                <Download className="w-4 h-4" />
                                <span>Save PDF</span>
                            </a>
                        </div>
                    )}

                    {/* Back Link */}
                    <div className="mt-16 pt-8 border-t border-slate-200">
                        <Link
                            href="/resources"
                            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 uppercase tracking-wider transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                            <span>Return to Catalogue</span>
                        </Link>
                    </div>
                </div>
            </main>

            {/* ─── RELATED RESOURCES ─────────────────────────────────── */}
            {relatedResources && relatedResources.length > 0 && (
                <section className="py-16 bg-slate-50 border-t border-slate-200">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-900">Related Publications</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {relatedResources.map((item, idx) => (
                                <motion.article
                                    key={item.slug || idx}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    className="group relative bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full"
                                >
                                    <Link href={`/resources/${item.slug}`} className="relative h-40 block overflow-hidden shrink-0 bg-slate-100 border-b border-slate-100">
                                        <img
                                            src={item.featured_image || PLACEHOLDER_IMAGE}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
                                        />
                                    </Link>

                                    <div className="p-4 flex flex-col flex-grow">
                                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 mb-2 tracking-wider">
                                            <Calendar className="w-3 h-3" />
                                            <span>{formatDate(item.published_at)}</span>
                                        </div>

                                        <h3 className="text-[14px] font-bold text-slate-900 mb-1.5 group-hover:text-slate-600 transition-colors leading-snug line-clamp-2">
                                            <Link href={`/resources/${item.slug}`} className="focus:outline-none">
                                                <span className="absolute inset-0" aria-hidden="true" />
                                                {item.title}
                                            </Link>
                                        </h3>

                                        <p className="text-[13px] text-slate-500 leading-relaxed mb-4 line-clamp-2 flex-grow">
                                            {item.excerpt || "Click to view more details about this publication."}
                                        </p>

                                        <div className="mt-auto pt-3 border-t border-slate-100">
                                            <span className="inline-block bg-indigo-50/50 text-indigo-700 px-2 py-1 rounded text-[10px] font-semibold tracking-wide">
                                                {item.type || 'Publication'}
                                            </span>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}