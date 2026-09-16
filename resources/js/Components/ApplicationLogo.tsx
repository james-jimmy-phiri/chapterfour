import ChapterFourLogo from '@/Components/ChapterFourLogo';

interface ApplicationLogoProps {
    className?: string;
    variant?: 'full' | 'white' | 'black';
}

export default function ApplicationLogo({ className = 'h-10 w-auto', variant = 'full' }: ApplicationLogoProps) {
    return <ChapterFourLogo variant={variant} imgClassName={className} />;
}
