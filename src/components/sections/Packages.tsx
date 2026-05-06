import { Check } from 'lucide-react'

type Pkg = {
  name: string
  badge?: string
  accent: 'forest' | 'terracotta'
  features: string[]
  recommended?: boolean
}

const PACKAGES: Pkg[] = [
  {
    name: 'Essential Planning',
    accent: 'forest',
    features: [
      'Planning roadmap + priority checklist',
      'Vendor recommendations + shortlisting',
      'Budget baseline + allocation guidance',
      'Timeline draft + milestone tracking',
    ],
  },
  {
    name: 'Signature Event Management',
    badge: 'Recommended',
    accent: 'terracotta',
    recommended: true,
    features: [
      'Everything in Essential, plus:',
      'Vendor coordination + confirmations',
      'Guest flow planning + experience details',
      'Full run-of-show + on-site coordination',
      'Contingency planning + day-of leadership',
    ],
  },
  {
    name: 'Full Experience Design',
    accent: 'forest',
    features: [
      'Creative direction + event concept',
      'Stage, decor, lighting + layout planning',
      'Production timeline + team management',
      'End-to-end planning and execution support',
    ],
  },
]

function AccentDot({ accent }: { accent: Pkg['accent'] }) {
  return (
    <span
      className={[
        'inline-block h-2.5 w-2.5 rounded-full',
        accent === 'terracotta'
          ? 'bg-[rgb(var(--terracotta))]'
          : 'bg-[rgb(var(--forest))]',
      ].join(' ')}
      aria-hidden="true"
    />
  )
}

export function Packages() {
  return (
    <section
      id="packages"
      data-reveal="fade-up"
      className="mt-20 scroll-mt-28 md:mt-24"
      aria-label="Packages"
    >
      <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-8 shadow-(--shadow-soft) md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-[rgb(var(--muted-fg))] uppercase">
              Packages
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.01em] md:text-4xl">
              Choose How We Support You
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-[rgb(var(--muted-fg))] md:text-base">
            Flexible support, wedding-level polish. We’ll meet you where you are—and bring structure where you need it most.
          </p>
        </div>

        <div
          data-reveal-stagger
          className="mt-10 grid gap-5 lg:grid-cols-3"
        >
          {PACKAGES.map((p) => (
            <article
              key={p.name}
              data-reveal-item
              data-reveal="fade-up"
              className={[
                'group relative overflow-hidden rounded-3xl border bg-[rgb(var(--bg))] p-7 shadow-(--shadow-soft)',
                'transition-[transform,box-shadow] duration-300 ease-out',
                p.recommended
                  ? 'border-[rgb(var(--terracotta))] shadow-(--shadow-elev) lg:-translate-y-2'
                  : 'border-[rgb(var(--border))] hover:-translate-y-1 hover:shadow-(--shadow-elev)',
              ].join(' ')}
            >
              <div
                className={[
                  'absolute left-0 top-0 h-1 w-full',
                  p.accent === 'terracotta'
                    ? 'bg-[rgb(var(--terracotta))]'
                    : 'bg-[rgb(var(--forest))]',
                  p.recommended ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                  'transition-opacity duration-300 ease-out',
                ].join(' ')}
              />

              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <AccentDot accent={p.accent} />
                    <h3 className="text-lg font-semibold tracking-[-0.01em] md:text-xl">
                      {p.name}
                    </h3>
                  </div>
                  {p.badge ? (
                    <div className="mt-3 inline-flex items-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 py-1 text-[10px] font-semibold tracking-[0.26em] text-[rgb(var(--muted-fg))] uppercase">
                      {p.badge}
                    </div>
                  ) : null}
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-semibold tracking-[0.26em] text-[rgb(var(--muted-fg))] uppercase">
                    Price
                  </div>
                  <div className="mt-2 text-sm font-semibold tracking-wide">
                    Custom Quote
                  </div>
                </div>
              </div>

              <ul className="mt-6 grid gap-3">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-[rgb(var(--muted-fg))]">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[rgb(var(--card))] ring-1 ring-[rgb(var(--border))]">
                      <Check size={14} className="text-[rgb(var(--primary))]" />
                    </span>
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={[
                  'mt-7 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-xs font-semibold',
                  'tracking-[0.22em] uppercase',
                  p.recommended
                    ? 'bg-[rgb(var(--terracotta))] text-[rgb(var(--accent-fg))]'
                    : 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-fg))]',
                  'shadow-(--shadow-soft) hover:shadow-(--shadow-elev) hover:opacity-95',
                  'focus-visible:outline-none',
                ].join(' ')}
              >
                Request Quote
              </a>
            </article>
          ))}
        </div>

        {/* Final CTA */}
        <div
          data-reveal="clip-reveal"
          className="mt-12 overflow-hidden rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-8 shadow-(--shadow-soft) md:p-10"
        >
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <p className="text-xs font-semibold tracking-[0.24em] text-[rgb(var(--muted-fg))] uppercase">
                Next step
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] md:text-4xl">
                Let’s Create Your Next Unforgettable Event
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[rgb(var(--muted-fg))] md:text-base">
                Tell us what you’re planning and we’ll map the best path forward—timelines, vendors, and a clear run-of-show.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:col-span-4 md:items-end">
              <a
                href="#contact"
                className={[
                  'inline-flex w-full items-center justify-center rounded-full px-7 py-3 text-xs font-semibold md:w-auto',
                  'tracking-[0.22em] uppercase',
                  'bg-[rgb(var(--primary))] text-[rgb(var(--primary-fg))]',
                  'shadow-(--shadow-elev) hover:opacity-95',
                ].join(' ')}
              >
                Book a Consultation
              </a>
              <a
                href="#services"
                className={[
                  'inline-flex w-full items-center justify-center rounded-full px-7 py-3 text-xs font-semibold md:w-auto',
                  'tracking-[0.22em] uppercase',
                  'border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--fg))]',
                  'shadow-(--shadow-soft) hover:shadow-(--shadow-elev)',
                ].join(' ')}
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

