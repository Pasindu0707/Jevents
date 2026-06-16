import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getCoupleBySlug } from '@/lib/couples'
import { isAuthenticated } from '@/features/admin/auth'
import { JsonOutput } from '@/features/admin/JsonOutput'
import { SortableList } from '@/features/admin/SortableList'
import { savePreview } from '@/features/admin/preview'
import {
  Area,
  Color,
  MediaField,
  Section,
  Select,
  Shell,
  Text,
  Toggle,
} from '@/features/admin/fields'
import { assetUrl } from '@/lib/media'
import type {
  CoupleData,
  EventItem,
  FontPreset,
  GalleryImage,
  Language,
  TemplateId,
} from '@/types/couple'

const TEMPLATES: TemplateId[] = [
  'classic-floral',
  'luxury-gold',
  'minimal-modern',
  'romantic-story',
  'traditional-sri-lankan',
]
const LANGUAGES: Language[] = ['en', 'si', 'ta']
const FONTS: FontPreset[] = ['classic-serif', 'modern-sans', 'elegant-script', 'minimal']

/** Editor rows carry a stable id for drag-and-drop; it's stripped on save. */
interface Row<T> {
  id: string
  value: T
}
let _rowId = 0
const newRow = <T,>(value: T): Row<T> => ({ id: `row-${_rowId++}`, value })

interface FormState {
  published: boolean
  template: TemplateId
  brideName: string
  groomName: string
  weddingDate: string
  hashtag: string
  language: Language
  primaryColor: string
  secondaryColor: string
  fontPreset: FontPreset
  heroImage: string
  coverVideo: string
  backgroundImage: string
  backgroundMusic: string
  welcomeMessage: string
  loveStory: string
  rsvpEnabled: boolean
  rsvpDeadline: string
  rsvpScriptUrl: string
  seoTitle: string
  seoDescription: string
  ogImage: string
}

function toForm(c: CoupleData): FormState {
  return {
    published: c.published,
    template: c.template,
    brideName: c.brideName,
    groomName: c.groomName,
    weddingDate: c.weddingDate,
    hashtag: c.hashtag ?? '',
    language: c.language,
    primaryColor: c.primaryColor,
    secondaryColor: c.secondaryColor,
    fontPreset: c.fontPreset,
    heroImage: c.heroImage ?? '',
    coverVideo: c.coverVideo ?? '',
    backgroundImage: c.backgroundImage ?? '',
    backgroundMusic: c.backgroundMusic ?? '',
    welcomeMessage: c.welcomeMessage ?? '',
    loveStory: c.loveStory ?? '',
    rsvpEnabled: c.rsvp.enabled,
    rsvpDeadline: c.rsvp.deadline ?? '',
    rsvpScriptUrl: c.rsvp.googleScriptUrl ?? '',
    seoTitle: c.share?.title ?? '',
    seoDescription: c.share?.description ?? '',
    ogImage: c.share?.image ?? '',
  }
}

/** Merge edited fields, events and gallery back onto the original couple. */
function toCouple(
  c: CoupleData,
  f: FormState,
  events: EventItem[],
  gallery: GalleryImage[],
): CoupleData {
  return {
    ...c,
    published: f.published,
    template: f.template,
    brideName: f.brideName,
    groomName: f.groomName,
    weddingDate: f.weddingDate,
    hashtag: f.hashtag,
    language: f.language,
    primaryColor: f.primaryColor,
    secondaryColor: f.secondaryColor,
    fontPreset: f.fontPreset,
    heroImage: f.heroImage,
    coverVideo: f.coverVideo,
    backgroundImage: f.backgroundImage,
    backgroundMusic: f.backgroundMusic,
    welcomeMessage: f.welcomeMessage,
    loveStory: f.loveStory,
    gallery,
    events,
    rsvp: {
      ...c.rsvp,
      enabled: f.rsvpEnabled,
      deadline: f.rsvpDeadline,
      googleScriptUrl: f.rsvpScriptUrl,
    },
    share: {
      ...c.share,
      title: f.seoTitle,
      description: f.seoDescription,
      image: f.ogImage,
    },
    updatedAt: new Date().toISOString(),
  }
}

/**
 * Admin couple editor at /admin/couples/:slug/edit (steps 15, 17–21).
 *
 * Grouped form with drag-and-drop event/gallery ordering, media URL fields with
 * previews, a draft Preview button, and a JSON export (no backend yet).
 */
