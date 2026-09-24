import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
    ArrowLeft, MapPin, Users, Calendar, CheckCircle2,
    Briefcase, ArrowRight, Shield, Target, ArrowUpRight,
    Download, Images, X, ChevronLeft, ChevronRight,
    ExternalLink, FileText, Activity
} from 'lucide-react';

interface ProjectItem {
    id?: number;
    title: string;
    slug: string;
    summary?: string;
    description?: string;
    status?: string;
    locations?: string[];
    beneficiaries?: string[];
    start_date?: string;
    end_date?: string;
    budget?: string;
    duration?: string;
    featured_image?: string;
    gallery?: string[];
    outputs?: string[];
}

interface ProjectDetailProps {
    project: ProjectItem;
}

// Gallery images from project data or default fallback
const getGalleryImages = (project: ProjectItem) => {
    const list: { src: string; caption: string }[] = [];

    if (project.gallery && Array.isArray(project.gallery) && project.gallery.length > 0) {
        if (project.featured_image && !project.gallery.includes(project.featured_image)) {
            list.push({
                src: project.featured_image,
                caption: `${project.title} — Featured Image`,
            });
        }
        project.gallery.forEach((src, idx) => {
            if (src) {
                list.push({
                    src,
                    caption: `${project.title} — Photo ${idx + 1}`,
                });
            }
        });
    }

    if (list.length === 0) {
        return [
            { src: project.featured_image || '/images/animate-img-1.jpg', caption: `${project.title} — Field Operations` },
            { src: '/images/paliament.jpg', caption: 'Parliament of Malawi — Policy Advocacy' },
            { src: '/images/Chief_Justice.jpg', caption: 'Judiciary Engagement — Court Monitoring' },
            { src: '/images/constitutional_book.jpg', caption: 'Constitutional Rights Materials' },
            { src: '/images/animate-img-2.jpg', caption: 'Community Outreach Sessions' },
            { src: '/images/Parliament_Building_of_Malawioutside.jpg', caption: 'Legislative Advocacy — National Assembly' },
        ];
    }

    return list;
};

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

