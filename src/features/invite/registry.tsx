import type { ComponentType } from 'react'
import type { Section, SectionType } from './types'
import EntranceSection from './components/sections/EntranceSection'
import HeroSection from './components/sections/HeroSection'
import CountdownSection from './components/sections/CountdownSection'
import CoupleSection from './components/sections/CoupleSection'
import StorySection from './components/sections/StorySection'
import EventsSection from './components/sections/EventsSection'
import TimelineSection from './components/sections/TimelineSection'
import GallerySection from './components/sections/GallerySection'
import RSVPSection from './components/sections/RSVPSection'
import InquirySection from './components/sections/InquirySection'
import FooterSection from './components/sections/FooterSection'

/**
 * Maps a section `type` string from the data file to its React component.
 * To add a new section: build the component, then register it here.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registry: Record<SectionType, ComponentType<any>> = {
  entrance: EntranceSection,
  hero: HeroSection,
  countdown: CountdownSection,
  couple: CoupleSection,
  story: StorySection,
  events: EventsSection,
  timeline: TimelineSection,
  gallery: GallerySection,
  rsvp: RSVPSection,
  inquiry: InquirySection,
  footer: FooterSection,
}

/** Render a single section by looking up its type in the registry. */
export function renderSection(section: Section, key: number) {
  const Component = registry[section.type]
  if (!Component) {
    console.warn(`Unknown section type: ${section.type}`)
    return null
  }
  return <Component key={section.id ?? key} {...section} />
}
