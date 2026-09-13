import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                serif: ['"DM Serif Display"', ...defaultTheme.fontFamily.serif],
                display: ['"DM Serif Display"', ...defaultTheme.fontFamily.serif],
            },
            colors: {
                // Chapter Four Brand Palette
                navy: {
                    50:  '#f0f4ff',
                    100: '#dbe4ff',
                    200: '#bfcfff',
                    300: '#93aeff',
                    400: '#6080ff',
                    500: '#3a58f0',
                    600: '#2538e5',
                    700: '#1e2dcb',
                    800: '#1d28a4',
                    900: '#1c2882',
                    950: '#0f172a',
                },
                gold: {
                    50:  '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#f59e0b',
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                    950: '#451a03',
                },
                crimson: {
                    50:  '#fff1f2',
                    100: '#ffe4e6',
                    200: '#fecdd3',
                    300: '#fda4af',
                    400: '#fb7185',
                    500: '#f43f5e',
                    600: '#e11d48',
                    700: '#be123c',
                    800: '#9f1239',
                    900: '#881337',
                    950: '#4c0519',
                },
                slate: {
                    ...defaultTheme.colors?.slate,
                    950: '#020617',
                },
            },
            backgroundImage: {
                'hero-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e2882 50%, #0f172a 100%)',
                'gold-gradient': 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                'section-gradient': 'linear-gradient(180deg, #0f172a 0%, #1a2150 100%)',
            },
            animation: {
                'fade-up': 'fadeUp 0.7s ease-out forwards',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-in-left': 'slideInLeft 0.7s ease-out forwards',
                'slide-in-right': 'slideInRight 0.7s ease-out forwards',
                'counter': 'counter 2s ease-out forwards',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'shimmer': 'shimmer 2s infinite',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-40px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(40px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
            transitionTimingFunction: {
                'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
            boxShadow: {
                'gold': '0 0 30px rgba(245, 158, 11, 0.3)',
                'navy': '0 0 30px rgba(15, 23, 42, 0.5)',
                'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
                'card': '0 4px 24px rgba(0, 0, 0, 0.12)',
                'card-hover': '0 20px 60px rgba(0, 0, 0, 0.2)',
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },

    plugins: [forms],
};
