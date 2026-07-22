import { createElement, type ReactNode } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import type { SectionStyle } from '../../types'
import { buildGradient, sectionStyleVars } from './sectionStyle'
import SectionParticles from './SectionParticles'
import './section-wrapper.css'

interface Props {
  as?: 'section' | 'footer'
  className: string
  id: string
  style?: SectionStyle
  /** Tune the scroll-reveal stagger (gallery uses a tighter value). */
  revealStagger?: number
  children: ReactNode
}

/**
 * TASK 2 — Reusable section shell.
 *
 * Wraps every content section and centralises:
 *   • scroll-reveal ref
 *   • background rendering (color / image / video + overlay)
 *   • the particle layer
 *   • per-section typography & colour CSS variables
 *
 * The logic is written once here; each section just supplies its inner markup.
 */
export default function SectionWrapper({
  as = 'section',
  className,
  id,
  style,
  revealStagger,
  children,
}: Props) {
  const scope = useScrollReveal<HTMLElement>(
    revealStagger !== undefined ? { stagger: revealStagger } : undefined,
  )

  const bgType = style?.backgroundType
  const cssVars = sectionStyleVars(style)

  // A solid colour or gradient is painted directly onto the element; image and
  // video are rendered as absolutely-positioned layers behind the content.
  const gradient = bgType === 'gradient' ? buildGradient(style) : undefined
  const paint =
    gradient ?? (bgType === 'color' && style?.backgroundColor ? style.backgroundColor : undefined)
  const inlineStyle = paint ? { ...cssVars, background: paint } : cssVars

  const showImage = bgType === 'image' && !!style?.backgroundImage
  const showVideo = bgType === 'video' && !!style?.backgroundVideo
  const overlayOpacity = style?.overlayOpacity ?? 0
  const showOverlay = (showImage || showVideo) && overlayOpacity > 0

  return createElement(
    as,
    { ref: scope, className: `${className} section-style`, id, style: inlineStyle },
    showImage && (
      <div
        className="section-decor__bg"
        style={{ backgroundImage: `url(${style!.backgroundImage})` }}
      />
    ),
    showVideo && (
      <video
        className="section-decor__bg"
        src={style!.backgroundVideo}
        autoPlay
        muted
        loop
        playsInline
      />
    ),
    showOverlay && (
      <div
        className="section-decor__overlay"
        style={{ background: style?.overlayColor || '#000000', opacity: overlayOpacity }}
      />
    ),
    style?.particlesEnabled && (
      <SectionParticles
        style={style.particleStyle}
        color={style.particleColor}
        count={style.particleCount}
        speed={style.particleSpeed}
      />
    ),
    children,
  )
}
