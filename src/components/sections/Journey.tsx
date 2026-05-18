import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { STOCK } from '../../lib/media'
import { OptimizedImage } from '../ui/OptimizedImage'
import { SectionHeader } from '../ui/SectionHeader'

const STEPS = [
  {
    k: '01',
    t: 'Discover Your Vision',
    d: 'We listen closely, align on the feeling, and translate it into a clear plan with beautiful constraints.',
  },
  {
    k: '02',
    t: 'Design the Experience',
    d: 'Mood, layout, lighting, florals, music—every choice curated to feel effortless and editorial.',
  },
  {
    k: '03',
    t: 'Coordinate Every Detail',
    d: 'Vendor management, run-of-show, and contingency planning—so every transition feels invisible.',
  },
  {
    k: '04',
    t: 'Celebrate Without Stress',
    d: 'On the day, we run point quietly in the background while you stay present for every moment.',
  },
] as const

function JourneyVisual() {
  return (
    <div className="relative overflow-hidden rounded-3xl shadow-(--shadow-elev) ring-1 ring-[rgb(var(--border))]">
      <OptimizedImage
        src={STOCK.journey}
        alt="Couple walking together at a garden wedding"
        className="aspect-4/5 w-full object-cover"
      />
    </div>
  )
}

type ProgressTrackerProps = {
  steps: typeof STEPS
  activeIndex: number
  onSelect: (index: number) => void
}

function ProgressTracker({ steps, activeIndex, onSelect }: ProgressTrackerProps) {
  const progressPct = steps.length > 1 ? (activeIndex / (steps.length - 1)) * 100 : 0

  return (
    <div
      className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-5 shadow-(--shadow-soft)"
      aria-label="Journey progress"
    >
      <p className="text-[10px] font-semibold tracking-[0.26em] text-[rgb(var(--muted-fg))] uppercase">
        Progress
      </p>

      <div className="mt-4 flex gap-4">
        <div className="relative w-1 shrink-0 self-stretch rounded-full bg-[rgb(var(--border))]">
          <div
            className="absolute inset-x-0 top-0 rounded-full bg-[rgb(var(--accent))] transition-[height] duration-500 ease-out"
            style={{ height: `${Math.max(progressPct, activeIndex === 0 ? 8 : 0)}%` }}
            aria-hidden
          />
        </div>

        <ol className="grid flex-1 gap-3">
          {steps.map((step, index) => {
            const isActive = index === activeIndex
            const isComplete = index < activeIndex

            return (
              <li key={step.k}>
                <button
                  type="button"
                  onClick={() => onSelect(index)}
                  className={[
                    'group flex w-full items-start gap-3 rounded-2xl px-2 py-2 text-left transition-colors',
                    'hover:bg-[rgb(var(--card))]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]',
                    isActive ? 'bg-[rgb(var(--card))]' : '',
                  ].join(' ')}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <span
                    className={[
                      'mt-0.5 shrink-0 text-[10px] font-semibold tracking-[0.22em] uppercase',
                      isActive
                        ? 'text-[rgb(var(--accent))]'
                        : isComplete
                          ? 'text-[rgb(var(--final-200))]'
                          : 'text-[rgb(var(--muted-fg))]',
                    ].join(' ')}
                  >
                    {step.k}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={[
                        'block font-display text-sm leading-snug',
                        isActive ? 'text-[rgb(var(--fg))]' : 'text-[rgb(var(--muted-fg))]',
                      ].join(' ')}
                    >
                      {step.t}
                    </span>
                  </span>
                  <span
                    className={[
                      'mt-1.5 h-2 w-2 shrink-0 rounded-full transition-colors',
                      isActive ? 'bg-[rgb(var(--accent))]' : 'bg-transparent',
                    ].join(' ')}
                    aria-hidden
                  />
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

function useJourneyActiveStep(stepCount: number, rootRef: RefObject<HTMLElement | null>) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    let observer: IntersectionObserver | undefined

    const setup = () => {
      const elements = Array.from(
        root.querySelectorAll<HTMLElement>('[data-step-index]'),
      )
      if (!elements.length) return

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

          if (visible[0]) {
            const idx = Number(visible[0].target.getAttribute('data-step-index'))
            if (!Number.isNaN(idx)) setActiveIndex(idx)
          }
        },
        {
          rootMargin: '-35% 0px -45% 0px',
          threshold: [0, 0.25, 0.5, 0.75, 1],
        },
      )

      for (const el of elements) observer.observe(el)
    }

    const id = requestAnimationFrame(setup)
    return () => {
      cancelAnimationFrame(id)
      observer?.disconnect()
    }
  }, [rootRef, stepCount])

  const scrollToStep = (index: number) => {
    const root = rootRef.current
    if (!root) return
    const el = root.querySelector<HTMLElement>(`[data-step-index="${index}"]`)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setActiveIndex(index)
  }

  return { activeIndex, scrollToStep }
}

export function Journey() {
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLElement | null>(null)
  const steps = useMemo(() => STEPS, [])
  const { activeIndex, scrollToStep } = useJourneyActiveStep(steps.length, rootRef)

  return (
    <section id="journey" ref={rootRef} className="section-shell scroll-mt-28">
      <div data-reveal="fade-up" className="section-inner">
        <SectionHeader
          eyebrow="Journey"
          title="Your Event Journey"
          description="A step-based planning flow that stays calm, clear, and beautifully paced—from first ideas to the final toast."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 lg:space-y-6">
              <JourneyVisual />
              <div className="hidden lg:block">
                <ProgressTracker
                  steps={steps}
                  activeIndex={activeIndex}
                  onSelect={scrollToStep}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7" aria-label="Journey steps">
            <div className="mb-6 lg:hidden">
              <ProgressTracker
                steps={steps}
                activeIndex={activeIndex}
                onSelect={scrollToStep}
              />
            </div>

            <ol className="grid gap-4">
              {steps.map((s, index) => {
                const isActive = index === activeIndex
                return (
                  <li key={s.k}>
                    <article
                      data-step-index={index}
                      data-reveal="fade-up"
                      className={[
                        'rounded-3xl border bg-[rgb(var(--bg))] p-6 shadow-(--shadow-soft)',
                        'transition-[border-color,box-shadow,opacity,transform] duration-500 ease-out',
                        isActive
                          ? 'border-[rgb(var(--accent)/0.45)] shadow-(--shadow-elev) opacity-100'
                          : 'border-[rgb(var(--border))] opacity-75',
                        reduced ? '' : isActive ? 'lg:-translate-y-0.5' : '',
                      ].join(' ')}
                      aria-current={isActive ? 'step' : undefined}
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-xs font-semibold tracking-[0.26em] text-[rgb(var(--muted-fg))] uppercase">
                          {s.k}
                        </span>
                        <span className="h-px flex-1 bg-[rgb(var(--border))]" />
                        <span
                          className={[
                            'h-2 w-2 rounded-full transition-colors',
                            isActive ? 'bg-[rgb(var(--accent))]' : 'bg-[rgb(var(--border))]',
                          ].join(' ')}
                          aria-hidden
                        />
                      </div>
                      <h3 className="mt-4 font-display text-[length:var(--text-h3)]">{s.t}</h3>
                      <p className="mt-2 text-[length:var(--text-small)] leading-relaxed text-[rgb(var(--muted-fg))]">
                        {s.d}
                      </p>
                    </article>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
