import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const base = process.env.BASE_PATH ?? '/Jevents/'

/**
 * In dev, Vite only serves the app under `base` (/Jevents/). This makes the bare
 * root and the no-trailing-slash form resolve to the app too, so all three of
 * http://localhost:5173/ , /Jevents and /Jevents/ open the homepage.
 */
function redirectToBase(): Plugin {
  return {
    name: 'redirect-root-to-base',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? '').split('?')[0]
        if (base !== '/' && (url === '/' || url === base.replace(/\/$/, ''))) {
          res.writeHead(302, { Location: base })
          res.end()
          return
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
// `base` defaults to '/Jevents/' for GitHub Pages (project sub-path). On a root
// domain (Vercel / Cloudflare Pages / jevents.lk) set BASE_PATH=/ at build time.
export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), redirectToBase()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    // @measured/puck (the invite builder) must share the app's single React
    // copy, otherwise Puck's hooks throw "Invalid hook call".
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['@measured/puck'],
  },
})
