import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
} from '@/features/invite-admin/config/cloudinary'

/**
 * Cloudinary **Media Library** widget loader (distinct from the Upload widget).
 *
 * Lets the admin browse the whole Cloudinary library, copy/insert asset URLs,
 * and manage (incl. delete) assets inside Cloudinary's own hosted popup — using
 * only the publishable `api_key` (no secret in our code). Browsing your private
 * library requires signing into Cloudinary in the popup the first time.
 */
const SCRIPT_SRC = 'https://media-library.cloudinary.com/global/all.js'

interface MediaLibraryInstance {
  show: () => void
}
interface MediaLibraryGlobal {
  createMediaLibrary?: (
    options: Record<string, unknown>,
    callbacks: {
      insertHandler?: (data: { assets: { secure_url: string }[] }) => void
    },
  ) => MediaLibraryInstance
}

// `window.cloudinary` is already globally typed (for the Upload widget) in
// invite-admin/lib/cloudinary.ts. Re-augmenting it would clash, so we just cast.
function mediaLib(): MediaLibraryGlobal | undefined {
  return window.cloudinary as unknown as MediaLibraryGlobal | undefined
}

let loadPromise: Promise<void> | null = null

/** True once an API key is configured (otherwise the Media page is disabled). */
export const mediaLibraryConfigured = Boolean(CLOUDINARY_API_KEY)

/** Inject the Media Library script once and resolve when ready. */
export function loadMediaLibrary(): Promise<void> {
  if (mediaLib()?.createMediaLibrary) return Promise.resolve()
  if (loadPromise) return loadPromise

  loadPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('Media Library failed to load')))
      if (mediaLib()?.createMediaLibrary) resolve()
      return
    }
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Media Library failed to load'))
    document.head.appendChild(script)
  })

  return loadPromise
}

/**
 * Open the Media Library popup. `onInsert` receives the secure URLs of any
 * assets the admin selects + inserts (for copying into invitation JSON).
 */
export async function openMediaLibrary(onInsert: (urls: string[]) => void): Promise<void> {
  if (!mediaLibraryConfigured) return
  try {
    await loadMediaLibrary()
  } catch (err) {
    console.error(err)
    return
  }
  const cl = mediaLib()
  if (!cl?.createMediaLibrary) return

  const ml = cl.createMediaLibrary(
    {
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      multiple: true,
      remove_header: false,
    },
    {
      insertHandler: (data) => onInsert(data.assets.map((a) => a.secure_url)),
    },
  )
  ml.show()
}
