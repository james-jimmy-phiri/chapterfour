import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

export default function Privacy() {
    return (
        <PublicLayout>
            <Head title="Privacy Policy — Chapter Four Malawi" />
            <section className="hero-pattern text-white py-14 px-4 sm:px-8 border-b border-white/10">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300 mb-4 font-semibold">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span className="text-slate-500">›</span>
                        <span className="text-brand-amber">Privacy Policy</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-white">Privacy Policy</h1>
                    <p className="text-sm text-slate-200 mt-2">Last updated: January 2026</p>
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
