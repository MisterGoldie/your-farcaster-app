'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ComposerAction() {
  const [message, setMessage] = useState("POD Play Tic-Tac-Toe is awesome! Can you beat me?")

  const handleShare = async () => {
    try {
      const response = await fetch('/api/launcher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'composer',
          data: {
            cast: {
              text: message,
              embeds: ["https://your-farcaster-app.vercel.app"]
            }
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to share');
      }

      // Handle successful share
      console.log('Shared successfully');
    } catch (error) {
      console.error('Error sharing:', error);
      // Display error to user (you might want to use a state variable for this)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-orange-600">
      <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4" style={{ fontFamily: 'Frijole, cursive' }}>
          POD Play 🕹️
        </h1>
        
        <div className="mb-4">
          <Image 
            src="https://bafybeiemb5ddkibe2hl4z5iqd5x2wzrkskf5swqu6gksp7yub4lqtczlhu.ipfs.w3s.link/IMG_8500.GIF"
            alt="POD Play"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>

        <textarea
          className="w-full p-2 border rounded mb-4"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-between">
          <button 
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
            onClick={handleShare}
          >
            Share on Farcaster
          </button>
          <Link 
            href="/game"
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            Play Game
          </Link>
        </div>
      </div>
    </main>
  )
}
