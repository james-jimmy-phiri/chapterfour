import { Head, Link, router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, Shield, Scale, BookOpen, Users, FileText, Search,
    Globe, Heart, Calendar, CheckCircle2, ChevronRight, AlertCircle,
    Building2, Award, ExternalLink
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import BoxImgAnimate from '@/Components/BoxImgAnimate';

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

interface WelcomeProps {
    stats?: StatItem[];
    thematicAreas?: ThematicAreaItem[];
    latestResources?: ResourceItem[];
    featuredResource?: { title: string; slug: string; excerpt?: string } | null;
    partners?: PartnerItem[];
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

const heroSlides = [
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
}: WelcomeProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [resourceType, setResourceType] = useState('All');
    const [slideIndex, setSlideIndex] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Typewriter effect synchronized with rotating hero slides
    useEffect(() => {
        const currentTarget = heroSlides[slideIndex].word;
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
                setSlideIndex((prev) => (prev + 1) % heroSlides.length);
            }
        }

        return () => clearTimeout(timer);
    }, [typedText, isDeleting, slideIndex]);

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
                className="relative min-h-[calc(100vh-80px)] lg:min-h-[92vh] flex items-center text-white overflow-hidden pt-36 sm:pt-38 lg:pt-42 pb-6 sm:pb-14"
                data-purpose="hero-banner"
            >
                {/* Background Image Carousel with Pure Black Overlay & High Photo Visibility */}
                <div className="absolute inset-0 z-0 bg-black overflow-hidden">
                    <AnimatePresence mode="sync">
                        <motion.img
                            key={heroSlides[slideIndex].bgImage}
                            src={heroSlides[slideIndex].bgImage}
                            alt="Chapter Four Malawi Community"
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.1, ease: 'easeInOut' }}
                            className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                    </AnimatePresence>

                    {/* Pure Black Overlay with enhanced visibility for background photo */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/35 sm:from-black/80 sm:via-black/50 sm:to-black/30 z-1" />

                    {/* Subtle ambient glow accents */}
                    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-amber/10 rounded-full blur-3xl pointer-events-none z-1" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-rust/15 rounded-full blur-3xl pointer-events-none z-1" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                    {/* Left Hero Column: Headings, Text, 2 Buttons in a Row */}
                    <div className="lg:col-span-7 flex flex-col items-start text-left">


                        {/* Main Hero Headline (Spartan Typography) with Typewriter Animation */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.08] text-white mb-6">
                            Promoting, Protecting and advancing{' '}:
                            <br />
                            <span className="text-brand-amber  relative inline-block">
                                {typedText}
                                <span className="inline-block  w-[3px] h-[0.85em] bg-brand-amber ml-1.5 animate-pulse align-middle" />
                            </span>{' '}
                            <br />
                            for Everyone.
                        </h1>

                        {/* Subtitle */}
                        <p className="text-slate-200 text-base sm:text-lg  lg:text-xl font-normal leading-relaxed mb-8 max-w-2xl">
                            We promote <strong className="text-white font-semibold">human rights, constitutionalism, access to justice and accountable democracy </strong> working with communities to turn constitutional rights into everyday realities.
                        </p>

                        {/* Two Action Buttons in a Row */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
                            <Link
                                href="/what-we-do"
                                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-rust hover:bg-brand-rust-dark text-white font-bold text-sm sm:text-base rounded-md transition duration-200 shadow-lg shadow-brand-rust/30 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span>Explore Our Causes</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <Link
                                href="/about"
                                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 border-2 border-white/70 hover:border-white hover:bg-white/10 text-white font-bold text-sm sm:text-base rounded-md transition duration-200 backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span>About Chapter IV</span>
                                <ChevronRight className="w-4 h-4 text-brand-amber" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Hero Column: Animated Cutout Image changing in sync */}
                    <div className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0">
                        <div className="relative w-full max-w-md lg:max-w-none flex justify-center min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] items-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={heroSlides[slideIndex].rightImage + slideIndex}
                                    initial={{ opacity: 0, y: 25, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.97 }}
                                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative flex justify-center w-full"
                                >
                                    <img
                                        src={heroSlides[slideIndex].rightImage}
                                        alt={heroSlides[slideIndex].rightAlt}
                                        className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto max-h-[500px] lg:max-h-[560px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)] select-none pointer-events-none"
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
                        {/* Search & Filter Container (Repositioned from Hero) */}
                        <div className="lg:col-span-7">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider text-brand-rust flex items-center gap-1.5">
                                    <Search className="w-3.5 h-3.5" />
                                    <span>Search Legal Advisories & Field Reports</span>
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium">Chapter Four Archive</span>
                            </div>

                            <form
                                onSubmit={handleSearch}
                                className="bg-slate-50 rounded-xl p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 border border-slate-200 focus-within:border-brand-rust focus-within:ring-2 focus-within:ring-brand-rust/20 transition"
                                data-purpose="repositioned-search"
                            >
                                {/* Resource Type Dropdown */}
                                <div className="flex items-center border-b sm:border-b-0 sm:border-r border-slate-200 px-3 py-1.5">
                                    <FileText className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                                    <select
                                        value={resourceType}
                                        onChange={(e) => setResourceType(e.target.value)}
                                        className="text-xs font-semibold text-slate-700 bg-transparent border-none focus:ring-0 cursor-pointer pr-6 py-0 focus:outline-none"
                                    >
                                        <option value="All">All Resources</option>
                                        <option value="reports">Field Reports</option>
                                        <option value="statements">Legal Statements</option>
                                        <option value="publications">Publications</option>
                                        <option value="research">Legal Research</option>
                                    </select>
                                </div>

                                {/* Text Input */}
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search legal briefs, bail guides, court rulings..."
                                    className="w-full text-xs sm:text-sm px-3 py-2 text-slate-800 placeholder-slate-400 bg-transparent border-none focus:ring-0 focus:outline-none"
                                />

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="bg-brand-rust hover:bg-brand-rust-dark text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-lg transition shrink-0 flex items-center justify-center gap-1.5 shadow-sm"
                                >
                                    <Search className="w-3.5 h-3.5" />
                                    <span>Search</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* 3. THE CHALLENGE (Problem Statement)                               */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden border-b border-slate-200" data-purpose="the-challenge">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        {/* Animated Images Component (Left Column - Faithful replica of 51679 site component) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="w-full lg:w-1/2 order-2 lg:order-1 flex justify-center py-6"
                        >
                            <BoxImgAnimate />
                        </motion.div>

                        {/* Text Side (Right Column) */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="w-full lg:w-1/2 order-1 lg:order-2"
                        >
                            <span className="text-sm font-bold uppercase tracking-widest text-brand-rust mb-3 flex items-center gap-2">
                                <span className="w-8 h-0.5 bg-brand-rust"></span>
                                Why We Exist
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-black mb-8 text-slate-900 leading-tight tracking-tight">
                                Bridging the Gap Between Law and Reality
                            </h2>
                            <p className="text-lg text-slate-600 mb-6 leading-relaxed font-medium">
                                While the Constitution of the Republic of Malawi guarantees fundamental rights and freedoms, many individuals and communities still experience exclusion, discrimination, poverty, and marginalization.
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                We exist to ensure that the Bill of Rights serves as the foundation for a just society, transforming legal guarantees into practical realities for those who face barriers to accessing justice.
                            </p>

                            <div className="mt-10 flex gap-4">
                                <Link
                                    href="/about"
                                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition shadow-xl shadow-slate-900/20"
                                >
                                    <span>Read Our Full Story</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* 4. WHO WE ARE (Parallax Fixed Background)                          */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            <section
                className="relative bg-fixed bg-cover bg-center py-32"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=2000")' }}
            >
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-slate-900/95"></div>

                <div className="relative z-10 px-4 sm:px-8 max-w-7xl mx-auto text-white">
                    {/* Top Title & Opening Statement */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto mb-20"
                    >
                        <span className="text-brand-amber text-sm font-bold uppercase tracking-widest mb-4 block">Who We Are</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
                            Defenders of Dignity, Equality & Freedom
                        </h2>
                        <p className="text-xl md:text-2xl font-light italic text-slate-300 relative inline-block px-8">
                            <span className="absolute top-0 left-0 text-5xl text-brand-amber/30">"</span>
                            We are Chapter Four—an independent, youth-led human rights organization committed to the promotion and protection of universally recognized human rights.
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
                                <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800" alt="Youth" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                            </div>
                            <div className="absolute bottom-0 right-0 w-3/4 h-56 sm:h-72 border-[6px] border-brand-rust rounded-2xl overflow-hidden shadow-2xl z-20 transform rotate-2">
                                <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800" alt="Education" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
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
                                <h3 className="text-3xl font-black text-brand-amber mb-4">Our Origin & Mission</h3>
                                <div className="w-16 h-1 bg-brand-rust mb-6"></div>
                            </div>

                            <p className="text-slate-300 leading-relaxed text-lg">
                                Established in 2016 as a human rights movement of students in Malawi, we derive our name from Chapter IV of the Constitution, which domesticates fundamental rights and freedoms.
                            </p>
                            <p className="text-slate-300 leading-relaxed text-lg">
                                We believe that human dignity, equality, freedom, justice, and accountability are essential. Our mission is to promote and protect constitutional rights, strengthen access to justice, and empower citizens towards accountable and democratic governance.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                                {[
                                    'Non-partisan & independent',
                                    'Human Rights-Based Approach',
                                    'Dedicated to the vulnerable',
                                    'Youth-led & progressive'
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
            <section className="py-24 bg-slate-50 relative overflow-hidden" data-purpose="news-and-resources">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <span className="text-sm font-bold uppercase tracking-widest text-brand-rust mb-3 block">Latest Updates</span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">News & Resources</h2>
                        <p className="text-lg text-slate-600">
                            Explore our latest reports, constitutional awareness materials, and community initiatives.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {displayResources.map((item, idx) => (
                            <motion.article
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                key={item.slug || idx}
                                className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300 group border border-slate-100"
                            >
                                <div>
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-brand-rust via-brand-mahogany to-slate-900 group-hover:scale-110 transition-transform duration-700"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <FileText className="w-16 h-16 text-white/20" />
                                        </div>

                                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-brand-rust text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                                            {item.type || 'Resource'}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3">
                                            <Calendar className="w-4 h-4 text-brand-rust" />
                                            <span>{item.published_at || 'Recent'}</span>
                                        </div>
                                        <h3 className="font-bold text-xl text-slate-900 leading-snug mb-3 group-hover:text-brand-rust transition-colors">
                                            {item.title}
                                        </h3>
                                        {item.excerpt && (
                                            <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                                                {item.excerpt}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6 pt-0 mt-4">
                                    <Link
                                        href={`/resources/${item.slug}`}
                                        className="inline-flex items-center gap-2 text-sm font-bold text-brand-rust hover:text-brand-brick group-hover:gap-3 transition-all"
                                    >
                                        <span>Read More</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link
                            href="/resources"
                            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white border-2 border-slate-200 hover:border-brand-rust text-slate-900 hover:text-brand-rust font-bold rounded-lg transition-colors shadow-sm"
                        >
                            <span>View All Resources</span>
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* 8. STRATEGIC PARTNERS & ALLIES SECTION                              */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            {partners && partners.length > 0 && (
                <section className="py-14 bg-slate-50 border-t border-slate-200/60" aria-label="Partners">
                    <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-6">
                            Allies, Donors & Institutional Partners
                        </span>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                            {partners.map((p, idx) => (
                                <div key={p.name + idx} className="grayscale hover:grayscale-0 transition opacity-75 hover:opacity-100">
                                    {p.website ? (
                                        <a href={p.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-bold text-slate-700 text-sm">
                                            <span>{p.name}</span>
                                            <ExternalLink className="w-3 h-3 text-slate-400" />
                                        </a>
                                    ) : (
                                        <span className="font-bold text-slate-700 text-sm">{p.name}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
