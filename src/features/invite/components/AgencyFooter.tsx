import './agency-footer.css'

/**
 * TASK 4 — Permanent agency footer.
 *
 * Hardcoded, always rendered below the couple's own footer on every page.
 * NOT a Puck section and NOT editable from the admin.
 */

const SOCIALS = [
  {
    label: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61589323568455',
    icon: (
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    ),
  },
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/j__events_/',
    icon: (
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.8c-3.15 0-3.52.01-4.76.07-1.15.05-1.77.24-2.18.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.18-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05 1.15.24 1.77.4 2.18.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.18.4 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.15-.05 1.77-.24 2.18-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.18.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.15-.24-1.77-.4-2.18a3.64 3.64 0 0 0-.88-1.35 3.64 3.64 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.18-.4-1.24-.06-1.61-.07-4.76-.07Zm0 3.06a4.98 4.98 0 1 1 0 9.96 4.98 4.98 0 0 1 0-9.96Zm0 1.8a3.18 3.18 0 1 0 0 6.36 3.18 3.18 0 0 0 0-6.36Zm5.18-.74a1.16 1.16 0 1 1-2.32 0 1.16 1.16 0 0 1 2.32 0Z" />
    ),
  },
  {
    label: 'WhatsApp',
    url: 'https://api.whatsapp.com/send/?phone=94772281154&text&type=phone_number&app_absent=0',
    icon: (
      <path d="M12.04 2c-5.46 0-9.9 4.43-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.86 9.86 0 0 0 4.73 1.2h.01c5.46 0 9.9-4.43 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.03 8.03 0 0 1 2.37 5.72c0 4.46-3.63 8.09-8.1 8.09a8.1 8.1 0 0 1-4.12-1.13l-.3-.18-3.06.8.82-2.99-.2-.31a8.03 8.03 0 0 1-1.23-4.28c0-4.46 3.63-8.1 8.1-8.1Zm-4.5 4.4c-.21 0-.55.08-.84.39-.29.32-1.1 1.08-1.1 2.62 0 1.55 1.13 3.04 1.28 3.25.16.21 2.2 3.36 5.32 4.58.74.32 1.32.51 1.77.66.74.24 1.42.2 1.96.12.6-.09 1.84-.75 2.1-1.48.26-.73.26-1.35.18-1.48-.08-.13-.29-.21-.6-.37-.32-.16-1.84-.91-2.12-1.01-.29-.11-.5-.16-.7.16-.21.31-.81 1-.99 1.21-.18.21-.37.24-.68.08-.32-.16-1.32-.49-2.52-1.55-.93-.83-1.56-1.86-1.74-2.17-.18-.31-.02-.48.14-.64.14-.14.32-.37.47-.55.16-.18.21-.31.32-.52.11-.21.05-.39-.03-.55-.08-.16-.7-1.7-.96-2.32-.25-.61-.51-.53-.7-.54-.18-.01-.39-.01-.6-.01Z" />
    ),
  },
  {
    label: 'TikTok',
    url: 'https://www.tiktok.com/@j__events_',
    icon: (
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.1-2.82h-3.1v12.2a2.6 2.6 0 0 1-2.6 2.5 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1 3.36-2.49V7.4a5.7 5.7 0 0 0-.76-.05A5.7 5.7 0 0 0 4.1 13.1a5.7 5.7 0 0 0 5.7 5.7 5.7 5.7 0 0 0 5.7-5.7V8.9a7.3 7.3 0 0 0 4.3 1.38V7.18a4.3 4.3 0 0 1-3.2-1.36Z" />
    ),
  },
]

export default function AgencyFooter() {
  return (
    <footer className="agency-footer">
      <div className="agency-footer__inner">
        <div className="agency-footer__col">
          <h2 className="agency-footer__brand">J Events</h2>
          <p className="agency-footer__tagline">
            A modern event management studio with an editorial eye planning
            weddings, celebrations, corporate nights, and live productions with
            calm precision.
          </p>
          <p className="agency-footer__cta">
            For enquiries drop us a message or give us a call
          </p>
        </div>

        <div className="agency-footer__col agency-footer__col--social">
          <span className="agency-footer__social-label">Follow us</span>
          <div className="agency-footer__socials">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="agency-footer__social"
                aria-label={s.label}
                title={s.label}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {s.icon}
                </svg>
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="agency-footer__bar">
        <span>
          Powered by J Events
          <svg className="agency-footer__heart" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21s-6.7-4.35-9.33-8.06C.9 10.3 1.4 6.9 4.1 5.6c1.9-.92 4.06-.3 5.3 1.27L12 9.5l2.6-2.63c1.24-1.57 3.4-2.19 5.3-1.27 2.7 1.3 3.2 4.7 1.43 7.34C18.7 16.65 12 21 12 21Z" />
          </svg>
        </span>
      </div>
    </footer>
  )
}
