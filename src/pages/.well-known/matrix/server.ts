import type { APIRoute } from 'astro'

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      "m.server": "matrix.letzpwn.lu:443"
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
}