// Lightbox Component
function Lightbox({
    images,
    startIndex,
    onClose,
}: {
    images: { src: string; caption: string }[];
    startIndex: number;
    onClose: () => void;
}) {
    const [current, setCurrent] = useState(startIndex);

    const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
    const next = () => setCurrent((c) => (c + 1) % images.length);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                prev();
            } else if (e.key === 'ArrowRight') {
                next();
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [images.length]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-slate-950/95 flex items-center justify-center select-none"
                onClick={onClose}
            >
                {/* Close button */}
                <button
                    className="absolute top-6 right-6 z-10 p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all focus:outline-none"
                    onClick={onClose}
                    title="Close (Esc)"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Counter */}
                <div className="absolute top-7 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/80 text-xs sm:text-sm font-semibold tracking-wider">
                    {current + 1} / {images.length}
                </div>

                {/* Prev button */}
                <button
                    className="absolute left-3 sm:left-6 z-10 p-2.5 sm:p-3 rounded-full sm:rounded-lg bg-black/40 sm:bg-white/10 hover:bg-black/60 sm:hover:bg-white/20 text-white backdrop-blur-sm transition-all focus:outline-none"
                    onClick={(e) => { e.stopPropagation(); prev(); }}
                    title="Previous (Left Arrow)"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Image */}
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="w-full max-w-5xl mx-auto px-4 sm:px-16 flex flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={images[current].src}
                        alt={images[current].caption}
                        className="w-full max-h-[72vh] object-contain shadow-2xl rounded-md"
                    />
                    <p className="text-white/85 text-xs sm:text-sm md:text-base text-center mt-4 sm:mt-5 font-medium px-4">
                        {images[current].caption}
                    </p>
                </motion.div>

                {/* Next button */}
                <button
                    className="absolute right-3 sm:right-6 z-10 p-2.5 sm:p-3 rounded-full sm:rounded-lg bg-black/40 sm:bg-white/10 hover:bg-black/60 sm:hover:bg-white/20 text-white backdrop-blur-sm transition-all focus:outline-none"
                    onClick={(e) => { e.stopPropagation(); next(); }}
                    title="Next (Right Arrow)"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* Thumbnail strip */}
                <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-4 max-w-full justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                            className={`w-14 sm:w-16 h-10 sm:h-12 rounded overflow-hidden transition-all duration-200 shrink-0 ${i === current ? 'ring-2 ring-white opacity-100 scale-105' : 'opacity-40 hover:opacity-100'}`}
                            title={`Jump to photo ${i + 1}`}
                        >
                            <img src={img.src} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
    const imageSrc = project.featured_image || '/images/animate-img-1.jpg';
    const galleryImages = getGalleryImages(project);
    const gridImages = galleryImages.slice(0, 6);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const calculateDuration = (start?: string, end?: string) => {
        if (!start || !end) return project.duration || 'Ongoing';
        const startD = new Date(start);
        const endD = new Date(end);
        if (isNaN(startD.getTime()) || isNaN(endD.getTime())) return `${start} – ${end}`;
        const diffMonths = (endD.getFullYear() - startD.getFullYear()) * 12 + (endD.getMonth() - startD.getMonth());
        return `${diffMonths > 0 ? diffMonths : 1} Months (${start} – ${end})`;
    };


    return (
        <PublicLayout>
            <Head>
                <title>{`${project.title} — Chapter Four Projects`}</title>
                <meta name="description" content={project.summary || project.title} />
            </Head>

            {/* ─── HERO BANNER ─────────────────────────────────────────────── */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src={imageSrc}
                        alt="Project Background"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/60" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                    {/* Breadcrumbs */}
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-semibold uppercase tracking-wider">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
                        <span>/</span>
                        <span className="text-white truncate max-w-xs">{project.title}</span>
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight tracking-tight">
                            {project.title}
                        </h1>

                        {project.summary && (
                            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl font-medium border-l-[3px] border-slate-500 pl-6">
                                {project.summary}
                            </p>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* ─── MAIN CONTENT ─────────────────────────────────────────────── */}
            <main className="py-16 bg-slate-50 relative selection:bg-slate-200 selection:text-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    
                    <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
                    >

                        {/* ── LEFT / MAIN COLUMN ── */}
                        <div className="lg:col-span-8 space-y-8">

                            {/* Project Overview */}
                            <motion.div variants={fadeInUp} className="bg-white rounded-xl p-8 sm:p-10 shadow-sm border border-slate-200">
                                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                                    <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100 shrink-0">
                                        <Target className="w-6 h-6" strokeWidth={2} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Project Overview</h2>
                                        <span className="text-sm font-medium text-slate-500 mt-0.5 block">Context & Strategic Objectives</span>
                                    </div>
                                </div>

                                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                                    {project.description ? (
                                        project.description.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
                                            <p key={index} className="mb-4">{paragraph}</p>
                                        ))
                                    ) : (
                                        <div className="space-y-6">
                                            <p className="text-slate-800 font-medium text-lg">
                                                This intervention directly addresses structural human rights vulnerabilities through grassroots engagement, mobile court monitoring, and capacity strengthening for local paralegals and rights defenders.
                                            </p>
                                            <p>
                                                By bringing legal literacy and procedural safeguards directly to local communities, Chapter Four eliminates geographical and economic barriers that prevent citizens from securing lawful bail, fair hearing, and prompt remedy. Our approach is multi-faceted, involving both direct legal representation and systemic advocacy to ensure lasting impact.
                                            </p>
                                            <p>
                                                The project operates through a network of trained community paralegals, mobile legal clinics, and strategic partnerships with the Legal Aid Bureau, magistrates, and civil society organizations across the target districts.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Key Outcomes Block */}
                            <motion.div variants={fadeInUp} className="bg-white rounded-xl p-8 sm:p-10 shadow-sm border border-slate-200">
                                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                                    <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100 shrink-0">
                                        <Activity className="w-6 h-6" strokeWidth={2} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Key Outcomes</h2>
                                        <span className="text-sm font-medium text-slate-500 mt-0.5 block">Expected Impact & Deliverables</span>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                    {(project.outputs && project.outputs.length > 0 ? project.outputs : [
                                        'Direct pro-bono defense and bail assistance in magistrate courts across target districts.',
                                        'Continuous monitoring of police custody facilities and compliance with the 48-hour rule.',
                                        'Training community paralegals and youth rights champions on fundamental Chapter IV rights.',
                                        'Compilation of empirical detention and human rights abuse case records for institutional advocacy.',
                                    ]).map((res, i) => (
                                        <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                                            <CheckCircle2 className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
                                            <p className="text-slate-700 font-medium text-sm leading-relaxed">{res}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Project Image Focus */}
                            <motion.div variants={fadeInUp} className="rounded-xl overflow-hidden shadow-sm border border-slate-200 relative group">
                                <img
                                    src={imageSrc}
                                    alt={project.title}
                                    className="w-full h-[350px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </motion.div>

                            {/* ── PHOTO GALLERY ── */}
                            <motion.div variants={fadeInUp} className="bg-white rounded-xl p-8 sm:p-10 shadow-sm border border-slate-200">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100 shrink-0">
                                            <Images className="w-6 h-6" strokeWidth={2} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Project Gallery</h2>
                                            <span className="text-sm font-medium text-slate-500 mt-0.5 block">Visual Documentation</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest bg-slate-100 border border-slate-200 px-3 py-1.5 rounded w-fit">
                                            {galleryImages.length} Photos
                                        </span>
                                        {galleryImages.length > 6 && (
                                            <button
                                                type="button"
                                                onClick={() => setLightboxIndex(0)}
                                                className="text-xs font-semibold text-brand-rust hover:text-brand-rust/80 bg-brand-rust/10 border border-brand-rust/20 px-3 py-1.5 rounded transition hover:bg-brand-rust/15"
                                            >
                                                Slide All ({galleryImages.length})
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {gridImages.map((img, i) => {
                                        const isSixthWithMore = i === 5 && galleryImages.length > 6;
                                        const extraCount = galleryImages.length - 6;

                                        return (
                                            <button
                                                key={i}
                                                type="button"
                                                className="relative rounded-lg overflow-hidden cursor-pointer group/img aspect-[4/3] bg-slate-100 text-left focus:outline-none focus:ring-2 focus:ring-brand-rust"
                                                onClick={() => setLightboxIndex(i)}
                                            >
                                                <img
                                                    src={img.src}
                                                    alt={img.caption}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                                                />

                                                {isSixthWithMore ? (
                                                    <div className="absolute inset-0 bg-slate-950/70 group-hover/img:bg-slate-950/80 backdrop-blur-[2px] transition-colors flex flex-col items-center justify-center text-white p-2">
                                                        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">+{extraCount}</span>
                                                        <span className="text-xs sm:text-sm font-semibold text-white/95 mt-0.5">More Photos</span>
                                                        <span className="text-[10px] text-white/70 mt-1 uppercase tracking-wider font-medium">Click to slide all</span>
                                                    </div>
                                                ) : (
                                                    <div className="absolute inset-0 bg-slate-900/0 group-hover/img:bg-slate-900/25 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover/img:opacity-100">
                                                        <ExternalLink className="w-6 h-6 text-white drop-shadow-md" />
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>

                            {/* ── DOWNLOAD REPORT HORIZONTAL BANNER ── */}
                            <motion.div variants={fadeInUp} className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center gap-6 justify-between">
                                <div className="flex items-center gap-5 w-full sm:w-auto">
                                    <div className="w-14 h-14 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                                        <FileText className="w-7 h-7 text-slate-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">Comprehensive Project Report</h3>
                                        <p className="text-sm text-slate-500 mt-1 max-w-md">
                                            Download the full document containing detailed methodologies, case studies, and field performance metrics.
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors shrink-0"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Download PDF</span>
                                </a>
                            </motion.div>

                        </div>

                        {/* ── RIGHT SIDEBAR ── */}
                        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
                            
                            {/* Project Parameters Card */}
                            <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                                <h3 className="text-lg font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">Project Metadata</h3>
                                
                                <div className="space-y-6">
                                    {/* Duration */}
                                    <div className="flex flex-col gap-1.5">
                                        <span className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            <Calendar className="w-4 h-4" /> Implementation Timeline
                                        </span>
                                        <p className="text-sm font-semibold text-slate-900">
                                            {calculateDuration(project.start_date, project.end_date)}
                                        </p>
                                    </div>

                                    {/* Locations */}
                                    {project.locations && project.locations.length > 0 && (
                                        <div className="flex flex-col gap-2 pt-2 border-t border-slate-50">
                                            <span className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                <MapPin className="w-4 h-4" /> Geographic Focus
                                            </span>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {(Array.isArray(project.locations) ? project.locations : [project.locations]).map((loc, i) => (
                                                    <span key={i} className="bg-slate-50 border border-slate-200 text-slate-700 text-xs px-2.5 py-1.5 rounded font-medium">
                                                        {loc}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Beneficiaries */}
                                    {project.beneficiaries && project.beneficiaries.length > 0 && (
                                        <div className="flex flex-col gap-2 pt-2 border-t border-slate-50">
                                            <span className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                <Users className="w-4 h-4" /> Primary Beneficiaries
                                            </span>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {(Array.isArray(project.beneficiaries) ? project.beneficiaries : [project.beneficiaries]).map((ben, i) => (
                                                    <span key={i} className="bg-slate-50 border border-slate-200 text-slate-700 text-xs px-2.5 py-1.5 rounded font-medium">
                                                        {ben}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Professional Support CTA Card */}
                            <motion.div variants={fadeInUp} className="bg-slate-900 rounded-xl p-8 text-white shadow-md relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-3">Support This Initiative</h3>
                                    <p className="text-slate-300 leading-relaxed text-sm mb-6">
                                        Partner with Chapter Four to expand the reach of our legal defense clinics and community paralegal networks.
                                    </p>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center justify-center gap-2 w-full bg-white text-slate-900 hover:bg-slate-100 text-sm font-bold px-6 py-3.5 rounded-lg transition-colors group"
                                    >
                                        <span>Get Involved</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Related Projects */}
                            <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Related Work</h3>
                                <div className="space-y-3">
                                    {[
                                        { title: 'Youth Constitutional Literacy & Chapter IV Assemblies', slug: 'youth-constitutional-literacy' },
                                        { title: 'District Social Accountability Monitoring', slug: 'district-social-accountability' },
                                    ].map((p) => (
                                        <Link
                                            key={p.slug}
                                            href={`/projects/${p.slug}`}
                                            className="group flex flex-col gap-1 p-3 -mx-3 rounded-lg hover:bg-slate-50 transition-colors"
                                        >
                                            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 leading-snug">{p.title}</span>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>

                        </div>
                    </motion.div>

                    {/* Back link */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-16 pt-8 border-t border-slate-200"
                    >
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 uppercase tracking-wider transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                            <span>Return to All Projects</span>
                        </Link>
                    </motion.div>
                </div>
            </main>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <Lightbox
                    images={galleryImages}
                    startIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </PublicLayout>
    );
}