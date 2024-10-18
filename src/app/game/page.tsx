'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const TicTacToe3D = dynamic(() => import('../components/TicTacToe3D'), { ssr: false })

export default function Game() {
  const [key, setKey] = useState(0)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [piece, setPiece] = useState<'pumpkin' | 'scarygary' | 'podplaylogo'>('pumpkin')
  const [isMuted, setIsMuted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const difficultyFromURL = searchParams.get('difficulty') as 'easy' | 'medium' | 'hard';
    const pieceFromURL = searchParams.get('piece') as 'pumpkin' | 'scarygary' | 'podplaylogo';
    const mutedFromURL = searchParams.get('muted');
    if (difficultyFromURL) {
      setDifficulty(difficultyFromURL);
    }
    if (pieceFromURL) {
      setPiece(pieceFromURL);
    }
    if (mutedFromURL) {
      setIsMuted(mutedFromURL === 'true');
    }
  }, []);

  const handleRestart = () => {
    setKey(prevKey => prevKey + 1)
  }

  const handleBackToMenu = () => {
    router.push('/howtoplay')
  }

  function toggleMute(): void {
    throw new Error('Function not implemented.')
  }

  console.log('Piece set in Game component:', piece);

  return (
    <main className="h-[100svh] bg-black text-white overflow-hidden">
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

///
