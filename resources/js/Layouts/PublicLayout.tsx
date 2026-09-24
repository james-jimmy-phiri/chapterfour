import { Link, usePage, router } from '@inertiajs/react';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import {
    Menu, X, ChevronDown, ArrowRight,
    Facebook, Twitter, Instagram, Linkedin,
    Mail, Phone, MapPin, CheckCircle2,
    Shield, Scale, Globe, BookOpen, FileText, Heart, Search, Users, Briefcase
} from 'lucide-react';
import ChapterFourLogo from '@/Components/ChapterFourLogo';
import PageLoader from '@/Components/PageLoader';
import BackToTop from '@/Components/BackToTop';

interface NavChild {
    label: string;
    href: string;
    desc?: string;
    icon?: any;
}

interface NavLinkItem {
    label: string;
    href: string;
    children?: NavChild[];
    /* Per-dropdown modal config */
    modalImage?: string;
    modalImageAlt?: string;

    modalHeading?: string;

    modalCta?: string;
    modalCtaHref?: string;
}

const navLinks: NavLinkItem[] = [
    { label: 'Home', href: '/' },
    {
        label: 'About',
        href: '/about',
        modalImage: '/images/animate-img-1.jpg',
        modalImageAlt: 'Chapter Four team and community advocates',

        modalHeading: 'Our People, Purpose & Governance',

        modalCta: 'Explore About Us',
        modalCtaHref: '/about',
        children: [
            { label: 'Who We Are', href: '/about/who-we-are', desc: 'Organization overview, Vision, Mission and objectives', icon: Globe },
            { label: 'Our Team', href: '/about/our-team', desc: 'Meet the people behind Chapter Four', icon: Users },
            { label: 'Board of Trustees', href: '/about/board-of-trustees', desc: 'Our governing body and leadership', icon: Shield },
            { label: 'Beneficiaries', href: '/about/beneficiaries', desc: 'Target groups and communities we serve', icon: Heart },
            { label: 'Institutional Partnerships', href: '/about/institutional-partnerships', desc: 'Governance, management and partners', icon: Scale },
            { label: 'Core Activities', href: '/about/core-activities', desc: 'Profile of activities and expected outputs', icon: BookOpen },
            { label: 'Cross Cutting Activities', href: '/about/cross-cutting-activities', desc: 'Research, advocacy, and capacity building', icon: FileText },
            { label: 'Vacancies', href: '/about/vacancies', desc: 'Open positions and volunteering opportunities', icon: Briefcase },
        ],
    },
    {
        label: 'What We Do',
        href: '/what-we-do',
        modalImage: '/images/constitutional_book.jpg',
        modalImageAlt: 'Chapter Four constitutional law and advocacy work',

        modalHeading: 'Rights-Based Programmes & Interventions',

        modalCta: 'View All Programmes',
        modalCtaHref: '/what-we-do',
        children: [
            { label: 'Thematic Areas of Work', href: '/what-we-do/thematic-areas', desc: 'Promoting human rights, justice, and good governance.', icon: Shield },
            { label: 'Approach to Programming', href: '/what-we-do/approach-to-programming', desc: 'Our Human Rights-Based Approach (HRBA).', icon: Scale },
            { label: 'Key Programmatic Interventions', href: '/what-we-do/key-interventions', desc: 'Education, research, advocacy, and accountability.', icon: Globe },
            { label: 'Our Reports', href: '/what-we-do/our-reports', desc: 'Publications and research insights.', icon: FileText },
        ],
    },
    { label: 'Projects', href: '/projects' },
    { label: 'Resources', href: '/resources' },
    { label: 'News', href: '/news' },
    { label: 'Contact', href: '/contact' },
];

