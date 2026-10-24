import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Search, Megaphone, GraduationCap, LineChart, Wifi, Layers, HeartPulse, Globe, Shield, Users, BookOpen } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';

interface CrossCuttingActivity {
    id: number;
    area: string;
    description: string | null;
    icon: string | null;
    color_class: string | null;
    bg_class: string | null;
    sort_order: number;
}

interface Props {
    activities?: CrossCuttingActivity[];
}

// Fallback data for when DB table is empty
const FALLBACK_ACTIVITIES: CrossCuttingActivity[] = [
    { id: 0, area: "Research and Knowledge Management", description: "Baseline studies, thematic research, policy analysis, publications, documentation and knowledge-sharing", icon: "Search", color_class: "text-blue-600", bg_class: "bg-blue-50", sort_order: 0 },
    { id: 0, area: "Advocacy and Campaigns", description: "Public campaigns, media engagement, petitions, policy dialogues and stakeholder advocacy", icon: "Megaphone", color_class: "text-red-700", bg_class: "bg-red-50", sort_order: 1 },
    { id: 0, area: "Capacity Building", description: "Training of communities, duty bearers, CSOs, youth, women and community leaders", icon: "GraduationCap", color_class: "text-emerald-600", bg_class: "bg-emerald-50", sort_order: 2 },
    { id: 0, area: "Monitoring, Evaluation and Learning", description: "Programme monitoring, outcome tracking, learning reviews and impact assessments", icon: "LineChart", color_class: "text-purple-600", bg_class: "bg-purple-50", sort_order: 3 },
    { id: 0, area: "Communications and Visibility", description: "Website and social media engagement, media partnerships, publications and public information campaigns", icon: "Wifi", color_class: "text-sky-600", bg_class: "bg-sky-50", sort_order: 4 },
    { id: 0, area: "Institutional Development", description: "Resource mobilization, partnership development, staff capacity building, governance strengthening and organizational systems development", icon: "Layers", color_class: "text-amber-600", bg_class: "bg-amber-50", sort_order: 5 },
    { id: 0, area: "Safeguarding and Inclusion", description: "Mainstreaming gender, disability inclusion, child protection, safeguarding and non-discrimination across programmes", icon: "HeartPulse", color_class: "text-rose-600", bg_class: "bg-rose-50", sort_order: 6 },
];

const ICON_MAP: Record<string, React.ElementType> = {
    Search, Megaphone, GraduationCap, LineChart, Wifi, Layers, HeartPulse, Globe, Shield, Users, BookOpen,
};

export default function CrossCuttingActivities({ activities = [] }: Props) {
    const displayActivities = activities.length > 0 ? activities : FALLBACK_ACTIVITIES;

    return (
        <PublicLayout>
            <Head>
                <title>Cross-Cutting Activities | Chapter Four Malawi</title>
                <meta
                    head-key="description"
                    name="description"
                    content="Integrated strategic operations embedded across all thematic pillars of Chapter Four Malawi's human rights and constitutional defense work."
                />
                <meta
                    head-key="robots"
                    name="robots"
                    content="index, follow"
                />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img src="/images/animate-img-1.jpg" alt="Background" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
                        <span className="text-brand-amber font-bold tracking-widest uppercase mb-4 block flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-brand-amber" /> Integrated Approaches
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">Cross-Cutting Activities</h1>
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
                        {displayActivities.map((activity, idx) => {
                            const Icon = activity.icon ? (ICON_MAP[activity.icon] ?? Layers) : Layers;
                            return (
                                <motion.div key={activity.id || idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                                    <div className={`w-14 h-14 rounded-xl ${activity.bg_class ?? 'bg-slate-100'} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <Icon className={`w-7 h-7 ${activity.color_class ?? 'text-slate-500'}`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{activity.area}</h3>
                                    {activity.description && <p className="text-slate-600 leading-relaxed">{activity.description}</p>}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
