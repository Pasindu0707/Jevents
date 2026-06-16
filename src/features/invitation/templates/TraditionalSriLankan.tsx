import { useState } from 'react'
import type { CSSProperties } from 'react'
import { AddToCalendarButton } from '@/components/common/AddToCalendarButton'
import { ShareButtons } from '@/components/common/ShareButtons'
import { Countdown } from '@/components/common/Countdown'
import { EventTimeline } from '@/components/common/EventTimeline'
import { Gallery } from '@/components/common/Gallery'
import { MusicPlayer } from '@/components/common/MusicPlayer'
import { RSVPForm } from '@/components/common/RSVPForm'
import { OpeningCard } from '@/features/invitation/blocks/OpeningCard'
import { formatWeddingDate } from '@/lib/format'
import { assetUrl } from '@/lib/media'
import type { CoupleData } from '@/types/couple'

const MAROON = '#7b1e1e'
const GOLD = '#c9962b'

/**
 * TraditionalSriLankan — cultural, warm maroon/gold palette. Sets a font stack
 * that includes Sinhala and Tamil capable fonts so bilingual content renders
 * correctly. Composes the shared reusable components.
 */
export function TraditionalSriLankan({ couple }: { couple: CoupleData }) {
  const [musicStarted, setMusicStarted] = useState(false)
  const hero = couple.heroImage ? assetUrl(couple.heroImage) : undefined

  // Sinhala/Tamil-friendly font stack (falls back to a serif if none installed).
  const style = {
    fontFamily:
      "'Noto Serif Sinhala', 'Noto Sans Sinhala', 'Noto Sans Tamil', 'Iskoola Pota', 'Latha', Georgia, serif",
  } as CSSProperties

  return (
    <main className="min-h-dvh bg-[#fff7ec] text-[#5a2a16]" style={style}>
      <OpeningCard
        brideName={couple.brideName}
        groomName={couple.groomName}
        primaryColor={MAROON}
        secondaryColor={GOLD}
        onOpen={() => setMusicStarted(true)}
      />
      {couple.backgroundMusic && (
        <MusicPlayer src={couple.backgroundMusic} autoStart={musicStarted} primaryColor={MAROON} />
      )}

      {/* Hero with ornamental border */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6 text-center">
        {hero && <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />}
        <div className="absolute inset-0 bg-linear-to-b from-[#7b1e1e]/20 via-[#fff7ec]/40 to-[#fff7ec]" />
        <div className="relative z-10 rounded-3xl border-4 border-double border-[#c9962b] bg-[#fff7ec]/80 px-8 py-12 backdrop-blur-sm">
          <p className="text-xs tracking-[0.35em] text-[#7b1e1e] uppercase">සුභ විවාහ මංගල්‍යය</p>
          <h1 className="mt-5 text-4xl leading-tight text-[#7b1e1e] sm:text-6xl">
            {couple.brideName}
            <span className="mx-3 text-[#c9962b]">❖</span>
            {couple.groomName}
          </h1>
          <p className="mt-5 tracking-[0.2em] text-[#8a4a2a] uppercase">
            {formatWeddingDate(couple.weddingDate)}
          </p>
          {couple.hashtag && <p className="mt-2 text-sm text-[#a8693f]">{couple.hashtag}</p>}
        </div>
      </section>

      <section className="px-6 py-14 text-center">
        <p className="text-xs tracking-[0.3em] text-[#7b1e1e] uppercase">Counting down · සුභ දිනය</p>
        <div className="mt-6">
          <Countdown weddingDate={couple.weddingDate} primaryColor={MAROON} secondaryColor={GOLD} />
        </div>
        <div className="mt-8">
          <AddToCalendarButton
            title={`${couple.brideName} & ${couple.groomName}'s Wedding`}
            start={couple.weddingDate}
            location={couple.events[0]?.venueAddress ?? couple.events[0]?.venueName}
            description={couple.welcomeMessage}
            accent={MAROON}
          />
        </div>
      </section>

      {couple.welcomeMessage && (
        <section className="mx-auto max-w-2xl px-6 pb-12 text-center">
          <p className="text-2xl leading-relaxed text-[#7b1e1e] sm:text-3xl">{couple.welcomeMessage}</p>
        </section>
      )}

      {couple.loveStory && (
        <section className="mx-auto max-w-2xl px-6 py-12 text-center">
          <h2 className="text-3xl text-[#7b1e1e] sm:text-4xl">Our Story</h2>
          <p className="mt-6 leading-relaxed whitespace-pre-line text-[#7a4a30]">{couple.loveStory}</p>
        </section>
      )}

      {couple.events.length > 0 && (
        <section className="px-6 py-16">
          <h2 className="text-center text-3xl text-[#7b1e1e] sm:text-4xl">Programme</h2>
          <div className="mt-10">
            <EventTimeline events={couple.events} primaryColor={MAROON} secondaryColor={GOLD} />
          </div>
        </section>
      )}

      {couple.gallery.length > 0 && (
        <section className="px-6 py-16">
          <h2 className="text-center text-3xl text-[#7b1e1e] sm:text-4xl">Moments</h2>
          <Gallery images={couple.gallery} className="mt-10" />
        </section>
      )}

      <section className="bg-[#7b1e1e]/5 px-6 py-16">
        <h2 className="text-center text-3xl text-[#7b1e1e] sm:text-4xl">RSVP</h2>
        {couple.rsvp.enabled ? (
          <>
            {couple.rsvp.message && (
              <p className="mx-auto mt-4 max-w-md text-center text-[#7a4a30]">{couple.rsvp.message}</p>
            )}
            <div className="mt-8">
              <RSVPForm
                coupleSlug={couple.slug}
                googleScriptUrl={couple.rsvp.googleScriptUrl}
                successMessage={couple.rsvp.successMessage}
                primaryColor={MAROON}
                secondaryColor={GOLD}
              />
            </div>
          </>
        ) : (
          <p className="mx-auto mt-4 max-w-md text-center text-[#a8693f]">
            {couple.rsvp.disabledMessage ?? 'RSVPs are not being collected for this invitation.'}
          </p>
        )}
      </section>

      <section className="px-6 pb-12">
        <ShareButtons brideName={couple.brideName} groomName={couple.groomName} accent={MAROON} />
      </section>

      <footer className="border-t border-[#c9962b]/40 px-6 pt-8 pb-24 text-center text-xs tracking-wide text-[#a8693f]">
        {couple.brideName} &amp; {couple.groomName} · Made with care by J Events
      </footer>
    </main>
  )
}
