import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            const windowScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
            let containerScroll = 0;
            document.querySelectorAll('.overflow-y-auto, main').forEach(el => {
                if (el.scrollTop > containerScroll) {
                    containerScroll = el.scrollTop;
                }
            });

            if (windowScroll > 300 || containerScroll > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        document.addEventListener('scroll', toggleVisibility, { passive: true, capture: true });
        toggleVisibility();

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
            document.removeEventListener('scroll', toggleVisibility, { capture: true } as EventListenerOptions);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        document.documentElement.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        document.body.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        document.querySelectorAll('.overflow-y-auto, main').forEach(el => {
            el.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.6, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6, y: 16 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    onClick={scrollToTop}
                    aria-label="Back to top"
                    title="Back to top"
                    className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-brand-rust hover:bg-[#8F3415] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-rust focus:ring-offset-2 ring-offset-slate-900/10 cursor-pointer"
                >
                    <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
