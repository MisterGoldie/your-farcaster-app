'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import Loading from '@/components/views/Loading'
import ErrorBoundary from '@/components/ErrorBoundary'

const TicTacToe3D = dynamic(() => import('@/components/TicTacToe3D'), {
  ssr: false,
  loading: () => <Loading />
})

export default function GamePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  try {
    const difficulty = (searchParams?.get('difficulty') as 'easy' | 'medium' | 'hard') || 'easy'
    const piece = (searchParams?.get('piece') as 'pumpkin' | 'scarygary' | 'podplaylogo') || 'pumpkin'
    const isMuted = searchParams?.get('muted') === 'true'

    return (
      <ErrorBoundary
        fallback={
          <div className="min-h-screen w-full flex items-center justify-center">
            <button
              onClick={() => router.push('/menu')}
              className="bg-blue-800 text-white px-8 py-4 rounded-lg"
            >
              Return to Menu
            </button>
          </div>
        }
      >
        <div className="min-h-screen w-full">
          <TicTacToe3D
            difficulty={difficulty}
            piece={piece}
            isMuted={isMuted}
            toggleMute={() => {
              setTimeout(() => {
                window.location.replace(`/game?difficulty=${difficulty}&piece=${piece}&muted=${!isMuted}`)
              }, 100)
            }}
            onRestart={() => {
              window.location.reload()
            }}
            onBackToMenu={() => {
              setTimeout(() => {
                window.location.replace('/menu')
              }, 100)
            }}
          />
        </div>
      </ErrorBoundary>
    )
  } catch (error) {
    console.error('Game page error:', error)
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <button
          onClick={() => router.push('/menu')}
          className="bg-blue-800 text-white px-8 py-4 rounded-lg"
        >
          Return to Menu
        </button>
      </div>
    )
  }
} 