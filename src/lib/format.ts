/** Shared formatting helpers used across templates and the admin. */

/** Turn free text into a URL-safe slug: lowercase, hyphenated, a–z/0–9 only. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** A slug is valid when it contains only lowercase letters, numbers and hyphens. */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug)
}

/**
 * Loose check for a usable media URL: a full http(s) URL or a /public path.
 * Empty is treated as valid (the field is simply unset).
 */
export function isLikelyUrl(value: string): boolean {
  const v = value.trim()
  return v === '' || /^(https?:\/\/|\/)/.test(v)
}


/** "Sunday, 20 December 2026" — returns the raw value if it can't be parsed. */
export function formatWeddingDate(value: string): string {
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
