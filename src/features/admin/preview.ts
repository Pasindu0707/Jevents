import type { CoupleData } from '@/types/couple'

/**
 * Temporary draft preview storage (step 21).
 *
 * The editor writes the currently-edited CoupleData here, then opens
 * /admin/preview which reads it back and renders it. localStorage is shared
 * across tabs on the same origin, so the preview can open in a new tab. This
 * never touches public pages — they only read src/data/couples/*.json.
 */
const PREVIEW_KEY = 'jevents.preview'

export function savePreview(couple: CoupleData): void {
  localStorage.setItem(PREVIEW_KEY, JSON.stringify(couple))
}

export function loadPreview(): CoupleData | null {
  try {
    const raw = localStorage.getItem(PREVIEW_KEY)
    return raw ? (JSON.parse(raw) as CoupleData) : null
  } catch {
    return null
  }
}
