import { createContext, useContext } from 'react'

/**
 * Tracks whether the entrance gate ("VIEW INVITATION") has been opened.
 *
 * Why this exists: the entrance is a *fixed overlay*, so the sections behind it
 * are already in the viewport while it is showing. Their scroll-reveal triggers
 * therefore fired immediately, and by the time the overlay faded the content was
 * fully revealed — it simply appeared, with no animation. Sections now hold
 * their reveal until the gate opens, so the content animates in as the veil
 * lifts.
 *
 * Defaults to `open: true` so anything rendering sections outside CouplePage
 * (the Puck admin preview) and couples with no entrance section behave exactly
 * as before.
 */
export interface EntranceGate {
  open: boolean
  openGate: () => void
}

export const EntranceGateContext = createContext<EntranceGate>({
  open: true,
  openGate: () => {},
})

export function useEntranceGate(): EntranceGate {
  return useContext(EntranceGateContext)
}
