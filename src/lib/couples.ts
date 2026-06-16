import type { CoupleData } from '@/types/couple'

/**
 * Loads every couple stored as JSON in src/data/couples/*.json.
 *
 * This is the MVP "database" — no real DB. Vite's import.meta.glob bundles each
 * JSON file at build time. When a backend lands (Task 2) swap the body of these
 * helpers for API calls; callers keep using the same three functions.
 */
const modules = import.meta.glob<{ default: CoupleData }>(
  '../data/couples/*.json',
  { eager: true },
)

const couples: CoupleData[] = Object.values(modules).map((m) => m.default)

/** Every couple, published or not (admin use). */
export function getAllCouples(): CoupleData[] {
  return couples
}

/** Only published couples — what the public site should render. */
export function getPublishedCouples(): CoupleData[] {
  return couples.filter((c) => c.published)
}

/** Look up a single couple by its URL slug. Returns undefined if not found. */
export function getCoupleBySlug(slug: string): CoupleData | undefined {
  return couples.find((c) => c.slug === slug)
}
