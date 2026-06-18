/**
 * Cloudinary configuration.
 *
 * Where to find these values:
 *  - CLOUDINARY_CLOUD_NAME: cloudinary.com → Dashboard (top of page) → "Cloud name".
 *  - CLOUDINARY_UPLOAD_PRESET: cloudinary.com → Settings (gear icon) → Upload →
 *    "Upload presets" → add/edit a preset. It MUST be set to "Unsigned" so the
 *    browser Upload Widget can use it without an API secret.
 *  - CLOUDINARY_API_KEY: cloudinary.com → Dashboard → "API Key". This is the
 *    PUBLISHABLE key (safe to ship) — used by the Media Library widget on the
 *    admin Media page to browse your library and copy URLs. NEVER put the API
 *    *Secret* in this file; it would let anyone delete your media.
 *
 * Swap these constants to point the admin at a different account.
 */
export const CLOUDINARY_CLOUD_NAME = 'dsbqzgxoi'
export const CLOUDINARY_UPLOAD_PRESET = 'jevents'
export const CLOUDINARY_API_KEY = '' // ← paste your Cloudinary API Key to enable the Media page
