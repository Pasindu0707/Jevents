import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { CONTACT, SOCIAL } from '../../lib/contact'
import { SectionHeader } from '../ui/SectionHeader'
import { FacebookIcon, InstagramIcon, TikTokIcon } from '../ui/SocialIcons'

const externalLinkProps = {
  target: '_blank' as const,
  rel: 'noopener noreferrer',
}

export function Contact() {
  return (
    <section id="contact" data-reveal="fade-up" className="section-shell scroll-mt-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="section-inner">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
            <div className="flex flex-col gap-4 [&>*]:!flex-col [&>*]:!items-start">
  <SectionHeader
    eyebrow="Contact"
    title="Tell us what you're planning"
    description="Share your date, guest count, and vision. We'll reply within one business day with a tailored path forward."
  />
</div>
              <ul className="mt-8 space-y-4 text-[length:var(--text-small)] text-[rgb(var(--muted-fg))]">
                <li className="flex gap-3">
                  <Mail size={18} className="mt-0.5 shrink-0 text-[rgb(var(--final-200))]" aria-hidden />
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-[rgb(var(--fg))]">
                    {CONTACT.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Phone size={18} className="mt-0.5 shrink-0 text-[rgb(var(--final-200))]" aria-hidden />
                  <a href={`tel:${CONTACT.phoneTel}`} className="hover:text-[rgb(var(--fg))]">
                    {CONTACT.phoneDisplay}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MessageCircle size={18} className="mt-0.5 shrink-0 text-[rgb(var(--final-200))]" aria-hidden />
                  <a
                    href={CONTACT.whatsappUrl}
                    {...externalLinkProps}
                    className="hover:text-[rgb(var(--fg))]"
                  >
                    WhatsApp Business · {CONTACT.phoneDisplay}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-[rgb(var(--final-200))]" aria-hidden />
                  <span>{CONTACT.location}</span>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={SOCIAL.facebook}
                  {...externalLinkProps}
                  aria-label="Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--border))] text-[rgb(var(--fg))] transition-colors hover:border-[rgb(var(--final-200))] hover:text-[rgb(var(--final-200))]"
                >
                  <FacebookIcon size={18} />
                </a>
                <a
                  href={SOCIAL.instagram}
                  {...externalLinkProps}
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--border))] text-[rgb(var(--fg))] transition-colors hover:border-[rgb(var(--final-200))] hover:text-[rgb(var(--final-200))]"
                >
                  <InstagramIcon size={18} />
                </a>
                <a
                  href={SOCIAL.tiktok}
                  {...externalLinkProps}
                  aria-label="TikTok"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--border))] text-[rgb(var(--fg))] transition-colors hover:border-[rgb(var(--final-200))] hover:text-[rgb(var(--final-200))]"
                >
                  <TikTokIcon size={18} />
                </a>
              </div>
            </div>

            <form
              className="glass-card grid gap-4 p-6 lg:col-span-7 lg:p-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  <span className="font-medium">Name</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    className="h-11 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-4 outline-none focus:border-[rgb(var(--final-200))] focus:ring-2 focus:ring-[rgb(var(--final-300)/0.25)]"
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  <span className="font-medium">Email</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    className="h-11 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-4 outline-none focus:border-[rgb(var(--final-200))] focus:ring-2 focus:ring-[rgb(var(--final-300)/0.25)]"
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm">
                <span className="font-medium">Contact number</span>
                <input
                  type="tel"
                  name="phone"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder={CONTACT.phoneDisplay}
                  className="h-11 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-4 outline-none focus:border-[rgb(var(--final-200))] focus:ring-2 focus:ring-[rgb(var(--final-300)/0.25)]"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-medium">Event type</span>
                <select
                  name="eventType"
                  className="h-11 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-4 outline-none focus:border-[rgb(var(--final-200))]"
                  defaultValue="wedding"
                >
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate</option>
                  <option value="birthday">Birthday</option>
                  <option value="private">Private celebration</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-medium">Message</span>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Date, location, guest count, and anything else we should know…"
                  className="resize-y rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-4 py-3 outline-none focus:border-[rgb(var(--final-200))] focus:ring-2 focus:ring-[rgb(var(--final-300)/0.25)]"
                />
              </label>
              <button type="submit" className="btn-primary mt-2 inline-flex gap-2">
                <Send size={16} aria-hidden />
                Request consultation
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
