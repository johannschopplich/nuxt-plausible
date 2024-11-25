import type { ModuleOptions } from '../module'
import { useRuntimeConfig } from '#imports'
import { createPlausibleTracker } from '@barbapapazes/plausible-tracker'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin({
  name: 'plausible',
  setup() {
    const options = useRuntimeConfig().public.plausible as Required<ModuleOptions>

    if (!options.enabled) {
      return
    }

    const plausible = createPlausibleTracker({
      ...options,
      logIgnored: options.logIgnoredEvents,
      domain: options.domain || window.location.hostname,
      apiHost: options.proxy ? options.proxyBaseEndpoint : options.apiHost,
    })

    return {
      provide: {
        plausible,
      },
    }
  },
})
