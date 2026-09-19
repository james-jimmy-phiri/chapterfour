import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
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

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=2000"
                        alt="Background"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-300 mb-6 font-semibold uppercase tracking-wider">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span className="text-slate-500">›</span>
                        <span className="text-brand-amber">Contact Us</span>
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <span className="text-brand-amber font-bold tracking-widest uppercase mb-4 block flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-brand-amber"></span> Reach Out
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Get in Touch
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                            Whether you need legal aid guidance, want to report a human rights violation, or discuss a civic partnership, our team is ready to assist.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Contact Section */}
            <main className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
                        {/* Information Cards (Left) */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-5 space-y-8"
                        >
                            <div>
                                <span className="text-sm font-bold uppercase tracking-wider text-brand-rust block mb-2">
                                    Our Office & Operations
                                </span>
                                <h2 className="text-3xl font-black text-slate-900 mb-4">
                                    How Can We Help You?
                                </h2>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    We operate in Lilongwe with continuous monitoring and mobile legal outreach across all 28 districts of Malawi.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md flex items-start gap-5 group hover:border-brand-rust/30 transition-colors">
                                    <div className="w-14 h-14 rounded-xl bg-brand-rust/10 text-brand-rust flex items-center justify-center shrink-0 group-hover:bg-brand-rust group-hover:text-white transition-colors duration-300">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-1">Head Office</h3>
                                        <p className="text-lg font-bold text-slate-900 leading-tight">P.O. Box 30384, Capital City</p>
                                        <p className="text-slate-600 mt-1">Lilongwe, Malawi</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md flex items-start gap-5 group hover:border-brand-amber/30 transition-colors">
                                    <div className="w-14 h-14 rounded-xl bg-brand-amber/10 text-brand-amber flex items-center justify-center shrink-0 group-hover:bg-brand-amber group-hover:text-white transition-colors duration-300">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-1">Telephone Hotline</h3>
                                        <p className="text-lg font-bold text-slate-900 leading-tight">
                                            <a href="tel:+265888596275" className="hover:text-brand-amber transition">+265 888 596 275</a>
                                        </p>
                                        <p className="text-slate-600 mt-1 flex items-center gap-2">
                                            <Clock className="w-4 h-4" /> 8:00 AM – 5:00 PM CAT
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md flex items-start gap-5 group hover:border-slate-300 transition-colors">
                                    <div className="w-14 h-14 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 group-hover:bg-slate-800 group-hover:text-white transition-colors duration-300">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-1">Email Address</h3>
                                        <p className="text-base font-bold text-slate-900 leading-tight">
                                            <a href="mailto:communication@chapterfourmalawi.org" className="hover:text-slate-600 transition break-all">
                                                communication@chapterfourmalawi.org
                                            </a>
                                        </p>
                                        <p className="text-slate-600 mt-1">Inquiries typically answered within 24 hours</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="rounded-2xl overflow-hidden shadow-lg h-48 relative">
                                <img 
                                    src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&q=80&w=1000" 
                                    alt="Lilongwe Map Location" 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-slate-900/20"></div>
                            </div>
                        </motion.div>

                        {/* Contact Form (Right) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:col-span-7"
                        >
                            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-xl relative overflow-hidden">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-amber/5 rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-rust/5 rounded-tr-full -ml-8 -mb-8 pointer-events-none"></div>

                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Send Us a Secure Message</h3>
                                    <p className="text-slate-600 mb-8">
                                        Please fill out the form below. All rights abuse reports and legal aid inquiries are held under strict client-advocate confidentiality.
                                    </p>

                                    {recentlySuccessful && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="mb-8 p-5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 flex items-start gap-4"
                                        >
                                            <div className="bg-emerald-100 p-2 rounded-full mt-0.5">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-emerald-900 mb-1">Message securely received!</h4>
                                                <p className="text-sm">Thank you for reaching out. Our legal and communications team will review it and respond promptly.</p>
                                            </div>
                                        </motion.div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                                    Full Name <span className="text-brand-rust">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    placeholder="Kondwani Phiri"
                                                    className="w-full text-base px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-rust focus:ring-2 focus:ring-brand-rust/20 outline-none transition-all bg-slate-50 focus:bg-white"
                                                />
                                                {errors.name && <p className="text-xs text-red-600 mt-2 font-medium">{errors.name}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                                    Email Address <span className="text-brand-rust">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    placeholder="kondwani@example.com"
                                                    className="w-full text-base px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-rust focus:ring-2 focus:ring-brand-rust/20 outline-none transition-all bg-slate-50 focus:bg-white"
                                                />
                                                {errors.email && <p className="text-xs text-red-600 mt-2 font-medium">{errors.email}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={data.phone}
                                                    onChange={(e) => setData('phone', e.target.value)}
                                                    placeholder="+265 888 123 456"
                                                    className="w-full text-base px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-rust focus:ring-2 focus:ring-brand-rust/20 outline-none transition-all bg-slate-50 focus:bg-white"
                                                />
                                                {errors.phone && <p className="text-xs text-red-600 mt-2 font-medium">{errors.phone}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                                    Inquiry Type <span className="text-brand-rust">*</span>
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={data.inquiry_type}
                                                        onChange={(e) => setData('inquiry_type', e.target.value)}
                                                        className="w-full text-base px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-rust focus:ring-2 focus:ring-brand-rust/20 outline-none transition-all bg-slate-50 focus:bg-white appearance-none pr-10"
                                                    >
                                                        <option value="General Inquiry">General Inquiry</option>
                                                        <option value="Legal Aid & Defense">Legal Aid & Defense</option>
                                                        <option value="Rights Violation Report">Report Rights Violation</option>
                                                        <option value="Media & Press">Media & Press</option>
                                                        <option value="Partnership & Funding">Partnership & Funding</option>
                                                        <option value="Research Collaboration">Research Collaboration</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                                Subject <span className="text-brand-rust">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={data.subject}
                                                onChange={(e) => setData('subject', e.target.value)}
                                                placeholder="Brief description of the matter"
                                                className="w-full text-base px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-rust focus:ring-2 focus:ring-brand-rust/20 outline-none transition-all bg-slate-50 focus:bg-white"
                                            />
                                            {errors.subject && <p className="text-xs text-red-600 mt-2 font-medium">{errors.subject}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                                Your Message <span className="text-brand-rust">*</span>
                                            </label>
                                            <textarea
                                                rows={5}
                                                required
                                                value={data.message}
                                                onChange={(e) => setData('message', e.target.value)}
                                                placeholder="Please provide details about the legal matter, rights issue, or collaboration proposal..."
                                                className="w-full text-base px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-rust focus:ring-2 focus:ring-brand-rust/20 outline-none transition-all bg-slate-50 focus:bg-white resize-none"
                                            />
                                            {errors.message && <p className="text-xs text-red-600 mt-2 font-medium">{errors.message}</p>}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full py-4 bg-brand-rust hover:bg-brand-rust-dark text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-brand-rust/30 flex justify-center items-center gap-3 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {processing ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    <span>Transmitting securely...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Shield className="w-5 h-5" />
                                                    <span>Submit Secure Inquiry</span>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
}
