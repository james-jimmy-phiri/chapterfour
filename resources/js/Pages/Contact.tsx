import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Mail, Phone, MapPin, Send, MessageSquare, Clock,
    CheckCircle2, Shield, Loader2, AlertCircle
} from 'lucide-react';

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
            <Head>
                <title>Contact Us — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Get in touch with Chapter Four Malawi. Submit a confidential human rights inquiry, request legal guidance, or explore partnership opportunities."
                />
            </Head>

            {/* ─── HERO BANNER ─────────────────────────────────────────────── */}
            <section className="hero-pattern text-white py-16 px-4 sm:px-8 border-b border-white/10" data-purpose="hero-banner">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300 mb-4 font-semibold">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span className="text-slate-500">›</span>
                        <span className="text-brand-amber">Contact Us</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
                        Contact Chapter Four
                    </h1>
                    <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
                        Whether you need legal aid guidance, want to report a human rights violation, or discuss a civic partnership, our team is ready to assist.
                    </p>
                </div>
            </section>

            {/* ─── MAIN CONTACT SECTION ────────────────────────────────────── */}
            <main className="py-16 bg-[#fafafa]">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Information Cards (Left) */}
                        <div className="lg:col-span-5 space-y-6">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-brand-rust block mb-1">
                                    Direct Contact
                                </span>
                                <h2 className="text-2xl font-black text-slate-900">
                                    Our Office & Operations
                                </h2>
                                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                                    We operate in Lilongwe with continuous monitoring and mobile legal outreach across all 28 districts of Malawi.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-brand-rust-light text-brand-rust flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Head Office</h3>
                                        <p className="text-sm font-semibold text-slate-900 mt-0.5">P.O. Box 30384, Capital City</p>
                                        <p className="text-xs text-slate-600">Lilongwe, Malawi</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-brand-amber-light text-brand-amber-dark flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Telephone Hotline</h3>
                                        <p className="text-sm font-semibold text-slate-900 mt-0.5">
                                            <a href="tel:+265888596275" className="hover:text-brand-rust transition">+265 888 596 275</a>
                                        </p>
                                        <p className="text-xs text-slate-500">Available Monday – Friday, 8:00 AM – 5:00 PM CAT</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-brand-olive-light text-brand-olive-dark flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</h3>
                                        <p className="text-sm font-semibold text-slate-900 mt-0.5">
                                            <a href="mailto:communication@chapterfourmalawi.org" className="hover:text-brand-rust transition">
                                                communication@chapterfourmalawi.org
                                            </a>
                                        </p>
                                        <p className="text-xs text-slate-500">Inquiries typically answered within 24 hours</p>
                                    </div>
                                </div>

                                <div className="bg-brand-dark rounded-xl p-5 text-white shadow-sm flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-white/10 text-brand-amber flex items-center justify-center shrink-0">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-brand-amber">Confidentiality Guarantee</h3>
                                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                                            All rights abuse reports and legal aid inquiries are held under strict client-advocate confidentiality.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form (Right) */}
                        <div className="lg:col-span-7">
                            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Send Us a Message</h3>
                                <p className="text-xs text-slate-500 mb-6">
                                    Please fill out the form below and our legal and communications team will follow up promptly.
                                </p>

                                {recentlySuccessful && (
                                    <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                        <span>Thank you! Your inquiry has been safely received. Our legal team will review it.</span>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="e.g. Kondwani Phiri"
                                                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-md border border-slate-300 focus:border-brand-rust focus:ring-1 focus:ring-brand-rust outline-none"
                                            />
                                            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="e.g. kondwani@example.com"
                                                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-md border border-slate-300 focus:border-brand-rust focus:ring-1 focus:ring-brand-rust outline-none"
                                            />
                                            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                placeholder="e.g. +265 888 123 456"
                                                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-md border border-slate-300 focus:border-brand-rust focus:ring-1 focus:ring-brand-rust outline-none"
                                            />
                                            {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                                Inquiry Type *
                                            </label>
                                            <select
                                                value={data.inquiry_type}
                                                onChange={(e) => setData('inquiry_type', e.target.value)}
                                                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-md border border-slate-300 focus:border-brand-rust focus:ring-1 focus:ring-brand-rust outline-none bg-white"
                                            >
                                                <option value="General Inquiry">General Inquiry</option>
                                                <option value="Legal Aid & Defense">Legal Aid & Defense</option>
                                                <option value="Rights Violation Report">Report Rights Violation</option>
                                                <option value="Media & Press">Media & Press</option>
                                                <option value="Partnership & Funding">Partnership & Funding</option>
                                                <option value="Research Collaboration">Research Collaboration</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            placeholder="Brief description of the matter"
                                            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-md border border-slate-300 focus:border-brand-rust focus:ring-1 focus:ring-brand-rust outline-none"
                                        />
                                        {errors.subject && <p className="text-xs text-red-600 mt-1">{errors.subject}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Your Message *
                                        </label>
                                        <textarea
                                            rows={5}
                                            required
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            placeholder="Please provide details about the legal matter, rights issue, or collaboration proposal..."
                                            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-md border border-slate-300 focus:border-brand-rust focus:ring-1 focus:ring-brand-rust outline-none resize-none"
                                        />
                                        {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="btn-primary w-full py-3 mt-2"
                                    >
                                        {processing ? (
                                            <span className="flex items-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                <span>Sending Secure Message...</span>
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <Send className="w-4 h-4" />
                                                <span>Submit Inquiry</span>
                                            </span>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
}
