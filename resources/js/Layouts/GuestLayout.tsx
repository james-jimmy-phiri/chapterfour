import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { Shield, ArrowLeft } from 'lucide-react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-[#06090e] text-slate-100 selection:bg-amber-500 selection:text-navy-950 font-sans relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(245,158,11,0.05),transparent)] pointer-events-none" />

            {/* Top Brand Link */}
            <div className="mb-8 text-center relative z-10">
                <Link href="/" className="inline-flex items-center gap-3 group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500/20 to-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10 group-hover:border-amber-400 transition-all">
                        <span className="font-serif font-bold text-2xl tracking-tight">IV</span>
                    </div>
                    <div className="text-left">
                        <div className="font-serif text-xl text-white font-normal group-hover:text-amber-300 transition-colors">Chapter Four</div>
                        <div className="text-[10px] text-amber-400/70 tracking-[0.25em] uppercase font-mono">Malawi</div>
                    </div>
                </Link>
            </div>

            {/* Container Card */}
            <div className="w-full sm:max-w-md p-8 rounded-2xl bg-[#0b0f19]/90 border border-white/10 shadow-2xl backdrop-blur-xl relative z-10">
                {children}
            </div>

            {/* Back to Home Link */}
            <div className="mt-6 text-center relative z-10">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-3.5 h-3.5" /> Return to Chapter Four Public Portal
                </Link>
            </div>
        </div>
    );
}
