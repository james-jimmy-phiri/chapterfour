import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Terms() {
    return (
        <PublicLayout>
            <Head>
                <title>Terms of Use | Chapter Four Malawi</title>
                <meta
                    head-key="description"
                    name="description"
                    content="Terms of Use for Chapter Four Malawi digital platform, open access civic materials, publications, and legal information."
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
                        src="/images/constitutional_book.jpg"
                        alt="Terms of use and constitutional governance"
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
                            <span className="w-8 h-0.5 bg-brand-amber"></span> Governance & Terms
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Terms of Use
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                            Guidelines, open civic access protocols, and legal notices governing the use of Chapter Four materials.
                        </p>
                    </motion.div>
                </div>
            </section>

            <main className="py-14 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-8 prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-sm sm:text-base">
                    <p>
                        Welcome to Chapter Four’s digital platform. By accessing or using our website, you agree to adhere to these terms and conditions and respect the civic and educational intent of all published materials.
                    </p>
                    <h2 className="text-xl font-bold text-slate-900 mt-6">1. Open Access & Attribution</h2>
                    <p>
                        Chapter Four champions open civic knowledge. Our reports, policy briefs, and educational resources may be cited, shared, and distributed for non-commercial educational, civic, and academic purposes with appropriate attribution to Chapter Four Malawi.
                    </p>
                    <h2 className="text-xl font-bold text-slate-900 mt-6">2. Legal Disclaimer</h2>
                    <p>
                        Materials published on this website are provided for general civic education and information. They do not constitute formal legal counsel until a direct advocate-client agreement is established with our public interest legal unit.
                    </p>
                </div>
            </main>
        </PublicLayout>
    );
}
