import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
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

/**
 * ClassicFloral — the first wedding template (step 4).
 *
 * Elegant, mobile-first, serif-led layout driven entirely by CoupleData. Uses
 * the couple's primaryColor (--ink) and secondaryColor (--gold) as accents.
 * Composes the shared blocks: opening card, live countdown, timeline, gallery,
 * background music and the RSVP form.
 */
export function ClassicFloral({ couple }: { couple: CoupleData }) {
  // Flipped when the guest taps the opening card — used to start music on a
  // real user gesture (browsers block autoplay otherwise).
  const [musicStarted, setMusicStarted] = useState(false)

  const vars = {
    ['--ink']: couple.primaryColor,
    ['--gold']: couple.secondaryColor,
  } as CSSProperties

  const hero = couple.heroImage ? assetUrl(couple.heroImage) : undefined
  const couplePhoto = couple.gallery[0]?.src ? assetUrl(couple.gallery[0].src) : hero
  const dateLabel = formatWeddingDate(couple.weddingDate)

  return (
    <main className="min-h-dvh bg-[#fbf8f3] text-neutral-800" style={vars}>
      {/* ── Opening card overlay (blocks the page until tapped) ──── */}
      <OpeningCard
        brideName={couple.brideName}
        groomName={couple.groomName}
        primaryColor={couple.primaryColor}
        secondaryColor={couple.secondaryColor}
        onOpen={() => setMusicStarted(true)}
      />

      {/* ── Background music (floating button; only if a file is set) ─ */}
      {couple.backgroundMusic && (
        <MusicPlayer
          src={couple.backgroundMusic}
          autoStart={musicStarted}
          primaryColor={couple.primaryColor}
        />
      )}

      {/* ── Opening hero ─────────────────────────────────────────── */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-6 text-center">
        {hero && (
          <img
            src={hero}
            alt={`${couple.brideName} & ${couple.groomName}`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 text-white">
          <p className="text-[0.7rem] tracking-[0.4em] uppercase opacity-90">
            Together with their families
          </p>
          <FloralDivider className="mx-auto my-5 w-28 text-white/70" />
          <h1 className="font-display text-5xl leading-tight sm:text-7xl">
            {couple.brideName}
            <span className="mx-3 align-middle text-3xl font-light italic opacity-80 sm:text-5xl">
              &amp;
            </span>
            {couple.groomName}
          </h1>
          {dateLabel && (
            <p className="mt-6 text-base tracking-[0.18em] uppercase sm:text-lg">{dateLabel}</p>
          )}
          {couple.hashtag && <p className="mt-2 text-sm opacity-80">{couple.hashtag}</p>}
        </div>
      </section>

      {/* ── Countdown ─────────────────────────────────────────────── */}
      <section className="px-6 py-14 text-center">
        <SectionLabel>Counting down to our big day</SectionLabel>
        <div className="mt-6">
          <Countdown
            weddingDate={couple.weddingDate}
            primaryColor={couple.primaryColor}
            secondaryColor={couple.secondaryColor}
          />
        </div>
        <div className="mt-8">
          <AddToCalendarButton
            title={`${couple.brideName} & ${couple.groomName}'s Wedding`}
            start={couple.weddingDate}
            location={couple.events[0]?.venueAddress ?? couple.events[0]?.venueName}
            description={couple.welcomeMessage}
            accent={couple.secondaryColor}
          />
        </div>
      </section>

      {/* ── Welcome message ──────────────────────────────────────── */}
      {couple.welcomeMessage && (
        <section className="mx-auto max-w-2xl px-6 pb-6 text-center">
          <FloralDivider className="mx-auto mb-6 w-24 text-(--gold)" />
          <p className="font-display text-2xl leading-relaxed text-(--ink) sm:text-3xl">
            {couple.welcomeMessage}
          </p>
        </section>
      )}

      {/* ── Couple photo ─────────────────────────────────────────── */}
      {couplePhoto && (
        <section className="px-6 py-10">
          <div className="mx-auto max-w-md overflow-hidden rounded-4xl border-8 border-white shadow-xl">
            <img
              src={couplePhoto}
              alt={`${couple.brideName} and ${couple.groomName}`}
              className="aspect-4/5 w-full object-cover"
            />
          </div>
        </section>
      )}

      {/* ── Love story ───────────────────────────────────────────── */}
      {couple.loveStory && (
        <section className="mx-auto max-w-2xl px-6 py-12 text-center">
          <SectionTitle>Our Story</SectionTitle>
          <p className="mt-6 leading-relaxed whitespace-pre-line text-neutral-600">
            {couple.loveStory}
          </p>
        </section>
      )}

      {/* ── Event timeline ───────────────────────────────────────── */}
      {couple.events.length > 0 && (
        <section className="bg-white px-6 py-16">
          <SectionTitle className="text-center">The Celebration</SectionTitle>
          <div className="mt-10">
            <EventTimeline
              events={couple.events}
              primaryColor={couple.primaryColor}
              secondaryColor={couple.secondaryColor}
            />
          </div>
        </section>
      )}

      {/* ── Gallery (hidden when there are no images) ─────────────── */}
      {couple.gallery.length > 0 && (
        <section className="px-6 py-16">
          <SectionTitle className="text-center">Moments</SectionTitle>
          <Gallery images={couple.gallery} className="mt-10" />
        </section>
      )}

      {/* ── RSVP ──────────────────────────────────────────────────── */}
      <section className="bg-(--ink)/5 px-6 py-16">
        <SectionTitle className="text-center">RSVP</SectionTitle>
        {couple.rsvp.enabled ? (
          <>
            {couple.rsvp.message && (
              <p className="mx-auto mt-4 max-w-md text-center text-neutral-600">
                {couple.rsvp.message}
              </p>
            )}
            <div className="mt-8">
              <RSVPForm
                coupleSlug={couple.slug}
                googleScriptUrl={couple.rsvp.googleScriptUrl}
                successMessage={couple.rsvp.successMessage}
                primaryColor={couple.primaryColor}
                secondaryColor={couple.secondaryColor}
              />
            </div>
          </>
        ) : (
          <p className="mx-auto mt-4 max-w-md text-center text-neutral-500">
            {couple.rsvp.disabledMessage ?? 'RSVPs are not being collected for this invitation.'}
          </p>
        )}
      </section>

      {/* ── Share ─────────────────────────────────────────────────── */}
      <section className="px-6 pb-12">
        <ShareButtons
          brideName={couple.brideName}
          groomName={couple.groomName}
          accent={couple.secondaryColor}
        />
      </section>

      {/* ── Footer credit ────────────────────────────────────────── */}
      <footer className="border-t border-neutral-200 px-6 pt-8 pb-24 text-center">
        <FloralDivider className="mx-auto mb-4 w-20 text-(--gold)" />
        <p className="text-xs tracking-wide text-neutral-400">
          {couple.brideName} &amp; {couple.groomName} · Made with care by J Events
        </p>
      </footer>
    </main>
  )
}

/* ── small presentational helpers ──────────────────────────────── */

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.28em] text-(--ink) uppercase">
      {children}
    </p>
  )
}

function SectionTitle({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <h2 className={`font-display text-3xl text-(--ink) sm:text-4xl ${className}`}>{children}</h2>
}

/** Simple decorative sprig divider (no animation). */
function FloralDivider({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 16" fill="none" className={className} aria-hidden>
      <path d="M2 8h44M74 8h44" stroke="currentColor" strokeWidth="1" />
      <path
        d="M60 2c3 3 3 9 0 12-3-3-3-9 0-12Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.25"
      />
      <circle cx="50" cy="8" r="1.5" fill="currentColor" />
      <circle cx="70" cy="8" r="1.5" fill="currentColor" />
    </svg>
  )
}
