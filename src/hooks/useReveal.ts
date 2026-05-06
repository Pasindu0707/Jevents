import { useEffect } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

type Options = {
  rootMargin?: string
  threshold?: number | number[]
  staggerMs?: number
}

function revealNow(el: Element) {
  el.classList.add('is-revealed')
  el.setAttribute('data-reveal-state', 'shown')
}

function prepare(el: Element) {
  el.classList.add('reveal')
  el.setAttribute('data-reveal-state', 'hidden')
}

export function useReveal(options: Options = {}) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const {
      rootMargin = '0px 0px -10% 0px',
      threshold = 0.12,
      staggerMs = 90,
    } = options

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    // Reduced motion: make everything instant.
    if (reduced) {
      document.documentElement.classList.add('reduced-motion')
      for (const el of targets) revealNow(el)
      return
    }
    document.documentElement.classList.remove('reduced-motion')

    for (const el of targets) prepare(el)

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          revealNow(el)

          // Stagger children (cards, list items, etc.)
          if (el.hasAttribute('data-reveal-stagger')) {
            const children = Array.from(
              el.querySelectorAll<HTMLElement>('[data-reveal-item]'),
            )
            children.forEach((child, idx) => {
              child.style.transitionDelay = `${idx * staggerMs}ms`
              // Allow children to have their own reveal variant if set.
              if (!child.hasAttribute('data-reveal')) {
                child.setAttribute('data-reveal', 'fade-up')
              }
              prepare(child)
              // next frame ensures initial styles apply before reveal
              requestAnimationFrame(() => revealNow(child))
            })
          }

          io.unobserve(el)
        }
      },
      { rootMargin, threshold },
    )

    for (const el of targets) io.observe(el)
    return () => io.disconnect()
  }, [options, reduced])
}

