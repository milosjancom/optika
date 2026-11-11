import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/*
  Password lock for the preview (optika.born.rs).
  Active only when SITE_PASSWORD is set in the hosting environment
  (Vercel → Settings → Environment Variables). Username: SITE_USER or "optika".
  Remove the variable to open the site to everyone.
*/
export function proxy(request: NextRequest) {
  const password = process.env.SITE_PASSWORD
  if (!password) return NextResponse.next()

  const user = process.env.SITE_USER || 'optika'
  const header = request.headers.get('authorization')
  if (header?.startsWith('Basic ')) {
    const [u, p] = atob(header.slice(6)).split(':')
    if (u === user && p === password) return NextResponse.next()
  }
  return new NextResponse('Pristup je zaključan.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Dodji i vidi optika - preview", charset="UTF-8"' },
  })
}

export const config = {
  // Everything except Next internals
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
