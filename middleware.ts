import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/frame') || 
      request.nextUrl.pathname.startsWith('/api/frame/services') ||
      request.nextUrl.pathname.startsWith('/api/auth')) {
    // Skip NextAuth for these routes
    return NextResponse.next()
  }

  // For all other routes, allow NextAuth to handle the request
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api/frame|api/frame/services|api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}
