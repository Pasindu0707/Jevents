import type { EventsSectionData } from '../../types'
import SectionWrapper from './SectionWrapper'
import './sections.css'

export default function EventsSection({ heading, events, style }: EventsSectionData) {
  return (
    <SectionWrapper className="section events" id="events" style={style}>
      <div className="section__inner">
        <div className="text-center">
          <p className="eyebrow reveal">Join Us</p>
          <h2 className="section-title reveal">{heading ?? 'The Celebrations'}</h2>
          <div className="divider reveal" />
        </div>

        <div className="events__grid">
          {events.map((ev, i) => (
            <article className="events__card reveal" key={i}>
              {ev.photo && (
                <div
                  className="events__photo"
                  style={{ backgroundImage: `url(${ev.photo})` }}
                />
              )}
              <div className="events__body">
                {ev.date && <span className="events__date">{ev.date}</span>}
                <span className="events__time">{ev.time}</span>
                <h3 className="events__title">{ev.name ?? ev.title}</h3>
                <p className="events__venue">{ev.venue}</p>
                {ev.address && <p className="events__address">{ev.address}</p>}
                {ev.mapUrl && (
                  <a
                    className="events__map"
                    href={ev.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Map
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
