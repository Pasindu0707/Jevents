import { useRef } from 'react'
import type { Config, Data } from '@measured/puck'
// Shared section engine lives in the invite feature — reuse it, don't duplicate.
import type { CoupleData, Section, SectionType } from '@/features/invite/types'
import EntranceSection from '@/features/invite/components/sections/EntranceSection'
import HeroSection from '@/features/invite/components/sections/HeroSection'
import CountdownSection from '@/features/invite/components/sections/CountdownSection'
import CoupleSection from '@/features/invite/components/sections/CoupleSection'
import StorySection from '@/features/invite/components/sections/StorySection'
import EventsSection from '@/features/invite/components/sections/EventsSection'
import TimelineSection from '@/features/invite/components/sections/TimelineSection'
import GallerySection from '@/features/invite/components/sections/GallerySection'
import RSVPSection from '@/features/invite/components/sections/RSVPSection'
import InquirySection from '@/features/invite/components/sections/InquirySection'
import FooterSection from '@/features/invite/components/sections/FooterSection'
import ThemeProvider from '@/features/invite/components/ThemeProvider'
import ImageUploadField from './fields/ImageUploadField'
import GalleryUploadField, { galleryUid } from './fields/GalleryUploadField'
import ColorField from './fields/ColorField'
import RangeField from './fields/RangeField'

/**
 * Live-preview host inside the Puck editor. Carries `.invite-root` so the
 * scoped invite palette variables resolve, and feeds its own element to
 * ThemeProvider so Global-Theme edits override the base values on this node.
 */
function AdminPreviewRoot({
  theme,
  children,
}: {
  theme?: CoupleData['theme']
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div className="invite-root admin-preview" ref={ref}>
      <ThemeProvider theme={theme} targetRef={ref} />
      {children}
    </div>
  )
}

const FONT_OPTIONS = [
  { label: 'Great Vibes', value: "'Great Vibes', cursive" },
  { label: 'Pinyon Script', value: "'Pinyon Script', cursive" },
  { label: 'Dancing Script', value: "'Dancing Script', cursive" },
  { label: 'Cormorant Garamond', value: "'Cormorant Garamond', serif" },
  { label: 'Playfair Display', value: "'Playfair Display', serif" },
]

