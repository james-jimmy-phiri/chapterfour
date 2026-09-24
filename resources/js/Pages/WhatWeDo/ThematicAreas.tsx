import { Head, Link } from '@inertiajs/react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, type ComponentType } from 'react';
import {
    Shield, Scale, Globe, BookOpen, FileText,
    Heart, Search, Users, ArrowRight, ChevronRight,
    ArrowUpRight, X, Layers
} from 'lucide-react';
import * as Icons from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { cn } from "@/lib/utils"; // Shadcn utility for tailwind class merging

const fallbackThematicAreas = [
    {
        number: '01',
        title: "Human Rights & Constitutionalism",
        shortTitle: "Human Rights",
        description: "Promoting knowledge and protection of rights guaranteed under the Constitution of Malawi and relevant international and regional human rights instruments. We believe that the Bill of Rights is the foundation for a just, peaceful, democratic and rights-respecting society.",
        keyPoints: [
            "Constitutional rights literacy campaigns across all districts",
            "Strategic public interest litigation on fundamental rights",
            "Community awareness through radio, print, and digital media",
            "Shadow reporting to UN treaty bodies and regional mechanisms",
        ],
        icon: Shield,
        image: "/images/paliament.jpg",
        accentColor: "bg-brand-rust",
        textAccent: "text-brand-rust",
        borderAccent: "border-brand-rust",
    },
    {
        number: '02',
        title: "Access to Justice & Legal Empowerment",
        shortTitle: "Access to Justice",
        description: "Supporting communities and vulnerable groups to understand their legal rights, access appropriate remedies and engage with justice institutions. We bridge the gap between legal protections on paper and their practical reality for every citizen.",
        keyPoints: [
            "Mobile legal aid clinics at magistrate courts across districts",
            "Paralegal training and community human rights desks",
            "Pro-bono defense and bail assistance for detained persons",
            "Referrals and linkages to formal legal aid institutions",
        ],
        icon: Scale,
        image: "/images/Chief_Justice.jpg",
        accentColor: "bg-amber-700",
        textAccent: "text-amber-700",
        borderAccent: "border-amber-600",
    },
    {
        number: '03',
        title: "Democracy & Good Governance",
        shortTitle: "Democracy",
        description: "Promoting accountable, transparent, participatory and responsive governance and strengthening citizens' meaningful participation in democratic processes. We work to ensure public institutions are answerable to the people they serve.",
        keyPoints: [
            "Civic education before, during, and after electoral cycles",
            "Local government accountability monitoring and audit facilitation",
            "Public participation in legislative and policy processes",
            "Youth and women's participation in governance and civic processes",
        ],
        icon: Globe,
        image: "/images/Parliament_Building_of_Malawioutside.jpg",
        accentColor: "bg-slate-700",
        textAccent: "text-slate-700",
        borderAccent: "border-slate-600",
    },
    {
        number: '04',
        title: "Civic & Human Rights Education",
        shortTitle: "Civic Education",
        description: "Providing communities, young people, duty bearers and other stakeholders with essential information and practical skills necessary to understand, exercise and defend their rights and responsibilities under the Constitution.",
        keyPoints: [
            "School human rights clubs and youth democracy assemblies",
            "Training of community-based human rights advocates and paralegals",
            "Community radio and digital civic education programmes",
            "Simplified legal information materials in local languages",
        ],
        icon: BookOpen,
        image: "/images/constitutional_book.jpg",
        accentColor: "bg-emerald-700",
        textAccent: "text-emerald-700",
        borderAccent: "border-emerald-600",
    },
    {
        number: '05',
        title: "Policy & Legislative Advocacy",
        shortTitle: "Policy Advocacy",
        description: "Conducting rigorous policy and legal analysis and advocating for the enactment, reform, and repeal of laws and policies to ensure they comply with constitutional and international human rights standards.",
        keyPoints: [
            "Legislative review submissions and parliamentary engagements",
            "Evidence-based policy briefs on emerging human rights challenges",
            "Multi-stakeholder dialogues with lawmakers and duty bearers",
            "Strategic partnerships with legal practitioners and academia",
        ],
        icon: FileText,
        image: "/images/animate-img-1.jpg",
        accentColor: "bg-violet-700",
        textAccent: "text-violet-700",
        borderAccent: "border-violet-600",
    },
    {
        number: '06',
        title: "Protection of Vulnerable Groups",
        shortTitle: "Vulnerable Groups",
        description: "Promoting equality and non-discrimination and addressing rights violations affecting women, children, persons with disabilities, persons with albinism, refugees, displaced persons, minorities and other marginalized communities.",
        keyPoints: [
            "GBV legal support and survivor case management and referrals",
            "Child protection campaigns and anti-child marriage initiatives",
            "Rights advocacy for persons with disabilities and albinism",
            "Refugee and displaced person legal orientation programmes",
        ],
        icon: Heart,
        image: "/images/woman.jpg",
        accentColor: "bg-rose-700",
        textAccent: "text-rose-700",
        borderAccent: "border-rose-600",
    },
    {
        number: '07',
        title: "Accountability & Human Rights Monitoring",
        shortTitle: "Accountability",
        description: "Systematically monitoring government and institutional performance, documenting human rights concerns, and promoting effective accountability mechanisms to ensure duty bearers uphold their obligations to rights holders.",
        keyPoints: [
            "Detention, police facility, and prison monitoring reports",
            "Annual Malawi human rights situation barometer reports",
            "Shadow reporting to UN treaty bodies and Universal Periodic Review",
            "Institutional accountability initiatives and public interest complaints",
        ],
        icon: Search,
        image: "/images/no_justice.jpg",
        accentColor: "bg-orange-700",
        textAccent: "text-orange-700",
        borderAccent: "border-orange-600",
    },
    {
        number: '08',
        title: "Research & Knowledge Generation",
        shortTitle: "Research",
        description: "Undertaking empirical research, baseline assessments, policy analysis, and documentation to generate credible evidence for human rights programming, strategic advocacy, and evidence-based policy reform.",
        keyPoints: [
            "Empirical research on rights violations and their structural root causes",
            "Data collection and analysis for national human rights indices",
            "Knowledge product development and active dissemination campaigns",
            "Thematic policy papers and constitutional jurisprudence analysis",
        ],
        icon: Users,
        image: "/images/animate-img-2.jpg",
        accentColor: "bg-teal-700",
        textAccent: "text-teal-700",
        borderAccent: "border-teal-600",
    }
];

