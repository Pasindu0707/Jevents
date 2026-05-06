import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { ensureGsapPlugins } from '../../lib/gsap'

type Props = {
  onPrimaryCtaClickHref?: string
  onSecondaryCtaClickHref?: string
}

export function Hero({
  onPrimaryCtaClickHref = '#contact',
  onSecondaryCtaClickHref = '#services',
}: Props) {
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLElement | null>(null)
  const bgRef = useRef<HTMLDivElement | null>(null)
  const shapesRef = useRef<HTMLDivElement | null>(null)
  const veilRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const cueRef = useRef<HTMLDivElement | null>(null)
  const [videoUnavailable, setVideoUnavailable] = useState(false)

  useGSAP(
    () => {
      if (reduced) return
      ensureGsapPlugins()
      if (!bgRef.current || !shapesRef.current) return
      if (window.matchMedia && !window.matchMedia('(min-width: 768px)').matches) return
      if (!rootRef.current) return

      // Cinematic scroll feel: subtle scale + veil shift + drift.
      gsap.set(bgRef.current, { transformOrigin: '50% 40%' })
      gsap.set(shapesRef.current, { transformOrigin: '50% 50%' })

      gsap.to(bgRef.current, {
        scale: 1.06,
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })

      if (veilRef.current) {
        gsap.fromTo(
          veilRef.current,
          { opacity: 0.92 },
          {
            opacity: 0.72,
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
            },
          },
        )
      }

      gsap.to(shapesRef.current, {
        yPercent: -10,
        rotation: -2,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.9,
        },
      })

      if (contentRef.current) {
        gsap.to(contentRef.current, {
          yPercent: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
      }

      if (cueRef.current) {
        gsap.to(cueRef.current, {
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top+=40',
            end: 'top top+=220',
            scrub: 0.8,
          },
        })
      }

      // (Replaced with the cinematic parallax sequence above.)
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative min-h-dvh w-full overflow-hidden"
      aria-label="Hero"
    >
      {/* Background media */}
      <div ref={bgRef} className="absolute inset-0">
        {!videoUnavailable ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Background video placeholder"
            onError={() => setVideoUnavailable(true)}
          >
            <source src="/videos/video.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="grid h-full w-full place-items-center bg-black">
            <div className="text-xs font-semibold tracking-[0.26em] text-white/70 uppercase">
              video.mp4
            </div>
          </div>
        )}

        {/* Soft gradient veil */}
        <div
          ref={veilRef}
          className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(246,230,197,0.55),transparent_52%),radial-gradient(1000px_circle_at_70%_40%,rgba(98,121,83,0.45),transparent_58%),linear-gradient(to_bottom,rgba(0,0,0,0.42),rgba(0,0,0,0.55))]"
        />
      </div>

      {/* Floating botanical shapes (CSS-only) */}
      <div ref={shapesRef} className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-20 h-72 w-72 rotate-12 rounded-[48%_52%_42%_58%/56%_44%_56%_44%] border border-white/10 bg-[rgba(246,230,197,0.12)] blur-[0.2px]" />
        <div className="absolute right-[-64px] top-28 h-80 w-80 -rotate-6 rounded-[60%_40%_62%_38%/42%_60%_40%_58%] border border-white/10 bg-[rgba(232,153,67,0.12)] blur-[0.2px]" />
        <div className="absolute left-24 top-[52%] h-64 w-64 rotate-22 rounded-[52%_48%_64%_36%/36%_56%_44%_64%] border border-white/10 bg-[rgba(98,121,83,0.14)] blur-[0.2px]" />
        <div className="absolute bottom-16 right-20 h-56 w-56 rotate-[-18deg] rounded-[44%_56%_36%_64%/60%_40%_58%_42%] border border-white/10 bg-[rgba(246,230,197,0.10)] blur-[0.2px]" />
        <div className="absolute inset-0 opacity-[0.22] [background:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_42%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.14),transparent_46%)]" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col justify-center px-5 pb-24 pt-28 md:px-8 md:pb-28"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-xs font-semibold tracking-[0.28em] text-white/70 uppercase"
        >
          Event design • planning • production
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.03em] text-white md:text-7xl"
        >
          Crafting Unforgettable Moments
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg"
        >
          From weddings and birthdays to pageants, shows, corporate nights, and private
          celebrations — we design, plan, and manage every detail.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href={onPrimaryCtaClickHref}
            className={[
              'inline-flex items-center justify-center rounded-full px-7 py-3 text-xs font-semibold',
              'tracking-[0.22em] uppercase',
              'bg-[rgb(var(--accent))] text-[rgb(var(--accent-fg))]',
              'shadow-(--shadow-elev) hover:opacity-95',
              'focus-visible:outline-none',
            ].join(' ')}
          >
            Start Planning
          </a>
          <a
            href={onSecondaryCtaClickHref}
            className={[
              'inline-flex items-center justify-center rounded-full px-7 py-3 text-xs font-semibold',
              'tracking-[0.22em] uppercase',
              'border border-white/20 bg-white/10 text-white',
              'backdrop-blur-md',
              'shadow-(--shadow-soft) hover:bg-white/14 hover:shadow-(--shadow-elev)',
              'focus-visible:outline-none',
            ].join(' ')}
          >
            View Services
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div
        ref={cueRef}
        className="pointer-events-none absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3 text-white/70">
          <div className="text-[10px] font-semibold tracking-[0.28em] uppercase">
            Scroll
          </div>
          <div className="relative h-10 w-px overflow-hidden bg-white/20">
            <div className="absolute left-0 top-0 h-3 w-px bg-white/70 animate-[heroScroll_1.6s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  )
}

