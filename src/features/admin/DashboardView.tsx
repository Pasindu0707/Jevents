import { Link } from 'react-router-dom'
import { getAllCouples } from '@/lib/couples'

/** Dashboard landing — at-a-glance stats, quick actions and recent invitations. */
export default function DashboardView() {
  const couples = getAllCouples()
  const published = couples.filter((c) => c.published).length
  const drafts = couples.length - published

  // Next upcoming wedding by date (ignores ones without a valid date).
  const upcoming = [...couples]
    .filter((c) => c.weddingDate && !Number.isNaN(Date.parse(c.weddingDate)))
    .sort((a, b) => Date.parse(a.weddingDate) - Date.parse(b.weddingDate))
    .find((c) => Date.parse(c.weddingDate) >= Date.now())

  const recent = [...couples]
    .sort((a, b) => Date.parse(b.updatedAt ?? '') - Date.parse(a.updatedAt ?? ''))
    .slice(0, 5)

  return (
    <>
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total invitations" value={couples.length} />
        <StatCard label="Published" value={published} accent="text-green-600" />
        <StatCard label="Drafts" value={drafts} accent="text-amber-600" />
      </div>

      {/* Quick actions */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ActionCard
          to="/admin/couples/new"
          title="New invitation"
          body="Open the visual builder and create a new couple page."
        />
        <ActionCard
          to="/admin/invitations"
          title="Manage invitations"
          body="View, edit and preview every invitation."
        />
        <ActionCard
          to="/admin/media"
          title="Media library"
          body="Browse uploaded photos and copy their URLs."
        />
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent invitations */}
        <section className="rounded-2xl border border-slate-200 bg-white lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Recent invitations</h2>
            <Link
              to="/admin/invitations"
              className="text-sm font-medium text-slate-500 hover:text-slate-900"
            >
              View all →
            </Link>
          </div>
          <ul className="divide-y divide-slate-100">
            {recent.length === 0 && (
              <li className="px-5 py-6 text-sm text-slate-500">No invitations yet.</li>
            )}
            {recent.map((c) => (
              <li key={c.slug} className="flex items-center justify-between px-5 py-4">
                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-900">
                    {c.brideName} &amp; {c.groomName}
                  </p>
                  <p className="truncate text-xs text-slate-500">/{c.slug}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
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
                  <Link
                    to={`/admin/couples/new?couple=${c.slug}`}
                    className="text-sm font-medium text-slate-900 underline underline-offset-4 hover:text-slate-600"
                  >
                    Edit
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Next wedding */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">Next wedding</h2>
          {upcoming ? (
            <div className="mt-3">
              <p className="font-display text-2xl text-slate-900">
                {upcoming.brideName} &amp; {upcoming.groomName}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {new Date(upcoming.weddingDate).toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <Link
                to={`/${upcoming.slug}`}
                target="_blank"
                className="mt-4 inline-block text-sm font-medium text-slate-900 underline underline-offset-4 hover:text-slate-600"
              >
                Preview page →
              </Link>
            </div>
          ) : (
            <p className="mt-3 text-sm text-slate-500">No upcoming weddings scheduled.</p>
          )}
        </section>
      </div>
    </>
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

function ActionCard({ to, title, body }: { to: string; title: string; body: string }) {
  return (
    <Link
      to={to}
      className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-slate-400 hover:bg-slate-50"
    >
      <p className="font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{body}</p>
    </Link>
  )
}
