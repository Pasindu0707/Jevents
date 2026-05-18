import { PHOTOS } from '../../lib/media'
import { OptimizedImage } from '../ui/OptimizedImage'
import { SectionHeader } from '../ui/SectionHeader'

const ITEMS = [
  { src: PHOTOS.hero, event: 'Wedding', aspect: 'aspect-4/5' },
  { src: PHOTOS.wedding01, event: 'Engagement', aspect: 'aspect-16/11' },
  { src: PHOTOS.wedding02, event: 'Reception', aspect: 'aspect-video' },
  { src: PHOTOS.wedding03, event: 'Garden ceremony', aspect: 'aspect-3/4' },
  { src: PHOTOS.wedding04, event: 'Corporate gala', aspect: 'aspect-square' },
  { src: PHOTOS.wedding05, event: 'Private celebration', aspect: 'aspect-4/5' },
] as const

export function Gallery() {
  return (
    <section id="gallery" data-reveal="fade-up" className="section-shell scroll-mt-28" aria-label="Gallery">
      <SectionHeader
        eyebrow="Gallery"
        title="Moments Designed to Be Remembered"
        description="A curated look at weddings, celebrations, and brand moments we've brought to life."
      />

      <div data-reveal-stagger className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {ITEMS.map((item) => (
          <article
            key={item.src}
            data-reveal-item
            data-reveal="fade-up"
            className="group relative mb-5 break-inside-avoid overflow-hidden rounded-3xl shadow-(--shadow-elev) ring-1 ring-[rgb(var(--border))]"
          >
            <div className={`relative ${item.aspect}`}>
              <OptimizedImage
                src={item.src}
                alt={`${item.event} photography by J Events`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-end justify-between bg-[linear-gradient(to_top,rgba(71,79,68,0.75),transparent_55%)] p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-[10px] font-semibold tracking-[0.26em] text-[rgb(var(--main-300))] uppercase">
                  {item.event}
                </span>
                <span className="h-px w-14 origin-left scale-x-0 bg-[rgb(var(--accent))] transition-transform group-hover:scale-x-100" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
