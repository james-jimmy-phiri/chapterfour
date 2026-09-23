import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import TeamMemberModal, { TeamMember } from '@/Components/TeamMemberModal';

interface OurTeamProps {
    teamMembers?: any[];
}

export default function OurTeam({ teamMembers = [] }: OurTeamProps) {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    const defaultTeamMembers: TeamMember[] = [
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

    const fallbackPhotos = [
        "/images/animate-img-4.jpg",
        "/images/animate-img-5.jpg",
        "/images/animate-img-6.jpg",
        "/images/animate-img-1.jpg",
        "/images/animate-img-2.jpg",
    ];

    const displayMembers: TeamMember[] = (teamMembers && teamMembers.length > 0)
        ? teamMembers.map((m: any, idx: number) => ({
            name: m.name,
            role: m.role || "Team Member",
            image: m.photo || m.image || fallbackPhotos[idx % fallbackPhotos.length],
            bio: m.biography || m.bio || "Advancing human rights and constitutional freedoms at Chapter Four.",
            location: m.department || m.location || "Lilongwe, Malawi",
            linkedin: m.social_links?.linkedin || m.linkedin,
            twitter: m.social_links?.twitter || m.twitter,
            email: m.email,
        }))
        : defaultTeamMembers;

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
                        src="/images/book/no_silent1.jpg"
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
        {/* Changed lg:grid-cols-3 to lg:grid-cols-4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {displayMembers.map((member, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="group relative bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-200 hover:border-slate-300 cursor-pointer flex flex-col h-full"
                    onClick={() => setSelectedMember(member)}
                >
                    {/* Fixed Image Container using Aspect Ratio */}
                    <div className="relative w-full aspect-square overflow-hidden shrink-0">
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                        
                        {/* Dark overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Social Icons floating up on hover */}
                        <div className="absolute bottom-6 left-0 w-full flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-6 group-hover:translate-y-0">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 hover:text-[#0A66C2] transition-colors shadow-lg">
                                <Linkedin className="w-5 h-5" />
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 hover:text-[#1DA1F2] transition-colors shadow-lg">
                                <Twitter className="w-5 h-5" />
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 hover:text-brand-rust transition-colors shadow-lg">
                                <Mail className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Orange separator bar */}
                    <div className="h-1 w-full bg-gradient-to-r from-brand-rust via-brand-amber to-brand-rust shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-x-0 group-hover:scale-x-100" style={{ transformOrigin: 'center' }}></div>
                    
                    {/* Card Content — Added items-center and text-center */}
                    <div className="p-6 flex flex-col items-center text-center flex-grow relative bg-white">
                        <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-brand-rust transition-colors">{member.name}</h3>
                        <p className="text-brand-amber font-semibold text-xs tracking-wider uppercase mb-4">{member.role}</p>

                        {/* Added w-full and justify-center to center the View Profile button */}
                        <div className="mt-auto pt-4 border-t border-slate-100 w-full flex justify-center items-center text-xs font-bold text-slate-500 group-hover:text-brand-rust transition-colors uppercase tracking-widest">
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
