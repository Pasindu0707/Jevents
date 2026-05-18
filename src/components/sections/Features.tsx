import { PHOTOS } from '../../lib/media'
import { OptimizedImage } from '../ui/OptimizedImage'
import { SectionHeader } from '../ui/SectionHeader'

const FEATURES = [
  { n: 'I', title: 'Vendor coordination' },
  { n: 'II', title: 'Guest management' },
  { n: 'III', title: 'Budget planning' },
  { n: 'IV', title: 'Stage & decor planning' },
  { n: 'V', title: 'Timeline scheduling' },
  { n: 'VI', title: 'On-day coordination' },
] as const

export function Features() {
  return (
    <section aria-label="Feature highlights" data-reveal="fade-up" className="section-shell">
      <div className="section-inner">
        <SectionHeader
          eyebrow="Features"
          title="Everything Your Event Needs, Beautifully Managed"
          description="Wedding-level attention to detail—adapted for every kind of celebration, from private dinners to live productions."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="overflow-hidden rounded-3xl shadow-(--shadow-elev) ring-1 ring-[rgb(var(--border))]">
            <OptimizedImage
              src={PHOTOS.wedding02}
              alt="Wedding celebration"
              className="aspect-4/5 w-full object-cover lg:aspect-16/11"
            />
          </div>

          <ul
            data-reveal-stagger
            className="grid gap-3 sm:grid-cols-2"
          >
            {FEATURES.map((f) => (
              <li
                key={f.title}
                data-reveal-item
                className="flex items-center gap-3 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-4 py-3"
              >
                <span className="text-[10px] font-semibold tracking-[0.22em] text-[rgb(var(--final-200))] uppercase">
                  {f.n}
                </span>
                <span className="h-px w-4 shrink-0 bg-[rgb(var(--border))]" aria-hidden />
                <h3 className="font-display text-[length:var(--text-small)] leading-snug">{f.title}</h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
