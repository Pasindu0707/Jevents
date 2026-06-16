# Invitation blocks (steps 5–11)

Reusable, template-agnostic sections. Each takes data from an
[`Invitation`](../../../types/invitation.ts) and is composed by the templates.

| Block         | Step | Notes |
|---------------|------|-------|
| `OpeningCard` | 5    | ✅ built — full-screen tap-to-open overlay (React state + Tailwind transitions, no library) |
| `Countdown`   | 6    | ✅ built as [`@/components/common/Countdown`](../../../components/common/Countdown.tsx) — live timer to the wedding date |
| `Timeline`    | 7    | ✅ built as [`@/components/common/EventTimeline`](../../../components/common/EventTimeline.tsx) (renders `events[]`) |
| `Gallery`     | 8    | ✅ built as [`@/components/common/Gallery`](../../../components/common/Gallery.tsx) — responsive grid (lightbox later) |
| `MusicPlayer` | 9    | ✅ built as [`@/components/common/MusicPlayer`](../../../components/common/MusicPlayer.tsx) — floating toggle, starts on opening-card tap |
| `RsvpForm`    | 10   | ✅ built as [`@/components/common/RSVPForm`](../../../components/common/RSVPForm.tsx) — UI + validation (logs to console; Sheets = step 11) |
