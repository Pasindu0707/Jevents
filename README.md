# J Events — Digital Wedding Invitations

A wedding-invitation platform: a public marketing site plus per-couple
invitation pages at `/<slug>` and a lightweight admin at `/admin`.

- **Stack:** React + Vite + TypeScript, Tailwind CSS v4, React Router, dnd-kit.
- **Data:** one JSON file per couple in `src/data/couples/` — **no database** (MVP).
- **Live:** https://pasindu0707.github.io/Jevents/

See [STRUCTURE.md](STRUCTURE.md) for the folder layout and [HOW-IT-WORKS.md](HOW-IT-WORKS.md)
for the full mental model.

## Commands

| Command | What it does |
|---------|--------------|
| `npm install` | Install dependencies (Node **20.19+** required) |
| `npm run dev` | Dev server with hot reload → `http://localhost:5173/Jevents/` |
| `npm run build` | Type-check + production build → `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | ESLint |

## Environment variables

There are **no secret env vars** — this is a static site and the couple data is
public. The only build-time variable:

| Variable | Default | When to set |
|----------|---------|-------------|
| `BASE_PATH` | `/Jevents/` | Set to `/` when deploying to a **root domain** (Vercel, Cloudflare Pages, `jevents.lk`). Leave default for GitHub Pages. |

> The admin password is **hardcoded** in `src/features/admin/auth.ts` (MVP only —
> see “Limitations”). It is not a secret env var and is not real security.

## Add a new couple

1. Go to `/<base>/admin` → log in (`jevents@gmail.com` / `jevents@123`).
2. Click **+ New invitation**, fill bride/groom/slug/date/template → **Generate
   couple JSON** → **Download `<slug>.json`**.
   (Or **Edit** an existing couple, or use **Import** to paste/upload JSON.)
3. Put the file in **`src/data/couples/<slug>.json`**.
4. Commit, push to `main`, and redeploy. The page is live at `/<slug>`.

## Publish / unpublish

Each couple JSON has a boolean `published`.

- **Publish:** set `published: true` (the editor's toggle) → download JSON →
  replace `src/data/couples/<slug>.json` → push/redeploy.
- **Unpublish:** set `published: false` → same steps. While unpublished the
  public page shows “This invitation is not published yet.”

> Because data is baked into the build, **publishing requires a redeploy** — there
> is no live database to flip a flag in (yet).

## Connect Google Sheets RSVP

Full guide: **[docs/GOOGLE_SHEETS_RSVP_SETUP.md](docs/GOOGLE_SHEETS_RSVP_SETUP.md)**.
Script: [docs/google-apps-script-rsvp.js](docs/google-apps-script-rsvp.js). In short:

1. Create a Google Sheet → Extensions → Apps Script → paste the script.
2. Deploy as **Web App**, access **Anyone**, copy the `…/exec` URL.
3. Put it in the couple JSON at `rsvp.googleScriptUrl` → redeploy.

## Deploy

The data is static, so any static host works. Pick one:

### GitHub Pages (current)
Already configured — pushing to `main` runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
which builds with `base=/Jevents/` and publishes `dist/`.

### Vercel (free)
1. Import the repo at vercel.com.
2. Framework preset: **Vite**. Build: `npm run build`. Output: `dist`.
3. Add environment variable **`BASE_PATH=/`**.
4. Add a rewrite so client-side routes work — create `vercel.json`:
   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
   ```
5. Deploy. (On a root domain you can drop the GitHub-Pages `404.html` shim.)

### Cloudflare Pages (free)
1. Pages → Connect the repo.
2. Build command: `npm run build`. Output directory: `dist`.
3. Environment variable: **`BASE_PATH=/`**.
4. SPA routing: add a `public/_redirects` file containing:
   ```
   /*  /index.html  200
   ```
5. Deploy.

## Limitations (MVP)

- **No backend/database** — the admin generates JSON you commit by hand;
  publishing needs a redeploy.
- **Admin login is client-side only** (credentials ship in the bundle) — not
  real security. Replace with server auth when a backend is added.
- **Media is by URL** — host images/video/music elsewhere and paste links;
  there is no upload.
- **Per-couple link previews** (OG image/title) are static at the site level;
  true per-couple share cards need server rendering.
