import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { Lottie } from 'lottie-react';
import loadingAnimation from '../../../resources/assets/lottie/Animation - 1723184581142.json';

export default function PageLoader() {
    // Only show during Inertia page navigations — NOT on initial page load.
    // The old 650ms initial delay was blocking FCP and LCP.
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        const removeStart = router.on('start', () => {
            setIsNavigating(true);
        });

        const removeFinish = router.on('finish', () => {
            setTimeout(() => {
                setIsNavigating(false);
            }, 250);
        });

        const removeError = router.on('error', () => {
            setIsNavigating(false);
        });

        return () => {
            removeStart();
            removeFinish();
            removeError();
        };
    }, []);

    if (!isNavigating) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-md transition-opacity duration-300 pointer-events-auto select-none opacity-100"
            aria-live="polite"
            aria-busy="true"
        >
            <div className="relative flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 flex items-center justify-center">
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
