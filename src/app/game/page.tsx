'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const TicTacToe3D = dynamic(() => import('../components/TicTacToe3D'), { ssr: false })

export default function Game() {
  const [key, setKey] = useState(0)
  const router = useRouter()

  const handleRestart = () => {
    setKey(prevKey => prevKey + 1)
  }

  const handleBackToHome = () => {
    router.push('/')
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="w-full h-screen max-w-md mx-auto">
        <h1 className="text-2xl sm:text-4xl pt-4 font-['Frijole'] text-center">Tic-Tac-Toe</h1>
        <div className="h-[calc(100vh-4rem)]">
          <TicTacToe3D key={key} onRestart={handleRestart} onBackToHome={handleBackToHome} />
        </div>
      </div>
    </main>
  )
}

////