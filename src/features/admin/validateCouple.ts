import { isValidSlug } from '@/lib/format'
import type {
  CoupleData,
  FontPreset,
  GalleryImage,
  Language,
  RsvpSettings,
  TemplateId,
} from '@/types/couple'

const TEMPLATES: TemplateId[] = [
  'classic-floral',
  'luxury-gold',
  'minimal-modern',
  'romantic-story',
  'traditional-sri-lankan',
]
const LANGUAGES: Language[] = ['en', 'si', 'ta']
const FONTS: FontPreset[] = ['classic-serif', 'modern-sans', 'elegant-script', 'minimal']

type Result =
  | { ok: true; couple: CoupleData }
  | { ok: false; errors: string[] }

function str(v: unknown): string {
  return typeof v === 'string' ? v : ''
}
function bool(v: unknown, fallback = false): boolean {
  return typeof v === 'boolean' ? v : fallback
}

/**
 * Validate arbitrary parsed JSON against the CoupleData shape and return a
 * cleaned object containing only known fields (with defaults filled). Used by
 * the admin Import page so pasted/uploaded data is checked before it's trusted.
 */
export function validateCouple(raw: unknown): Result {
  const errors: string[] = []
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    return { ok: false, errors: ['Top-level value must be a JSON object.'] }
  }
  const o = raw as Record<string, unknown>

  // Required
  const slug = str(o.slug)
  if (!slug) errors.push('`slug` is required.')
  else if (!isValidSlug(slug)) errors.push('`slug` may only contain lowercase letters, numbers and hyphens.')

  const brideName = str(o.brideName)
  if (!brideName) errors.push('`brideName` is required.')
  const groomName = str(o.groomName)
  if (!groomName) errors.push('`groomName` is required.')
  const weddingDate = str(o.weddingDate)
  if (!weddingDate) errors.push('`weddingDate` is required.')

  const template = str(o.template) as TemplateId
  if (!TEMPLATES.includes(template)) {
    errors.push(`\`template\` must be one of: ${TEMPLATES.join(', ')}.`)
  }
  const language = (str(o.language) || 'en') as Language
  if (!LANGUAGES.includes(language)) errors.push(`\`language\` must be one of: ${LANGUAGES.join(', ')}.`)
  const fontPreset = (str(o.fontPreset) || 'classic-serif') as FontPreset
  if (!FONTS.includes(fontPreset)) errors.push(`\`fontPreset\` must be one of: ${FONTS.join(', ')}.`)

  if (o.gallery !== undefined && !Array.isArray(o.gallery)) errors.push('`gallery` must be an array.')
  if (o.events !== undefined && !Array.isArray(o.events)) errors.push('`events` must be an array.')
  if (o.rsvp !== undefined && (typeof o.rsvp !== 'object' || o.rsvp === null)) {
    errors.push('`rsvp` must be an object.')
  }

  if (errors.length > 0) return { ok: false, errors }

  // Clean: keep only known fields, fill defaults.
  const rsvpRaw = (o.rsvp ?? {}) as Record<string, unknown>
  const rsvp: RsvpSettings = {
    enabled: bool(rsvpRaw.enabled, true),
    deadline: str(rsvpRaw.deadline),
    googleScriptUrl: str(rsvpRaw.googleScriptUrl),
    successMessage: str(rsvpRaw.successMessage),
    disabledMessage: str(rsvpRaw.disabledMessage),
    message: str(rsvpRaw.message),
  }
  const shareRaw = (o.share ?? {}) as Record<string, unknown>

  const gallery: GalleryImage[] = Array.isArray(o.gallery)
    ? (o.gallery as Record<string, unknown>[]).map((g) => ({
        src: str(g.src),
        alt: str(g.alt),
        caption: str(g.caption),
      }))
    : []

  const events = Array.isArray(o.events)
    ? (o.events as Record<string, unknown>[]).map((e) => ({
        title: str(e.title),
        time: str(e.time),
        venueName: str(e.venueName),
        venueAddress: str(e.venueAddress),
        mapUrl: str(e.mapUrl),
        description: str(e.description),
      }))
    : []

  const couple: CoupleData = {
    slug,
    published: bool(o.published),
    template,
    brideName,
    groomName,
    weddingDate,
    hashtag: str(o.hashtag),
    language,
    primaryColor: str(o.primaryColor) || '#637953',
    secondaryColor: str(o.secondaryColor) || '#b07d3f',
    fontPreset,
    heroImage: str(o.heroImage),
    coverVideo: str(o.coverVideo),
    backgroundImage: str(o.backgroundImage),
    backgroundMusic: str(o.backgroundMusic),
    welcomeMessage: str(o.welcomeMessage),
    loveStory: str(o.loveStory),
    gallery,
    events,
    rsvp,
    share: {
      title: str(shareRaw.title),
      description: str(shareRaw.description),
      image: str(shareRaw.image),
    },
    createdAt: str(o.createdAt) || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return { ok: true, couple }
}
