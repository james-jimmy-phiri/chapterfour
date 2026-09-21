import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import TeamMemberModal, { TeamMember } from '@/Components/TeamMemberModal';

export default function OurTeam() {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    const teamMembers: TeamMember[] = [
        {
            name: "Placeholder Name",
            role: "Executive Director",
            image: "/images/animate-img-4.jpg",
            bio: "Leading Chapter Four's mission to protect constitutional rights.",
            location: "Lilongwe, Malawi"
        },
        {
            name: "Placeholder Name",
            role: "Head of Legal & Advocacy",
            image: "/images/animate-img-5.jpg",
            bio: "Championing public interest litigation and legal empowerment.",
            location: "Blantyre, Malawi"
        },
        {
            name: "Placeholder Name",
            role: "Programs Manager",
            image: "/images/animate-img-6.jpg",
            bio: "Overseeing community outreach and civic education initiatives.",
            location: "Mzuzu, Malawi"
        }
    ];

    return (
        <PublicLayout>
            <Head>
                <title>Our Team — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Meet the dedicated team at Chapter Four Malawi working to advance human rights and constitutionalism."
                />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/president_muthalika.jpg"
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
                            <span className="w-8 h-0.5 bg-brand-amber"></span> Our People
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Meet Our Team
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                            A passionate group of advocates, researchers, and community organizers dedicated to justice and equality.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Team Grid */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {teamMembers.map((member, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 cursor-pointer flex flex-col h-full"
                                onClick={() => setSelectedMember(member)}
                            >
                                <div className="relative h-80 overflow-hidden shrink-0">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-4 left-0 w-full flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-900 hover:text-[#0A66C2] transition-colors shadow-md">
                                            <Linkedin className="w-5 h-5" />
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-900 hover:text-[#1DA1F2] transition-colors shadow-md">
                                            <Twitter className="w-5 h-5" />
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-900 hover:text-brand-rust transition-colors shadow-md">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow relative bg-white">
                                    {/* Accent Line */}
                                    <div className="absolute top-0 left-8 right-8 h-[2px] bg-brand-amber transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                    
                                    <h3 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-brand-rust transition-colors">{member.name}</h3>
                                    <p className="text-brand-amber font-semibold text-sm tracking-wide uppercase mb-4">{member.role}</p>
                                    <p className="text-slate-600 line-clamp-3 mb-6 flex-grow">{member.bio}</p>
                                    
                                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center text-sm font-bold text-slate-900 group-hover:text-brand-rust transition-colors uppercase tracking-wider">
                                        <span>View Profile</span>
                                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
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
