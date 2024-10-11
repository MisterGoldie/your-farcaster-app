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
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl sm:text-4xl mb-4 sm:mb-8 font-['Frijole']">Tic-Tac-Toe</h1>
      <div className="w-full max-w-md aspect-square">
        <TicTacToe3D key={key} onRestart={handleRestart} onBackToHome={handleBackToHome} />
      </div>
    </main>
  )
}

////