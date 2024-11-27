import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['pdfjs-dist'], // Pre-bundle pdfjs-dist for better compatibility
  },
  build: {
    commonjsOptions: {
      include: [/pdfjs-dist/, /node_modules/], // Ensure CommonJS modules like pdfjs-dist are processed
    },
  },
});
