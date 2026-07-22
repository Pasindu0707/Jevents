import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import type { EntranceSectionData } from '../../types'
import { useEntranceGate } from '../../lib/entranceGate'
import './entrance.css'

interface Props extends EntranceSectionData {
  /** When rendered inside the Puck admin preview, behave as an inline block
   *  (no fixed overlay, no scroll-lock, button does nothing). */
  editorPreview?: boolean
}

/** Convert a #rrggbb / #rgb hex + alpha into an rgba() string. */
function hexToRgba(hex: string, alpha: number): string {
  let h = (hex || '#ffffff').replace('#', '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  const int = parseInt(h, 16)
  if (Number.isNaN(int) || h.length !== 6) return hex
  const r = (int >> 16) & 255
  const g = (int >> 8) & 255
  const b = int & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const DEFAULTS = {
  invitedText: 'You are invited to the Wedding of',
  brideFont: "'Great Vibes', cursive",
  groomFont: "'Great Vibes', cursive",
  brideFontSize: 84,
  groomFontSize: 84,
  brideColor: '#2c2418',
  groomColor: '#2c2418',
  overlayOpacity: 0.35,
  cardColor: '#ffffff',
  cardOpacity: 0.9,
  buttonText: 'VIEW INVITATION',
  buttonTextColor: '#1c1916',
  buttonBgColor: '#c9a45c',
}

export default function EntranceSection(props: Props) {
  const {
    bride,
    groom,
    invitedText = DEFAULTS.invitedText,
    brideFont = DEFAULTS.brideFont,
    groomFont = DEFAULTS.groomFont,
    brideFontSize = DEFAULTS.brideFontSize,
    groomFontSize = DEFAULTS.groomFontSize,
    brideColor = DEFAULTS.brideColor,
    groomColor = DEFAULTS.groomColor,
    topFloral,
    bottomFloral,
    topFloralRotation = 0,
    bottomFloralRotation = 180,
    backgroundType = 'image',
    backgroundImage,
    backgroundVideo,
    overlayOpacity = DEFAULTS.overlayOpacity,
    cardColor = DEFAULTS.cardColor,
    cardOpacity = DEFAULTS.cardOpacity,
    buttonText = DEFAULTS.buttonText,
    buttonTextColor = DEFAULTS.buttonTextColor,
    buttonBgColor = DEFAULTS.buttonBgColor,
    particles = true,
    editorPreview = false,
  } = props

  const root = useRef<HTMLDivElement>(null)
  const [dismissed, setDismissed] = useState(false)
  const { openGate } = useEntranceGate()

  // Apply translucency through the background alpha so card text stays crisp.
  const cardBg = hexToRgba(cardColor, cardOpacity)

  // Lock body scroll while the entrance gate is showing on the live site.
  useEffect(() => {
    if (editorPreview || dismissed) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [editorPreview, dismissed])

  // Gentle fade-in on load.
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.entrance__card', { opacity: 0, scale: 0.92, y: 30, duration: 1.3 })
        .from('.entrance__floral--top', { opacity: 0, y: -16, duration: 1 }, '-=0.8')
        .from('.entrance__floral--bottom', { opacity: 0, y: 16, duration: 1 }, '-=0.9')
        .from(
          ['.entrance__invited', '.entrance__bride', '.entrance__amp', '.entrance__groom'],
          { opacity: 0, y: 18, duration: 0.9, stagger: 0.18 },
          '-=0.7',
        )
        .from('.entrance__btn', { opacity: 0, y: 16, duration: 0.8 }, '-=0.5')
    },
    { scope: root },
  )

  const dots = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        bottom: -10 - Math.random() * 20,
        size: 3 + Math.random() * 11,
        delay: Math.random() * 9,
        duration: 9 + Math.random() * 12,
        opacity: 0.08 + Math.random() * 0.32,
      })),
    [],
  )

  function handleEnter() {
    if (editorPreview) return
    // Kick off the site music on this first user interaction.
    window.dispatchEvent(new CustomEvent('invitely:play'))
    document.body.style.overflow = ''

    const tl = gsap.timeline()
    // Lift the card away rather than a flat fade — it reads as a veil rising.
    tl.to(root.current, {
      opacity: 0,
      duration: 0.9,
      ease: 'power2.inOut',
      onComplete: () => {
        setDismissed(true)
        const target = document.getElementById('home')
        if (target) target.scrollIntoView({ behavior: 'smooth' })
        else window.scrollTo({ top: 0, behavior: 'smooth' })
      },
    })
      .to('.entrance__card', { scale: 1.06, y: -24, duration: 0.9, ease: 'power2.in' }, 0)
      // Release the sections mid-fade so they animate in *through* the veil
      // instead of waiting for a blank beat after it clears.
      .call(openGate, undefined, 0.45)
  }

  if (dismissed) return null

  return (
    <div
      ref={root}
      className={`entrance ${editorPreview ? 'entrance--inline' : ''}`}
      id="entrance"
    >
      {/* Background: video or image */}
      {backgroundType === 'video' && backgroundVideo ? (
        <video
          className="entrance__bg"
          src={backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div
          className="entrance__bg"
          style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
        />
      )}

      {/* Darkening overlay behind the card */}
      <div className="entrance__overlay" style={{ opacity: overlayOpacity }} />

      {/* Bokeh particles */}
      {particles && (
        <div className="entrance__bokeh" aria-hidden="true">
          {dots.map((d) => (
            <span
              key={d.id}
              className="entrance__dot"
              style={{
                left: `${d.left}%`,
                bottom: `${d.bottom}%`,
                width: `${d.size}px`,
                height: `${d.size}px`,
                opacity: d.opacity,
                animationDelay: `${d.delay}s`,
                animationDuration: `${d.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Oval card */}
      <div className="entrance__card" style={{ background: cardBg }}>
        {topFloral && (
          <img
            className="entrance__floral entrance__floral--top"
            style={{ transform: `translateX(-50%) rotate(${topFloralRotation}deg)` }}
            src={topFloral}
            alt=""
          />
        )}

        <div className="entrance__content">
          <p className="entrance__invited">{invitedText}</p>
          <h2
            className="entrance__bride"
            style={{ fontFamily: brideFont, fontSize: `${brideFontSize}px`, color: brideColor }}
          >
            {bride}
          </h2>
          <span className="entrance__amp">&amp;</span>
          <h2
            className="entrance__groom"
            style={{ fontFamily: groomFont, fontSize: `${groomFontSize}px`, color: groomColor }}
          >
            {groom}
          </h2>
        </div>

        <button
          type="button"
          className="entrance__btn"
          style={{ background: buttonBgColor, color: buttonTextColor }}
          onClick={handleEnter}
        >
          {buttonText}
        </button>

        {bottomFloral && (
          <img
            className="entrance__floral entrance__floral--bottom"
            style={{ transform: `translateX(-50%) rotate(${bottomFloralRotation}deg)` }}
            src={bottomFloral}
            alt=""
          />
        )}
      </div>
    </div>
  )
}
