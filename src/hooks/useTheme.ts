import { useEffect, useMemo, useState } from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'jevents.theme'

function getSystemPref(): Exclude<ThemeMode, 'system'> {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light'
}

function applyTheme(theme: Exclude<ThemeMode, 'system'>) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null
    return stored ?? 'system'
  })

  const resolved = useMemo<Exclude<ThemeMode, 'system'>>(() => {
    if (mode === 'system') return getSystemPref()
    return mode
  }, [mode])

  useEffect(() => {
    applyTheme(resolved)
  }, [resolved])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode)
  }, [mode])

  useEffect(() => {
    if (mode !== 'system') return
    const media = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!media) return
    const onChange = () => applyTheme(getSystemPref())
    media.addEventListener?.('change', onChange)
    return () => media.removeEventListener?.('change', onChange)
  }, [mode])

  return { mode, setMode, resolved }
}

