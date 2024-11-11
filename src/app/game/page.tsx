'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const TicTacToe3D = dynamic(() => import('@/components/TicTacToe3D'), { ssr: false })

export default function Game() {
  const [key, setKey] = useState(0)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [piece, setPiece] = useState<'pumpkin' | 'scarygary' | 'podplaylogo'>('pumpkin')
  const [isMuted, setIsMuted] = useState(false)

  const handleRestart = () => {
    setKey(prevKey => prevKey + 1)
  }

  const toggleMute = () => {
    setIsMuted(prev => !prev)
  }

  return (
    <main className="h-[100svh] bg-transparent text-white overflow-hidden">
      <TicTacToe3D 
        key={key}
        onRestart={handleRestart}
        onBackToMenu={handleRestart}
        difficulty={difficulty}
        piece={piece}
        isMuted={isMuted}
        toggleMute={toggleMute}
      />
    </main>
  )
} 