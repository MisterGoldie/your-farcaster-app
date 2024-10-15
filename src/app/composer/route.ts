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
    url: 'https://your-farcaster-app.vercel.app', // Updated URL
  } as ComposerActionFormResponse);
}

export async function GET(req: NextRequest) {
  return NextResponse.json({
    "type": "composer",
    "name": "POD Play Tic-Tac-Toe",
    "icon": "joystick",
    "description": "View POD Play Tic-Tac-Toe within Farcaster",
    "aboutUrl": "https://your-farcaster-app.vercel.app/",
    "imageUrl": "https://bafybeiemb5ddkibe2hl4z5iqd5x2wzrkskf5swqu6gksp7yub4lqtczlhu.ipfs.w3s.link/IMG_8500.GIF",
    "action": {
      "type": "post"
    }
  } as ComposerActionMetadata);
}
