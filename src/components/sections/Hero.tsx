import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { PHOTOS } from '../../lib/media'
import { ensureGsapPlugins } from '../../lib/gsap'
import { OptimizedImage } from '../ui/OptimizedImage'

type Props = {
  onPrimaryCtaClickHref?: string
}

export function Hero({
  onPrimaryCtaClickHref = '#contact',
  // onSecondaryCtaClickHref = '#platform',
}: Props) {
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLElement | null>(null)
  const bgRef = useRef<HTMLDivElement | null>(null)
  const veilRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const cueRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      if (reduced) return
      ensureGsapPlugins()
      if (!bgRef.current || !rootRef.current) return
      if (window.matchMedia && !window.matchMedia('(min-width: 768px)').matches) return

      gsap.set(bgRef.current, { transformOrigin: '50% 40%' })
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
          { opacity: 0.88 },
          {
            opacity: 0.7,
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
      <div ref={bgRef} className="absolute inset-0">
        <OptimizedImage
          src={PHOTOS.hero}
          alt="Bride and groom at an elegant outdoor wedding"
          priority
          className="h-full w-full object-cover"
        />
        <div
          ref={veilRef}
          className="absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_15%,rgba(246,230,197,0.45),transparent_50%),radial-gradient(800px_circle_at_75%_35%,rgba(99,121,83,0.4),transparent_55%),linear-gradient(to_bottom,rgba(71,79,68,0.55),rgba(71,79,68,0.78))]"
          aria-hidden
        />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="blob left-[-8%] top-[18%] h-72 w-72 bg-[rgb(var(--main-300)/0.25)]" />
        <div className="blob blob-delay right-[-6%] top-[28%] h-80 w-80 bg-[rgb(var(--final-300)/0.2)]" />
        <div className="blob left-[30%] bottom-[12%] h-64 w-64 bg-[rgb(var(--secondary-300)/0.22)]" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col justify-center px-5 pb-24 pt-28 md:px-8 md:pb-28"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-xs font-semibold tracking-[0.28em] text-[rgb(var(--main-300))] uppercase"
        >
          Weddings · corporate · celebrations
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-6 max-w-4xl font-display text-[length:var(--text-display)] leading-[1.02] text-[rgb(var(--white))]"
        >
          Manage Events Smarter, Faster &amp; Effortlessly
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-6 max-w-2xl text-[length:var(--text-body)] leading-relaxed text-[rgb(var(--main-200))]"
        >
          Create, organize, and track weddings and celebrations with real-time guest
          management, vendor coordination, and analytics without losing the romance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <a href={onPrimaryCtaClickHref} className="btn-primary">
            Get Started
          </a>
          {/* <a
            href={onSecondaryCtaClickHref}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[rgb(var(--main-300)/0.35)] bg-[rgb(var(--white)/0.12)] px-7 py-3 text-xs font-semibold tracking-[0.2em] text-[rgb(var(--white))] uppercase backdrop-blur-md hover:bg-[rgb(var(--white)/0.18)] sm:w-auto"
          >
            View Demo
          </a> */}
        </motion.div>
      </div>

      <div
        ref={cueRef}
        className="pointer-events-none absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3 text-[rgb(var(--main-300)/0.85)]">
          <div className="text-[10px] font-semibold tracking-[0.28em] uppercase">Scroll</div>
          <div className="relative h-10 w-px overflow-hidden bg-[rgb(var(--white)/0.25)]">
            <div className="absolute left-0 top-0 h-3 w-px bg-[rgb(var(--main-300))] animate-[heroScroll_1.6s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  )
}
