import type { Plausible } from '@barbapapazes/plausible-tracker'
import type {} from 'nuxt/app'
import type { ModuleOptions } from '../module'
import { defineNuxtPlugin, useNuxtApp, useRuntimeConfig } from '#imports'
import { useAutoOutboundTracking } from '@barbapapazes/plausible-tracker/extensions/auto-outbound-tracking'

export default defineNuxtPlugin({
  name: 'plausible:auto-outbound-tracking',
  setup() {
    const options = useRuntimeConfig().public
      .plausible as Required<ModuleOptions>

    const { $plausible } = useNuxtApp()

    if (options.enabled && options.autoOutboundTracking) {
      useAutoOutboundTracking($plausible as Plausible).install()
    }
  },
})
