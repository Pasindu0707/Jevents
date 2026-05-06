import {
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Journey', href: '#journey' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Packages', href: '#packages' },
  { label: 'Contact', href: '#contact' },
] as const

const eventTypes = [
  'Weddings',
  'Birthdays',
  'Pageants',
  'Shows & Concerts',
  'Corporate Events',
  'Private Celebrations',
] as const

const socials = [
  { label: 'Website', href: '#', icon: Globe },
  { label: 'Email', href: '#contact', icon: Mail },
  { label: 'WhatsApp', href: '#', icon: MessageCircle },
  { label: 'Telegram', href: '#', icon: Send },
] as const

export function Footer() {
  return (
    <footer
      aria-label="Footer"
      className={[
        'mt-20 border-t border-white/10',
        'bg-[rgb(var(--forest))] text-[rgb(var(--beige))]',
        'dark:bg-[rgb(12,16,12)]',
      ].join(' ')}
    >
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <div className="text-sm font-semibold tracking-[0.22em] uppercase">
              J Events
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[rgb(var(--beige))/0.84]">
              A modern event management studio with an editorial eye—planning weddings,
              celebrations, corporate nights, and live productions with calm precision.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className={[
                      'inline-flex h-10 w-10 items-center justify-center rounded-full',
                      'border border-white/15 bg-white/5',
                      'text-[rgb(var(--beige))]',
                      'transition-[transform,background-color,border-color] duration-300 ease-out',
                      'hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/25',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--terracotta))] focus-visible:ring-offset-4 focus-visible:ring-offset-[rgb(var(--forest))]',
                      'dark:focus-visible:ring-offset-[rgb(12,16,12)]',
                    ].join(' ')}
                  >
                    <Icon size={18} className="opacity-90" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:col-span-8 md:grid-cols-3">
            <div>
              <div className="text-xs font-semibold tracking-[0.26em] uppercase text-[rgb(var(--beige))/0.9]">
                Quick links
              </div>
              <ul className="mt-5 grid gap-3">
                {quickLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-[rgb(var(--beige))/0.78] hover:text-[rgb(var(--beige))]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold tracking-[0.26em] uppercase text-[rgb(var(--beige))/0.9]">
                Event types
              </div>
              <ul className="mt-5 grid gap-3">
                {eventTypes.map((t) => (
                  <li key={t} className="text-sm text-[rgb(var(--beige))/0.78]">
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold tracking-[0.26em] uppercase text-[rgb(var(--beige))/0.9]">
                Contact
              </div>
              <ul className="mt-5 grid gap-4 text-sm text-[rgb(var(--beige))/0.78]">
                <li className="flex gap-3">
                  <Mail size={18} className="mt-0.5 opacity-85" />
                  <span>hello@jevents.example</span>
                </li>
                <li className="flex gap-3">
                  <Phone size={18} className="mt-0.5 opacity-85" />
                  <span>+00 000 000 0000</span>
                </li>
                <li className="flex gap-3">
                  <MapPin size={18} className="mt-0.5 opacity-85" />
                  <span>City • Country</span>
                </li>
              </ul>

              <div className="mt-7 rounded-3xl border border-white/15 bg-white/5 p-4">
                <div className="text-[10px] font-semibold tracking-[0.26em] uppercase text-[rgb(var(--beige))/0.9]">
                  Newsletter
                </div>
                <form
                  className="mt-3 flex items-center gap-2"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <label className="sr-only" htmlFor="newsletterEmail">
                    Email address
                  </label>
                  <input
                    id="newsletterEmail"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="Email address"
                    className={[
                      'h-11 w-full rounded-full px-4 text-sm',
                      'bg-black/10 text-[rgb(var(--beige))] placeholder:text-[rgb(var(--beige))/0.55]',
                      'border border-white/15 outline-none',
                      'focus:border-[rgb(var(--terracotta))] focus:ring-2 focus:ring-[rgb(var(--terracotta))]/40',
                    ].join(' ')}
                  />
                  <button
                    type="submit"
                    className={[
                      'h-11 shrink-0 rounded-full px-4 text-xs font-semibold',
                      'tracking-[0.22em] uppercase',
                      'bg-[rgb(var(--terracotta))] text-[rgb(20,28,22)]',
                      'hover:opacity-95',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
                    ].join(' ')}
                  >
                    Join
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-[rgb(var(--beige))/0.7] md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} J Events. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-[rgb(var(--beige))]">
              Privacy
            </a>
            <a href="#" className="hover:text-[rgb(var(--beige))]">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

