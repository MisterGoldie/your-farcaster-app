import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const response = NextResponse.json({
    // ... your response data ...
  });

  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; worker-src blob:; connect-src 'self' https://api.airstack.xyz; img-src 'self' data: https:; frame-src 'self' https://vercel.live;"
  );

  return response;
}

export const config = {
  matcher: '/:path*',
};
