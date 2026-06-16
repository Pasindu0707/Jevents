import { Link } from 'react-router-dom'
import { TemplateRenderer } from '@/features/invitation/templates/TemplateRenderer'
import { loadPreview } from '@/features/admin/preview'

/**
 * Admin draft preview at /admin/preview (step 21).
 *
 * Reads the CoupleData the editor stashed in localStorage and renders it with
 * the real TemplateRenderer, behind a "not published" warning banner. Reads
 * only local draft data, so it can't affect public pages.
 */
export function AdminPreviewPage() {
  const couple = loadPreview()

  if (!couple) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-3 px-6 text-center">
        <h1 className="font-display text-2xl text-slate-800">Nothing to preview</h1>
        <p className="max-w-sm text-slate-500">
          Open a couple in the editor and click “Preview draft”, then this page will show it.
        </p>
        <Link to="/admin" className="text-sm underline underline-offset-4">
          Back to dashboard
        </Link>
      </main>
    )
  }

  return (
    <div>
      <div className="sticky top-0 z-[60] flex items-center justify-between gap-3 bg-amber-400 px-4 py-2 text-sm font-semibold text-amber-950">
        <span>⚠ Preview mode — not published.</span>
        <Link to="/admin" className="underline underline-offset-2">
          Back to admin
        </Link>
      </div>
      <TemplateRenderer couple={couple} />
    </div>
  )
}
