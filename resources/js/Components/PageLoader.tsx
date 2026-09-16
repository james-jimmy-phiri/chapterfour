import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { Lottie } from 'lottie-react';
import loadingAnimation from '../../../resources/assets/lottie/Animation - 1723184581142.json';

export default function PageLoader() {
    const [initialLoading, setInitialLoading] = useState(true);
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        // Initial page load smooth transition
        const timer = setTimeout(() => {
            setInitialLoading(false);
        }, 650);

        // Inertia page transition listeners
        const removeStart = router.on('start', () => {
            setIsNavigating(true);
        });

        const removeFinish = router.on('finish', () => {
            // Give a tiny buffer for smooth exit
            setTimeout(() => {
                setIsNavigating(false);
            }, 250);
        });

        const removeError = router.on('error', () => {
            setIsNavigating(false);
        });

        return () => {
            clearTimeout(timer);
            removeStart();
            removeFinish();
            removeError();
        };
    }, []);

    const show = initialLoading || isNavigating;

    if (!show) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-md transition-opacity duration-300 pointer-events-auto select-none ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            aria-live="polite"
            aria-busy="true"
        >
            <div className="relative flex flex-col items-center justify-center p-8 text-center">
                {/* Lottie Animation */}
                <div className="w-24 h-24 sm:w-24 sm:h-24 flex items-center justify-center">
                    <Lottie
                        src={loadingAnimation}
                        loop={true}
                        autoplay={true}
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>


            </div>
        </div>
    );
}
