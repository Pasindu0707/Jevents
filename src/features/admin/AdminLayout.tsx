import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { isAuthenticated, logout } from '@/features/admin/auth'
import { LoginForm } from '@/features/admin/LoginForm'

/**
 * Admin shell, served at /admin/*. Gated by the client-side login; once signed
 * in it renders a collapsible sidebar + topbar and an <Outlet> for the routed
 * sections (Dashboard, Invitations, Media, Settings).
 */
const NAV: { to: string; label: string; icon: string; end?: boolean }[] = [
  { to: '/admin', label: 'Dashboard', icon: '▦', end: true },
  { to: '/admin/invitations', label: 'Invitations', icon: '✉' },
  { to: '/admin/media', label: 'Media', icon: '🖼' },
  { to: '/admin/settings', label: 'Settings', icon: '⚙' },
]

export default function AdminLayout() {
  const [authed, setAuthed] = useState(isAuthenticated())
  const [sidebarOpen, setSidebarOpen] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true,
  )
  const location = useLocation()

  if (!authed) return <LoginForm onSuccess={() => setAuthed(true)} />

  function handleLogout() {
    logout()
    setAuthed(false)
  }

  function closeOnMobile() {
    if (typeof window !== 'undefined' && window.innerWidth < 768) setSidebarOpen(false)
  }

  const title =
    NAV.find((n) => (n.end ? location.pathname === n.to : location.pathname.startsWith(n.to)))
      ?.label ?? 'Admin'

  return (
    <div className="flex min-h-dvh bg-slate-100 text-slate-800">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/50 md:hidden"
        />
      )}

      {/* Sidebar */}
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
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={closeOnMobile}
              className={({ isActive }) =>
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ' +
                (isActive
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white')
              }
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </NavLink>
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
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
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
          <Outlet />
        </main>
      </div>
    </div>
  )
}
