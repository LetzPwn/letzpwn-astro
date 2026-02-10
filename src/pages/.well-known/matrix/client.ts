import type { APIRoute } from 'astro'

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      "m.server": {
        "base_url": "https://matrix.letzpwn.lu"
      },
      "m.homeserver": {
        "base_url": "https://matrix.letzpwn.lu"
      },
      "org.matrix.msc3575.proxy": {
        "url": "https://matrix.letzpwn.lu"
      }
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
}
