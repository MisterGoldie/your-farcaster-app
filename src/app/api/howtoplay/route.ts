import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Handle the POST request from the frame
  // For now, we'll just return a simple response
  return new NextResponse(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>How to Play</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://bafybeicodlej4oiq6fq5lfztym5tvgndslczfqyvquvpamdloqvjrf7lly.ipfs.w3s.link/image%2019.png" />
        <meta property="fc:frame:button:1" content="Start Game" />
        <meta property="fc:frame:button:1:action" content="post" />
        <meta property="fc:frame:post_url" content="https://your-farcaster-app.vercel.app/api/game" />
      </head>
      <body>
        <h1>How to Play</h1>
        <p>Instructions for playing the game would go here.</p>
      </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html' },
  });
}
