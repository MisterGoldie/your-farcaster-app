'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const TicTacToe3D = dynamic(() => import('../components/TicTacToe3D'), { ssr: false })

export default function Game() {
  const [key, setKey] = useState(0)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  const router = useRouter()

  useEffect(() => {
    console.log("Current difficulty in Game component:", difficulty);
  }, [difficulty]);

  const changeDifficulty = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(newDifficulty);
    console.log("Difficulty changed to:", newDifficulty);
  }

  const handleRestart = () => {
    setKey(prevKey => prevKey + 1)
  }

  const handleBackToHome = () => {
    router.push('/')
  }

  return (
    <main className="h-[100svh] bg-black text-white overflow-hidden">
      <TicTacToe3D 
        key={key}
        onRestart={handleRestart}
        onBackToHome={handleBackToHome}
        difficulty={difficulty}
        onChangeDifficulty={changeDifficulty}
      />
    </main>
  )
}

///////