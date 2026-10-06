import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, Shield, Scale, BookOpen, Users, FileText, Search,
    Globe, Heart, Calendar, CheckCircle2, ChevronRight, AlertCircle,
    Building2, Award, ExternalLink
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import BoxImgAnimate from '@/Components/BoxImgAnimate';
import { LogosSlider } from '@/Components/LogosSlider';
import Blogs from '@/Components/ui/blogs';

import ContactModal from '@/Components/ContactModal';

interface StatItem {
    label: string;
    value: string | number;
    prefix?: string;
    suffix?: string;
    description?: string;
    icon?: string;
}

interface ThematicAreaItem {
    title: string;
    slug: string;
    short_description?: string;
    icon?: string;
}

interface ResourceItem {
    title: string;
    slug: string;
    type: string;
    excerpt?: string;
    published_at?: string;
    featured_image?: string;
}

interface PartnerItem {
    name: string;
    logo?: string;
    website?: string;
}

interface HeroSlideItem {
    word: string;
    bg_image?: string;
    bgImage?: string;
    right_image?: string;
    rightImage?: string;
    right_alt?: string;
    rightAlt?: string;
    accent_label?: string;
    accentLabel?: string;
}

interface WelcomeProps {
    stats?: StatItem[];
    thematicAreas?: ThematicAreaItem[];
    latestResources?: ResourceItem[];
    featuredResource?: { title: string; slug: string; excerpt?: string } | null;
    partners?: PartnerItem[];
    heroSlides?: HeroSlideItem[];
}

// ─── ANIMATED STAT COUNTER COMPONENT ───────────────────────────────────────────

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });

    useEffect(() => {
        if (!inView || !ref.current) return;
        const controls = animate(0, target, {
            duration: 2,
            ease: [0.16, 1, 0.3, 1],
            onUpdate(value) {
                if (ref.current) ref.current.textContent = `${prefix}${Math.round(value).toLocaleString()}${suffix}`;
            },
        });
        return controls.stop;
    }, [inView, target, prefix, suffix]);

    return <span ref={ref}>{prefix}0{suffix}</span>;
}

// ─── THEMATIC ICON MAPPER ──────────────────────────────────────────────────────

function getThematicIcon(slug: string, index: number) {
    const icons = [Shield, Scale, Globe, BookOpen, FileText, Heart, Search, Users];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-6 h-6 text-brand-rust" />;
}

// ─── HERO SLIDES DATA FOR SYNCHRONIZED TRANSITIONS ────────────────────────────

const defaultHeroSlides = [
    {
        word: 'human rights,',
        bgImage: '/images/hero-bg.jpg',
        rightImage: '/images/child-hero.png',
        rightAlt: 'Child supported by Chapter Four public interest legal aid and child protection',
        accentLabel: 'Human Rights & Constitutionalism',
    },
    {
        word: 'constitutionalism,',
        bgImage: '/images/hero/pexels-akoonie-10875242.jpg',
        rightImage: '/images/hero/smiling-african-mother-with-child-in-traditional-attire-on-transparent-background-png.png',
        rightAlt: 'Families and communities empowered by constitutional rights advocacy',
        accentLabel: 'Constitutional Supremacy',
    },
    {
        word: 'access to justice,',
        bgImage: '/images/hero/pexels-dsd-143941-1502311.jpg',
        rightImage: '/images/child-hero.png',
        rightAlt: 'Grassroots citizens gaining access to pro-bono legal defense',
        accentLabel: 'Access to Justice & Legal Aid',
    },
    {
        word: 'accountable democracy,',
        bgImage: '/images/hero/pexels-safari-consoler-3290243-26769827.jpg',
        rightImage: '/images/hero/ai-generated-poor-little-african-child-transparent-background-free-png.png',
        rightAlt: 'Empowering future generations through civic monitoring and integrity',
        accentLabel: 'Democracy & Good Governance',
    },
];

