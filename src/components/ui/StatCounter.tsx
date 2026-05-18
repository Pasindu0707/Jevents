import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type Props = {
  value: number
  suffix?: string
  label: string
}

export function StatCounter({ value, suffix = '', label }: Props) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 70, damping: 22 })
  const displayRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!inView) return
    motionVal.set(reduced ? value : 0)
    if (!reduced) {
      const t = window.setTimeout(() => motionVal.set(value), 80)
      return () => window.clearTimeout(t)
    }
  }, [inView, motionVal, reduced, value])

  useEffect(() => {
    const unsub = spring.on('change', (v) => {
      if (displayRef.current) {
        displayRef.current.textContent = `${Math.round(v)}${suffix}`
      }
    })
    return unsub
  }, [spring, suffix])

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl font-semibold tracking-tight text-[rgb(var(--fg))] md:text-4xl">
        <span ref={displayRef}>{reduced ? `${value}${suffix}` : `0${suffix}`}</span>
      </div>
      <p className="mt-2 text-[length:var(--text-small)] text-[rgb(var(--muted-fg))]">{label}</p>
    </div>
  )
}
