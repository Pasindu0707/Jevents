import { Fragment } from 'react'
import type { FooterSectionData } from '../../types'
import SectionWrapper from './SectionWrapper'
import './sections.css'

/**
 * A contact often carries two numbers as one string ("077 … / 076 …"). Split
 * them so each becomes its own tel: link — a combined href can't be dialled —
 * and so a narrow screen breaks between the numbers instead of mid-number.
 */
function splitPhones(phone: string): string[] {
  return phone
    .split('/')
    .map((p) => p.trim())
    .filter(Boolean)
}

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
                  <span className="footer__contact-phones">
                    {splitPhones(c.phone).map((num, j, arr) => (
                      <Fragment key={j}>
                        <a
                          className="footer__contact-phone"
                          href={`tel:${num.replace(/[^+\d]/g, '')}`}
                        >
                          {num}
                        </a>
                        {j < arr.length - 1 && (
                          <span className="footer__contact-sep" aria-hidden>
                            /
                          </span>
                        )}
                      </Fragment>
                    ))}
                  </span>
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
