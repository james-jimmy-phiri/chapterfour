import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['"League Spartan"', '"Spartan"', '"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
                display: ['"League Spartan"', '"Spartan"', '"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
                serif: ['"DM Serif Display"', ...defaultTheme.fontFamily.serif],
            },
            boxShadow: {
                'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            },
            colors: {
                // Official Chapter Four Brand Palette
                brand: {
                    rust: '#ca583b',
                    'rust-dark': '#b54b30',
                    'rust-light': '#fdf2ef',
                    brick: '#893629',
                    mahogany: '#6e2316',
                    amber: '#f0a552',
                    'amber-dark': '#d98b36',
                    'amber-light': '#fef7ee',
                    gold: '#f3a451',
                    peach: '#e6a96f',
                    olive: '#a2c35a',
                    'olive-dark': '#8aa848',
                    'olive-light': '#f5f9ee',
                    dark: '#23170e',
                    espresso: '#1c120b',
                    cream: '#FAF8F5',
                    sand: '#F5EFEB',
                    slate: '#2c2523',
                },
                // Legacy palette support mapping to brand colors
                navy: {
                    50:  '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#090d16',
                },
                gold: {
                    50:  '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#f0a552', // Chapter 4 amber
                    600: '#d98b36',
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
                    500: '#ca583b', // Chapter 4 rust
                    600: '#893629', // Chapter 4 brick
                    700: '#6e2316', // Chapter 4 mahogany
                    800: '#542923',
                    900: '#3d1c17',
                    950: '#23170e',
                },
            },
            backgroundImage: {
                'hero-gradient': 'linear-gradient(135deg, #23170e 0%, #6e2316 50%, #23170e 100%)',
                'rust-gradient': 'linear-gradient(115deg, #ca583b 0%, #b54b30 50%, #893629 100%)',
                'amber-gradient': 'linear-gradient(135deg, #f0a552 0%, #f3a451 100%)',
                'section-gradient': 'linear-gradient(180deg, #FAF8F5 0%, #ffffff 100%)',
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
            boxShadow: {
                'rust': '0 0 30px rgba(202, 88, 59, 0.25)',
                'amber': '0 0 30px rgba(240, 165, 82, 0.25)',
                'card': '0 2px 12px rgba(35, 23, 14, 0.06)',
                'card-hover': '0 12px 32px rgba(35, 23, 14, 0.12)',
            },
        },
    },

    plugins: [forms],
};
