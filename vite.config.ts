import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@pages': '/src/pages',
      '@modules': '/src/modules',
      '@components': '/src/components',
      '@ui': '/src/ui',
      '@api': '/src/api',
      '@services': '/src/services',
      '@hooks': '/src/hooks',
      '@styles': '/src/styles',
    },
  },
});
