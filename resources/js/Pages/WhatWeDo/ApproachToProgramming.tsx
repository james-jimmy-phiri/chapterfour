import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Users, Scale, Lock, Lightbulb, Target, Handshake,
    Accessibility, TreePine, Layers, ArrowRight,
    HeartHandshake, ShieldCheck
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';

const hrbaEmphases = [
    {
        label: "Participation & Inclusion",
        icon: Users,
        description: "Ensuring all community members, especially the most marginalized, actively participate in decisions that affect their lives.",
    },
    {
        label: "Equality & Non-Discrimination",
        icon: Scale,
        description: "Upholding the principle that every person is entitled to equal rights without distinction of any kind.",
    },
    {
        label: "Accountability & Transparency",
        icon: Lock,
        description: "Holding duty bearers responsible for their obligations and promoting openness in governance and institutional action.",
    },
    {
        label: "Empowerment & Legal Literacy",
        icon: Lightbulb,
        description: "Building the capacity of rights holders to know, claim, and defend their constitutional rights and freedoms.",
    },
    {
        label: "Evidence-Based Advocacy",
        icon: Target,
        description: "Grounding all advocacy and policy engagement in credible, field-generated empirical research and documentation.",
    },
    {
        label: "Community Ownership",
        icon: Handshake,
        description: "Ensuring communities drive their own development and rights protection through local leadership and structures.",
    },
    {
        label: "Gender Responsiveness",
        icon: Accessibility,
        description: "Addressing the distinct and compounded barriers women and girls face in accessing rights and justice.",
    },
    {
        label: "Disability Inclusion",
        icon: HeartHandshake,
        description: "Mainstreaming the rights and perspectives of persons with disabilities across all programme areas.",
    },
    {
        label: "Youth Participation",
        icon: TreePine,
        description: "Actively engaging young people as rights holders and agents of change in civic and democratic processes.",
    },
    {
        label: "Peace Building",
        icon: ShieldCheck,
        description: "Fostering peaceful coexistence, tolerance, and constructive civic engagement within communities.",
    },
    {
        label: "Sustainability & Institutional Strengthening",
        icon: Layers,
        description: "Building durable community structures and institutional capacity to sustain rights protection beyond project cycles.",
    },
];

const approachPillars = [
    {
        number: "01",
        title: "Rights Holders & Duty Bearers",
        description: "We recognize all individuals and communities as rights holders with entitlements guaranteed by the Constitution. Public institutions, government agencies, and other relevant actors are recognized as duty bearers with legal and moral obligations to respect, protect, and fulfill those rights.",
        image: "/images/domestic.jpg",
    },
    {
        number: "02",
        title: "Community-Level Interventions",
        description: "Our work begins at the community level — training paralegals, running civic education dialogues, establishing rights desks at police posts and courts, and facilitating community-based human rights protection structures that outlast our direct project involvement.",
        image: "/images/Tithetse.jpg",
    },
    {
        number: "03",
        title: "Research, Advocacy & Policy Engagement",
        description: "We complement grassroots work with rigorous legal and policy research, strategic advocacy before Parliament and executive government, and high-level dialogues with duty bearers to address the structural and systemic causes of human rights violations.",
        image: "/images/lawyers_office.jpg",
    },
    {
        number: "04",
        title: "Litigation Support Where Appropriate",
        description: "Where community-level and advocacy approaches are insufficient to secure constitutional remedies, Chapter Four provides or facilitates strategic public interest litigation — bringing landmark cases to the High Court and Supreme Court of Appeal to establish rights-protective jurisprudence.",
        image: "/images/court_of_appeal.jpg",
    },
];

