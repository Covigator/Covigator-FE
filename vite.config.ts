import svgr from '@svgr/rollup';
import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  define: { global: 'window' },
  server: {
    proxy: {
      '/api/recommend': {
        target: 'https://covigator-ai.shop',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      },
    },
  },
});
