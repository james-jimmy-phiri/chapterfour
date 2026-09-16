import { Link } from '@inertiajs/react';

interface ChapterFourLogoProps {
    variant?: 'full' | 'white' | 'black';
    className?: string;
    imgClassName?: string;
    showText?: boolean;
    href?: string;
}

export default function ChapterFourLogo({
    variant = 'full',
    className = '',
    imgClassName = 'h-24 w-auto',
    showText = false,
    href,
}: ChapterFourLogoProps) {
    const logoSrc = variant === 'white'
        ? '/images/logos/logo-white.png'
        : variant === 'black'
            ? '/images/logos/logo-black.png'
            : '/images/logos/logo-full.png';

    const content = (
        <div className={`flex items-center gap-3 ${className}`}>
            <img
                src={logoSrc}
                alt="Chapter Four Logo"
                className={`object-contain transition-transform duration-200 group-hover:scale-105 ${imgClassName}`}
            />
            {showText && (
                <div className="flex flex-col leading-tight">
                    <span className={`font-bold tracking-tight text-lg ${variant === 'white' ? 'text-white' : 'text-brand-mahogany'
                        }`}>
                        Chapter Four
                    </span>
                    <span className={`text-[10px] font-semibold tracking-widest uppercase ${variant === 'white' ? 'text-white/70' : 'text-brand-amber'
                        }`}>
                        Malawi
                    </span>
                </div>
            )}
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="inline-flex items-center group">
                {content}
            </Link>
        );
    }

    return content;
}
