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
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[rgb(var(--final-300)/0.12)] blur-2xl transition-opacity group-hover:opacity-100" />
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgb(var(--secondary-300)/0.15)] text-[rgb(var(--final-200))]">
                    <Icon size={20} aria-hidden />
                  </div>
                  <p className="mt-4 text-[10px] font-semibold tracking-[0.26em] text-[rgb(var(--muted-fg))] uppercase">
                    Step {idx + 1}
                  </p>
                  <h3 className="mt-2 font-display text-[length:var(--text-h3)]">{flow.title}</h3>
                  <p className="mt-2 text-[length:var(--text-small)] leading-relaxed text-[rgb(var(--muted-fg))]">
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
