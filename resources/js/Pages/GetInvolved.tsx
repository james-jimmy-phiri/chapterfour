import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Heart, Users, Shield, ArrowRight, CheckCircle2,
    Sparkles, HandHeart, Scale, Building2
} from 'lucide-react';

export default function GetInvolved() {
    return (
        <PublicLayout>
            <Head title="Get Involved - Chapter Four" />

            {/* Header Hero */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(245,158,11,0.12),transparent)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-6">
                            <Users className="w-3.5 h-3.5" /> Collective Action
                        </span>
                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-tight">
                            Stand with Us in the <span className="italic text-gradient-gold">Arena of Justice</span>
                        </h1>
                        <p className="mt-6 text-lg sm:text-xl text-navy-200 leading-relaxed font-light">
                            Constitutional rights thrive when citizens actively organize, monitor, and defend them. Discover how you can participate.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Ways to Get Involved */}
            <section className="py-20 bg-navy-950 border-t border-navy-800/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* 1. Volunteer */}
                        <div id="volunteer" className="p-8 rounded-2xl bg-navy-900/50 border border-navy-800 hover:border-amber-500/30 transition-all flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
                                    <Scale className="w-6 h-6" />
                                </div>
                                <h3 className="font-serif text-2xl text-white font-normal mb-3">Volunteer / Paralegal</h3>
                                <p className="text-navy-300 text-sm font-light leading-relaxed mb-6">
                                    Are you a law student, young lawyer, or community organizer? Join our mobile legal clinics to provide legal aid to vulnerable youth.
                                </p>
                                <ul className="space-y-2 text-xs text-navy-200 mb-6">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-amber-400" /> Police custody monitoring
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-amber-400" /> Community civic education
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-amber-400" /> Human rights reporting
                                    </li>
                                </ul>
                            </div>
                            <Link
                                href="/contact?type=volunteering"
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-navy-800 hover:bg-navy-700 text-amber-400 font-semibold text-xs border border-navy-700 transition-colors"
                            >
                                Apply as Volunteer <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* 2. Partner */}
                        <div id="partner" className="p-8 rounded-2xl bg-navy-900/50 border border-navy-800 hover:border-red-500/30 transition-all flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-6">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <h3 className="font-serif text-2xl text-white font-normal mb-3">Institutional Partners</h3>
                                <p className="text-navy-300 text-sm font-light leading-relaxed mb-6">
                                    We collaborate with donor agencies, development partners, academic institutions, and regional human rights coalitions.
                                </p>
                                <ul className="space-y-2 text-xs text-navy-200 mb-6">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-red-400" /> Joint advocacy research
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-red-400" /> Programmatic co-funding
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-red-400" /> Regional solidarity campaigns
                                    </li>
                                </ul>
                            </div>
                            <Link
                                href="/contact?type=partner"
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-navy-800 hover:bg-navy-700 text-red-400 font-semibold text-xs border border-navy-700 transition-colors"
                            >
                                Partner With Us <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* 3. Support & Solidarity */}
                        <div id="support" className="p-8 rounded-2xl bg-navy-900/50 border border-navy-800 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                                    <HandHeart className="w-6 h-6" />
                                </div>
                                <h3 className="font-serif text-2xl text-white font-normal mb-3">Support Our Work</h3>
                                <p className="text-navy-300 text-sm font-light leading-relaxed mb-6">
                                    Support our pro-bono bail emergency fund, mobile clinic transport, and publications distribution across rural districts.
                                </p>
                                <ul className="space-y-2 text-xs text-navy-200 mb-6">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Legal defense fund
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" /> District civic handbooks
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Youth assembly training
                                    </li>
                                </ul>
                            </div>
                            <Link
                                href="/contact?type=support"
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-navy-950 font-semibold text-xs transition-all shadow-md"
                            >
                                Support Our Mission <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
