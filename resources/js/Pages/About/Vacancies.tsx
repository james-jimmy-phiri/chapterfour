import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Briefcase, MapPin, ArrowRight, Calendar, Mail
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';

import {
    Vacancy,
    defaultVacancies,
    typeColors,
    formatDate,
    isClosingSoon
} from '@/data/vacancies';

export type { Vacancy };
export { defaultVacancies };

interface VacanciesProps {
    vacancies?: Vacancy[];
}

export default function Vacancies({ vacancies }: VacanciesProps) {
    const items = vacancies && vacancies.length > 0 ? vacancies : defaultVacancies;

    return (
        <PublicLayout>
            <Head>
                <title>Vacancies & Opportunities — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Explore open positions and volunteer opportunities at Chapter Four Malawi. Join our team of advocates, researchers, and community organizers."
                />
            </Head>

            {/* ─── HERO SECTION ────────────────────────────────────────────── */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/animate-img-1.jpg"
                        alt="Chapter Four Team"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/30" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                    {/* Breadcrumbs */}
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-bold uppercase tracking-wider">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span>/</span>
                        <Link href="/about" className="hover:text-brand-amber transition">About</Link>
                        <span>/</span>
                        <span className="text-brand-amber">Vacancies</span>
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="max-w-3xl"
                    >
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-brand-amber font-bold tracking-widest uppercase mb-4 flex items-center gap-2 text-sm"
                        >
                            <span className="w-8 h-0.5 bg-brand-amber" /> Join Our Team
                        </motion.span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Vacancies &<br />
                            <span className="text-brand-amber">Opportunities</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
                            Be part of the movement to defend constitutionalism, advance human rights, and empower communities across Malawi. We are always looking for passionate advocates, researchers, and organizers.
                        </p>
                    </motion.div>

                   
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent" />
            </section>

            {/* ─── STATS BAR ─────────────────────────────────────────────────
            <section className="bg-slate-50 border-b border-slate-200 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                        {[
                            { value: items.length, label: 'Open Positions' },
                            { value: items.filter(v => v.type === 'Full-Time').length, label: 'Full-Time Roles' },
                            { value: items.filter(v => v.type === 'Volunteer').length, label: 'Volunteer Spots' },
                            { value: items.filter(v => v.type === 'Consultancy').length, label: 'Consultancies' },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="text-center"
                            >
                                <div className="text-3xl font-black text-brand-rust mb-1">{stat.value}</div>
                                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* ─── VACANCY LISTINGS (SIMPLIFIED CARDS) ────────────────────────────────────────── */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Main Listings */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                                    Current Openings <span className="text-brand-rust ml-1">({items.length})</span>
                                </h2>
                            </div>

                            {items.map((vacancy, idx) => (
                                <motion.div
                                    key={vacancy.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                                    className="group bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden"
                                >
                                    {/* Top orange hover bar */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-rust via-brand-amber to-brand-rust scale-x-0 group-hover:scale-x-100 opacity-0 group-hover:opacity-100 transition-all duration-500 origin-left" />

                                    {/* Left Accent Line */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-rust via-brand-amber to-brand-rust scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>

                                    <div className="flex-1">
                                        {/* Badges */}
                                        <div className="flex flex-wrap items-center gap-2 mb-3">
                                            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                                                {vacancy.type}
                                            </span>
                                            {vacancy.isUrgent && (
                                                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-brand-rust/10 text-brand-rust">
                                                    Urgent
                                                </span>
                                            )}
                                            {isClosingSoon(vacancy.closingDate) && (
                                                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-50 text-amber-700">
                                                    Closing Soon
                                                </span>
                                            )}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-brand-rust transition-colors leading-tight">
                                            {vacancy.title}
                                        </h3>

                                        {/* Meta Info */}
                                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500 font-medium">
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="w-4 h-4 text-slate-400" />
                                                <span>{vacancy.department}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-slate-400" />
                                                <span>{vacancy.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-slate-400" />
                                                <span>Closes: <span className="text-slate-900 font-bold">{formatDate(vacancy.closingDate)}</span></span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="shrink-0 mt-4 sm:mt-0">
                                        <Link 
                                            href={`/vacancies/${vacancy.id}`}
                                            className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-brand-rust text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors w-full sm:w-auto shadow-md"
                                        >
                                            View Details
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4 space-y-6 sticky top-32">
                            {/* How to Apply */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
                            >
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                                    How to Apply
                                </h3>
                                <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-brand-rust text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">1</div>
                                        <p>Download the job description for the position you're interested in.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-brand-rust text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">2</div>
                                        <p>Prepare your CV, cover letter, and any required supporting documents.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-brand-rust text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">3</div>
                                        <p>Send your application to <a href="mailto:info@chapterfourmw.org" className="text-brand-rust font-bold hover:underline">info@chapterfourmw.org</a> with the position title in the subject line.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-brand-rust text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">4</div>
                                        <p>Only shortlisted candidates will be contacted for interviews.</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Values card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl"
                            >
                                <h3 className="text-sm font-black text-brand-amber uppercase tracking-wider mb-4">Why Join Us?</h3>
                                <div className="space-y-3">
                                    {[
                                        'Work on meaningful human rights cases',
                                        'Collaborative, values-driven culture',
                                        'Professional growth opportunities',
                                        'Flexible and respectful workplace',
                                    ].map((val, i) => (
                                        <div key={i} className="flex items-center gap-2.5 text-sm text-slate-200">
                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-amber shrink-0" />
                                            {val}
                                        </div>
                                    ))}
                                </div>
                                <Link
                                    href="/about/who-we-are"
                                    className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-brand-amber hover:text-white transition"
                                >
                                    Learn About Us <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </motion.div>

                            {/* Contact */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center"
                            >
                                <Mail className="w-8 h-8 text-brand-rust mx-auto mb-3" />
                                <p className="text-sm text-slate-600 mb-3">Have questions about our open positions?</p>
                                <a
                                    href="mailto:info@chapterfourmw.org"
                                    className="text-sm font-bold text-brand-rust hover:underline"
                                >
                                    info@chapterfourmw.org
                                </a>
                            </motion.div>
                        </aside>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
