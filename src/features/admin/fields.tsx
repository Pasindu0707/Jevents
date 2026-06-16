import type { ReactNode } from 'react'
import { isLikelyUrl } from '@/lib/format'
import { assetUrl } from '@/lib/media'

/** Shared admin form primitives, used by the new + edit couple pages. */

export const inputCls =
  'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500'

export function Shell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-dvh bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        {children}
      </div>
    </main>
  )
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200 p-5">
      <h3 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">{title}</h3>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  )
}

export function Text({
  label,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  error?: string
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 ${inputCls}`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </label>
  )
}

export function Area({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <textarea
        value={value}
        rows={3}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 ${inputCls}`}
      />
    </label>
  )
}

export function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: readonly string[]
  onChange: (v: string) => void
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 ${inputCls}`}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}

export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-slate-300"
      />
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </label>
  )
}

/**
 * URL field for media (image / video / audio) with light validation and a live
 * preview. MVP media management (step 20): we store public URLs, not uploads.
 */
export function MediaField({
  label,
  value,
  onChange,
  kind,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  kind: 'image' | 'video' | 'audio'
  placeholder?: string
}) {
  const trimmed = value.trim()
  const invalid = !isLikelyUrl(value)
  const src = trimmed ? assetUrl(trimmed) : ''

  return (
    <div>
      <Text
        label={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={invalid ? 'Enter a full URL (https://…) or a /public path.' : undefined}
      />
      {src && !invalid && (
        <div className="mt-2">
          {kind === 'image' && (
            <img src={src} alt="" className="h-32 w-full rounded-lg object-cover" />
          )}
          {kind === 'video' && (
            <video src={src} controls className="max-h-48 w-full rounded-lg bg-black" />
          )}
          {kind === 'audio' && <audio src={src} controls className="w-full" />}
        </div>
      )}
    </div>
  )
}

export function Color({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="mt-1 flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-12 cursor-pointer rounded border border-slate-300"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        />
      </div>
    </label>
  )
}
