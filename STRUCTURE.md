# J Events — project structure

**Stack:** Vite + React 19 + TypeScript, Tailwind v4, GSAP + Framer Motion.
**Deploy:** GitHub Pages at `/Jevents/` (CI: `.github/workflows/deploy.yml`).
**Direction:** the live site is the public homepage today; it grows into a
multi-area app — public homepage + per-couple invitation pages (`/:slug`) +
admin dashboard (`/admin`) — and the target domain is `jevents.lk`.

> **Phase note:** we are on **Vite now, Next.js later**. The folders below are
> arranged by *domain* (feature) so the move to routing — and eventually
> Next.js — touches as little as possible. A backend (for admin persistence,
> media upload, RSVP storage) is **decided later** (Task 2).

## Folder layout

```
src/
  main.tsx                  app entry (mounts <App>, loads global styles)
  App.tsx                   app shell — renders MarketingPage today; future router

  features/                 code grouped by product area (a "vertical slice")
    marketing/              PUBLIC HOMEPAGE — the current live site
      MarketingPage.tsx
      components/
        layout/             Navbar, Footer
        sections/           Hero, Services, Features, Gallery, Contact, FAQ, …
    invitation/             PUBLIC /:slug invitation page  (steps 3–12) — scaffold
      InvitationPage.tsx
      templates/            5 visual templates (steps 4 & 12)
      blocks/               OpeningCard, Countdown, Timeline, Gallery, … (steps 5–11)
    admin/                  PRIVATE /admin dashboard       (steps 13–18) — scaffold
      AdminPage.tsx

  components/ui/            SHARED low-level primitives (OptimizedImage, SectionHeader, …)
  components/common/        SHARED composite blocks (EventTimeline, …)
  hooks/                   SHARED React hooks (useReveal, useTheme, …)
  lib/                     SHARED utilities (media, contact, gsap, couples = data loader)
  types/                   SHARED TypeScript types (couple.ts = CoupleData, the data model)
  data/                    couple invitations as JSON (step 2)
    couples/*.json         dewmini-janni (published), amara-nuwan (draft)
  styles/index.css         global Tailwind + design tokens
```

## Routing

`App.tsx` uses **react-router-dom** (`BrowserRouter`):

| URL | Page | Feature |
|-----|------|---------|
| `/`        | `MarketingPage`  | marketing |
| `/admin`   | `AdminPage`      | admin — login-gated (see below) |
| `/admin/preview` | `AdminPreviewPage` | admin — renders the draft from localStorage |
| `/admin/couples/new` | `CoupleNewPage` | admin — create couple (login-gated) |
| `/admin/couples/:slug/edit` | `CoupleEditPage` | admin — couple editor incl. events + gallery (login-gated) |
| `/:slug`   | `InvitationPage` | invitation (e.g. `/dewmini-janni`) → template via `TemplateRenderer` |

### Admin login (MVP)

`/admin` is gated by a **client-side** login (`features/admin/auth.ts`):
`jevents@gmail.com` / `jevents@123`. ⚠️ This is a demo gate only — the
credentials ship in the bundle, so it's not real security. Replace with
server-side auth when the backend lands (Task 2).

`basename` is derived from Vite's `base` (`/Jevents/`) so URLs work locally and
on GitHub Pages. Because GitHub Pages has no server-side routing, deep links are
restored via the SPA fallback in `public/404.html` + the inline script in
`index.html`. (When we move to Next.js / a real domain, routing becomes native
and the 404 shim is dropped.)

**Rule of thumb:** anything used by more than one feature lives in the shared
folders (`components/ui`, `hooks`, `lib`, `types`). Anything specific to one
area lives under that `features/<area>/`.

## Your Next.js plan → this Vite project

The build steps are written for Next.js; here's where each concept lives now
(same idea, adapted — no rebuild). The names carry over cleanly when we migrate.

| Next.js plan        | Here (Vite) |
|---------------------|-------------|
| `app/page.tsx`      | route `/` → `features/marketing/MarketingPage.tsx` |
| `app/[slug]/page.tsx` | route `/:slug` → `features/invitation/InvitationPage.tsx` |
| `app/admin/`        | route `/admin` → `features/admin/AdminPage.tsx` |
| `components/templates/` | `features/invitation/templates/` |
| `components/common/`    | `components/ui/` |
| `lib/`              | `lib/` (incl. `lib/couples.ts`) |
| `data/couples/`     | `data/couples/` |
| `types/couple.ts`   | `types/couple.ts` |

## Import alias

Use `@/` for `src/` — e.g. `import { PHOTOS } from '@/lib/media'`. Configured in
`tsconfig.app.json` (`paths`) and `vite.config.ts` (`resolve.alias`). Prefer it
over deep `../../` paths so files can move freely.

## 20-step roadmap → where it lands

| Steps | Area | Folder |
|-------|------|--------|
| 1 Project structure        | — | this restructure (done) |
| 2 JSON data model          | shared/data | `types/couple.ts`, `data/`, `lib/couples.ts` |
| 3 Dynamic `/:slug` page    | invitation | `features/invitation/InvitationPage.tsx` (done) |
| 4 First template (ClassicFloral) | invitation | `features/invitation/templates/ClassicFloral.tsx` (done) |
| 5 Opening card animation   | invitation | `features/invitation/blocks/OpeningCard.tsx` (done) |
| 6 Countdown timer          | shared | `components/common/Countdown.tsx` (done) |
| 7 Event timeline           | shared | `components/common/EventTimeline.tsx` (done) |
| 8 Gallery                  | shared | `components/common/Gallery.tsx` (done) |
| 9 Music player             | shared | `components/common/MusicPlayer.tsx` (done) |
| 10 RSVP form UI            | shared | `components/common/RSVPForm.tsx` (done) |
| 11 RSVP → Google Sheets    | shared | `RSVPForm` POST + [`docs/google-apps-script-rsvp.js`](docs/google-apps-script-rsvp.js) (done) |
| 12 5 templates             | invitation | `features/invitation/templates/` + `TemplateRenderer` (done) |
| 13 Admin dashboard + login | admin | `features/admin/AdminPage.tsx` (done) |
| 15 Couple editor form      | admin | `features/admin/CoupleEditPage.tsx` → `/admin/couples/:slug/edit` (done) |
| 16 New couple flow         | admin | `features/admin/CoupleNewPage.tsx` → `/admin/couples/new` (done) |
| 17 Editable events         | admin | Events section in `CoupleEditPage` (done) |
| 18 Editable gallery        | admin | Gallery section in `CoupleEditPage` (done) |
| 19 Drag-and-drop ordering  | admin | `features/admin/SortableList.tsx` (dnd-kit, done) |
| 20 MVP media (URLs)        | admin | `MediaField` in `features/admin/fields.tsx` (done) |
| 21 Preview mode            | admin | `features/admin/AdminPreviewPage.tsx` → `/admin/preview` (done) |
| 22 Publish/unpublish       | both | editor toggle + helper text; public gating in `InvitationPage` (done) |
| 23 Add to calendar         | shared | `components/common/AddToCalendarButton.tsx` (done) |
| 24 Share buttons           | shared | `components/common/ShareButtons.tsx` (done) |
| (later) Real media upload  | admin | backend, Task 2 |
| 11,16 Backend (Sheets, uploads) | — | decided in Task 2 |
| 19–20 Mobile polish + cleanup | all | across features |

## Develop

```bash
npm install
npm run dev      # local dev (needs Node 20.19+ / 22.12+ for Vite 8)
npm run build    # tsc -b && vite build  → dist/
npm run lint
```
