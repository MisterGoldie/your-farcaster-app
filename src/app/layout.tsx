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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Frijole&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <body className="bg-black flex items-center justify-center min-h-screen">
        {children}
      </body>
    </html>
  )
}
