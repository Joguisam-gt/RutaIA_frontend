import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@api': path.resolve(__dirname, './src/api'),
            '@components': path.resolve(__dirname, './src/components'),
            '@context': path.resolve(__dirname, './src/context'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@screens': path.resolve(__dirname, './src/screens'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@constants': path.resolve(__dirname, './src/constants'),
        },
    },
    server: {
        port: 3000,
        open: true,
        host: true,
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
        chunkSizeWarningLimit: 1000,
    },
});