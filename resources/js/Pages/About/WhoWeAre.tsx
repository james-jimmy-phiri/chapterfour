import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { CheckCircle2, Shield, Globe, Target } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function WhoWeAre() {
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
                        src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=2000"
                        alt="Background"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
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
                            className="relative"
                        >
                            <div className="aspect-square sm:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1541872526845-866d9ab184ee?auto=format&fit=crop&q=80&w=1000"
                                    alt="Community Engagement"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-8 -left-8 bg-brand-rust p-8 rounded-2xl shadow-xl hidden sm:block max-w-xs text-white">
                                <Shield className="w-10 h-10 mb-4" />
                                <h3 className="font-bold text-lg mb-2">Since 2016</h3>
                                <p className="text-sm opacity-90">Started as a human rights movement of students in Malawi, now making national impact.</p>
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

            {/* Objectives */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-brand-rust font-bold tracking-widest uppercase mb-4 block">Core Goals</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Our Objectives</h2>
                        <p className="text-slate-600 text-lg">
                            To promote a just, inclusive and democratic Malawi in which constitutional rights and freedoms are respected and protected.
                        </p>
                    </div>

                    <div className="space-y-6 max-w-4xl mx-auto">
                        {[
                            "To promote and protect human rights and access to justice by empowering citizens, particularly vulnerable and marginalized groups, to understand, claim and defend their rights, access effective remedies, and promote the rule of law and constitutionalism.",
                            "To strengthen accountable, transparent and democratic governance through human rights monitoring, research, evidence-based advocacy, civic participation and engagement with public institutions to promote laws, policies and practices that uphold constitutional principles.",
                            "To strengthen community-based human rights protection and collaboration by working with communities, government, civil society, development partners and other stakeholders to advance human rights, social inclusion, democratic participation and respect for human dignity."
                        ].map((objective, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="flex gap-4 bg-slate-50 p-6 rounded-xl border border-slate-100 hover:shadow-md transition-shadow"
                            >
                                <CheckCircle2 className="w-6 h-6 text-brand-rust shrink-0 mt-1" />
                                <p className="text-slate-700 leading-relaxed">{objective}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
