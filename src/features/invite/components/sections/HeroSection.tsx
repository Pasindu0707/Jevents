import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import type { HeroSectionData } from '../../types'
import { sectionStyleVars } from './sectionStyle'
import SectionParticles from './SectionParticles'
import './sections.css'

export default function HeroSection({
  bride,
  groom,
  date,
  tagline,
  image,
  verse,
  verseRef,
  style,
}: HeroSectionData) {
  const root = useRef<HTMLElement>(null)

  // Hero plays its own intro timeline on mount (no scroll needed — it's above the fold).
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero__eyebrow', { opacity: 0, y: 20, duration: 1 })
        .from('.hero__name', { opacity: 0, y: 40, duration: 1.1, stagger: 0.18 }, '-=0.5')
        .from('.hero__amp', { opacity: 0, scale: 0.6, duration: 1 }, '-=0.9')
        .from('.hero__date', { opacity: 0, y: 20, duration: 1 }, '-=0.6')
        .from('.hero__tagline', { opacity: 0, y: 20, duration: 1 }, '-=0.7')
    },
    { scope: root },
  )

  // Per-section background overrides (TASK 2). Fall back to the legacy `image`.
  const bgImage = style?.backgroundType === 'image' ? style.backgroundImage : undefined
  const bgVideo = style?.backgroundType === 'video' ? style.backgroundVideo : undefined
  const resolvedImage = bgImage || image
  const overlayColor = style?.overlayColor
  const overlayOpacity = style?.overlayOpacity

  return (
    <section
      ref={root}
      className="hero section-style"
      id="home"
      style={sectionStyleVars(style)}
    >
      {bgVideo ? (
        <video className="hero__bg" src={bgVideo} autoPlay muted loop playsInline />
      ) : (
        <div
          className="hero__bg"
          style={resolvedImage ? { backgroundImage: `url(${resolvedImage})` } : undefined}
        />
      )}
      <div
        className="hero__overlay"
        style={
          overlayColor || overlayOpacity !== undefined
            ? { background: overlayColor || undefined, opacity: overlayOpacity }
            : undefined
        }
      />
      {style?.particlesEnabled && (
        <SectionParticles
          style={style.particleStyle}
          color={style.particleColor}
          count={style.particleCount}
          speed={style.particleSpeed}
        />
      )}
      <div className="hero__content">
        <p className="hero__eyebrow eyebrow">Together with their families</p>
        <h1 className="hero__couple">
          <span className="hero__name">{bride}</span>
          <span className="hero__amp">&amp;</span>
          <span className="hero__name">{groom}</span>
        </h1>
        <div className="divider" />
        <p className="hero__date">{date}</p>
        {tagline && <p className="hero__tagline">{tagline}</p>}
        {verse && (
          <p className="hero__verse">
            “{verse}”{verseRef && <span className="hero__verse-ref"> — {verseRef}</span>}
          </p>
        )}
      </div>
    </section>
  )
}