export default function PublicLayout({ children }: PropsWithChildren) {
    const { url, props } = usePage<any>();
    const site = props.site;
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
        setOpenDropdown(null);
    }, [url]);

    const isActive = (href: string) => (href === '/' ? url === '/' : url.startsWith(href));

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setIsSubmitting(true);
        router.post('/newsletter/subscribe', { email, source: 'footer' }, {
            preserveScroll: true,
            onSuccess: () => {
                setSubscribed(true);
                setEmail('');
                setIsSubmitting(false);
            },
            onError: () => {
                setIsSubmitting(false);
            },
        });
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-brand-rust selection:text-white">
            {/* ─── LOTTIE PRELOADER ON PAGE TRANSITIONS & LOAD ──────────────────── */}
            <PageLoader />

            {/* ─── TOP UTILITY BAR (Contacts Bar on Top with z-50) ───────────────── */}
            <aside className="bg-brand-dark text-white text-xs py-2 px-4 sm:px-8 border-b border-white/10 relative z-50" data-purpose="top-utility-bar">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
                    {/* Contact Details */}
                    <div className="flex items-center flex-wrap gap-x-6 gap-y-1">
                        <a
                            className="flex items-center gap-1.5 text-slate-200 hover:text-brand-amber transition"
                            href={`mailto:${site?.contact_email || 'info@chapterfourmw.org'}`}
                        >
                            <Mail className="w-3.5 h-3.5 text-brand-amber" />
                            <span className="text-[11px] sm:text-xs">{site?.contact_email || 'info@chapterfourmw.org'}</span>
                        </a>
                        <a
                            className="md:flex items-center gap-1.5 text-slate-200 hover:text-brand-amber transition"
                            href={`tel:${site?.contact_phone || '+265888596275'}`}
                        >
                            <Phone className="w-3.5 h-3.5 text-brand-amber" />
                            <span className="hidden md:inline text-[11px] sm:text-xs">{site?.contact_phone || '+265 888 596 275'}</span>
                        </a>
                    </div>

                    {/* Social Media & Tagline */}
                    <div className="flex items-center space-x-5">
                        <span className="hidden md:inline text-[11px] text-slate-300 font-medium border-r border-white/20 pr-4">
                            Defending Constitutional Rights & Freedoms
                        </span>
                        <div className="flex items-center space-x-3 text-slate-300">
                            <a aria-label="Facebook" className="hover:text-brand-amber transition" href={site?.facebook_url || "https://facebook.com"} target="_blank" rel="noreferrer">
                                <Facebook className="w-3.5 h-3.5" />
                            </a>
                            <a aria-label="X Twitter" className="hover:text-brand-amber transition" href={site?.twitter_url || "https://twitter.com"} target="_blank" rel="noreferrer">
                                <Twitter className="w-3.5 h-3.5" />
                            </a>
                            <a aria-label="LinkedIn" className="hover:text-brand-amber transition" href={site?.linkedin_url || "https://linkedin.com"} target="_blank" rel="noreferrer">
                                <Linkedin className="w-3.5 h-3.5" />
                            </a>
                            <a aria-label="Instagram" className="hover:text-brand-amber transition" href={site?.instagram_url || "https://instagram.com"} target="_blank" rel="noreferrer">
                                <Instagram className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>
                </div>
            </aside>

            {/* ─── STICKY MAIN HEADER (Overlays Hero with z-40, Glassmorphic) ────── */}
            <header
                className={`sticky top-0 z-40 transition-all duration-300 ${scrolled
                    ? 'bg-white/95 backdrop-blur-md border-b border-white/10 shadow-xl py-2'
                    : 'bg-white/5 backdrop-blur-md border-b border-white/10 shadow-lg py-2.5 sm:py-3'
                    }`}
                data-purpose="site-header"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
                    <div className="flex items-center justify-between h-16 sm:h-20">
                        {/* Official Chapter Four Logo (Prominent Size) */}
                        <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="Chapter Four Home">
                            <ChapterFourLogo variant={scrolled ? 'full' : 'white'} imgClassName="h-14 sm:h-16 lg:h-18 w-auto drop-shadow-md transition-all duration-300" />
                        </Link>

                        {/* Desktop Navigation Menu */}
                        <nav className="hidden lg:flex items-center h-full space-x-7 text-sm font-semibold" data-purpose="primary-navigation">
                            {navLinks.map((link) => (
                                <div key={link.label} className="group h-full flex items-center relative">
                                    <Link
                                        href={link.href}
                                        className={`relative text-sm font-semibold transition-colors duration-200 py-2 flex items-center gap-1.5 ${isActive(link.href)
                                            ? 'text-brand-amber'
                                            : scrolled ? 'text-slate-700 hover:text-brand-rust' : 'text-slate-200 hover:text-white'
                                            }`}
                                    >
                                        <span>{link.label}</span>
                                        {link.children && (
                                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180 ${scrolled ? 'text-slate-500 group-hover:text-brand-rust' : 'text-slate-400 group-hover:text-brand-amber'}`} />
                                        )}
                                        {/* Animated Bottom Line */}
                                        <span
                                            className={`absolute left-0 -bottom-1 h-0.5 bg-brand-amber transition-all duration-300 ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                                                }`}
                                        />
                                    </Link>

                                    {/* Submenu Mega Menu (Appears on Hover) */}
                                    {link.children && (
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[860px] max-w-[90vw] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-3 group-hover:translate-y-0 z-50 pointer-events-none group-hover:pointer-events-auto">
                                            {/* Invisible bridge so mouse moves cleanly from link to dropdown */}
                                            <div className="h-5 w-full absolute -top-5" />

                                            {/* Dropdown Modal Box */}
                                            <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex text-left">
                                                {/* Left: Image Area (38%) */}
                                                <div className="w-[38%] relative bg-slate-900 hidden sm:block shrink-0">
                                                    <img
                                                        src={link.modalImage || '/images/hero/pexels-akoonie-10875242.jpg'}
                                                        alt={link.modalImageAlt || `${link.label} — Chapter Four`}
                                                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] via-[#0a0503]/60 to-transparent" />
                                                    <div className="absolute bottom-0 left-0 p-6 z-10">

                                                        <h4 className="text-white text-base font-bold leading-snug">
                                                            {link.modalHeading || 'Defending Constitutional Freedoms'}
                                                        </h4>

                                                        <Link
                                                            href={link.modalCtaHref || link.href}
                                                            className="inline-flex items-center gap-1.5 text-brand-amber text-xs font-bold mt-3 hover:underline"
                                                        >
                                                            <span>{link.modalCta || 'Explore'}</span>
                                                            <ArrowRight className="w-3.5 h-3.5" />
                                                        </Link>
                                                    </div>
                                                </div>

                                                {/* Right: Bullets / Submenu Items (62%) */}
                                                <div className="w-full sm:w-[62%] p-6 bg-white">
                                                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
                                                        <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                                            {link.label === 'About' ? 'About Chapter Four' : `What We Do at Chapter Four`}
                                                        </h3>
                                                        <Link href={link.href} className="text-[11px] text-slate-400 hover:text-brand-rust transition font-medium">
                                                            View all &rarr;
                                                        </Link>
                                                    </div>
                                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                        {link.children.map((child) => {
                                                            const IconComp = child.icon || Shield;
                                                            return (
                                                                <li key={child.label}>
                                                                    <Link
                                                                        href={child.href}
                                                                        className="flex items-start p-2 rounded-lg group/item hover:bg-slate-50 transition"
                                                                    >
                                                                        {/* Icon: neutral by default, rust on hover */}
                                                                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center group-hover/item:bg-brand-rust group-hover/item:text-white transition-colors mt-0.5">
                                                                            <IconComp className="w-4 h-4" />
                                                                        </div>
                                                                        <div className="ml-2.5">
                                                                            <p className="text-slate-800 font-semibold text-xs group-hover/item:text-brand-rust transition-colors leading-snug">
                                                                                {child.label}
                                                                            </p>
                                                                            {child.desc && (
                                                                                <p className="text-slate-400 text-[10px] mt-0.5 line-clamp-1">
                                                                                    {child.desc}
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    </Link>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Action Button & Mobile Toggle */}
                        <div className="flex items-center space-x-3">
                            <Link
                                href="/contact"
                                className="hidden sm:inline-flex bg-brand-rust hover:bg-brand-rust-dark text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold tracking-wide transition shadow-lg shadow-brand-rust/25 items-center gap-1.5"
                            >
                                <span>Contact Us</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>

                            <button
                                id="mobile-menu-toggle"
                                className={`lg:hidden p-2 rounded-lg border transition ${scrolled
                                    ? 'border-slate-200 text-slate-700 hover:bg-slate-100'
                                    : 'border-white/20 text-slate-200 hover:text-white hover:bg-white/10'
                                    }`}
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label="Toggle mobile menu"
                                aria-expanded={mobileOpen}
                            >
                                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ─── MOBILE DRAWER MENU ─────────────────────────────────────────────── */}
                {mobileOpen && (
                    <div className="lg:hidden bg-[#0e0704] border-b border-white/10 px-4 pt-4 pb-6 space-y-3 animate-fade-in shadow-2xl text-left">
                        {navLinks.map((link) => (
                            <div key={link.label} className="border-b border-white/10 pb-2">
                                {link.children ? (
                                    <div>
                                        <button
                                            onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                                            className="w-full flex items-center justify-between py-2 text-sm font-semibold text-slate-200 hover:text-white"
                                        >
                                            <span>{link.label}</span>
                                            <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.label ? 'rotate-180 text-brand-amber' : ''}`} />
                                        </button>
                                        {openDropdown === link.label && (
                                            <div className="pl-3 space-y-1.5 pt-1">
                                                {link.children.map((child) => (
                                                    <Link
                                                        key={child.label}
                                                        href={child.href}
                                                        className="block py-1.5 text-xs text-slate-400 hover:text-brand-amber"
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className={`block py-2 text-sm font-semibold ${isActive(link.href) ? 'text-brand-amber' : 'text-slate-200 hover:text-white'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <div className="pt-2">
                            <Link
                                href="/get-involved"
                                className="w-full bg-brand-rust hover:bg-brand-rust-dark text-white text-center py-2.5 rounded-lg text-sm font-semibold block shadow-md"
                            >
                                Get Involved
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* ─── PAGE CONTENT (Hero starts right after contacts bar on homepage) ── */}
            <main className="flex-grow -mt-[100px] lg:-mt-[112px]">
                {children}
            </main>

            {/* ─── FLOATING CTA BANNER ────────────────────────────────────────────── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-20 -mb-28 mt-12">
                <div className="bg-[#d95b38] rounded-3xl overflow-hidden shadow-2xl relative grid grid-cols-1 md:grid-cols-12 items-center bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)]" style={{ backgroundSize: '16px 16px' }}>
                    {/* Left Side: Text and Subscribe Form */}
                    <div className="md:col-span-7 p-8 sm:p-12 space-y-6 text-white z-10">
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                            Your Donation Empowers<br />Those In Need
                        </h2>
                        <form
                            className="flex items-center bg-white/20 backdrop-blur-md rounded-full p-1.5 max-w-md border border-white/20"
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <input
                                className="bg-transparent border-0 px-4 py-2 text-sm text-white placeholder-white/80 focus:ring-0 flex-1 focus:outline-none"
                                placeholder="Enter your email"
                                type="email"
                                required
                            />
                            <button
                                className="bg-white text-stone-900 font-bold px-6 py-2.5 rounded-full text-xs hover:bg-stone-100 transition shadow-sm"
                                type="submit"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* Right Side: Cutout Children with HOPE sign */}
                    <div className="md:col-span-5 relative flex justify-center md:justify-end items-end h-64 md:h-full">
                        <img
                            alt="Children with Hope"
                            className="h-64 sm:h-72 object-cover object-top md:rounded-tl-full border-t-4 border-l-4 border-white/20 shadow-2xl"
                            src="/images/book/backcover.jpg"
                        />
                    </div>
                </div>
            </div>

            {/* ─── MAIN NGO FOOTER (Google Stitch replica) ───────────────────── */}
            <footer className="bg-brand-dark text-slate-300 pt-36 pb-8 border-t border-brand-mahogany/40" data-purpose="site-footer">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
                    {/* Col 1: About Info & Address */}
                    <div className="lg:col-span-4">
                        <div className="mb-5">
                            <ChapterFourLogo variant="white" imgClassName="h-10 w-auto" />
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 max-w-sm">
                            Chapter Four is a non-partisan, public interest legal and civic organization dedicated to defending constitutionalism, human rights, and the rule of law in Malawi.
                        </p>
                        <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                            <div className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-brand-amber mt-0.5 shrink-0" />
                                <span>{site?.office_address || 'P.O. Box 30384, Capital City, Lilongwe, Malawi'}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-brand-amber shrink-0" />
                                <a className="hover:text-white transition" href={`tel:${site?.contact_phone || '+265888596275'}`}>{site?.contact_phone || '+265 888 596 275'}</a>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-brand-amber shrink-0" />
                                <a className="hover:text-white transition" href={`mailto:${site?.contact_email || 'info@chapterfourmw.org'}`}>{site?.contact_email || 'info@chapterfourmw.org'}</a>
                            </div>
                        </div>
                    </div>

                    {/* Col 2: Quick Links */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-b border-brand-amber/30 pb-1">
                            Resources
                        </h3>
                        <ul className="space-y-2.5 text-xs sm:text-sm">
                            <li><Link className="hover:text-brand-amber transition" href="/resources?type=report">Field Reports</Link></li>
                            <li><Link className="hover:text-brand-amber transition" href="/resources?type=statement">Legal Statements</Link></li>
                            <li><Link className="hover:text-brand-amber transition" href="/resources?type=press_release">Press Releases</Link></li>
                            <li><Link className="hover:text-brand-amber transition" href="/resources?type=publication">Publications</Link></li>
                            <li><Link className="hover:text-brand-amber transition" href="/resources?type=research">Legal Research</Link></li>
                        </ul>
                    </div>

                    {/* Col 3: Explore */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-b border-brand-amber/30 pb-1">
                            Explore
                        </h3>
                        <ul className="space-y-2.5 text-xs sm:text-sm">
                            <li><Link className="hover:text-brand-amber transition" href="/about">About Us</Link></li>
                            <li><Link className="hover:text-brand-amber transition" href="/about/our-team">Our Team</Link></li>
                            <li><Link className="hover:text-brand-amber transition" href="/what-we-do">What We Do</Link></li>
                            <li><Link className="hover:text-brand-amber transition" href="/projects">Field Projects</Link></li>
                            <li><Link className="hover:text-brand-amber transition" href="/about/vacancies">Vacancies</Link></li>
                            <li><Link className="hover:text-brand-amber transition" href="/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Col 4: Newsletter */}
                    <div className="lg:col-span-4" id="newsletter">
                        <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-2 border-b border-brand-amber/30 pb-1">
                            Newsletter
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 mb-4">
                            Subscribe to receive updates on legal advisories, reports, and constitutional monitoring.
                        </p>
                        {subscribed ? (
                            <div className="bg-emerald-950/60 border border-emerald-500/40 rounded p-3 flex items-center gap-2 text-emerald-300 text-xs">
                                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                                <span>Thank you for subscribing to Chapter Four updates!</span>
                            </div>
                        ) : (
                            <form className="space-y-3" onSubmit={handleSubscribe} data-purpose="newsletter-form">
                                <div className="flex items-center bg-[#1c120b] rounded border border-white/20 p-1 focus-within:border-brand-amber">
                                    <input
                                        className="bg-transparent border-none text-white placeholder-slate-400 text-xs sm:text-sm px-3 py-1.5 w-full focus:ring-0 focus:outline-none"
                                        placeholder="Enter your email address"
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button
                                        className="bg-brand-rust hover:bg-brand-rust-dark text-white text-xs font-bold py-2 px-4 rounded transition shrink-0"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? '...' : 'Subscribe'}
                                    </button>
                                </div>
                                <div className="flex items-start gap-2">
                                    <input
                                        className="mt-0.5 rounded border-slate-600 bg-black/40 text-brand-amber focus:ring-0 w-3.5 h-3.5"
                                        id="terms"
                                        required
                                        type="checkbox"
                                    />
                                    <label className="text-[11px] text-slate-400" htmlFor="terms">
                                        I agree to the <Link href="/privacy" className="underline hover:text-white">privacy policy</Link> and to receive advocacy updates.
                                    </label>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Bottom Copyright and Socials */}
                <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
                    <p>© {new Date().getFullYear()} Chapter Four Malawi. All Rights Reserved. Chapter IV of the Constitution of Malawi.</p>
                    <div className="flex items-center space-x-4">
                        <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
                        <span>•</span>
                        <Link href="/terms" className="hover:text-white transition">Terms of Use</Link>
                        <span>•</span>
                        <Link href="/safeguarding" className="hover:text-white transition">Safeguarding</Link>
                    </div>
                </div>
            </footer>

            {/* Floating Back To Top Button */}
            <BackToTop />
        </div>
    );
}