export default function Welcome({
    stats = [],
    thematicAreas = [],
    latestResources = [],
    featuredResource = null,
    partners = [],
    heroSlides = [],
}: WelcomeProps) {
    const { site } = usePage<any>().props;
    const activeHeroSlides = heroSlides && heroSlides.length > 0
        ? heroSlides.map((s) => ({
            word: s.word,
            bgImage: s.bg_image || s.bgImage || '/images/hero-bg.jpg',
            rightImage: s.right_image || s.rightImage || '/images/child-hero.png',
            rightAlt: s.right_alt || s.rightAlt || '',
            accentLabel: s.accent_label || s.accentLabel || 'Chapter Four',
        }))
        : defaultHeroSlides;

    const [floatingMessage, setFloatingMessage] = useState('');
    const [floatingInquiryType, setFloatingInquiryType] = useState('General Inquiry');
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [resourceType, setResourceType] = useState('All');
    const [slideIndex, setSlideIndex] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Typewriter effect synchronized with rotating hero slides
    useEffect(() => {
        const safeIndex = slideIndex % activeHeroSlides.length;
        const currentTarget = activeHeroSlides[safeIndex].word;
        let timer: ReturnType<typeof setTimeout>;

        if (!isDeleting) {
            // Typing forward
            if (typedText.length < currentTarget.length) {
                timer = setTimeout(() => {
                    setTypedText(currentTarget.slice(0, typedText.length + 1));
                }, 85);
            } else {
                // Fully typed: hold for reading
                timer = setTimeout(() => {
                    setIsDeleting(true);
                }, 6000);
            }
        } else {
            // Deleting backward
            if (typedText.length > 0) {
                timer = setTimeout(() => {
                    setTypedText(currentTarget.slice(0, typedText.length - 1));
                }, 40);
            } else {
                // Done deleting: advance to next slide and start typing next word
                setIsDeleting(false);
                setSlideIndex((prev) => (prev + 1) % activeHeroSlides.length);
            }
        }

        return () => clearTimeout(timer);
    }, [typedText, isDeleting, slideIndex, activeHeroSlides]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (resourceType && resourceType !== 'All') params.append('type', resourceType);
        router.visit(`/resources?${params.toString()}`);
    };

    // Fallback thematic areas if database is fresh
    const defaultThematicAreas: ThematicAreaItem[] = [
        {
            title: 'Human Rights & Constitutionalism',
            slug: 'human-rights',
            short_description: 'Safeguarding civil liberties, fundamental freedoms, and constitutional supremacy under Chapter IV of the Malawi Constitution.',
        },
        {
            title: 'Access to Justice & Legal Aid',
            slug: 'access-to-justice',
            short_description: 'Empowering underprivileged communities and vulnerable groups to navigate justice institutions and seek effective redress.',
        },
        {
            title: 'Democracy & Good Governance',
            slug: 'democracy-governance',
            short_description: 'Promoting transparent, participatory, and responsive governance while strengthening citizens in democratic processes.',
        },
        {
            title: 'Civic & Rights Education',
            slug: 'civic-education',
            short_description: 'Equipping grassroots citizens, youth, and duty bearers with legal literacy to claim rights and demand accountability.',
        },
        {
            title: 'Policy & Legislative Advocacy',
            slug: 'policy-advocacy',
            short_description: 'Rigorous legal analysis and strategic litigation advocating for laws that comply with constitutional standards.',
        },
        {
            title: 'Protection of Vulnerable Groups',
            slug: 'vulnerable-groups',
            short_description: 'Defending the rights of women, children, persons with disabilities, and marginalized communities against systemic discrimination.',
        },
    ];

    const displayThematic = thematicAreas.length > 0 ? thematicAreas : defaultThematicAreas;

    // Fallback stats if empty
    const defaultStats: StatItem[] = [
        { label: 'Citizens Reached', value: '45000', suffix: '+', description: 'Across all 28 districts through legal empowerment and civic outreach' },
        { label: 'Legal Cases Supported', value: '1240', suffix: '', description: 'Pro-bono legal defense, mediation, and constitutional petitions' },
        { label: 'Community Paralegals', value: '380', suffix: '+', description: 'Trained and deployed to provide grassroots legal triage and advice' },
        { label: 'Advocacy Reports & Briefs', value: '65', suffix: '+', description: 'In-depth research publications informing policy and judicial discourse' },
    ];

    const displayStats = stats.length > 0 ? stats : defaultStats;

    // Fallback latest resources
    const defaultResources: ResourceItem[] = [
        {
            title: 'Constitutional Rights & Police Powers: A Citizens Legal Handbook',
            slug: 'constitutional-rights-police-powers',
            type: 'Publication',
            excerpt: 'A comprehensive legal guide outlining citizens rights upon arrest, detention safeguards, and bail mechanisms under Chapter IV.',
            published_at: 'Oct 14, 2025',
        },
        {
            title: 'Access to Justice Baseline Survey Across Rural Magistrates Courts',
            slug: 'access-to-justice-baseline-survey',
            type: 'Report',
            excerpt: 'Empirical assessment of judicial delays, bail accessibility, and legal representation deficits in lower courts in Malawi.',
            published_at: 'Nov 02, 2025',
        },
        {
            title: 'Protecting Freedom of Assembly & Peaceful Demonstration',
            slug: 'protecting-freedom-of-assembly',
            type: 'Statement',
            excerpt: 'Legal advisory on the constitutional guarantees of assembly and duty-bearer compliance with international human rights standards.',
            published_at: 'Dec 18, 2025',
        },
        {
            title: 'Gender Justice & Elimination of Harmful Cultural Practices',
            slug: 'gender-justice-harmful-practices',
            type: 'Research',
            excerpt: 'Strategic legal pathways to enforce statutory protections for women and girls in rural traditional jurisdictions.',
            published_at: 'Jan 22, 2026',
        },
    ];

    const displayResources = latestResources.length > 0 ? latestResources : defaultResources;

    const articlesData = displayResources.map((item) => ({
        category: item.type || 'Resource',
        description: item.excerpt || '',
        image: (item as any).featured_image || "/images/child-hero.png",
        publishDate: item.published_at || 'Recent',
        readMoreLink: `/resources/${item.slug}`,
        title: item.title,
    }));

    return (
        <PublicLayout>
            <Head>
                <title>Chapter Four Malawi — Defending Constitutionalism, Human Rights & Justice</title>
                <meta
                    name="description"
                    content="Chapter Four is a premier, non-partisan legal and civic organization in Malawi dedicated to safeguarding human rights, constitutional freedoms, and access to justice."
                />
            </Head>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* 1. HERO BANNER SECTION (Starts After Contacts Bar, Pure Black Overlay) */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <section

                className="relative lg:min-h-[92vh] flex items-center text-white overflow-hidden pt-28 sm:pt-32 lg:pt-42 pb-10 sm:pb-14"
                data-purpose="hero-banner"
            >
                {/* Background Image Carousel with Pure Black Overlay & High Photo Visibility */}
                <div className="absolute inset-0 z-0 bg-black overflow-hidden">
                    <AnimatePresence mode="sync">
                        <motion.img
                            key={activeHeroSlides[slideIndex % activeHeroSlides.length].bgImage}
                            src={activeHeroSlides[slideIndex % activeHeroSlides.length].bgImage}
                            alt="Chapter Four Malawi Community"
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.1, ease: 'easeInOut' }}
                            className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                    </AnimatePresence>

                    {/* Pure Black Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40 sm:from-black/85 sm:via-black/55 sm:to-black/40 z-1" />

                    {/* Subtle ambient glow accents */}
                    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-amber/10 rounded-full blur-3xl pointer-events-none z-1" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-rust/15 rounded-full blur-3xl pointer-events-none z-1" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    {/* Left Hero Column: Headings, Text, 2 Buttons in a Row */}
                    <div className="lg:col-span-7 flex flex-col items-start text-left mt-4 lg:mt-0">
                        {/* Main Hero Headline */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight lg:leading-[1.08] text-white">
                            Rights. Justice. Dignity.{' '}
                            <br />
                            For Everyone.
                            <br />
                            <span className="text-brand-amber text-3xl sm:text-4xl lg:text-5xl xl:text-6xl relative inline-block mt-2 lg:mt-0">
                                {typedText}
                                <span className="inline-block w-[3px] h-[0.85em] bg-brand-amber ml-1.5 animate-pulse align-middle" />
                            </span>
                        </h1>

                        {/* Subtitle - tighter bottom margin on mobile */}
                        <p className="text-slate-200 text-base sm:text-lg lg:text-xl font-normal leading-relaxed mt-4 mb-6 lg:mb-8 max-w-2xl">
                            We promote <strong className="text-white font-semibold">human rights, constitutionalism, access to justice and accountable democracy </strong> working with communities to turn constitutional rights into everyday realities.
                        </p>

                        {/* Action Buttons - reduced mobile padding (py-3), smaller text (text-sm) */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4 w-full sm:w-auto">
                            <Link
                                href="/what-we-do"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 lg:px-8 lg:py-4 bg-brand-rust hover:bg-brand-rust-dark text-white font-bold text-sm lg:text-base rounded-md transition duration-200 shadow-lg shadow-brand-rust/30 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span>Explore Our Work</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <Link
                                href="/about"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 lg:px-8 lg:py-4 border-2 border-white/70 hover:border-white hover:bg-white/10 text-white font-bold text-sm lg:text-base rounded-md transition duration-200 backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span>About Chapter Four</span>
                                <ChevronRight className="w-4 h-4 text-brand-amber" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Hero Column: Animated Cutout Image */}
                    <div className="lg:col-span-5 relative flex justify-center items-center mt-8 lg:mt-0">
                        {/* Fixed massive mobile height: changed to h-[250px] for mobile, restoring large height for lg screens */}
                        <div className="relative w-full flex justify-center h-[250px] sm:h-[350px] lg:min-h-[540px] items-end lg:items-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeHeroSlides[slideIndex % activeHeroSlides.length].rightImage + (slideIndex % activeHeroSlides.length)}
                                    initial={{ opacity: 0, y: 25, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.97 }}
                                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative flex justify-center w-full h-full"
                                >
                                    <img
                                        src={activeHeroSlides[slideIndex % activeHeroSlides.length].rightImage}
                                        alt={activeHeroSlides[slideIndex % activeHeroSlides.length].rightAlt}
                                        // Tightly controlled mobile max-height so it doesn't push the next section away
                                        className="relative z-10 w-auto h-full max-h-[250px] sm:max-h-[350px] lg:max-h-[560px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)] select-none pointer-events-none"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* 2. DEDICATED SEARCH & FLOATING ADVISORY SECTION                     */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <section className="relative max-w-7xl items-center mx-auto px-4 sm:px-8 -mt-10 sm:-mt-14 z-20" data-purpose="search-and-advisory">
                <div className="bg-white items-center rounded-2xl shadow-2xl border border-slate-200/90 p-5 sm:p-7">
                    <div className=" items-center">
                        <div className="lg:col-span-7">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider text-brand-rust flex items-center gap-1.5">
                                    <Shield className="w-3.5 h-3.5" />
                                    <span>rights been violated or You have any Concern? Send Us a  Message</span>
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium">Chapter Four</span>
                            </div>

                            <form
                                onSubmit={(e) => { e.preventDefault(); setIsMessageModalOpen(true); }}
                                className="bg-slate-50 rounded-xl p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 border border-slate-200 focus-within:border-brand-rust focus-within:ring-2 focus-within:ring-brand-rust/20 transition"
                                data-purpose="repositioned-search"
                            >
                                {/* Inquiry Type Dropdown */}
                                <div className="flex items-center border-b sm:border-b-0 sm:border-r border-slate-200 px-3 py-1.5">
                                    <FileText className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                                    <select
                                        value={floatingInquiryType}
                                        onChange={(e) => setFloatingInquiryType(e.target.value)}
                                        className="text-xs font-semibold text-slate-700 bg-transparent border-none focus:ring-0 cursor-pointer pr-6 py-0 focus:outline-none"
                                    >
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Legal Aid & Defense">Legal Aid & Defense</option>
                                        <option value="Rights Violation Report">Report Rights Violation</option>
                                        <option value="Safeguarding Issue">Safeguarding Issue</option>
                                        <option value="Anonymous Complaint">Anonymous Complaint</option>
                                        <option value="Media & Press">Media & Press</option>
                                        <option value="Partnership & Funding">Partnership & Funding</option>
                                        <option value="Research Collaboration">Research Collaboration</option>
                                    </select>
                                </div>

                                {/* Text Input */}
                                <input
                                    type="text"
                                    value={floatingMessage}
                                    onChange={(e) => setFloatingMessage(e.target.value)}
                                    placeholder="Briefly describe your inquiry or report a concern..."
                                    className="w-full text-xs sm:text-sm px-3 py-2 text-slate-800 placeholder-slate-400 bg-transparent border-none focus:ring-0 focus:outline-none"
                                />

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="bg-brand-rust hover:bg-brand-rust-dark text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-lg transition shrink-0 flex items-center justify-center gap-1.5 shadow-sm"
                                >
                                    <ArrowRight className="w-3.5 h-3.5" />
                                    <span>Continue</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <ContactModal
                show={isMessageModalOpen}
                onClose={() => setIsMessageModalOpen(false)}
                initialInquiryType={floatingInquiryType}
                initialMessage={floatingMessage}
            />

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* 3. THE CHALLENGE (Problem Statement)                               */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-b border-slate-200" data-purpose="the-challenge">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                        {/* Left Column: Anchor Image with Overlapping Impact Card */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1 }}
                            className="w-full lg:w-1/2 order-2 lg:order-1 relative py-6"
                        >
                            {/* Main Image */}
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                                <img
                                    src="/images/speaktoservice.jpg"
                                    alt="Community engagement"
                                    className="w-full h-full object-cover"
                                />
                                {/* Subtle gradient overlay to ensure the image doesn't look flat */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
                            </div>

                            {/* Overlapping Impact Card */}
                            <div className="absolute -bottom-6 -right-6 sm:bottom-8 sm:-right-8 bg-brand-rust p-6 sm:p-8 rounded-xl shadow-xl max-w-[240px]">
                                <span className="block text-4xl font-black text-white mb-1">45k+</span>
                                <span className="block text-sm font-semibold text-white/90 leading-snug">
                                    Citizens Reach Across 28 Districts
                                </span>
                            </div>
                        </motion.div>

                        {/* Right Column: Structured Typography */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-1/2 order-1 lg:order-2"
                        >
                            <span className="text-sm font-bold uppercase tracking-widest text-brand-rust mb-4 flex items-center gap-3">
                                <span className="w-10 h-0.5 bg-brand-rust"></span>
                                Why We Exist
                            </span>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 text-slate-900 leading-tight tracking-tight">
                                Bridging the Gap Between Law and Reality
                            </h2>

                            {/* Text block with vertical visual anchor */}
                            <div className="border-l-4 border-brand-amber/40 pl-6 mb-8">
                                <p className="text-lg text-slate-700 mb-4 leading-relaxed font-medium">
                                    While the Constitution of the Republic of Malawi guarantees fundamental rights and freedoms, many individuals and communities still experience exclusion, discrimination, poverty, and marginalization.
                                </p>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    We exist to ensure that the Bill of Rights serves as the foundation for a just society, transforming legal guarantees into practical realities for those who face barriers to accessing justice.
                                </p>
                            </div>

                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2.5 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                <span>Read Our Full Story</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>

                    </div>
                </div>
            </section>


            {/* 4. WHO WE ARE (Parallax Fixed Background)                          */}

            <section
                className="relative bg-fixed bg-cover bg-center py-24"
                style={{ backgroundImage: 'url("/images/animate-img-1.jpg")' }}
            >
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/80 to-slate-900/70"></div>

                <div className="relative z-10 px-4 sm:px-8 max-w-7xl mx-auto text-white">
                    {/* Top Title & Opening Statement */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto mb-20"
                    >

                        <span className="text-brand-amber text-sm font-bold uppercase tracking-widest mb-4 block"> <span className="w-8 h-0.5 bg-brand-rust"></span> Who We Are</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                            Defenders of Dignity, Equality & Freedom
                        </h2>
                        <p className="text-xl md:text-2xl font-light italic text-slate-300 relative inline-block px-4">
                            <span className="absolute top-0 left-0 text-5xl text-brand-amber/30">"</span>
                            We are Chapter Four, an independent, youth-led human rights organization committed to the promotion and protection of universally recognized human rights.
                            <span className="absolute -bottom-4 right-0 text-5xl text-brand-amber/30">"</span>
                        </p>
                    </motion.div>

                    {/* Columns: Left Images, Right Text */}
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        {/* Left Image Collage */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-1/2 relative h-[350px] sm:h-[450px] w-full"
                        >
                            <div className="absolute top-0 left-0 w-3/4 h-56 sm:h-72 border-[6px] border-black/40 rounded-2xl overflow-hidden shadow-2xl z-10 transform -rotate-2">
                                <img src="/images/crying_boychild.jpg" alt="Child" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                            </div>
                            <div className="absolute bottom-0 right-0 w-3/4 h-56 sm:h-72 border-[6px] border-brand-rust rounded-2xl overflow-hidden shadow-2xl z-20 transform rotate-2">
                                <img src="/images/no_justice.jpg" alt="No Justice" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                            </div>

                            {/* Accent graphics */}
                            <div className="absolute -left-6 top-1/2 w-12 h-12 bg-brand-amber rounded-full mix-blend-screen blur-xl"></div>
                            <div className="absolute -right-6 bottom-1/4 w-16 h-16 bg-brand-rust rounded-full mix-blend-screen blur-xl"></div>
                        </motion.div>

                        {/* Right Text */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:w-1/2 space-y-8"
                        >
                            <div>
                                <h3 className="text-3xl font-black text-brand-amber mb-4">Our Core Objectives</h3>
                                <div className="w-16 h-1 bg-brand-rust mb-6"></div>
                            </div>

                            <p className="text-slate-300 leading-relaxed text-lg">
                                {site?.mission || 'To promote a just, inclusive and democratic Malawi in which constitutional rights and freedoms are respected and protected, citizens are empowered to claim their rights, access to justice is strengthened, and public institutions are accountable, transparent and responsive.'}
                            </p>


                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                                {[
                                    'Promote and protect constitutional rights and access to justice',
                                    'Strengthen accountable, transparent and democratic governance',
                                    'Strengthen community-based human rights protection, peacebuilding and collaboration',

                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                                        <CheckCircle2 className="w-5 h-5 text-brand-amber shrink-0" />
                                        <span className="font-semibold text-slate-200">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* 5. NEWS AND RESOURCES (Dynamic Grid)                                */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <Blogs articlesData={articlesData} />

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* 8. STRATEGIC PARTNERS & ALLIES SECTION                              */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-14 bg-slate-50 border-t border-slate-200/60" aria-label="Partners">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-6">
                        Allies, Donors & Institutional Partners
                    </span>
                    <LogosSlider partners={partners} />
                </div>
            </section>
        </PublicLayout>
    );
}
