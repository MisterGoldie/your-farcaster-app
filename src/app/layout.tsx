import './globals.css'
import { Metadata } from 'next'
import { UserProvider } from './context/UserContext'

// Use the provided IPFS image
const frameImageUrl = 'https://bafybeicodlej4oiq6fq5lfztym5tvgndslczfqyvquvpamdloqvjrf7lly.ipfs.w3s.link/image%2019.png'

export const metadata: Metadata = {
  title: 'POD Play Tic-Tac-Toe',
  description: 'Play Tic-Tac-Toe with POD Play',
  openGraph: {
    title: 'POD Play Tic-Tac-Toe',
    description: 'Play Tic-Tac-Toe with POD Play',
    images: [frameImageUrl],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': frameImageUrl,
    'fc:frame:button:1': 'Enter',
    'fc:frame:button:1:action': 'post',
    'fc:frame:post_url': 'https://your-farcaster-app.vercel.app/api/howtoplay',
    'frames.js:version': '0.19.3',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
