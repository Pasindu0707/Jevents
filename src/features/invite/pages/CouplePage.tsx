import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { CoupleData } from '../types'
import { renderSection } from '../registry'
import { EntranceGateContext } from '../lib/entranceGate'
import MusicPlayer from '../components/MusicPlayer'
import ThemeProvider from '../components/ThemeProvider'
import AgencyFooter from '../components/AgencyFooter'
import '../invite.css'

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; data: CoupleData }

export default function CouplePage({ slugOverride }: { slugOverride?: string } = {}) {
  const params = useParams<{ coupleSlug: string }>()
  // On a per-couple custom domain the invite is served at "/", so the slug
  // comes from the domain map rather than the URL. Falls back to the route
  // param for the normal /:coupleSlug pages.
  const coupleSlug = slugOverride ?? params.coupleSlug
  const [state, setState] = useState<State>({ status: 'loading' })
  // The per-couple theme is written onto this wrapper (not <html>) so the dark
  // invite palette can't leak into the marketing site / admin.
  const rootRef = useRef<HTMLDivElement>(null)

  // Sections hold their scroll-reveal until the entrance gate opens. A couple
  // with no entrance section has nothing to wait for, so it starts open.
  const hasEntrance =
    state.status === 'ready' && state.data.sections.some((s) => s.type === 'entrance')
  const [gateOpen, setGateOpen] = useState(false)
  const openGate = useCallback(() => setGateOpen(true), [])
  const gate = useMemo(
    () => ({ open: gateOpen || !hasEntrance, openGate }),
    [gateOpen, hasEntrance, openGate],
  )

  // The entrance locks body scroll, so the document was a viewport tall while it
  // showed. Recompute trigger positions now that the real page height applies.
  useEffect(() => {
    if (gate.open) ScrollTrigger.refresh()
  }, [gate.open])

  useEffect(() => {
    if (!coupleSlug) return
    let cancelled = false
    setState({ status: 'loading' })
    setGateOpen(false)

    // BASE_URL is '/Jevents/' here, so the JSON lives at /Jevents/data/<slug>.json.
    fetch(`${import.meta.env.BASE_URL}data/${coupleSlug}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`No invitation found for "${coupleSlug}".`)
        return res.json() as Promise<CoupleData>
      })
      .then((data) => {
        if (cancelled) return
        document.title = data.meta?.title ?? 'J Events'
        setState({ status: 'ready', data })
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ status: 'error', message: err.message })
      })

    return () => {
      cancelled = true
    }
  }, [coupleSlug])

  if (state.status === 'loading') {
    return (
      <div className="invite-root" ref={rootRef}>
        <div className="app-loader">
          <div className="app-loader__ring" />
        </div>
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="invite-root" ref={rootRef}>
        <div className="page-state">
          <span className="page-state__mark">&amp;</span>
          <h1>Invitation not found</h1>
          <p>{state.message}</p>
        </div>
      </div>
    )
  }

  return (
    <EntranceGateContext.Provider value={gate}>
      <div className="invite-root" ref={rootRef}>
        <ThemeProvider theme={state.data.theme} targetRef={rootRef} />
        <main>
          {state.data.sections.map((section, i) => (
            <Fragment key={section.id ?? i}>
              {renderSection(section, i)}
              {/* Themed separator after every section except the last. */}
              {i < state.data.sections.length - 1 && <hr className="section-hr" />}
            </Fragment>
          ))}
        </main>
        <AgencyFooter />
        {state.data.musicUrl && <MusicPlayer src={state.data.musicUrl} />}
      </div>
    </EntranceGateContext.Provider>
  )
}