/* The full font set offered for per-section typography (TASK 2). */
const SECTION_FONT_OPTIONS = [
  { label: 'Playfair Display', value: "'Playfair Display', serif" },
  { label: 'Great Vibes', value: "'Great Vibes', cursive" },
  { label: 'Cormorant Garamond', value: "'Cormorant Garamond', serif" },
  { label: 'Dancing Script', value: "'Dancing Script', cursive" },
  { label: 'Pinyon Script', value: "'Pinyon Script', cursive" },
  { label: 'Allura', value: "'Allura', cursive" },
  { label: 'Montserrat', value: "'Montserrat', sans-serif" },
  { label: 'Lato', value: "'Lato', sans-serif" },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFieldProps = { value: any; onChange: (value: any) => void }

/* ------------------------------------------------------------------ *
 * TASK 2 — Reusable "Section Style" field group.
 * Added to every content section so typography / background / particles
 * are editable per-section from the Puck sidebar.
 * ------------------------------------------------------------------ */
const sectionStyleField = {
  type: 'object' as const,
  label: '🎨 Fonts, Colours & Effects (optional)',
  objectFields: {
    headingFont: { type: 'select' as const, label: 'Text · Heading font', options: SECTION_FONT_OPTIONS },
    bodyFont: { type: 'select' as const, label: 'Text · Body font', options: SECTION_FONT_OPTIONS },
    headingFontSize: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <RangeField label="Text · Heading size" value={value} onChange={onChange} min={18} max={80} suffix="px" defaultValue={40} />
      ),
    },
    bodyFontSize: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <RangeField label="Text · Body size" value={value} onChange={onChange} min={12} max={30} suffix="px" defaultValue={18} />
      ),
    },
    headingColor: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Text · Heading colour" value={value} onChange={onChange} defaultValue="#f4ece0" />
      ),
    },
    bodyColor: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Text · Body colour" value={value} onChange={onChange} defaultValue="#cabfae" />
      ),
    },
    accentColor: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Text · Highlight colour" value={value} onChange={onChange} defaultValue="#c9a45c" />
      ),
    },
    backgroundType: {
      type: 'radio' as const,
      label: 'Background · Type',
      options: [
        { label: 'Colour', value: 'color' },
        { label: 'Gradient', value: 'gradient' },
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
    },
    backgroundColor: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Background · Colour" value={value} onChange={onChange} defaultValue="#14110f" />
      ),
    },
    gradientFrom: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Gradient · Start" value={value} onChange={onChange} defaultValue="#b8860b" />
      ),
    },
    gradientVia: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Gradient · Middle (sheen)" value={value} onChange={onChange} defaultValue="#f2d98b" />
      ),
    },
    gradientTo: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Gradient · End" value={value} onChange={onChange} defaultValue="#b8860b" />
      ),
    },
    gradientAngle: { type: 'number' as const, label: 'Gradient · Angle (deg)' },
    backgroundImage: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ImageUploadField label="Background · Image" value={value} onChange={onChange} />
      ),
    },
    backgroundVideo: { type: 'text' as const, label: 'Background · Video link' },
    overlayColor: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Background · Tint colour" value={value} onChange={onChange} defaultValue="#000000" />
      ),
    },
    overlayOpacity: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <RangeField label="Background · Darkening" value={value} onChange={onChange} min={0} max={0.9} step={0.05} defaultValue={0} />
      ),
    },
    particlesEnabled: {
      type: 'radio' as const,
      label: 'Effect · Floating particles',
      options: [
        { label: 'On', value: true },
        { label: 'Off', value: false },
      ],
    },
    particleStyle: {
      type: 'select' as const,
      label: 'Effect · Style',
      options: [
        { label: 'Bokeh dots', value: 'bokeh' },
        { label: 'Floating petals', value: 'petals' },
        { label: 'Sparkles', value: 'sparkles' },
        { label: 'Snow', value: 'snow' },
        { label: 'Gold dust', value: 'golddust' },
        { label: 'Fireflies', value: 'fireflies' },
      ],
    },
    particleColor: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Effect · Colour" value={value} onChange={onChange} defaultValue="#e7c987" />
      ),
    },
    particleCount: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <RangeField label="Effect · Amount" value={value} onChange={onChange} min={20} max={200} defaultValue={60} />
      ),
    },
    particleSpeed: {
      type: 'select' as const,
      label: 'Effect · Speed',
      options: [
        { label: 'Slow', value: 'slow' },
        { label: 'Medium', value: 'medium' },
        { label: 'Fast', value: 'fast' },
      ],
    },
  },
}

/* ------------------------------------------------------------------ *
 * TASK 1 — "Global Theme" field group (lives on the page root).
 * ------------------------------------------------------------------ */
const themeField = {
  type: 'object' as const,
  label: '🎨 Overall Colours & Style',
  objectFields: {
    primaryColor: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Main accent colour (gold)" value={value} onChange={onChange} defaultValue="#c9a45c" />
      ),
    },
    secondaryColor: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Dark / text colour" value={value} onChange={onChange} defaultValue="#2c2418" />
      ),
    },
    backgroundColor: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Page background colour" value={value} onChange={onChange} defaultValue="#14110f" />
      ),
    },
    lineColor: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Decorative line colour" value={value} onChange={onChange} defaultValue="#c9a45c" />
      ),
    },
    lineStyle: {
      type: 'select' as const,
      label: 'Decorative line style',
      options: [
        { label: 'Solid', value: 'solid' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Dotted', value: 'dotted' },
      ],
    },
    lineThickness: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <RangeField label="Decorative line thickness" value={value} onChange={onChange} min={1} max={4} suffix="px" defaultValue={1} />
      ),
    },
    accentTextColor: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Highlighted-word colour" value={value} onChange={onChange} defaultValue="#e7c987" />
      ),
    },
    dividerStyle: {
      type: 'select' as const,
      label: 'Divider between sections',
      options: [
        { label: 'Line', value: 'line' },
        { label: 'Floral ornament', value: 'floral' },
        { label: 'None', value: 'none' },
      ],
    },
  },
}

/* ------------------------------------------------------------------ *
 * Mapping between the flat `sections[]` JSON used by the live site and
 * Puck's component-keyed data model.
 * ------------------------------------------------------------------ */

