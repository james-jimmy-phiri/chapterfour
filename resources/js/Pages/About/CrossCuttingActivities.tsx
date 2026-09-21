import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Search, Megaphone, GraduationCap, LineChart, Wifi, Layers, HeartPulse } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function CrossCuttingActivities() {
    const activities = [
        {
            area: "Research and Knowledge Management",
            desc: "Baseline studies, thematic research, policy analysis, publications, documentation and knowledge-sharing",
            icon: Search,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            area: "Advocacy and Campaigns",
            desc: "Public campaigns, media engagement, petitions, policy dialogues and stakeholder advocacy",
            icon: Megaphone,
            color: "text-brand-rust",
            bg: "bg-brand-rust/10"
        },
        {
            area: "Capacity Building",
            desc: "Training of communities, duty bearers, CSOs, youth, women and community leaders",
            icon: GraduationCap,
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        },
        {
            area: "Monitoring, Evaluation and Learning",
            desc: "Programme monitoring, outcome tracking, learning reviews and impact assessments",
            icon: LineChart,
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
        {
            area: "Communications and Visibility",
            desc: "Website and social media engagement, media partnerships, publications and public information campaigns",
            icon: Wifi,
            color: "text-sky-600",
            bg: "bg-sky-50"
        },
        {
            area: "Institutional Development",
            desc: "Resource mobilization, partnership development, staff capacity building, governance strengthening and organizational systems development",
            icon: Layers,
            color: "text-amber-600",
            bg: "bg-amber-50"
        },
        {
            area: "Safeguarding and Inclusion",
            desc: "Mainstreaming gender, disability inclusion, child protection, safeguarding and non-discrimination across programmes",
            icon: HeartPulse,
            color: "text-rose-600",
            bg: "bg-rose-50"
        }
    ];

    return (
        <PublicLayout>
            <Head>
                <title>Cross-Cutting Activities — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Activities that span across all thematic areas of Chapter Four Malawi's work."
                />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/animate-img-1.jpg"
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
                            <span className="w-8 h-0.5 bg-brand-amber"></span> Integrated Approaches
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Cross-Cutting Activities
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                            Strategic operations embedded across all our thematic pillars to ensure holistic and sustainable impact.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Grid Section */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {activities.map((activity, idx) => {
                            const Icon = activity.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all group"
                                >
                                    <div className={`w-14 h-14 rounded-xl ${activity.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <Icon className={`w-7 h-7 ${activity.color}`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{activity.area}</h3>
                                    <p className="text-slate-600 leading-relaxed">{activity.desc}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
