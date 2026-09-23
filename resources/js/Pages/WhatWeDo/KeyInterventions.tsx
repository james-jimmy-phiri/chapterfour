import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
    BookOpen, Gavel, Search, Megaphone, Users,
    HeartHandshake, Network, Handshake, ArrowRight, ArrowUpRight,
    CheckCircle2, Globe, Shield, X
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { cn } from "@/lib/utils";

// Expanded interface to include id and shortTitle for the Elastic Gallery
interface Intervention {
    id: string;
    icon: any;
    title: string;
    shortTitle: string;
    description: string;
    examples: string[];
    image: string;
}

interface KeyInterventionsProps {
    interventions?: any[];
}

const hardcodedInterventions: Intervention[] = [
    {
        id: '01',
        icon: BookOpen,
        title: "Constitutional & Human Rights Education",
        shortTitle: "Rights Education",
        description: "We deliver structured rights education across communities, schools, police posts, courts, and local government offices — building a culture of constitutional awareness from the grassroots up.",
        examples: [
            "Community human rights awareness dialogues",
            "School-based human rights clubs and youth assemblies",
            "Simplified constitutional guides in local languages",
            "Radio civic education programmes and jingles",
        ],
        image: "/images/constitutional_book.jpg",
    },
    {
        id: '02',
        icon: Gavel,
        title: "Legal Aid & Access to Justice Support",
        shortTitle: "Legal Aid",
        description: "We bridge the access-to-justice gap by providing community legal awareness, training paralegals, facilitating referrals to formal legal aid, and supporting strategic public interest litigation before competent courts.",
        examples: [
            "Mobile legal aid clinics at magistrate courts",
            "Community paralegal training and deployment",
            "Bail assistance and detention monitoring",
            "Strategic public interest litigation support",
        ],
        image: "/images/Chief_Justice.jpg",
    },
    {
        id: '03',
        icon: Search,
        title: "Human Rights Monitoring & Documentation",
        shortTitle: "Monitoring",
        description: "We systematically monitor, document, and report human rights violations — generating credible evidence that informs advocacy, litigation, and policy reform at national and international levels.",
        examples: [
            "Police facility and detention monitoring visits",
            "Annual human rights situation reports",
            "Shadow reports to UN treaty bodies",
            "Digital case documentation databases",
        ],
        image: "/images/no_justice.jpg",
    },
    {
        id: '04',
        icon: Megaphone,
        title: "Strategic Advocacy & Policy Engagement",
        shortTitle: "Advocacy",
        description: "We translate research evidence into targeted advocacy — engaging Parliament, line ministries, regulatory bodies, and international human rights mechanisms to promote laws and policies that uphold constitutional standards.",
        examples: [
            "Parliamentary submissions and legislative reviews",
            "Policy briefs and position papers",
            "Public dialogues with lawmakers and duty bearers",
            "Universal Periodic Review shadow reporting",
        ],
        image: "/images/Parliament_Building_of_Malawioutside.jpg",
    },
    {
        id: '05',
        icon: Users,
        title: "Civic Education & Democratic Participation",
        shortTitle: "Civic Education",
        description: "We promote active citizenship and democratic participation — equipping communities, especially youth and women, to meaningfully engage in electoral, civic, and governance processes.",
        examples: [
            "Voter and civic education campaigns",
            "Youth democracy forums and mock parliaments",
            "Women's leadership and civic engagement training",
            "Local government accountability dialogues",
        ],
        image: "/images/animate-img-1.jpg",
    },
    {
        id: '06',
        icon: HeartHandshake,
        title: "Protection of Vulnerable & Marginalized Groups",
        shortTitle: "Vulnerable Groups",
        description: "We run targeted programmes to address the compounded human rights challenges facing women, children, persons with disabilities, albinism, refugees, and other marginalized communities.",
        examples: [
            "GBV legal support and case referral pathways",
            "Child protection and anti-child marriage campaigns",
            "Disability and albinism rights advocacy",
            "Refugee and displaced persons legal orientation",
        ],
        image: "/images/woman.jpg",
    },
    {
        id: '07',
        icon: Globe,
        title: "Peace Building & Social Cohesion",
        shortTitle: "Peace Building",
        description: "We facilitate community dialogue, conflict prevention, and reconciliation processes — building peaceful, tolerant, and socially cohesive communities capable of resolving disputes through constitutional and non-violent means.",
        examples: [
            "Community conflict mediation and dialogue facilitation",
            "Peace and tolerance education workshops",
            "Community-based early warning and response structures",
            "Campaigns promoting peaceful civic participation",
        ],
        image: "/images/Tithetse.jpg",
    },
    {
        id: '08',
        icon: Shield,
        title: "Capacity Building for Communities & Duty Bearers",
        shortTitle: "Capacity Building",
        description: "We invest in durable human capacity — training community leaders, civil society organizations, government officials, law enforcement, and justice institutions in human rights standards and their practical application.",
        examples: [
            "Human rights training for law enforcement officers",
            "CSO capacity building in governance and advocacy",
            "Community leader sensitization on rights obligations",
            "Training of duty bearers on international human rights standards",
        ],
        image: "/images/animate-img-2.jpg",
    },
    {
        id: '09',
        icon: Network,
        title: "Research & Knowledge Generation",
        shortTitle: "Research",
        description: "We produce rigorous, evidence-based research, policy analysis, and publications that strengthen the credibility of our advocacy, inform programme design, and contribute to Malawi's human rights knowledge base.",
        examples: [
            "Baseline surveys and thematic field research",
            "Constitutional jurisprudence analysis papers",
            "Policy briefs and legislative reform recommendations",
            "Knowledge products for civil society and duty bearers",
        ],
        image: "/images/legal_books.webp",
    },
    {
        id: '10',
        icon: Handshake,
        title: "Stakeholder Consultations & Partnership Building",
        shortTitle: "Partnerships",
        description: "We actively develop strategic partnerships and networks — convening multi-stakeholder dialogues, coordinating with civil society, government, academia, development partners, and international human rights bodies.",
        examples: [
            "Multi-stakeholder human rights dialogues",
            "CSO coalition building and coordination",
            "Joint advocacy campaigns with partner organizations",
            "International and regional human rights body engagement",
        ],
        image: "/images/iStock-1369137588.jpg",
    },
];

