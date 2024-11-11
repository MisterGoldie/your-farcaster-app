'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import Loading from '@/components/views/Loading'

const TicTacToe3D = dynamic(() => import('@/components/TicTacToe3D'), {
  ssr: false,
  loading: () => <Loading />
})

export default function GamePage() {
  const searchParams = useSearchParams()
  
  const difficulty = (searchParams?.get('difficulty') as 'easy' | 'medium' | 'hard') || 'easy'
  const piece = (searchParams?.get('piece') as 'pumpkin' | 'scarygary' | 'podplaylogo') || 'pumpkin'
  const isMuted = searchParams?.get('muted') === 'true'

  return (
    <div className="min-h-screen w-full">
      <TicTacToe3D
        difficulty={difficulty}
        piece={piece}
        isMuted={isMuted}
        toggleMute={() => {}}
        onRestart={() => {}}
        onBackToMenu={() => window.location.href = '/menu'}
      />
    </div>
  )
} 