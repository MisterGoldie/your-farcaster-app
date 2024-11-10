'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import GameComponent from './GameComponent'; // Import the GameComponent

// Correct the import path using the @ alias
const TicTacToe3D = dynamic(() => import('@/components/TicTacToe3D'), { ssr: false })

export default function Game() {
  const [key, setKey] = useState(0)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [piece, setPiece] = useState<'pumpkin' | 'scarygary' | 'podplaylogo'>('pumpkin')
  const [isMuted, setIsMuted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const difficultyFromURL = searchParams.get('difficulty') as 'easy' | 'medium' | 'hard'
    const pieceFromURL = searchParams.get('piece') as 'pumpkin' | 'scarygary' | 'podplaylogo'
    const mutedFromURL = searchParams.get('muted')

    if (difficultyFromURL && ['easy', 'medium', 'hard'].includes(difficultyFromURL)) {
      setDifficulty(difficultyFromURL)
    }

    if (pieceFromURL && ['pumpkin', 'scarygary', 'podplaylogo'].includes(pieceFromURL)) {
      setPiece(pieceFromURL)
    }

    if (mutedFromURL) {
      setIsMuted(mutedFromURL === 'true')
    }
  }, [])

  const handleRestart = () => {
    setKey(prevKey => prevKey + 1)
  }

  const handleBackToMenu = () => {
    router.push('/howtoplay')
  }

  // Implement proper toggleMute function instead of throwing error
  const toggleMute = () => {
    setIsMuted(prev => !prev)
  }

  console.log('Piece set in Game component:', piece)

  const fid = 'USER_FID_HERE'; // Replace with actual FID retrieval logic

  return (
    <main className="h-[100svh] bg-transparent text-white overflow-hidden">
      <GameComponent fid={fid} /> {/* Include the GameComponent */}
      <TicTacToe3D 
        key={key}
        onRestart={handleRestart}
        onBackToMenu={handleBackToMenu}
        difficulty={difficulty}
        piece={piece}
        isMuted={isMuted}
        toggleMute={toggleMute}
      />
    </main>
  )
}
