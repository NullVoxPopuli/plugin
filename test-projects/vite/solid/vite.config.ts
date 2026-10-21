import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import svgJar from '@svg-jar/plugin/vite';

export default defineConfig({
  resolve: {
    preserveSymlinks: true,
    // the linked plugin has its own copies of its peers; use the app's
    dedupe: ['solid-js'],
  },
  plugins: [svgJar({ target: 'solid' }), solid()],
});
