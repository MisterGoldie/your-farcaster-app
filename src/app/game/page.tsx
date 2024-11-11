'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import Loading from '@/components/views/Loading'

const TicTacToe3D = dynamic(() => import('@/components/TicTacToe3D'), {
  ssr: false,
  loading: () => <Loading />
})

export default function GamePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const difficulty = (searchParams.get('difficulty') as 'easy' | 'medium' | 'hard') || 'easy'
  const piece = (searchParams?.get('piece') as 'pumpkin' | 'scarygary' | 'podplaylogo') || 'pumpkin'
  const isMuted = searchParams?.get('muted') === 'true'

  return (
    <div className="min-h-screen w-full">
      <TicTacToe3D
        difficulty={difficulty}
        piece={piece}
        isMuted={isMuted}
        toggleMute={() => {
          router.push(`/game?difficulty=${difficulty}&piece=${piece}&muted=${!isMuted}`)
        }}
        onRestart={() => {
          router.refresh()
        }}
        onBackToMenu={() => {
          router.push('/menu')
        }}
      />
    </div>
  )
} 