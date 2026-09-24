import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Calendar, MapPin, Briefcase, Mail, FileText,
    ArrowLeft, Clock, Building, CheckCircle2, Upload, X
} from 'lucide-react';
import { useForm, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Vacancy, defaultVacancies, formatDate } from '@/data/vacancies';

interface VacancyDetailsProps {
    id?: string | number;
    vacancy?: Vacancy;
}

export default function VacancyDetails({ id, vacancy }: VacancyDetailsProps) {
    // Resolve current vacancy by provided prop or lookup by id, fallback to first item (the RFP)
    const currentVacancy: Vacancy =
        vacancy ||
        defaultVacancies.find((v) => String(v.id) === String(id)) ||
        defaultVacancies[0];

    const emailSubject = encodeURIComponent(`Application: ${currentVacancy.title}`);
    const submissionEmail = currentVacancy.submissionEmail || 'info@chapterfourmw.org';
    const deadlineDisplay = currentVacancy.deadlineText || `${currentVacancy.closingDate ? formatDate(currentVacancy.closingDate) : 'No Deadline'} ${currentVacancy.closingDate ? ', 5:00 PM' : ''}`;

    const [isApplyModalOpen, setIsApplyModalOpen] = React.useState(false);
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        location: '',
        document_file: null as File | null,
    });
    
    // Add success listener to close modal automatically
    React.useEffect(() => {
        if (recentlySuccessful) {
            setIsApplyModalOpen(false);
            reset();
        }
    }, [recentlySuccessful]);

    const submitApplication = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/vacancies/${currentVacancy.id}/apply`, {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <PublicLayout>
            <Head>
                <title>{`${currentVacancy.title} — Chapter Four Malawi`}</title>
                <meta
                    name="description"
                    content={currentVacancy.description.slice(0, 160)}
                />
            </Head>

            <div className="bg-slate-50 min-h-screen pt-28 lg:pt-32 pb-24">
                {/* Top Navigation Bar */}
                <div className="bg-white border-b border-slate-200 py-4 sm:py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
                        <Link
                            href="/about/vacancies"
                            className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-brand-rust transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Vacancies
                        </Link>
                        <span className="text-xs font-semibold text-slate-400">
                            Ref: CF-VAC-{String(currentVacancy.id).padStart(3, '0')}
                        </span>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-10">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-10"
                    >
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-slate-200 text-slate-700">
                                {currentVacancy.type}
                            </span>
                            {currentVacancy.tag && (
                                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-brand-amber/10 text-brand-amber">
                                    {currentVacancy.tag}
                                </span>
                            )}
                            {currentVacancy.isUrgent && (
                                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-brand-rust/10 text-brand-rust border border-brand-rust/20">
                                    Urgent
                                </span>
                            )}
                        </div>
                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4 max-w-5xl">
                            {currentVacancy.title}
                        </h1>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Main Content Area */}
                        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm">
                            <div className="prose prose-slate prose-lg max-w-none">
                                {/* Lead Paragraph */}
                                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-medium mb-10">
                                    {currentVacancy.description}
                                </p>

                                {/* Scope of Services / Responsibilities */}
                                <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4 mt-8 mb-6">
                                    {currentVacancy.type === 'Consultancy' ? 'Scope of Services' : 'Key Responsibilities'}
                                </h2>
                                {currentVacancy.scopeIntro && (
                                    <p className="mb-4 text-slate-600 leading-relaxed">
                                        {currentVacancy.scopeIntro}
                                    </p>
                                )}

                                {currentVacancy.scopeSections && currentVacancy.scopeSections.length > 0 ? (
                                    currentVacancy.scopeSections.map((sec, sIdx) => (
                                        <div key={sIdx} className="mb-6">
                                            <h3 className="text-lg font-bold text-slate-800 mt-6 mb-3">
                                                {sec.title}
                                            </h3>
                                            <ul className="space-y-2 list-none pl-0">
                                                {sec.items.map((item, iIdx) => (
                                                    <li key={iIdx} className="flex items-start gap-3 text-slate-600 text-base">
                                                        <CheckCircle2 className="w-4 h-4 text-brand-rust shrink-0 mt-1" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))
                                ) : (
                                    <ul className="space-y-2 list-none pl-0 mb-6">
                                        <li>Execute core portfolio duties under the guidance of program leadership.</li>
                                        <li>Ensure rigorous adherence to organizational human rights and constitutional standards.</li>
                                        <li>Maintain stakeholder relationships and contribute to institutional reporting.</li>
                                    </ul>
                                )}

                                {/* Qualification Requirements */}
                                <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4 mt-12 mb-6">
                                    Qualification Requirements
                                </h2>
                                <p className="mb-4 text-slate-600">
                                    Interested {currentVacancy.type === 'Consultancy' ? 'service providers or consultants' : 'applicants'} should submit:
                                </p>
                                <ul className="space-y-2 list-none pl-0">
                                    {currentVacancy.requirements.map((req, rIdx) => (
                                        <li key={rIdx} className="flex items-start gap-3 text-slate-600 text-base">
                                            <CheckCircle2 className="w-4 h-4 text-brand-amber shrink-0 mt-1" />
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Evaluation Criteria */}
                                {currentVacancy.evaluationCriteria && currentVacancy.evaluationCriteria.length > 0 && (
                                    <>
                                        <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4 mt-12 mb-6">
                                            Evaluation Criteria
                                        </h2>
                                        <ul className="space-y-2 list-none pl-0">
                                            {currentVacancy.evaluationCriteria.map((crit, cIdx) => (
                                                <li key={cIdx} className="flex items-start gap-3 text-slate-600 text-base">
                                                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 shrink-0" />
                                                    <span>{crit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {/* Reservation of Rights */}
                                {currentVacancy.reservationOfRights && (
                                    <>
                                        <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4 mt-12 mb-6">
                                            Reservation of Rights
                                        </h2>
                                        <p className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-slate-600 italic">
                                            {currentVacancy.reservationOfRights}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Sidebar / Apply Section */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-28 space-y-6">
                                {/* Summary Card */}
                                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">
                                        Role Overview
                                    </h3>

                                    <div className="space-y-5 mb-8">
                                        <div className="flex items-start gap-4">
                                            <Building className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-xs font-bold text-slate-500 uppercase">Organization</p>
                                                <p className="text-sm font-semibold text-slate-900">
                                                    {currentVacancy.organization || 'Chapter Four Malawi'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <MapPin className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-xs font-bold text-slate-500 uppercase">Location</p>
                                                <p className="text-sm font-semibold text-slate-900">{currentVacancy.location}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <Clock className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-xs font-bold text-slate-500 uppercase">Posted</p>
                                                <p className="text-sm font-semibold text-slate-900">{currentVacancy.postedDate || 'Recent'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <Calendar className="w-5 h-5 text-brand-rust mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-xs font-bold text-brand-rust uppercase">Deadline</p>
                                                <p className="text-sm font-black text-slate-900">{deadlineDisplay}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <button
                                            onClick={() => setIsApplyModalOpen(true)}
                                            className="flex items-center justify-center gap-2 bg-brand-rust hover:bg-[#a64222] text-white font-bold px-6 py-4 rounded-xl text-sm transition-colors shadow-lg shadow-brand-rust/30 w-full"
                                        >
                                            <Upload className="w-4 h-4" />
                                            {currentVacancy.type === 'Consultancy' ? 'Submit Proposal' : 'Apply for Position'}
                                        </button>
                                        
                                        {currentVacancy.document_path ? (
                                            <a
                                                href={currentVacancy.document_path}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-4 rounded-xl text-sm transition-colors w-full"
                                            >
                                                <FileText className="w-4 h-4" />
                                                {currentVacancy.type === 'Consultancy' ? 'Download RFP PDF' : 'Download Job Spec'}
                                            </a>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => window.print()}
                                                className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-4 rounded-xl text-sm transition-colors w-full"
                                            >
                                                <FileText className="w-4 h-4" />
                                                {currentVacancy.type === 'Consultancy' ? 'Download RFP PDF' : 'Download Job Spec'}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Submission Info Card */}
                                <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
                                    <h3 className="text-sm font-black text-brand-amber uppercase tracking-widest mb-4">
                                        Submission Details
                                    </h3>
                                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                                        Submit proposals and supporting documents in sealed envelopes delivered to the office or via email to:
                                    </p>
                                    <div className="bg-slate-800 rounded-xl p-4 text-sm text-slate-200 font-medium">
                                        <p className="mb-1 font-semibold text-white">
                                            {currentVacancy.submissionAddress?.recipient || 'The Procurement Committee'}
                                        </p>
                                        <p className="mb-1 text-slate-300">
                                            {currentVacancy.submissionAddress?.organization || currentVacancy.organization || 'Chapter Four Malawi'}
                                        </p>
                                        {(currentVacancy.submissionAddress?.addressLines || [
                                            'Private Bag B324, Msokera Road',
                                            'Area 47/3/149, Lilongwe, Malawi'
                                        ]).map((line, lIdx) => (
                                            <p key={lIdx} className={lIdx === (currentVacancy.submissionAddress?.addressLines?.length || 2) - 1 ? 'mb-4 text-slate-300' : 'mb-1 text-slate-300'}>
                                                {line}
                                            </p>
                                        ))}
                                        <a
                                            href={`mailto:${submissionEmail}`}
                                            className="text-brand-amber hover:text-white transition-colors break-all font-semibold"
                                        >
                                            {submissionEmail}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Application Modal */}
            {isApplyModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
                            <h3 className="text-lg font-bold text-slate-900">
                                Apply: {currentVacancy.title}
                            </h3>
                            <button
                                onClick={() => setIsApplyModalOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={submitApplication} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                            {/* Flash Errors */}
                            {usePage().props.errors.email && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                                    {usePage().props.errors.email}
                                </div>
                            )}
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent transition-shadow"
                                    placeholder="Jane Doe"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                                <input
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent transition-shadow"
                                    placeholder="jane@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent transition-shadow"
                                    placeholder="+265 888 123 456"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={e => setData('location', e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent transition-shadow"
                                    placeholder="Lilongwe, Malawi"
                                />
                                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Upload CV / Document *</label>
                                <input
                                    type="file"
                                    required
                                    accept=".pdf,.doc,.docx"
                                    onChange={e => setData('document_file', e.target.files ? e.target.files[0] : null)}
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-rust focus:border-transparent transition-shadow text-sm"
                                />
                                <p className="text-xs text-slate-500 mt-1">Accepted formats: PDF, DOC, DOCX. Max size 10MB.</p>
                                {errors.document_file && <p className="text-red-500 text-xs mt-1">{errors.document_file}</p>}
                            </div>
                            <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsApplyModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-brand-rust text-white text-sm font-medium rounded-lg hover:bg-[#a64222] transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Submitting...' : 'Submit Application'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
