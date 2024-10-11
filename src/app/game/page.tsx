'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
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
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-['Frijole']">
      <h1 className="text-4xl mb-8">3D Tic-Tac-Toe</h1>
      <TicTacToe3D key={key} onRestart={handleRestart} onBackToHome={handleBackToHome} />
      <div className="mt-8 flex gap-4">
        <button onClick={handleRestart} className="bg-purple-500 text-white px-6 py-3 rounded text-xl hover:bg-purple-600 transition-colors">
          Restart Game
        </button>
        <button onClick={handleBackToHome} className="bg-purple-500 text-white px-6 py-3 rounded text-xl hover:bg-purple-600 transition-colors">
          Back to Home
        </button>
      </div>
    </main>
  )
}

//