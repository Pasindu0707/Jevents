import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { CONTACT, SOCIAL } from '@/lib/contact'
import { LOGOS } from '@/lib/media'
import { FacebookIcon, InstagramIcon, TikTokIcon } from '@/components/ui/SocialIcons'
import { OptimizedImage } from '@/components/ui/OptimizedImage'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  // { label: 'Journey', href: '#journey' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
  { label: 'FAQ', href: '#faq' },
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
  { label: 'Facebook', href: SOCIAL.facebook, Icon: FacebookIcon },
  { label: 'Instagram', href: SOCIAL.instagram, Icon: InstagramIcon },
  { label: 'TikTok', href: SOCIAL.tiktok, Icon: TikTokIcon },
  { label: 'WhatsApp', href: CONTACT.whatsappUrl, Icon: MessageCircle },
] as const

const externalLinkProps = {
  target: '_blank' as const,
  rel: 'noopener noreferrer',
}

export function Footer() {
  return (
    <footer
      aria-label="Footer"
      className={[
        'mt-12 border-t border-white/10 md:mt-14',
        'bg-[rgb(var(--forest))] text-[rgb(var(--beige))]',
        'dark:bg-[rgb(12,16,12)]',
      ].join(' ')}
    >
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <OptimizedImage
              src={LOGOS.full}
              alt="J Events"
              className="h-20 w-auto object-contain"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[rgb(var(--beige))/0.84]">
              A modern event management studio with an editorial eye planning weddings,
              celebrations, corporate nights, and live productions with calm precision.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...externalLinkProps}
                  className={[
                    'inline-flex h-10 w-10 items-center justify-center rounded-full',
                    'border border-white/15 bg-white/5 text-[rgb(var(--beige))]',
                    'transition-[transform,background-color,border-color] duration-300 ease-out',
                    'hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/25',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--terracotta))]',
                  ].join(' ')}
                >
                  <Icon size={18} className="opacity-90" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:col-span-8 md:grid-cols-3">
            <div>
              <p className="text-xs font-semibold tracking-[0.26em] uppercase text-[rgb(var(--beige))/0.9]">
                Quick links
              </p>
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
              <p className="text-xs font-semibold tracking-[0.26em] uppercase text-[rgb(var(--beige))/0.9]">
                Event types
              </p>
              <ul className="mt-5 grid gap-3">
                {eventTypes.map((t) => (
                  <li key={t} className="text-sm text-[rgb(var(--beige))/0.78]">
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.26em] uppercase text-[rgb(var(--beige))/0.9]">
                Contact
              </p>
              <ul className="mt-5 grid gap-4 text-sm text-[rgb(var(--beige))/0.78]">
                <li className="flex gap-3">
                  <Mail size={18} className="mt-0.5 shrink-0 opacity-85" aria-hidden />
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-[rgb(var(--beige))]">
                    {CONTACT.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Phone size={18} className="mt-0.5 shrink-0 opacity-85" aria-hidden />
                  <a href={`tel:${CONTACT.phoneTel}`} className="hover:text-[rgb(var(--beige))]">
                    {CONTACT.phoneDisplay}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MessageCircle size={18} className="mt-0.5 shrink-0 opacity-85" aria-hidden />
                  <a
                    href={CONTACT.whatsappUrl}
                    {...externalLinkProps}
                    className="hover:text-[rgb(var(--beige))]"
                  >
                    WhatsApp · {CONTACT.phoneDisplay}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 opacity-85" aria-hidden />
                  <span>{CONTACT.location}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-[rgb(var(--beige))/0.7] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} J Events. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <a href={SOCIAL.facebook} {...externalLinkProps} className="hover:text-[rgb(var(--beige))]">
              Facebook
            </a>
            <a href={SOCIAL.instagram} {...externalLinkProps} className="hover:text-[rgb(var(--beige))]">
              Instagram
            </a>
            <a href={SOCIAL.tiktok} {...externalLinkProps} className="hover:text-[rgb(var(--beige))]">
              TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
