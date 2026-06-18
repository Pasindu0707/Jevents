import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import type { ParticleSpeed, ParticleStyle } from '../../types'
import './section-particles.css'

interface Props {
  style?: ParticleStyle
  color?: string
  count?: number
  speed?: ParticleSpeed
}

const SPEED_BASE: Record<ParticleSpeed, number> = {
  slow: 18,
  medium: 12,
  fast: 7,
}

/**
 * TASK 2 — Reusable particle layer.
 *
 * A lightweight DOM/CSS particle field (no canvas needed) supporting six
 * looks: bokeh dots, floating petals, sparkles, snow, gold dust, fireflies.
 * The visual differences live in section-particles.css, keyed off the
 * `particles--<style>` class; this component only generates randomised
 * per-particle geometry and timing.
 */
export default function SectionParticles({
  style = 'bokeh',
  color = '#e7c987',
  count = 60,
  speed = 'medium',
}: Props) {
  const safeCount = Math.max(0, Math.min(200, Math.round(count)))
  const base = SPEED_BASE[speed] ?? SPEED_BASE.medium

  const particles = useMemo(
    () =>
      Array.from({ length: safeCount }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 3 + Math.random() * 10,
        delay: Math.random() * base,
        duration: base * (0.7 + Math.random() * 0.8),
        drift: (Math.random() * 2 - 1) * 40,
        rotate: Math.random() * 360,
        opacity: 0.25 + Math.random() * 0.65,
      })),
    [safeCount, base],
  )

  if (safeCount === 0) return null

  return (
    <div
      className={`particles particles--${style}`}
      aria-hidden="true"
      style={{ ['--particle-color' as string]: color } as CSSProperties}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="particles__dot"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              ['--drift' as string]: `${p.drift}px`,
              ['--rot' as string]: `${p.rotate}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
