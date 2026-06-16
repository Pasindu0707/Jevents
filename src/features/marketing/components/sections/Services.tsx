import { ArrowRight } from 'lucide-react'
import { STOCK } from '@/lib/media'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { SectionHeader } from '@/components/ui/SectionHeader'

const CATEGORIES = [
  { title: 'Weddings', desc: 'Editorial romance, seamless timelines, calm coordination' },
  { title: 'Corporate', desc: 'Conferences, launches, and retreats with brand clarity' },
  { title: 'Social', desc: 'Birthdays, pageants, shows, and private celebrations' },
] as const

const SERVICES = [
  {
    title: 'Weddings',
    label: 'Romance',
    image: STOCK.wedding,
  },
  {
    title: 'Birthdays',
    label: 'Celebration',
    image: STOCK.birthday,
  },
  {
    title: 'Pageants',
    label: 'Stage',
    image: STOCK.reception,
  },
  {
    title: 'Shows & Concerts',
    label: 'Live',
    image: STOCK.corporate,
  },
  {
    title: 'Corporate Events',
    label: 'Business',
    image: STOCK.corporate,
  },
  {
    title: 'Private Celebrations',
    label: 'Intimate',
    image: STOCK.private,
  },
] as const

export function Services() {
  return (
    <>
      {/* Category overview — overlaps hero bottom */}
      <section
        data-reveal="fade-up"
        data-reveal-stagger
        aria-label="Event categories"
        className="relative z-10 -mt-8 grid gap-4 rounded-3xl border border-[rgb(var(--border))]/60 bg-[rgb(var(--card))]/90 p-5 shadow-(--shadow-elev) backdrop-blur-2xl md:-mt-12 md:grid-cols-3 md:gap-6 md:p-7"
      >
        {CATEGORIES.map(({ title, desc }) => (
          <article
            key={title}
            data-reveal-item
            className="group rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-5 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[rgb(var(--final-300)/0.45)] hover:shadow-(--shadow-soft)"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-lg">{title}</h3>
              <ArrowRight
                size={14}
                className="shrink-0 text-[rgb(var(--muted-fg))] transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:text-[rgb(var(--final-200))]"
                aria-hidden
              />
            </div>
            <p className="mt-2 text-small leading-relaxed text-[rgb(var(--muted-fg))]">
              {desc}
            </p>
          </article>
        ))}
      </section>

      {/* Full services grid */}
      <section id="services" data-reveal="fade-up" className="section-shell scroll-mt-28" aria-label="Services">
        <div className="rounded-3xl bg-[rgb(var(--main-300))] px-6 py-10 shadow-(--shadow-soft) ring-1 ring-[rgb(var(--border))] dark:bg-[rgb(var(--card))] md:px-10 md:py-12">
        <div className="flex flex-col gap-4 [&>*]:!flex-col [&>*]:!items-start">
          <SectionHeader
            eyebrow="Services"
            title="Events We Bring to Life"
            description="Wedding first expertise that scales to corporate galas, live shows, and private celebrations."
          />
</div>
          <div data-reveal-stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <article
                key={s.title}
                data-reveal-item
                data-reveal="fade-up"
                className="glass-card glass-card-hover group relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-[rgb(var(--final-200))] to-[rgb(var(--final-300))] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                <div className="p-4">
                  <div className="overflow-hidden rounded-2xl">
                    <OptimizedImage
                      src={s.image}
                      alt={`${s.title} event photography`}
                      className="aspect-16/11 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    <span className="text-[10px] font-semibold tracking-[0.26em] text-[rgb(var(--final-200))] uppercase">
                      {s.label}
                    </span>
                    <span className="h-px flex-1 bg-[rgb(var(--border))]" />
                  </div>
                  <h3 className="mt-3 font-display text-h3">{s.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
