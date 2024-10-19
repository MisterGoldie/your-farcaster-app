'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ComposerAction() {
  const [message, setMessage] = useState("POD Play Tic-Tac-Toe is awesome! Can you beat me?")
  const [shareStatus, setShareStatus] = useState<string | null>(null)

  const handleShare = async () => {
    console.log('handleShare function called');
    setShareStatus('Sharing...');
    try {
      const payload = {
        type: 'composer',
        name: "POD Play",
        description: "Play Tic-Tac-Toe on Farcaster!",
        action: {
          type: "post",
        },
        cast: {
          text: message,
          embeds: [`${process.env.NEXT_PUBLIC_URL}`]
        }
      };
      console.log('Payload:', JSON.stringify(payload, null, 2));

      const response = await fetch('/api/launcher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to share');
      }

      console.log('Shared successfully');
      setShareStatus('Shared successfully!');
    } catch (error) {
      console.error('Error in handleShare:', error);
      setShareStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
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

        <div className="flex flex-col space-y-4">
          <button 
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
            onClick={handleShare}
          >
            Share on Farcaster
          </button>
          <Link 
            href="/game"
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-center"
          >
            Play Game
          </Link>
          {shareStatus && (
            <div className={`text-center p-2 rounded ${
              shareStatus.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {shareStatus}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