export default function ApproachToProgramming() {
    return (
        <PublicLayout>
            <Head>
                <title>Approach to Programming — Chapter Four Malawi</title>
                <meta
                    name="description"
                    content="Chapter Four applies a Human Rights-Based Approach (HRBA) that recognizes communities as rights holders and public institutions as duty bearers, combining community interventions with research, advocacy, and litigation support."
                />
            </Head>

            {/* ─── HERO SECTION ────────────────────────────────────────────── */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/lawyers_office.jpg"
                        alt="Chapter Four Programming Methodology"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/70 to-slate-900/30" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                    {/* Breadcrumbs */}
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-bold uppercase tracking-wider">
                        <Link href="/" className="hover:text-brand-amber transition">Home</Link>
                        <span>/</span>
                        <Link href="/what-we-do" className="hover:text-brand-amber transition">What We Do</Link>
                        <span>/</span>
                        <span className="text-brand-amber">Approach to Programming</span>
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
                            <span className="w-8 h-0.5 bg-brand-amber" /> Methodology
                        </motion.span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Approach to<br />
                            <span className="text-brand-amber">Programming</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
                            We apply a Human Rights-Based Approach to all our interventions — empowering communities as rights holders and holding institutions accountable as duty bearers, combining ground-level action with systemic advocacy.
                        </p>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent" />
            </section>

            {/* ─── HRBA OVERVIEW ───────────────────────────────────────────── */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-xs font-bold uppercase tracking-widest text-brand-rust block mb-3">The HRBA Framework</span>
                            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-6">
                                Human Rights-Based<br />Approach (HRBA)
                            </h2>
                            <p className="text-slate-500 leading-relaxed text-base mb-5">
                                Chapter Four applies a Human Rights-Based Approach (HRBA) to all its interventions. The organization recognizes individuals and communities as <span className="font-semibold text-slate-700">rights holders</span> — entitled to protections guaranteed by the Constitution and international instruments — and public institutions and other relevant actors as <span className="font-semibold text-slate-700">duty bearers</span> with corresponding obligations to respect, protect, and fulfill those rights.
                            </p>
                            <p className="text-slate-500 leading-relaxed text-base mb-6">
                                This approach ensures that all programming is grounded in constitutional and international legal standards, addresses root causes rather than symptoms, and builds lasting capacity within communities and institutions alike.
                            </p>
                            <p className="text-slate-500 leading-relaxed text-base">
                                Chapter Four combines community-level interventions with research, advocacy, litigation support where appropriate, policy engagement and institutional dialogue to address both immediate human rights concerns and their underlying structural causes.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
                                <img
                                    src="/images/unganda.jpg"
                                    alt="Community Engagement"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-slate-900/20" />
                            </div>
                            {/* Floating card */}
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-slate-100 max-w-[220px]">
                                <div className="text-3xl font-black text-brand-rust mb-1">100%</div>
                                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rights-Based Programming</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── FOUR APPROACH PILLARS ───────────────────────────────────── */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-rust block mb-3">How We Work</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                            Four Dimensions of Our Approach
                        </h2>
                        <p className="text-slate-500 mt-4 leading-relaxed">
                            Our methodology integrates multiple complementary strategies to achieve durable, systemic change for rights holders.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {approachPillars.map((pillar, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100"
                            >
                                <div className="relative h-52 overflow-hidden">
                                    <img
                                        src={pillar.image}
                                        alt={pillar.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                                    <div className="absolute bottom-4 left-6">
                                        <span className="text-3xl font-black text-white/20">{pillar.number}</span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-brand-rust transition-colors">{pillar.title}</h3>
                                    <p className="text-slate-500 leading-relaxed text-sm">{pillar.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── HRBA EMPHASES GRID ──────────────────────────────────────── */}
            <section className="py-24 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-rust block mb-3">Core Values in Practice</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Our Programming Emphasizes</h2>
                        <p className="text-slate-500 leading-relaxed">
                            These eleven principles are embedded across all Chapter Four programme areas, ensuring that our interventions are grounded, inclusive, and sustainable.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {hrbaEmphases.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                                    className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-brand-amber/40 hover:shadow-md hover:bg-white transition-all group"
                                >
                                    <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-brand-amber/10 transition-colors border border-slate-100">
                                        <Icon className="w-5 h-5 text-slate-600 group-hover:text-brand-amber transition-colors" />
                                    </div>
                                    <p className="font-bold text-slate-800 text-sm mb-2">{item.label}</p>
                                    <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── CTA ─────────────────────────────────────────────────────── */}
            <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/images/animate-img-2.jpg" alt="" className="w-full h-full object-cover opacity-10" />
                    <div className="absolute inset-0 bg-slate-900/80" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-brand-amber font-bold tracking-widest uppercase text-sm block mb-4">Learn More</span>
                        <h2 className="text-3xl sm:text-4xl font-black mb-6 leading-tight">
                            Explore Our Thematic Areas
                        </h2>
                        <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                            Understand how our Human Rights-Based Approach is applied across our eight programme pillars, from constitutional education to accountability monitoring.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/what-we-do/thematic-areas"
                                className="inline-flex items-center justify-center gap-2 bg-brand-rust hover:bg-brand-rust-dark text-white font-bold px-8 py-4 rounded-xl transition shadow-xl shadow-brand-rust/30"
                            >
                                <span>View Thematic Areas</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-4 rounded-xl transition backdrop-blur-sm"
                            >
                                <span>Partner With Us</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </PublicLayout>
    );
}
