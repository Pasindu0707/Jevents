# How J Events works (full disclosure)

The one fact that explains everything: **this is a static site with no server and
no database.** Couple data lives in JSON files that are **compiled into the build**
at deploy time. The browser never reads files at runtime.

## Running it

```bash
npm install            # Node 20.19+
npm run dev            # http://localhost:5173/Jevents/
npm run build          # tsc + vite → dist/
npm run preview        # serve dist/
```
Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages under `/Jevents/`.

## What happens when a guest opens `/<slug>`

```
/Jevents/dewmini-janni
  → React Router matches /:slug                (src/App.tsx)
  → InvitationPage reads the slug              (src/features/invitation/)
  → getCoupleBySlug() finds it in bundled JSON (src/lib/couples.ts)
       not found        → 404 message
       published:false  → "not published yet"
       published:true   → TemplateRenderer → the couple's template
            → OpeningCard, Countdown, EventTimeline, Gallery,
              MusicPlayer, RSVPForm, AddToCalendar, ShareButtons
```

## The big consequence: the admin doesn't save

The dashboard, editor, “New couple”, drag-and-drop and publish toggle **never
write to a database or disk** — there's nothing to write to. Every admin action
ends by **generating a JSON file you download**. To make a change live you must:

1. Download / copy the generated `<slug>.json`
2. Put it in `src/data/couples/`
3. Commit & push to `main`
4. Wait for the redeploy (~1–2 min)

So the admin is a **“JSON generator with a nice UI”**, not a live CMS (yet).

## What you must do manually

| Task | Steps |
|------|-------|
| **New couple** | Admin → New/Edit/Import → Save → download → drop in `src/data/couples/` → push |
| **Publish/unpublish** | Toggle `published` → Save → replace JSON → push |
| **Images / video / music** | Host them (or put in `public/assets/`) and paste the URL — no upload |
| **RSVP → Sheets** | One-time Apps Script setup, paste `…/exec` URL into `rsvp.googleScriptUrl` (see docs) |
| **Change admin password** | Edit `src/features/admin/auth.ts` → redeploy |

## What's automatic

Routing, template selection, countdown, opening animation, gallery, drag-and-drop
ordering in the editor, JSON generation, calendar + share links, and build/deploy
on push.

## Honest limitations

- **Admin login is not real security** — it's a `sessionStorage` check and the
  credentials ship in the JS bundle. Couple JSON is also public. Keeps casual
  visitors out, nothing more.
- **Publishing needs a redeploy** (data is baked into the build).
- **One JS bundle** — admin/public are code-split so guests don't download the
  editor, but it's still a client-only app.
- **Per-couple link previews** (WhatsApp/OG image) are limited: the share
  *message* is dynamic, but the preview *image/title* is the site-level default.
  True per-couple cards need server rendering (the planned Next.js move).

The mental model: **Admin → generate JSON → commit → redeploy.** That loop is the
whole content workflow until a real backend exists.
