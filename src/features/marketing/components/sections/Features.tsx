import { PHOTOS } from '@/lib/media'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { SectionHeader } from '@/components/ui/SectionHeader'

const FEATURES = [
  { n: '1', title: 'Vendor coordination', description:'From caterers to photographers to florists' },
  { n: '2', title: 'Guest management', description:'From seating to dietary preferences to plus ones' },
  { n: '3', title: 'Budget planning', description:'From tracking expenses to managing vendor deposits and final payments' },
  { n: '4', title: 'Stage & decor planning', description:'From lighting to sound to seating.' },
  { n: '5', title: 'Timeline scheduling', description:'From the ceremony to the reception.' },
  { n: '6', title: 'On-day coordination', description:'Relax and enjoy your event while we handle all the heavy lifting.' },
] as const

export function Features() {
  return (
    <section aria-label="Feature highlights" data-reveal="fade-up" className="section-shell">
      <div className="section-inner">
        <SectionHeader
          eyebrow="Features"
          title="Everything Your Event Needs, Beautifully Managed"
          // description="Wedding-level attention to detail—adapted for every kind of celebration, from private dinners to live productions."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="overflow-hidden rounded-3xl shadow-(--shadow-elev) ring-1 ring-[rgb(var(--border))]">
            <OptimizedImage
              src={PHOTOS.wedding02}
              alt="Wedding celebration"
              className="aspect-4/5 w-full object-cover lg:aspect-16/11"
            />
          </div>

          <ul data-reveal-stagger className="grid gap-3 sm:grid-cols-2">
            {FEATURES.map((f) => (
             <li
             key={f.title}
             data-reveal-item
             className="flex gap-4 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-4 transition-[border-color,box-shadow] duration-300 hover:border-[rgb(var(--final-300)/0.4)] hover:shadow-(--shadow-soft)"
           >
             <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--final-300)/0.12)] text-[10px] font-bold tracking-[0.14em] text-[rgb(var(--final-200))] uppercase">
               {f.n}
             </span>
           
             <div className="flex flex-col">
               <h3 className="font-display text-base font-semibold leading-tight">
                 {f.title}
               </h3>
           
               <p className="mt-1 text-sm text-[rgb(var(--text-muted))] leading-relaxed">
                 {f.description}
               </p>
             </div>
           </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
