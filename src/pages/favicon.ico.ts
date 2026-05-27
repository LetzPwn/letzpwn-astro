import type { APIRoute } from 'astro'
import sharp from 'sharp'
import ico from 'sharp-ico'
import path from 'path'

const faviconSrc = path.resolve('public/assets/logo.png')

let cachedIco: Buffer | null = null

export const GET: APIRoute = async () => {
  if (!cachedIco) {
    const buffer = await sharp(faviconSrc).resize(32).toFormat('png').toBuffer()
    cachedIco = ico.encode([buffer])
  }

  return new Response(cachedIco, {
    headers: {
      'Content-Type': 'image/x-icon',
      'Cache-Control': 'public, max-age=86400, immutable'
    }
  })
}
