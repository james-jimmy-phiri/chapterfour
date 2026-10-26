import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Privacy() {
    return (
        <PublicLayout>
            <Head>
                <title>Privacy Policy | Chapter Four Malawi</title>
                <meta
                    head-key="description"
                    name="description"
                    content="Privacy Policy and data protection protocols of Chapter Four Malawi. Safeguarding user confidentiality, rights reports, and personal data."
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
                        src="/images/new/girls.jpg"
                        alt="Legal and privacy protection"
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
                            <span className="w-8 h-0.5 bg-brand-amber"></span> Legal & Compliance
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Privacy Policy
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                            Safeguarding your rights, confidentiality, and data protection across all our operations, clinics, and digital platforms.
                        </p>
                    </motion.div>
                </div>
            </section>

            <main className="py-14 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-8 prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-sm sm:text-base">
                    <p>
                        Chapter Four is committed to safeguarding the privacy, confidentiality, and data protection rights of all citizens, partners, volunteers, and users of our digital platforms, legal clinics, and advocacy initiatives.
                    </p>
                    <h2 className="text-xl font-bold text-slate-900 mt-6">1. Information Collection</h2>
                    <p>
                        We only collect personal information that you voluntarily submit through our online contact forms, newsletter subscription, legal aid triage intakes, or volunteer applications. This may include your name, email address, telephone number, and details of your inquiry.
                    </p>
                    <h2 className="text-xl font-bold text-slate-900 mt-6">2. Purpose of Processing</h2>
                    <p>
                        Your information is processed strictly for providing legal advice, responding to inquiries, sharing human rights publications, and advancing public interest advocacy. Chapter Four never sells, leases, or trades personal information to commercial entities.
                    </p>
                    <h2 className="text-xl font-bold text-slate-900 mt-6">3. Legal Privilege & Confidentiality</h2>
                    <p>
                        All disclosures regarding ongoing litigation, arbitrary detentions, and human rights violations are protected under advocate-client legal privilege and strict ethical data security protocols.
                    </p>
                </div>
            </main>
        </PublicLayout>
    );
}
