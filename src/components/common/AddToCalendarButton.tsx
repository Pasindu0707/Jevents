interface Props {
  title: string
  /** ISO start datetime. */
  start: string
  /** ISO end datetime. Defaults to start + 4 hours. */
  end?: string
  location?: string
  description?: string
  /** Accent colour for the outline button. */
  accent?: string
  className?: string
}

/** Format a Date as Google Calendar's UTC basic format: 20261220T103000Z. */
function toGCalDate(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

/**
 * "Add to Google Calendar" link (step 23). Builds a prefilled Google Calendar
 * event-template URL from the couple's data and opens it in a new tab. Renders
 * nothing if the start date is unparseable.
 */
export function AddToCalendarButton({
  title,
  start,
  end,
  location,
  description,
  accent = '#637953',
  className = '',
}: Props) {
  const startDate = new Date(start)
  if (Number.isNaN(startDate.getTime())) return null
  const endDate = end ? new Date(end) : new Date(startDate.getTime() + 4 * 60 * 60 * 1000)

  const url =
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    `&text=${encodeURIComponent(title)}` +
    `&dates=${toGCalDate(startDate)}/${toGCalDate(endDate)}` +
    `&details=${encodeURIComponent(description ?? '')}` +
    `&location=${encodeURIComponent(location ?? '')}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      style={{ borderColor: accent, color: accent }}
      className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold tracking-wide transition-opacity hover:opacity-80 ${className}`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      Add to Google Calendar
    </a>
  )
}
