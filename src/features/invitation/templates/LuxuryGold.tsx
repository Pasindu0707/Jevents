import { useState } from 'react'
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

const GOLD = '#c9a227'
const INK = '#0c0c0e'

/**
 * LuxuryGold — opulent dark theme with gold accents and serif type.
 * Uses the shared reusable components (Countdown, EventTimeline, Gallery,
 * RSVPForm, MusicPlayer) so only the styling differs from other templates.
 */
export function LuxuryGold({ couple }: { couple: CoupleData }) {
  const [musicStarted, setMusicStarted] = useState(false)
  const hero = couple.heroImage ? assetUrl(couple.heroImage) : undefined

  return (
    <main className="min-h-dvh bg-[#0c0c0e] font-display text-neutral-200">
      <OpeningCard
        brideName={couple.brideName}
        groomName={couple.groomName}
        primaryColor={INK}
        secondaryColor={GOLD}
        onOpen={() => setMusicStarted(true)}
      />
      {couple.backgroundMusic && (
        <MusicPlayer src={couple.backgroundMusic} autoStart={musicStarted} primaryColor={GOLD} />
      )}

      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-6 text-center">
        {hero && <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />}
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-[#0c0c0e]" />
        <div className="relative z-10">
          <p className="text-[0.7rem] tracking-[0.5em] text-[#c9a227] uppercase">The wedding of</p>
          <h1 className="mt-6 text-5xl leading-tight sm:text-7xl">
            <span className="text-[#c9a227]">{couple.brideName}</span>
            <span className="mx-3 font-light italic text-neutral-400">&amp;</span>
            <span className="text-[#c9a227]">{couple.groomName}</span>
          </h1>
          <div className="mx-auto mt-6 h-px w-40 bg-[#c9a227]/60" />
          <p className="mt-6 tracking-[0.25em] text-neutral-300 uppercase">
            {formatWeddingDate(couple.weddingDate)}
          </p>
          {couple.hashtag && <p className="mt-2 text-sm text-neutral-500">{couple.hashtag}</p>}
        </div>
      </section>

      {/* Countdown */}
      <section className="px-6 py-16 text-center">
        <p className="text-xs tracking-[0.3em] text-[#c9a227] uppercase">Counting down</p>
        <div className="mt-6">
          <Countdown weddingDate={couple.weddingDate} primaryColor={GOLD} secondaryColor={GOLD} />
        </div>
        <div className="mt-8">
          <AddToCalendarButton
            title={`${couple.brideName} & ${couple.groomName}'s Wedding`}
            start={couple.weddingDate}
            location={couple.events[0]?.venueAddress ?? couple.events[0]?.venueName}
            description={couple.welcomeMessage}
            accent={GOLD}
          />
        </div>
      </section>

      {couple.welcomeMessage && (
        <section className="mx-auto max-w-2xl px-6 pb-12 text-center">
          <p className="text-2xl leading-relaxed text-neutral-300 italic sm:text-3xl">
            “{couple.welcomeMessage}”
          </p>
        </section>
      )}

      {couple.loveStory && (
        <section className="mx-auto max-w-2xl px-6 py-12 text-center">
          <h2 className="text-3xl text-[#c9a227] sm:text-4xl">Our Story</h2>
          <p className="mt-6 leading-relaxed whitespace-pre-line text-neutral-400">{couple.loveStory}</p>
        </section>
      )}

      {couple.events.length > 0 && (
        <section className="px-6 py-16">
          <h2 className="text-center text-3xl text-[#c9a227] sm:text-4xl">The Celebration</h2>
          <div className="mt-10">
            <EventTimeline events={couple.events} primaryColor={GOLD} secondaryColor={GOLD} />
          </div>
        </section>
      )}

      {couple.gallery.length > 0 && (
        <section className="px-6 py-16">
          <h2 className="text-center text-3xl text-[#c9a227] sm:text-4xl">Moments</h2>
          <Gallery images={couple.gallery} className="mt-10" />
        </section>
      )}

      {/* RSVP */}
      <section className="px-6 py-16">
        <h2 className="text-center text-3xl text-[#c9a227] sm:text-4xl">RSVP</h2>
        {couple.rsvp.enabled ? (
          <>
            {couple.rsvp.message && (
              <p className="mx-auto mt-4 max-w-md text-center text-neutral-400">{couple.rsvp.message}</p>
            )}
            <div className="mt-8">
              <RSVPForm
                coupleSlug={couple.slug}
                googleScriptUrl={couple.rsvp.googleScriptUrl}
                successMessage={couple.rsvp.successMessage}
                primaryColor={INK}
                secondaryColor={GOLD}
              />
            </div>
          </>
        ) : (
          <p className="mx-auto mt-4 max-w-md text-center text-neutral-500">
            {couple.rsvp.disabledMessage ?? 'RSVPs are not being collected for this invitation.'}
          </p>
        )}
      </section>

      <section className="px-6 pb-12">
        <ShareButtons brideName={couple.brideName} groomName={couple.groomName} accent={GOLD} />
      </section>

      <footer className="border-t border-white/10 px-6 pt-8 pb-24 text-center text-xs tracking-wide text-neutral-600">
        {couple.brideName} &amp; {couple.groomName} · Made with care by J Events
      </footer>
    </main>
  )
}
