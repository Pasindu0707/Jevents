export type SectionType =
  | 'entrance'
  | 'hero'
  | 'countdown'
  | 'couple'
  | 'story'
  | 'events'
  | 'timeline'
  | 'gallery'
  | 'rsvp'
  | 'inquiry'
  | 'footer'

export interface EventItem {
  name: string
  title?: string // legacy alias for name
  date?: string
  venue: string
  time: string
  address?: string
  mapUrl?: string
  /** Text on the map link/button. Defaults to "View Map". */
  mapLabel?: string
  photo?: string
}

export interface TimelineItem {
  time: string
  label: string
}

export interface StoryItem {
  title: string
  text: string
}

export interface Contact {
  name: string
  phone: string
}

export interface SocialLink {
  label: string
  url: string
}

/* ------------------------------------------------------------------ *
 * Global theme (TASK 1)
 * ------------------------------------------------------------------ */

export type LineStyle = 'solid' | 'dashed' | 'dotted'
export type DividerStyle = 'line' | 'floral' | 'none'

export interface ThemeConfig {
  /** Gold / accent colour — lines, decorative elements, highlighted words. */
  primaryColor?: string
  /** Dark / black — main text and dark elements. */
  secondaryColor?: string
  /** Page background fallback (when no image / video). */
  backgroundColor?: string
  /** Colour of the thin horizontal divider lines. */
  lineColor?: string
  /** Style of the divider lines. */
  lineStyle?: LineStyle
  /** Thickness of the divider lines, 1–4px. */
  lineThickness?: number
  /** Colour for words highlighted in the accent colour. */
  accentTextColor?: string
  /** Section divider treatment. */
  dividerStyle?: DividerStyle
}

/* ------------------------------------------------------------------ *
 * Per-section style (TASK 2)
 * ------------------------------------------------------------------ */

export type ParticleStyle =
  | 'bokeh'
  | 'petals'
  | 'sparkles'
  | 'snow'
  | 'golddust'
  | 'fireflies'

export type ParticleSpeed = 'slow' | 'medium' | 'fast'
export type SectionBackgroundType = 'color' | 'gradient' | 'image' | 'video'

export type MapButtonStyle = 'link' | 'button'

export interface SectionStyle {
  // Typography
  headingFont?: string
  bodyFont?: string
  headingFontSize?: number
  bodyFontSize?: number
  headingColor?: string
  bodyColor?: string
  accentColor?: string
  // Background
  backgroundType?: SectionBackgroundType
  backgroundColor?: string
  backgroundImage?: string
  backgroundVideo?: string
  overlayColor?: string
  overlayOpacity?: number
  /**
   * Gradient stops, used when backgroundType is 'gradient'. A light `via`
   * between two deeper ends reads as a metallic sheen — the way to make a
   * flat gold look like gold leaf.
   */
  gradientFrom?: string
  gradientVia?: string
  gradientTo?: string
  /** Direction in degrees. 135 = top-left to bottom-right. Default 135. */
  gradientAngle?: number
  // Particles
  particlesEnabled?: boolean
  particleStyle?: ParticleStyle
  particleColor?: string
  particleCount?: number
  particleSpeed?: ParticleSpeed

  /* ---- Layout (any section) ---- */
  /** CSS length, or 'auto' to drop the section's minimum height. */
  minHeight?: string | number
  /** Vertical padding in px — overrides the section's default clamp(). */
  paddingTop?: number
  paddingBottom?: number

  /* ---- Names & labels (couple / countdown) ---- */
  /** Colour of the large names (couple) — falls back to headingColor. */
  nameColor?: string
  nameFontSize?: number
  /** Colour of the small caps labels ("The Bride", "Days", …). */
  labelColor?: string
  labelFontSize?: number

  /* ---- Couple photos ---- */
  /** Diameter of the round portraits in px. */
  imageSize?: number
  /** Gap between a portrait and the name below it, px. */
  imageGap?: number
  /** Gap between the bride / "&" / groom columns, px. */
  columnGap?: number

