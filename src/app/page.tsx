'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="h-[100svh] w-full bg-transparent flex items-center justify-center p-4">
      <div className="w-full max-w-md aspect-[3/4] bg-white rounded-lg p-1">
        <div className="w-full h-full bg-orange-600 rounded-lg overflow-hidden flex flex-col relative">
          <div className="bg-orange-700 py-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-white" style={{ fontFamily: 'Nosifer, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              Tic-Tac-Crude
            </h1>
          </div>
          <div className="flex-grow flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-xs sm:max-w-sm aspect-square relative mb-8">
              <Image 
                src="/intro.gif"
                alt="Maxi Image"
                width={500}
                height={300}
                onError={() => console.error('Failed to load image')}
              />
            </div>
            <Link 
              href="/howtoplay" 
              className="bg-orange-800 text-white px-6 py-3 rounded text-lg sm:text-xl hover:bg-red-900 transition-colors text-shadow-custom"
            >
              Enter
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
