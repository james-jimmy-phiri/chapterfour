import { Head, Link } from '@inertiajs/react';
import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion';
import {
    ArrowRight, ArrowDown, Shield, Scale, BookOpen, Users, FileText, Search,
    Globe, Heart, ChevronRight, Play
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';

// ─── 3D HERO SCENE ────────────────────────────────────────────────────────────

function FloatingNode({ position, size = 0.15, color = '#f59e0b', speed = 1 }: {
    position: [number, number, number];
    size?: number;
    color?: string;
    speed?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const t = useRef(Math.random() * Math.PI * 2);

    useFrame((_, delta) => {
        t.current += delta * speed * 0.5;
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(t.current) * 0.3;
            meshRef.current.rotation.x += delta * 0.3;
            meshRef.current.rotation.z += delta * 0.2;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <octahedronGeometry args={[size, 0]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} transparent opacity={0.8} />
        </mesh>
    );
}

function ConnectionLine({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    return (
        // @ts-expect-error Three.js line JSX conflicts with SVG line
        <line geometry={geometry}>
            <lineBasicMaterial color="#f59e0b" transparent opacity={0.15} />
        </line>
    );
}

function HeroScene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const { size } = useThree();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = mouseX * 0.15 + state.clock.elapsedTime * 0.05;
            groupRef.current.rotation.x = -mouseY * 0.08;
        }
    });

    const nodes: [number, number, number][] = [
        [0, 0, 0],
        [2, 1, -1],
        [-2, 0.5, -0.5],
        [1.5, -1.5, 0.5],
        [-1.5, -1, 1],
        [0.5, 2, -0.5],
        [3, 0, -1],
        [-2.5, -0.5, 0],
        [0, -2, 0.5],
    ];

    const connections: [[number, number, number], [number, number, number]][] = [
        [nodes[0], nodes[1]],
        [nodes[0], nodes[2]],
        [nodes[0], nodes[3]],
        [nodes[0], nodes[4]],
        [nodes[1], nodes[5]],
        [nodes[1], nodes[6]],
        [nodes[2], nodes[7]],
        [nodes[3], nodes[8]],
        [nodes[4], nodes[8]],
    ];

    return (
        <group ref={groupRef}>
            {/* Central sphere */}
            <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
                <Sphere args={[0.8, 32, 32]} position={[0, 0, 0]}>
                    <MeshDistortMaterial
                        color="#1e2882"
                        emissive="#3a58f0"
                        emissiveIntensity={0.3}
                        distort={0.3}
                        speed={2}
                        transparent
                        opacity={0.7}
                        roughness={0.1}
                        metalness={0.8}
                    />
                </Sphere>
            </Float>

            {/* Floating nodes */}
            {nodes.slice(1).map((pos, i) => (
                <FloatingNode
                    key={i}
                    position={pos}
                    size={0.1 + (i % 3) * 0.04}
                    color={i % 3 === 0 ? '#f59e0b' : i % 3 === 1 ? '#60a5fa' : '#e11d48'}
                    speed={0.5 + i * 0.15}
                />
            ))}

            {/* Connection lines */}
            {connections.map(([start, end], i) => (
                <ConnectionLine key={i} start={start} end={end} />
            ))}

            {/* Stars background */}
            <Stars radius={20} depth={10} count={800} factor={2} saturation={0} fade speed={0.5} />

            {/* Ambient ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.5, 0.015, 16, 100]} />
                <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} transparent opacity={0.3} />
            </mesh>
            <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
                <torusGeometry args={[3.2, 0.01, 16, 100]} />
                <meshStandardMaterial color="#3a58f0" emissive="#3a58f0" emissiveIntensity={0.4} transparent opacity={0.2} />
            </mesh>

            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={1} color="#f59e0b" />
            <pointLight position={[-5, -3, -5]} intensity={0.6} color="#3a58f0" />
        </group>
    );
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    useEffect(() => {
        if (!inView || !ref.current) return;
        const controls = animate(0, target, {
            duration: 2,
            ease: [0.16, 1, 0.3, 1],
            onUpdate(value) {
                if (ref.current) ref.current.textContent = `${prefix}${Math.round(value)}${suffix}`;
            },
        });
        return controls.stop;
    }, [inView, target, prefix, suffix]);

    return <span ref={ref}>{prefix}0{suffix}</span>;
}

// ─── THEMATIC AREAS ───────────────────────────────────────────────────────────

const thematicAreas = [
    {
        number: '01',
        title: 'Human Rights & Constitutionalism',
        description: 'Promoting knowledge and protection of rights guaranteed under the Constitution and relevant international and regional human rights instruments.',
        icon: Shield,
        color: 'from-blue-600/20 to-navy-900/20',
        accent: '#60a5fa',
    },
    {
        number: '02',
        title: 'Access to Justice & Legal Empowerment',
        description: 'Supporting communities and vulnerable groups to understand their legal rights, access appropriate remedies and engage with justice institutions.',
        icon: Scale,
        color: 'from-gold-600/20 to-navy-900/20',
        accent: '#f59e0b',
    },
    {
        number: '03',
        title: 'Democracy & Good Governance',
        description: 'Promoting accountable, transparent, participatory and responsive governance and strengthening citizens\' participation in democratic processes.',
        icon: Globe,
        color: 'from-emerald-600/20 to-navy-900/20',
        accent: '#34d399',
    },
    {
        number: '04',
        title: 'Civic & Human Rights Education',
        description: 'Providing communities, young people and duty bearers with information and skills necessary to understand and exercise their rights and responsibilities.',
        icon: BookOpen,
        color: 'from-purple-600/20 to-navy-900/20',
        accent: '#a78bfa',
    },
    {
        number: '05',
        title: 'Policy & Legislative Advocacy',
        description: 'Conducting policy and legal analysis and advocating for laws and policies that comply with constitutional and human rights standards.',
        icon: FileText,
        color: 'from-crimson-600/20 to-navy-900/20',
        accent: '#f43f5e',
    },
    {
        number: '06',
        title: 'Protection of Vulnerable Groups',
        description: 'Promoting equality and non-discrimination and addressing rights violations affecting women, children, persons with disabilities and other marginalized groups.',
        icon: Heart,
        color: 'from-pink-600/20 to-navy-900/20',
        accent: '#ec4899',
    },
    {
        number: '07',
        title: 'Accountability & Human Rights Monitoring',
        description: 'Monitoring government and institutional performance, documenting human rights concerns and promoting effective accountability mechanisms.',
        icon: Search,
        color: 'from-orange-600/20 to-navy-900/20',
        accent: '#fb923c',
    },
    {
        number: '08',
        title: 'Research & Knowledge Generation',
        description: 'Undertaking research, assessments, policy analysis and documentation to generate evidence for human rights programming, advocacy and policy reform.',
        icon: BookOpen,
        color: 'from-teal-600/20 to-navy-900/20',
        accent: '#2dd4bf',
    },
];

const stats = [
    { label: 'Years of Advocacy', value: 9, suffix: '+', prefix: '' },
    { label: 'Communities Reached', value: 25, suffix: '+', prefix: '' },
    { label: 'Rights Initiatives', value: 50, suffix: '+', prefix: '' },
    { label: 'Partners & Allies', value: 30, suffix: '+', prefix: '' },
];

const beneficiaries = [
    'Women & Girls', 'Children & Young People', 'Persons with Disabilities',
    'Persons with Albinism', 'Refugees & Asylum Seekers', 'Displaced Persons',
    'Rural Communities', 'Economically Disadvantaged', 'Survivors of Human Rights Violations',
    'Marginalized Communities',
];

const hrbaPoints = [
    { title: 'Rights Holders', desc: 'Empowering individuals and communities to claim their rights' },
    { title: 'Duty Bearers', desc: 'Holding institutions accountable to their obligations' },
    { title: 'Participation', desc: 'Ensuring meaningful inclusion in decision-making processes' },
    { title: 'Equality', desc: 'Promoting non-discrimination in all interventions' },
    { title: 'Accountability', desc: 'Creating transparent mechanisms for redress' },
    { title: 'Empowerment', desc: 'Building legal literacy and civic competence' },
];

// ─── MAIN HOMEPAGE ────────────────────────────────────────────────────────────

export default function Welcome() {
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [webglSupported, setWebglSupported] = useState(true);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check WebGL support
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) setWebglSupported(false);
        } catch { setWebglSupported(false); }

        // Check reduced motion
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mq.matches);

        const handleMouseMove = (e: MouseEvent) => {
            setMouseX((e.clientX / window.innerWidth - 0.5) * 2);
            setMouseY((e.clientY / window.innerHeight - 0.5) * 2);
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const show3D = webglSupported && !prefersReducedMotion;

    return (
        <PublicLayout>
            <Head>
                <title>Chapter Four — Rights. Justice. Dignity. For Everyone.</title>
                <meta name="description" content="A youth-led Malawian organization advancing human rights, constitutionalism, democracy, access to justice and accountable governance." />
            </Head>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* SECTION 1 — HERO                                            */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section ref={heroRef} className="relative min-h-screen flex items-center bg-hero-gradient overflow-hidden" aria-label="Hero">
                {/* Background layers */}
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-transparent to-navy-950" />

                {/* 3D Canvas or static fallback */}
                <div className="absolute inset-0">
                    {show3D ? (
                        <Suspense fallback={<div className="w-full h-full bg-hero-gradient" />}>
                            <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                                <HeroScene mouseX={mouseX} mouseY={mouseY} />
                            </Canvas>
                        </Suspense>
                    ) : (
                        /* Static fallback */
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-80 h-80 rounded-full border border-gold-500/20 absolute" style={{ animation: 'pulse 4s ease-in-out infinite' }} />
                            <div className="w-60 h-60 rounded-full border border-navy-600/40 absolute" />
                            <div className="w-40 h-40 rounded-full bg-navy-700/30 absolute" />
                        </div>
                    )}
                </div>

                {/* Hero content */}
                <div className="container-cf relative z-10 pt-28 pb-20">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="section-label mb-6"
                        >
                            Chapter Four · Malawi
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white mb-6 leading-[1.05]"
                        >
                            Rights.{' '}
                            <span className="text-gradient-gold italic">Justice.</span>
                            <br />
                            Dignity.{' '}
                            <span className="text-white/60">For Everyone.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                            className="text-white/70 text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl"
                        >
                            A youth-led organization advancing human rights, constitutionalism, democracy,
                            access to justice and accountable governance in Malawi.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.65 }}
                            className="flex flex-wrap items-center gap-4"
                        >
                            <Link href="/what-we-do" id="hero-cta-primary" className="btn-primary text-base">
                                Explore Our Work
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link href="/about" id="hero-cta-secondary" className="btn-secondary text-base">
                                Who We Are
                            </Link>
                        </motion.div>

                        {/* Scroll indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
                        >
                            <span className="text-xs tracking-[0.2em] uppercase font-sans">Scroll</span>
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <ArrowDown className="w-4 h-4" />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" />
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* SECTION 2 — MANIFESTO                                       */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="section-cf bg-navy-950 relative overflow-hidden" aria-label="Manifesto">
                <div className="absolute inset-0 dot-grid opacity-30" />
                <div className="container-cf relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.blockquote
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white leading-[1.2] mb-8"
                        >
                            "Human rights should not{' '}
                            <span className="text-gradient-gold italic">exist only on paper.</span>"
                        </motion.blockquote>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="divider-gold mx-auto mb-8"
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto"
                        >
                            Chapter Four exists to bridge the gap between constitutional guarantees and lived realities.
                            Named after Chapter Four of the Constitution of the Republic of Malawi — the chapter that
                            enshrines fundamental rights and freedoms — we work to ensure these rights are translated
                            into practical realities for every person.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* SECTION 3 — IMPACT NUMBERS                                  */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="section-cf bg-gradient-to-b from-navy-950 to-navy-900/30 relative" aria-label="Impact statistics">
                <div className="container-cf">
                    <div className="text-center mb-16">
                        <span className="section-label">Our Impact</span>
                        <h2 className="font-display text-4xl lg:text-5xl text-white mt-4">
                            Building a Rights-Respecting Malawi
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="card-cf text-center"
                            >
                                <div className="stat-number mb-3">
                                    <AnimatedCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                                </div>
                                <p className="text-white/50 text-sm font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    <p className="text-center text-white/30 text-xs mt-8">
                        * Figures will be updated as the organization grows. These represent indicative milestones.
                    </p>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* SECTION 4 — WHAT WE DO                                      */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="section-cf bg-navy-950 relative" aria-label="What We Do">
                <div className="absolute inset-0 grid-bg opacity-20" />
                <div className="container-cf relative">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
                        <div>
                            <span className="section-label">What We Do</span>
                            <h2 className="font-display text-4xl lg:text-5xl text-white mt-4 max-w-xl">
                                Eight Thematic Areas of Work
                            </h2>
                        </div>
                        <Link href="/what-we-do" className="btn-secondary text-sm self-start lg:self-auto">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {thematicAreas.map((area, i) => {
                            const Icon = area.icon;
                            return (
                                <motion.div
                                    key={area.number}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                                >
                                    <Link
                                        href={`/what-we-do/${area.title.toLowerCase().replace(/[^a-z]+/g, '-')}`}
                                        id={`thematic-${area.number}`}
                                        className="thematic-card group block h-full"
                                    >
                                        <span className="number">{area.number}</span>

                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                                            style={{ backgroundColor: `${area.accent}20`, border: `1px solid ${area.accent}30` }}
                                        >
                                            <Icon className="w-5 h-5" style={{ color: area.accent }} />
                                        </div>

                                        <h3 className="font-sans font-semibold text-white text-base leading-snug mb-3 group-hover:text-gold-300 transition-colors">
                                            {area.title}
                                        </h3>

                                        <p className="text-white/50 text-sm leading-relaxed line-clamp-3 mb-4">
                                            {area.description}
                                        </p>

                                        <span className="inline-flex items-center gap-1.5 text-gold-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            Explore <ArrowRight className="w-3.5 h-3.5" />
                                        </span>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* SECTION 5 — OUR APPROACH (HRBA)                             */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="section-cf bg-gradient-to-b from-navy-950 via-navy-900/30 to-navy-950 relative overflow-hidden" aria-label="Our Approach">
                <div className="container-cf">
                    <div className="text-center mb-16">
                        <span className="section-label">Our Approach</span>
                        <h2 className="font-display text-4xl lg:text-5xl text-white mt-4 mb-6">
                            Human Rights-Based Approach
                        </h2>
                        <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
                            All our interventions apply a HRBA — recognizing individuals as rights holders
                            and institutions as duty bearers, ensuring participation, equality and accountability.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {hrbaPoints.map((point, i) => (
                            <motion.div
                                key={point.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.07 }}
                                className="card-cf text-center group"
                            >
                                <div className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center mx-auto mb-3
                                                group-hover:border-gold-500/70 group-hover:bg-gold-500/10 transition-all duration-300">
                                    <span className="text-gold-400 text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                                </div>
                                <h4 className="font-sans font-semibold text-white text-sm mb-2">{point.title}</h4>
                                <p className="text-white/40 text-xs leading-relaxed">{point.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* SECTION 6 — WHO WE SERVE                                    */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="section-cf bg-navy-950 relative" aria-label="Who We Serve">
                <div className="container-cf">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="flex-1">
                            <span className="section-label">Who We Serve</span>
                            <h2 className="font-display text-4xl lg:text-5xl text-white mt-4 mb-6 max-w-md">
                                Centring the Most Vulnerable
                            </h2>
                            <p className="text-white/60 leading-relaxed mb-8 max-w-lg">
                                Chapter Four works with a broad range of rights holders, with particular attention
                                to people and communities facing heightened vulnerability or barriers to accessing
                                justice and public services.
                            </p>
                            <Link href="/about#beneficiaries" className="btn-secondary text-sm">
                                Learn More <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="flex-1 flex flex-wrap gap-3">
                            {beneficiaries.map((group, i) => (
                                <motion.span
                                    key={group}
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.04 }}
                                    className="px-4 py-2.5 glass rounded-full text-sm text-white/80 hover:text-white hover:border-gold-500/40 transition-all duration-200 cursor-default"
                                >
                                    {group}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* SECTION 7 — LATEST NEWS & RESOURCES                         */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="section-cf bg-navy-950 relative" aria-label="Latest News">
                <div className="absolute inset-0 grid-bg opacity-15" />
                <div className="container-cf relative">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
                        <div>
                            <span className="section-label">Latest</span>
                            <h2 className="font-display text-4xl lg:text-5xl text-white mt-4">News & Resources</h2>
                        </div>
                        <Link href="/resources" className="btn-secondary text-sm self-start lg:self-auto">
                            View All Resources <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Placeholder news cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { type: 'Report', title: 'State of Human Rights in Malawi 2024', date: 'Sept 2024', excerpt: 'An overview of the human rights situation in Malawi, covering key developments in access to justice, democratic governance and fundamental freedoms.' },
                            { type: 'Statement', title: 'Chapter Four Statement on Constitutional Reforms', date: 'Aug 2024', excerpt: 'Chapter Four calls on Parliament to expedite constitutional reforms that strengthen the rights of marginalized communities and improve access to justice.' },
                            { type: 'Publication', title: 'Legal Empowerment in Rural Communities', date: 'Jul 2024', excerpt: 'A research publication examining the gaps in legal literacy and access to justice in rural Malawi, with recommendations for policy reform.' },
                        ].map((item, i) => (
                            <motion.article
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="card-cf group cursor-pointer"
                            >
                                {/* Placeholder image */}
                                <div className="h-44 rounded-xl bg-gradient-to-br from-navy-800/80 to-navy-900 mb-5 relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <FileText className="w-12 h-12 text-white/10" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
                                    <span className="absolute top-3 left-3 px-2.5 py-1 glass rounded-full text-gold-400 text-xs font-semibold uppercase tracking-wider">
                                        {item.type}
                                    </span>
                                </div>
                                <time className="text-white/40 text-xs font-medium">{item.date}</time>
                                <h3 className="font-sans font-semibold text-white mt-2 mb-3 leading-snug group-hover:text-gold-300 transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                                <p className="text-white/50 text-sm leading-relaxed line-clamp-3 mb-4">{item.excerpt}</p>
                                <span className="inline-flex items-center gap-1.5 text-gold-400 text-sm font-medium">
                                    Read More <ArrowRight className="w-3.5 h-3.5" />
                                </span>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* SECTION 8 — FEATURED PUBLICATION                            */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="section-cf bg-gradient-to-r from-navy-950 via-navy-900/50 to-navy-950 relative overflow-hidden" aria-label="Featured Publication">
                <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-gold-500/5 to-transparent" />
                <div className="container-cf relative">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        {/* Publication cover */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex-shrink-0 w-56 lg:w-72"
                        >
                            <div className="relative">
                                <div className="w-full aspect-[3/4] glass rounded-2xl flex items-center justify-center border-gold-500/20">
                                    <div className="text-center p-6">
                                        <div className="w-12 h-1 bg-gold-500 mx-auto mb-4" />
                                        <div className="font-display text-white/80 text-sm italic leading-relaxed">
                                            Annual Report
                                        </div>
                                        <div className="font-display text-white text-2xl mt-2">2024</div>
                                        <div className="text-gold-400/60 text-xs mt-3 font-sans tracking-widest uppercase">Chapter Four</div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-3 -right-3 w-full h-full glass rounded-2xl -z-10 border border-gold-500/10" />
                            </div>
                        </motion.div>

                        {/* Text */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex-1"
                        >
                            <span className="section-label mb-4">Featured Resource</span>
                            <h2 className="font-display text-4xl lg:text-5xl text-white mt-4 mb-4 max-w-lg leading-[1.1]">
                                State of Human Rights in Malawi — 2024
                            </h2>
                            <p className="text-white/60 leading-relaxed mb-8 max-w-xl">
                                A comprehensive review of the human rights landscape in Malawi, examining progress and challenges
                                in constitutional governance, access to justice, democratic participation and the protection of
                                vulnerable groups.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/resources/state-of-constitutional-rights-2024" className="btn-primary text-sm">
                                    Read Report <ArrowRight className="w-4 h-4" />
                                </Link>
                                <a
                                    href="#download"
                                    onClick={(e) => { e.preventDefault(); alert('Annual report PDF is being prepared for download.'); }}
                                    className="btn-secondary text-sm"
                                >
                                    Download PDF
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* SECTION 9 — OUR STORY (TIMELINE)                            */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="section-cf bg-navy-950 relative" aria-label="Our Story">
                <div className="container-cf">
                    <div className="text-center mb-16">
                        <span className="section-label">Our Story</span>
                        <h2 className="font-display text-4xl lg:text-5xl text-white mt-4">
                            A Movement Born from Within
                        </h2>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500/60 via-gold-500/20 to-transparent" />

                        {[
                            { year: '2016', title: 'The Movement Begins', desc: 'Chapter Four started as a human rights movement of students in Malawi, advocating for constitutional rights on campuses.' },
                            { year: '2018', title: 'Community Outreach', desc: 'Expanded beyond campus to engage rural communities on legal literacy, civic rights and access to justice.' },
                            { year: '2020', title: 'Formalization as an NGO', desc: 'Chapter Four formally registered as a non-governmental organization, growing its institutional capacity and programming.' },
                            { year: '2024', title: 'National Impact', desc: 'Now operating across Malawi with partnerships spanning civil society, government, academia and international bodies.' },
                        ].map((event, i) => (
                            <motion.div
                                key={event.year}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className={`relative flex items-start gap-8 mb-12 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} lg:gap-0`}
                            >
                                {/* Year bubble */}
                                <div className="flex-shrink-0 w-16 h-16 lg:absolute lg:left-1/2 lg:-translate-x-1/2 z-10
                                                bg-navy-950 border-2 border-gold-500 rounded-full flex items-center justify-center">
                                    <span className="font-display text-gold-400 text-sm">{event.year}</span>
                                </div>

                                {/* Content */}
                                <div className={`card-cf flex-1 ml-4 lg:ml-0 lg:w-5/12 ${i % 2 === 0 ? 'lg:mr-auto lg:pr-16' : 'lg:ml-auto lg:pl-16'}`}>
                                    <h3 className="font-sans font-semibold text-white text-lg mb-2">{event.title}</h3>
                                    <p className="text-white/60 text-sm leading-relaxed">{event.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* SECTION 10 — PARTNERS                                       */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="section-cf bg-navy-950/80 relative" aria-label="Partners">
                <div className="container-cf">
                    <div className="text-center mb-12">
                        <span className="section-label">Our Partners</span>
                        <h2 className="font-display text-4xl text-white mt-4">
                            Building Rights Together
                        </h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {['Government Institutions', 'Civil Society', 'Academic Institutions', 'Development Partners', 'Legal Practitioners', 'Media Organizations', 'Regional Bodies', 'Community Leaders'].map((partner, i) => (
                            <motion.div
                                key={partner}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                className="h-16 px-8 glass rounded-2xl flex items-center justify-center hover:border-gold-500/30 transition-all duration-300"
                            >
                                <span className="text-white/50 hover:text-white/80 text-sm font-medium transition-colors duration-200">{partner}</span>
                            </motion.div>
                        ))}
                    </div>
                    <p className="text-center text-white/30 text-xs mt-8">Partner logos will be displayed here once provided</p>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* SECTION 11 — GET INVOLVED (CTA)                             */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="section-cf relative overflow-hidden" aria-label="Get Involved">
                <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800/40 to-navy-950" />
                <div className="absolute inset-0 dot-grid opacity-40" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-500/5 glow-gold blur-3xl" />

                <div className="container-cf relative text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="section-label justify-center mb-6">Get Involved</span>
                        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mt-4 mb-6 max-w-3xl mx-auto leading-[1.1]">
                            Human rights are{' '}
                            <span className="text-gradient-gold italic">everyone's</span>{' '}
                            responsibility.
                        </h2>
                        <p className="text-white/60 text-lg max-w-xl mx-auto mb-12">
                            Join us in building a Malawi where constitutional rights are respected, protected and enjoyed by all.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                { label: 'Partner With Us', href: '/get-involved#partner', primary: true },
                                { label: 'Volunteer', href: '/get-involved#volunteer', primary: false },
                                { label: 'Support Our Work', href: '/get-involved#support', primary: false },
                                { label: 'Report a Concern', href: '/get-involved#report', primary: false },
                            ].map((action) => (
                                <Link
                                    key={action.label}
                                    href={action.href}
                                    id={`cta-${action.label.toLowerCase().replace(/\s+/g, '-')}`}
                                    className={action.primary ? 'btn-primary' : 'btn-secondary'}
                                >
                                    {action.label}
                                    {action.primary && <ArrowRight className="w-4 h-4" />}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </PublicLayout>
    );
}
