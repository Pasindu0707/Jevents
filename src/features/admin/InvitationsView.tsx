import { Link } from 'react-router-dom'
import { getAllCouples } from '@/lib/couples'

/** The full invitations table — view, edit (opens the builder) and preview. */
export default function InvitationsView() {
  const couples = getAllCouples()

  return (
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
  )
}
