import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * Invitation "products" showcase on the homepage. Each entry is a ready-made
 * digital-invitation design with a live sample page. Add a new design by
 * dropping its couple JSON in public/data/ and adding one row here — the
 * "View sample" button opens that live invitation.
 */
type Product = {
  name: string
  label: string
  tagline: string
  /** Slug of the sample invitation in public/data/<slug>.json */
  sampleSlug: string
  /** Theme colours used for the image-free live preview swatch. */
  bg: string
  accent: string
  ink: string
  font: string
  badge?: string
}

const PRODUCTS: Product[] = [
  {
    name: 'Rose Gold',
    label: 'Romantic',
    tagline: 'Blush tones, floral dividers and softly falling petals.',
    sampleSlug: 'sample-rosegold',
    bg: '#1a1416',
    accent: '#c08a7d',
    ink: '#e8b4a0',
    font: "'Great Vibes', cursive",
    badge: 'Popular',
  },
  {
    name: 'Emerald',
    label: 'Garden',
    tagline: 'Deep greens with a warm firefly glow.',
    sampleSlug: 'sample-emerald',
    bg: '#0f1713',
    accent: '#7fa37e',
    ink: '#bcd6b2',
    font: "'Dancing Script', cursive",
  },
  {
    name: 'Midnight Gold',
    label: 'Classic',
    tagline: 'Dark, elegant and dusted with gold.',
    sampleSlug: 'sample-midnight',
    bg: '#100d0b',
    accent: '#c9a45c',
    ink: '#e7c987',
    font: "'Pinyon Script', cursive",
  },
]

export function Products() {
  return (
    <section
      id="products"
      data-reveal="fade-up"
      className="section-shell scroll-mt-28"
      aria-label="Invitation designs"
    >
      <SectionHeader
        eyebrow="Our Products"
        title="A Digital Invitation, On Us"
        description="When couples choose J Events to plan their wedding, this comes with it — their own beautiful, animated invitation page to share with guests. A complimentary extra, included with our planning. Preview a live sample below — more designs are on the way."
      />

      <div data-reveal-stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => (
          <article
            key={p.sampleSlug}
            data-reveal-item
            data-reveal="fade-up"
            className="glass-card glass-card-hover group flex flex-col overflow-hidden"
          >
            {/* Image-free preview rendered from the design's own theme colours */}
            <div className="relative aspect-4/3 overflow-hidden" style={{ background: p.bg }}>
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(120% 120% at 50% 0%, ${p.accent}33, transparent 60%)`,
                }}
                aria-hidden
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <span
                  className="text-[10px] font-semibold tracking-[0.3em] uppercase"
                  style={{ color: p.accent }}
                >
                  The Wedding of
                </span>
                <p className="mt-2 text-4xl leading-tight" style={{ fontFamily: p.font, color: p.ink }}>
                  Amara &amp; Nuwan
                </p>
                <span className="mt-3 h-px w-12" style={{ background: p.accent }} aria-hidden />
              </div>
              {p.badge && (
                <span
                  className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white uppercase"
                  style={{ background: p.accent }}
                >
                  {p.badge}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-5">
              <span className="text-[10px] font-semibold tracking-[0.26em] text-[rgb(var(--final-200))] uppercase">
                {p.label}
              </span>
              <h3 className="mt-2 font-display text-h3">{p.name}</h3>
              <p className="mt-2 text-small leading-relaxed text-[rgb(var(--muted-fg))]">
                {p.tagline}
              </p>
              <Link
                to={`/${p.sampleSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-5 !w-auto self-start px-5 py-2.5"
              >
                View sample
                <ArrowUpRight size={16} className="ml-1.5" aria-hidden />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
