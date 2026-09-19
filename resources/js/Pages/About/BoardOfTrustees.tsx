import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import TeamMemberModal, { TeamMember } from '@/Components/TeamMemberModal';

export default function BoardOfTrustees() {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    const trustees: TeamMember[] = [
        {
            name: "Placeholder Trustee 1",
            role: "Chairperson",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
            bio: "Experienced legal professional guiding the strategic direction of Chapter Four."
        },
        {
            name: "Placeholder Trustee 2",
            role: "Vice Chairperson",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
            bio: "Advocate for human rights and constitutionalism with over 20 years of experience."
        },
        {
            name: "Placeholder Trustee 3",
            role: "Treasurer",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
            bio: "Ensuring financial accountability and transparency in all our operations."
        }
    ];

    return (
        <PublicLayout>
            <Head>
                <title>Board of Trustees — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="The Board of Trustees provides strategic direction, oversight and accountability for Chapter Four Malawi."
                />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80&w=2000"
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
                            <span className="w-8 h-0.5 bg-brand-amber"></span> Governance
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Board of Trustees
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                            Providing strategic direction, oversight and accountability to ensure we fulfill our mandate effectively and ethically.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Board Members */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Briefcase className="w-12 h-12 text-brand-rust mx-auto mb-6" />
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 tracking-tight">Our Governing Body</h2>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            Chapter Four is governed in accordance with its constitution and applicable laws governing non-governmental organizations in Malawi. The Board maintains appropriate governance structures.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {trustees.map((member, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 p-8 text-center cursor-pointer flex flex-col h-full"
                                onClick={() => setSelectedMember(member)}
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-rust to-brand-amber transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                
                                <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden mb-8 border-[6px] border-slate-50 shadow-lg group-hover:border-brand-rust/20 transition-colors duration-500 shrink-0">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-brand-rust transition-colors">{member.name}</h3>
                                <p className="text-brand-rust font-semibold text-sm tracking-wide uppercase mb-6">{member.role}</p>
                                <p className="text-slate-600 text-base leading-relaxed mb-8 flex-grow">{member.bio}</p>
                                
                                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-center text-sm font-bold text-slate-900 group-hover:text-brand-rust transition-colors uppercase tracking-wider">
                                    <span>Read Profile</span>
                                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <TeamMemberModal 
                isOpen={!!selectedMember}
                onClose={() => setSelectedMember(null)}
                member={selectedMember}
            />
        </PublicLayout>
    );
}
