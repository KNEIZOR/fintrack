import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],

    css: {
        modules: {
            generateScopedName: '[name]__[local]',
        },
    },

    resolve: {
        alias: {
            '@': '/src',
        },
    },
});
