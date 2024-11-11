import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tic-Tac-Crude',
  description: 'A 3D Tic-Tac-Toe game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="icon" 
          href="/favicon.ico"
          type="image/x-icon"
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen w-full bg-black">
          {children}
        </div>
      </body>
    </html>
  )
}
