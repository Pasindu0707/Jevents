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
  label: 'Section Style (fonts · background · particles)',
  objectFields: {
    headingFont: { type: 'select' as const, label: 'Heading Font', options: SECTION_FONT_OPTIONS },
    bodyFont: { type: 'select' as const, label: 'Body Font', options: SECTION_FONT_OPTIONS },
    headingFontSize: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <RangeField label="Heading Font Size" value={value} onChange={onChange} min={18} max={80} suffix="px" defaultValue={40} />
      ),
    },
    bodyFontSize: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <RangeField label="Body Font Size" value={value} onChange={onChange} min={12} max={30} suffix="px" defaultValue={18} />
      ),
    },
    headingColor: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Heading Color" value={value} onChange={onChange} defaultValue="#f4ece0" />
      ),
    },
    bodyColor: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Body Text Color" value={value} onChange={onChange} defaultValue="#cabfae" />
      ),
    },
    accentColor: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Accent / Highlight Text Color" value={value} onChange={onChange} defaultValue="#c9a45c" />
      ),
    },
    backgroundType: {
      type: 'radio' as const,
      label: 'Background Type',
      options: [
        { label: 'Color', value: 'color' },
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
    },
    backgroundColor: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Background Color" value={value} onChange={onChange} defaultValue="#14110f" />
      ),
    },
    backgroundImage: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ImageUploadField label="Background Image" value={value} onChange={onChange} />
      ),
    },
    backgroundVideo: { type: 'text' as const, label: 'Background Video URL' },
    overlayColor: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Background Overlay Color" value={value} onChange={onChange} defaultValue="#000000" />
      ),
    },
    overlayOpacity: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <RangeField label="Overlay Opacity" value={value} onChange={onChange} min={0} max={0.9} step={0.05} defaultValue={0} />
      ),
    },
    particlesEnabled: {
      type: 'radio' as const,
      label: 'Particles',
      options: [
        { label: 'On', value: true },
        { label: 'Off', value: false },
      ],
    },
    particleStyle: {
      type: 'select' as const,
      label: 'Particle Style',
      options: [
        { label: 'Bokeh Dots', value: 'bokeh' },
        { label: 'Floating Petals', value: 'petals' },
        { label: 'Sparkles', value: 'sparkles' },
        { label: 'Snow', value: 'snow' },
        { label: 'Gold Dust', value: 'golddust' },
        { label: 'Fireflies', value: 'fireflies' },
      ],
    },
    particleColor: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Particle Color" value={value} onChange={onChange} defaultValue="#e7c987" />
      ),
    },
    particleCount: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <RangeField label="Particle Count" value={value} onChange={onChange} min={20} max={200} defaultValue={60} />
      ),
    },
    particleSpeed: {
      type: 'select' as const,
      label: 'Particle Speed',
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
  label: '🎨 Global Theme',
  objectFields: {
    primaryColor: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Primary (Gold / Accent)" value={value} onChange={onChange} defaultValue="#c9a45c" />
      ),
    },
    secondaryColor: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Secondary (Dark / Text)" value={value} onChange={onChange} defaultValue="#2c2418" />
      ),
    },
    backgroundColor: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Background Color" value={value} onChange={onChange} defaultValue="#14110f" />
      ),
    },
    lineColor: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Decorative Line Color" value={value} onChange={onChange} defaultValue="#c9a45c" />
      ),
    },
    lineStyle: {
      type: 'select' as const,
      label: 'Decorative Line Style',
      options: [
        { label: 'Solid', value: 'solid' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Dotted', value: 'dotted' },
      ],
    },
    lineThickness: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <RangeField label="Decorative Line Thickness" value={value} onChange={onChange} min={1} max={4} suffix="px" defaultValue={1} />
      ),
    },
    accentTextColor: {
      type: 'custom' as const,
      render: ({ value, onChange }: AnyFieldProps) => (
        <ColorField label="Accent Text Color" value={value} onChange={onChange} defaultValue="#e7c987" />
      ),
    },
    dividerStyle: {
      type: 'select' as const,
      label: 'Section Divider Style',
      options: [
        { label: 'Line', value: 'line' },
        { label: 'Floral Ornament', value: 'floral' },
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

/* ============================ Puck config ============================ */

export const config: Config = {
  root: {
    fields: {
      theme: themeField,
      slug: { type: 'text', label: 'URL Slug (e.g. dewmini-janni)' },
      title: { type: 'text', label: 'Page Title (browser tab)' },
      couple: { type: 'text', label: 'Couple (meta)' },
      musicUrl: { type: 'text', label: 'Background Music URL (whole site)' },
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
      label: 'Entrance / Splash',
      fields: {
        bride: { type: 'text', label: 'Bride Name' },
        groom: { type: 'text', label: 'Groom Name' },
        invitedText: { type: 'text', label: '"Invited" Text' },
        brideFont: { type: 'select', label: 'Bride Name Font', options: FONT_OPTIONS },
        groomFont: { type: 'select', label: 'Groom Name Font', options: FONT_OPTIONS },
        brideFontSize: {
          type: 'custom',
          render: ({ value, onChange }) => (
            <RangeField
              label="Bride Font Size"
              value={value}
              onChange={onChange}
              min={40}
              max={120}
              suffix="px"
              defaultValue={84}
            />
          ),
        },
        groomFontSize: {
          type: 'custom',
          render: ({ value, onChange }) => (
            <RangeField
              label="Groom Font Size"
              value={value}
              onChange={onChange}
              min={40}
              max={120}
              suffix="px"
              defaultValue={84}
            />
          ),
        },
        brideColor: {
          type: 'custom',
          render: ({ value, onChange }) => (
            <ColorField label="Bride Name Color" value={value} onChange={onChange} defaultValue="#2c2418" />
          ),
        },
        groomColor: {
          type: 'custom',
          render: ({ value, onChange }) => (
            <ColorField label="Groom Name Color" value={value} onChange={onChange} defaultValue="#2c2418" />
          ),
        },
        topFloral: {
          type: 'custom',
          render: ({ value, onChange }) => (
            <ImageUploadField label="Top Floral Decoration" value={value} onChange={onChange} />
          ),
        },
        bottomFloral: {
          type: 'custom',
          render: ({ value, onChange }) => (
            <ImageUploadField label="Bottom Floral Decoration" value={value} onChange={onChange} />
          ),
        },
        topFloralRotation: {
          type: 'custom',
          render: ({ value, onChange }) => (
            <RangeField
              label="Top Floral Rotation"
              value={value}
              onChange={onChange}
              min={-180}
              max={180}
              suffix="°"
              defaultValue={0}
            />
          ),
        },
        bottomFloralRotation: {
          type: 'custom',
          render: ({ value, onChange }) => (
            <RangeField
              label="Bottom Floral Rotation"
              value={value}
              onChange={onChange}
              min={-180}
              max={180}
              suffix="°"
              defaultValue={180}
            />
          ),
        },
        backgroundType: {
          type: 'radio',
          label: 'Background Type',
          options: [
            { label: 'Image', value: 'image' },
            { label: 'Video', value: 'video' },
          ],
        },
        backgroundImage: {
          type: 'custom',
          render: ({ value, onChange }) => (
            <ImageUploadField label="Background Image" value={value} onChange={onChange} />
          ),
        },
        backgroundVideo: { type: 'text', label: 'Background Video URL' },
        overlayOpacity: {
          type: 'custom',
          render: ({ value, onChange }) => (
            <RangeField
              label="Background Overlay Opacity"
              value={value}
              onChange={onChange}
              min={0}
              max={0.8}
              step={0.05}
              defaultValue={0.35}
            />
          ),
        },
        cardColor: {
          type: 'custom',
          render: ({ value, onChange }) => (
            <ColorField label="Card Background Color" value={value} onChange={onChange} defaultValue="#ffffff" />
          ),
        },
        cardOpacity: {
          type: 'custom',
          render: ({ value, onChange }) => (
            <RangeField
              label="Card Opacity"
              value={value}
              onChange={onChange}
              min={0.5}
              max={1}
              step={0.05}
              defaultValue={0.9}
            />
          ),
        },
        buttonText: { type: 'text', label: 'Button Text' },
        buttonTextColor: {
          type: 'custom',
          render: ({ value, onChange }) => (
            <ColorField label="Button Text Color" value={value} onChange={onChange} defaultValue="#1c1916" />
          ),
        },
        buttonBgColor: {
          type: 'custom',
          render: ({ value, onChange }) => (
            <ColorField label="Button Background Color" value={value} onChange={onChange} defaultValue="#c9a45c" />
          ),
        },
        particles: {
          type: 'radio',
          label: 'Bokeh Particles',
          options: [
            { label: 'On', value: true },
            { label: 'Off', value: false },
          ],
        },
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
      render: (props) => <EntranceSection {...(props as any)} type="entrance" editorPreview />,
    },

    Hero: {
      label: 'Hero',
      fields: {
        bride: { type: 'text', label: 'Bride Name' },
        groom: { type: 'text', label: 'Groom Name' },
        date: { type: 'text', label: 'Date (display)' },
        tagline: { type: 'textarea', label: 'Tagline' },
        image: {
          type: 'custom',
          render: ({ value, onChange }) => (
            <ImageUploadField label="Background Image" value={value} onChange={onChange} />
          ),
        },
        verse: { type: 'textarea', label: 'Verse Text' },
        verseRef: { type: 'text', label: 'Verse Source' },
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
      render: (props) => <HeroSection {...(props as any)} type="hero" />,
    },

    Countdown: {
      label: 'Countdown',
      fields: {
        heading: { type: 'text', label: 'Heading' },
        targetDate: {
          type: 'text',
          label: 'Wedding Date/Time (ISO, e.g. 2026-07-18T15:00:00+05:30)',
        },
        style: sectionStyleField,
      },
      defaultProps: { heading: 'Counting Down', targetDate: '2026-07-18T15:00:00+05:30' },
      render: (props) => <CountdownSection {...(props as any)} type="countdown" />,
    },

    Couple: {
      label: 'Couple',
      fields: {
        bride: { type: 'text', label: 'Bride Name' },
        brideBio: { type: 'textarea', label: 'Bride Description' },
        brideImage: {
          type: 'custom',
          render: ({ value, onChange }) => (
            <ImageUploadField label="Bride Photo" value={value} onChange={onChange} />
          ),
        },
        groom: { type: 'text', label: 'Groom Name' },
        groomBio: { type: 'textarea', label: 'Groom Description' },
        groomImage: {
          type: 'custom',
          render: ({ value, onChange }) => (
            <ImageUploadField label="Groom Photo" value={value} onChange={onChange} />
          ),
        },
        style: sectionStyleField,
      },
      defaultProps: {
        bride: 'Bride',
        brideBio: '',
        brideImage: '',
        groom: 'Groom',
        groomBio: '',
        groomImage: '',
      },
      render: (props) => <CoupleSection {...(props as any)} type="couple" />,
    },

    Story: {
      label: 'Story',
      fields: {
        heading: { type: 'text', label: 'Heading' },
        sideImage: {
          type: 'custom',
          render: ({ value, onChange }) => (
            <ImageUploadField label="Side Image" value={value} onChange={onChange} />
          ),
        },
        paragraphs: {
          type: 'array',
          label: 'Paragraphs',
          getItemSummary: (item: AnyProps) =>
            item.text?.slice(0, 40) || 'Paragraph',
          defaultItemProps: { text: '' },
          arrayFields: { text: { type: 'textarea', label: 'Text' } },
        },
        style: sectionStyleField,
      },
      defaultProps: { heading: 'Our Story', sideImage: '', paragraphs: [{ text: '' }] },
      render: ({ paragraphs, ...rest }) => (
        <StorySection
          type="story"
          paragraphs={(paragraphs ?? []).map((p: { text: string }) => p.text)}
          {...rest}
        />
      ),
    },

    Events: {
      label: 'Events',
      fields: {
        heading: { type: 'text', label: 'Heading' },
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
            name: { type: 'text', label: 'Name' },
            date: { type: 'text', label: 'Date' },
            time: { type: 'text', label: 'Time' },
            venue: { type: 'text', label: 'Venue' },
            address: { type: 'text', label: 'Address' },
            mapUrl: { type: 'text', label: 'Map URL' },
            photo: {
              type: 'custom',
              render: ({ value, onChange }) => (
                <ImageUploadField label="Event Photo" value={value} onChange={onChange} />
              ),
            },
          },
        },
        style: sectionStyleField,
      },
      defaultProps: { heading: 'The Celebrations', events: [] },
      render: (props) => <EventsSection {...(props as any)} type="events" />,
    },

    Timeline: {
      label: 'Timeline',
      fields: {
        heading: { type: 'text', label: 'Heading' },
        items: {
          type: 'array',
          label: 'Items',
          getItemSummary: (item: AnyProps) =>
            [item.time, item.label].filter(Boolean).join(' · ') || 'Item',
          defaultItemProps: { time: '', label: '' },
          arrayFields: {
            time: { type: 'text', label: 'Time' },
            label: { type: 'text', label: 'Label' },
          },
        },
        style: sectionStyleField,
      },
      defaultProps: { heading: 'Order of the Day', items: [] },
      render: (props) => <TimelineSection {...(props as any)} type="timeline" />,
    },

    Gallery: {
      label: 'Gallery',
      fields: {
        heading: { type: 'text', label: 'Heading' },
        images: {
          type: 'custom',
          render: ({ value, onChange }) => (
            <GalleryUploadField label="Images" value={value} onChange={onChange} />
          ),
        },
        style: sectionStyleField,
      },
      defaultProps: { heading: 'Gallery', images: [] },
      render: ({ images, ...rest }) => (
        <GallerySection
          type="gallery"
          images={(images ?? []).map((i: { url: string }) => i.url)}
          {...rest}
        />
      ),
    },

    RSVP: {
      label: 'RSVP',
      fields: {
        heading: { type: 'text', label: 'Heading' },
        message: { type: 'textarea', label: 'Message' },
        rsvpSheetUrl: { type: 'text', label: 'RSVP Google Apps Script URL' },
        style: sectionStyleField,
      },
      defaultProps: { heading: 'RSVP', message: '', rsvpSheetUrl: '' },
      render: (props) => <RSVPSection type="rsvp" {...props} />,
    },

    Inquiry: {
      label: 'Inquiry / Contact',
      fields: {
        heading: { type: 'text', label: 'Heading' },
        message: { type: 'textarea', label: 'Message' },
        inquirySheetUrl: { type: 'text', label: 'Inquiry Google Apps Script URL' },
        style: sectionStyleField,
      },
      defaultProps: { heading: 'Inquiries', message: '', inquirySheetUrl: '' },
      render: (props) => <InquirySection type="inquiry" {...props} />,
    },

    Footer: {
      label: 'Footer',
      fields: {
        bride: { type: 'text', label: 'Bride Name' },
        groom: { type: 'text', label: 'Groom Name' },
        date: { type: 'text', label: 'Date' },
        hashtag: { type: 'text', label: 'Hashtag' },
        contacts: {
          type: 'array',
          label: 'Contacts',
          getItemSummary: (item: AnyProps) => item.name || 'Contact',
          defaultItemProps: { name: '', phone: '' },
          arrayFields: {
            name: { type: 'text', label: 'Name' },
            phone: { type: 'text', label: 'Phone' },
          },
        },
        socials: {
          type: 'array',
          label: 'Social Links',
          getItemSummary: (item: AnyProps) => item.label || 'Link',
          defaultItemProps: { label: '', url: '' },
          arrayFields: {
            label: { type: 'text', label: 'Label' },
            url: { type: 'text', label: 'URL' },
          },
        },
        style: sectionStyleField,
      },
      defaultProps: { bride: 'Bride', groom: 'Groom', date: '', hashtag: '', contacts: [], socials: [] },
      render: (props) => <FooterSection {...(props as any)} type="footer" />,
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

  return props
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
    const { id: _id, ...rest } = item.props as any
    const section: AnyProps = { type, ...rest }

    if (type === 'story') {
      section.paragraphs = ((rest.paragraphs ?? []) as { text: string }[]).map((p) => p.text)
    }
    if (type === 'gallery') {
      section.images = ((rest.images ?? []) as { url: string }[]).map((i) => i.url)
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
