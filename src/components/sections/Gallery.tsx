import { Play } from 'lucide-react'

type Item = {
  kind: 'photo' | 'video'
  label: 'photo.png' | 'video.mp4'
  event: 'Wedding' | 'Birthday' | 'Pageant' | 'Show' | 'Corporate'
  aspect: '4/5' | '16/11' | '1/1' | '3/4' | '16/9'
}

const ITEMS: Item[] = [
  { kind: 'photo', label: 'photo.png', event: 'Wedding', aspect: '4/5' },
  { kind: 'photo', label: 'photo.png', event: 'Birthday', aspect: '16/11' },
  { kind: 'video', label: 'video.mp4', event: 'Show', aspect: '16/9' },
  { kind: 'photo', label: 'photo.png', event: 'Pageant', aspect: '3/4' },
  { kind: 'photo', label: 'photo.png', event: 'Corporate', aspect: '1/1' },
]

function aspectClass(a: Item['aspect']) {
  switch (a) {
    case '4/5':
      return 'aspect-4/5'
    case '16/11':
      return 'aspect-16/11'
    case '1/1':
      return 'aspect-square'
    case '3/4':
      return 'aspect-3/4'
    case '16/9':
      return 'aspect-video'
  }
}

function Tile({ item }: { item: Item }) {
  return (
    <article
      className={[
        'group relative mb-5 break-inside-avoid overflow-hidden rounded-3xl bg-black',
        'shadow-(--shadow-elev) ring-1 ring-[rgb(var(--border))]',
      ].join(' ')}
    >
      <div className={['relative', aspectClass(item.aspect)].join(' ')}>
        <div className="absolute inset-0 opacity-[0.08] [background:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.2),transparent_50%)]" />

        <div className="absolute left-5 top-5 text-[10px] font-semibold tracking-[0.26em] text-white/70 uppercase">
          {item.label}
        </div>

        {item.kind === 'video' ? (
          <div className="absolute inset-0 grid place-items-center">
            <div className="grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md">
              <Play size={18} className="translate-x-px text-white/80" />
            </div>
          </div>
        ) : null}

        {/* Hover overlay */}
        <div
          className={[
            'absolute inset-0 flex items-end justify-between p-5',
            'bg-[linear-gradient(to_top,rgba(0,0,0,0.72),rgba(0,0,0,0.06),transparent)]',
            'opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100',
          ].join(' ')}
        >
          <div className="text-[10px] font-semibold tracking-[0.26em] text-white/75 uppercase">
            {item.event}
          </div>
          <div className="h-px w-14 origin-left scale-x-0 bg-[rgb(var(--terracotta))] transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </div>
      </div>
    </article>
  )
}

export function Gallery() {
  return (
    <section
      id="gallery"
      data-reveal="fade-up"
      className="mt-10 scroll-mt-28 md:mt-12"
      aria-label="Gallery"
    >
      <div className="flex items-end justify-between gap-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.24em] text-[rgb(var(--muted-fg))] uppercase">
            Gallery
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.01em] md:text-4xl">
            Moments Designed to Be Remembered
          </h2>
        </div>
        <p className="hidden max-w-md text-sm leading-relaxed text-[rgb(var(--muted-fg))] md:block">
          A small study in mood and movement—built for weddings, celebrations, live shows, and brand moments.
        </p>
      </div>

      <div
        data-reveal-stagger
        className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3"
      >
        {ITEMS.map((item, idx) => (
          <div key={`${item.kind}-${idx}`} data-reveal-item data-reveal="fade-up">
            <Tile item={item} />
          </div>
        ))}
      </div>
    </section>
  )
}

