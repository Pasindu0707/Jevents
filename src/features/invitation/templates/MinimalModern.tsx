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

const INK = '#111111'
const ACCENT = '#6b7280'

/**
 * MinimalModern — clean white background, generous whitespace, simple
 * sans-serif typography. Composes the shared reusable components.
 */
export function MinimalModern({ couple }: { couple: CoupleData }) {
  const [musicStarted, setMusicStarted] = useState(false)
  const hero = couple.heroImage ? assetUrl(couple.heroImage) : undefined

  return (
    <main className="min-h-dvh bg-white font-body text-neutral-900">
      <OpeningCard
        brideName={couple.brideName}
        groomName={couple.groomName}
        primaryColor={INK}
        secondaryColor={ACCENT}
        onOpen={() => setMusicStarted(true)}
      />
      {couple.backgroundMusic && (
        <MusicPlayer src={couple.backgroundMusic} autoStart={musicStarted} primaryColor={INK} />
      )}

      {/* Hero — type-led, no overlay drama */}
      <section className="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
        <p className="text-xs tracking-[0.4em] text-neutral-400 uppercase">Save the date</p>
        <h1 className="mt-8 text-5xl font-light tracking-tight sm:text-7xl">
          {couple.brideName} <span className="text-neutral-300">+</span> {couple.groomName}
        </h1>
        <p className="mt-8 text-sm tracking-[0.2em] text-neutral-500 uppercase">
          {formatWeddingDate(couple.weddingDate)}
        </p>
        {couple.hashtag && <p className="mt-2 text-sm text-neutral-400">{couple.hashtag}</p>}
      </section>

      {hero && (
        <section className="px-6">
          <img src={hero} alt="" className="mx-auto max-h-[70vh] w-full max-w-4xl object-cover" />
        </section>
      )}

      <section className="px-6 py-20 text-center">
        <p className="text-xs tracking-[0.3em] text-neutral-400 uppercase">Countdown</p>
        <div className="mt-6">
          <Countdown weddingDate={couple.weddingDate} primaryColor={INK} secondaryColor={ACCENT} />
        </div>
        <div className="mt-8">
          <AddToCalendarButton
            title={`${couple.brideName} & ${couple.groomName}'s Wedding`}
            start={couple.weddingDate}
            location={couple.events[0]?.venueAddress ?? couple.events[0]?.venueName}
            description={couple.welcomeMessage}
            accent={INK}
          />
        </div>
      </section>

      {couple.welcomeMessage && (
        <section className="mx-auto max-w-2xl px-6 pb-12 text-center">
          <p className="text-2xl leading-relaxed font-light sm:text-3xl">{couple.welcomeMessage}</p>
        </section>
      )}

      {couple.loveStory && (
        <section className="mx-auto max-w-2xl px-6 py-12">
          <h2 className="text-center text-2xl font-light tracking-tight">Our Story</h2>
          <p className="mt-6 leading-relaxed whitespace-pre-line text-neutral-600">{couple.loveStory}</p>
        </section>
      )}

      {couple.events.length > 0 && (
        <section className="bg-neutral-50 px-6 py-20">
          <h2 className="text-center text-2xl font-light tracking-tight">Schedule</h2>
          <div className="mt-10">
            <EventTimeline events={couple.events} primaryColor={INK} secondaryColor={ACCENT} />
          </div>
        </section>
      )}

      {couple.gallery.length > 0 && (
        <section className="px-6 py-20">
          <h2 className="text-center text-2xl font-light tracking-tight">Gallery</h2>
          <Gallery images={couple.gallery} className="mt-10" />
        </section>
      )}

      <section className="px-6 py-20">
        <h2 className="text-center text-2xl font-light tracking-tight">RSVP</h2>
        {couple.rsvp.enabled ? (
          <>
            {couple.rsvp.message && (
              <p className="mx-auto mt-4 max-w-md text-center text-neutral-500">{couple.rsvp.message}</p>
            )}
            <div className="mt-8">
              <RSVPForm
                coupleSlug={couple.slug}
                googleScriptUrl={couple.rsvp.googleScriptUrl}
                successMessage={couple.rsvp.successMessage}
                primaryColor={INK}
                secondaryColor={ACCENT}
              />
            </div>
          </>
        ) : (
          <p className="mx-auto mt-4 max-w-md text-center text-neutral-400">
            {couple.rsvp.disabledMessage ?? 'RSVPs are not being collected for this invitation.'}
          </p>
        )}
      </section>

      <section className="px-6 pb-16">
        <ShareButtons brideName={couple.brideName} groomName={couple.groomName} accent={INK} />
      </section>

      <footer className="border-t border-neutral-100 px-6 pt-8 pb-24 text-center text-xs tracking-wide text-neutral-400">
        {couple.brideName} + {couple.groomName} · Made with care by J Events
      </footer>
    </main>
  )
}
