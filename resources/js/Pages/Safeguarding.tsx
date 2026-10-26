import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Safeguarding() {
    return (
        <PublicLayout>
            <Head>
                <title>Safeguarding Policy | Chapter Four Malawi</title>
                <meta
                    head-key="description"
                    name="description"
                    content="Safeguarding Policy of Chapter Four Malawi. Zero-tolerance against exploitation, child abuse, and harassment across all field operations and legal clinics."
                />
                <meta
                    head-key="robots"
                    name="robots"
                    content="index, follow"
                />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/new/humanrightsadvocacy.jpg"
                        alt="Safeguarding and human rights protection"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/50 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <span className="text-brand-amber font-bold tracking-widest uppercase mb-4 block flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-brand-amber"></span> Protection & Safety
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Safeguarding Policy
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                            Zero tolerance for abuse, exploitation, and discrimination across all our field operations and engagements.
                        </p>
                    </motion.div>
                </div>
            </section>

            <main className="py-14 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-8 prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-sm sm:text-base">
                    <p>
                        Chapter Four enforces an absolute zero-tolerance standard against child exploitation, sexual harassment, abuse of authority, and violence across all its operations, field mobile clinics, research visits, and programmatic activities.
                    </p>
                    <h2 className="text-xl font-bold text-slate-900 mt-6">1. Child & Vulnerable Person Protection</h2>
                    <p>
                        We adhere strictly to the Child Care (Protection and Justice) Act of Malawi, the African Charter on the Rights and Welfare of the Child, and international safeguarding standards. All staff, volunteers, and paralegals sign our mandatory code of conduct before deployment.
                    </p>
                    <h2 className="text-xl font-bold text-slate-900 mt-6">2. Whistleblower & Incident Reporting</h2>
                    <p>
                        Any concerns or suspected breaches of our safeguarding code may be reported directly and confidentially to our independent oversight desk via email: <strong>safeguarding@chapterfourmalawi.org</strong> or hotline: <strong>+265 888 596 275</strong>.
                    </p>
                </div>
            </main>
        </PublicLayout>
    );
}
