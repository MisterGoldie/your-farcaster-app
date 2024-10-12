import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({
    "type": "composer",
    "name": "POD Play Tic-Tac-Toe",
    "icon": "joystick",
    "description": "View POD Play Tic-Tac-Toe within Farcaster",
    "aboutUrl": "https://your-farcaster-app.vercel.app/",
    "imageUrl": "https://bafybeidnv5uh2ne54dlzyummobyv3bmc7uzuyt5htodvy27toqqhijf4xu.ipfs.w3s.link/PodPlay.gif",
    "action": {
      "type": "web",
      "url": "https://your-farcaster-app.vercel.app"
    }
  });
}

export async function POST(req: NextRequest) {
  return NextResponse.json({
    type: 'web',
    url: 'https://your-farcaster-app.vercel.app',
  });
}
