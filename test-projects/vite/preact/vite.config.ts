import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import svgJar from '@svg-jar/plugin/vite';

export default defineConfig({
  resolve: {
    preserveSymlinks: true,
    // the linked plugin has its own copies of its peers; use the app's
    dedupe: ['preact'],
  },
  plugins: [svgJar({ target: 'preact' }), preact()],
});
