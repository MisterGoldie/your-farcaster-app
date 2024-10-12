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
    <main className="h-screen w-screen bg-black text-white overflow-hidden flex items-center justify-center">
      <div className="w-full h-full max-w-md aspect-[9/16] bg-orange-600 rounded-3xl overflow-hidden shadow-lg flex flex-col">
        <TicTacToe3D key={key} onRestart={handleRestart} onBackToHome={handleBackToHome} />
      </div>
    </main>
  )
}

///////
