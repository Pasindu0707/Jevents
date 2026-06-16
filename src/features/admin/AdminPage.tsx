import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllCouples } from '@/lib/couples'
import { isAuthenticated, logout } from '@/features/admin/auth'
import { LoginForm } from '@/features/admin/LoginForm'

/**
 * Admin area, served at /admin (step 13).
 *
 * Gated by a client-side login (see auth.ts). Once signed in it shows a real
 * dashboard layout — sidebar, stat cards and an invitations table. Editing,
 * publish/unpublish, media upload and reordering (steps 14–17) plug in here
 * once a backend exists.
 */
export function AdminPage() {
  const [authed, setAuthed] = useState(isAuthenticated())

  if (!authed) return <LoginForm onSuccess={() => setAuthed(true)} />

  return <Dashboard onLogout={() => setAuthed(false)} />
}

const NAV = [
  { label: 'Dashboard', icon: '▦', active: true },
  { label: 'Invitations', icon: '✉' },
  { label: 'Media', icon: '🖼' },
  { label: 'Settings', icon: '⚙' },
]

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const couples = getAllCouples()
  const published = couples.filter((c) => c.published).length
  const drafts = couples.length - published

  function handleLogout() {
    logout()
    onLogout()
  }

  return (
    <div className="flex min-h-dvh bg-slate-100 text-slate-800">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-200 bg-slate-900 px-4 py-6 text-slate-300 md:flex">
        <div className="px-2 font-display text-xl text-white">J Events</div>
        <p className="px-2 text-xs tracking-widest text-slate-500 uppercase">Admin</p>
        <nav className="mt-8 space-y-1">
          {NAV.map((item) => (
            <button
              key={item.label}
              type="button"
              className={
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ' +
                (item.active
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
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <h1 className="font-display text-xl text-slate-900">Dashboard</h1>
            <p className="text-xs text-slate-500">Manage your wedding invitations</p>
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
                          <Link
                            to={`/admin/couples/${c.slug}/edit`}
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
        </main>
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
