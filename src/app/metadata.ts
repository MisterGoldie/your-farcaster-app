import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'POD Play Tic-Tac-Toe',
  description: 'Play Tic-Tac-Toe presented by /thepod',
  openGraph: {
    title: 'POD Play Tic-Tac-Toe',
    description: 'Play Tic-Tac-Toe presented by /thepod',
    images: ['https://your-farcaster-app.vercel.app/your-image.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://your-farcaster-app.vercel.app/your-image.png',
    'fc:frame:button:1': 'Start Game',
    'fc:frame:post_url': 'https://your-farcaster-app.vercel.app/api/frame',
  },
}
