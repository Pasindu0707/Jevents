# Feature: invitation (public dynamic page `/:slug`)

The guest-facing wedding invitation. One couple → one page, chosen by URL slug
and rendered with the couple's selected template.

Routed in `@/App.tsx` as `/:slug`. Today it renders one basic, mobile-first
layout for every couple (with not-found and not-published states); the 5
templates and the real RSVP form come later.

```
invitation/
  InvitationPage.tsx   reads slug, loads couple, renders the invitation (step 3 ✓)
  templates/           the 5 visual templates (steps 4 & 12)
  blocks/              reusable sections shared by templates (steps 5–11)
```

## Roadmap mapping
| Step | Lives in |
|------|----------|
| 3  Dynamic public page `/[slug]` | `InvitationPage.tsx` |
| 4  First wedding template        | `templates/classic/` |
| 5  Opening card animation        | `blocks/OpeningCard` |
| 6  Countdown timer               | `blocks/Countdown` |
| 7  Event timeline                | `blocks/Timeline` |
| 8  Gallery                       | `blocks/Gallery` |
| 9  Music player                  | `blocks/MusicPlayer` |
| 10 RSVP form                     | `blocks/RsvpForm` |
| 11 RSVP → Google Sheets          | `blocks/RsvpForm` + `@/lib` helper |
| 12 5 templates                   | `templates/{classic,modern,floral,minimal,royal}/` |

Data comes from [`@/lib/couples`](../../lib/couples.ts); shapes from
[`@/types/couple`](../../types/couple.ts).
