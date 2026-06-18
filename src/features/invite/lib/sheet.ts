export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

/**
 * POST a payload to a Google Apps Script web app.
 *
 * Apps Script endpoints don't send CORS headers, so we use `mode: 'no-cors'`.
 * The response is opaque (we can't read status/body), so a resolved fetch is
 * treated as success and only a thrown network error is a failure. We send a
 * CORS-safelisted `text/plain` content type to avoid a preflight request; the
 * Apps Script reads the JSON via `JSON.parse(e.postData.contents)`.
 */
export async function postToSheet(
  url: string,
  payload: Record<string, unknown>,
): Promise<void> {
  await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ ...payload, timestamp: new Date().toISOString() }),
  })
}
