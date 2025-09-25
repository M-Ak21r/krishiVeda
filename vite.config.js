import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//https://vitejs.dev/conf// ig/
export default defineConfig({
  plugins: [react()],
  base: '/krishiVeda/', // Replace with your repository name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  define: {
    global: 'globalThis',
  },
})