const COMPONENT_BY_TYPE: Record<SectionType, string> = {
  entrance: 'Entrance',
  hero: 'Hero',
  countdown: 'Countdown',
  couple: 'Couple',
  story: 'Story',
  events: 'Events',
  timeline: 'Timeline',
  gallery: 'Gallery',
  rsvp: 'RSVP',
  inquiry: 'Inquiry',
  footer: 'Footer',
}

const TYPE_BY_COMPONENT: Record<string, SectionType> = Object.fromEntries(
  Object.entries(COMPONENT_BY_TYPE).map(([type, comp]) => [comp, type as SectionType]),
) as Record<string, SectionType>

/* ------------------------------------------------------------------ *
 * Collapsible field groups (non-technical-friendly editor panel).
 *
 * Each section's scalar fields are wrapped in collapsible "object" groups in
 * the Puck sidebar. To keep the exported JSON FLAT (the shape the live page
 * reads), we `nestForEditor` when loading a couple into Puck and `flatten`
 * again on render + export. SECTION_GROUPS is the single source of truth for
 * which fields live in which group. (Arrays like paragraphs/events and the
 * `style` group stay top-level.)
 * ------------------------------------------------------------------ */
type FieldGroup = { key: string; label: string; fields: string[] }

const SECTION_GROUPS: Partial<Record<SectionType, FieldGroup[]>> = {
  entrance: [
    {
      key: 'gNames',
      label: '👤 Names & text',
      fields: ['bride', 'groom', 'invitedText', 'brideFont', 'groomFont', 'brideFontSize', 'groomFontSize', 'brideColor', 'groomColor'],
    },
    { key: 'gBackground', label: '🖼 Background', fields: ['backgroundType', 'backgroundImage', 'backgroundVideo', 'overlayOpacity'] },
    { key: 'gDecoration', label: '🌿 Decoration', fields: ['topFloral', 'topFloralRotation', 'bottomFloral', 'bottomFloralRotation'] },
    { key: 'gCard', label: '🪟 Card', fields: ['cardColor', 'cardOpacity'] },
    { key: 'gButton', label: '🔘 Button', fields: ['buttonText', 'buttonTextColor', 'buttonBgColor'] },
    { key: 'gEffects', label: '✨ Effects', fields: ['particles'] },
  ],
  hero: [
    { key: 'gContent', label: '📝 Names & date', fields: ['bride', 'groom', 'date', 'tagline'] },
    { key: 'gPhoto', label: '🖼 Photo', fields: ['image'] },
    { key: 'gQuote', label: '❝ Quote (optional)', fields: ['verse', 'verseRef'] },
  ],
  countdown: [{ key: 'gContent', label: '📝 Details', fields: ['heading', 'targetDate'] }],
  couple: [
    { key: 'gBride', label: '👰 Bride', fields: ['bride', 'brideBio', 'brideImage'] },
    { key: 'gGroom', label: '🤵 Groom', fields: ['groom', 'groomBio', 'groomImage'] },
    { key: 'gQuote', label: '❝ Quote (optional)', fields: ['verse', 'verseRef'] },
  ],
  story: [{ key: 'gContent', label: '📝 Details', fields: ['heading', 'sideImage'] }],
  events: [{ key: 'gContent', label: '📝 Details', fields: ['heading'] }],
  timeline: [{ key: 'gContent', label: '📝 Details', fields: ['heading'] }],
  gallery: [{ key: 'gContent', label: '📝 Details', fields: ['heading'] }],
  rsvp: [{ key: 'gContent', label: '📝 Details', fields: ['heading', 'message', 'rsvpSheetUrl'] }],
  inquiry: [{ key: 'gContent', label: '📝 Details', fields: ['heading', 'message', 'inquirySheetUrl'] }],
  footer: [{ key: 'gNames', label: '📝 Details', fields: ['bride', 'groom', 'date', 'hashtag'] }],
}

/** Wrap a set of field definitions in a collapsible group (Puck object field). */
function grp(label: string, objectFields: Record<string, unknown>) {
  return { type: 'object' as const, label, objectFields }
}

/** Flat couple-data props → grouped Puck props (so the grouped fields show values). */
function nestForEditor(type: SectionType, flat: Record<string, any>): Record<string, any> {
  const groups = SECTION_GROUPS[type]
  if (!groups) return flat
  const out: Record<string, any> = { ...flat }
  for (const g of groups) {
    const obj: Record<string, any> = {}
    for (const f of g.fields) {
      if (f in flat) {
        obj[f] = flat[f]
        delete out[f]
      }
    }
    out[g.key] = obj
  }
  return out
}

