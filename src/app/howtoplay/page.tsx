'use client'

import { useState, useContext } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const MenuBoard = dynamic(() => import('../../components/MenuBoard'), { ssr: false })

export default function HowToPlay() {
  const router = useRouter()
  const [isMuted, setIsMuted] = useState(false)

  const handleStartGame = (difficulty: 'easy' | 'medium' | 'hard', piece: 'pumpkin' | 'scarygary') => {
    router.push(`/game?difficulty=${difficulty}&piece=${piece}&muted=${isMuted}`)
  }

  const handleGoBack = () => {
    router.push('/')
  }

  const toggleMute = () => {
    setIsMuted(prev => !prev)
  }

  // Default no-op functions to avoid errors
  const handleBackButton = () => {}
  const playHalloweenMusic = () => {}
  const stopHalloweenMusic = () => {}

  return (
    <main className="h-[100svh] bg-transparent text-white overflow-hidden">
      <MenuBoard 
        onStartGame={(difficulty, piece) => handleStartGame(difficulty, piece as 'pumpkin' | 'scarygary')}
        onGoBack={handleGoBack}
        isMuted={isMuted}
        toggleMute={toggleMute}
      />
    </main>
  )
}
