import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Loader2, Shield, AlertCircle, CheckCircle2, Scale } from 'lucide-react';
import { useState } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword?: boolean;
}) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    };

    return (
        <>
            <Head title="Admin Login — Chapter Four Malawi" />

            <div className="relative flex min-h-screen w-full">
                {/* Left Panel: Form */}
                <div className="flex w-full flex-col items-center justify-center bg-white px-8 py-12 md:w-1/2">
                    <div className="w-full max-w-md">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col gap-8"
                        >
                            {/* Logo */}
                            <motion.div variants={itemVariants}>
                                <Link href="/">
                                    <img
                                        src="/images/logos/logo-black.png"
                                        alt="Chapter Four Malawi"
                                        className="h-14 w-auto object-contain"
                                    />
                                </Link>
                            </motion.div>

                            {/* Header */}
                            <motion.div variants={itemVariants}>
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                                    Welcome back
                                </h1>
                                <p className="mt-2 text-slate-500">
                                    Sign in to the Chapter Four administrative dashboard.
                                </p>
                            </motion.div>

                            {/* Status Message (e.g. after password reset) */}
                            <AnimatePresence>
                                {status && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-start gap-3 rounded-xl bg-emerald-50 border border-emerald-200 p-4"
                                    >
                                        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                                        <p className="text-sm text-emerald-800 font-medium">{status}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Global Error Banner */}
                            <AnimatePresence>
                                {(errors.email || errors.password) && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 p-4"
                                    >
                                        <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-bold text-red-800">Authentication failed</p>
                                            <p className="text-sm text-red-700 mt-0.5">
                                                {errors.email || errors.password}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Email Field */}
                                <motion.div variants={itemVariants}>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-bold text-slate-700 mb-2"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="admin@chapterfourmalawi.org"
                                        className={`w-full px-4 py-3 rounded-xl border text-base outline-none transition-all duration-200 bg-slate-50 focus:bg-white ${
                                            errors.email
                                                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                                                : 'border-slate-200 focus:border-[#ca583b] focus:ring-2 focus:ring-[#ca583b]/20'
                                        }`}
                                        disabled={processing}
                                    />
                                    {errors.email && (
                                        <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.email}</p>
                                    )}
                                </motion.div>

                                {/* Password Field */}
                                <motion.div variants={itemVariants}>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-bold text-slate-700 mb-2"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            autoComplete="current-password"
                                            required
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="••••••••••••"
                                            className={`w-full px-4 py-3 pr-12 rounded-xl border text-base outline-none transition-all duration-200 bg-slate-50 focus:bg-white ${
                                                errors.password
                                                    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                                                    : 'border-slate-200 focus:border-[#ca583b] focus:ring-2 focus:ring-[#ca583b]/20'
                                            }`}
                                            disabled={processing}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.password}</p>
                                    )}
                                </motion.div>

                                {/* Remember Me + Forgot Password */}
                                <motion.div variants={itemVariants} className="flex items-center justify-between">
                                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            disabled={processing}
                                            className="w-4 h-4 rounded border-slate-300 accent-[#ca583b] cursor-pointer"
                                        />
                                        <span className="text-sm text-slate-600">Keep me signed in</span>
                                    </label>

                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm font-semibold text-[#ca583b] hover:text-[#b04a30] transition-colors"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </motion.div>

                                {/* Submit Button */}
                                <motion.div variants={itemVariants}>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="relative w-full py-3.5 bg-[#ca583b] hover:bg-[#b04a30] text-white font-bold text-base rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#ca583b]/30 flex items-center justify-center gap-2.5 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        <AnimatePresence mode="wait">
                                            {processing ? (
                                                <motion.span
                                                    key="loading"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center gap-2.5"
                                                >
                                                    <Loader2 className="h-5 w-5 animate-spin" />
                                                    Authenticating...
                                                </motion.span>
                                            ) : (
                                                <motion.span
                                                    key="submit"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center gap-2.5"
                                                >
                                                    <Shield className="h-5 w-5" />
                                                    Sign In Securely
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </button>
                                </motion.div>
                            </form>

                            {/* Footer */}
                            <motion.div
                                variants={itemVariants}
                                className="text-center text-sm text-slate-400 border-t border-slate-100 pt-6"
                            >
                                <Link
                                    href="/"
                                    className="font-semibold text-slate-500 hover:text-[#ca583b] transition-colors"
                                >
                                    ← Back to public website
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Right Panel: Image */}
                <div className="relative hidden w-1/2 md:block overflow-hidden">
                    <img
                        src="/images/animate-img-3.jpg"
                        alt="Justice and Law"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    
                </div>
            </div>
        </>
    );
}
