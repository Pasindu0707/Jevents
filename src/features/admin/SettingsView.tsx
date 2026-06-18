/** Minimal settings page — informational for now. */
export default function SettingsView() {
  return (
    <div className="max-w-2xl space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-semibold text-slate-900">Account</h2>
        <p className="mt-2 text-sm text-slate-500">
          Admin sign-in is currently a single shared login configured in code
          (<code className="rounded bg-slate-100 px-1">src/features/admin/auth.ts</code>). A proper
          multi-user login lands when the backend is added.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-semibold text-slate-900">How invitations are stored</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-500">
          <li>
            Guest pages read <code className="rounded bg-slate-100 px-1">public/data/&lt;slug&gt;.json</code>.
          </li>
          <li>
            The builder exports that JSON — drop it into the folder to publish changes.
          </li>
          <li>
            This list is indexed from <code className="rounded bg-slate-100 px-1">src/data/couples/</code>.
          </li>
        </ul>
      </section>
    </div>
  )
}
