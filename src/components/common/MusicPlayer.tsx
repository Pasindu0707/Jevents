import { useEffect, useRef, useState } from 'react'
import { assetUrl } from '@/lib/media'

interface Props {
  /** Music file URL/path from CoupleData.backgroundMusic. */
  src: string
  /** Flips to true when the guest opens the invitation card — starts playback. */
  autoStart?: boolean
  /** Accent colour for the floating button. */
  primaryColor?: string
}

/**
 * Floating background-music player (step 9).
 *
 * Renders nothing when there's no music file, so it never crashes on empty
 * data. Playback only ever begins from a user gesture — either the opening card
 * (`autoStart` flips true right after the tap) or the floating button — which
 * is what keeps it within browser autoplay rules. The button toggles play/pause
 * and reflects the current state ("Music On" / "Music Off").
 */
export function MusicPlayer({ src, autoStart = false, primaryColor = '#474f44' }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  // Start once the card is opened. That tap is a real user gesture, so the
  // play() promise is allowed; we still catch rejections defensively.
  useEffect(() => {
    if (!autoStart) return
    const audio = audioRef.current
    if (!audio) return
    void audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false))
  }, [autoStart])

  if (!src) return null

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      void audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={assetUrl(src)} loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        className="fixed right-4 z-40 flex min-h-11 items-center gap-2 rounded-full px-4 py-3 text-xs font-semibold tracking-wide text-white shadow-lg backdrop-blur transition-transform hover:scale-105 active:scale-95"
        style={{ background: primaryColor, bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        <span className="relative flex h-2 w-2">
          {playing && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        {playing ? 'Music On' : 'Music Off'}
      </button>
    </>
  )
}
