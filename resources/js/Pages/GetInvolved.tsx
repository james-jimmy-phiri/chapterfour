import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Heart, Users, Shield, ArrowRight, CheckCircle2,
    Scale, Building2, ChevronRight, AlertCircle, Sparkles
} from 'lucide-react';

export default function GetInvolved() {
    return (
        <PublicLayout>
            <Head>
                <title>Get Involved — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Stand with Chapter Four Malawi in defending human rights. Volunteer as a community paralegal, partner with our legal clinic, or support public interest litigation."
                />
            </Head>

            {/* ─── HERO BANNER ─────────────────────────────────────────────── */}
            <section className="hero-pattern text-white py-16 px-4 sm:px-8 border-b border-white/10" data-purpose="hero-banner">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300 mb-4 font-semibold">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span className="text-slate-500">›</span>
                        <span className="text-brand-amber">Get Involved</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
                        Stand with Us for Constitutional Justice
                    </h1>
                    <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
                        Human rights and democratic freedoms thrive when citizens, lawyers, and communities actively organize, observe, and defend them.
                    </p>
                </div>
            </section>

            {/* ─── 3 PILLARS OF ENGAGEMENT ──────────────────────────────────── */}
            <main className="py-16 bg-[#fafafa]">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* 1. Volunteer & Paralegals */}
                        <div id="volunteer" className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-brand-rust/30 transition flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-brand-rust-light text-brand-rust flex items-center justify-center mb-6">
                                    <Scale className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 mb-3">Volunteer / Paralegal</h2>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                    Are you a law student, legal practitioner, or community activist? Join our mobile legal clinics to provide immediate legal triage and pro-bono defense in subordinate courts.
                                </p>
                                <ul className="space-y-2 text-xs text-slate-600 mb-6">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-brand-rust" /> Mobile legal clinic assistance
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-brand-rust" /> Court monitoring & bail advocacy
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-brand-rust" /> Community human rights education
                                    </li>
                                </ul>
                            </div>
                            <Link
                                href="/contact?type=Volunteer"
                                className="btn-primary w-full text-center text-xs py-2.5"
                            >
                                Join Volunteer Network
                            </Link>
                        </div>

                        {/* 2. Partner / Institutional Alliance */}
                        <div id="partner" className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-brand-amber/40 transition flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-brand-amber-light text-brand-amber-dark flex items-center justify-center mb-6">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 mb-3">Institutional Partnerships</h2>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                    We collaborate with civil society organizations, donor agencies, universities, and international human rights bodies to scale systemic advocacy and judicial monitoring.
                                </p>
                                <ul className="space-y-2 text-xs text-slate-600 mb-6">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-brand-amber" /> Joint empirical research & surveys
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-brand-amber" /> Strategic public interest litigation
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-brand-amber" /> Capacity building for duty-bearers
                                    </li>
                                </ul>
                            </div>
                            <Link
                                href="/contact?type=Partnership"
                                className="btn-secondary w-full text-center text-xs py-2.5"
                            >
                                Explore Partnership
                            </Link>
                        </div>

                        {/* 3. Report Violation / Confidential Hotline */}
                        <div id="report" className="p-8 rounded-2xl bg-brand-dark text-white shadow-md flex flex-col justify-between border border-white/10">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-brand-rust text-white flex items-center justify-center mb-6 shadow-sm">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-bold text-white mb-3">Report Rights Violation</h2>
                                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                    Have you or your community witnessed an arbitrary arrest, civic space restriction, or administrative rights abuse? File a report securely with our advocacy unit.
                                </p>
                                <ul className="space-y-2 text-xs text-slate-300 mb-6">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-brand-amber" /> 100% Confidential & Secure
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-brand-amber" /> Direct review by legal counsel
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-brand-amber" /> Rapid legal aid referral
                                    </li>
                                </ul>
                            </div>
                            <Link
                                href="/contact?type=Violation"
                                className="bg-brand-amber hover:bg-brand-amber-dark text-brand-dark font-bold text-xs py-2.5 rounded text-center block transition"
                            >
                                Submit Violation Report
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
}
