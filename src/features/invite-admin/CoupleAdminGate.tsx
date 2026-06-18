import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '@/features/admin/auth'
import AdminPage from './AdminPage'

/**
 * Login gate for Project B's Puck-based invitation builder.
 *
 * Sits behind Project A's existing admin auth: if there's no active admin
 * session it bounces to the J Events login at /admin (untouched). Wired at
 * /admin/couples/new so the dashboard's "New Invitation" button opens the
 * visual builder. The builder edits the section-based couple JSON served from
 * /Jevents/data/<slug>.json (pick a couple via ?couple=<slug>).
 */
export default function CoupleAdminGate() {
  if (!isAuthenticated()) return <Navigate to="/admin" replace />
  return <AdminPage />
}
