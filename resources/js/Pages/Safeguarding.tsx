import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

export default function Safeguarding() {
    return (
        <PublicLayout>
            <Head title="Safeguarding Policy — Chapter Four Malawi" />
            <section className="hero-pattern text-white py-14 px-4 sm:px-8 border-b border-white/10">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300 mb-4 font-semibold">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span className="text-slate-500">›</span>
                        <span className="text-brand-amber">Safeguarding</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-white">Safeguarding Policy</h1>
                    <p className="text-sm text-slate-200 mt-2">Zero tolerance for abuse, exploitation, and discrimination</p>
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
