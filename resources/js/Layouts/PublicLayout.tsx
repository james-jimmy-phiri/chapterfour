import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import {
    Menu, X, ChevronDown, ArrowRight,
    Facebook, Twitter, Instagram, Linkedin, Youtube,
    Mail, Phone, MapPin
} from 'lucide-react';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    {
        label: 'What We Do',
        href: '/what-we-do',
        children: [
            { label: 'Human Rights & Constitutionalism', href: '/what-we-do/human-rights' },
            { label: 'Access to Justice', href: '/what-we-do/access-to-justice' },
            { label: 'Democracy & Governance', href: '/what-we-do/democracy-governance' },
            { label: 'Civic & Human Rights Education', href: '/what-we-do/civic-education' },
            { label: 'Policy & Legislative Advocacy', href: '/what-we-do/policy-advocacy' },
            { label: 'Protection of Vulnerable Groups', href: '/what-we-do/vulnerable-groups' },
            { label: 'Accountability & Monitoring', href: '/what-we-do/accountability' },
            { label: 'Research & Knowledge', href: '/what-we-do/research' },
        ],
    },
    { label: 'Resources', href: '/resources' },
    { label: 'News', href: '/news' },
    { label: 'Contact', href: '/contact' },
];

const footerLinks = {
    'What We Do': [
        { label: 'Human Rights', href: '/what-we-do/human-rights' },
        { label: 'Access to Justice', href: '/what-we-do/access-to-justice' },
        { label: 'Democracy & Governance', href: '/what-we-do/democracy-governance' },
        { label: 'Civic Education', href: '/what-we-do/civic-education' },
        { label: 'Policy Advocacy', href: '/what-we-do/policy-advocacy' },
        { label: 'Accountability', href: '/what-we-do/accountability' },
    ],
    'Resources': [
        { label: 'Publications', href: '/resources?type=publications' },
        { label: 'Reports', href: '/resources?type=reports' },
        { label: 'Statements', href: '/resources?type=statements' },
        { label: 'Press Releases', href: '/resources?type=press-releases' },
        { label: 'Research', href: '/resources?type=research' },
    ],
    'Get Involved': [
        { label: 'Partner With Us', href: '/get-involved#partner' },
        { label: 'Volunteer', href: '/get-involved#volunteer' },
        { label: 'Support Our Work', href: '/get-involved#support' },
        { label: 'Report a Concern', href: '/get-involved#report' },
        { label: 'Newsletter', href: '#newsletter' },
    ],
    'Organisation': [
        { label: 'About Us', href: '/about' },
        { label: 'Our Team', href: '/about#team' },
        { label: 'Our Story', href: '/about#story' },
        { label: 'Partners', href: '/about#partners' },
        { label: 'Contact Us', href: '/contact' },
    ],
};

