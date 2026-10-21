import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgJar from '@svg-jar/plugin/vite';

export default defineConfig({
  resolve: {
    preserveSymlinks: true,
    // the linked plugin has its own copies of its peers; use the app's
    dedupe: ['react', 'react-dom'],
  },
  plugins: [svgJar({ target: 'react' }), react()],
});
