/**
 * Per-couple custom domains.
 *
 * A premium couple can buy their own bare domain (e.g. shalinikushan.space) and
 * point it at the Netlify deploy of this app. When a request arrives on one of
 * these hostnames, the app opens that couple's invitation at the root URL —
 * so the address bar stays `shalinikushan.space`, never a slug or subpath.
 *
 * GitHub Pages can't do this (one custom domain per site), which is why the
 * couple domains live on Netlify; the main site is unaffected either way.
 *
 * To add a couple: map their hostname (and its www. form) to the slug of their
 * JSON file in public/data/<slug>.json, then add the domain in Netlify + point
 * its DNS. The value must match the file name exactly, ampersand and all.
 */
export const COUPLE_DOMAINS: Record<string, string> = {
  'shalinikushan.space': 'Shalini&Kushan',
  'www.shalinikushan.space': 'Shalini&Kushan',
}

/**
 * The couple slug this hostname should open, or undefined for the main site
 * (jevents.* / the netlify.app URL / localhost), which shows the marketing
 * homepage as normal. Case-insensitive on the host.
 */
export function coupleSlugForHost(
  hostname: string = typeof window !== 'undefined' ? window.location.hostname : '',
): string | undefined {
  return COUPLE_DOMAINS[hostname.toLowerCase()]
}