/** Grouped Puck props → flat props (for the live component + export). Group
 *  values always win over any stale top-level defaults. */
function flatten(type: SectionType, grouped: Record<string, any>): Record<string, any> {
  const groups = SECTION_GROUPS[type]
  if (!groups) return grouped
  const groupKeys = groups.map((g) => g.key)
  const out: Record<string, any> = {}
  for (const k of Object.keys(grouped)) {
    if (!groupKeys.includes(k)) out[k] = grouped[k]
  }
  for (const g of groups) {
    const v = grouped[g.key]
    if (v && typeof v === 'object') Object.assign(out, v)
  }
  return out
}

/* ============================ Puck config ============================ */

export const config: Config = {
  root: {
    fields: {
      slug: { type: 'text', label: 'Page link / address (e.g. dewmini-janni → /dewmini-janni)' },
      title: { type: 'text', label: 'Browser tab title' },
      couple: { type: 'text', label: 'Couple names (used when sharing the link)' },
      musicUrl: { type: 'text', label: 'Background music — paste an MP3 link (optional)' },
      theme: themeField,
    },
    defaultProps: { slug: 'new-couple', title: 'Our Wedding', couple: '', musicUrl: '', theme: {} },
    // The .admin-preview wrapper lets editor CSS force scroll-reveal elements
    // visible (ScrollTrigger doesn't fire inside the Puck preview pane).
    // `.invite-root` supplies the scoped palette variables (--gold/--bg/…) the
    // sections need — in Project A those live on .invite-root, not :root — and
    // ThemeProvider writes the Global Theme overrides onto that same element so
    // edits live-preview instantly.
    render: ({ children, theme }: AnyProps) => (
      <AdminPreviewRoot theme={theme}>{children}</AdminPreviewRoot>
    ),
  },

  components: {
    Entrance: {
      label: '✨ Entrance (opening screen)',
      fields: {
        gNames: grp('👤 Names & text', {
          bride: { type: 'text', label: "Bride's name" },
          groom: { type: 'text', label: "Groom's name" },
          invitedText: { type: 'text', label: "Top line (e.g. 'You are invited to the Wedding of')" },
          brideFont: { type: 'select', label: "Bride's name · font", options: FONT_OPTIONS },
          groomFont: { type: 'select', label: "Groom's name · font", options: FONT_OPTIONS },
          brideFontSize: {
            type: 'custom',
            render: ({ value, onChange }: AnyFieldProps) => (
              <RangeField label="Bride's name · size" value={value} onChange={onChange} min={40} max={120} suffix="px" defaultValue={84} />
            ),
          },
          groomFontSize: {
            type: 'custom',
            render: ({ value, onChange }: AnyFieldProps) => (
              <RangeField label="Groom's name · size" value={value} onChange={onChange} min={40} max={120} suffix="px" defaultValue={84} />
            ),
          },
          brideColor: {
            type: 'custom',
            render: ({ value, onChange }: AnyFieldProps) => (
              <ColorField label="Bride's name · colour" value={value} onChange={onChange} defaultValue="#2c2418" />
            ),
          },
          groomColor: {
            type: 'custom',
            render: ({ value, onChange }: AnyFieldProps) => (
              <ColorField label="Groom's name · colour" value={value} onChange={onChange} defaultValue="#2c2418" />
            ),
          },
        }),
        gBackground: grp('🖼 Background', {
          backgroundType: {
            type: 'radio',
            label: 'Type',
            options: [
              { label: 'Image', value: 'image' },
              { label: 'Video', value: 'video' },
            ],
          },
          backgroundImage: {
            type: 'custom',
            render: ({ value, onChange }: AnyFieldProps) => (
              <ImageUploadField label="Image" value={value} onChange={onChange} />
            ),
          },
          backgroundVideo: { type: 'text', label: 'Video link' },
          overlayOpacity: {
            type: 'custom',
            render: ({ value, onChange }: AnyFieldProps) => (
              <RangeField label="Darkening" value={value} onChange={onChange} min={0} max={0.8} step={0.05} defaultValue={0.35} />
            ),
          },
        }),
        gDecoration: grp('🌿 Decoration', {
          topFloral: {
            type: 'custom',
            render: ({ value, onChange }: AnyFieldProps) => (
              <ImageUploadField label="Top flower image" value={value} onChange={onChange} />
            ),
          },
          topFloralRotation: {
            type: 'custom',
            render: ({ value, onChange }: AnyFieldProps) => (
              <RangeField label="Top flower angle" value={value} onChange={onChange} min={-180} max={180} suffix="°" defaultValue={0} />
            ),
          },
          bottomFloral: {
            type: 'custom',
            render: ({ value, onChange }: AnyFieldProps) => (
              <ImageUploadField label="Bottom flower image" value={value} onChange={onChange} />
            ),
          },
          bottomFloralRotation: {
            type: 'custom',
            render: ({ value, onChange }: AnyFieldProps) => (
              <RangeField label="Bottom flower angle" value={value} onChange={onChange} min={-180} max={180} suffix="°" defaultValue={180} />
            ),
          },
        }),
        gCard: grp('🪟 Card', {
          cardColor: {
            type: 'custom',
            render: ({ value, onChange }: AnyFieldProps) => (
              <ColorField label="Colour" value={value} onChange={onChange} defaultValue="#ffffff" />
            ),
          },
          cardOpacity: {
            type: 'custom',
            render: ({ value, onChange }: AnyFieldProps) => (
              <RangeField label="See-through" value={value} onChange={onChange} min={0.5} max={1} step={0.05} defaultValue={0.9} />
            ),
          },
        }),
        gButton: grp('🔘 Button', {
          buttonText: { type: 'text', label: 'Text' },
          buttonTextColor: {
            type: 'custom',
            render: ({ value, onChange }: AnyFieldProps) => (
              <ColorField label="Text colour" value={value} onChange={onChange} defaultValue="#1c1916" />
            ),
          },
          buttonBgColor: {
            type: 'custom',
            render: ({ value, onChange }: AnyFieldProps) => (
              <ColorField label="Colour" value={value} onChange={onChange} defaultValue="#c9a45c" />
            ),
          },
        }),
        gEffects: grp('✨ Effects', {
          particles: {
            type: 'radio',
            label: 'Floating sparkles',
            options: [
              { label: 'On', value: true },
              { label: 'Off', value: false },
            ],
          },
        }),
      },
      defaultProps: {
        bride: 'Bride',
        groom: 'Groom',
        invitedText: 'You are invited to the Wedding of',
        brideFont: "'Great Vibes', cursive",
        groomFont: "'Great Vibes', cursive",
        brideFontSize: 84,
        groomFontSize: 84,
        brideColor: '#2c2418',
        groomColor: '#2c2418',
        topFloral: '',
        bottomFloral: '',
        topFloralRotation: 0,
        bottomFloralRotation: 180,
        backgroundType: 'image',
        backgroundImage: '',
        backgroundVideo: '',
        overlayOpacity: 0.35,
        cardColor: '#ffffff',
        cardOpacity: 0.9,
        buttonText: 'VIEW INVITATION',
        buttonTextColor: '#1c1916',
        buttonBgColor: '#c9a45c',
        particles: true,
      },
      render: (props) => <EntranceSection {...(flatten('entrance', props) as any)} type="entrance" editorPreview />,
    },

    Hero: {
      label: '💍 Hero (names & date)',
      fields: {
        gContent: grp('📝 Names & date', {
          bride: { type: 'text', label: "Bride's name" },
          groom: { type: 'text', label: "Groom's name" },
          date: { type: 'text', label: "Wedding date — shown text (e.g. '20 December 2026 · 4:00 PM')" },
          tagline: { type: 'textarea', label: 'Short message under the names' },
        }),
        gPhoto: grp('🖼 Photo', {
          image: {
            type: 'custom',
            render: ({ value, onChange }: AnyFieldProps) => (
              <ImageUploadField label="Background image" value={value} onChange={onChange} />
            ),
          },
        }),
        gQuote: grp('❝ Quote (optional)', {
          verse: { type: 'textarea', label: 'Quote / verse text' },
          verseRef: { type: 'text', label: 'Quote reference (e.g. Song of Solomon 3:4)' },
        }),
        style: sectionStyleField,
      },
      defaultProps: {
        bride: 'Bride',
        groom: 'Groom',
        date: 'Date · Time',
        tagline: '',
        image: '',
        verse: '',
        verseRef: '',
      },
      render: (props) => <HeroSection {...(flatten('hero', props) as any)} type="hero" />,
    },

    Countdown: {
      label: '⏳ Countdown',
      fields: {
        gContent: grp('📝 Details', {
          heading: { type: 'text', label: 'Heading' },
          targetDate: {
            type: 'text',
            label: 'Wedding date & time (e.g. 2026-07-18T15:00:00+05:30)',
          },
        }),
        style: sectionStyleField,
      },
      defaultProps: { heading: 'Counting Down', targetDate: '2026-07-18T15:00:00+05:30' },
      render: (props) => <CountdownSection {...(flatten('countdown', props) as any)} type="countdown" />,
    },

    Couple: {
      label: '👰 Couple (bride & groom)',
      fields: {
        gBride: grp('👰 Bride', {
          bride: { type: 'text', label: "Bride's name" },
          brideBio: { type: 'textarea', label: 'About the bride' },
          brideImage: {
            type: 'custom',
            render: ({ value, onChange }: AnyFieldProps) => (
              <ImageUploadField label="Bride's photo" value={value} onChange={onChange} />
            ),
          },
        }),
        gGroom: grp('🤵 Groom', {
          groom: { type: 'text', label: "Groom's name" },
          groomBio: { type: 'textarea', label: 'About the groom' },
          groomImage: {
            type: 'custom',
            render: ({ value, onChange }: AnyFieldProps) => (
              <ImageUploadField label="Groom's photo" value={value} onChange={onChange} />
            ),
          },
        }),
        gQuote: grp('❝ Quote (optional)', {
          verse: { type: 'textarea', label: 'Quote / verse under the couple' },
          verseRef: { type: 'text', label: 'Quote reference' },
        }),
        style: sectionStyleField,
      },
      defaultProps: {
        bride: 'Bride',
        brideBio: '',
        brideImage: '',
        groom: 'Groom',
        groomBio: '',
        groomImage: '',
        verse: '',
        verseRef: '',
      },
      render: (props) => <CoupleSection {...(flatten('couple', props) as any)} type="couple" />,
    },

    Story: {
      label: '📖 Our story',
      fields: {
        gContent: grp('📝 Details', {
          heading: { type: 'text', label: 'Heading' },
          sideImage: {
            type: 'custom',
            render: ({ value, onChange }: AnyFieldProps) => (
              <ImageUploadField label="Side photo" value={value} onChange={onChange} />
            ),
          },
        }),
        paragraphs: {
          type: 'array',
          label: 'Paragraphs',
          getItemSummary: (item: AnyProps) =>
            item.text?.slice(0, 40) || 'Paragraph',
          defaultItemProps: { text: '' },
          arrayFields: { text: { type: 'textarea', label: 'Paragraph text' } },
        },
        style: sectionStyleField,
      },
      defaultProps: { heading: 'Our Story', sideImage: '', paragraphs: [{ text: '' }] },
      render: (props) => {
        const flat = flatten('story', props)
        return (
          <StorySection
            {...(flat as any)}
            type="story"
            paragraphs={(flat.paragraphs ?? []).map((p: { text: string }) => p.text)}
          />
        )
      },
    },

    Events: {
      label: '📅 Events / schedule',
      fields: {
        gContent: grp('📝 Details', {
          heading: { type: 'text', label: 'Heading' },
        }),
        events: {
          type: 'array',
          label: 'Events',
          getItemSummary: (item: AnyProps) => item.name || 'Event',
          defaultItemProps: {
            name: 'Event',
            date: '',
            time: '',
            venue: '',
            address: '',
            mapUrl: '',
            photo: '',
          },
          arrayFields: {
            name: { type: 'text', label: 'Event name' },
            date: { type: 'text', label: 'Date' },
            time: { type: 'text', label: 'Time' },
            venue: { type: 'text', label: 'Venue name' },
            address: { type: 'text', label: 'Address' },
            mapUrl: { type: 'text', label: 'Google Maps link' },
            photo: {
              type: 'custom',
              render: ({ value, onChange }) => (
                <ImageUploadField label="Photo" value={value} onChange={onChange} />
              ),
            },
          },
        },
        style: sectionStyleField,
      },
      defaultProps: { heading: 'The Celebrations', events: [] },
      render: (props) => <EventsSection {...(flatten('events', props) as any)} type="events" />,
    },

    Timeline: {
      label: '🕘 Timeline (order of the day)',
      fields: {
        gContent: grp('📝 Details', {
          heading: { type: 'text', label: 'Heading' },
        }),
        items: {
          type: 'array',
          label: 'Times',
          getItemSummary: (item: AnyProps) =>
            [item.time, item.label].filter(Boolean).join(' · ') || 'Item',
          defaultItemProps: { time: '', label: '' },
          arrayFields: {
            time: { type: 'text', label: 'Time' },
            label: { type: 'text', label: "What's happening" },
          },
        },
        style: sectionStyleField,
      },
      defaultProps: { heading: 'Order of the Day', items: [] },
      render: (props) => <TimelineSection {...(flatten('timeline', props) as any)} type="timeline" />,
    },

    Gallery: {
      label: '🖼 Photo gallery',
      fields: {
        gContent: grp('📝 Details', {
          heading: { type: 'text', label: 'Heading' },
        }),
        images: {
          type: 'custom',
          render: ({ value, onChange }) => (
            <GalleryUploadField label="Photos" value={value} onChange={onChange} />
          ),
        },
        style: sectionStyleField,
      },
      defaultProps: { heading: 'Gallery', images: [] },
      render: (props) => {
        const flat = flatten('gallery', props)
        return (
          <GallerySection
            {...(flat as any)}
            type="gallery"
            images={(flat.images ?? []).map((i: { url: string }) => i.url)}
          />
        )
      },
    },

    RSVP: {
      label: '✉ RSVP form',
      fields: {
        gContent: grp('📝 Details', {
          heading: { type: 'text', label: 'Heading' },
          message: { type: 'textarea', label: 'Message to guests' },
          rsvpSheetUrl: {
            type: 'text',
            label: 'RSVP responses link — Google Apps Script (optional)',
          },
        }),
        style: sectionStyleField,
      },
      defaultProps: { heading: 'RSVP', message: '', rsvpSheetUrl: '' },
      render: (props) => <RSVPSection {...(flatten('rsvp', props) as any)} type="rsvp" />,
    },

    Inquiry: {
      label: '💬 Inquiries / contact',
      fields: {
        gContent: grp('📝 Details', {
          heading: { type: 'text', label: 'Heading' },
          message: { type: 'textarea', label: 'Message to guests' },
          inquirySheetUrl: {
            type: 'text',
            label: 'Inquiry responses link — Google Apps Script (optional)',
          },
        }),
        style: sectionStyleField,
      },
      defaultProps: { heading: 'Inquiries', message: '', inquirySheetUrl: '' },
      render: (props) => <InquirySection {...(flatten('inquiry', props) as any)} type="inquiry" />,
    },

    Footer: {
      label: '🔚 Footer',
      fields: {
        gNames: grp('📝 Details', {
          bride: { type: 'text', label: "Bride's name" },
          groom: { type: 'text', label: "Groom's name" },
          date: { type: 'text', label: 'Wedding date' },
          hashtag: { type: 'text', label: 'Hashtag (e.g. #AmaraNuwan2027)' },
        }),
        contacts: {
          type: 'array',
          label: 'Contact numbers',
          getItemSummary: (item: AnyProps) => item.name || 'Contact',
          defaultItemProps: { name: '', phone: '' },
          arrayFields: {
            name: { type: 'text', label: 'Family / person' },
            phone: { type: 'text', label: 'Phone number' },
          },
        },
        socials: {
          type: 'array',
          label: 'Social links',
          getItemSummary: (item: AnyProps) => item.label || 'Link',
          defaultItemProps: { label: '', url: '' },
          arrayFields: {
            label: { type: 'text', label: 'Name (e.g. Instagram)' },
            url: { type: 'text', label: 'Link' },
          },
        },
        style: sectionStyleField,
      },
      defaultProps: { bride: 'Bride', groom: 'Groom', date: '', hashtag: '', contacts: [], socials: [] },
      render: (props) => <FooterSection {...(flatten('footer', props) as any)} type="footer" />,
    },
  },
}

