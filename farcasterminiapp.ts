import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    res.status(200).json({
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
  } else if (req.method === 'POST') {
    res.status(200).json({
      type: 'web',
      url: 'https://your-farcaster-app.vercel.app',
    });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