const colorPalette = [
    { accentColor: "bg-brand-rust", textAccent: "text-brand-rust", borderAccent: "border-brand-rust" },
    { accentColor: "bg-amber-700", textAccent: "text-amber-700", borderAccent: "border-amber-600" },
    { accentColor: "bg-slate-700", textAccent: "text-slate-700", borderAccent: "border-slate-600" },
    { accentColor: "bg-emerald-700", textAccent: "text-emerald-700", borderAccent: "border-emerald-600" },
    { accentColor: "bg-violet-700", textAccent: "text-violet-700", borderAccent: "border-violet-600" },
    { accentColor: "bg-rose-700", textAccent: "text-rose-700", borderAccent: "border-rose-600" },
    { accentColor: "bg-orange-700", textAccent: "text-orange-700", borderAccent: "border-orange-600" },
    { accentColor: "bg-teal-700", textAccent: "text-teal-700", borderAccent: "border-teal-600" },
];

type ThematicArea = {
    number: string;
    title: string;
    description: string;
    keyPoints: string[];
    icon: string | ComponentType<{ className?: string }>;
    image: string;
    slug?: string;
    accentColor: string;
    textAccent: string;
    borderAccent: string;
};

// --- Modal Component (Replaces the inline layout for the rich cards) ---
function ThematicModal({ area, onClose }: { area: ThematicArea, onClose: () => void }) {
    const Icon = typeof area.icon === 'string' && (Icons as any)[area.icon] ? (Icons as any)[area.icon] : Icons.Shield;

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-slate-900/60 backdrop-blur-sm">
            {/* Modal backdrop click to close */}
            <div className="absolute inset-0" onClick={onClose} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl z-10"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-white/50 backdrop-blur-md rounded-full hover:bg-white text-slate-900 transition-colors shadow-sm"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col lg:flex-row h-full">
                    {/* Image Section */}
                    <div className="lg:w-[45%] relative overflow-hidden shrink-0 h-64 lg:h-auto min-h-[300px] lg:min-h-[500px]">
                        <img
                            src={area.image}
                            alt={area.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-900/40" />

                        <div className="absolute top-6 left-6 z-10">
                            <span className="bg-white/15 backdrop-blur-md text-white font-black text-2xl px-4 py-2 rounded-xl border border-white/25 leading-none">
                                {area.number}
                            </span>
                        </div>

                        <div className="absolute bottom-6 right-6 z-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center">
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-[55%] p-8 lg:p-12 flex flex-col justify-center relative bg-white">
                        <span className={`text-xs font-bold uppercase tracking-widest ${area.accentColor} text-white px-3 py-1 rounded-full inline-block mb-4 w-fit`}>
                            Pillar {area.number}
                        </span>

                        <h3 className={`text-2xl sm:text-3xl font-black text-slate-900 mb-4 leading-tight ${area.textAccent}`}>
                            {area.title}
                        </h3>

                        <p className="text-slate-500 leading-relaxed mb-6 text-sm sm:text-base">
                            {area.description}
                        </p>

                        <ul className="space-y-2.5 mb-8">
                            {area.keyPoints.map((point, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                    <ChevronRight className={`w-4 h-4 ${area.textAccent} shrink-0 mt-0.5`} />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href={`/what-we-do/${area.slug || ''}`}
                            className={`inline-flex items-center gap-2 text-sm font-bold ${area.textAccent} hover:underline transition-colors group/link w-fit`}
                        >
                            <span>Learn More About This Pillar</span>
                            <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
export default function ThematicAreas({ thematicAreas: dbThematicAreas = [] }: { thematicAreas?: any[] }) {
    const thematicAreas = dbThematicAreas.length > 0 ? dbThematicAreas.map((area, index) => {
        const palette = colorPalette[index % colorPalette.length];
        return {
            number: String(index + 1).padStart(2, '0'),
            title: area.title,
            shortTitle: area.title.split(' ')[0],
            description: area.short_description || area.full_description || '',
            keyPoints: Array.isArray(area.interventions) ? area.interventions : [],
            icon: area.icon || 'Shield',
            image: area.cover_image || '/images/constitutional_book.jpg',
            slug: area.slug,
            ...palette
        };
    }) : fallbackThematicAreas;

    const [activeId, setActiveId] = useState<string>(thematicAreas[0]?.number || "01");
    const [selectedArea, setSelectedArea] = useState<any | null>(null);
    return (
        <PublicLayout>
            <Head>
                <title>Thematic Areas of Work — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Explore the eight key thematic areas where Chapter Four Malawi implements its human rights and governance programmes — from constitutional education to accountability monitoring."
                />
            </Head>

            {/* ─── HERO SECTION ────────────────────────────────────────────── */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/constitutional_book.jpg"
                        alt="Chapter Four — Thematic Areas of Work"
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/70 to-slate-900/20" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                    {/* Breadcrumbs */}
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-bold uppercase tracking-wider">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span>/</span>
                        <Link href="/what-we-do" className="hover:text-brand-amber transition">What We Do</Link>
                        <span>/</span>
                        <span className="text-brand-amber">Thematic Areas</span>
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="max-w-3xl"
                    >
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-brand-amber font-bold tracking-widest uppercase mb-4 flex items-center gap-2 text-sm"
                        >
                            <span className="w-8 h-0.5 bg-brand-amber" /> Programme Framework
                        </motion.span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Thematic Areas<br />
                            <span className="text-brand-amber">of Work</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
                            Chapter Four implements its programmes around eight strategic pillars — each designed to holistically address human rights and governance challenges and translate constitutional guarantees into practical realities for all Malawians.
                        </p>
                    </motion.div>


                </div>

                {/* <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent" /> */}
            </section>


            {/* ─── INTRO SECTION ─────────────────────────────────────────────── */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-xs font-bold uppercase tracking-widest text-brand-rust block mb-3">Our Programme Framework</span>
                            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-6">
                                Eight Pillars of<br />Constitutional Justice
                            </h2>
                            <p className="text-slate-500 leading-relaxed text-base mb-5">
                                Chapter Four's work is grounded in the recognition that constitutional rights must be translated from legal text into lived reality. Each thematic pillar is an interconnected dimension of our commitment to ensuring that no Malawian is left behind.
                            </p>
                            <p className="text-slate-500 leading-relaxed text-base mb-8">
                                Our eight pillars are mutually reinforcing — legal empowerment informs accountability monitoring; civic education drives democratic participation; policy advocacy is grounded in field research. Together they constitute a holistic framework for systemic change.
                            </p>
                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <Layers className="w-8 h-8 text-brand-amber shrink-0" />
                                <p className="text-sm text-slate-600 font-medium">
                                    All pillars are implemented through Chapter Four's Human Rights-Based Approach (HRBA), recognizing communities as rights holders and institutions as duty bearers.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <img src="/images/animate-img-1.jpg" alt="Community engagement" className="rounded-2xl w-full h-52 object-cover shadow-lg" />
                            <img src="/images/Parliament_Building_of_Malawioutside.jpg" alt="Parliamentary advocacy" className="rounded-2xl w-full h-52 object-cover shadow-lg mt-8" />
                            <img src="/images/Chief_Justice.jpg" alt="Judicial engagement" className="rounded-2xl w-full h-52 object-cover shadow-lg -mt-4" />
                            <img src="/images/woman.jpg" alt="Community empowerment" className="rounded-2xl w-full h-52 object-cover shadow-lg mt-4" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── THEMATIC PILLARS — ELASTIC GALLERY ──────────────────── */}
            <section className="py-20 bg-slate-50">
                <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-rust block mb-3">All Eight Pillars</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                            Our Areas of Work
                        </h2>
                        <p className="text-slate-500 mt-4 leading-relaxed">
                            Each pillar represents a critical dimension of our work — interconnected and mutually reinforcing in building a rights-respecting Malawi.
                        </p>
                    </div>

                    {/* Elastic Gallery Container */}
                    <div className="mx-auto flex h-[600px] w-full flex-col gap-2 md:h-[600px] lg:h-[700px] md:flex-row md:gap-4">
                        {thematicAreas.map((item) => (
                            <div
                                key={item.number}
                                onMouseEnter={() => setActiveId(item.number)}
                                onClick={() => setSelectedArea(item)}
                                className={cn(
                                    "relative cursor-pointer overflow-hidden rounded-2xl border border-neutral-200 bg-white",
                                    "transition-[flex,filter] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-sm hover:shadow-md",
                                    activeId === item.number ? "flex-[5]" : "flex-[1]",
                                    activeId === item.number
                                        ? "brightness-100"
                                        : "brightness-[0.6] hover:brightness-75"
                                )}
                            >
                                {/* Background Image Layer */}
                                <div className="absolute inset-0 h-full w-full bg-slate-900">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className={cn(
                                            "object-cover h-full w-full transition-transform duration-1000",
                                            activeId === item.number ? "scale-100" : "scale-110 opacity-70"
                                        )}
                                    />
                                    {/* Gradient Overlay for Text Readability */}
                                    <div
                                        className={cn(
                                            "absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500",
                                            activeId === item.number ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </div>

                                {/* --- Content Container --- */}
                                <div className="absolute bottom-0 left-0 right-0 flex h-full flex-col justify-end p-4 md:p-6 lg:p-8">
                                    {/* Active Content: Title & Button */}
                                    <div
                                        className={cn(
                                            "flex flex-col gap-2 transition-all duration-500",
                                            activeId === item.number
                                                ? "translate-y-0 opacity-100 delay-200"
                                                : "translate-y-12 opacity-0 hidden md:flex" // Hide from layout when inactive to prevent overlap
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                                                Pillar {item.number}
                                            </span>
                                        </div>

                                        <h3 className="text-xl sm:text-3xl lg:text-4xl font-black uppercase leading-tight text-white mt-2">
                                            {item.title}
                                        </h3>

                                        <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/90 hover:text-white transition-colors">
                                            View Details <ArrowUpRight className="h-4 w-4" />
                                        </div>
                                    </div>

                                    {/* Inactive Content: Vertical Text (Desktop) / Short Label (Mobile) */}
                                    <div
                                        className={cn(
                                            "absolute transition-all duration-500",
                                            "bottom-4 left-1/2 -translate-x-1/2 md:bottom-8",
                                            activeId === item.number
                                                ? "opacity-0 scale-50"
                                                : "opacity-100 delay-300"
                                        )}
                                    >
                                        <span className="hidden whitespace-nowrap text-xl font-bold uppercase tracking-widest text-white/90 [writing-mode:vertical-rl] md:block rotate-180">
                                            {item.shortTitle}
                                        </span>

                                        <span className="block text-xs font-bold text-white/90 md:hidden bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                                            {item.number}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── BOTTOM CTA SECTION ─────────────────────────────────────────── */}
            <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/images/animate-img-1.jpg" alt="" className="w-full h-full object-cover opacity-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-900/70" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-brand-amber font-bold tracking-widest uppercase text-sm block mb-4">Get Involved</span>
                        <h2 className="text-3xl sm:text-4xl font-black mb-6 leading-tight">
                            Partner With Us to Advance<br />Constitutional Rights
                        </h2>
                        <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                            Whether you are a donor, researcher, community organization, legal practitioner, or individual advocate — there are many ways to support our eight-pillar programme framework.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-brand-rust hover:bg-brand-rust-dark text-white font-bold px-8 py-4 rounded-xl transition shadow-xl shadow-brand-rust/30"
                            >
                                <span>Get In Touch</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/what-we-do"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-4 rounded-xl transition backdrop-blur-sm"
                            >
                                <span>Full Programme Overview</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
            {/* Modal Overlay via AnimatePresence */}
            <AnimatePresence>
                {selectedArea && (
                    <ThematicModal
                        area={selectedArea}
                        onClose={() => setSelectedArea(null)}
                    />
                )}
            </AnimatePresence>
        </PublicLayout>
    );
}
