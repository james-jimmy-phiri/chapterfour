import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Mail, Phone, MapPin, Send, MessageSquare, Clock,
    CheckCircle2, Sparkles, Shield, Loader2
} from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        inquiry_type: 'General Inquiry',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <PublicLayout>
            <Head title="Contact Us - Chapter Four" />

            {/* Header Hero */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(245,158,11,0.12),transparent)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-6">
                            <MessageSquare className="w-3.5 h-3.5" /> Reach Out
                        </span>
                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-tight">
                            Get in Touch with <span className="italic text-gradient-gold">Our Advocates</span>
                        </h1>
                        <p className="mt-6 text-lg sm:text-xl text-navy-200 leading-relaxed font-light">
                            Whether you need human rights legal guidance, want to collaborate on research, or submit a media inquiry, we are here.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-navy-950 border-t border-navy-800/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Information Cards */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="p-8 rounded-2xl bg-navy-900/50 border border-navy-800">
                                <h3 className="font-serif text-2xl text-white font-normal mb-6">Contact Information</h3>

                                <div className="space-y-6 text-navy-200">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-white font-medium text-sm">Headquarters</div>
                                            <div className="text-xs text-navy-300 font-light mt-1">
                                                Lilongwe, Malawi<br />
                                                Area 10 / City Centre
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-white font-medium text-sm">Direct Inquiries</div>
                                            <div className="text-xs text-navy-300 font-light mt-1">
                                                info@chapterfour.mw<br />
                                                advocacy@chapterfour.mw
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-white font-medium text-sm">Helpline & Office</div>
                                            <div className="text-xs text-navy-300 font-light mt-1">
                                                +265 (0) 1 770 000<br />
                                                Monday – Friday: 08:00 – 17:00 CAT
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-navy-900/60 border border-amber-500/20">
                                <div className="flex items-center gap-3 text-amber-400 mb-2">
                                    <Shield className="w-5 h-5" />
                                    <h4 className="text-sm font-semibold text-white">Emergency Rights Alert</h4>
                                </div>
                                <p className="text-xs text-navy-300 font-light leading-relaxed">
                                    If you or a young person you know faces unlawful police detention or urgent human rights violation, please flag "Urgent Legal Assistance" in the form.
                                </p>
                            </div>
                        </div>

                        {/* Interactive Form */}
                        <div className="lg:col-span-7">
                            <div className="p-8 sm:p-10 rounded-2xl bg-navy-900/50 border border-navy-800">
                                {recentlySuccessful ? (
                                    <div className="text-center py-12 space-y-4">
                                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <h3 className="font-serif text-2xl text-white">Message Received</h3>
                                        <p className="text-navy-300 text-sm font-light max-w-md mx-auto">
                                            Thank you for reaching out to Chapter Four. Your inquiry has been logged in our system and our legal and advocacy team will review it promptly.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-semibold uppercase tracking-wider text-navy-300 mb-2">
                                                    Your Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={data.name}
                                                    onChange={e => setData('name', e.target.value)}
                                                    placeholder="e.g. Chimwemwe Banda"
                                                    className="w-full px-4 py-3 rounded-xl bg-navy-950/80 border border-navy-700 text-white placeholder-navy-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                                                />
                                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold uppercase tracking-wider text-navy-300 mb-2">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={data.email}
                                                    onChange={e => setData('email', e.target.value)}
                                                    placeholder="name@example.com"
                                                    className="w-full px-4 py-3 rounded-xl bg-navy-950/80 border border-navy-700 text-white placeholder-navy-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                                                />
                                                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-semibold uppercase tracking-wider text-navy-300 mb-2">
                                                    Phone / WhatsApp
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={data.phone}
                                                    onChange={e => setData('phone', e.target.value)}
                                                    placeholder="+265 999 000 000"
                                                    className="w-full px-4 py-3 rounded-xl bg-navy-950/80 border border-navy-700 text-white placeholder-navy-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                                                />
                                                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold uppercase tracking-wider text-navy-300 mb-2">
                                                    Inquiry Type
                                                </label>
                                                <select
                                                    value={data.inquiry_type}
                                                    onChange={e => setData('inquiry_type', e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl bg-navy-950/80 border border-navy-700 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                                                >
                                                    <option>General Inquiry</option>
                                                    <option>Legal Aid & Rights Defense</option>
                                                    <option>Partnership & Funding</option>
                                                    <option>Media & Press Interview</option>
                                                    <option>Youth Volunteering</option>
                                                </select>
                                                {errors.inquiry_type && <p className="text-red-400 text-xs mt-1">{errors.inquiry_type}</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-300 mb-2">
                                                Subject *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={data.subject}
                                                onChange={e => setData('subject', e.target.value)}
                                                placeholder="Brief summary of your inquiry"
                                                className="w-full px-4 py-3 rounded-xl bg-navy-950/80 border border-navy-700 text-white placeholder-navy-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                                            />
                                            {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-300 mb-2">
                                                Message Details *
                                            </label>
                                            <textarea
                                                required
                                                rows={5}
                                                value={data.message}
                                                onChange={e => setData('message', e.target.value)}
                                                placeholder="Provide relevant context or details..."
                                                className="w-full px-4 py-3 rounded-xl bg-navy-950/80 border border-navy-700 text-white placeholder-navy-500 text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
                                            />
                                            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-navy-950 font-semibold text-sm transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
                                        >
                                            {processing ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" /> Submit Inquiry
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