/* ============================ Converters ============================ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProps = Record<string, any>

function sectionToPuckProps(section: Section, index: number): AnyProps {
  const { type, id: _id, ...rest } = section as AnyProps
  const props: AnyProps = { ...rest, id: section.id ?? `${type}-${index}` }

  // Ensure the "Section Style" object field always has an object to render.
  props.style = props.style ?? {}

  if (section.type === 'story') {
    const paras =
      section.paragraphs?.length
        ? section.paragraphs
        : (section.items ?? []).map((it) => (it.title ? `${it.title} — ${it.text}` : it.text))
    props.paragraphs = paras.map((text) => ({ text }))
    delete props.items
  }

  if (section.type === 'gallery') {
    // dnd-kit needs a stable unique id per item (urls may repeat or be empty).
    props.images = (section.images ?? []).map((url) => ({ id: galleryUid(), url }))
  }

  // Nest scalar fields into their collapsible editor groups (paragraphs/images
  // arrays and `style` stay top-level).
  return nestForEditor(section.type, props)
}

/** Convert the live-site CoupleData JSON into Puck editor data. */
export function coupleDataToPuck(data: CoupleData): Data {
  const puck = {
    root: {
      props: {
        slug: data.slug,
        title: data.meta?.title ?? '',
        couple: data.meta?.couple ?? '',
        musicUrl: data.musicUrl ?? '',
        theme: data.theme ?? {},
      },
    },
    content: data.sections.map((section, i) => ({
      type: COMPONENT_BY_TYPE[section.type],
      props: sectionToPuckProps(section, i),
    })),
    zones: {},
  }
  return puck as unknown as Data
}

