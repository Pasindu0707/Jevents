import type { GallerySectionData } from '../../types'
import SectionWrapper from './SectionWrapper'
import './sections.css'

export default function GallerySection({ heading, images, style }: GallerySectionData) {
  return (
    <SectionWrapper className="section gallery" id="gallery" style={style} revealStagger={0.08}>
      <div className="section__inner">
        <div className="text-center">
          <p className="eyebrow reveal">Moments</p>
          <h2 className="section-title reveal">{heading ?? 'Gallery'}</h2>
          <div className="divider reveal" />
        </div>

        <div className="gallery__grid">
          {images.map((src, i) => (
            <figure
              className="gallery__item reveal"
              key={i}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
