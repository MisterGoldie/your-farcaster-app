import { NextRequest, NextResponse } from 'next/server';

type ComposerActionFormResponse = {
  type: 'form';
  title: string;
  url: string;
};

type ComposerActionMetadata = {
  type: 'composer';
  name: string;
  icon: string;
  description: string;
  aboutUrl: string;
  imageUrl: string;
  action: {
    type: string;
  };
};

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);

  return NextResponse.json({ 
    type: 'form',
    title: 'POD Play Tic-Tac-Toe',
    url: 'https://your-farcaster-app.vercel.app', // Replace with your actual deployed URL
  } as ComposerActionFormResponse);
}

export async function GET(req: NextRequest) {
  return NextResponse.json({
    "type": "composer",
    "name": "POD Play Tic-Tac-Toe",
    "icon": "joystick",
    "description": "View POD Play Tic-Tac-Toe within Farcaster",
    "aboutUrl": "https://your-farcaster-app.vercel.app/",
    "imageUrl": "https://bafybeidnv5uh2ne54dlzyummobyv3bmc7uzuyt5htodvy27toqqhijf4xu.ipfs.w3s.link/PodPlay.gif",
    "action": {
      "type": "post"
    }
  } as ComposerActionMetadata);
}
