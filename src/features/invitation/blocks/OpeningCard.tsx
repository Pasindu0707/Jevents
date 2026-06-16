import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'

interface Props {
  brideName: string
  groomName: string
  /** Accent colours from the couple (optional). */
  primaryColor?: string
  secondaryColor?: string
  /** Fired on the opening tap — used to start background music on a gesture. */
  onOpen?: () => void
}

/**
 * Full-screen "envelope" overlay shown when an invitation first loads (step 5).
 *
 * It covers the page (and locks scrolling) until the guest taps "open", then
 * fades + scales away to reveal the invitation underneath. Pure React state +
 * Tailwind transitions — no animation library.
 *
 * Two booleans drive it:
 *   - `opening` → set on tap; triggers the CSS transition (card scales out,
 *      overlay fades to transparent + stops capturing clicks).
 *   - `done`    → set after the transition finishes; unmounts the overlay
 *      entirely so it never blocks the page again.
 */
export function OpeningCard({
  brideName,
  groomName,
  primaryColor = '#474f44',
  secondaryColor = '#b07d3f',
  onOpen,
}: Props) {
  const [opening, setOpening] = useState(false)
  const [done, setDone] = useState(false)

  // Lock body scroll while the overlay is visible.
  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [done])

  if (done) return null

  function handleOpen() {
    if (opening) return
    setOpening(true)
    onOpen?.() // start music etc. — fired within the user gesture
    window.setTimeout(() => setDone(true), 900) // matches the transition duration
  }

  const vars = {
    ['--oc-ink']: primaryColor,
    ['--oc-gold']: secondaryColor,
  } as CSSProperties

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Tap to open the invitation"
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleOpen()
        }
      }}
      style={vars}
      className={
        'fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-(--oc-ink) px-6 transition-opacity duration-900 ease-out ' +
        (opening ? 'pointer-events-none opacity-0' : 'opacity-100')
      }
    >
      <div
        className={
          'flex max-w-sm flex-col items-center rounded-3xl border border-(--oc-gold)/50 bg-[#fbf8f3] px-10 py-14 text-center shadow-2xl transition-all duration-900 ease-out ' +
          (opening ? '-translate-y-4 scale-110 opacity-0' : 'translate-y-0 scale-100 opacity-100')
        }
      >
        <p className="text-xs font-semibold tracking-[0.4em] text-(--oc-gold) uppercase">
          You're Invited
        </p>

        <Divider />

        <h1 className="font-display text-4xl leading-tight text-(--oc-ink) sm:text-5xl">
          {brideName}
          <span className="mx-2 align-middle text-2xl font-light italic opacity-70">&amp;</span>
          {groomName}
        </h1>

        <span className="mt-10 inline-flex items-center gap-2 rounded-full border border-(--oc-gold)/60 px-5 py-2 text-xs font-semibold tracking-[0.2em] text-(--oc-ink) uppercase">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-(--oc-gold)" />
          Tap to open
        </span>
      </div>
    </div>
  )
}

function Divider() {
  return (
    <svg viewBox="0 0 120 16" fill="none" className="my-5 w-24 text-(--oc-gold)" aria-hidden>
      <path d="M2 8h44M74 8h44" stroke="currentColor" strokeWidth="1" />
      <path
        d="M60 2c3 3 3 9 0 12-3-3-3-9 0-12Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.25"
      />
    </svg>
  )
}
