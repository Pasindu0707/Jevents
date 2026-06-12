import { Quote } from 'lucide-react'
import { PHOTOS } from '../../lib/media'
import { OptimizedImage } from '../ui/OptimizedImage'
import { SectionHeader } from '../ui/SectionHeader'

const TESTIMONIALS = [
  {
    quote:
      'J Events turned our wedding weekend into a calm, cinematic experience. Every vendor cue was invisible—we only felt the joy.',
    name: 'Nethmi & Dinuka',
    role: 'Garden wedding · 180 guests',
    image: PHOTOS.wedding01,
  },
  {
    quote:
      'From RSVP tracking to on-site coordination, the team handled our corporate gala like a premium SaaS product—structured and stress-free.',
    name: 'Horizon Labs',
    role: 'Corporate launch · Colombo',
    image: PHOTOS.wedding04,
  },
  {
    quote:
      'Our milestone birthday felt editorial and personal. The decor, timeline, and guest flow were flawless start to finish.',
    name: 'Amaya Perera',
    role: 'Private celebration',
    image: PHOTOS.wedding05,
  },
] as const

export function Testimonials() {
  return (
    <section id="testimonials" aria-label="Testimonials" className="section-shell scroll-mt-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div data-reveal="fade-up">
          <SectionHeader
            eyebrow="Testimonials"
            title="Loved by couples, brands, and hosts"
            description="Real stories from weddings, corporate nights, and celebrations we have brought to life."
            align="center"
          />

          <div
            data-reveal-stagger
            className="mt-10 grid gap-5 md:grid-cols-3"
          >
            {TESTIMONIALS.map((t) => (
              <article
                key={t.name}
                data-reveal-item
                data-reveal="fade-up"
                className="glass-card glass-card-hover flex flex-col overflow-hidden"
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <OptimizedImage
                    src={t.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(var(--secondary-100)/0.8),transparent_55%)]" aria-hidden />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3">
                    <Quote size={18} className="shrink-0 text-[rgb(var(--final-200))]" aria-hidden />
                    <span className="h-px flex-1 bg-[rgb(var(--border))]" aria-hidden />
                  </div>
                  <blockquote className="mt-4 flex-1 text-small leading-relaxed text-[rgb(var(--muted-fg))]">
                    "{t.quote}"
                  </blockquote>
                  <footer className="mt-6 border-t border-[rgb(var(--border))] pt-4">
                    <p className="font-display text-lg leading-snug">{t.name}</p>
                    <p className="mt-1 text-[10px] font-semibold tracking-[0.22em] text-[rgb(var(--final-200))] uppercase">
                      {t.role}
                    </p>
                  </footer>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
