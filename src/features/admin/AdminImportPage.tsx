import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { isAuthenticated } from '@/features/admin/auth'
import { JsonOutput } from '@/features/admin/JsonOutput'
import { Shell } from '@/features/admin/fields'
import { validateCouple } from '@/features/admin/validateCouple'
import { formatWeddingDate } from '@/lib/format'
import type { CoupleData } from '@/types/couple'

/**
 * Import couple data at /admin/import (step 28). Paste or upload a CoupleData
 * JSON; it's validated and, if valid, previewed and offered as a cleaned
 * download. JSON only for now — no database write.
 */
export function AdminImportPage() {
  if (!isAuthenticated()) return <Navigate to="/admin" replace />
  return <Importer />
}

function Importer() {
  const [text, setText] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [couple, setCouple] = useState<CoupleData | null>(null)

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setText(await file.text())
  }

  function validate() {
    setCouple(null)
    setErrors([])
    let parsed: unknown
    try {
      parsed = JSON.parse(text)
    } catch {
      setErrors(['Invalid JSON — could not parse. Check for trailing commas or missing quotes.'])
      return
    }
    const result = validateCouple(parsed)
    if (result.ok) setCouple(result.couple)
    else setErrors(result.errors)
  }

  return (
    <Shell>
      <Link to="/admin" className="text-sm text-slate-500 underline underline-offset-4">
        ← Dashboard
      </Link>
      <h1 className="mt-1 font-display text-2xl text-slate-900">Import couple JSON</h1>
      <p className="mt-2 text-sm text-slate-500">
        Paste a couple's JSON or upload a <code>.json</code> file, then validate.
      </p>

      <div className="mt-6 space-y-4">
        <input
          type="file"
          accept="application/json,.json"
          onChange={onFile}
          className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={12}
          placeholder='{ "slug": "bride-and-groom", "published": false, ... }'
          className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 font-mono text-xs text-slate-800 outline-none focus:border-slate-500"
        />
        <button
          type="button"
          onClick={validate}
          className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Validate
        </button>
      </div>

      {errors.length > 0 && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-700">
            {errors.length} problem{errors.length === 1 ? '' : 's'} found:
          </p>
          <ul className="mt-2 list-inside list-disc text-sm text-red-600">
            {errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      {couple && (
        <>
          <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="text-sm font-semibold text-green-700">Valid couple data ✓</p>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-700">
              <dt className="text-slate-500">Couple</dt>
              <dd>{couple.brideName} &amp; {couple.groomName}</dd>
              <dt className="text-slate-500">Slug</dt>
              <dd>/{couple.slug}</dd>
              <dt className="text-slate-500">Template</dt>
              <dd>{couple.template}</dd>
              <dt className="text-slate-500">Wedding date</dt>
              <dd>{formatWeddingDate(couple.weddingDate)}</dd>
              <dt className="text-slate-500">Status</dt>
              <dd>{couple.published ? 'Published' : 'Draft'}</dd>
            </dl>
          </div>
          <JsonOutput
            json={JSON.stringify(couple, null, 2)}
            filename={`${couple.slug}.json`}
            note={
              <>
                Cleaned JSON (only known fields). Save as{' '}
                <code>src/data/couples/{couple.slug}.json</code>, then redeploy.
              </>
            }
          />
        </>
      )}
    </Shell>
  )
}
