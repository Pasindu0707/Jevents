import { useEffect, useState } from 'react'
import type { CountdownSectionData } from '../../types'
import SectionWrapper from './SectionWrapper'
import './sections.css'

function diff(target: number) {
  const total = Math.max(0, target - Date.now())
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((total / (1000 * 60)) % 60)
  const seconds = Math.floor((total / 1000) % 60)
  return { days, hours, minutes, seconds }
}

export default function CountdownSection({ targetDate, heading, style }: CountdownSectionData) {
  const target = new Date(targetDate).getTime()
  const [time, setTime] = useState(() => diff(target))

  useEffect(() => {
    const t = setInterval(() => setTime(diff(target)), 1000)
    return () => clearInterval(t)
  }, [target])

  const units: { label: string; value: number }[] = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ]

  return (
    <SectionWrapper className="section countdown" id="countdown" style={style}>
      <div className="section__inner text-center">
        <p className="eyebrow reveal">Counting down</p>
        <h2 className="section-title reveal">{heading ?? 'Until We Say "I Do"'}</h2>
        <div className="divider reveal" />
        <div className="countdown__grid">
          {units.map((u) => (
            <div className="countdown__unit reveal" key={u.label}>
              <span className="countdown__value">{String(u.value).padStart(2, '0')}</span>
              <span className="countdown__label">{u.label}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
