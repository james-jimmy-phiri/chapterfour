import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, Share2, Linkedin, Facebook } from 'lucide-react';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import TeamMemberModal, { TeamMember } from '@/Components/TeamMemberModal';

interface BoardOfTrusteesProps {
    trustees?: any[];
}

export default function BoardOfTrustees({ trustees = [] }: BoardOfTrusteesProps) {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    const defaultTrustees: TeamMember[] = [
        {
            name: "Placeholder Trustee 1",
            role: "Chairperson",
            image: "/images/animate-img-4.jpg",
            bio: "Experienced legal professional guiding the strategic direction of Chapter Four."
        },
        {
            name: "Placeholder Trustee 2",
            role: "Vice Chairperson",
            image: "/images/animate-img-5.jpg",
            bio: "Advocate for human rights and constitutionalism with over 20 years of experience."
        },
        {
            name: "Placeholder Trustee 3",
            role: "Treasurer",
            image: "/images/animate-img-6.jpg",
            bio: "Ensuring financial accountability and transparency in all our operations."
        }
    ];

    const fallbackPhotos = [
        "/images/animate-img-4.jpg",
        "/images/animate-img-5.jpg",
        "/images/animate-img-6.jpg",
        "/images/animate-img-1.jpg",
        "/images/animate-img-2.jpg",
    ];

    const displayTrustees: TeamMember[] = (trustees && trustees.length > 0)
        ? trustees.map((t: any, idx: number) => ({
            name: t.name,
            role: t.role || "Trustee",
            image: t.photo || t.image || fallbackPhotos[idx % fallbackPhotos.length],
            bio: t.biography || t.bio || "Member of the Board of Trustees providing strategic oversight and governance.",
            location: t.department || t.location || "Malawi",
            linkedin: t.social_links?.linkedin || t.linkedin,
            twitter: t.social_links?.twitter || t.twitter,
            email: t.email,
        }))
        : defaultTrustees;

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
                    {/* Header Section */}
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <Briefcase className="w-12 h-12 text-brand-rust mx-auto mb-6" />
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-wider uppercase">
                            Our Governing Body
                        </h2>
                        {/* Minimalist accent line inspired by the reference image */}
                        <div className="w-16 h-1 bg-brand-rust mx-auto mb-6 rounded-full"></div>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            Chapter Four is governed in accordance with its constitution and applicable laws governing non-governmental organizations in Malawi. The Board maintains appropriate governance structures.
                        </p>
                    </div>

                    {/* Board Members Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 mt-8">
                        {displayTrustees.map((member, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
                                className="relative group cursor-pointer"
                                onClick={() => setSelectedMember(member)}
                            >
                                {/* Main Image Container - Removed rounded-2xl for sharp corners[cite: 3] */}
                                <div className="w-full aspect-[3/4] bg-slate-200 overflow-hidden relative shadow-sm group-hover:shadow-lg transition-shadow duration-500">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                    />
                                    {/* Subtle dark gradient overlay that appears on hover for better contrast */}
                                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-500"></div>

                                    {/* Expandable Social Share Button (Top Right)[cite: 3] */}
                                    <div
                                        className="absolute top-4 right-4 flex flex-col bg-white shadow-md z-20 overflow-hidden h-10 hover:h-[120px] transition-all duration-300 ease-in-out"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {/* Share Icon (Always Visible) */}
                                        <a href="#" className="w-10 h-10 flex items-center justify-center shrink-0 text-slate-400 hover:text-brand-rust transition-colors bg-white">
                                            <Share2 className="w-[18px] h-[18px]" />
                                        </a>
                                        {/* LinkedIn Icon (Revealed on Hover) */}
                                        <a href="#" className="w-10 h-10 flex items-center justify-center shrink-0 text-[#0A66C2] hover:bg-slate-50 border-t border-slate-100 transition-colors bg-white">
                                            <Linkedin className="w-[18px] h-[18px]" />
                                        </a>
                                        {/* Facebook Icon (Revealed on Hover) */}
                                        <a href="#" className="w-10 h-10 flex items-center justify-center shrink-0 text-[#1877F2] hover:bg-slate-50 border-t border-slate-100 transition-colors bg-white">
                                            <Facebook className="w-[18px] h-[18px]" />
                                        </a>
                                    </div>
                                </div>

                                {/* Floating Nameplate Overlay - Removed rounded-xl for sharp corners[cite: 3] */}
                                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-[85%] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:shadow-[0_15px_40px_rgb(0,0,0,0.12)] transition-all duration-500 py-6 px-4 text-center z-10 group-hover:-translate-y-2">
                                    <h3 className="text-md font-extrabold text-slate-900 tracking-widest uppercase mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-slate-500 text-sm font-medium italic">
                                        {member.role}
                                    </p>

                                    {/* Hidden 'Read Profile' action that expands on hover */}
                                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-in-out">
                                        <div className="overflow-hidden">
                                            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-center text-xs font-bold text-brand-rust uppercase tracking-widest">
                                                <span>Read Profile</span>
                                                <ArrowRight className="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                                            </div>
                                        </div>
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
