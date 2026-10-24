import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    build: {
        // Increase chunk size warning threshold (many small Lucide icon chunks are expected)
        chunkSizeWarningLimit: 600,
        rollupOptions: {
            output: {
                // Manual code splitting: separate heavy vendor libraries so the
                // main app chunk stays small and browsers can cache them independently.
                manualChunks(id) {
                    // Framer Motion — large animation lib, cache separately
                    if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion')) {
                        return 'vendor-framer';
                    }
                    // Three.js + React Three Fiber — only used on specific pages
                    if (id.includes('node_modules/three') || id.includes('node_modules/@react-three')) {
                        return 'vendor-three';
                    }
                    // Lottie — used only by PageLoader
                    if (id.includes('node_modules/lottie')) {
                        return 'vendor-lottie';
                    }
                    // Radix UI primitives
                    if (id.includes('node_modules/@radix-ui')) {
                        return 'vendor-radix';
                    }
                    // React core — always cached after first visit
                    if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
                        return 'vendor-react';
                    }
                    // Inertia — small but separate from app code
                    if (id.includes('node_modules/@inertiajs')) {
                        return 'vendor-inertia';
                    }
                    // Remaining node_modules go into a general vendor chunk
                    if (id.includes('node_modules')) {
                        return 'vendor-misc';
                    }
                },
            },
        },
    },
});
