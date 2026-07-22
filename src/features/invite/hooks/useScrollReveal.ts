import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useEntranceGate } from '../lib/entranceGate'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Scroll-reveal for a section. Every element inside the returned ref's subtree
 * carrying the `.reveal` class fades + slides into view when the section
 * enters the viewport. Returns a ref to attach to the section root.
 *
 * While the entrance gate is closed the elements are only *parked* hidden — no
 * trigger is created. Building the trigger on gate-open means sections already
 * in view play right then, so the content animates in behind the lifting
 * entrance instead of being revealed underneath it.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options?: { stagger?: number; y?: number },
) {
  const scope = useRef<T>(null)
  const { stagger = 0.12, y = 40 } = options ?? {}
  const { open } = useEntranceGate()

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>('.reveal')
      if (!targets.length) return

      // Gate still closed: hold everything hidden, don't arm the trigger yet.
      // (useGSAP does not revert between dependency runs, so this inline
      // opacity survives until the fromTo below takes over — no flash.)
      if (!open) {
        gsap.set(targets, { opacity: 0, y })
        return
      }

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger,
          scrollTrigger: {
            trigger: scope.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        },
      )
    },
    { scope, dependencies: [open] },
  )

  return scope
}
