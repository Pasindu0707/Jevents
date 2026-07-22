import type { CoupleSectionData } from '../../types'
import SectionWrapper from './SectionWrapper'
import './sections.css'

export default function CoupleSection({
  bride,
  groom,
  brideLabel,
  groomLabel,
  brideBio,
  groomBio,
  brideImage,
  groomImage,
  verse,
  verseRef,
  style,
}: CoupleSectionData) {
  return (
    <SectionWrapper className="section couple" id="couple" style={style}>
      <div className="section__inner text-center">
        <p className="eyebrow reveal">The Happy Couple</p>
        <h2 className="section-title reveal">The Bride &amp; Groom</h2>
        <div className="divider reveal" />

        <div className="couple__grid">
          <article className="couple__card reveal">
            <div
              className="couple__photo"
              style={brideImage ? { backgroundImage: `url(${brideImage})` } : undefined}
            >
              {!brideImage && <span className="couple__initial">{bride.charAt(0)}</span>}
            </div>
            <h3 className="couple__name">{bride}</h3>
            <p className="couple__role">{brideLabel ?? 'The Bride'}</p>
            {brideBio && <p className="couple__bio">{brideBio}</p>}
          </article>

          <div className="couple__amp reveal">&amp;</div>

          <article className="couple__card reveal">
            <div
              className="couple__photo"
              style={groomImage ? { backgroundImage: `url(${groomImage})` } : undefined}
            >
              {!groomImage && <span className="couple__initial">{groom.charAt(0)}</span>}
            </div>
            <h3 className="couple__name">{groom}</h3>
            <p className="couple__role">{groomLabel ?? 'The Groom'}</p>
            {groomBio && <p className="couple__bio">{groomBio}</p>}
          </article>
        </div>

        {verse && (
          <blockquote className="couple__verse reveal">
            <p>“{verse}”</p>
            {verseRef && <cite>— {verseRef}</cite>}
          </blockquote>
        )}
      </div>
    </SectionWrapper>
  )
}
