import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { CoupleData } from '../types'
import { renderSection } from '../registry'
import MusicPlayer from '../components/MusicPlayer'
import ThemeProvider from '../components/ThemeProvider'
import AgencyFooter from '../components/AgencyFooter'
import '../invite.css'

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; data: CoupleData }

export default function CouplePage() {
  const { coupleSlug } = useParams<{ coupleSlug: string }>()
  const [state, setState] = useState<State>({ status: 'loading' })
  // The per-couple theme is written onto this wrapper (not <html>) so the dark
  // invite palette can't leak into the marketing site / admin.
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!coupleSlug) return
    let cancelled = false
    setState({ status: 'loading' })

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
        <div className="page-state">
          <span className="page-state__mark">&amp;</span>
          <p>Loading…</p>
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
    <div className="invite-root" ref={rootRef}>
      <ThemeProvider theme={state.data.theme} targetRef={rootRef} />
      <main>{state.data.sections.map((section, i) => renderSection(section, i))}</main>
      <AgencyFooter />
      {state.data.musicUrl && <MusicPlayer src={state.data.musicUrl} />}
    </div>
  )
}
