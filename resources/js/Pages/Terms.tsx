import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function Terms() {
    return (
        <PublicLayout>
            <Head title="Terms of Use - Chapter Four" />
            <section className="pt-32 pb-20 bg-navy-950 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-8">Terms of Use</h1>
                    <div className="prose prose-invert max-w-none text-navy-200 space-y-6 font-light leading-relaxed">
                        <p>
                            Welcome to Chapter Four’s digital platform. By accessing or using our website, you agree to adhere to these terms and conditions and respect the civic and educational intent of all published materials.
                        </p>
                        <h2 className="text-xl font-serif text-white font-normal mt-6">1. Open Access & Attribution</h2>
                        <p>
                            Chapter Four champions open civic knowledge. Our reports, policy briefs, and educational resources may be cited, shared, and distributed for non-commercial educational, civic, and academic purposes with appropriate attribution.
                        </p>
                        <h2 className="text-xl font-serif text-white font-normal mt-6">2. Legal Disclaimer</h2>
                        <p>
                            Materials published on this website are provided for general civic and informational purposes and do not constitute formal legal counsel until a formal attorney-client engagement is established through our legal aid unit.
                        </p>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