export default function PublicLayout({ children }: PropsWithChildren) {
    const { url } = usePage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close mobile menu on route change
    useEffect(() => { setMobileOpen(false); }, [url]);

    const isActive = (href: string) => href === '/' ? url === '/' : url.startsWith(href);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) { setSubscribed(true); setEmail(''); }
    };

    return (
        <div className="min-h-screen bg-navy-950 text-white">
            {/* ─── NAVIGATION ─────────────────────────────────────────── */}
            <nav
                id="main-nav"
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? 'glass-dark shadow-glass border-b border-white/8'
                        : 'bg-transparent'
                }`}
            >
                <div className="container-cf">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group" aria-label="Chapter Four Home">
                            <div className="relative w-10 h-10">
                                <div className="absolute inset-0 bg-gold-500 rounded-lg opacity-20 group-hover:opacity-30 transition-opacity" />
                                <div className="relative flex items-center justify-center w-full h-full">
                                    <span className="font-display text-gold-400 text-xl font-normal leading-none">IV</span>
                                </div>
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="font-display text-white text-lg font-normal tracking-wide">Chapter Four</span>
                                <span className="text-gold-400/70 text-[10px] font-sans font-medium tracking-[0.2em] uppercase">Malawi</span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <div ref={dropdownRef} className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <div key={link.label} className="relative">
                                    {link.children ? (
                                        <button
                                            onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                                            className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                                ${isActive(link.href) ? 'text-gold-400' : 'text-white/80 hover:text-white hover:bg-white/5'}`}
                                        >
                                            {link.label}
                                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                                        </button>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                                ${isActive(link.href) ? 'text-gold-400' : 'text-white/80 hover:text-white hover:bg-white/5'}`}
                                        >
                                            {link.label}
                                        </Link>
                                    )}

                                    {/* Dropdown */}
                                    {link.children && openDropdown === link.label && (
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 glass-dark rounded-2xl p-2 shadow-glass border border-white/10 animate-fade-in">
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all duration-150"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500/60 flex-shrink-0" />
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* CTA + Mobile toggle */}
                        <div className="flex items-center gap-3">
                            <Link href="/get-involved" className="hidden lg:inline-flex btn-primary text-sm px-6 py-3">
                                Get Involved
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <button
                                id="mobile-menu-toggle"
                                className="lg:hidden p-2.5 rounded-xl glass text-white hover:text-gold-400 transition-colors"
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label="Toggle mobile menu"
                                aria-expanded={mobileOpen}
                            >
                                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ─── MOBILE MENU ─────────────────────────────────────── */}
                <div
                    className={`lg:hidden transition-all duration-500 ease-expo-out overflow-hidden ${
                        mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="glass-dark border-t border-white/8 px-4 py-6 space-y-1">
                        {navLinks.map((link, i) => (
                            <div key={link.label}>
                                <Link
                                    href={link.href}
                                    className={`flex items-center justify-between w-full px-4 py-4 rounded-xl text-lg font-medium transition-all duration-200
                                        ${isActive(link.href) ? 'text-gold-400 bg-gold-500/10' : 'text-white/80 hover:text-white hover:bg-white/5'}`}
                                    style={{ animationDelay: `${i * 0.05}s` }}
                                >
                                    {link.label}
                                    {link.children && <ChevronDown className="w-4 h-4 text-white/40" />}
                                </Link>
                            </div>
                        ))}
                        <div className="pt-4 border-t border-white/10">
                            <Link href="/get-involved" className="btn-primary w-full justify-center">
                                Get Involved <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* ─── MAIN CONTENT ────────────────────────────────────────── */}
            <main id="main-content">{children}</main>

            {/* ─── FOOTER ──────────────────────────────────────────────── */}
            <footer className="bg-navy-950 border-t border-white/8 pt-20 pb-8">
                <div className="container-cf">
                    {/* Newsletter bar */}
                    <div id="newsletter" className="glass rounded-3xl p-8 lg:p-12 mb-16 relative overflow-hidden">
                        <div className="absolute inset-0 dot-grid opacity-50" />
                        <div className="relative flex flex-col lg:flex-row items-center gap-8">
                            <div className="flex-1 text-center lg:text-left">
                                <h3 className="font-display text-3xl text-white mb-2">Stay Informed</h3>
                                <p className="text-white/60 text-sm">Human rights updates, reports and advocacy news from Chapter Four.</p>
                            </div>
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto min-w-0 lg:min-w-[480px]">
                                {subscribed ? (
                                    <div className="flex-1 flex items-center gap-2 text-gold-400 justify-center">
                                        <span className="text-lg">✓</span>
                                        <span>Thank you for subscribing!</span>
                                    </div>
                                ) : (
                                    <>
                                        <input
                                            type="email"
                                            id="newsletter-email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Your email address"
                                            required
                                            className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/40
                                                       focus:outline-none focus:border-gold-400 focus:bg-white/15 transition-all duration-200 text-sm"
                                        />
                                        <button type="submit" id="newsletter-submit" className="btn-primary py-3.5 px-6 text-sm whitespace-nowrap">
                                            Subscribe
                                        </button>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Footer grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 mb-16">
                        {/* Brand column */}
                        <div className="col-span-2">
                            <Link href="/" className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gold-500/20 rounded-lg flex items-center justify-center">
                                    <span className="font-display text-gold-400 text-xl">IV</span>
                                </div>
                                <div>
                                    <div className="font-display text-white text-lg">Chapter Four</div>
                                    <div className="text-gold-400/70 text-[10px] tracking-[0.2em] uppercase font-sans">Malawi</div>
                                </div>
                            </Link>
                            <p className="text-white/50 text-sm leading-relaxed mb-6">
                                A youth-led organization advancing human rights, constitutionalism, democracy and social justice in Malawi.
                            </p>
                            <p className="text-white/40 text-xs italic font-display mb-6">
                                "Deriving our name from Chapter Four of the Constitution of the Republic of Malawi — the foundation of our fundamental rights."
                            </p>
                            {/* Socials */}
                            <div className="flex items-center gap-3">
                                {[
                                    { Icon: Facebook, href: '#', label: 'Facebook' },
                                    { Icon: Twitter, href: '#', label: 'Twitter' },
                                    { Icon: Instagram, href: '#', label: 'Instagram' },
                                    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                                    { Icon: Youtube, href: '#', label: 'YouTube' },
                                ].map(({ Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        aria-label={label}
                                        className="w-9 h-9 rounded-lg glass flex items-center justify-center text-white/50 hover:text-gold-400 hover:border-gold-500/30 transition-all duration-200"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Link columns */}
                        {Object.entries(footerLinks).map(([section, links]) => (
                            <div key={section}>
                                <h4 className="font-sans font-semibold text-white text-sm uppercase tracking-[0.1em] mb-4">{section}</h4>
                                <ul className="space-y-2.5">
                                    {links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="text-white/50 hover:text-gold-400 text-sm transition-colors duration-200"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Contact info */}
                    <div className="flex flex-wrap gap-6 mb-10 pb-10 border-b border-white/8">
                        {[
                            { Icon: Mail, text: 'info@chapterfour.org', href: 'mailto:info@chapterfour.org' },
                            { Icon: Phone, text: '+265 XXX XXX XXX', href: 'tel:+265' },
                            { Icon: MapPin, text: 'Lilongwe, Malawi', href: '#' },
                        ].map(({ Icon, text, href }) => (
                            <a
                                key={text}
                                href={href}
                                className="flex items-center gap-2 text-white/50 hover:text-white/80 text-sm transition-colors duration-200"
                            >
                                <Icon className="w-4 h-4 text-gold-500/70" />
                                {text}
                            </a>
                        ))}
                    </div>

                    {/* Bottom bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-xs">
                        <span>© {new Date().getFullYear()} Chapter Four. All rights reserved.</span>
                        <div className="flex items-center gap-6">
                            {[
                                { label: 'Privacy Policy', href: '/privacy' },
                                { label: 'Terms of Use', href: '/terms' },
                                { label: 'Safeguarding', href: '/safeguarding' },
                                { label: 'Accessibility', href: '/accessibility' },
                            ].map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="hover:text-white/60 transition-colors duration-200"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