// Icon mapping for DB data
const iconMap: Record<string, any> = {
    BookOpen, Gavel, Search, Megaphone, Users,
    HeartHandshake, Network, Handshake, Globe, Shield,
};

// --- Modal Component ---
function InterventionModal({ intervention, onClose }: { intervention: Intervention, onClose: () => void }) {
    const Icon = intervention.icon;

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
                    <div className="lg:w-[42%] relative overflow-hidden shrink-0 h-64 lg:h-auto min-h-[300px] lg:min-h-[500px]">
                        <img
                            src={intervention.image}
                            alt={intervention.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-900/40" />

                        <div className="absolute top-6 left-6 z-10">
                            <span className="bg-white/15 backdrop-blur-md text-white font-black text-2xl px-4 py-2 rounded-xl border border-white/25 leading-none">
                                {intervention.id}
                            </span>
                        </div>

                        <div className="absolute bottom-6 right-6 z-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center">
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-[58%] p-8 lg:p-12 flex flex-col justify-center relative bg-white">
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-rust px-3 py-1 bg-brand-rust/10 rounded-full inline-block mb-4 w-fit">
                            Intervention {intervention.id}
                        </span>

                        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 leading-tight">
                            {intervention.title}
                        </h3>

                        <p className="text-slate-500 leading-relaxed mb-8 text-sm sm:text-base">
                            {intervention.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            {intervention.examples.map((ex, i) => (
                                <div key={i} className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-5 h-5 text-brand-rust shrink-0 mt-0.5" />
                                    <span className="text-sm text-slate-600 font-medium leading-relaxed">{ex}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
export default function KeyInterventions({ interventions = [] }: KeyInterventionsProps) {
    // Map DB interventions to local format, fallback to hardcoded if DB is empty
    const displayInterventions: Intervention[] = interventions && interventions.length > 0
        ? interventions.map((item: any, idx: number) => ({
            id: String(item.id || idx + 1).padStart(2, '0'),
            icon: iconMap[item.icon] || BookOpen,
            title: item.title,
            shortTitle: item.short_title || item.shortTitle || item.title.split(' ')[0],
            description: item.description || '',
            examples: Array.isArray(item.examples) ? item.examples : [],
            image: item.image || '/images/animate-img-2.jpg',
        }))
        : hardcodedInterventions;

    const [activeId, setActiveId] = useState<string>(displayInterventions[0]?.id || '01');
    const [selectedIntervention, setSelectedIntervention] = useState<Intervention | null>(null);
    return (
        <PublicLayout>
            <Head>
                <title>Key Programmatic Interventions — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Explore the key programmatic interventions executed by Chapter Four Malawi — from constitutional education and legal aid to strategic advocacy, monitoring, and peace building."
                />
            </Head>

            {/* ─── HERO SECTION ────────────────────────────────────────────── */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/no_justice_mw.jpg"
                        alt="Chapter Four Key Interventions"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/70 to-slate-900/30" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                    {/* Breadcrumbs */}
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-bold uppercase tracking-wider">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span>/</span>
                        <Link href="/what-we-do" className="hover:text-brand-amber transition">What We Do</Link>
                        <span>/</span>
                        <span className="text-brand-amber">Key Interventions</span>
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
                            <span className="w-8 h-0.5 bg-brand-amber" /> Action & Impact
                        </motion.span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Key Programmatic<br />
                            <span className="text-brand-amber">Interventions</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
                            Driving transformative change through targeted, evidence-based actions — from grassroots constitutional education and legal aid to high-level strategic advocacy and peace building across Malawi.
                        </p>
                    </motion.div>

                    
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent" />
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
                            <span className="text-xs font-bold uppercase tracking-widest text-brand-rust block mb-3">Multifaceted Strategy</span>
                            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-6">
                                A Holistic Approach to<br />Rights Protection
                            </h2>
                            <p className="text-slate-500 leading-relaxed text-base mb-5">
                                Chapter Four employs a multifaceted portfolio of programmatic interventions designed to create lasting impact by empowering individuals, strengthening institutions, and fostering a culture of constitutionalism and human rights across Malawi.
                            </p>
                            <p className="text-slate-500 leading-relaxed text-base mb-8">
                                Our ten key interventions span the full spectrum of rights protection — from the community to the courtroom, from grassroots civic education to legislative advocacy — each reinforcing the others in a coherent, evidence-grounded strategy.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { value: "10+", label: "Intervention types" },
                                    { value: "15+", label: "Districts covered" },
                                    { value: "50K+", label: "People reached" },
                                    { value: "2016", label: "Established" },
                                ].map((s, i) => (
                                    <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                        <div className="text-2xl font-black text-brand-rust mb-0.5">{s.value}</div>
                                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <img src="/images/constitutional_book.jpg" alt="Constitutional law" className="rounded-2xl w-full h-52 object-cover shadow-lg" />
                            <img src="/images/Parliament_Building_of_Malawioutside.jpg" alt="Parliament building" className="rounded-2xl w-full h-52 object-cover shadow-lg mt-8" />
                            <img src="/images/animate-img-1.jpg" alt="Community engagement" className="rounded-2xl w-full h-52 object-cover shadow-lg -mt-4" />
                            <img src="/images/woman.jpg" alt="Women's rights" className="rounded-2xl w-full h-52 object-cover shadow-lg mt-4" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── INTERVENTIONS — ELASTIC GALLERY ──────────────────── */}
            <section className="py-20 bg-slate-50">
                <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-rust block mb-3">Our Work in Practice</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                            Ten Key Interventions
                        </h2>
                        <p className="text-slate-500 mt-4 leading-relaxed">
                            Each intervention area represents a strategic dimension of our effort to make constitutional rights real for all Malawians.
                        </p>
                    </div>

                    {/* Elastic Gallery Container */}
                    {/* Note: Increased mobile height to 850px to accommodate 10 items comfortably */}
                    <div className="mx-auto flex h-[850px] w-full flex-col gap-2 md:h-[600px] lg:h-[700px] md:flex-row md:gap-3">
                        {displayInterventions.map((item) => (
                            <div
                                key={item.id}
                                onMouseEnter={() => setActiveId(item.id)}
                                onClick={() => setSelectedIntervention(item)}
                                className={cn(
                                    "relative cursor-pointer overflow-hidden rounded-2xl border border-neutral-200 bg-white",
                                    "transition-[flex,filter] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-sm hover:shadow-md",
                                    activeId === item.id ? "flex-[4]" : "flex-[1]",
                                    activeId === item.id
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
                                            activeId === item.id ? "scale-100" : "scale-110 opacity-70"
                                        )}
                                    />
                                    {/* Gradient Overlay for Text Readability */}
                                    <div
                                        className={cn(
                                            "absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500",
                                            activeId === item.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </div>

                                {/* --- Content Container --- */}
                                <div className="absolute bottom-0 left-0 right-0 flex h-full flex-col justify-end p-4 md:p-6 lg:p-8">
                                    {/* Active Content: Title & Button */}
                                    <div
                                        className={cn(
                                            "flex flex-col gap-2 transition-all duration-500",
                                            activeId === item.id
                                                ? "translate-y-0 opacity-100 delay-200"
                                                : "translate-y-12 opacity-0 hidden md:flex"
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                                                Intervention {item.id}
                                            </span>
                                        </div>

                                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase leading-tight text-white mt-2 drop-shadow-sm">
                                            {item.title}
                                        </h3>

                                        <div className="mt-2 sm:mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/90 hover:text-brand-rust transition-colors">
                                            View Details <ArrowUpRight className="h-4 w-4" />
                                        </div>
                                    </div>

                                    {/* Inactive Content: Vertical Text (Desktop) / Short Label (Mobile) */}
                                    <div
                                        className={cn(
                                            "absolute transition-all duration-500",
                                            "bottom-3 left-1/2 -translate-x-1/2 md:bottom-8",
                                            activeId === item.id
                                                ? "opacity-0 scale-50"
                                                : "opacity-100 delay-300"
                                        )}
                                    >
                                        <span className="hidden whitespace-nowrap text-lg lg:text-xl font-bold uppercase tracking-widest text-white/90 [writing-mode:vertical-rl] md:block rotate-180 drop-shadow-md">
                                            {item.shortTitle}
                                        </span>

                                        <span className="block text-xs font-bold text-white/90 md:hidden bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                                            {item.id}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal Overlay via AnimatePresence */}
            <AnimatePresence>
                {selectedIntervention && (
                    <InterventionModal
                        intervention={selectedIntervention}
                        onClose={() => setSelectedIntervention(null)}
                    />
                )}
            </AnimatePresence>

            {/* ─── CTA ─────────────────────────────────────────────────────── */}
            <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/images/animate-img-3.jpg" alt="" className="w-full h-full object-cover opacity-10" />
                    <div className="absolute inset-0 bg-slate-900/80" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-brand-amber font-bold tracking-widest uppercase text-sm block mb-4">Support Our Work</span>
                        <h2 className="text-3xl sm:text-4xl font-black mb-6 leading-tight">
                            Make a Difference for<br />Human Rights in Malawi
                        </h2>
                        <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                            Our interventions are only possible through the generous support of donors, partners, and advocates who believe in constitutional justice for all Malawians.
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
                                href="/what-we-do/thematic-areas"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-4 rounded-xl transition backdrop-blur-sm"
                            >
                                <span>Thematic Areas of Work</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </PublicLayout>
    );
}
