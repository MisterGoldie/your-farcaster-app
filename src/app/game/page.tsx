'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import TicTacToe3D from '@/components/TicTacToe3D'

export default function GamePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [key, setKey] = useState(0)
  
  const difficulty = searchParams.get('difficulty') as 'easy' | 'medium' | 'hard' || 'easy'
  const piece = searchParams.get('piece') as 'pumpkin' | 'scarygary' | 'podplaylogo' || 'pumpkin'
  const isMuted = searchParams.get('muted') === 'true'

  return (
    <TicTacToe3D
      key={key}
      onRestart={() => setKey(prev => prev + 1)}
      onBackToMenu={() => router.push('/menu')}
      difficulty={difficulty}
      piece={piece}
      isMuted={isMuted}
      toggleMute={() => router.push(`/game?difficulty=${difficulty}&piece=${piece}&muted=${!isMuted}`)}
    />
  )
} 