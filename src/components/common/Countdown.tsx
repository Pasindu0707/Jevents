import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'

interface Props {
  /** ISO datetime of the event. */
  weddingDate: string
  primaryColor?: string
  secondaryColor?: string
}

interface Remaining {
  days: number
  hours: number
  minutes: number
  seconds: number
}

/** Time left until `target` (ms epoch). null once the date has passed. */
function getRemaining(target: number): Remaining | null {
  const diff = target - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  }
}

/**
 * Live countdown to the wedding date — updates every second using a setInterval
 * cleared on unmount. No external package. Once the date is reached (or already
 * past) it shows "The celebration has begun." instead of the timer.
 */
export function Countdown({
  weddingDate,
  primaryColor = '#637953',
  secondaryColor = '#b07d3f',
}: Props) {
  const target = new Date(weddingDate).getTime()
  const [remaining, setRemaining] = useState<Remaining | null>(() => getRemaining(target))

  useEffect(() => {
    // First value is seeded by the useState initializer; tick once a second.
    const id = window.setInterval(() => setRemaining(getRemaining(target)), 1000)
    return () => window.clearInterval(id)
  }, [target])

  if (Number.isNaN(target)) return null

  const vars = {
    ['--cd-ink']: primaryColor,
    ['--cd-gold']: secondaryColor,
  } as CSSProperties

  if (!remaining) {
    return (
      <p style={vars} className="font-display text-2xl text-(--cd-ink) sm:text-3xl">
        The celebration has begun.
      </p>
    )
  }

  const units: { label: string; value: number }[] = [
    { label: 'Days', value: remaining.days },
    { label: 'Hours', value: remaining.hours },
    { label: 'Minutes', value: remaining.minutes },
    { label: 'Seconds', value: remaining.seconds },
  ]

  return (
    <div style={vars} className="mx-auto flex max-w-md justify-center gap-2 sm:gap-5">
      {units.map((u) => (
        <div
          key={u.label}
          className="flex min-w-14 flex-col items-center rounded-2xl bg-white px-2 py-4 shadow-sm sm:min-w-20 sm:px-3"
        >
          <span className="font-display text-2xl text-(--cd-ink) tabular-nums sm:text-3xl">
            {String(u.value).padStart(2, '0')}
          </span>
          <span className="mt-1 text-[0.65rem] tracking-[0.15em] text-neutral-400 uppercase">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  )
}
