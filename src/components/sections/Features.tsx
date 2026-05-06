const FEATURES = [
  {
    n: 'I',
    title: 'Vendor coordination',
    desc: 'We source, align, and manage vendors with clear briefs—so quality stays high and decisions stay calm.',
  },
  {
    n: 'II',
    title: 'Guest management',
    desc: 'Invites, RSVPs, seating flows, and on-site touchpoints designed for ease and a premium guest experience.',
  },
  {
    n: 'III',
    title: 'Budget planning',
    desc: 'Transparent budgeting with smart allocations—so you know where every detail lands and why it matters.',
  },
  {
    n: 'IV',
    title: 'Stage & decor planning',
    desc: 'A cohesive visual story across stage, florals, lighting, and decor—tailored to your event’s tone.',
  },
  {
    n: 'V',
    title: 'Timeline scheduling',
    desc: 'Run-of-show built with breathing room, smooth transitions, and contingency planning baked in.',
  },
  {
    n: 'VI',
    title: 'On-day coordination',
    desc: 'Quiet leadership on-site—managing cues, vendors, and guests so you can stay present.',
  },
] as const

function PhotoPlaceholder() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-black shadow-(--shadow-elev) ring-1 ring-[rgb(var(--border))]">
      <div className="absolute inset-0 opacity-[0.06] [background:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.2),transparent_50%)]" />
      <div className="absolute left-5 top-5 text-[10px] font-semibold tracking-[0.26em] text-white/70 uppercase">
        photo.png
      </div>
      <div className="aspect-16/11 w-full" />
    </div>
  )
}

export function Features() {
  return (
    <section
      aria-label="Feature highlights"
      data-reveal="fade-up"
      className="mt-20 scroll-mt-28 md:mt-24"
    >
      <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-8 shadow-(--shadow-soft) md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-[rgb(var(--muted-fg))] uppercase">
              Features
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.01em] md:text-4xl">
              Everything Your Event Needs, Beautifully Managed
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-[rgb(var(--muted-fg))] md:text-base">
            A wedding-level attention to detail—adapted for every kind of event, from private celebrations to live productions.
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          {FEATURES.map((f, idx) => {
            const isReversed = idx % 2 === 1
            return (
              <div
                key={f.title}
                data-reveal={isReversed ? 'fade-left' : 'fade-up'}
                className={[
                  'grid items-center gap-6 rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-6 shadow-(--shadow-soft)',
                  'md:grid-cols-12 md:gap-10 md:p-8',
                ].join(' ')}
              >
                <div
                  className={[
                    'md:col-span-6',
                    isReversed ? 'md:order-2' : 'md:order-1',
                  ].join(' ')}
                >
                  <PhotoPlaceholder />
                </div>

                <div
                  className={[
                    'md:col-span-6',
                    isReversed ? 'md:order-1' : 'md:order-2',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold tracking-[0.26em] text-[rgb(var(--terracotta))] uppercase">
                      {f.n}
                    </span>
                    <span className="h-px flex-1 bg-[rgb(var(--border))]" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.01em] md:text-2xl">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted-fg))] md:text-base">
                    {f.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