export function CoupleEditPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  if (!isAuthenticated()) return <Navigate to="/admin" replace />

  const couple = getCoupleBySlug(slug)
  if (!couple) {
    return (
      <Shell>
        <p className="text-slate-600">No couple found at /{slug}.</p>
        <Link to="/admin" className="text-sm underline underline-offset-4">
          Back to dashboard
        </Link>
      </Shell>
    )
  }

  return <Editor couple={couple} />
}

function Editor({ couple }: { couple: CoupleData }) {
  const [form, setForm] = useState<FormState>(() => toForm(couple))
  const [events, setEvents] = useState<Row<EventItem>[]>(() => couple.events.map((e) => newRow({ ...e })))
  const [gallery, setGallery] = useState<Row<GalleryImage>[]>(() =>
    couple.gallery.map((g) => newRow({ ...g })),
  )
  const [output, setOutput] = useState<string | null>(null)

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  const build = () =>
    toCouple(couple, form, events.map((r) => r.value), gallery.map((r) => r.value))

  function updateEvent(id: string, key: keyof EventItem, value: string) {
    setEvents((prev) => prev.map((r) => (r.id === id ? { ...r, value: { ...r.value, [key]: value } } : r)))
  }
  function updateImage(id: string, key: keyof GalleryImage, value: string) {
    setGallery((prev) => prev.map((r) => (r.id === id ? { ...r, value: { ...r.value, [key]: value } } : r)))
  }

  function handleSave() {
    setOutput(JSON.stringify(build(), null, 2))
  }

  function handlePreview() {
    savePreview(build())
    window.open(`${import.meta.env.BASE_URL}admin/preview`, '_blank', 'noopener')
  }

  return (
    <Shell>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to="/admin" className="text-sm text-slate-500 underline underline-offset-4">
            ← Dashboard
          </Link>
          <h1 className="mt-1 font-display text-2xl text-slate-900">
            Edit · {couple.brideName} &amp; {couple.groomName}
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlePreview}
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            Preview draft
          </button>
          <Link
            to={`/${couple.slug}`}
            target="_blank"
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50"
          >
            View live ↗
          </Link>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <Section title="Status & template">
          <Toggle label="Published" checked={form.published} onChange={(v) => set('published', v)} />
          <p className="rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
            No database yet, so publishing is a manual deploy step:
            <br />• <strong>To publish:</strong> turn Published on → Save → download JSON → replace{' '}
            <code>src/data/couples/{couple.slug}.json</code> → redeploy.
            <br />• <strong>To unpublish:</strong> turn Published off → Save → download → replace →
            redeploy. While off, the public page shows “This invitation is not published yet.”
          </p>
          <Select
            label="Template"
            value={form.template}
            options={TEMPLATES}
            onChange={(v) => set('template', v as TemplateId)}
          />
        </Section>

        <Section title="Couple">
          <Text label="Bride name" value={form.brideName} onChange={(v) => set('brideName', v)} />
          <Text label="Groom name" value={form.groomName} onChange={(v) => set('groomName', v)} />
          <Text
            label="Wedding date (ISO)"
            value={form.weddingDate}
            onChange={(v) => set('weddingDate', v)}
            placeholder="2026-12-20T16:00:00+05:30"
          />
          <Text label="Hashtag" value={form.hashtag} onChange={(v) => set('hashtag', v)} />
          <Select
            label="Language"
            value={form.language}
            options={LANGUAGES}
            onChange={(v) => set('language', v as Language)}
          />
        </Section>

        <Section title="Theme">
          <Color label="Primary colour" value={form.primaryColor} onChange={(v) => set('primaryColor', v)} />
          <Color
            label="Secondary colour"
            value={form.secondaryColor}
            onChange={(v) => set('secondaryColor', v)}
          />
          <Select
            label="Font preset"
            value={form.fontPreset}
            options={FONTS}
            onChange={(v) => set('fontPreset', v as FontPreset)}
          />
        </Section>

        <Section title="Media">
          <p className="rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
            Upload images, video and music to a public file host (Cloudinary, Cloudflare R2,
            imgix, …) or place them in <code>/public/assets</code>, then paste the URL here.
          </p>
          <MediaField label="Hero image URL" kind="image" value={form.heroImage} onChange={(v) => set('heroImage', v)} />
          <MediaField
            label="Background image URL"
            kind="image"
            value={form.backgroundImage}
            onChange={(v) => set('backgroundImage', v)}
          />
          <MediaField label="Cover video URL" kind="video" value={form.coverVideo} onChange={(v) => set('coverVideo', v)} />
          <MediaField
            label="Background music URL"
            kind="audio"
            value={form.backgroundMusic}
            onChange={(v) => set('backgroundMusic', v)}
          />
        </Section>

        <Section title="Content">
          <Area
            label="Welcome message"
            value={form.welcomeMessage}
            onChange={(v) => set('welcomeMessage', v)}
          />
          <Area label="Love story" value={form.loveStory} onChange={(v) => set('loveStory', v)} />
        </Section>

        {/* Events — drag to reorder (steps 17 & 19) */}
        <Section title="Events">
          {events.length === 0 && <p className="text-sm text-slate-400">No events yet.</p>}
          <SortableList
            items={events}
            onChange={setEvents}
            renderItem={(row, index) => (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Event {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => setEvents((prev) => prev.filter((r) => r.id !== row.id))}
                    className="text-xs font-medium text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-3 space-y-3">
                  <Text label="Title" value={row.value.title} onChange={(v) => updateEvent(row.id, 'title', v)} />
                  <Text label="Time" value={row.value.time ?? ''} onChange={(v) => updateEvent(row.id, 'time', v)} />
                  <Text
                    label="Venue name"
                    value={row.value.venueName ?? ''}
                    onChange={(v) => updateEvent(row.id, 'venueName', v)}
                  />
                  <Text
                    label="Address"
                    value={row.value.venueAddress ?? ''}
                    onChange={(v) => updateEvent(row.id, 'venueAddress', v)}
                  />
                  <Text
                    label="Map URL"
                    value={row.value.mapUrl ?? ''}
                    onChange={(v) => updateEvent(row.id, 'mapUrl', v)}
                  />
                  <Area
                    label="Notes"
                    value={row.value.description ?? ''}
                    onChange={(v) => updateEvent(row.id, 'description', v)}
                  />
                </div>
              </>
            )}
          />
          <button
            type="button"
            onClick={() => setEvents((prev) => [...prev, newRow({ title: '' })])}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-100"
          >
            + Add event
          </button>
        </Section>

        {/* Gallery — drag to reorder (steps 18 & 19) */}
        <Section title="Gallery">
          {gallery.length === 0 && <p className="text-sm text-slate-400">No images yet.</p>}
          <SortableList
            items={gallery}
            onChange={setGallery}
            renderItem={(row) => (
              <div className="flex gap-3">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded bg-slate-200">
                  {row.value.src.trim() && (
                    <img
                      src={assetUrl(row.value.src)}
                      alt={row.value.alt ?? ''}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 space-y-3">
                  <Text label="Image URL" value={row.value.src} onChange={(v) => updateImage(row.id, 'src', v)} />
                  <Text label="Alt text" value={row.value.alt ?? ''} onChange={(v) => updateImage(row.id, 'alt', v)} />
                </div>
                <button
                  type="button"
                  onClick={() => setGallery((prev) => prev.filter((r) => r.id !== row.id))}
                  className="self-start text-xs font-medium text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            )}
          />
          <button
            type="button"
            onClick={() => setGallery((prev) => [...prev, newRow({ src: '', alt: '' })])}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-100"
          >
            + Add image
          </button>
        </Section>

        <Section title="RSVP">
          <Toggle label="RSVP enabled" checked={form.rsvpEnabled} onChange={(v) => set('rsvpEnabled', v)} />
          <Text
            label="RSVP deadline (ISO)"
            value={form.rsvpDeadline}
            onChange={(v) => set('rsvpDeadline', v)}
          />
          <Text
            label="Google Apps Script URL"
            value={form.rsvpScriptUrl}
            onChange={(v) => set('rsvpScriptUrl', v)}
          />
        </Section>

        <Section title="SEO & WhatsApp sharing">
          <Text label="SEO title" value={form.seoTitle} onChange={(v) => set('seoTitle', v)} />
          <Area
            label="SEO description"
            value={form.seoDescription}
            onChange={(v) => set('seoDescription', v)}
          />
          <MediaField label="OG image URL" kind="image" value={form.ogImage} onChange={(v) => set('ogImage', v)} />
        </Section>
      </div>

      <div className="mt-8">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Save (generate JSON)
        </button>
      </div>

      {output && (
        <JsonOutput
          json={output}
          filename={`${couple.slug}.json`}
          note={
            <>
              Copy this (or download) and replace <code>src/data/couples/{couple.slug}.json</code>,
              then redeploy.
            </>
          }
        />
      )}
    </Shell>
  )
}
