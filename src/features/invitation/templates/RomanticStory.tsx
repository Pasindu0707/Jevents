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

const INK = '#7d4a52'
const BLUSH = '#c98b94'

/**
 * RomanticStory — image-heavy, love-story focused layout with full-bleed photos
 * and a soft blush palette. Composes the shared reusable components.
 */
export function RomanticStory({ couple }: { couple: CoupleData }) {
  const [musicStarted, setMusicStarted] = useState(false)
  const hero = couple.heroImage ? assetUrl(couple.heroImage) : undefined
  const storyPhoto = couple.gallery[1]?.src ?? couple.gallery[0]?.src

  return (
    <main className="min-h-dvh bg-[#fbf3f1] font-display text-[#5a3a40]">
      <OpeningCard
        brideName={couple.brideName}
        groomName={couple.groomName}
        primaryColor={INK}
        secondaryColor={BLUSH}
        onOpen={() => setMusicStarted(true)}
      />
      {couple.backgroundMusic && (
        <MusicPlayer src={couple.backgroundMusic} autoStart={musicStarted} primaryColor={INK} />
      )}

      {/* Full-bleed hero */}
      <section className="relative flex min-h-dvh items-end justify-center overflow-hidden px-6 pb-20 text-center">
        {hero && <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />}
        <div className="absolute inset-0 bg-linear-to-t from-[#5a3a40]/80 via-[#5a3a40]/20 to-transparent" />
        <div className="relative z-10 text-white">
          <p className="text-sm tracking-[0.3em] uppercase opacity-90">Our love story begins</p>
          <h1 className="mt-4 text-5xl leading-tight italic sm:text-7xl">
            {couple.brideName} &amp; {couple.groomName}
          </h1>
          <p className="mt-5 tracking-[0.2em] uppercase">{formatWeddingDate(couple.weddingDate)}</p>
          {couple.hashtag && <p className="mt-2 text-sm opacity-80">{couple.hashtag}</p>}
        </div>
      </section>

      {couple.welcomeMessage && (
        <section className="mx-auto max-w-2xl px-6 py-16 text-center">
          <p className="text-2xl leading-relaxed italic sm:text-3xl">“{couple.welcomeMessage}”</p>
        </section>
      )}

      {/* Story with a large photo */}
      {couple.loveStory && (
        <section className="mx-auto grid max-w-5xl items-center gap-8 px-6 py-12 md:grid-cols-2">
          {storyPhoto && (
            <img
              src={assetUrl(storyPhoto)}
              alt={`${couple.brideName} and ${couple.groomName}`}
              className="aspect-4/5 w-full rounded-3xl object-cover shadow-xl"
            />
          )}
          <div>
            <h2 className="text-4xl italic">How it started</h2>
            <p className="mt-6 leading-relaxed whitespace-pre-line text-[#7d5a5f]">{couple.loveStory}</p>
          </div>
        </section>
      )}

      <section className="px-6 py-16 text-center">
        <h2 className="text-3xl italic">Counting the days</h2>
        <div className="mt-6">
          <Countdown weddingDate={couple.weddingDate} primaryColor={INK} secondaryColor={BLUSH} />
        </div>
        <div className="mt-8">
          <AddToCalendarButton
            title={`${couple.brideName} & ${couple.groomName}'s Wedding`}
            start={couple.weddingDate}
            location={couple.events[0]?.venueAddress ?? couple.events[0]?.venueName}
            description={couple.welcomeMessage}
            accent={BLUSH}
          />
        </div>
      </section>

      {couple.events.length > 0 && (
        <section className="px-6 py-16">
          <h2 className="text-center text-4xl italic">The Day</h2>
          <div className="mt-10">
            <EventTimeline events={couple.events} primaryColor={INK} secondaryColor={BLUSH} />
          </div>
        </section>
      )}

      {couple.gallery.length > 0 && (
        <section className="px-6 py-16">
          <h2 className="text-center text-4xl italic">Our Moments</h2>
          <Gallery images={couple.gallery} className="mt-10" />
        </section>
      )}

      <section className="bg-[#f4e3e1] px-6 py-16">
        <h2 className="text-center text-4xl italic">Be Our Guest</h2>
        {couple.rsvp.enabled ? (
          <>
            {couple.rsvp.message && (
              <p className="mx-auto mt-4 max-w-md text-center text-[#7d5a5f]">{couple.rsvp.message}</p>
            )}
            <div className="mt-8">
              <RSVPForm
                coupleSlug={couple.slug}
                googleScriptUrl={couple.rsvp.googleScriptUrl}
                successMessage={couple.rsvp.successMessage}
                primaryColor={INK}
                secondaryColor={BLUSH}
              />
            </div>
          </>
        ) : (
          <p className="mx-auto mt-4 max-w-md text-center text-[#9b7a7f]">
            {couple.rsvp.disabledMessage ?? 'RSVPs are not being collected for this invitation.'}
          </p>
        )}
      </section>

      <section className="px-6 pb-12">
        <ShareButtons brideName={couple.brideName} groomName={couple.groomName} accent={INK} />
      </section>

      <footer className="px-6 pt-8 pb-24 text-center text-xs tracking-wide text-[#9b7a7f]">
        {couple.brideName} &amp; {couple.groomName} · Made with care by J Events
      </footer>
    </main>
  )
}
