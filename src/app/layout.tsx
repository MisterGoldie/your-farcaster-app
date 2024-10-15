import './globals.css'
import { Metadata } from 'next'
import { UserProvider } from './context/UserContext'

// Use a smaller, optimized image for the frame
const frameImageUrl = 'https://i.imgur.com/YourOptimizedImage.png' // Replace with your actual optimized image URL

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
