'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
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
      
      <Link 
        href="/howtoplay" 
        className="bg-orange-600 text-white px-6 py-3 rounded text-lg sm:text-xl hover:bg-orange-800 transition-colors text-shadow-custom"
      >
        Start Game
      </Link>
    </main>
  )
}/////