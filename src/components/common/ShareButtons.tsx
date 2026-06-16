import { useState } from 'react'

interface Props {
  brideName: string
  groomName: string
  /** Accent colour for the copy button. */
  accent?: string
  className?: string
}

/** The page being shared — the live invitation URL the guest is viewing. */
function currentUrl(): string {
  return typeof window === 'undefined' ? '' : window.location.href
}

/**
 * WhatsApp + copy-link sharing (step 24). The link is always the current page
 * URL (window.location.href), so it works on any domain/slug without config.
 */
export function ShareButtons({ brideName, groomName, accent = '#637953', className = '' }: Props) {
  const [copied, setCopied] = useState(false)

  function shareWhatsApp() {
    const message = `You're invited to ${brideName} & ${groomName}'s wedding. View invitation: ${currentUrl()}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener')
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(currentUrl())
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — ignore silently.
    }
  }

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      <button
        type="button"
        onClick={shareWhatsApp}
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2 text-xs font-semibold tracking-wide text-white transition-opacity hover:opacity-90"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-.607z" />
        </svg>
        WhatsApp
      </button>
      <button
        type="button"
        onClick={copyLink}
        aria-live="polite"
        style={{ borderColor: accent, color: accent }}
        className="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold tracking-wide transition-opacity hover:opacity-80"
      >
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  )
}
