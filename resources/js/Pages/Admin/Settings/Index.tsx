import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Settings, Save, Globe, Mail, Phone, MapPin,
    Share2, Shield, Sparkles, Loader2, CheckCircle2
} from 'lucide-react';
import { useState } from 'react';

interface SettingsProps {
    settings: {
        org_name?: string;
        tagline?: string;
        contact_email?: string;
        contact_phone?: string;
        office_address?: string;
        hours?: string;
        twitter_url?: string;
        facebook_url?: string;
        linkedin_url?: string;
        instagram_url?: string;
        emergency_helpline?: string;
        mission?: string;
        vision?: string;
        contact_image?: string;
    };
}

export default function Index({ settings }: SettingsProps) {
    const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'social' | 'mission'>('general');

    const { data, setData, post, processing, recentlySuccessful } = useForm({
        org_name: settings.org_name || '',
        tagline: settings.tagline || '',
        contact_email: settings.contact_email || '',
        contact_phone: settings.contact_phone || '',
        office_address: settings.office_address || '',
        hours: settings.hours || '',
        twitter_url: settings.twitter_url || '',
        facebook_url: settings.facebook_url || '',
        linkedin_url: settings.linkedin_url || '',
        instagram_url: settings.instagram_url || '',
        emergency_helpline: settings.emergency_helpline || '',
        mission: settings.mission || '',
        vision: settings.vision || '',
        contact_image_file: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/settings', { preserveScroll: true, forceFormData: true });
    };

    return (
        <AdminLayout
            header="Site & Organization Settings"
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin' },
                { label: 'Settings' },
            ]}
        >
            <Head title="Site Settings - Chapter Four CMS" />

            <div className="max-w-4xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">System & Organization Profile</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Manage institutional metadata, contact channels, and organizational statements.
                        </p>
                    </div>

                    {recentlySuccessful && (
                        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
                            <CheckCircle2 className="w-4 h-4" /> Settings updated successfully
                        </div>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-200 dark:border-white/10 gap-2 overflow-x-auto">
                    {[
                        { key: 'general', label: 'General Identity' },
                        { key: 'contact', label: 'Contact & Office' },
                        { key: 'social', label: 'Social Networks' },
                        { key: 'mission', label: 'Mission & Vision' },
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                                activeTab === tab.key
                                    ? 'border-brand-rust text-brand-rust dark:border-brand-amber dark:text-brand-amber font-semibold'
                                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="p-8 rounded-2xl bg-white dark:bg-[#0a0e1a] border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
                        {/* Tab 1: General */}
                        {activeTab === 'general' && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                                        Organization Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.org_name}
                                        onChange={e => setData('org_name', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                                        Official Tagline / Motto
                                    </label>
                                    <input
                                        type="text"
                                        value={data.tagline}
                                        onChange={e => setData('tagline', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Tab 2: Contact */}
                        {activeTab === 'contact' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                                            Official Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={data.contact_email}
                                            onChange={e => setData('contact_email', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                                            Official Phone Line
                                        </label>
                                        <input
                                            type="text"
                                            value={data.contact_phone}
                                            onChange={e => setData('contact_phone', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                                        Headquarters Office Address
                                    </label>
                                    <input
                                        type="text"
                                        value={data.office_address}
                                        onChange={e => setData('office_address', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                                            Working Hours
                                        </label>
                                        <input
                                            type="text"
                                            value={data.hours}
                                            onChange={e => setData('hours', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                                            Emergency Rights Helpline
                                        </label>
                                        <input
                                            type="text"
                                            value={data.emergency_helpline}
                                            onChange={e => setData('emergency_helpline', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                                        Contact Us Image
                                    </label>
                                    <div className="flex items-center gap-4">
                                        {settings.contact_image && (
                                            <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                                                <img src={settings.contact_image} alt="Contact Image" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setData('contact_image_file', e.target.files ? e.target.files[0] : null)}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">Upload a new image to replace the one displayed under the contact information.</p>
                                </div>
                            </div>
                        )}

                        {/* Tab 3: Social */}
                        {activeTab === 'social' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                                        Twitter / X URL
                                    </label>
                                    <input
                                        type="url"
                                        value={data.twitter_url}
                                        onChange={e => setData('twitter_url', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                                        Facebook Page URL
                                    </label>
                                    <input
                                        type="url"
                                        value={data.facebook_url}
                                        onChange={e => setData('facebook_url', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                                        LinkedIn Profile URL
                                    </label>
                                    <input
                                        type="url"
                                        value={data.linkedin_url}
                                        onChange={e => setData('linkedin_url', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                                        Instagram Profile URL
                                    </label>
                                    <input
                                        type="url"
                                        value={data.instagram_url}
                                        onChange={e => setData('instagram_url', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Tab 4: Mission */}
                        {activeTab === 'mission' && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                                        Vision Statement
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={data.vision}
                                        onChange={e => setData('vision', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                                        Mission Statement
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={data.mission}
                                        onChange={e => setData('mission', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-rust focus:ring-1 focus:ring-brand-rust resize-none"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-rust hover:bg-brand-crimson text-white font-semibold text-xs shadow-md shadow-brand-rust/20 transition-all disabled:opacity-50"
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" /> Saving Settings...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" /> Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
