'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const TicTacToe3D = dynamic(() => import('../components/TicTacToe3D'), { ssr: false })

export default function Game() {
  const [key, setKey] = useState(0)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const router = useRouter()

  const handleRestart = () => {
    setKey(prevKey => prevKey + 1)
  }

  const handleBackToHome = () => {
    router.push('/')
  }

  const handleChangeDifficulty = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(newDifficulty)
  }

  return (
    <main className="h-[100svh] bg-black text-white overflow-hidden">
      <TicTacToe3D 
        key={key}
        onRestart={handleRestart}
        onBackToHome={handleBackToHome}
        difficulty={difficulty}
        onChangeDifficulty={handleChangeDifficulty}
      />
    </main>
  )
}

///////