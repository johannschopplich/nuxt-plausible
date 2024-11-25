import type { ModuleOptions } from '../../module'
import { useRuntimeConfig } from '#imports'
import { createError, defineEventHandler, getRequestIP, proxyRequest } from 'h3'
import { joinURL } from 'ufo'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const options = config.public.plausible as Required<ModuleOptions>

  if (!options?.apiHost) {
    throw createError({
      statusCode: 500,
      message: 'Plausible API host not configured',
    })
  }

  try {
    const target = joinURL(options.apiHost, 'api/event')
    return proxyRequest(event, target, {
      headers: {
        'X-Forwarded-For': getRequestIP(event, { xForwardedFor: true }),
      },
    })
  }
  catch (error) {
    console.error(error)

    throw createError({
      statusCode: 502,
      message: 'Failed to proxy request to Plausible API',
    })
  }
})
