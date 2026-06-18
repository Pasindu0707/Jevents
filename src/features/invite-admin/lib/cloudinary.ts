import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '../config/cloudinary'

const SCRIPT_SRC = 'https://upload-widget.cloudinary.com/global/all.js'

// Minimal shape of the global the widget script attaches to `window`.
interface CloudinaryGlobal {
  createUploadWidget: (
    options: Record<string, unknown>,
    callback: (error: unknown, result?: { event?: string; info?: { secure_url?: string } }) => void,
  ) => { open: () => void }
}

declare global {
  interface Window {
    cloudinary?: CloudinaryGlobal
  }
}

let loadPromise: Promise<void> | null = null

/** Inject the Cloudinary Upload Widget script once and resolve when ready. */
export function loadCloudinary(): Promise<void> {
  if (window.cloudinary) return Promise.resolve()
  if (loadPromise) return loadPromise

  loadPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`)
    if (existing) {
      if (window.cloudinary) return resolve()
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('Cloudinary failed to load')))
      return
    }
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Cloudinary failed to load'))
    document.head.appendChild(script)
  })

  return loadPromise
}

/**
 * Open the Cloudinary Upload Widget. `onUpload` is called with the secure CDN
 * URL for each successfully uploaded file (once per file when `multiple`).
 */
export async function openUploadWidget(
  onUpload: (url: string) => void,
  opts: { multiple?: boolean } = {},
): Promise<void> {
  try {
    await loadCloudinary()
  } catch (err) {
    console.error(err)
    return
  }
  if (!window.cloudinary) return

  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: CLOUDINARY_CLOUD_NAME,
      uploadPreset: CLOUDINARY_UPLOAD_PRESET,
      sources: ['local', 'url', 'camera'],
      multiple: opts.multiple ?? false,
    },
    (error, result) => {
      if (!error && result?.event === 'success' && result.info?.secure_url) {
        onUpload(result.info.secure_url)
      }
    },
  )
  widget.open()
}
