const SERVICES = [
  {
    title: 'Weddings',
    label: 'Romance',
    desc: 'Editorial beauty, seamless timelines, and calm coordination from first look to last dance.',
  },
  {
    title: 'Birthdays',
    label: 'Celebration',
    desc: 'From intimate dinners to milestone soirées—styled moments with effortless flow.',
  },
  {
    title: 'Pageants',
    label: 'Stage',
    desc: 'Precision run-of-show, backstage management, and elevated guest experience throughout.',
  },
  {
    title: 'Shows & Concerts',
    label: 'Live',
    desc: 'Production-forward planning with technical detail, venue alignment, and on-site control.',
  },
  {
    title: 'Corporate Events',
    label: 'Business',
    desc: 'Conferences, launches, and retreats—crafted with brand clarity and operational ease.',
  },
  {
    title: 'Private Celebrations',
    label: 'Intimate',
    desc: 'High-touch planning for gatherings that feel personal, refined, and unforgettable.',
  },
] as const

function PhotoBox() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-black">
      <div className="absolute inset-0 opacity-[0.06] [background:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.2),transparent_50%)]" />
      <div className="absolute left-4 top-4 text-[10px] font-semibold tracking-[0.26em] text-white/70 uppercase">
        photo.png
      </div>
      <div className="aspect-16/11 w-full" />
    </div>
  )
}

export function Services() {
  return (
    <section
      id="services"
      data-reveal="fade-up"
      className="mt-20 scroll-mt-28 md:mt-24"
      aria-label="Services"
    >
      <div className="rounded-3xl bg-[rgb(var(--beige))] px-6 py-10 shadow-(--shadow-soft) ring-1 ring-[rgb(var(--border))] dark:bg-[rgb(var(--card))] md:px-10 md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-[rgb(var(--muted-fg))] uppercase">
              Services
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.01em] md:text-4xl">
              Events We Bring to Life
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-[rgb(var(--muted-fg))] md:text-base">
            A modern studio for celebrations and productions—built on taste, timelines,
            and total clarity.
          </p>
        </div>

        <div
          data-reveal-stagger
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((s) => (
            <article
              key={s.title}
              data-reveal-item
              data-reveal="fade-up"
              className={[
                'group relative overflow-hidden rounded-3xl',
                'border border-[rgb(var(--border))] bg-[rgb(var(--card))]',
                'shadow-(--shadow-soft) transition-transform duration-300 ease-out',
                'hover:-translate-y-1 hover:shadow-(--shadow-elev)',
                'focus-within:-translate-y-1 focus-within:shadow-(--shadow-elev)',
              ].join(' ')}
            >
              {/* terracotta accent line */}
              <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-[rgb(var(--terracotta))] transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-within:scale-x-100" />

              <div className="p-4">
                <div className="relative">
                  <div className="transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                    <PhotoBox />
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <span className="text-[10px] font-semibold tracking-[0.26em] text-[rgb(var(--muted-fg))] uppercase">
                    {s.label}
                  </span>
                  <span className="h-px flex-1 bg-[rgb(var(--border))]" />
                </div>

                <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--muted-fg))]">
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

