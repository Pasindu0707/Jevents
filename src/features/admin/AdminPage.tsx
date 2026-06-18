import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllCouples } from '@/lib/couples'
import type { CoupleData } from '@/types/couple'
import { isAuthenticated, logout } from '@/features/admin/auth'
import { LoginForm } from '@/features/admin/LoginForm'

/**
 * Admin area, served at /admin (step 13).
 *
 * Gated by a client-side login (see auth.ts). Once signed in it shows a
 * dashboard layout with a collapsible sidebar. The sidebar switches between
 * views: "Dashboard" is intentionally empty for now, "Invitations" holds the
 * invitation list. Editing opens the Puck visual builder at
 * /admin/couples/new?couple=<slug>.
 */
export function AdminPage() {
  const [authed, setAuthed] = useState(isAuthenticated())

  if (!authed) return <LoginForm onSuccess={() => setAuthed(true)} />

  return <Dashboard onLogout={() => setAuthed(false)} />
}

type View = 'dashboard' | 'invitations' | 'media' | 'settings'

const NAV: { id: View; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '▦' },
  { id: 'invitations', label: 'Invitations', icon: '✉' },
  { id: 'media', label: 'Media', icon: '🖼' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
]

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const couples = getAllCouples()
  const published = couples.filter((c) => c.published).length
  const drafts = couples.length - published

  const [view, setView] = useState<View>('dashboard')
  // Open by default on desktop, collapsed on mobile. The hamburger toggles it
  // on both: an off-canvas drawer on mobile, a collapse on desktop.
  const [sidebarOpen, setSidebarOpen] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true,
  )

  function handleLogout() {
    logout()
    onLogout()
  }

  function go(next: View) {
    setView(next)
    // On mobile the sidebar is an overlay — close it after picking a section.
    if (typeof window !== 'undefined' && window.innerWidth < 768) setSidebarOpen(false)
  }

  const title = NAV.find((n) => n.id === view)?.label ?? 'Dashboard'

  return (
    <div className="flex min-h-dvh bg-slate-100 text-slate-800">
      {/* Mobile backdrop — tap to close the drawer */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/50 md:hidden"
        />
      )}

      {/* Sidebar: fixed overlay drawer on mobile, in-flow column on desktop. */}
      <aside
        className={
          'fixed inset-y-0 left-0 z-40 flex w-60 shrink-0 flex-col border-r border-slate-800 bg-slate-900 px-4 py-6 text-slate-300 transition-transform duration-200 ease-out md:static ' +
          (sidebarOpen ? 'translate-x-0' : '-translate-x-full md:hidden')
        }
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="px-2 font-display text-xl text-white">J Events</div>
            <p className="px-2 text-xs tracking-widest text-slate-500 uppercase">Admin</p>
          </div>
          {/* Collapse button (mobile drawer) */}
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Collapse sidebar"
            className="rounded-md p-1 text-lg leading-none text-slate-400 hover:text-white md:hidden"
          >
            ✕
          </button>
        </div>

        <nav className="mt-8 space-y-1">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              aria-current={view === item.id ? 'page' : undefined}
              className={
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ' +
                (view === item.id
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white')
              }
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-auto rounded-lg px-3 py-2 text-left text-sm text-slate-400 hover:bg-slate-800/60 hover:text-white"
        >
          ⏻ Sign out
        </button>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            {/* Sidebar toggle — collapse/open on desktop, drawer on mobile */}
            <button
              type="button"
              onClick={() => setSidebarOpen((o) => !o)}
              aria-label={sidebarOpen ? 'Collapse sidebar' : 'Open sidebar'}
              aria-expanded={sidebarOpen}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div>
              <h1 className="font-display text-xl text-slate-900">{title}</h1>
              <p className="text-xs text-slate-500">Manage your wedding invitations</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-slate-500 hover:text-slate-900">
              View site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50 md:hidden"
            >
              Sign out
            </button>
            <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-900 text-sm font-semibold text-white">
              JE
            </div>
          </div>
        </header>

        <main className="flex-1 space-y-8 p-6">
          {view === 'invitations' ? (
            <InvitationsView couples={couples} published={published} drafts={drafts} />
          ) : view === 'dashboard' ? (
            <EmptyView
              title="Dashboard"
              body="Nothing here yet. Head to Invitations to manage your wedding pages."
            />
          ) : (
            <EmptyView title={title} body="Coming soon." />
          )}
        </main>
      </div>
    </div>
  )
}

function InvitationsView({
  couples,
  published,
  drafts,
}: {
  couples: CoupleData[]
  published: number
  drafts: number
}) {
  return (
    <>
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total invitations" value={couples.length} />
        <StatCard label="Published" value={published} accent="text-green-600" />
        <StatCard label="Drafts" value={drafts} accent="text-amber-600" />
      </div>

      {/* Invitations table */}
      <section className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">Invitations</h2>
          <div className="flex gap-2">
            <Link
              to="/admin/import"
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50"
            >
              Import JSON
            </Link>
            <Link
              to="/admin/couples/new"
              className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
            >
              + New invitation
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs tracking-wide text-slate-500 uppercase">
              <tr className="border-b border-slate-100">
                <th className="px-5 py-3 font-medium">Couple</th>
                <th className="px-5 py-3 font-medium">Slug</th>
                <th className="px-5 py-3 font-medium">Template</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {couples.map((c) => (
                <tr key={c.slug} className="border-b border-slate-50 last:border-0">
                  <td className="px-5 py-4 font-medium text-slate-900">
                    {c.brideName} &amp; {c.groomName}
                  </td>
                  <td className="px-5 py-4 text-slate-500">/{c.slug}</td>
                  <td className="px-5 py-4 text-slate-500 capitalize">{c.template}</td>
                  <td className="px-5 py-4">
                    <span
                      className={
                        'rounded-full px-2.5 py-1 text-xs font-semibold ' +
                        (c.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700')
                      }
                    >
                      {c.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-4">
                      <Link
                        to={`/${c.slug}`}
                        target="_blank"
                        className="font-medium text-slate-600 underline underline-offset-4 hover:text-slate-900"
                      >
                        Preview
                      </Link>
                      {/* Opens the new Puck visual builder loaded with this couple */}
                      <Link
                        to={`/admin/couples/new?couple=${c.slug}`}
                        className="font-medium text-slate-900 underline underline-offset-4 hover:text-slate-600"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

function EmptyView({ title, body }: { title: string; body: string }) {
  return (
    <div className="grid min-h-[50vh] place-items-center">
      <div className="max-w-sm rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-12 text-center">
        <p className="font-display text-2xl text-slate-900">{title}</p>
        <p className="mt-2 text-sm text-slate-500">{body}</p>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  accent = 'text-slate-900',
}: {
  label: string
  value: number
  accent?: string
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-2 font-display text-3xl ${accent}`}>{value}</p>
    </div>
  )
}
