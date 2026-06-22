import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useId, useMemo, useState } from 'react'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useTheme } from '@/hooks/useTheme'
import { LOGOS } from '@/lib/media'
import { IconButton } from '@/components/ui/IconButton'
import { OptimizedImage } from '@/components/ui/OptimizedImage'

type NavLink = { label: string; href: string }

const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Invitations', href: '#products' },
  // { label: 'Platform', href: '#platform' },
  // { label: 'Journey', href: '#journey' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
]

export function Navbar() {
  const { resolved, mode, setMode } = useTheme()
  const menuId = useId()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const activeHref = useActiveSection(NAV_LINKS.map((l) => l.href))

  const links = useMemo(() => NAV_LINKS, [])

  const toggle = () => setMode(resolved === 'dark' ? 'light' : 'dark')

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

  const linkClass = (href: string) =>
    [
      'relative text-xs font-medium tracking-[0.16em] uppercase transition-colors',
      activeHref === href
        ? 'text-[rgb(var(--fg))]'
        : 'text-[rgb(var(--muted-fg))] hover:text-[rgb(var(--fg))]',
      'after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:bg-[rgb(var(--accent))] after:transition-transform after:duration-300',
      activeHref === href ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
      'rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]/50',
    ].join(' ')

  return (
    <header className="sticky top-0 z-50 w-full">
      <a
        href="#main"
        className="sr-only focus:not-sr-only absolute left-4 top-4 z-60 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-2 text-xs font-semibold tracking-[0.22em] text-[rgb(var(--fg))] uppercase shadow-(--shadow-elev)"
      >
        Skip to content
      </a>
      <div
        className={[
          'transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-out',
          isScrolled
            ? 'border-b border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.78)] shadow-(--shadow-soft) backdrop-blur-xl'
            : 'bg-[rgb(var(--bg)/0.55)] backdrop-blur-md',
        ].join(' ')}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
          <a
            href="#home"
            className="flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]/60"
          >
            <OptimizedImage
              src={LOGOS.icon}
              alt="J Events"
              className="h-10 w-10 rounded-full object-cover"
              priority
            />
            <span className="hidden font-display text-sm font-semibold tracking-[0.18em] text-[rgb(var(--fg))] uppercase sm:inline">
              J Events
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {links.map((l) => (
              <a key={l.href} href={l.href} className={linkClass(l.href)} aria-current={activeHref === l.href ? 'page' : undefined}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <a href="#contact" className="btn-primary hidden !w-auto px-5 py-2.5 md:inline-flex">
              Get Started
            </a>

            <IconButton
              onClick={toggle}
              label={mode === 'system' ? `Theme: system (${resolved})` : `Theme: ${resolved}`}
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--fg))] shadow-(--shadow-soft) hover:shadow-(--shadow-elev) lg:hidden"
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <div className="mx-auto max-w-6xl px-5 pb-6 md:px-8">
                <div className="glass-card p-5">
                  <nav aria-label="Mobile primary" className="grid gap-2">
                    {links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        onClick={() => setIsOpen(false)}
                        className={[
                          'rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
                          activeHref === l.href
                            ? 'bg-[rgb(var(--main-300)/0.35)] text-[rgb(var(--fg))]'
                            : 'text-[rgb(var(--fg))] hover:bg-[rgb(var(--bg))]',
                        ].join(' ')}
                        aria-current={activeHref === l.href ? 'page' : undefined}
                      >
                        {l.label}
                      </a>
                    ))}
                  </nav>
                  <div className="mt-4 grid gap-3">
                    <a href="#contact" onClick={() => setIsOpen(false)} className="btn-primary">
                      Get Started
                    </a>
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
