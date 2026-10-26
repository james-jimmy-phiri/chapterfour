import { motion, AnimatePresence } from 'framer-motion';
import { X, Linkedin, Twitter, Mail, Briefcase, MapPin } from 'lucide-react';
import { useEffect } from 'react';

export interface TeamMember {
    name: string;
    role: string;
    image: string;
    bio: string;
    longBio?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    location?: string;
}

interface TeamMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    member: TeamMember | null;
}

const getFormattedBioParagraphs = (bio?: string): string[] => {
    if (!bio) return [];
    
    // First, split by existing newline breaks if any
    const rawParagraphs = bio.split(/\r?\n+/).map(p => p.trim()).filter(Boolean);
    
    if (rawParagraphs.length > 1) {
        return rawParagraphs;
    }
    
    // If it's a single block of text, check if it has multiple sentences to break into readable paragraphs
    const singleText = rawParagraphs[0] || '';
    const sentences = singleText.match(/[^.!?]+[.!?]+(\s|$)/g);
    
    if (sentences && sentences.length >= 3) {
        const paragraphs: string[] = [];
        let current = '';
        sentences.forEach((sentence, idx) => {
            current += sentence;
            // Group every 2 sentences into a paragraph
            if ((idx + 1) % 2 === 0 || idx === sentences.length - 1) {
                paragraphs.push(current.trim());
                current = '';
            }
        });
        if (current.trim()) {
            paragraphs.push(current.trim());
        }
        return paragraphs;
    }
    
    return [singleText];
};

export default function TeamMemberModal({ isOpen, onClose, member }: TeamMemberModalProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!member) return null;

    const bioParagraphs = getFormattedBioParagraphs(member.bio);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 backdrop-blur-md hover:bg-white text-slate-600 hover:text-slate-900 rounded-full flex items-center justify-center transition-all shadow-sm"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Image Section (Left side on desktop, top on mobile) */}
                        <div className="w-full md:w-2/5 h-64 md:h-auto relative shrink-0">
                            <img
                                src={member.image || "/images/default-avatar.jpg"}
                                alt={member.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = "/images/default-avatar.jpg";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-slate-900/10"></div>
                            
                            {/* Mobile overlay text */}
                            <div className="absolute bottom-4 left-6 md:hidden">
                                <h2 className="text-2xl font-black text-white mb-1">{member.name}</h2>
                                <p className="text-brand-amber font-semibold text-sm uppercase tracking-wider">{member.role}</p>
                            </div>
                        </div>

                        {/* Content Section (Right side) */}
                        <div className="w-full md:w-3/5 overflow-y-auto p-6 sm:p-10 md:p-12 bg-slate-50 relative">
                            {/* Desktop header */}
                            <div className="hidden md:block mb-8 pb-6 border-b border-slate-200">
                                <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-2 leading-tight">
                                    {member.name}
                                </h2>
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-rust/10 text-brand-rust rounded-full text-xs font-bold uppercase tracking-wider">
                                        <Briefcase className="w-3.5 h-3.5" />
                                        {member.role}
                                    </span>
                                    {member.location && (
                                        <span className="inline-flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                                            <MapPin className="w-4 h-4" />
                                            {member.location}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Bio Content */}
                            <div className="prose prose-slate max-w-none">
                                {member.longBio ? (
                                    <div className="space-y-4 text-base sm:text-lg leading-relaxed text-slate-600" dangerouslySetInnerHTML={{ __html: member.longBio }} />
                                ) : (
                                    <div className="space-y-4 text-base sm:text-lg leading-relaxed text-slate-600">
                                        {bioParagraphs.map((paragraph, idx) => (
                                            <p key={idx}>{paragraph}</p>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Social Links */}
                            <div className="mt-10 pt-8 border-t border-slate-200 flex items-center gap-4">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Connect:</span>
                                <div className="flex items-center gap-3">
                                    <a href={member.linkedin || '#'} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors shadow-sm">
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                    <a href={member.twitter || '#'} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#1DA1F2] hover:border-[#1DA1F2] transition-colors shadow-sm">
                                        <Twitter className="w-4 h-4" />
                                    </a>
                                    <a href={member.email ? `mailto:${member.email}` : '#'} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-brand-rust hover:border-brand-rust transition-colors shadow-sm">
                                        <Mail className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
