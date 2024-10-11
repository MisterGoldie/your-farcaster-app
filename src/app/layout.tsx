import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'POD Play Tic-Tac-Toe',
  description: 'A Tic-Tac-Toe game presented by /thepod',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Frijole&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="flex justify-center items-center min-h-screen bg-black p-4">
          <div className="border-4 border-white p-4 rounded-lg max-w-4xl w-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}