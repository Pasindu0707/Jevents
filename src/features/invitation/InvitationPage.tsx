import { Link, useParams } from 'react-router-dom'
import { getCoupleBySlug } from '@/lib/couples'
import { TemplateRenderer } from '@/features/invitation/templates/TemplateRenderer'

/**
 * Public dynamic invitation page, served at /:slug (step 3).
 *
 * Resolves the slug, handles the not-found / not-published states, then hands
 * the couple to TemplateRenderer, which selects the template named in
 * `couple.template` (step 12).
 */
export function InvitationPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const couple = getCoupleBySlug(slug)

  if (!couple) {
    return <Notice title="Invitation not found" body={`No invitation exists at /${slug}.`} />
  }

  if (!couple.published) {
    return <Notice title="Coming soon" body="This invitation is not published yet." />
  }

  return <TemplateRenderer couple={couple} />
}

/** Centered message used for the 404 and not-published states. */
function Notice({ title, body }: { title: string; body: string }) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 px-6 text-center">
      <h1 className="font-display text-3xl text-[rgb(var(--fg))]">{title}</h1>
      <p className="max-w-sm text-[rgb(var(--muted-fg))]">{body}</p>
      <Link to="/" className="mt-2 text-sm font-medium underline underline-offset-4">
        Back to J Events
      </Link>
    </main>
  )
}
