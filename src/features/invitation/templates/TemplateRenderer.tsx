import type { ComponentType } from 'react'
import type { CoupleData, TemplateId } from '@/types/couple'
import { ClassicFloral } from '@/features/invitation/templates/ClassicFloral'
import { LuxuryGold } from '@/features/invitation/templates/LuxuryGold'
import { MinimalModern } from '@/features/invitation/templates/MinimalModern'
import { RomanticStory } from '@/features/invitation/templates/RomanticStory'
import { TraditionalSriLankan } from '@/features/invitation/templates/TraditionalSriLankan'

/** Maps a couple's `template` id to its component. */
const TEMPLATES: Record<TemplateId, ComponentType<{ couple: CoupleData }>> = {
  'classic-floral': ClassicFloral,
  'luxury-gold': LuxuryGold,
  'minimal-modern': MinimalModern,
  'romantic-story': RomanticStory,
  'traditional-sri-lankan': TraditionalSriLankan,
}

/**
 * Picks the template named in `couple.template` and renders it. Unknown values
 * (e.g. bad data) fall back to ClassicFloral so a page never breaks.
 */
export function TemplateRenderer({ couple }: { couple: CoupleData }) {
  const Template = TEMPLATES[couple.template] ?? ClassicFloral
  return <Template couple={couple} />
}
