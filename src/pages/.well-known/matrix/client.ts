import type { APIRoute } from 'astro'

// https://spec.matrix.org/latest/client-server-api/#getwell-knownmatrixclient
// `m.server` is not part of the client discovery response, but it is kept
// because it is what letzpwn.lu has been serving and clients ignore it.
export const GET: APIRoute = () =>
  Response.json({
    'm.server': { base_url: 'https://matrix.letzpwn.lu' },
    'm.homeserver': { base_url: 'https://matrix.letzpwn.lu' },
    // Element Call (MSC4143) — without this, group calls lose their SFU.
    'org.matrix.msc4143.rtc_foci': [
      { type: 'livekit', livekit_service_url: 'https://livekit.letzpwn.lu' }
    ],
    'org.matrix.msc3575.proxy': { url: 'https://matrix.letzpwn.lu' }
  })
