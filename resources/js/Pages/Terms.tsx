import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

export default function Terms() {
    return (
        <PublicLayout>
            <Head title="Terms of Use — Chapter Four Malawi" />
            <section className="hero-pattern text-white py-14 px-4 sm:px-8 border-b border-white/10">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300 mb-4 font-semibold">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span className="text-slate-500">›</span>
                        <span className="text-brand-amber">Terms of Use</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-white">Terms of Use</h1>
                    <p className="text-sm text-slate-200 mt-2">Last updated: January 2026</p>
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
