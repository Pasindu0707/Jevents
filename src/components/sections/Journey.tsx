import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useMemo, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { ensureGsapPlugins } from '../../lib/gsap'

function VisualPlaceholder() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-black shadow-(--shadow-elev) ring-1 ring-[rgb(var(--border))]">
      <div className="absolute inset-0 opacity-[0.06] [background:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.2),transparent_50%)]" />
      <div className="absolute left-5 top-5 text-[10px] font-semibold tracking-[0.26em] text-white/70 uppercase">
        photo.png
      </div>
      <div className="aspect-4/5 w-full" />
    </div>
  )
}

export function Journey() {
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLElement | null>(null)
  const visualWrapRef = useRef<HTMLDivElement | null>(null)
  const stepsWrapRef = useRef<HTMLDivElement | null>(null)
  const progressFillRef = useRef<HTMLDivElement | null>(null)

  const steps = useMemo(
    () => [
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
    ],
    [],
  )

  useGSAP(
    () => {
      if (reduced) return
      ensureGsapPlugins()
      if (!rootRef.current || !visualWrapRef.current || !stepsWrapRef.current) return
      const root = rootRef.current
      const visual = visualWrapRef.current
      const stepsWrap = stepsWrapRef.current
      const fill = progressFillRef.current

      // Desktop only. Mobile remains a normal vertical timeline.
      if (window.matchMedia && !window.matchMedia('(min-width: 768px)').matches) return

      const stepEls = Array.from(stepsWrap.querySelectorAll<HTMLElement>('[data-step]'))
      if (!stepEls.length) return

      const ctx = gsap.context(() => {
        const setActive = (idx: number) => {
          stepEls.forEach((el, i) => {
            const active = i === idx
            el.dataset.active = active ? 'true' : 'false'
            el.setAttribute('aria-current', active ? 'step' : 'false')
          })
        }

        // Initial state
        setActive(0)
        if (fill) fill.style.transform = 'scaleY(0)'

        gsap.to(visual, {
          scrollTrigger: {
            trigger: root,
            start: 'top top+=96',
            end: 'bottom bottom-=120',
            pin: visual,
            pinSpacing: false,
          },
        })

        gsap.to({}, {
          scrollTrigger: {
            trigger: root,
            start: 'top top+=96',
            end: 'bottom bottom-=120',
            scrub: 0.8,
            onUpdate: (self) => {
              const idx = Math.min(
                stepEls.length - 1,
                Math.max(0, Math.round(self.progress * (stepEls.length - 1))),
              )
              setActive(idx)
              if (fill) fill.style.transform = `scaleY(${self.progress})`
            },
          },
        })
      }, root)

      return () => ctx.revert()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <section id="journey" ref={rootRef} className="mt-10 scroll-mt-28 md:mt-12">
      <div
        data-reveal="fade-up"
        className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-8 shadow-(--shadow-soft) md:p-10"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-[rgb(var(--muted-fg))] uppercase">
              Journey
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.01em] md:text-4xl">
              Your Event Journey
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-[rgb(var(--muted-fg))] md:text-base">
            A step-based planning flow that stays calm, clear, and beautifully paced—from first ideas to the final toast.
          </p>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-12">
          {/* Left: sticky visual (desktop pinned via GSAP) */}
          <div className="md:col-span-5">
            <div ref={visualWrapRef} className="md:pt-2">
              <VisualPlaceholder />
              <div className="mt-6 hidden rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-5 shadow-(--shadow-soft) md:block">
                <div className="text-[10px] font-semibold tracking-[0.26em] text-[rgb(var(--muted-fg))] uppercase">
                  Progress
                </div>
                <div className="mt-4 flex items-start gap-4">
                  <div className="relative h-40 w-px overflow-hidden bg-[rgb(var(--border))]">
                    <div
                      ref={progressFillRef}
                      className="absolute inset-x-0 top-0 origin-top bg-[rgb(var(--terracotta))]"
                      style={{ height: '100%', transform: 'scaleY(0)' }}
                    />
                  </div>
                  <ol className="grid gap-3">
                    {steps.map((s) => (
                      <li
                        key={s.k}
                        className="text-xs font-semibold tracking-[0.22em] text-[rgb(var(--muted-fg))] uppercase"
                      >
                        {s.k}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Right: steps (desktop scrub changes active; mobile = timeline) */}
          <div
            ref={stepsWrapRef}
            className="md:col-span-7"
            aria-label="Journey steps"
          >
            <ol className="grid gap-4">
              {steps.map((s) => (
                <li key={s.k}>
                  <article
                    data-step
                    data-reveal="fade-up"
                    className={[
                      'rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-6 shadow-(--shadow-soft)',
                      'transition-[transform,box-shadow,opacity] duration-500 ease-out',
                      'data-[active=true]:shadow-(--shadow-elev) data-[active=true]:opacity-100',
                      'data-[active=false]:opacity-70',
                    ].join(' ')}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="text-xs font-semibold tracking-[0.26em] text-[rgb(var(--muted-fg))] uppercase">
                        {s.k}
                      </div>
                      <div className="h-px flex-1 bg-[rgb(var(--border))]" />
                      <div className="h-2 w-2 rounded-full bg-[rgb(var(--terracotta))]" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em]">
                      {s.t}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--muted-fg))]">
                      {s.d}
                    </p>
                  </article>
                </li>
              ))}
            </ol>

            <p className="mt-6 text-xs leading-relaxed text-[rgb(var(--muted-fg))] md:hidden">
              Tip: On mobile, steps display as a simple timeline to keep the experience fast and accessible.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