  /* ---- Events ---- */
  dateColor?: string
  dateFontSize?: number
  /** CSS font-weight for the date line (events cards and the footer date). */
  dateFontWeight?: number
  timeColor?: string
  timeFontSize?: number
  /** CSS font-weight for the event time, e.g. 700. */
  timeFontWeight?: number
  /** Tracking for the event time, in em. The default 0.24 is very airy. */
  timeLetterSpacing?: number
  /** Render the map link as an underlined link (default) or a filled button. */
  mapButtonStyle?: MapButtonStyle
  mapButtonBgColor?: string
  mapButtonTextColor?: string
  mapButtonBorderColor?: string
  /** Corner radius in px — use a large value (999) for a pill. */
  mapButtonRadius?: number
  mapButtonFontSize?: number

  /* ---- Countdown ---- */
  numberColor?: string
  numberFontSize?: number
  boxBgColor?: string
  boxBorderColor?: string

  /* ---- Footer ---- */
  contactColor?: string
  contactNameFontSize?: number
  contactPhoneFontSize?: number
}

export interface SectionBase {
  type: SectionType
  id?: string
  /** Per-section typography / background / particle overrides (TASK 2). */
  style?: SectionStyle
}

export interface EntranceSectionData extends SectionBase {
  type: 'entrance'
  bride: string
  groom: string
  invitedText?: string
  brideFont?: string
  groomFont?: string
  brideFontSize?: number
  groomFontSize?: number
  brideColor?: string
  groomColor?: string
  topFloral?: string
  bottomFloral?: string
  /** Fixed rotation angle (degrees) for the top floral decoration. */
  topFloralRotation?: number
  /** Fixed rotation angle (degrees) for the bottom floral decoration. */
  bottomFloralRotation?: number
  backgroundType?: 'image' | 'video'
  backgroundImage?: string
  backgroundVideo?: string
  overlayOpacity?: number
  cardColor?: string
  cardOpacity?: number
  buttonText?: string
  buttonTextColor?: string
  buttonBgColor?: string
  particles?: boolean
}

export interface HeroSectionData extends SectionBase {
  type: 'hero'
  bride: string
  groom: string
  date: string
  tagline?: string
  image?: string
  verse?: string
  verseRef?: string
}

export interface CountdownSectionData extends SectionBase {
  type: 'countdown'
  targetDate: string // ISO string
  heading?: string
}

export interface CoupleSectionData extends SectionBase {
  type: 'couple'
  bride: string
  groom: string
  /** Caption under the name. Defaults to "The Bride" / "The Groom". */
  brideLabel?: string
  groomLabel?: string
  brideBio?: string
  groomBio?: string
  brideImage?: string
  groomImage?: string
  verse?: string
  verseRef?: string
}

export interface StorySectionData extends SectionBase {
  type: 'story'
  heading?: string
  paragraphs?: string[]
  sideImage?: string
  items?: StoryItem[] // legacy
}

export interface EventsSectionData extends SectionBase {
  type: 'events'
  heading?: string
  events: EventItem[]
}

export interface TimelineSectionData extends SectionBase {
  type: 'timeline'
  heading?: string
  items: TimelineItem[]
}

export interface GallerySectionData extends SectionBase {
  type: 'gallery'
  heading?: string
  images: string[]
}

export interface RSVPSectionData extends SectionBase {
  type: 'rsvp'
  heading?: string
  message?: string
  rsvpSheetUrl?: string
  sheetUrl?: string // legacy alias
}

export interface InquirySectionData extends SectionBase {
  type: 'inquiry'
  heading?: string
  message?: string
  inquirySheetUrl?: string
}

export interface FooterSectionData extends SectionBase {
  type: 'footer'
  bride: string
  groom: string
  hashtag?: string
  date?: string
  contacts?: Contact[]
  socials?: SocialLink[]
}

export type Section =
  | EntranceSectionData
  | HeroSectionData
  | CountdownSectionData
  | CoupleSectionData
  | StorySectionData
  | EventsSectionData
  | TimelineSectionData
  | GallerySectionData
  | RSVPSectionData
  | InquirySectionData
  | FooterSectionData

export interface CoupleData {
  slug: string
  musicUrl?: string
  /** Global theme configuration (TASK 1). */
  theme?: ThemeConfig
  meta?: {
    title?: string
    couple?: string
  }
  sections: Section[]
}
