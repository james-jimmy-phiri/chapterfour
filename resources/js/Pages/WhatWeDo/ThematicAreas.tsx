import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Shield, Scale, Globe, BookOpen, FileText, Heart, Search, Users } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function ThematicAreas() {
    const thematicAreas = [
        {
            title: "Human Rights and Constitutionalism",
            description: "Promoting knowledge and protection of rights guaranteed under the Constitution and relevant international and regional human rights instruments.",
            icon: Shield,
            image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Access to Justice and Legal Empowerment",
            description: "Supporting communities and vulnerable groups to understand their legal rights, access appropriate remedies and engage with justice institutions.",
            icon: Scale,
            image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Democracy and Good Governance",
            description: "Promoting accountable, transparent, participatory and responsive governance and strengthening citizens' participation in democratic processes.",
            icon: Globe,
            image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Civic and Human Rights Education",
            description: "Providing communities, young people, duty bearers and other stakeholders with information and skills necessary to understand and exercise their rights and responsibilities.",
            icon: BookOpen,
            image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Policy and Legislative Advocacy",
            description: "Conducting policy and legal analysis and advocating for laws and policies that comply with constitutional and human rights standards.",
            icon: FileText,
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Protection of Vulnerable and Marginalized Groups",
            description: "Promoting equality and non-discrimination and addressing rights violations affecting women, children, persons with disabilities, persons with albinism, refugees, displaced persons, minorities and other marginalized groups.",
            icon: Heart,
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Accountability and Human Rights Monitoring",
            description: "Monitoring government and institutional performance, documenting human rights concerns and promoting effective accountability mechanisms.",
            icon: Search,
            image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Research and Knowledge Generation",
            description: "Undertaking research, assessments, policy analysis and documentation to generate evidence for human rights programming, advocacy and policy reform.",
            icon: Users,
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <PublicLayout>
            <Head>
                <title>Thematic Areas of Work — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Explore the key thematic areas where Chapter Four Malawi implements its programmes."
                />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=2000"
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
                            <span className="w-8 h-0.5 bg-brand-amber"></span> What We Do
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Thematic Areas of Work
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                            Chapter Four implements its programmes around eight key thematic areas designed to holistically address human rights and governance challenges in Malawi.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Thematic Areas Grid */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                        {thematicAreas.map((area, idx) => {
                            const Icon = area.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: (idx % 2) * 0.1 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group flex flex-col sm:flex-row"
                                >
                                    <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                                        <img 
                                            src={area.image} 
                                            alt={area.title} 
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-brand-rust/20 group-hover:bg-transparent transition-colors duration-300"></div>
                                        <div className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                                            <Icon className="w-5 h-5 text-brand-rust" />
                                        </div>
                                    </div>
                                    <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                                        <h3 className="text-xl font-bold text-slate-900 mb-3">{area.title}</h3>
                                        <p className="text-slate-600 leading-relaxed text-sm">{area.description}</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
