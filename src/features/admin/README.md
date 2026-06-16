# Feature: admin (`/admin`)

Private dashboard J Events uses to create and manage couple invitations.
Today the public site is at `pasindu0707.github.io/Jevents/`; the target is
`jevents.lk` (public) + `jevents.lk/admin` (this feature).

## Roadmap mapping
| Step | What |
|------|------|
| 13 Admin dashboard           | `AdminPage.tsx` — stats + couples list, Preview/Edit links (routed at `/admin` ✓) |
| 14 Login (MVP)               | `auth.ts` + `LoginForm.tsx` — session gate ✓ |
| 15 Couple editor form        | `CoupleEditPage.tsx` at `/admin/couples/:slug/edit` — edits `CoupleData`, Save outputs JSON to copy/download ✓ |
| 16 New couple flow           | `CoupleNewPage.tsx` at `/admin/couples/new` — slug suggest/validate, generates default JSON ✓ |
| 17 Editable events           | Events section in `CoupleEditPage` — add/remove/edit ✓ |
| 18 Editable gallery          | Gallery section in `CoupleEditPage` — add/remove/edit + preview ✓ |
| 19 Drag-and-drop ordering    | [`SortableList.tsx`](SortableList.tsx) (dnd-kit) on events + gallery ✓ |
| 20 MVP media (URLs)          | `MediaField` in [`fields.tsx`](fields.tsx) — previews + URL validation ✓ |
| 21 Preview mode              | [`AdminPreviewPage.tsx`](AdminPreviewPage.tsx) at `/admin/preview` via [`preview.ts`](preview.ts) (localStorage) ✓ |
| (later) Real media upload    | file upload → storage (backend, Task 2) |

Shared admin UI: [`fields.tsx`](fields.tsx) (form primitives + `MediaField`),
[`JsonOutput.tsx`](JsonOutput.tsx) (copy/download panel), [`SortableList.tsx`](SortableList.tsx)
(drag-and-drop).

> Needs a backend for persistence, auth, media upload and RSVP storage —
> deferred to Task 2 ("decide later"). Until then this reads the JSON via
> [`@/lib/couples`](../../lib/couples.ts).
