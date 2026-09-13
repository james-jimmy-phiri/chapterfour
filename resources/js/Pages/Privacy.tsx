import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function Privacy() {
    return (
        <PublicLayout>
            <Head title="Privacy Policy - Chapter Four" />
            <section className="pt-32 pb-20 bg-navy-950 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-8">Privacy Policy</h1>
                    <div className="prose prose-invert max-w-none text-navy-200 space-y-6 font-light leading-relaxed">
                        <p>
                            Chapter Four is committed to protecting the privacy, confidentiality, and data rights of all individuals who interact with our organization, website, mobile legal clinics, and advocacy initiatives.
                        </p>
                        <h2 className="text-xl font-serif text-white font-normal mt-6">1. Information Collection</h2>
                        <p>
                            We only collect personal information that you voluntarily provide to us when submitting inquiries, subscribing to our newsletter, applying for volunteering, or reporting human rights concerns.
                        </p>
                        <h2 className="text-xl font-serif text-white font-normal mt-6">2. Use of Information</h2>
                        <p>
                            Personal data submitted through our platforms is strictly utilized for legal case evaluation, civic communication, and organizational updates. We never sell, lease, or commercially exploit any personal data.
                        </p>
                        <h2 className="text-xl font-serif text-white font-normal mt-6">3. Confidentiality & Security</h2>
                        <p>
                            Information concerning legal aid cases and vulnerable rights-holders is protected by legal privilege and high security protocols.
                        </p>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
