import type { APIRoute } from 'astro'

// https://spec.matrix.org/latest/server-server-api/#getwell-knownmatrixserver
export const GET: APIRoute = () =>
  Response.json({ 'm.server': 'matrix.letzpwn.lu:443' })
