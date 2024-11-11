'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import useSound from 'use-sound'

export default function LandingPage() {
  const router = useRouter()
  const [playClick] = useSound('/click.mp3', { volume: 0.5 })

  return (
    <div className="h-[100svh] w-full bg-transparent flex items-center justify-center p-4">
      <div className="w-full max-w-md aspect-[3/4] bg-white rounded-lg p-1">
        <div className="w-full h-full bg-blue-600 rounded-lg overflow-hidden flex flex-col relative">
          <div className="bg-blue-700 py-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-white">
              TIC-TAC-CRUDE
            </h1>
          </div>
          <div className="flex-grow flex items-center justify-center">
            <button
              onClick={() => {
                console.log('Enter button clicked')
                try {
                  playClick()
                  window.location.href = '/menu'
                } catch (error) {
                  console.error('Navigation error:', error)
                }
              }}
              className="bg-blue-800 text-white px-8 py-4 rounded-lg text-xl hover:bg-red-900 transition-colors"
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
//////