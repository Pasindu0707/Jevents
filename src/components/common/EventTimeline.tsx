import type { CSSProperties } from 'react'
import type { EventItem } from '@/types/couple'

interface Props {
  events: EventItem[]
  /** Accent for the dots/line. Defaults to a soft forest green. */
  primaryColor?: string
  /** Accent for times / the map button. */
  secondaryColor?: string
}

/**
 * Reusable vertical "wedding day" timeline. Purely data-driven — it renders
 * whatever `events` it is given (from a couple's JSON) and shows nothing if the
 * list is empty. No event data is hardcoded here.
 *
 * Each event shows: time, title, venue name, address, notes, and a Google Maps
 * button when `mapUrl` is present.
 */
export function EventTimeline({
  events,
  primaryColor = '#637953',
  secondaryColor = '#b07d3f',
}: Props) {
  if (!events || events.length === 0) return null

  const vars = {
    ['--tl-accent']: primaryColor,
    ['--tl-gold']: secondaryColor,
  } as CSSProperties

  return (
    <ol className="relative mx-auto max-w-xl" style={vars}>
      {/* the vertical line */}
      <span
        aria-hidden
        className="absolute top-2 bottom-2 left-[7px] w-px bg-(--tl-accent)/30"
      />

      {events.map((ev, i) => (
        <li key={i} className="relative pb-10 pl-8 last:pb-0">
          {/* node */}
          <span
            aria-hidden
            className="absolute top-1.5 left-0 h-4 w-4 rounded-full ring-4 ring-white"
            style={{ background: 'var(--tl-accent)' }}
          />

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            {ev.time && (
              <p className="text-xs font-semibold tracking-[0.18em] text-(--tl-gold) uppercase">
                {ev.time}
              </p>
            )}
            <h3 className="mt-1 font-display text-xl text-neutral-900">{ev.title}</h3>

            {ev.venueName && (
              <p className="mt-2 text-sm font-medium text-neutral-700">{ev.venueName}</p>
            )}
            {ev.venueAddress && (
              <p className="text-sm text-neutral-500">{ev.venueAddress}</p>
            )}
            {ev.description && (
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{ev.description}</p>
            )}

            {ev.mapUrl && (
              <a
                href={ev.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold tracking-wide text-(--tl-gold) transition-colors hover:bg-neutral-50"
                style={{ borderColor: 'var(--tl-gold)' }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 21s-6-5.686-6-10a6 6 0 1 1 12 0c0 4.314-6 10-6 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="2" />
                </svg>
                View on Google Maps
              </a>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
