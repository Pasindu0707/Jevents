import { useState } from 'react'
import { openMediaLibrary, mediaLibraryConfigured } from '@/features/admin/cloudinaryMediaLibrary'

/**
 * Media page. Opens Cloudinary's Media Library widget so the admin can browse
 * the whole library, manage assets (incl. delete) inside Cloudinary's UI, and
 * "insert" assets here to grab their URLs. Needs CLOUDINARY_API_KEY to be set.
 */
export default function MediaView() {
  const [urls, setUrls] = useState<string[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  function handleOpen() {
    openMediaLibrary((picked) => {
      // De-dupe while preserving order.
      setUrls((prev) => Array.from(new Set([...picked, ...prev])))
    })
  }

  async function copy(url: string) {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(url)
      setTimeout(() => setCopied((c) => (c === url ? null : c)), 1500)
    } catch {
      /* clipboard blocked — ignore */
    }
  }

  if (!mediaLibraryConfigured) {
    return (
      <div className="max-w-xl rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="font-semibold text-amber-900">Media library not configured</h2>
        <p className="mt-2 text-sm text-amber-800">
          Add your Cloudinary <strong>API Key</strong> to{' '}
          <code className="rounded bg-amber-100 px-1">
            src/features/invite-admin/config/cloudinary.ts
          </code>{' '}
          (the publishable key from your Cloudinary dashboard — not the secret) to enable browsing,
          copying URLs and deleting assets here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-slate-900">Cloudinary media</h2>
            <p className="mt-1 text-sm text-slate-500">
              Browse your uploaded photos, copy their URLs, or manage/delete them in Cloudinary.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpen}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Open media library
          </button>
        </div>
      </section>

      {urls.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-5 py-4">
            <h3 className="font-semibold text-slate-900">Selected URLs</h3>
            <p className="text-xs text-slate-500">
              Paste these into an invitation's image fields.
            </p>
          </div>
          <ul className="divide-y divide-slate-100">
            {urls.map((url) => (
              <li key={url} className="flex items-center gap-4 px-5 py-3">
                <img
                  src={url}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-md border border-slate-200 object-cover"
                />
                <code className="min-w-0 flex-1 truncate text-xs text-slate-600">{url}</code>
                <button
                  type="button"
                  onClick={() => copy(url)}
                  className="shrink-0 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50"
                >
                  {copied === url ? 'Copied!' : 'Copy URL'}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
