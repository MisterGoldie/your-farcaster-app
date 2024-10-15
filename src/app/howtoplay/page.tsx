'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const MenuBoard = dynamic(() => import('../components/MenuBoard'), { ssr: false })

export default function HowToPlay() {
  const router = useRouter()

  const handleStartGame = (difficulty: 'easy' | 'medium' | 'hard') => {
    router.push(`/game?difficulty=${difficulty}`)
  }

  const handleGoBack = () => {
    router.push('/')
  }

  return (
    <main className="h-[100svh] w-full bg-black flex items-center justify-center p-4">
      <div className="w-full h-full max-w-[calc(100vh*3/4)] aspect-[3/4] bg-white rounded-lg p-1">
        <MenuBoard onStartGame={handleStartGame} onGoBack={handleGoBack} />
      </div>
    </main>
  )
}
////////
