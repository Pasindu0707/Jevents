import { useState } from 'react'
import type { CSSProperties } from 'react'

interface Props {
  /** Slug of the couple being RSVP'd to — included in the submission payload. */
  coupleSlug: string
  /** Public Apps Script Web App URL to POST to. Empty → demo mode (logs only). */
  googleScriptUrl?: string
  /** Message shown after a successful submission. */
  successMessage?: string
  primaryColor?: string
  secondaryColor?: string
}

type Attending = '' | 'yes' | 'no'
type Status = 'idle' | 'submitting' | 'success' | 'error'

const MEALS = ['No preference', 'Chicken', 'Fish', 'Vegetarian', 'Vegan'] as const

/**
 * RSVP form (steps 10–11). Validates input, then POSTs the response to a Google
 * Apps Script Web App (see docs/google-apps-script-rsvp.js) which appends it to
 * a Google Sheet. No secrets live here — the script URL is public and the Sheet
 * id stays server-side in the script.
 *
 * The request uses `mode: 'no-cors'` because Apps Script Web Apps don't return
 * CORS headers; the row is still written, but the response is opaque, so we
 * treat a resolved fetch as success and a thrown/network error as failure.
 */
export function RSVPForm({
  coupleSlug,
  googleScriptUrl,
  successMessage = 'Thank you! Your RSVP has been received.',
  primaryColor = '#637953',
  secondaryColor = '#b07d3f',
}: Props) {
  const [guestName, setGuestName] = useState('')
  const [phone, setPhone] = useState('')
  const [attending, setAttending] = useState<Attending>('')
  const [guestCount, setGuestCount] = useState(1)
  const [mealPreference, setMealPreference] = useState<string>(MEALS[0])
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')

  const vars = {
    ['--rsvp-ink']: primaryColor,
    ['--rsvp-gold']: secondaryColor,
  } as CSSProperties

  function validate(): Record<string, string> {
    const next: Record<string, string> = {}
    if (!guestName.trim()) next.guestName = 'Please enter your name.'
    if (attending !== 'yes' && attending !== 'no') {
      next.attending = 'Please let us know if you can attend.'
    }
    if (attending === 'yes' && guestCount < 1) {
      next.guestCount = 'At least 1 guest is required.'
    }
    return next
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    const payload = {
      coupleSlug,
      guestName: guestName.trim(),
      phone: phone.trim(),
      attending,
      guestCount: attending === 'yes' ? guestCount : 0,
      mealPreference: attending === 'yes' ? mealPreference : '',
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    }

    // Demo mode until a couple has a script URL configured.
    if (!googleScriptUrl) {
      console.log('RSVP submission (no googleScriptUrl set — not sent)', payload)
      setStatus('success')
      return
    }

    setStatus('submitting')
    try {
      await fetch(googleScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        style={vars}
        className="mx-auto max-w-md rounded-2xl border border-(--rsvp-ink)/20 bg-white p-8 text-center shadow-sm"
      >
        <p className="font-display text-2xl text-(--rsvp-ink)">Thank you!</p>
        <p className="mt-2 text-neutral-600">
          {attending === 'no'
            ? 'Thank you for letting us know — you will be missed.'
            : successMessage}
        </p>
      </div>
    )
  }

  const submitting = status === 'submitting'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={vars}
      className="mx-auto max-w-md space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-sm"
    >
      <Field label="Your name" error={errors.guestName}>
        <input
          type="text"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          className={inputCls}
          placeholder="Full name"
        />
      </Field>

      <Field label="Phone number">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputCls}
          placeholder="07X XXX XXXX"
        />
      </Field>

      <Field label="Will you attend?" error={errors.attending}>
        <div className="flex gap-3">
          {(['yes', 'no'] as const).map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => setAttending(opt)}
              aria-pressed={attending === opt}
              className={
                'flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ' +
                (attending === opt
                  ? 'border-transparent bg-(--rsvp-ink) text-white'
                  : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50')
              }
            >
              {opt === 'yes' ? 'Joyfully accept' : 'Regretfully decline'}
            </button>
          ))}
        </div>
      </Field>

      {attending === 'yes' && (
        <>
          <Field label="Number of guests" error={errors.guestCount}>
            <input
              type="number"
              min={1}
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className={inputCls}
            />
          </Field>

          <Field label="Meal preference">
            <select
              value={mealPreference}
              onChange={(e) => setMealPreference(e.target.value)}
              className={inputCls}
            >
              {MEALS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </Field>
        </>
      )}

      <Field label="Message for the couple">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className={inputCls}
          placeholder="Optional"
        />
      </Field>

      {status === 'error' && (
        <p className="text-sm text-red-600">
          Sorry, something went wrong sending your RSVP. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-(--rsvp-gold) py-3 text-sm font-semibold tracking-wide text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Sending…' : 'Send RSVP'}
      </button>
    </form>
  )
}

const inputCls =
  'w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-800 outline-none focus:border-(--rsvp-ink) focus:ring-1 focus:ring-(--rsvp-ink)'

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-neutral-700">{label}</span>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </label>
  )
}
