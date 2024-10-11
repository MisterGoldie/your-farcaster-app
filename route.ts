import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta property="og:title" content="POD Play Tic-Tac-Toe">
  <meta property="og:image" content="https://bafybeidnv5uh2ne54dlzyummobyv3bmc7uzuyt5htodvy27toqqhijf4xu.ipfs.w3s.link/PodPlay.gif">
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="https://bafybeidnv5uh2ne54dlzyummobyv3bmc7uzuyt5htodvy27toqqhijf4xu.ipfs.w3s.link/PodPlay.gif">
  <meta property="fc:frame:button:1" content="Play Tic-Tac-Toe">
  <meta property="fc:frame:post_url" content="${req.nextUrl.origin}/api/frame">
</head>
<body>
  <h1>POD Play Tic-Tac-Toe</h1>
  <p>Welcome to the Farcaster Frame for POD Play Tic-Tac-Toe!</p>
</body>
</html>
  `;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);

  // Here you would typically handle the game logic
  // For now, we'll just return a simple response

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta property="og:title" content="POD Play Tic-Tac-Toe">
  <meta property="og:image" content="https://bafybeidnv5uh2ne54dlzyummobyv3bmc7uzuyt5htodvy27toqqhijf4xu.ipfs.w3s.link/PodPlay.gif">
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="https://bafybeidnv5uh2ne54dlzyummobyv3bmc7uzuyt5htodvy27toqqhijf4xu.ipfs.w3s.link/PodPlay.gif">
  <meta property="fc:frame:button:1" content="Play Again">
  <meta property="fc:frame:post_url" content="${req.nextUrl.origin}/api/frame">
</head>
<body>
  <h1>Thanks for playing!</h1>
  <p>You can play again by clicking the button.</p>
</body>
</html>
  `;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}