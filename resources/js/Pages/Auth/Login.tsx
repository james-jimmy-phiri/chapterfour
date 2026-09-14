import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import {
    Shield, Lock, Mail, ArrowLeft, ArrowRight, CheckCircle2,
    Eye, EyeOff, Sparkles, Scale, KeyRound, Loader2
} from 'lucide-react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword?: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [demoFilled, setDemoFilled] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const handleFillDemo = () => {
        setData({
            email: 'admin@chapterfour.mw',
            password: 'password',
            remember: true,
        });
        setDemoFilled(true);
        setTimeout(() => setDemoFilled(false), 3000);
    };

    return (
        <div className="min-h-screen w-full flex bg-[#06090e] text-slate-100 selection:bg-amber-500 selection:text-navy-950 font-sans">
            <Head title="Administrative Access — Chapter Four CMS" />

            {/* Left Cinematic Panel - Hidden on Mobile */}
            <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 lg:p-16 overflow-hidden border-r border-white/5 bg-gradient-to-b from-[#090d16] via-[#06080e] to-[#04060a]">
                {/* Ambient glow backgrounds */}
                <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_30%,rgba(245,158,11,0.06),transparent)] pointer-events-none" />

                {/* Top Brand & Back to Site */}
                <div className="relative z-10 flex items-center justify-between">
                    <Link href="/" className="group flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500/20 to-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10 group-hover:border-amber-400 transition-all">
                            <span className="font-serif font-bold text-xl tracking-tight">IV</span>
                        </div>
                        <div>
                            <div className="font-serif text-lg text-white font-normal group-hover:text-amber-300 transition-colors">Chapter Four</div>
                            <div className="text-[10px] text-amber-400/70 tracking-[0.25em] uppercase font-mono">Malawi</div>
                        </div>
                    </Link>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-all"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
                    </Link>
                </div>

                {/* Central Constitutional Mission Statement */}
                <div className="relative z-10 my-auto max-w-lg space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Scale className="w-3.5 h-3.5" /> Constitutional Bill of Rights
                    </div>

                    <h2 className="font-serif text-3xl xl:text-4xl text-white font-normal leading-snug">
                        Defending rights, <span className="italic text-gradient-gold">empowering youth</span>, and advancing justice across Malawi.
                    </h2>

                    <blockquote className="border-l-2 border-amber-500/50 pl-4 py-1 text-slate-300 text-sm italic leading-relaxed font-light">
                        "The dignity of all persons shall be inviolable. Respect for human dignity shall be guaranteed in all proceedings."
                        <span className="block mt-2 font-mono text-xs text-amber-400/80 not-italic uppercase tracking-wider">
                            — Section 19, Constitution of the Republic of Malawi
                        </span>
                    </blockquote>

                    {/* Security credentials badges */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-0.5">
                                <Shield className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-xs font-medium text-white">RBAC Enforced</div>
                                <div className="text-[11px] text-slate-400">Strict Spatie role validation</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 mt-0.5">
                                <Lock className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-xs font-medium text-white">Audit Trail</div>
                                <div className="text-[11px] text-slate-400">All actions logged & signed</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer Details */}
                <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 pt-6 border-t border-white/5 font-mono">
                    <span>Chapter Four Secretariat • Lilongwe</span>
                    <span>Secured Administration v2.4</span>
                </div>
            </div>

            {/* Right Form Panel */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
                {/* Ambient glow on right side */}
                <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

                <div className="w-full max-w-md space-y-8 relative z-10">
                    {/* Mobile Header (hidden on desktop) */}
                    <div className="lg:hidden flex items-center justify-between pb-6 border-b border-white/5">
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-serif font-bold">
                                IV
                            </div>
                            <span className="font-serif text-white font-medium">Chapter Four</span>
                        </Link>
                        <Link href="/" className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
                            <ArrowLeft className="w-3 h-3" /> Website
                        </Link>
                    </div>

                    {/* Form Header */}
                    <div>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider bg-white/5 text-slate-300 border border-white/10 mb-3">
                            <KeyRound className="w-3 h-3 text-amber-400" /> CMS Console
                        </span>
                        <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight">
                            Sign in to <span className="text-gradient-gold italic">Admin</span>
                        </h1>
                        <p className="mt-2 text-sm text-slate-400 font-light">
                            Enter your credentials to access the Chapter Four administrative management system.
                        </p>
                    </div>

                    {/* Quick Demo Credentials Autofill Banner */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                                <div>
                                    <div className="text-xs font-medium text-white">Default Admin Account</div>
                                    <div className="text-[11px] text-amber-300/80 font-mono">admin@chapterfour.mw</div>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleFillDemo}
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-navy-950 transition-all shadow-sm shrink-0 flex items-center gap-1.5"
                            >
                                {demoFilled ? (
                                    <>
                                        <CheckCircle2 className="w-3.5 h-3.5 text-navy-950" /> Filled!
                                    </>
                                ) : (
                                    '1-Click Fill'
                                )}
                            </button>
                        </div>
                    </div>

                    {status && (
                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>{status}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={submit} className="space-y-5">
                        {/* Email Input */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="name@chapterfour.mw"
                                    autoComplete="username"
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-sm font-sans"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                                    Password
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-xs text-amber-400/90 hover:text-amber-300 transition-colors"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••••••"
                                    autoComplete="current-password"
                                    required
                                    className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-sm font-sans font-mono"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember Me Toggle */}
                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2.5 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="w-4 h-4 rounded bg-white/5 border-white/20 text-amber-500 focus:ring-amber-500 focus:ring-offset-0 transition-all"
                                />
                                <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                                    Keep me signed in on this device
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full mt-2 py-3.5 px-6 rounded-xl font-semibold text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-navy-950 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin text-navy-950" />
                                    <span>Authenticating...</span>
                                </>
                            ) : (
                                <>
                                    <span>Authenticate to Dashboard</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Bottom Security Assurance */}
                    <div className="pt-6 border-t border-white/5 text-center text-xs text-slate-500">
                        <p className="flex items-center justify-center gap-1.5">
                            <Shield className="w-3.5 h-3.5 text-emerald-400" />
                            Authorized Chapter Four personnel only. All access attempts logged.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
