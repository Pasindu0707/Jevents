import { Calendar, CreditCard, QrCode, Ticket } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'

const FLOWS = [
  {
    icon: Calendar,
    title: 'Create your event',
    desc: 'Wedding timelines, corporate agendas, or private celebrations—built in minutes with smart templates.',
  },
  {
    icon: Ticket,
    title: 'RSVP & guest lists',
    desc: 'Track confirmations, dietary notes, seating, and plus-ones with real-time attendee management.',
  },
  {
    icon: QrCode,
    title: 'QR check-in',
    desc: 'Digital tickets guests can scan at the door—fast entry for ceremonies, receptions, and galas.',
  },
  {
    icon: CreditCard,
    title: 'Payments & packages',
    desc: 'Transparent quotes, deposits, and milestone billing—so budgets stay clear from yes to I do.',
  },
] as const

export function PlatformFlow() {
  return (
    <section id="platform" aria-label="Platform workflow" className="section-shell scroll-mt-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div data-reveal="fade-up" className="section-inner">
          <SectionHeader
            eyebrow="How it works"
            title="From first inquiry to final toast"
            description="A calm, wedding-grade workflow that scales to corporate galas, birthdays, and live productions."
          />

          <div
            data-reveal-stagger
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {FLOWS.map((flow, idx) => {
              const Icon = flow.icon
              return (
                <article
                  key={flow.title}
                  data-reveal-item
                  data-reveal="fade-up"
                  className="glass-card glass-card-hover group relative overflow-hidden p-6"
                >
                  <div className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[rgb(var(--final-300)/0.1)] blur-2xl transition-opacity duration-300 group-hover:opacity-150" aria-hidden />
                  <div
                    className="pointer-events-none absolute bottom-3 right-4 select-none font-display text-7xl font-bold leading-none text-[rgb(var(--final-300)/0.06)]"
                    aria-hidden
                  >
                    {idx + 1}
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgb(var(--final-300)/0.12)] text-[rgb(var(--final-200))] ring-1 ring-[rgb(var(--final-300)/0.2)]">
                    <Icon size={20} aria-hidden />
                  </div>
                  <p className="mt-4 text-[10px] font-semibold tracking-[0.26em] text-[rgb(var(--final-200))] uppercase">
                    Step {idx + 1}
                  </p>
                  <h3 className="mt-2 font-display text-h3">{flow.title}</h3>
                  <p className="mt-2 text-small leading-relaxed text-[rgb(var(--muted-fg))]">
                    {flow.desc}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
