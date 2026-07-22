import type { CSSProperties } from 'react'
import type { SectionStyle } from '../../types'

/**
 * TASK 2 — Translate a SectionStyle into the `--s-*` CSS custom properties the
 * section CSS consumes. Only emits a variable when the value is set, so unset
 * fields fall back to the global theme defaults via `var(--s-x, <fallback>)`.
 */
/**
 * Build the CSS `linear-gradient(...)` for a section whose backgroundType is
 * 'gradient'. Returns undefined unless at least two stops are set, so a
 * half-configured gradient falls back to the plain background rather than
 * rendering a broken value.
 */
export function buildGradient(style?: SectionStyle): string | undefined {
  if (!style) return undefined
  const { gradientFrom, gradientVia, gradientTo, gradientAngle = 135 } = style
  const stops = [gradientFrom, gradientVia, gradientTo].filter(Boolean)
  if (stops.length < 2) return undefined
  return `linear-gradient(${gradientAngle}deg, ${stops.join(', ')})`
}

export function sectionStyleVars(style?: SectionStyle): CSSProperties {
  const vars: Record<string, string> = {}
  if (!style) return vars as CSSProperties

  const px = (key: string, value: number | undefined) => {
    if (value !== undefined) vars[key] = `${value}px`
  }
  const raw = (key: string, value: string | undefined) => {
    if (value) vars[key] = value
  }

  raw('--s-heading-font', style.headingFont)
  raw('--s-body-font', style.bodyFont)
  px('--s-heading-size', style.headingFontSize)
  px('--s-body-size', style.bodyFontSize)
  raw('--s-heading-color', style.headingColor)
  raw('--s-body-color', style.bodyColor)
  raw('--s-accent-color', style.accentColor)

  // Layout. minHeight accepts a number (px) or a CSS length / 'auto'.
  if (style.minHeight !== undefined) {
    vars['--s-min-height'] =
      typeof style.minHeight === 'number' ? `${style.minHeight}px` : style.minHeight
  }
  px('--s-pad-top', style.paddingTop)
  px('--s-pad-bottom', style.paddingBottom)

  // Names & labels
  raw('--s-name-color', style.nameColor)
  px('--s-name-size', style.nameFontSize)
  raw('--s-label-color', style.labelColor)
  px('--s-label-size', style.labelFontSize)

  // Couple photos
  px('--s-image-size', style.imageSize)
  px('--s-image-gap', style.imageGap)
  px('--s-column-gap', style.columnGap)

  // Events
  raw('--s-date-color', style.dateColor)
  px('--s-date-size', style.dateFontSize)
  if (style.dateFontWeight !== undefined) {
    vars['--s-date-weight'] = String(style.dateFontWeight)
  }
  raw('--s-time-color', style.timeColor)
  px('--s-time-size', style.timeFontSize)
  if (style.timeFontWeight !== undefined) {
    vars['--s-time-weight'] = String(style.timeFontWeight)
  }
  if (style.timeLetterSpacing !== undefined) {
    vars['--s-time-tracking'] = `${style.timeLetterSpacing}em`
  }
  raw('--s-map-bg', style.mapButtonBgColor)
  raw('--s-map-color', style.mapButtonTextColor)
  raw('--s-map-border', style.mapButtonBorderColor)
  px('--s-map-radius', style.mapButtonRadius)
  px('--s-map-size', style.mapButtonFontSize)

  // Countdown
  raw('--s-number-color', style.numberColor)
  px('--s-number-size', style.numberFontSize)
  raw('--s-box-bg', style.boxBgColor)
  raw('--s-box-border', style.boxBorderColor)

  // Footer
  raw('--s-contact-color', style.contactColor)
  px('--s-contact-name-size', style.contactNameFontSize)
  // Phone numbers are long strings that can't be hyphenated, so a size that
  // looks right on desktop wraps and strands a digit on a phone. Treat the
  // configured value as a maximum and let narrow screens scale it down.
  if (style.contactPhoneFontSize !== undefined) {
    vars['--s-contact-phone-size'] = `min(${style.contactPhoneFontSize}px, 8vw)`
  }

  return vars as CSSProperties
}
