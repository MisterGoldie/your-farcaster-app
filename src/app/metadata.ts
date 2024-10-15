import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'POD Play Tic-Tac-Toe',
  description: 'Play Tic-Tac-Toe in Farcaster!',
  openGraph: {
    images: ['https://your-farcaster-app.vercel.app/game-preview.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://your-farcaster-app.vercel.app/game-preview.png',
    'fc:frame:button:1': 'Play Now',
    'fc:frame:post_url': 'https://your-farcaster-app.vercel.app/api/frame',
  },
}
