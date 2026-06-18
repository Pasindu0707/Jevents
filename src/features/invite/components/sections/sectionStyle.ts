import type { CSSProperties } from 'react'
import type { SectionStyle } from '../../types'

/**
 * TASK 2 — Translate a SectionStyle into the `--s-*` CSS custom properties the
 * section CSS consumes. Only emits a variable when the value is set, so unset
 * fields fall back to the global theme defaults via `var(--s-x, <fallback>)`.
 */
export function sectionStyleVars(style?: SectionStyle): CSSProperties {
  const vars: Record<string, string> = {}
  if (!style) return vars as CSSProperties

  if (style.headingFont) vars['--s-heading-font'] = style.headingFont
  if (style.bodyFont) vars['--s-body-font'] = style.bodyFont
  if (style.headingFontSize) vars['--s-heading-size'] = `${style.headingFontSize}px`
  if (style.bodyFontSize) vars['--s-body-size'] = `${style.bodyFontSize}px`
  if (style.headingColor) vars['--s-heading-color'] = style.headingColor
  if (style.bodyColor) vars['--s-body-color'] = style.bodyColor
  if (style.accentColor) vars['--s-accent-color'] = style.accentColor

  return vars as CSSProperties
}
