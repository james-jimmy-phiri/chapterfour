import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useScroll, useMotionValue } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

// --- FlipCard Component ---
const IMG_WIDTH = 80;
const IMG_HEIGHT = 110;

function FlipCard({
    src,
    index,
    total,
    phase,
    target,
}: FlipCardProps) {
    return (
        <motion.div
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 40,
                damping: 15,
            }}
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d",
                perspective: "1000px",
                marginLeft: -IMG_WIDTH / 2, // Center transform origin
                marginTop: -IMG_HEIGHT / 2,
            }}
            className="cursor-pointer group"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-200 border border-slate-200"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img
                        src={src}
                        alt={`hero-${index}`}
                        className="h-full w-full object-cover grayscale-[20%]"
                    />
                    <div className="absolute inset-0 bg-brand-rust/20 mix-blend-multiply transition-colors group-hover:bg-transparent" />
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-slate-900 flex flex-col items-center justify-center p-4 border border-brand-amber/30"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="text-center">
                        <p className="text-[10px] font-bold text-brand-amber uppercase tracking-widest mb-1">Goal {index + 1}</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Local Images ---
const IMAGES = [
    "/images/book/child.jpg",
    "/images/book/children.jpg",
    "/images/book/childrenfaces.png",
    "/images/book/hands.webp",
    "/images/book/handsup.webp",
    "/images/book/human-rights-day.jpg",
    "/images/book/inner_1.jpg",
    "/images/book/no_silent.jpg",
    "/images/book/racism.jpg",
    "/images/book/rights_for_all.jpg",
    "/images/book/stop_killing_us.jpg",
    "/images/book/vulnurable.jpg",
];
const TOTAL_IMAGES = IMAGES.length;

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function ScrollMorphHero() {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const contentRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;
        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };
        const observer = new ResizeObserver(handleResize);
        observer.observe(contentRef.current);
        setContainerSize({
            width: contentRef.current.offsetWidth,
            height: contentRef.current.offsetHeight,
        });
        return () => observer.disconnect();
    }, []);

    // Scroll progress over the h-[350vh] wrapper
    const { scrollYProgress } = useScroll({
        target: wrapperRef,
        offset: ["start start", "end end"]
    });

    // Map scroll [0, 1] to a virtual scroll timeline [0, 3000] to match the original math perfectly
    const virtualScroll = useTransform(scrollYProgress, [0, 1], [0, 3000]);

    const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = contentRef.current;
        if (!container) return;
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    const scatterPositions = useMemo(() => {
        return IMAGES.map(() => ({
            x: (Math.random() - 0.5) * 1500,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
            opacity: 0,
        }));
    }, []);

    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeParallax();
        };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    return (
        <div ref={wrapperRef} className="w-full relative h-[350vh] bg-[#FDFBF7] border-y border-[#E8E1D5]">
            <div ref={contentRef} className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center pt-[2px]">

                {/* Initial Intro Text */}
                <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2">
                    <motion.h1
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        className="text-4xl font-bold tracking-tight text-slate-800 md:text-5xl font-serif"
                    >
                        Our Core Objectives
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.8 - morphValue } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-6 text-xs font-bold tracking-[0.2em] text-brand-rust uppercase font-sans animate-pulse"
                    >
                        SCROLL DOWN TO EXPLORE
                    </motion.p>
                </div>

                {/* Revealed Objectives Content */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[5%] md:top-[10%] z-10 flex flex-col w-full pointer-events-auto px-4"
                >
                    <div className="max-w-7xl mx-auto w-full">
                        <div className="text-center max-w-3xl mx-auto mb-10">
                            <span className="text-brand-rust font-bold tracking-widest uppercase mb-4 block">Core Goals</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 font-serif">Our Objectives</h2>
                            <p className="text-slate-600 text-lg">
                                To promote a just, inclusive and democratic Malawi in which constitutional rights and freedoms are respected and protected.
                            </p>
                        </div>

                        <div className="space-y-4 max-w-4xl mx-auto">
                            {[
                                "To promote and protect human rights and access to justice by empowering citizens, particularly vulnerable and marginalized groups, to understand, claim and defend their rights, access effective remedies, and promote the rule of law and constitutionalism.",
                                "To strengthen accountable, transparent and democratic governance through human rights monitoring, research, evidence-based advocacy, civic participation and engagement with public institutions to promote laws, policies and practices that uphold constitutional principles.",
                                "To strengthen community-based human rights protection and collaboration by working with communities, government, civil society, development partners and other stakeholders to advance human rights, social inclusion, democratic participation and respect for human dignity."
                            ].map((objective, idx) => (
                                <div
                                    key={idx}
                                    className="flex gap-4 bg-white/95 backdrop-blur-md p-6 rounded-xl border border-slate-100 hover:shadow-lg transition-all text-left max-h-[140px] overflow-y-auto"
                                >
                                    <CheckCircle2 className="w-6 h-6 text-brand-rust shrink-0 mt-1" />
                                    <p className="text-slate-700 leading-relaxed text-sm md:text-base">{objective}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Main Image Container */}
                <div className="relative flex items-center justify-center w-full h-full pointer-events-none">
                    {IMAGES.map((src, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        if (introPhase === "scatter") {
                            target = scatterPositions[i];
                        } else if (introPhase === "line") {
                            const lineSpacing = 100;
                            const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
                        } else {
                            const isMobile = containerSize.width < 768;
                            const minDimension = Math.min(containerSize.width, containerSize.height);

                            // Circle - Widened but padded from edges
                            const maxCircleRadius = (containerSize.height / 2) - (IMG_HEIGHT / 2) - 10; // 30px safe space
                            const circleRadius = Math.min(minDimension * 0.45, maxCircleRadius, 500);
                            const circleAngle = (i / TOTAL_IMAGES) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            // Arc - Widened
                            const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                            const arcRadius = baseRadius * (isMobile ? 1.5 : 1.25);
                            const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
                            const arcCenterY = arcApexY + arcRadius;

                            const spreadAngle = isMobile ? 120 : 160;
                            const startAngle = -90 - (spreadAngle / 2);
                            const step = spreadAngle / (TOTAL_IMAGES - 1);

                            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                            const maxRotation = spreadAngle * 0.8;
                            const boundedRotation = -scrollProgress * maxRotation;

                            const currentArcAngle = startAngle + (i * step) + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.4 : 1.8,
                            };

                            target = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                scale: lerp(1, arcPos.scale, morphValue),
                                opacity: 1,
                            };
                        }

                        return (
                            <div key={i} className="pointer-events-auto">
                                <FlipCard
                                    src={src}
                                    index={i}
                                    total={TOTAL_IMAGES}
                                    phase={introPhase}
                                    target={target}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
