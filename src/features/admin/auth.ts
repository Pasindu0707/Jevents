/**
 * Admin authentication — MVP only.
 *
 * ⚠️ This is a client-side gate with hardcoded credentials. It keeps casual
 * visitors out of the dashboard but is NOT real security (the values ship in
 * the bundle). Replace with proper server-side auth when the backend lands
 * (Task 2). Until then it's good enough to demo the admin flow.
 */
const ADMIN_EMAIL = 'jevents@gmail.com'
const ADMIN_PASSWORD = 'jevents@123'
const SESSION_KEY = 'jevents.admin.session'

/** Returns true and starts a session if the credentials match. */
export function login(email: string, password: string): boolean {
  const ok =
    email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD
  if (ok) sessionStorage.setItem(SESSION_KEY, 'true')
  return ok
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY)
}

/** True while an admin session is active (cleared when the tab closes). */
export function isAuthenticated(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === 'true'
}
