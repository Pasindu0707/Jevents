import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { coupleSlugForHost } from '@/features/invite/lib/coupleDomains'

// Every page is lazy-loaded so each route only pulls its own dependencies:
// the marketing homepage's GSAP/Framer libs, the templates, and the admin
// editor + dnd-kit all live in separate chunks.
const MarketingPage = lazy(() =>
  import('@/features/marketing/MarketingPage').then((m) => ({ default: m.MarketingPage })),
)
// Guest-facing couple invitation page, ported from Project B (Invitely). Its
// dark, GSAP-animated section engine is scoped under `.invite-root`.
const CouplePage = lazy(() => import('@/features/invite/pages/CouplePage'))
// Admin shell (collapsible sidebar + login gate) with routed sections.
const AdminLayout = lazy(() => import('@/features/admin/AdminLayout'))
const DashboardView = lazy(() => import('@/features/admin/DashboardView'))
const InvitationsView = lazy(() => import('@/features/admin/InvitationsView'))
const MediaView = lazy(() => import('@/features/admin/MediaView'))
const SettingsView = lazy(() => import('@/features/admin/SettingsView'))
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
 *   /admin                     → AdminLayout      (login-gated shell)
 *     index                    → DashboardView
 *     /admin/invitations       → InvitationsView
 *     /admin/media             → MediaView        (Cloudinary library)
 *     /admin/settings          → SettingsView
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
  // Same spinner as the pre-mount boot loader in index.html, so the handoff
  // from "page loading" to "app loading" is seamless (no text flash).
  return (
    <div className="app-loader">
      <div className="app-loader__ring" />
    </div>
  )
}

function App() {
  // On a per-couple custom domain (e.g. shalinikushan.space) the root URL opens
  // that couple's invitation instead of the marketing homepage. Everywhere else
  // this is undefined and "/" behaves normally.
  const hostSlug = coupleSlugForHost()

  return (
    <BrowserRouter basename={basename}>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/"
            element={hostSlug ? <CouplePage slugOverride={hostSlug} /> : <MarketingPage />}
          />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardView />} />
            <Route path="invitations" element={<InvitationsView />} />
            <Route path="media" element={<MediaView />} />
            <Route path="settings" element={<SettingsView />} />
          </Route>
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
