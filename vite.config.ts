import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// `base` defaults to '/Jevents/' for GitHub Pages (project sub-path). On a root
// domain (Vercel / Cloudflare Pages / jevents.lk) set BASE_PATH=/ at build time.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/Jevents/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
