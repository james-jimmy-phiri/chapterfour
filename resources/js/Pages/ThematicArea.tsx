import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Scale, Shield, Compass, ArrowLeft, ArrowRight,
    CheckCircle2, BookOpen, Users, Sparkles, FileText
} from 'lucide-react';

interface ThematicAreaProps {
    area?: {
        title: string;
        slug: string;
        short_description?: string;
        description?: string;
        icon?: string;
        objectives?: string[];
        key_interventions?: string[];
    };
}

export default function ThematicArea({ area }: ThematicAreaProps) {
    const title = area?.title || 'Thematic Area';
    const description = area?.description || area?.short_description || 'Detailed strategic pillar focusing on defending rights and empowering youth.';

    return (
        <PublicLayout>
            <Head title={`${title} - Chapter Four`} />

            {/* Top Bar Navigation */}
            <div className="pt-28 pb-4 bg-navy-950 border-b border-navy-800/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/what-we-do"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to all thematic areas
                    </Link>
                </div>
            </div>

            {/* Hero */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-6">
                            <Sparkles className="w-3.5 h-3.5" /> Pillar Focus
                        </span>
                        <h1 className="font-serif text-4xl sm:text-5xl text-white font-normal leading-tight">
                            {title}
                        </h1>
                        <p className="mt-6 text-lg text-navy-200 font-light leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Details */}
            <section className="py-20 bg-navy-950 border-t border-navy-800/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8 space-y-12">
                            {/* Strategic Focus */}
                            <div>
                                <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-6">
                                    Strategic Scope & Priorities
                                </h2>
                                <p className="text-navy-200 text-base leading-relaxed font-light mb-6">
                                    Under this pillar, Chapter Four mobilizes young advocates, community paralegals, and institutional partners to deliver sustainable legal and civic interventions across Malawi.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                    {[
                                        'Grassroots Civic Awareness & Mobilization',
                                        'Strategic Public Interest Litigation',
                                        'Evidence-Based Policy Memos & Submissions',
                                        'Capacity Building for Community Duty-Bearers',
                                    ].map((item, i) => (
                                        <div key={i} className="p-4 rounded-xl bg-navy-900/60 border border-navy-800 flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                                            <span className="text-sm text-navy-200 font-light">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Key Outcomes */}
                            <div className="p-8 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-950 border border-navy-800">
                                <h3 className="font-serif text-xl text-white font-normal mb-4">
                                    Expected Constitutional Outcomes
                                </h3>
                                <p className="text-navy-300 text-sm font-light leading-relaxed">
                                    Strengthening civic resilience, reducing rights violations against youth, holding state organs accountable to Chapter IV standards, and fostering an informed citizenry capable of claiming justice.
                                </p>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="p-6 rounded-2xl bg-navy-900/60 border border-navy-800">
                                <h4 className="font-serif text-lg text-white font-normal mb-4">Engage with this Pillar</h4>
                                <p className="text-xs text-navy-300 font-light leading-relaxed mb-6">
                                    Partner with our program team, request legal assistance, or invite our advocates to speak in your district.
                                </p>
                                <div className="space-y-3">
                                    <Link
                                        href="/contact"
                                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-semibold text-xs transition-colors"
                                    >
                                        Contact Pillar Lead <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                    <Link
                                        href="/resources"
                                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-medium text-xs border border-navy-700 transition-colors"
                                    >
                                        Related Publications
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
