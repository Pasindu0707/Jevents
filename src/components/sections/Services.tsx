import { STOCK } from '../../lib/media'
import { OptimizedImage } from '../ui/OptimizedImage'
import { SectionHeader } from '../ui/SectionHeader'

const SERVICES = [
  {
    title: 'Weddings',
    label: 'Romance',
    desc: 'Editorial beauty, seamless timelines, and calm coordination from first look to last dance.',
    image: STOCK.wedding,
  },
  {
    title: 'Birthdays',
    label: 'Celebration',
    desc: 'From intimate dinners to milestone soirées—styled moments with effortless flow.',
    image: STOCK.birthday,
  },
  {
    title: 'Pageants',
    label: 'Stage',
    desc: 'Precision run-of-show, backstage management, and elevated guest experience throughout.',
    image: STOCK.reception,
  },
  {
    title: 'Shows & Concerts',
    label: 'Live',
    desc: 'Production-forward planning with technical detail, venue alignment, and on-site control.',
    image: STOCK.corporate,
  },
  {
    title: 'Corporate Events',
    label: 'Business',
    desc: 'Conferences, launches, and retreats—crafted with brand clarity and operational ease.',
    image: STOCK.corporate,
  },
  {
    title: 'Private Celebrations',
    label: 'Intimate',
    desc: 'High-touch planning for gatherings that feel personal, refined, and unforgettable.',
    image: STOCK.private,
  },
] as const

export function Services() {
  return (
    <section id="services" data-reveal="fade-up" className="section-shell scroll-mt-28" aria-label="Services">
      <div className="rounded-3xl bg-[rgb(var(--main-300))] px-6 py-10 shadow-(--shadow-soft) ring-1 ring-[rgb(var(--border))] dark:bg-[rgb(var(--card))] md:px-10 md:py-12">
        <SectionHeader
          eyebrow="Services"
          title="Events We Bring to Life"
          description="Wedding-first expertise that scales to corporate galas, live shows, and private celebrations."
        />

        <div data-reveal-stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              data-reveal-item
              data-reveal="fade-up"
              className="glass-card glass-card-hover group relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-[rgb(var(--accent))] transition-transform duration-300 ease-out group-hover:scale-x-100" />
              <div className="p-4">
                <div className="overflow-hidden rounded-2xl">
                  <OptimizedImage
                    src={s.image}
                    alt={`${s.title} event photography`}
                    className="aspect-16/11 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <span className="text-[10px] font-semibold tracking-[0.26em] text-[rgb(var(--muted-fg))] uppercase">
                    {s.label}
                  </span>
                  <span className="h-px flex-1 bg-[rgb(var(--border))]" />
                </div>
                <h3 className="mt-4 font-display text-[length:var(--text-h3)]">{s.title}</h3>
                <p className="mt-2 text-[length:var(--text-small)] leading-relaxed text-[rgb(var(--muted-fg))]">
                  {s.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
