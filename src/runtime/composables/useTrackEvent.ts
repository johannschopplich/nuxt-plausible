import { useNuxtApp } from '#imports'
import type Plausible from 'plausible-tracker'

/**
 * Tracks a custom event
 *
 * @remarks
 * Track your defined goals by passing the goal's name as the argument `eventName`
 *
 * @example
 * // Tracks the `signup` goal
 * useTrackEvent('signup')
 *
 * // Tracks the `Download` goal passing a `method` property.
 * useTrackEvent('Download', { props: { method: 'HTTP' } })
 */
export function useTrackEvent(
  ...args: Parameters<ReturnType<typeof Plausible>['trackEvent']>
) {
  if (import.meta.client) {
    useNuxtApp().$plausible.trackEvent(...args)
  }
}
