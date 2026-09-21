import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Users, Accessibility, Scale, Target, Lightbulb, Handshake, TreePine, Lock, Zap, RefreshCw, Layers } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function ApproachToProgramming() {
    const hrbaEmphases = [
        { label: "Participation and inclusion", icon: Users },
        { label: "Equality and non-discrimination", icon: Scale },
        { label: "Accountability and transparency", icon: Lock },
        { label: "Empowerment and legal literacy", icon: Lightbulb },
        { label: "Evidence-based advocacy", icon: Target },
        { label: "Community ownership", icon: Handshake },
        { label: "Gender responsiveness", icon: Accessibility },
        { label: "Disability inclusion", icon: Zap },
        { label: "Youth participation", icon: TreePine },
        { label: "Peace building", icon: Handshake },
        { label: "Sustainability and institutional strengthening", icon: Layers }
    ];

    return (
        <PublicLayout>
            <Head>
                <title>Approach to Programming — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Chapter Four applies a Human Rights-Based Approach (HRBA) to all its interventions."
                />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/paliament.jpg"
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
                            <span className="w-8 h-0.5 bg-brand-amber"></span> Methodology
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Approach to Programming
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                            Applying a Human Rights-Based Approach (HRBA) to empower communities as rights holders and hold institutions accountable as duty bearers.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Human Rights-Based Approach</h2>
                            <p className="text-slate-600 leading-relaxed text-lg mb-6">
                                Chapter Four applies a Human Rights-Based Approach (HRBA) to all its interventions. The organization recognizes individuals and communities as rights holders and public institutions and other relevant actors as duty bearers.
                            </p>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                We combine community-level interventions with research, advocacy, litigation support where appropriate, policy engagement and institutional dialogue to address both immediate human rights concerns and their underlying structural causes.
                            </p>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
                                <img
                                    src="/images/Chief_Justice.jpg"
                                    alt="Community Engagement"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-brand-rust/20 mix-blend-multiply"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Emphases Grid */}
            <section className="py-24 bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <RefreshCw className="w-12 h-12 text-brand-amber mx-auto mb-6" />
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Our Programming Emphasizes</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {hrbaEmphases.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:border-brand-amber hover:shadow-md transition-all group"
                                >
                                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-amber/10 transition-colors">
                                        <Icon className="w-6 h-6 text-slate-700 group-hover:text-brand-amber transition-colors" />
                                    </div>
                                    <p className="font-semibold text-slate-800 text-sm">{item.label}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
