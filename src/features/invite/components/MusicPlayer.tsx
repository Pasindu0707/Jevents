import { useEffect, useRef, useState } from 'react'
import './music-player.css'

const TARGET_VOLUME = 0.7
const FADE_MS = 1200

export default function MusicPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const fadeRef = useRef<number | null>(null)
  const userPausedRef = useRef(false)
  const [playing, setPlaying] = useState(false)
  // True when the browser blocked autoplay — the button pulses to invite a tap.
  const [blocked, setBlocked] = useState(false)

  function clearFade() {
    if (fadeRef.current) {
      cancelAnimationFrame(fadeRef.current)
      fadeRef.current = null
    }
  }

  function fade(to: number, onDone?: () => void) {
    const audio = audioRef.current
    if (!audio) return
    clearFade()
    const from = audio.volume
    const start = performance.now()
    const step = (t: number) => {
      const k = Math.min(1, (t - start) / FADE_MS)
      audio.volume = from + (to - from) * k
      if (k < 1) {
        fadeRef.current = requestAnimationFrame(step)
      } else {
        fadeRef.current = null
        onDone?.()
      }
    }
    fadeRef.current = requestAnimationFrame(step)
  }

  function play() {
    const audio = audioRef.current
    if (!audio || !src) return
    audio.volume = 0
    audio
      .play()
      .then(() => {
        setPlaying(true)
        setBlocked(false)
        fade(TARGET_VOLUME)
      })
      .catch(() => {
        // Autoplay blocked — pulse the button so the user knows to tap it.
        setBlocked(true)
      })
  }

  function pause() {
    fade(0, () => {
      audioRef.current?.pause()
      setPlaying(false)
    })
  }

  function toggle() {
    if (playing) {
      userPausedRef.current = true
      pause()
    } else {
      userPausedRef.current = false
      play()
    }
  }

  // Try to start on mount (likely blocked → pulse), then start for real on the
  // entrance "VIEW INVITATION" click or the first user gesture anywhere.
  useEffect(() => {
    play()

    const startFromEvent = () => {
      if (!userPausedRef.current) play()
    }
    const firstGesture = () => {
      if (!playing && !userPausedRef.current) play()
      window.removeEventListener('pointerdown', firstGesture)
    }
    window.addEventListener('invitely:play', startFromEvent)
    window.addEventListener('pointerdown', firstGesture)
    return () => {
      window.removeEventListener('invitely:play', startFromEvent)
      window.removeEventListener('pointerdown', firstGesture)
      clearFade()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  if (!src) return null

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button
        type="button"
        className={`music-player ${playing ? 'is-playing' : ''} ${
          blocked && !playing ? 'is-blocked' : ''
        }`}
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        title={playing ? 'Pause music' : 'Play music'}
      >
        <span className="music-player__disc" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="music-player__icon">
            {/* Vinyl record */}
            <circle cx="12" cy="12" r="11" className="mp-vinyl" />
            <circle cx="12" cy="12" r="7.5" className="mp-groove" />
            <circle cx="12" cy="12" r="4.5" className="mp-groove" />
            {/* Centre label + hole */}
            <circle cx="12" cy="12" r="3" className="mp-label" />
            <circle cx="12" cy="12" r="0.9" className="mp-hole" />
          </svg>
          {/* Music note overlay */}
          <svg viewBox="0 0 24 24" className="music-player__note">
            <path d="M9 17V5l10-2v12" className="mp-note-stroke" />
            <circle cx="7" cy="17" r="2.2" className="mp-note-fill" />
            <circle cx="17" cy="15" r="2.2" className="mp-note-fill" />
          </svg>
        </span>
      </button>
    </>
  )
}
