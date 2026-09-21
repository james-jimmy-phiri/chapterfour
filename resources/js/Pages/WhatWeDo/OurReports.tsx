import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FileText, Download, ArrowRight, BookOpen, Search } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function OurReports() {
    // Placeholder reports data to make the page look complete and modern
    const reports = [
        {
            title: "Annual Human Rights Monitor 2025",
            category: "Annual Report",
            date: "Jan 15, 2026",
            image: "/images/paliament.jpg",
            description: "A comprehensive review of human rights compliance, constitutionalism, and governance trends in Malawi over the past year."
        },
        {
            title: "Access to Justice Baseline Survey",
            category: "Research Report",
            date: "Nov 02, 2025",
            image: "/images/Chief_Justice.jpg",
            description: "Empirical assessment of judicial delays, bail accessibility, and legal representation deficits in lower courts."
        },
        {
            title: "Gender Justice in Rural Jurisdictions",
            category: "Policy Brief",
            date: "Aug 22, 2025",
            image: "/images/chiefjusticeof malawi.jpg",
            description: "Evaluating the enforcement of statutory protections for women and girls in traditional leadership areas."
        },
        {
            title: "Constitutional Rights & Police Powers",
            category: "Citizens Legal Handbook",
            date: "Oct 14, 2025",
            image: "/images/constitutional_book.jpg",
            description: "A simplified legal guide outlining citizens' rights upon arrest, detention safeguards, and bail mechanisms."
        }
    ];

    return (
        <PublicLayout>
            <Head>
                <title>Our Reports — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Access research, policy briefs, and annual reports published by Chapter Four Malawi."
                />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/Parliament_Building_of_Malawioutside.jpg"
                        alt="Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <span className="text-brand-amber font-bold tracking-widest uppercase mb-4 block flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-brand-amber"></span> Publications
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Our Reports
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                            Evidence-based research, policy analysis, and documentation to drive human rights programming and advocacy.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Intro / Featured */}
            <section className="py-16 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                        <div className="max-w-2xl">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Research & Knowledge Generation</h2>
                            <p className="text-slate-600 leading-relaxed">
                                We undertake research, assessments, policy analysis, and documentation to generate evidence for human rights programming, advocacy, and policy reform. Browse our latest reports and publications below.
                            </p>
                        </div>
                        <Link href="/resources" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-rust text-white font-bold rounded-lg hover:bg-brand-rust-dark transition-colors shadow-lg shadow-brand-rust/30 shrink-0">
                            <Search className="w-4 h-4" />
                            <span>Search All Resources</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Reports Grid */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {reports.map((report, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group flex flex-col sm:flex-row h-full"
                            >
                                <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden shrink-0">
                                    <img 
                                        src={report.image} 
                                        alt={report.title} 
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-300"></div>
                                </div>
                                <div className="p-6 sm:p-8 sm:w-3/5 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-rust bg-brand-rust-light px-2 py-1 rounded">
                                                {report.category}
                                            </span>
                                            <span className="text-xs font-medium text-slate-400">{report.date}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-rust transition-colors line-clamp-2">
                                            {report.title}
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed text-sm mb-6 line-clamp-3">
                                            {report.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                                        <button className="text-brand-rust hover:text-brand-rust-dark font-semibold text-sm flex items-center gap-1.5 transition-colors">
                                            <Download className="w-4 h-4" />
                                            <span>Download PDF</span>
                                        </button>
                                        <Link href="/resources" className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-rust group-hover:text-white transition-colors">
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
