'use client'

import React, { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Loading from '@/components/views/Loading'
import ErrorBoundary from '@/components/ErrorBoundary'
import useSound from 'use-sound'

const MenuBoard = dynamic(() => import('@/components/MenuBoard'), {
  ssr: false,
  loading: () => <Loading />
})

function MenuPage() {
  const router = useRouter()
  const [isMuted, setIsMuted] = useState(false)
  const [playClick] = useSound('/click.mp3', { volume: 0.5 })

  const handleStartGame = (difficulty: 'easy' | 'medium' | 'hard', piece: 'pumpkin' | 'scarygary' | 'podplaylogo') => {
    playClick()
    const url = `/game?difficulty=${difficulty}&piece=${piece}&muted=${isMuted}`
    window.location.href = url
  }

  const handleGoBack = () => {
    playClick()
    window.location.href = '/'
  }

  return (
    <ErrorBoundary
      fallback={
        <div className="h-[100svh] w-full bg-orange-600 flex items-center justify-center">
          <div className="text-white text-xl">
            <h2>Something went wrong</h2>
            <button 
              onClick={handleGoBack}
              className="mt-4 bg-orange-800 px-4 py-2 rounded hover:bg-orange-900"
            >
              Return Home
            </button>
            <button 
              onClick={() => router.push('/menu')}
              className="mt-4 bg-orange-800 px-4 py-2 rounded hover:bg-orange-900"
            >
              Enter
            </button>
          </div>
        </div>
      }
    >
      <Suspense fallback={<Loading />}>
        <MenuBoard 
          onStartGame={handleStartGame}
          onGoBack={handleGoBack}
          isMuted={isMuted}
          toggleMute={() => setIsMuted(prev => !prev)}
        />
      </Suspense>
    </ErrorBoundary>
  )
}

export default function MenuRoute() {
  return <MenuPage />
} 