import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Puck, type Data } from '@measured/puck'
import '@measured/puck/puck.css'
import { config, coupleDataToPuck, puckToCoupleData, emptyPuckData } from './puck.config'
import type { CoupleData } from '@/features/invite/types'
// Scoped invite palette (.invite-root) + section primitives, so the live
// preview inside Puck renders with the real wedding styling.
import '@/features/invite/invite.css'
import './admin.css'

function downloadJSON(filename: string, obj: unknown) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export default function AdminPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const slug = params.get('couple') || 'dewmini-janni'

  const [initialData, setInitialData] = useState<Data | null>(null)
  // Latest editor state, kept in a ref so the toolbar button can export it.
  const liveData = useRef<Data | null>(null)
  // Becomes true once the user edits, so "Back" can warn before discarding.
  const dirtyRef = useRef(false)

  function handleBack() {
    if (
      dirtyRef.current &&
      !window.confirm('Leave the editor? Export your JSON first or unsaved changes are lost.')
    ) {
      return
    }
    navigate('/admin/invitations')
  }

  useEffect(() => {
    let cancelled = false
    setInitialData(null)

    fetch(`${import.meta.env.BASE_URL}data/${slug}.json`)
      .then((res) => (res.ok ? (res.json() as Promise<CoupleData>) : Promise.reject()))
      .then((json) => {
        if (cancelled) return
        const puck = coupleDataToPuck(json)
        liveData.current = puck
        setInitialData(puck)
      })
      .catch(() => {
        if (cancelled) return
        liveData.current = emptyPuckData
        setInitialData(emptyPuckData)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  const handleExport = () => {
    const current = liveData.current
    if (!current) return
    const couple = puckToCoupleData(current, slug)
    downloadJSON(`${couple.slug || slug}.json`, couple)
  }

  if (!initialData) {
    return <div className="admin-loading">Loading editor…</div>
  }

  return (
    <div className="admin-root">
      <Puck
        key={slug}
        config={config}
        data={initialData}
        iframe={{ enabled: false }}
        headerTitle={`Jevents · ${slug}`}
        onChange={(data) => {
          liveData.current = data
          dirtyRef.current = true
        }}
        renderHeaderActions={() => (
          <div className="admin-actions">
            <button type="button" className="admin-back" onClick={handleBack}>
              ← Back
            </button>
            <button type="button" className="admin-export" onClick={handleExport}>
              Save / Export JSON
            </button>
          </div>
        )}
      />
    </div>
  )
}
