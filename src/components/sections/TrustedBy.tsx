import { StatCounter } from '../ui/StatCounter'

const PARTNERS = [
  'Malith Miranda Studio',
  'Ceylon Venues',
  'Bloom & Vine',
  'Luxe Catering Co.',
  'Island Sound',
  'Pearl Events',
] as const

export function TrustedBy() {
  return (
    <section
      id="trusted"
      aria-label="Trust and social proof"
      data-reveal="fade-up"
      className="section-shell -mt-6 scroll-mt-28 md:-mt-10"
    >
      <div className="glass-card mx-auto max-w-6xl px-5 md:px-8">
        <div className="section-inner border-0 bg-transparent p-6 shadow-none md:p-8">
          <p className="text-center text-[length:var(--text-small)] font-medium text-[rgb(var(--muted-fg))]">
            Trusted by wedding planners, venues, and organizers across Sri Lanka
          </p>

          <div
            data-reveal-stagger
            className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4 md:gap-8"
          >
            <div data-reveal-item>
              <StatCounter value={240} suffix="+" label="Events managed" />
            </div>
            <div data-reveal-item>
              <StatCounter value={98} suffix="%" label="Client satisfaction" />
            </div>
            <div data-reveal-item>
              <StatCounter value={1200} suffix="+" label="Guests coordinated" />
            </div>
            <div data-reveal-item>
              <StatCounter value={15} suffix="+" label="Vendor partners" />
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-[rgb(var(--border))] pt-8">
            {PARTNERS.map((name) => (
              <span
                key={name}
                className="text-[10px] font-semibold tracking-[0.2em] text-[rgb(var(--muted-fg))] uppercase opacity-80"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
