import { Head, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { CheckCircle2, Shield, Globe, Target } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { InteractiveBook } from '@/Components/ui/interactive-book';
import ScrollMorphHero from '@/Components/ui/scroll-morph-hero';

import { PageProps } from '@/types';

export default function WhoWeAre() {
    const { site } = usePage<PageProps>().props;
    const vision = site?.vision || 'A just, democratic and inclusive Malawi where the rights and freedoms guaranteed by the Constitution are respected, protected and enjoyed by all.';
    const mission = site?.mission || 'To promote and protect constitutional rights, strengthen access to justice, empower citizens, and contribute to accountable, democratic and rights-respecting governance.';
    const frontCover = (
        <div className="w-full h-full relative flex flex-col justify-center items-center text-white p-8 text-center bg-slate-900 overflow-hidden">
            <img
                src="/images/book/bookcover.jpg"
                alt="Cover background"
                className="absolute inset-0 w-full h-full object-cover opacity-99 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/10 to-transparent"></div>
            <div className="relative z-10 flex flex-col items-center">
                <img src="/images/logos/logo-white.png" alt="Chapter Four Logo" className="w-32 mb-8" />
                <div className="w-16 h-0.5 bg-brand-amber mb-6"></div>
                <h2 className="text-3xl font-serif font-bold mb-2 tracking-widest leading-tight shadow-sm">ORGANIZATION<br />Book</h2>
                <p className="text-xs text-slate-300 mt-12 uppercase tracking-[0.2em] animate-pulse font-sans">Click to Open</p>
            </div>
        </div>
    );

    const pageStyle = "w-full h-full bg-[#FDFBF7] flex flex-col border-r border-[#E8E1D5] relative text-slate-800 shadow-[inset_10px_0_20px_-10px_rgba(0,0,0,0.05)] overflow-hidden";
    const pageBorder = <div className="absolute inset-[14px] border border-[#E8E1D5] pointer-events-none rounded-sm z-10"></div>;

    const innerPages = [
        // Page 1: Intro / Title
        <div className={pageStyle + " p-8"} key="p1">
            {pageBorder}
            <div className="flex-1 flex flex-col justify-center items-center text-center px-2">
                <h3 className="font-serif text-3xl text-brand-rust font-bold mb-4">Chapter<br />Four</h3>
                <div className="w-12 h-0.5 bg-brand-amber mb-6"></div>
                <p className="text-sm font-serif leading-relaxed text-slate-700 italic">
                    "A youth-led non-governmental organization established to promote, protect and advance human rights, constitutionalism, democracy, social-cohesion, good governance and social justice."
                </p>
            </div>
        </div>,

        // Page 2: Vision & Mission
        <div className={pageStyle + " p-8"} key="p2">
            {pageBorder}
            <div className="flex-1 flex flex-col justify-center">
                <div className="mb-10 text-center mt-4">
                    <h3 className="font-serif text-2xl text-brand-rust font-bold mb-2">Our Vision</h3>
                    <div className="w-8 h-px bg-brand-amber mx-auto mb-5"></div>
                    <p className="text-[13px] font-serif leading-relaxed text-slate-700 px-2">
                        {vision}
                    </p>
                </div>
                <div className="text-center">
                    <h3 className="font-serif text-2xl text-brand-rust font-bold mb-2">Our Mission</h3>
                    <div className="w-8 h-px bg-brand-amber mx-auto mb-5"></div>
                    <p className="text-[13px] font-serif leading-relaxed text-slate-700 px-2">
                        {mission}
                    </p>
                </div>
            </div>
        </div>,

        // Page 3: Quote + Image Bottom
        <div className={pageStyle} key="p3">
            {pageBorder}
            <div className="h-[55%] p-8 flex flex-col justify-center items-center bg-[#FDFBF7]">
                <Shield className="w-6 h-6 text-brand-rust/30 mb-4" />
                <blockquote className="text-center font-serif text-lg italic text-slate-700 leading-relaxed">
                    "Injustice anywhere is a threat to justice everywhere."
                </blockquote>
                <p className="text-center text-[9px] font-sans text-brand-rust font-bold mt-4 tracking-widest uppercase">— Martin Luther King Jr.</p>
            </div>
            <div className="h-[45%] w-full relative">
                <img src="/images/book/racism.jpg" className="w-full h-full object-cover grayscale-[20%]" alt="" />
            </div>
        </div>,

        // Page 4: Core Objectives
        <div className={pageStyle + " p-8"} key="p4">
            {pageBorder}
            <div className="flex-1 flex flex-col justify-center mt-4">
                <h3 className="font-serif text-2xl text-center text-brand-rust font-bold mb-8">Core Objectives</h3>
                <ul className="text-[13px] font-serif text-slate-700 space-y-6 leading-relaxed px-4">
                    <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-brand-amber before:rounded-full">
                        Promote and protect human rights and access to justice by empowering citizens.
                    </li>
                    <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-brand-amber before:rounded-full">
                        Strengthen accountable, transparent and democratic governance through monitoring and advocacy.
                    </li>
                    <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-brand-amber before:rounded-full">
                        Strengthen community-based human rights protection and collaboration.
                    </li>
                </ul>
            </div>
        </div>,

        // Page 5: Image Top + Thematic Areas Bottom
        <div className={pageStyle} key="p5">
            {pageBorder}
            <div className="h-[40%] w-full relative">
                <img src="/images/book/vulnurable.jpg" className="w-full h-full object-cover" alt="" />
            </div>
            <div className="h-[60%] p-6 flex flex-col justify-center bg-[#FDFBF7]">
                <h3 className="font-serif text-xl text-center text-brand-rust font-bold mb-4">Thematic Areas</h3>
                <div className="flex flex-col gap-0 text-[10px] font-sans uppercase tracking-wider text-slate-600 font-semibold px-2 text-center">
                    <div className="py-2.5 border-b border-[#E8E1D5]">Human Rights & Constitutionalism</div>
                    <div className="py-2.5 border-b border-[#E8E1D5]">Access to Justice</div>
                    <div className="py-2.5 border-b border-[#E8E1D5]">Democracy & Good Governance</div>
                    <div className="py-2.5 border-b border-[#E8E1D5]">Civic & Rights Education</div>
                    <div className="py-2.5 border-b border-[#E8E1D5]">Policy & Legislative Advocacy</div>
                    <div className="py-2.5">Protection of Vulnerable Groups</div>
                </div>
            </div>
        </div>,

        // Page 6: Full Image Background + Quote
        <div className={pageStyle + " relative"} key="p6">
            {pageBorder}
            <img src="/images/book/rights_for_all.jpg" className="w-full h-full object-cover absolute inset-0 mix-blend-multiply opacity-40" alt="" />
            <div className="absolute inset-0 bg-[#FDFBF7]/60"></div>
            <div className="relative z-10 w-full h-full p-8 flex flex-col justify-center items-center">
                <Globe className="w-8 h-8 text-brand-amber/60 mx-auto mb-6" />
                <blockquote className="text-center font-serif text-lg italic text-slate-800 leading-relaxed">
                    "To deny people their human rights is to challenge their very humanity."
                </blockquote>
                <p className="text-center text-[9px] font-sans text-brand-rust font-bold mt-6 tracking-widest uppercase">— Nelson Mandela</p>
            </div>
        </div>,

        // Page 7: Approach & Beneficiaries
        <div className={pageStyle + " p-8"} key="p7">
            {pageBorder}
            <div className="flex-1 flex flex-col justify-center mt-2">
                <div className="mb-10">
                    <h3 className="font-serif text-xl text-center text-brand-rust font-bold mb-4">Our Approach</h3>
                    <p className="text-[13px] font-serif text-slate-700 text-center leading-relaxed px-2">
                        We apply a Human Rights-Based Approach (HRBA) emphasizing participation, inclusion, equality, and evidence-based advocacy.
                    </p>
                </div>
                <div>
                    <h3 className="font-serif text-xl text-center text-brand-rust font-bold mb-4">Target Beneficiaries</h3>
                    <p className="text-[13px] font-serif text-slate-700 text-center leading-relaxed px-2 italic">
                        Women and girls, youth, persons with disabilities, marginalized communities, and survivors of human rights violations.
                    </p>
                </div>
            </div>
        </div>,

        // Page 8: Quote Desmond Tutu + Image Bottom
        <div className={pageStyle} key="p8">
            {pageBorder}
            <div className="h-[50%] p-8 flex flex-col justify-center items-center bg-[#FDFBF7]">
                <Target className="w-6 h-6 text-brand-amber/50 mb-4" />
                <blockquote className="text-center font-serif text-lg italic text-slate-700 leading-relaxed">
                    "If you are neutral in situations of injustice, you have chosen the side of the oppressor."
                </blockquote>
                <p className="text-center text-[9px] font-sans text-brand-amber font-bold mt-4 tracking-widest uppercase">— Desmond Tutu</p>
            </div>
            <div className="h-[50%] w-full relative">
                <img src="/images/book/no_silent.jpg" className="w-full h-full object-cover" alt="" />
            </div>
        </div>,

        // Page 9: Partnerships
        <div className={pageStyle + " p-8"} key="p9">
            {pageBorder}
            <div className="flex-1 flex flex-col justify-center mt-4">
                <h3 className="font-serif text-2xl text-center text-brand-rust font-bold mb-6">Partnerships</h3>
                <p className="text-[13px] font-serif text-slate-700 text-center leading-relaxed px-2 mb-6">
                    Sustainable human rights protection requires collaboration among multiple actors.
                </p>
                <p className="text-[13px] font-serif text-slate-700 text-center leading-relaxed px-2">
                    We partner with government institutions, Parliament, local authorities, traditional leaders, CSOs, and international human rights bodies.
                </p>
            </div>
        </div>,

        // Page 10: Full page stylish image with center circle text
        <div className={pageStyle + " relative"} key="p10">
            {pageBorder}
            <img src="/images/book/stop_killing_us.jpg" className="w-full h-full object-cover absolute inset-0" alt="" />
            <div className="absolute inset-0 bg-slate-900/10"></div>
            <div className="relative z-10 w-full h-full flex justify-center items-center p-6">
                <div className="w-36 h-36 bg-white/95 backdrop-blur-sm rounded-full flex flex-col justify-center items-center p-4 text-center shadow-xl border-4 border-[#FDFBF7]">
                    <span className="font-serif font-bold text-brand-rust text-xl">JUSTICE</span>
                    <span className="font-sans text-[8px] tracking-[0.2em] text-slate-500 uppercase mt-1">For All</span>
                </div>
            </div>
        </div>,

        // Page 11: Governance
        <div className={pageStyle + " p-8"} key="p11">
            {pageBorder}
            <div className="flex-1 flex flex-col justify-center mt-4">
                <h3 className="font-serif text-2xl text-center text-brand-rust font-bold mb-6">Governance</h3>
                <p className="text-[13px] font-serif text-slate-700 text-center leading-relaxed px-2 mb-6">
                    Our management systems promote transparency, financial accountability, and effective programme management.
                </p>
                <div className="w-12 h-px bg-slate-300 mx-auto mb-6"></div>
                <ul className="text-[12px] font-sans text-slate-600 space-y-3 text-center uppercase tracking-wider font-semibold">
                    <li>Accountability</li>
                    <li>Safeguarding</li>
                    <li>Risk Management</li>
                    <li>Compliance</li>
                </ul>
            </div>
        </div>,

        // Page 12: Image Top + Mother Teresa Quote
        <div className={pageStyle} key="p12">
            {pageBorder}
            <div className="h-[45%] w-full relative">
                <img src="/images/book/children.jpg" className="w-full h-full object-cover" alt="" />
            </div>
            <div className="h-[55%] p-8 flex flex-col justify-center items-center bg-[#FDFBF7]">
                <CheckCircle2 className="w-6 h-6 text-brand-rust/30 mb-4" />
                <blockquote className="text-center font-serif text-lg italic text-slate-700 leading-relaxed">
                    "Human rights are not a privilege... They are every human being's entitlement."
                </blockquote>
                <p className="text-center text-[9px] font-sans text-brand-rust font-bold mt-4 tracking-widest uppercase">— Mother Teresa</p>
            </div>
        </div>,

        // Page 13: Image Top + Malcolm X Quote
        <div className={pageStyle} key="p13">
            {pageBorder}
            <div className="h-[45%] w-full relative">
                <img src="/images/book/child.jpg" className="w-full h-full object-cover" alt="" />
            </div>
            <div className="h-[55%] p-8 flex flex-col justify-center items-center bg-[#FDFBF7]">
                <Shield className="w-6 h-6 text-brand-rust/30 mb-4" />
                <blockquote className="text-center font-serif text-lg italic text-slate-700 leading-relaxed">
                    "I'm for truth, no matter who tells it. I'm for justice, no matter who it is for or against."
                </blockquote>
                <p className="text-center text-[9px] font-sans text-brand-rust font-bold mt-4 tracking-widest uppercase">— Malcolm X</p>
            </div>
        </div>,

        // Page 14: Full Image Background + Nelson Mandela Quote
        <div className={pageStyle + " relative"} key="p14">
            {pageBorder}
            <img src="/images/book/hands.webp" className="w-full h-full object-cover absolute inset-0 mix-blend-multiply opacity-40" alt="" />
            <div className="absolute inset-0 bg-[#FDFBF7]/60"></div>
            <div className="relative z-10 w-full h-full p-8 flex flex-col justify-center items-center">
                <Globe className="w-8 h-8 text-brand-amber/60 mx-auto mb-6" />
                <blockquote className="text-center font-serif text-lg italic text-slate-800 leading-relaxed">
                    "Overcoming poverty is not a task of charity, it is an act of justice."
                </blockquote>
                <p className="text-center text-[9px] font-sans text-brand-rust font-bold mt-6 tracking-widest uppercase">— Nelson Mandela</p>
            </div>
        </div>,

        // Page 15: Quote Tutu + Image Bottom
        <div className={pageStyle} key="p15">
            {pageBorder}
            <div className="h-[50%] p-8 flex flex-col justify-center items-center bg-[#FDFBF7]">
                <Target className="w-6 h-6 text-brand-amber/50 mb-4" />
                <blockquote className="text-center font-serif text-lg italic text-slate-700 leading-relaxed">
                    "Exclusion is never the way forward on our shared paths to freedom and justice."
                </blockquote>
                <p className="text-center text-[9px] font-sans text-brand-amber font-bold mt-4 tracking-widest uppercase">— Desmond Tutu</p>
            </div>
            <div className="h-[50%] w-full relative">
                <img src="/images/book/childrenfaces.png" className="w-full h-full object-cover" alt="" />
            </div>
        </div>,

        // Page 16: Full Image Background + MLK Quote
        <div className={pageStyle + " relative"} key="p16">
            {pageBorder}
            <img src="/images/book/inner_1.jpg" className="w-full h-full object-cover absolute inset-0 mix-blend-multiply opacity-40" alt="" />
            <div className="absolute inset-0 bg-[#FDFBF7]/60"></div>
            <div className="relative z-10 w-full h-full p-8 flex flex-col justify-center items-center">
                <Shield className="w-8 h-8 text-brand-rust/60 mx-auto mb-6" />
                <blockquote className="text-center font-serif text-lg italic text-slate-800 leading-relaxed">
                    "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that."
                </blockquote>
                <p className="text-center text-[9px] font-sans text-brand-rust font-bold mt-6 tracking-widest uppercase">— Martin Luther King Jr.</p>
            </div>
        </div>,

        // Page 17: Image Top + Malcolm X Quote 2
        <div className={pageStyle} key="p17">
            {pageBorder}
            <div className="h-[45%] w-full relative">
                <img src="/images/book/handsup.webp" className="w-full h-full object-cover" alt="" />
            </div>
            <div className="h-[55%] p-8 flex flex-col justify-center items-center bg-[#FDFBF7]">
                <CheckCircle2 className="w-6 h-6 text-brand-rust/30 mb-4" />
                <blockquote className="text-center font-serif text-lg italic text-slate-700 leading-relaxed">
                    "We are fighting for recognition as free humans in this society."
                </blockquote>
                <p className="text-center text-[9px] font-sans text-brand-rust font-bold mt-4 tracking-widest uppercase">— Malcolm X</p>
            </div>
        </div>,

        // Page 18: Full page stylish image with text (EQUALITY)
        <div className={pageStyle + " relative"} key="p18">
            {pageBorder}
            <img src="/images/book/human-rights-day.jpg" className="w-full h-full object-cover absolute inset-0" alt="" />
            <div className="absolute inset-0 bg-slate-900/20"></div>
            <div className="relative z-10 w-full h-full flex justify-center items-center p-6">
                <div className="w-36 h-36 bg-white/95 backdrop-blur-sm rounded-full flex flex-col justify-center items-center p-4 text-center shadow-xl border-4 border-[#FDFBF7]">
                    <span className="font-serif font-bold text-brand-rust text-xl">EQUALITY</span>
                    <span className="font-sans text-[8px] tracking-[0.2em] text-slate-500 uppercase mt-1">For All</span>
                </div>
            </div>
        </div>,

        // Page 19: Quote Mandela + Image Bottom
        <div className={pageStyle} key="p19">
            {pageBorder}
            <div className="h-[50%] p-8 flex flex-col justify-center items-center bg-[#FDFBF7]">
                <Target className="w-6 h-6 text-brand-amber/50 mb-4" />
                <blockquote className="text-center font-serif text-lg italic text-slate-700 leading-relaxed">
                    "For to be free is not merely to cast off one's chains, but to live in a way that respects and enhances the freedom of others."
                </blockquote>
                <p className="text-center text-[9px] font-sans text-brand-amber font-bold mt-4 tracking-widest uppercase">— Nelson Mandela</p>
            </div>
            <div className="h-[50%] w-full relative">
                <img src="/images/book/children.jpg" className="w-full h-full object-cover grayscale-[20%]" alt="" />
            </div>
        </div>,

        // Page 20: Full Image Background + Tutu Quote
        <div className={pageStyle + " relative"} key="p20">
            {pageBorder}
            <img src="/images/book/racism.jpg" className="w-full h-full object-cover absolute inset-0 mix-blend-multiply opacity-40" alt="" />
            <div className="absolute inset-0 bg-[#FDFBF7]/60"></div>
            <div className="relative z-10 w-full h-full p-8 flex flex-col justify-center items-center">
                <Globe className="w-8 h-8 text-brand-amber/60 mx-auto mb-6" />
                <blockquote className="text-center font-serif text-lg italic text-slate-800 leading-relaxed">
                    "I am not interested in picking up crumbs of compassion... I want the full menu of rights."
                </blockquote>
                <p className="text-center text-[9px] font-sans text-brand-rust font-bold mt-6 tracking-widest uppercase">— Desmond Tutu</p>
            </div>
        </div>,

        // Page 21: Image Top + MLK Quote
        <div className={pageStyle} key="p21">
            {pageBorder}
            <div className="h-[45%] w-full relative">
                <img src="/images/book/vulnurable.jpg" className="w-full h-full object-cover" alt="" />
            </div>
            <div className="h-[55%] p-8 flex flex-col justify-center items-center bg-[#FDFBF7]">
                <Shield className="w-6 h-6 text-brand-rust/30 mb-4" />
                <blockquote className="text-center font-serif text-lg italic text-slate-700 leading-relaxed">
                    "Now is the time to make real the promises of democracy. Now is the time to rise to the sunlit path of racial justice."
                </blockquote>
                <p className="text-center text-[9px] font-sans text-brand-rust font-bold mt-4 tracking-widest uppercase">— Martin Luther King Jr.</p>
            </div>
        </div>,

        // Page 22: Full page stylish image with text (FREEDOM)
        <div className={pageStyle + " relative"} key="p22">
            {pageBorder}
            <img src="/images/book/rights_for_all.jpg" className="w-full h-full object-cover absolute inset-0" alt="" />
            <div className="absolute inset-0 bg-slate-900/20"></div>
            <div className="relative z-10 w-full h-full flex justify-center items-center p-6">
                <div className="w-36 h-36 bg-white/95 backdrop-blur-sm rounded-full flex flex-col justify-center items-center p-4 text-center shadow-xl border-4 border-[#FDFBF7]">
                    <span className="font-serif font-bold text-brand-rust text-xl">FREEDOM</span>
                    <span className="font-sans text-[8px] tracking-[0.2em] text-slate-500 uppercase mt-1">For All</span>
                </div>
            </div>
        </div>,

        // Page 23: Ending Statement
        <div className={pageStyle + " p-8"} key="p23">
            {pageBorder}
            <div className="flex-1 flex flex-col justify-center items-center mt-4 px-4 text-center">
                <Globe className="w-10 h-10 text-brand-amber mb-6" />
                <h3 className="font-serif text-xl text-brand-rust font-bold mb-4">A Better Malawi</h3>
                <p className="text-[13px] font-serif text-slate-700 leading-relaxed">
                    Join us in our journey towards a society where every individual's dignity is protected, and constitutional rights are a practical reality for all.
                </p>
            </div>
        </div>,

        // Page 24: Logo Watermark (Blank Page)
        <div className={pageStyle + " justify-center items-center"} key="p24">
            {pageBorder}
            <img src="/images/logos/logo-black.png" alt="Chapter Four Logo" className="w-24 opacity-10 grayscale" />
        </div>
    ];

    const backCover = (
        <div className="w-full h-full relative flex flex-col justify-center items-center text-white p-8 text-center bg-slate-900 overflow-hidden">
            <img
                src="/images/book/backcover.jpg"
                alt="Back cover background"
                className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-slate-900/20"></div>
            <div className="relative z-10 flex flex-col items-center">
                <img src="/images/logos/logo-white.png" alt="Chapter Four Logo" className="w-20 mb-6 opacity-90" />
                <h3 className="font-serif text-xl font-bold tracking-widest text-slate-200">CHAPTER FOUR</h3>
                <p className="font-sans text-[10px] text-brand-amber mt-2 uppercase tracking-[0.3em]">Malawi</p>
            </div>
        </div>
    );

    return (
        <PublicLayout>
            <Head>
                <title>Who We Are — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Chapter Four is a youth-led non-governmental organization established to promote, protect and advance human rights, constitutionalism, democracy, social-cohesion, good governance and social justice."
                />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/open_book_2.png"
                        alt="Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <span className="text-brand-amber font-bold tracking-widest uppercase mb-4 block flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-brand-amber"></span> About Us
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Who We Are
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                            A youth-led movement committed to translating constitutional guarantees into practical realities for all Malawians.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Organization Overview */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Organizational Overview</h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                Chapter Four is a youth-led non-governmental organization established to promote, protect and advance human rights, constitutionalism, democracy, social-cohesion, good governance and social justice. The organization started as a human right movement of students in Malawi in 2016.
                            </p>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                It derives its name from Chapter IV of the Constitution of the Republic of Malawi, which contains and domesticates the fundamental rights and freedoms from the international Bill of Rights. It is founded on the principle that human dignity, equality, freedom, justice and accountability are essential to a democratic society. It remains independent, non-partisan and committed to the promotion and protection of universally recognized human rights.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                It further recognizes the Bill of Rights as the foundation for a just, peaceful, democratic and rights-respecting society. Hence it works to ensure that constitutional rights and freedoms are not merely legal guarantees but are translated into practical realities for individuals and communities, particularly those who experience exclusion, discrimination, poverty, marginalization and barriers to accessing justice.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative flex justify-center items-center"
                        >
                            {/* Interactive 3D book — visible on all screens */}
                            <div className="w-full max-w-md[400px] h-[520px] flex justify-center items-center relative z-10">
                                <InteractiveBook
                                    width={320}
                                    height={480}
                                    frontCover={frontCover}
                                    backCover={backCover}
                                    innerPages={innerPages}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-20 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-white p-10 rounded-2xl shadow-lg border border-slate-100 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-amber/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                            <Globe className="w-12 h-12 text-brand-amber mb-6 relative z-10" />
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">Our Vision</h2>
                            <p className="text-lg text-slate-600 leading-relaxed relative z-10 font-medium">
                                A just, democratic and inclusive Malawi where the rights and freedoms guaranteed by the Constitution are respected, protected and enjoyed by all.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-white p-10 rounded-2xl shadow-lg border border-slate-100 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-rust/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                            <Target className="w-12 h-12 text-brand-rust mb-6 relative z-10" />
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">Our Mission</h2>
                            <p className="text-lg text-slate-600 leading-relaxed relative z-10 font-medium">
                                To promote and protect constitutional rights, strengthen access to justice, empower citizens, and contribute to accountable, democratic and rights-respecting governance in Malawi.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Animated Objectives Section */}
            <ScrollMorphHero />
        </PublicLayout>
    );
}
