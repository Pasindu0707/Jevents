import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useId, useMemo, useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { IconButton } from '../ui/IconButton'

type NavLink = { label: string; href: string }

export function Navbar() {
  const { resolved, mode, setMode } = useTheme()
  const menuId = useId()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const skipId = 'main'

  const links = useMemo<NavLink[]>(
    () => [
      { label: 'Home', href: '#home' },
      { label: 'Services', href: '#services' },
      { label: 'Journey', href: '#journey' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Packages', href: '#packages' },
      { label: 'Contact', href: '#contact' },
    ],
    [],
  )

  const toggle = () => {
    // Toggle between explicit light/dark to feel predictable.
    setMode(resolved === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [isOpen])

  return (
    <header className="sticky top-0 z-50 w-full">
      <a
        href={`#${skipId}`}
        className={[
          'sr-only focus:not-sr-only',
          'absolute left-4 top-4 z-60',
          'rounded-full bg-[rgb(var(--card))] px-4 py-2 text-xs font-semibold',
          'tracking-[0.22em] uppercase',
          'border border-[rgb(var(--border))] text-[rgb(var(--fg))]',
          'shadow-(--shadow-elev)',
        ].join(' ')}
      >
        Skip to content
      </a>
      <div
        className={[
          'transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-out',
          isScrolled
            ? [
                'border-b border-[rgb(var(--border))]',
                'bg-[rgb(var(--bg))/0.72] backdrop-blur-xl',
                'shadow-(--shadow-soft)',
              ].join(' ')
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-2 items-center px-5 py-4 md:grid-cols-3 md:px-8">
          <a
            href="#home"
            className="w-fit rounded-md text-sm font-semibold tracking-[0.22em] text-[rgb(var(--fg))] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]/60"
          >
            J Events
          </a>

          <nav className="hidden items-center justify-center gap-8 md:flex" aria-label="Primary">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={[
                  'relative text-xs font-medium tracking-[0.18em] uppercase',
                  'text-[rgb(var(--muted-fg))] hover:text-[rgb(var(--fg))]',
                  'after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-left',
                  'after:scale-x-0 after:bg-[rgb(var(--accent))] after:transition-transform after:duration-300 after:ease-out',
                  'hover:after:scale-x-100 focus-visible:after:scale-x-100',
                  'rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]/50',
                ].join(' ')}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <a
              href="#contact"
              className={[
                'hidden md:inline-flex',
                'items-center justify-center rounded-full px-5 py-2.5 text-xs font-semibold',
                'tracking-[0.22em] uppercase',
                'bg-[rgb(var(--primary))] text-[rgb(var(--primary-fg))]',
                'shadow-(--shadow-soft) hover:shadow-(--shadow-elev) hover:opacity-95',
                'focus-visible:outline-none',
              ].join(' ')}
            >
              Plan an Event
            </a>

            <IconButton
              onClick={toggle}
              label={
                mode === 'system'
                  ? `Theme: system (${resolved})`
                  : `Theme: ${resolved}`
              }
              icon={
                resolved === 'dark' ? (
                  <Sun size={18} className="text-[rgb(var(--accent))]" />
                ) : (
                  <Moon size={18} className="text-[rgb(var(--primary))]" />
                )
              }
            />

            <button
              type="button"
              className={[
                'inline-flex h-10 w-10 items-center justify-center rounded-full md:hidden',
                'border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--fg))]',
                'shadow-(--shadow-soft) hover:shadow-(--shadow-elev)',
              ].join(' ')}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls={menuId}
              onClick={() => setIsOpen((v) => !v)}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen ? (
            <motion.div
              key="mobileMenu"
              id={menuId}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="md:hidden"
            >
              <div className="mx-auto max-w-6xl px-5 pb-6 md:px-8">
                <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 shadow-(--shadow-elev)">
                  <nav aria-label="Mobile primary" className="grid gap-3">
                    {links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        onClick={() => setIsOpen(false)}
                        className={[
                          'group flex items-center justify-between rounded-2xl px-4 py-3',
                          'text-sm font-medium',
                          'text-[rgb(var(--fg))] hover:bg-[rgb(var(--bg))]',
                          'focus-visible:outline-none',
                        ].join(' ')}
                      >
                        <span className="tracking-wide">{l.label}</span>
                        <span className="h-px w-10 origin-left scale-x-0 bg-[rgb(var(--accent))] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                      </a>
                    ))}
                  </nav>

                  <div className="mt-5 grid gap-3">
                    <a
                      href="#contact"
                      onClick={() => setIsOpen(false)}
                      className={[
                        'inline-flex items-center justify-center rounded-full px-6 py-3 text-xs font-semibold',
                        'tracking-[0.22em] uppercase',
                        'bg-[rgb(var(--primary))] text-[rgb(var(--primary-fg))]',
                        'shadow-(--shadow-soft) hover:shadow-(--shadow-elev) hover:opacity-95',
                      ].join(' ')}
                    >
                      Plan an Event
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        toggle()
                      }}
                      className={[
                        'inline-flex items-center justify-center rounded-full px-6 py-3 text-xs font-semibold',
                        'tracking-[0.22em] uppercase',
                        'border border-[rgb(var(--border))] bg-[rgb(var(--bg))] text-[rgb(var(--fg))]',
                        'shadow-(--shadow-soft) hover:shadow-(--shadow-elev)',
                      ].join(' ')}
                    >
                      {resolved === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  )
}

