import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('motion')) {
                return 'vendor-motion';
              }
              if (id.includes('qrcode.react') || id.includes('canvas-confetti')) {
                return 'vendor-qr';
              }
              return 'vendor-core';
            }
            if (id.includes('indianCities') || id.includes('expandedCitiesData') || id.includes('villageSearchService')) {
              return 'data-cities';
            }
            if (id.includes('kalnirnayEngine')) {
              return 'engine-panchang';
            }
            if (id.includes('vedicCalculations') || id.includes('vedicAstrologyEngine')) {
              return 'engine-vedic';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
