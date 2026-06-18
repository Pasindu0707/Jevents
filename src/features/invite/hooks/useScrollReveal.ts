import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Scroll-reveal for a section. Every element inside the returned ref's subtree
 * carrying the `.reveal` class fades + slides into view when the section
 * enters the viewport. Returns a ref to attach to the section root.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options?: { stagger?: number; y?: number },
) {
  const scope = useRef<T>(null)
  const { stagger = 0.12, y = 40 } = options ?? {}

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>('.reveal')
      if (!targets.length) return

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
    { scope },
  )

  return scope
}
