import type { TimelineSectionData } from '../../types'
import SectionWrapper from './SectionWrapper'
import './sections.css'

export default function TimelineSection({ heading, items, style }: TimelineSectionData) {
  return (
    <SectionWrapper className="section timeline" id="timeline" style={style}>
      <div className="section__inner">
        <div className="text-center">
          <p className="eyebrow reveal">The Day</p>
          <h2 className="section-title reveal">{heading ?? 'Order of the Day'}</h2>
          <div className="divider reveal" />
        </div>

        <ol className="timeline__list">
          {items.map((item, i) => (
            <li className="timeline__item reveal" key={i}>
              <div className="timeline__dot" />
              <span className="timeline__time">{item.time}</span>
              <span className="timeline__label">{item.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </SectionWrapper>
  )
}
