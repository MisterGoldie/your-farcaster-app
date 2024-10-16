'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const MenuBoard = dynamic(() => import('../components/MenuBoard'), { ssr: false })

export default function HowToPlay() {
  const router = useRouter()
  const [isMuted, setIsMuted] = useState(false)

  const handleStartGame = (difficulty: 'easy' | 'medium' | 'hard') => {
    router.push(`/game?difficulty=${difficulty}&muted=${isMuted}`)
  }

  const handleGoBack = () => {
    router.push('/')
  }

  const toggleMute = () => {
    setIsMuted(prev => !prev)
  }

  return (
    <main className="h-[100svh] bg-black text-white overflow-hidden">
      <MenuBoard onStartGame={handleStartGame} onGoBack={handleGoBack} isMuted={false} toggleMute={function (): void {
        throw new Error('Function not implemented.')
      } } />
    </main>
  )
}
