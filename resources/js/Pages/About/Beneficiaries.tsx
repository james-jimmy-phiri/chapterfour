import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Users, HeartHandshake, Baby, Accessibility, Tent, TreePine } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Beneficiaries() {
    const beneficiaryGroups = [
        { title: "Women and Girls", icon: HeartHandshake, description: "Empowering women and girls to claim their rights and challenging discriminatory practices." },
        { title: "Children and Young People", icon: Baby, description: "Protecting the rights of the next generation and promoting youth participation." },
        { title: "Persons with Disabilities", icon: Accessibility, description: "Advocating for inclusive policies and equal access to justice and services." },
        { title: "Refugees and Displaced Persons", icon: Tent, description: "Ensuring protection and rights for those forced to flee their homes." },
        { title: "Rural and Disadvantaged Communities", icon: TreePine, description: "Bridging the justice gap for economically marginalized populations." },
        { title: "Survivors of Human Rights Violations", icon: Users, description: "Providing legal support and seeking redress for victims of abuse." }
    ];

    return (
        <PublicLayout>
            <Head>
                <title>Target Beneficiaries — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Chapter Four works with a broad range of rights holders, focusing on people and communities facing vulnerability or barriers to accessing justice."
                />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=2000"
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
                            <span className="w-8 h-0.5 bg-brand-amber"></span> Who We Serve
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Target Beneficiaries
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                            Working with rights holders facing heightened vulnerability and barriers to accessing justice and public services.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Empowering the Vulnerable</h2>
                            <p className="text-slate-600 leading-relaxed text-lg mb-6">
                                Chapter Four works with a broad range of rights holders, with particular attention to people and communities facing heightened vulnerability or barriers to accessing justice and public services.
                            </p>
                            <p className="text-slate-600 leading-relaxed text-lg mb-6">
                                The organization also works closely with duty bearers, including government ministries, departments and agencies, local authorities, law enforcement agencies, justice institutions and other public institutions to ensure accountability and effective service delivery.
                            </p>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Other targeted groups include persons with albinism, marginalized and excluded communities, and communities affected by governance, environmental and socio-economic challenges.
                            </p>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=1000"
                                alt="Community members"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>

                    {/* Beneficiary Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {beneficiaryGroups.map((group, idx) => {
                            const IconComp = group.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-brand-amber/50 hover:shadow-lg transition-all group"
                                >
                                    <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:bg-brand-rust transition-colors">
                                        <IconComp className="w-7 h-7 text-brand-rust group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{group.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{group.description}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
