# Data — couple invitations (Step 2)

Each wedding invitation ("couple") is one JSON file in [`couples/`](couples/), shaped
by the [`CoupleData`](../types/couple.ts) type.

- Read them through [`@/lib/couples`](../lib/couples.ts) (`getCoupleBySlug`,
  `getPublishedCouples`, `getAllCouples`) — never import the JSON directly elsewhere.
- The public page at `/:slug` (see `features/invitation`) and the admin
  (`features/admin`) both use this same shape.

Samples: `dewmini-janni.json` (published — test at `/dewmini-janni`) and
`amara-nuwan.json` (draft — shows the "not published yet" state).

When the backend arrives (Task 2), replace the body of `@/lib/couples` with API
calls; callers stay unchanged.
