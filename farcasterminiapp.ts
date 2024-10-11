import type { NextApiRequest, NextApiResponse } from "next";

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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ComposerActionFormResponse | ComposerActionMetadata>
) {
  if (req.method === 'GET') {
    res.status(200).json({
      "type": "composer",
      "name": "POD Play Tic-Tac-Toe",
      "icon": "gamepad",
      "description": "Play Tic-Tac-Toe presented by /thepod",
      "aboutUrl": "https://your-farcaster-app.vercel.app/about",
      "imageUrl": "https://bafybeidnv5uh2ne54dlzyummobyv3bmc7uzuyt5htodvy27toqqhijf4xu.ipfs.w3s.link/PodPlay.gif",
      "action": {
        "type": "post",
      }
    });
  } else if (req.method === 'POST') {
    const data = req.body;
    console.log(data);

    res.status(200).json({
      type: 'form',
      title: 'POD Play Tic-Tac-Toe',
      url: 'https://your-farcaster-app.vercel.app', // Replace with your actual deployed app URL
    });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}