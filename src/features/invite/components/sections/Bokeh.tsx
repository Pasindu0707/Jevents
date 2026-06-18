import { useMemo } from 'react'
import './decor.css'

/** Subtle floating bokeh particles. Reused by the entrance and any section. */
export default function Bokeh({ count = 30 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: Math.max(0, count) }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        bottom: -10 - Math.random() * 15,
        size: 3 + Math.random() * 12,
        delay: Math.random() * 10,
        duration: 9 + Math.random() * 13,
        opacity: 0.06 + Math.random() * 0.3,
        drift: (Math.random() * 2 - 1) * 30,
      })),
    [count],
  )

  return (
    <div className="bokeh" aria-hidden="true">
      {dots.map((d) => (
        <span
          key={d.id}
          className="bokeh__dot"
          style={{
            left: `${d.left}%`,
            bottom: `${d.bottom}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            opacity: d.opacity,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
            ['--drift' as string]: `${d.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
