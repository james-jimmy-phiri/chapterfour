import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BookOpen, ShieldAlert, Gavel, Scale, Megaphone, FileText, Globe } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function CoreActivities() {
    const coreObjectives = [
        {
            title: "Promote and protect constitutional rights and access to justice",
            activities: [
                "Conduct community human rights and constitutional awareness programmes",
                "Develop and disseminate simplified constitutional and legal information materials",
                "Conduct legal empowerment and rights-awareness sessions, particularly for vulnerable and marginalized groups",
                "Facilitate referrals and linkages to legal aid and justice institutions",
                "Identify and pursue strategic public interest litigation on significant constitutional and human rights issues",
                "Provide legal research, case preparation and litigation support in public interest cases",
                "Use public interest litigation to challenge unlawful policies, practices and legislation and seek appropriate constitutional remedies",
                "Monitor, document and report human rights violations",
                "Conduct advocacy on emerging human rights concerns"
            ]
        },
        {
            title: "Strengthen accountable, transparent and democratic governance",
            activities: [
                "Conduct research on constitutionalism, governance, human rights and access to justice",
                "Monitor governance and institutional accountability",
                "Undertake policy and legislative analysis",
                "Engage Parliament, government institutions and other duty bearers on human rights and governance issues",
                "Conduct civic education and promote democratic participation",
                "Promote youth and women's participation in governance and civic processes",
                "Conduct public dialogues on democracy, constitutionalism and good governance"
            ]
        },
        {
            title: "Strengthen community-based human rights protection, peacebuilding and collaboration",
            activities: [
                "Establish and strengthen community-based human rights and peace structures",
                "Conduct conflict analysis, prevention and early-warning activities",
                "Facilitate community dialogue, mediation and reconciliation initiatives",
                "Conduct peace, tolerance and social cohesion education",
                "Promote non-violent civic and political participation",
                "Support initiatives addressing discrimination, exclusion and social tensions",
                "Build capacity of community leaders, CSOs and other local actors in human rights and peacebuilding",
                "Develop partnerships with government, CSOs, traditional leaders, media, academia and development partners",
                "Organize national and community-level campaigns on human rights, peace and social justice"
            ]
        }
    ];

    return (
        <PublicLayout>
            <Head>
                <title>Core Activities — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Profile of core activities, planned activities, and expected outputs of Chapter Four Malawi."
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
                            <span className="w-8 h-0.5 bg-brand-amber"></span> Our Impact Model
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Core Activities
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                            A detailed profile of our planned activities and expected outputs across our main programmatic interventions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-slate-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                    <div className="space-y-20">
                        {coreObjectives.map((objective, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7 }}
                            >
                                <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
                                    <div className="w-16 h-16 rounded-2xl bg-brand-rust text-white flex items-center justify-center shrink-0 shadow-lg shadow-brand-rust/30">
                                        {idx === 0 && <Scale className="w-8 h-8" />}
                                        {idx === 1 && <Globe className="w-8 h-8" />}
                                        {idx === 2 && <ShieldAlert className="w-8 h-8" />}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">{objective.title}</h2>
                                        <div className="w-20 h-1 bg-brand-amber rounded-full"></div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {objective.activities.map((activity, aIdx) => (
                                        <div 
                                            key={aIdx} 
                                            className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:border-brand-rust/30 hover:shadow-md transition-all group"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="mt-1 w-2 h-2 rounded-full bg-brand-amber shrink-0 group-hover:scale-150 transition-transform"></div>
                                                <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-medium">{activity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
