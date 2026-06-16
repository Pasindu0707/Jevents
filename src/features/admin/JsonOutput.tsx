import type { ReactNode } from 'react'

/**
 * Read-only JSON output panel with a download button. Shared by the new-couple
 * and edit-couple pages — since there's no database yet, this is how an admin
 * gets the generated CoupleData out to drop into src/data/couples/.
 */
export function JsonOutput({
  json,
  filename,
  note,
}: {
  json: string
  filename: string
  note?: ReactNode
}) {
  function download() {
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-slate-900">Generated JSON</h2>
        <button
          type="button"
          onClick={download}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50"
        >
          Download {filename}
        </button>
      </div>
      {note && <p className="mt-1 text-xs text-slate-500">{note}</p>}
      <textarea
        readOnly
        value={json}
        rows={18}
        className="mt-3 w-full rounded-lg border border-slate-300 bg-slate-50 p-3 font-mono text-xs text-slate-800"
      />
    </div>
  )
}
