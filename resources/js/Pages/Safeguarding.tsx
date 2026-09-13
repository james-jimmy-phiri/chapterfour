import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function Safeguarding() {
    return (
        <PublicLayout>
            <Head title="Safeguarding & Protection - Chapter Four" />
            <section className="pt-32 pb-20 bg-navy-950 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-8">Safeguarding Policy</h1>
                    <div className="prose prose-invert max-w-none text-navy-200 space-y-6 font-light leading-relaxed">
                        <p>
                            Chapter Four enforces a zero-tolerance policy towards child abuse, sexual harassment, exploitation, discrimination, and violence across all its operations, outreach clinics, and digital platforms.
                        </p>
                        <h2 className="text-xl font-serif text-white font-normal mt-6">1. Child & Youth Protection</h2>
                        <p>
                            We adhere strictly to Malawian and international standards for safeguarding young persons participating in our civic education programs, mobile clinics, and youth clubs.
                        </p>
                        <h2 className="text-xl font-serif text-white font-normal mt-6">2. Reporting Channel</h2>
                        <p>
                            Any suspected breaches of our safeguarding code of conduct can be reported confidentially to safeguarding@chapterfour.mw.
                        </p>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
