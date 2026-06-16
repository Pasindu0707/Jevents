/**
 * Data model for a wedding invitation ("couple") — the single source of truth
 * shared by the public page (/:slug), the templates, and the future admin.
 *
 * MVP storage: one JSON file per couple in src/data/couples/*.json, read through
 * lib/couples.ts. No database. When a backend lands (Task 2) the same shape is
 * what the API returns, so callers don't change.
 */

/** Which visual template renders the invitation. */
export type TemplateId =
  | 'classic-floral'
  | 'luxury-gold'
  | 'minimal-modern'
  | 'romantic-story'
  | 'traditional-sri-lankan'

/** Site language. en = English, si = Sinhala, ta = Tamil. */
export type Language = 'en' | 'si' | 'ta'

/** Named typography pairing a template understands. */
export type FontPreset = 'classic-serif' | 'modern-sans' | 'elegant-script' | 'minimal'

export interface GalleryImage {
  src: string
  alt?: string
  caption?: string
}

/** One moment in the wedding programme (ceremony, reception, …). */
export interface EventItem {
  title: string
  /** ISO date (YYYY-MM-DD) or a human label. */
  date?: string
  /** e.g. "4:00 PM". */
  time?: string
  venueName?: string
  venueAddress?: string
  /** Google Maps link. */
  mapUrl?: string
  description?: string
  /** Optional lucide icon name. */
  icon?: string
}

/** RSVP behaviour. Submissions POST to a Google Apps Script Web App. */
export interface RsvpSettings {
  enabled: boolean
  /** ISO date after which RSVPs close. */
  deadline?: string
  /**
   * Public Google Apps Script Web App URL the form POSTs to. This is NOT a
   * secret — the Sheet id and any keys live inside the script, server-side.
   */
  googleScriptUrl?: string
  /** Shown after a successful submission. */
  successMessage?: string
  /** Shown instead of the form when `enabled` is false. */
  disabledMessage?: string
  /** Optional prompt shown above the form. */
  message?: string
  allowPlusOnes?: boolean
  maxGuests?: number
}

/** SEO + WhatsApp/social link-preview metadata. */
export interface ShareData {
  title?: string
  description?: string
  /** og:image — absolute or /public path. */
  image?: string
}

export interface CoupleData {
  /** URL slug — the public page is /:slug. Must be unique. */
  slug: string
  /** Only published couples are shown publicly (admin toggles this). */
  published: boolean
  template: TemplateId

  // Couple
  brideName: string
  groomName: string
  /** ISO datetime of the main event — drives the countdown. */
  weddingDate: string
  hashtag?: string
  language: Language

  // Theme
  primaryColor: string
  secondaryColor: string
  fontPreset: FontPreset

  // Media (URLs or /public/assets paths)
  heroImage?: string
  coverVideo?: string
  backgroundImage?: string
  backgroundMusic?: string

  // Content
  welcomeMessage?: string
  loveStory?: string
  gallery: GalleryImage[]
  events: EventItem[]

  // RSVP
  rsvp: RsvpSettings

  // SEO / WhatsApp sharing
  share?: ShareData

  // Audit (set by admin/backend), ISO datetimes
  createdAt?: string
  updatedAt?: string
}
