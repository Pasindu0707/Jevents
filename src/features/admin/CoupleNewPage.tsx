import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { isAuthenticated } from '@/features/admin/auth'
import { JsonOutput } from '@/features/admin/JsonOutput'
import { Section, Select, Shell, Text } from '@/features/admin/fields'
import { isValidSlug, slugify } from '@/lib/format'
import { getCoupleBySlug } from '@/lib/couples'
import type { CoupleData, TemplateId } from '@/types/couple'

const TEMPLATES: TemplateId[] = [
  'classic-floral',
  'luxury-gold',
  'minimal-modern',
  'romantic-story',
  'traditional-sri-lankan',
]

/** Build a fresh CoupleData from the minimal create fields + sensible defaults. */
function buildCouple(input: {
  slug: string
  brideName: string
  groomName: string
  weddingDate: string
  template: TemplateId
}): CoupleData {
  const now = new Date().toISOString()
  return {
    slug: input.slug,
    published: false,
    template: input.template,
    brideName: input.brideName,
    groomName: input.groomName,
    weddingDate: input.weddingDate,
    hashtag: '',
    language: 'en',
    primaryColor: '#637953',
    secondaryColor: '#b07d3f',
    fontPreset: 'classic-serif',
    heroImage: '',
    coverVideo: '',
    backgroundImage: '',
    backgroundMusic: '',
    welcomeMessage: '',
    loveStory: '',
    gallery: [],
    events: [],
    rsvp: {
      enabled: true,
      deadline: '',
      googleScriptUrl: '',
      successMessage: 'Thank you! Your RSVP has been received.',
      disabledMessage: '',
      message: '',
    },
    share: { title: '', description: '', image: '' },
    createdAt: now,
    updatedAt: now,
  }
}

/**
 * Create-new-couple flow at /admin/couples/new (step 16).
 *
 * Collects the essentials, suggests a slug from the names, validates it, and on
 * submit generates a full default CoupleData JSON to download and drop into
 * src/data/couples/. No database yet.
 */
export function CoupleNewPage() {
  if (!isAuthenticated()) return <Navigate to="/admin" replace />
  return <NewForm />
}

function NewForm() {
  const [brideName, setBrideName] = useState('')
  const [groomName, setGroomName] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [weddingDate, setWeddingDate] = useState('')
  const [template, setTemplate] = useState<TemplateId>('classic-floral')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [output, setOutput] = useState<string | null>(null)

  // Auto-suggest the slug from the names until the admin edits it themselves.
  function suggestSlug(bride: string, groom: string) {
    if (!slugTouched) setSlug(slugify(`${bride}-${groom}`))
  }

  function validate(): Record<string, string> {
    const next: Record<string, string> = {}
    if (!brideName.trim()) next.brideName = 'Required.'
    if (!groomName.trim()) next.groomName = 'Required.'
    if (!weddingDate.trim()) next.weddingDate = 'Required.'
    if (!slug.trim()) next.slug = 'Required.'
    else if (!isValidSlug(slug)) next.slug = 'Only lowercase letters, numbers and hyphens.'
    else if (getCoupleBySlug(slug)) next.slug = 'A couple with this slug already exists.'
    return next
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return
    const couple = buildCouple({
      slug: slug.trim(),
      brideName: brideName.trim(),
      groomName: groomName.trim(),
      weddingDate: weddingDate.trim(),
      template,
    })
    setOutput(JSON.stringify(couple, null, 2))
  }

  return (
    <Shell>
      <Link to="/admin" className="text-sm text-slate-500 underline underline-offset-4">
        ← Dashboard
      </Link>
      <h1 className="mt-1 font-display text-2xl text-slate-900">New couple</h1>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
        <Section title="Essentials">
          <Text
            label="Bride name"
            value={brideName}
            error={errors.brideName}
            onChange={(v) => {
              setBrideName(v)
              suggestSlug(v, groomName)
            }}
          />
          <Text
            label="Groom name"
            value={groomName}
            error={errors.groomName}
            onChange={(v) => {
              setGroomName(v)
              suggestSlug(brideName, v)
            }}
          />
          <Text
            label="Slug (the public URL: /your-slug)"
            value={slug}
            error={errors.slug}
            placeholder="bride-and-groom"
            onChange={(v) => {
              setSlugTouched(true)
              setSlug(v)
            }}
          />
          <Text
            label="Wedding date (ISO)"
            value={weddingDate}
            error={errors.weddingDate}
            placeholder="2026-12-20T16:00:00+05:30"
            onChange={setWeddingDate}
          />
          <Select
            label="Template"
            value={template}
            options={TEMPLATES}
            onChange={(v) => setTemplate(v as TemplateId)}
          />
        </Section>

        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Generate couple JSON
        </button>
      </form>

      {output && (
        <JsonOutput
          json={output}
          filename={`${slug}.json`}
          note={
            <>
              Save this as <code>{slug}.json</code> in <code>src/data/couples/</code>, then
              redeploy. The couple starts as a draft (<code>published: false</code>) — edit and
              publish it from the dashboard.
            </>
          }
        />
      )}
    </Shell>
  )
}
