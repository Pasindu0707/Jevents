import { useEffect, type RefObject } from 'react'
import type { ThemeConfig } from '../types'

/**
 * TASK 1 — Global theme system.
 *
 * Reads the `theme` block from the couple JSON and injects it as CSS custom
 * properties. In Project A the invite page is mounted inside a `.invite-root`
 * wrapper (so its dark palette can't leak into the marketing/admin pages), so
 * the variables are written onto that wrapper element — passed in via
 * `targetRef` — instead of `document.documentElement`. Falls back to the
 * document root if no ref is supplied.
 *
 * Mapping to the base palette variables (defined in invite.css):
 *   primaryColor     -> --gold              (accent lines / decorative elements)
 *   accentTextColor  -> --accent-text       (highlighted words)
 *   secondaryColor   -> --secondary         (dark text / dark elements)
 *   backgroundColor  -> --bg / --bg-deep    (page background fallback)
 *   lineColor        -> --line              (divider / border lines)
 *   lineStyle        -> --line-style
 *   lineThickness    -> --line-thickness
 *   dividerStyle     -> [data-divider]      (consumed by .divider)
 */
export default function ThemeProvider({
  theme,
  targetRef,
}: {
  theme?: ThemeConfig
  targetRef?: RefObject<HTMLElement | null>
}) {
  useEffect(() => {
    const root = targetRef?.current ?? document.documentElement
    const set = (name: string, value?: string | number) => {
      if (value === undefined || value === null || value === '') {
        root.style.removeProperty(name)
      } else {
        root.style.setProperty(name, String(value))
      }
    }

    if (theme?.primaryColor) {
      set('--gold', theme.primaryColor)
      // Keep the "bright" accent in sync unless an explicit accent text is given.
      set('--gold-bright', theme.accentTextColor || theme.primaryColor)
      set('--primary', theme.primaryColor)
    }
    set('--accent-text', theme?.accentTextColor)
    set('--secondary', theme?.secondaryColor)

    if (theme?.backgroundColor) {
      set('--bg', theme.backgroundColor)
      set('--bg-deep', theme.backgroundColor)
      set('--bg-alt', theme.backgroundColor)
    }

    set('--line', theme?.lineColor)
    set('--line-style', theme?.lineStyle)
    set(
      '--line-thickness',
      theme?.lineThickness ? `${theme.lineThickness}px` : undefined,
    )

    // Section divider treatment drives a data-attribute the CSS keys off.
    if (theme?.dividerStyle) {
      root.dataset.divider = theme.dividerStyle
    } else {
      delete root.dataset.divider
    }

    return () => {
      // Reset on unmount so navigating between couples doesn't leak theme.
      ;[
        '--gold',
        '--gold-bright',
        '--primary',
        '--accent-text',
        '--secondary',
        '--bg',
        '--bg-deep',
        '--bg-alt',
        '--line',
        '--line-style',
        '--line-thickness',
      ].forEach((p) => root.style.removeProperty(p))
      delete root.dataset.divider
    }
  }, [theme, targetRef])

  return null
}
