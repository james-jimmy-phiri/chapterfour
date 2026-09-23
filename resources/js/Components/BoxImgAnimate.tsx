import React, { useEffect, useRef } from 'react';

export interface ParallaxScrollConfig {
    x?: number;
    y?: number;
    smoothness?: number;
    fromScroll?: number;
    toScroll?: number;
    distance?: number;
}

export interface AnimateImageItem {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    parallax: ParallaxScrollConfig;
}

const DEFAULT_ANIMATE_ITEMS: AnimateImageItem[] = [
    {
        src: '/images/say_no.jpg',
        alt: 'Human rights and community awareness 1',
        width: 217,
        height: 153,
        parallax: { y: 0, x: 140, smoothness: 50 },
    },
    {
        src: '/images/animate-img-5.jpg',
        alt: 'Human rights and community awareness 5',
        width: 179,
        height: 126,
        parallax: { y: 60, x: 70, smoothness: 50 },
    }
    ,
    {
        src: '/images/woman.jpg',
        alt: 'Human rights and community awareness 3',
        width: 271,
        height: 191,
        parallax: { y: 70, x: -250, smoothness: 50 },
    },
    {
        src: '/images/animate-img-4.jpg',
        alt: 'Human rights and community awareness 4',
        width: 339,
        height: 236,
        parallax: { y: 20, x: 20, smoothness: 50 },
    },
    {
        src: '/images/gbvreport.png',
        alt: 'Human rights and community awareness 2',
        width: 271,
        height: 191,
        parallax: { y: 150, x: 0, smoothness: 50 },
    }
    ,
    {
        src: '/images/animate-img-6.jpg',
        alt: 'Human rights and community awareness 6',
        width: 217,
        height: 153,
        parallax: { y: 0, x: 140, smoothness: 50 },
    },
];

interface BoxImgAnimateProps {
    items?: AnimateImageItem[];
    className?: string;
}

export const BoxImgAnimate: React.FC<BoxImgAnimateProps> = ({
    items = DEFAULT_ANIMATE_ITEMS,
    className = '',
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        let rafId: number;
        let isInit = true;

        // Current interpolated positions
        const currentPositions = items.map(() => ({ x: 0, y: 0 }));

        const checkIsMobile = () => {
            return (
                window.innerWidth < 1024 ||
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            );
        };

        const updateParallax = () => {
            const isMobile = checkIsMobile();

            if (isMobile) {
                // On mobile, reset any applied parallax translation to maintain clean responsive stacked layout
                itemRefs.current.forEach((el) => {
                    if (el) {
                        el.style.transform = '';
                    }
                });
                rafId = requestAnimationFrame(updateParallax);
                return;
            }

            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;

            items.forEach((item, index) => {
                const el = itemRefs.current[index];
                if (!el) return;

                // Calculate element offset relative to the document
                const rect = el.getBoundingClientRect();
                const elemOffsetTop = rect.top + scrollTop;

                // Match original ParallaxScroll calculation:
                // h (from-scroll) defaults to Math.max(0, elemOffsetTop - windowHeight)
                const fromScroll =
                    item.parallax.fromScroll !== undefined
                        ? item.parallax.fromScroll
                        : Math.max(0, elemOffsetTop - windowHeight);

                const distance = item.parallax.distance ?? windowHeight;
                const toScroll =
                    item.parallax.toScroll !== undefined
                        ? item.parallax.toScroll
                        : fromScroll + distance;

                const smoothness = isInit ? 1 : item.parallax.smoothness ?? 50;

                // Clamp current scroll between fromScroll and toScroll
                const clampedScroll = Math.max(fromScroll, Math.min(toScroll, scrollTop));

                // Progress ratio [0..1]
                const progress =
                    toScroll > fromScroll ? (clampedScroll - fromScroll) / (toScroll - fromScroll) : 0;

                const targetX = progress * (item.parallax.x ?? 0);
                const targetY = progress * (item.parallax.y ?? 0);

                // Fluid Lerp: current = current + (target - current) / smoothness
                const current = currentPositions[index];
                current.x += (targetX - current.x) / smoothness;
                current.y += (targetY - current.y) / smoothness;

                const roundFactor = 1000;
                const roundedX = Math.round(current.x * roundFactor) / roundFactor;
                const roundedY = Math.round(current.y * roundFactor) / roundFactor;

                el.style.transform = `translate3d(${roundedX}px, ${roundedY}px, 0px)`;
            });

            if (isInit) {
                isInit = false;
            }

            rafId = requestAnimationFrame(updateParallax);
        };

        rafId = requestAnimationFrame(updateParallax);

        return () => {
            cancelAnimationFrame(rafId);
        };
    }, [items]);

    return (
        <div
            ref={containerRef}
            className={`box-img-animate text-center relative max-w-[560px] mx-auto select-none ${className}`}
        >
            {items.map((item, index) => (
                <div
                    key={index}
                    ref={(el) => (itemRefs.current[index] = el)}
                    className="box-img-animate-item inline-block p-0 max-xl:px-3.5 max-xl:py-2.5 max-xl:first:mt-0 max-xl:mt-5 transform-gpu will-change-transform"
                    data-parallax-scroll={JSON.stringify(item.parallax)}
                >
                    <img
                        src={item.src}
                        alt={item.alt || `Animated image ${index + 1}`}
                        width={item.width}
                        height={item.height}
                        className="rounded-[6px] shadow-[8px_14px_40px_rgba(0,0,0,0.25)] max-w-full h-auto inline-block align-middle transition-shadow duration-300 hover:shadow-[8px_20px_45px_rgba(0,0,0,0.35)]"
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
    );
};

export default BoxImgAnimate;
