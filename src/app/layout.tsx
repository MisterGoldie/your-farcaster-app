import './globals.css'
import { Metadata } from 'next'
import React from 'react'

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
      <body>
        <div className="w-full h-screen flex items-center justify-center bg-black p-4">
          <div className="w-full h-full max-w-[500px] max-h-[800px] border-4 border-white rounded-lg overflow-hidden relative">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}