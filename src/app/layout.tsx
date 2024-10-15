import './globals.css'
import { Metadata } from 'next'
import { UserProvider } from './context/UserContext'

export const metadata: Metadata = {
  title: 'POD Play Tic-Tac-Toe',
  description: 'Play Tic-Tac-Toe with POD Play',
  openGraph: {
    title: 'POD Play Tic-Tac-Toe',
    description: 'Play Tic-Tac-Toe with POD Play',
    images: ['https://bafybeiemb5ddkibe2hl4z5iqd5x2wzrkskf5swqu6gksp7yub4lqtczlhu.ipfs.w3s.link/IMG_8500.GIF'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://bafybeiemb5ddkibe2hl4z5iqd5x2wzrkskf5swqu6gksp7yub4lqtczlhu.ipfs.w3s.link/IMG_8500.GIF',
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Frijole&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <body className="bg-black flex items-center justify-center min-h-screen">
        <UserProvider>
          <div className="w-full max-w-md px-4">
            {children}
          </div>
        </UserProvider>
      </body>
    </html>
  )
}
