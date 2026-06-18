import type { FooterSectionData } from '../../types'
import SectionWrapper from './SectionWrapper'
import './sections.css'

export default function FooterSection({
  bride,
  groom,
  hashtag,
  date,
  contacts,
  socials,
  style,
}: FooterSectionData) {
  return (
    <SectionWrapper as="footer" className="section footer" id="footer" style={style}>
      <div className="section__inner text-center">
        <div className="footer__monogram reveal">
          {bride.charAt(0)} &amp; {groom.charAt(0)}
        </div>
        <h2 className="footer__couple reveal">
          {bride} &amp; {groom}
        </h2>
        {date && <p className="footer__date reveal">{date}</p>}
        {hashtag && <p className="footer__hashtag reveal">{hashtag}</p>}

        {contacts && contacts.length > 0 && (
          <div className="footer__contacts reveal">
            {contacts.map((c, i) => (
              <div className="footer__contact" key={i}>
                <span className="footer__contact-name">{c.name}</span>
                {c.phone && (
                  <a className="footer__contact-phone" href={`tel:${c.phone}`}>
                    {c.phone}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {socials && socials.length > 0 && (
          <div className="footer__socials reveal">
            {socials.map((s, i) => (
              <a
                className="footer__social"
                href={s.url}
                target="_blank"
                rel="noreferrer"
                key={i}
              >
                {s.label}
              </a>
            ))}
          </div>
        )}

        <div className="divider reveal" />
        <p className="footer__credit reveal">Made with love · Jevents</p>
      </div>
    </SectionWrapper>
  )
}
