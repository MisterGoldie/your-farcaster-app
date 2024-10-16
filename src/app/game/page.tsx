'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const TicTacToe3D = dynamic(() => import('../components/TicTacToe3D'), { ssr: false })

export default function Game() {
  const [key, setKey] = useState(0)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [isMuted, setIsMuted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const difficultyFromURL = searchParams.get('difficulty') as 'easy' | 'medium' | 'hard';
    const mutedFromURL = searchParams.get('muted');
    if (difficultyFromURL) {
      setDifficulty(difficultyFromURL);
    }
    if (mutedFromURL) {
      setIsMuted(mutedFromURL === 'true');
    }
  }, []);

  const handleRestart = () => {
    setKey(prevKey => prevKey + 1)
  }

  const handleBackToHome = () => {
    router.push('/')
  }

  const toggleMute = () => {
    setIsMuted(prev => !prev)
  }

  return (
    <main className="h-[100svh] bg-black text-white overflow-hidden">
      <TicTacToe3D 
        key={key}
        onRestart={handleRestart}
        onBackToHome={handleBackToHome}
        difficulty={difficulty}
        isMuted={isMuted}
        toggleMute={toggleMute}
      />
    </main>
  )
}

////