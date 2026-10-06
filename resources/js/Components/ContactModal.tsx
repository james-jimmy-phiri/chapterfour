import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Shield, CheckCircle2, X } from 'lucide-react';
import Modal from '@/Components/Modal';
import { toast } from 'react-toastify';

interface ContactModalProps {
    show: boolean;
    onClose: () => void;
    initialInquiryType?: string;
    initialMessage?: string;
}

export default function ContactModal({ show, onClose, initialInquiryType = 'Rights Violation Report', initialMessage = '' }: ContactModalProps) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful, clearErrors } = useForm({
        name: '',
        email: '',
        phone: '',
        inquiry_type: initialInquiryType,
        subject: '',
        message: initialMessage,
    });

    useEffect(() => {
        if (show) {
            setData((prevData) => ({
                ...prevData,
                inquiry_type: initialInquiryType || 'General Inquiry',
                message: initialMessage || '',
            }));
            clearErrors();
        }
    }, [show, initialInquiryType, initialMessage]);

    useEffect(() => {
        if (recentlySuccessful) {
            toast.success("Message securely received! Thank you for reaching out.");
            reset();
            // Close after a brief delay so they see the success state
            setTimeout(() => {
                onClose();
            }, 3000);
        }
    }, [recentlySuccessful]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
        });
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            <div className="bg-white rounded-3xl p-6 sm:p-10 relative overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-20"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-amber/5 rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-rust/5 rounded-tr-full -ml-8 -mb-8 pointer-events-none"></div>

                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Send Us a Secure Message</h3>
                    <p className="text-slate-600 mb-6">
                        Please fill out the form below. All rights abuse reports and legal aid inquiries are held under strict client-advocate confidentiality.
                    </p>

                    {recentlySuccessful && (
                        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 flex items-start gap-4 animate-pulse">
                            <div className="bg-emerald-100 p-2 rounded-full mt-0.5">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-emerald-900 mb-1">Message securely received!</h4>
                                <p className="text-sm">Thank you for reaching out. Our legal and communications team will review it and respond promptly.</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Anonymous complaint notice - cool, professional styling */}
                        <div className="flex items-center gap-3.5 bg-slate-50 border border-slate-200/90 rounded-2xl px-4 py-3 text-slate-600">
                            <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center shrink-0 text-slate-700">
                                <Shield className="w-4 h-4 text-slate-600" />
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                <span className="font-semibold text-slate-900">Anonymous Submission:</span> You can leave your name, email, and phone blank if you wish to remain anonymous. Your report will still be received and handled with strict confidentiality.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                                    Full Name <span className="text-slate-400 font-normal text-xs">(optional for anonymous)</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Kondwani Phiri"
                                    className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:border-brand-rust focus:ring-2 focus:ring-brand-rust/20 outline-none transition-all bg-slate-50 focus:bg-white"
                                />
                                {errors.name && <p className="text-xs text-red-600 mt-1 font-medium">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                                    Email Address <span className="text-slate-400 font-normal text-xs">(optional for anonymous)</span>
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="kondwani@example.com"
                                    className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:border-brand-rust focus:ring-2 focus:ring-brand-rust/20 outline-none transition-all bg-slate-50 focus:bg-white"
                                />
                                {errors.email && <p className="text-xs text-red-600 mt-1 font-medium">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="+265 888 123 456"
                                    className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:border-brand-rust focus:ring-2 focus:ring-brand-rust/20 outline-none transition-all bg-slate-50 focus:bg-white"
                                />
                                {errors.phone && <p className="text-xs text-red-600 mt-1 font-medium">{errors.phone}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                                    Inquiry Type <span className="text-brand-rust">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={data.inquiry_type}
                                        onChange={(e) => setData('inquiry_type', e.target.value)}
                                        className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:border-brand-rust focus:ring-2 focus:ring-brand-rust/20 outline-none transition-all bg-slate-50 focus:bg-white appearance-none pr-10"
                                    >
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Legal Aid & Defense">Legal Aid & Defense</option>
                                        <option value="Rights Violation Report">Report Rights Violation</option>
                                        <option value="Safeguarding Issue">Safeguarding Issue</option>
                                        <option value="Anonymous Complaint">Anonymous Complaint</option>
                                        <option value="Media & Press">Media & Press</option>
                                        <option value="Partnership & Funding">Partnership & Funding</option>
                                        <option value="Research Collaboration">Research Collaboration</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">
                                Subject
                            </label>
                            <input
                                type="text"
                                value={data.subject}
                                onChange={(e) => setData('subject', e.target.value)}
                                placeholder="Brief description of the matter"
                                className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:border-brand-rust focus:ring-2 focus:ring-brand-rust/20 outline-none transition-all bg-slate-50 focus:bg-white"
                            />
                            {errors.subject && <p className="text-xs text-red-600 mt-1 font-medium">{errors.subject}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">
                                Your Message <span className="text-brand-rust">*</span>
                            </label>
                            <textarea
                                rows={4}
                                required
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                placeholder="Please provide details of your inquiry or report here..."
                                className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:border-brand-rust focus:ring-2 focus:ring-brand-rust/20 outline-none transition-all bg-slate-50 focus:bg-white resize-none"
                            ></textarea>
                            {errors.message && <p className="text-xs text-red-600 mt-1 font-medium">{errors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-brand-rust hover:bg-brand-rust-dark text-white font-bold py-3.5 px-6 rounded-xl transition duration-200 shadow-lg shadow-brand-rust/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending Message...
                                </>
                            ) : (
                                'Submit Message Securely'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </Modal>
    );
}
