import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  // Handle the post action here
  return NextResponse.json({
    version: 'vNext',
    ogImage: 'https://your-farcaster-app.vercel.app/game-started.png',
    image: 'https://your-farcaster-app.vercel.app/game-started.png',
    title: 'Game Started!',
    description: 'Your Tic-Tac-Toe game has begun.',
  });
}

export async function GET(req: NextRequest) {
  return NextResponse.json({
    version: 'vNext',
    ogImage: 'https://your-farcaster-app.vercel.app/your-image.png',
    image: 'https://your-farcaster-app.vercel.app/your-image.png',
    title: 'POD Play Tic-Tac-Toe',
    description: 'Play Tic-Tac-Toe presented by /thepod',
    buttons: [
      {
        label: 'Start Game',
        action: 'post'
      }
    ],
  });
}
