import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const FAQS = [
  {
    q: 'Do you only plan weddings?',
    a: 'Weddings are our specialty, but we also manage corporate events, birthdays, pageants, live shows, and private celebrations with the same editorial polish.',
  },
  {
    q: 'Can I track guests and RSVPs digitally?',
    a: 'Our dedicated team personally calls your guests to confirm attendance, manage dietary needs, and handle seating',
  },
  {
    q: 'How far in advance should we book?',
    a: 'Generally, we recommend 6–8 months for weddings and 6–10 weeks for corporate and social events. But beyond that, we can also handle tighter timelines and last-minute events so don\'t worry if you\'re on a short schedule!'
  },
  {
    q: 'What is included in your packages?',
    a: 'Packages range from planning roadmaps to full design and on-day coordination. Every quote is tailored after a discovery call.',
  },
  {
    q: 'What areas or regions in Sri Lanka do you cover?',
    a: 'We coordinate events across Sri Lanka and can align remote vendors and travel logistics as needed.',
  },
] as const

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <div
      className={[
        'overflow-hidden rounded-2xl border bg-[rgb(var(--bg))] transition-[border-color,box-shadow] duration-300',
        open
          ? 'border-[rgb(var(--final-300)/0.45)] shadow-(--shadow-soft)'
          : 'border-[rgb(var(--border))] hover:border-[rgb(var(--final-300)/0.3)]',
      ].join(' ')}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-medium">{q}</span>
        <ChevronDown
          size={18}
          className={[
            'shrink-0 text-[rgb(var(--final-200))] transition-transform duration-300',
            open ? 'rotate-180' : '',
          ].join(' ')}
          aria-hidden
        />
      </button>
      <div
        id={panelId}
        role="region"
        hidden={!open}
        className="border-t border-[rgb(var(--border))] px-5 pb-5 pt-4 text-small leading-relaxed text-[rgb(var(--muted-fg))]"
      >
        {a}
      </div>
    </div>
  )
}

export function FAQ() {
  return (
    <section id="faq" aria-label="Frequently asked questions" className="section-shell scroll-mt-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div data-reveal="fade-up" className="section-inner">
        <div className="flex flex-col gap-4 [&>*]:!flex-col [&>*]:!items-start">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions hosts ask us"
            description="Clear answers before you book so you can plan with confidence."
          />
          </div>
          <div className="mt-8 grid gap-3">
            {FAQS.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
