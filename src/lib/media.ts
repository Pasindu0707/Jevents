/** Local brand assets — served from /public/assets */

/** Prefix public asset paths with Vite base (e.g. /Jevents/) */
export function assetUrl(path: string) {
  const clean = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${clean}`
}

const base = assetUrl('assets')

export const LOGOS = {
  icon: `${base}/logos/logo-icon.png`,
  full: `${base}/logos/logo-full.png`,
  transparent: `${base}/logos/logo-transparent.png`,
} as const

export const PHOTOS = {
  hero: `${base}/photos/hero.jpg`,
  wedding01: `${base}/photos/wedding-01.jpg`,
  wedding02: `${base}/photos/wedding-02.jpg`,
  wedding03: `${base}/photos/wedding-03.jpg`,
  wedding04: `${base}/photos/wedding-04.jpg`,
  wedding05: `${base}/photos/wedding-05.jpg`,
} as const

/** @deprecated Use PHOTOS.hero */
export const HERO_POSTER = PHOTOS.hero

export const HERO_IMAGE = PHOTOS.hero

/** Gallery & section imagery (client wedding photography) */
export const STOCK = {
  wedding: PHOTOS.wedding01,
  engagement: PHOTOS.wedding02,
  reception: PHOTOS.wedding03,
  corporate: PHOTOS.wedding04,
  birthday: PHOTOS.wedding05,
  private: PHOTOS.hero,
  planning: PHOTOS.wedding02,
  guests: PHOTOS.wedding01,
  budget: PHOTOS.wedding03,
  decor: PHOTOS.wedding04,
  timeline: PHOTOS.wedding05,
  onsite: PHOTOS.hero,
  journey: PHOTOS.wedding02,
  gallery1: PHOTOS.hero,
  gallery2: PHOTOS.wedding01,
  gallery3: PHOTOS.wedding02,
  gallery4: PHOTOS.wedding03,
  gallery5: PHOTOS.wedding04,
  gallery6: PHOTOS.wedding05,
} as const
