import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add CSP header
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live blob:; worker-src blob:; connect-src 'self' https://api.airstack.xyz; img-src 'self' data: https:;"
  );

  return response;
}

export const config = {
  matcher: '/:path*',
};

