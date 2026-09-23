import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Handshake, Scale, Network, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';

interface InstitutionalPartnershipsProps {
    partners?: any[];
}

export default function InstitutionalPartnerships({ partners = [] }: InstitutionalPartnershipsProps) {
    const governancePrinciples = [
        "Transparency",
        "Financial accountability",
        "Effective programme management",
        "Sound human resource practices",
        "Safeguarding and protection",
        "Risk management",
        "Monitoring, evaluation and learning",
        "Compliance with applicable legal and regulatory requirements"
    ];

    const defaultPartners = [
        "Government institutions",
        "Parliament",
        "Local authorities",
        "Traditional and community leadership structures",
        "Civil society organizations",
        "Legal practitioners",
        "Academic institutions",
        "Development partners",
        "Professional associations",
        "Media organizations",
        "International and regional human rights bodies"
    ];

    const displayPartners = partners && partners.length > 0
        ? partners.map(p => p.name || p.title)
        : defaultPartners;

    return (
        <PublicLayout>
            <Head>
                <title>Institutional Partnerships & Governance — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Chapter Four collaborates with multiple actors for sustainable human rights protection and maintains robust governance structures."
                />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/Parliament_Building_of_Malawioutside.jpg"
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
                            <span className="w-8 h-0.5 bg-brand-amber"></span> Collaborations & Leadership
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Institutional Partnerships & Governance
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                            Sustainable human rights protection requires collaboration among multiple actors and robust, accountable management systems.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Institutional Partnerships */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <Handshake className="w-12 h-12 text-brand-rust mb-6" />
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Strategic Partnerships</h2>
                            <p className="text-slate-600 leading-relaxed text-lg mb-8">
                                Chapter Four recognizes that sustainable human rights protection requires collaboration among multiple actors. We actively partner with a diverse range of stakeholders to maximize our impact and ensure a coordinated approach to justice.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {displayPartners.map((partner, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-brand-amber shrink-0 mt-0.5" />
                                        <span className="text-slate-700 font-medium">{partner}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div className="space-y-4 mt-8">
                                <img src="/images/animate-img-3.jpg" alt="Partnership" className="rounded-2xl shadow-lg w-full object-cover aspect-[4/5]" />
                                <div className="bg-brand-rust text-white p-6 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center aspect-square">
                                    <Network className="w-10 h-10 mb-3 text-brand-amber" />
                                    <span className="font-bold">Building Strong Networks</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center aspect-square">
                                    <Scale className="w-10 h-10 mb-3 text-brand-amber" />
                                    <span className="font-bold">Collaborative Justice</span>
                                </div>
                                <img src="/images/hero-bg.jpg" alt="Meetings" className="rounded-2xl shadow-lg w-full object-cover aspect-[4/5]" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Governance and Management */}
            <section className="py-20 bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Building2 className="w-12 h-12 text-slate-800 mx-auto mb-6" />
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Governance and Management</h2>
                        <p className="text-slate-600 text-lg">
                            Chapter Four is governed in accordance with its constitution and applicable laws governing non-governmental organizations in Malawi, maintaining structures for strategic direction, oversight and accountability.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <ShieldCheck className="w-64 h-64 text-slate-900" />
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mb-8 relative z-10 text-center">Our Management Systems Promote:</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                            {governancePrinciples.map((principle, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="bg-slate-50 p-6 rounded-2xl text-center border border-slate-100 hover:border-brand-amber/50 transition-colors"
                                >
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-brand-rust">
                                        <span className="font-bold text-lg">{idx + 1}</span>
                                    </div>
                                    <p className="font-semibold text-slate-700">{principle}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