/** Convert Puck editor data back into the exact live-site CoupleData shape. */
export function puckToCoupleData(puck: Data, fallbackSlug: string): CoupleData {
  const root = (puck.root.props ?? {}) as AnyProps

  const sections = puck.content.map((item) => {
    const type = TYPE_BY_COMPONENT[item.type]
    const { id: _id, ...rest } = item.props as AnyProps
    // Flatten the collapsible editor groups back into the flat section shape.
    const flat = flatten(type, rest)
    const section: AnyProps = { type, ...flat }

    if (type === 'story') {
      section.paragraphs = ((flat.paragraphs ?? []) as { text: string }[]).map((p) => p.text)
    }
    if (type === 'gallery') {
      section.images = ((flat.images ?? []) as { url: string }[]).map((i) => i.url)
    }

    // Drop an empty style object so the exported JSON stays clean.
    if (section.style && Object.keys(section.style).length === 0) delete section.style

    return section as Section
  })

  const meta: CoupleData['meta'] = {}
  if (root.title) meta.title = root.title
  if (root.couple) meta.couple = root.couple

  const theme = root.theme as AnyProps | undefined
  const hasTheme = theme && Object.keys(theme).length > 0

  return {
    slug: root.slug || fallbackSlug,
    ...(root.musicUrl ? { musicUrl: root.musicUrl } : {}),
    ...(hasTheme ? { theme } : {}),
    ...(meta.title || meta.couple ? { meta } : {}),
    sections,
  }
}

