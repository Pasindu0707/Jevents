# Invitation templates (steps 4 & 12)

Each template is a component that receives [`CoupleData`](../../../types/couple.ts)
and renders a complete invitation in a distinct visual style. They all compose
the same shared building blocks — [`Countdown`](../../../components/common/Countdown.tsx),
[`EventTimeline`](../../../components/common/EventTimeline.tsx),
[`Gallery`](../../../components/common/Gallery.tsx),
[`RSVPForm`](../../../components/common/RSVPForm.tsx),
[`MusicPlayer`](../../../components/common/MusicPlayer.tsx) and the
[`OpeningCard`](../blocks/OpeningCard.tsx) — so only the styling differs.

| `template` id (in JSON) | Component | Look |
|-------------------------|-----------|------|
| `classic-floral`        | `ClassicFloral` | elegant ivory + serif, floral dividers |
| `luxury-gold`           | `LuxuryGold` | dark, opulent, gold accents |
| `minimal-modern`        | `MinimalModern` | clean white, simple sans-serif |
| `romantic-story`        | `RomanticStory` | image-heavy, love-story focused, blush |
| `traditional-sri-lankan`| `TraditionalSriLankan` | warm maroon/gold, Sinhala/Tamil font stack |

[`TemplateRenderer.tsx`](TemplateRenderer.tsx) maps `couple.template` → component
and falls back to `ClassicFloral` for unknown values. `InvitationPage` renders
`TemplateRenderer`, so changing `template` in a couple's JSON switches the whole
public page design.
