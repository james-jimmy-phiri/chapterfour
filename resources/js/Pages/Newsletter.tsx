import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    Mail, CheckCircle2, Shield, Bell, BookOpen,
    ArrowRight, Newspaper, Sparkles, Lock
} from 'lucide-react';

interface NewsletterProps {
    recentUpdates: Array<{
        id: number;
        title: string;
        slug: string;
        type: string;
        excerpt?: string;
        published_at?: string;
        featured_image?: string;
    }>;
}

export default function NewsletterPage({ recentUpdates = [] }: NewsletterProps) {
    const [subscribed, setSubscribed] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        source: 'newsletter_page',
    });

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        post('/newsletter/subscribe', {
            preserveScroll: true,
            onSuccess: () => {
                setSubscribed(true);
                reset();
            },
        });
    };

    return (
        <PublicLayout>
            <Head>
                <title>Newsletter & Constitutional Alerts | Chapter Four Malawi</title>
                <meta
                    head-key="description"
                    name="description"
                    content="Stay informed with critical legal analysis, human rights monitors, press statements, and emergency advocacy alerts from Chapter Four Malawi."
                />
                <meta
                    head-key="robots"
                    name="robots"
                    content="index, follow"
                />
            </Head>

            {/* Hero */}
            <div className="relative bg-gradient-to-br from-[#1a0e08] via-[#2d150b] to-[#120904] text-white pt-36 pb-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d95b38_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-brand-amber border border-white/15 text-xs font-bold uppercase tracking-wider">
                        <Mail className="w-3.5 h-3.5" />
                        <span>Chapter Four Dispatches</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight leading-tight">
                        Stay Informed on Constitutional Rights & Civic Freedoms
                    </h1>

                    <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Receive critical legal analysis, human rights monitors, press statements, and emergency advocacy alerts directly in your inbox.
                    </p>
                </div>
            </div>

            {/* Subscription Form Box */}
            <div className="py-16 bg-slate-50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 -mt-24 relative z-20">
                        {subscribed ? (
                            <div className="text-center py-8 space-y-4">
                                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <h3 className="font-serif font-bold text-2xl text-slate-900">
                                    You're Subscribed!
                                </h3>
                                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                                    Thank you for standing with Chapter Four. You will receive our regular constitutional monitoring digests and field updates.
                                </p>
                                <button
                                    onClick={() => setSubscribed(false)}
                                    className="text-xs font-semibold text-brand-rust underline hover:text-brand-rust-dark pt-2"
                                >
                                    Subscribe another email address
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="space-y-6">
                                <div className="text-center space-y-2 mb-6">
                                    <h2 className="font-serif font-bold text-2xl text-slate-900">
                                        Join Our Civic Advocacy Network
                                    </h2>
                                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                                        Sent bi-weekly. Free of charge. Unsubscribe anytime with a single click.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Full Name (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Your name"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="name@example.com"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="flex items-start gap-2 pt-1">
                                    <input
                                        type="checkbox"
                                        required
                                        id="consent"
                                        className="mt-0.5 rounded border-slate-300 text-brand-rust focus:ring-brand-rust"
                                    />
                                    <label htmlFor="consent" className="text-sm text-slate-600 leading-normal">
                                        I consent to Chapter Four sending me legal newsletters and advocacy publications. Read our <Link href="/privacy" className="text-brand-rust underline font-medium">Privacy Policy</Link>.
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3.5 px-6 rounded-xl bg-brand-rust hover:bg-brand-rust-dark text-white font-bold text-base shadow-lg shadow-brand-rust/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <Mail className="w-4 h-4" />
                                    {processing ? 'Subscribing...' : 'Subscribe to Chapter Four Updates'}
                                </button>

                                <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-slate-500 pt-2">
                                    <span className="flex items-center gap-1">
                                        <Lock className="w-3.5 h-3.5 text-emerald-500" /> No spam guaranteed
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <Shield className="w-3.5 h-3.5 text-brand-rust" /> GDPR & data compliant
                                    </span>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Recent Dispatches Preview */}
                    {recentUpdates.length > 0 && (
                        <div className="mt-16 space-y-6">
                            <div className="text-center">
                                <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
                                    Recent Publications & Updates
                                </h3>
                                <p className="text-sm sm:text-base text-slate-600 mt-1.5">
                                    Examples of topics and analysis covered in our newsletter dispatches.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {recentUpdates.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/resources/${item.slug}`}
                                        className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-rust hover:shadow-md transition flex flex-col justify-between group"
                                    >
                                        <div>
                                            <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
                                                {item.type.replace('_', ' ')}
                                            </span>
                                            <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg mt-2.5 group-hover:text-brand-rust transition-colors line-clamp-2">
                                                {item.title}
                                            </h4>
                                            {item.excerpt && (
                                                <p className="text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                                                    {item.excerpt}
                                                </p>
                                            )}
                                        </div>
                                        <span className="text-sm font-semibold text-brand-rust flex items-center gap-1.5 mt-4">
                                            Read Publication <ArrowRight className="w-3.5 h-3.5" />
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
