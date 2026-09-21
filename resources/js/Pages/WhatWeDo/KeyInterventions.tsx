import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { CheckCircle2, Target } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function KeyInterventions() {
    const interventions = [
        "Constitutional and human rights education",
        "Community legal awareness programmes",
        "Legal and policy research",
        "Human rights monitoring and documentation",
        "Strategic advocacy and policy engagement",
        "Stakeholder consultations and dialogue",
        "Capacity building for community structures and duty bearers",
        "Civic education and democratic participation programmes",
        "Production and dissemination of research and policy publications",
        "Referrals and linkages to legal and support services",
        "Campaigns against discrimination and human rights violations",
        "Institutional accountability initiatives",
        "Strategic partnerships and networks for human rights protection"
    ];

    return (
        <PublicLayout>
            <Head>
                <title>Key Programmatic Interventions — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Explore the key programmatic interventions executed by Chapter Four Malawi to protect human rights."
                />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/chiefjusticeof malawi.jpg"
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
                            <span className="w-8 h-0.5 bg-brand-amber"></span> Action & Impact
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Key Programmatic Interventions
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                            Driving change through targeted actions, from grassroots civic education to high-level strategic advocacy.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <Target className="w-12 h-12 text-brand-rust mb-6" />
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Our Interventions</h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Chapter Four employs a multifaceted approach to fulfilling its mandate. Our key programmatic interventions are designed to create lasting impact by empowering individuals, strengthening institutions, and fostering a culture of human rights and constitutionalism.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <img src="/images/constitutional_book.jpg" alt="Action 1" className="rounded-2xl w-full h-48 object-cover shadow-lg" />
                            <img src="/images/Parliament_Building_of_Malawioutside.jpg" alt="Action 2" className="rounded-2xl w-full h-48 object-cover shadow-lg mt-8" />
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {interventions.map((intervention, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                                className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-start gap-4 hover:border-brand-amber/50 hover:shadow-md transition-all group"
                            >
                                <CheckCircle2 className="w-6 h-6 text-brand-amber shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                <span className="text-slate-700 font-medium leading-relaxed">{intervention}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
