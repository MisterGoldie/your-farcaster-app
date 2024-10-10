import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe Game',
  description: 'A simple Tic-Tac-Toe game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Butcherman&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
