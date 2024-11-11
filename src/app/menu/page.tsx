'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import MenuBoard from '@/components/MenuBoard'

export default function MenuPage() {
  const router = useRouter()
  const [isMuted, setIsMuted] = useState(false)

  const handleStartGame = (difficulty: 'easy' | 'medium' | 'hard', piece: 'pumpkin' | 'scarygary' | 'podplaylogo') => {
    router.push(`/game?difficulty=${difficulty}&piece=${piece}&muted=${isMuted}`)
  }

  return (
    <MenuBoard 
      onStartGame={handleStartGame}
      onGoBack={() => router.push('/')}
      isMuted={isMuted}
      toggleMute={() => setIsMuted(prev => !prev)}
    />
  )
} 