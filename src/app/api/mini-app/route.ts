import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const farcasterUser = req.headers.get('X-Farcaster-User');

  if (!farcasterUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Here you can add logic to fetch user-specific data or game state

  return NextResponse.json({
    name: 'POD Play Tic-Tac-Toe',
    description: 'Play Tic-Tac-Toe in Farcaster!',
    image: 'https://your-farcaster-app.vercel.app/game-preview.png',
    external_url: 'https://your-farcaster-app.vercel.app',
  });
}

