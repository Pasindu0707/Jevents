import type { StorySectionData } from '../../types'
import SectionWrapper from './SectionWrapper'
import './sections.css'

export default function StorySection({ heading, paragraphs, sideImage, items, style }: StorySectionData) {
  // Prefer the new `paragraphs` shape; fall back to legacy `items` ({title,text}).
  const paras = paragraphs?.length
    ? paragraphs
    : (items ?? []).map((it) => (it.title ? `${it.title} — ${it.text}` : it.text))

  return (
    <SectionWrapper className="section story" id="story" style={style}>
      <div className="section__inner">
        <div className="text-center">
          <p className="eyebrow reveal">Our Journey</p>
          <h2 className="section-title reveal">{heading ?? 'Our Story'}</h2>
          <div className="divider reveal" />
        </div>

        <div className={`story__layout ${sideImage ? 'story__layout--split' : ''}`}>
          {sideImage && (
            <div
              className="story__image reveal"
              style={{ backgroundImage: `url(${sideImage})` }}
            />
          )}
          <div className="story__paras">
            {paras.map((text, i) => (
              <p className="story__para reveal" key={i}>
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
