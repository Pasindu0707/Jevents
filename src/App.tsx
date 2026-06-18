import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Every page is lazy-loaded so each route only pulls its own dependencies:
// the marketing homepage's GSAP/Framer libs, the templates, and the admin
// editor + dnd-kit all live in separate chunks.
const MarketingPage = lazy(() =>
  import('@/features/marketing/MarketingPage').then((m) => ({ default: m.MarketingPage })),
)
// Guest-facing couple invitation page, ported from Project B (Invitely). Its
// dark, GSAP-animated section engine is scoped under `.invite-root`.
const CouplePage = lazy(() => import('@/features/invite/pages/CouplePage'))
const AdminPage = lazy(() =>
  import('@/features/admin/AdminPage').then((m) => ({ default: m.AdminPage })),
)
const AdminPreviewPage = lazy(() =>
  import('@/features/admin/AdminPreviewPage').then((m) => ({ default: m.AdminPreviewPage })),
)
const AdminImportPage = lazy(() =>
  import('@/features/admin/AdminImportPage').then((m) => ({ default: m.AdminImportPage })),
)
// "New Invitation" now opens Project B's Puck visual builder (login-gated,
// reusing Project A's admin auth). It edits the section-based couple JSON in
// /Jevents/data/. The Puck editor + @measured/puck load in their own chunk.
const CoupleAdminGate = lazy(() => import('@/features/invite-admin/CoupleAdminGate'))
const CoupleEditPage = lazy(() =>
  import('@/features/admin/CoupleEditPage').then((m) => ({ default: m.CoupleEditPage })),
)

/**
 * App shell + routing.
 *
 *   /                          → MarketingPage   (public homepage)
 *   /admin                     → AdminPage        (login-gated dashboard)
 *   /admin/preview             → AdminPreviewPage (draft preview)
 *   /admin/import              → AdminImportPage  (validate/import JSON)
 *   /admin/couples/new         → CoupleAdminGate   (Project B Puck builder, gated)
 *   /admin/couples/:slug/edit  → CoupleEditPage
 *   /:coupleSlug               → CouplePage        (per-couple invitation, Project B)
 *
 * basename comes from Vite's base ('/Jevents/' on GitHub Pages, '/' on a root
 * domain). Static routes outrank /:slug.
 */
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

function Loading() {
  return <div className="grid min-h-dvh place-items-center text-slate-400">Loading…</div>
}

function App() {
  return (
    <BrowserRouter basename={basename}>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<MarketingPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/preview" element={<AdminPreviewPage />} />
          <Route path="/admin/import" element={<AdminImportPage />} />
          <Route path="/admin/couples/new" element={<CoupleAdminGate />} />
          <Route path="/admin/couples/:slug/edit" element={<CoupleEditPage />} />
          <Route path="/:coupleSlug" element={<CouplePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
