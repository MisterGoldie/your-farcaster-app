'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [castText, setCastText] = useState('')

  const handleCreateCast = () => {
    window.parent.postMessage({
      type: "createCast",
      data: {
        cast: {
          text: castText,
          embeds: ["https://your-farcaster-app.vercel.app"]
        }
      }
    }, "*");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 sm:p-8">
      <h1 className="text-2xl sm:text-4xl mb-4 sm:mb-8 font-['Frijole'] text-center">
        POD Play Tic-Tac-Toe
      </h1>
      
      <p className="text-lg sm:text-xl mb-6 text-center max-w-md">
        Welcome to POD Play presented by /thepod 🕹️
      </p>
      
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square relative mb-8">
        <Image 
          src="https://bafybeiemb5ddkibe2hl4z5iqd5x2wzrkskf5swqu6gksp7yub4lqtczlhu.ipfs.w3s.link/IMG_8500.GIF" 
          alt="POD Play"
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
      
      <textarea
        value={castText}
        onChange={(e) => setCastText(e.target.value)}
        placeholder="Enter your cast text here"
        className="w-full max-w-md mb-4 p-2 text-black rounded"
      />
      
      <button 
        onClick={handleCreateCast}
        className="bg-orange-500 text-white px-6 py-3 rounded text-lg sm:text-xl hover:bg-purple-600 transition-colors mb-4"
      >
        Create Cast
      </button>
      
      <Link 
        href="/howtoplay" 
        className="bg-orange-500 text-white px-6 py-3 rounded text-lg sm:text-xl hover:bg-purple-600 transition-colors"
      >
        Start Game
      </Link>
    </main>
  )
}