/** Starting data for a brand-new couple (when no JSON file exists yet). */
export const emptyPuckData: Data = {
  root: {
    props: { slug: 'new-couple', title: 'Our Wedding', couple: '', musicUrl: '', theme: {} } as AnyProps,
  },
  content: [
    {
      type: 'Entrance',
      props: {
        id: 'entrance-0',
        bride: 'Bride',
        groom: 'Groom',
        invitedText: 'You are invited to the Wedding of',
        brideFont: "'Great Vibes', cursive",
        groomFont: "'Great Vibes', cursive",
        brideFontSize: 84,
        groomFontSize: 84,
        brideColor: '#2c2418',
        groomColor: '#2c2418',
        topFloral: '',
        bottomFloral: '',
        topFloralRotation: 0,
        bottomFloralRotation: 180,
        backgroundType: 'image',
        backgroundImage: '',
        backgroundVideo: '',
        overlayOpacity: 0.35,
        cardColor: '#ffffff',
        cardOpacity: 0.9,
        buttonText: 'VIEW INVITATION',
        buttonTextColor: '#1c1916',
        buttonBgColor: '#c9a45c',
        particles: true,
      },
    },
    {
      type: 'Hero',
      props: {
        id: 'hero-0',
        bride: 'Bride',
        groom: 'Groom',
        date: 'Date · Time',
        tagline: '',
        image: '',
        verse: '',
        verseRef: '',
      },
    },
    {
      type: 'Footer',
      props: {
        id: 'footer-0',
        bride: 'Bride',
        groom: 'Groom',
        date: '',
        hashtag: '',
        contacts: [],
        socials: [],
      },
    },
  ],
  zones: {},
}
