import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
// import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Enable React to use React components
  integrations: [
    react(),
    tailwind(),
    // sitemap(),
  ],
  
  // GitHub Pages configuration
  site: 'https://torocruzand.github.io',
  base: process.env.NODE_ENV === 'production' ? '/portfolio' : '/',
  
  // Image optimization
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  
  // Path aliases
  vite: {
    resolve: {
      alias: {
        '@': new URL('./src/', import.meta.url).pathname,
      },
    },
  },
});
