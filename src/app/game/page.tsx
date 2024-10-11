'use client'

import { useState, useEffect } from 'react'
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

  useEffect(() => {
    document.body.style.backgroundColor = '#1a0505'
    document.body.style.backgroundImage = "url('/images/halloween-bg.png')"
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundAttachment = 'fixed'

    return () => {
      document.body.style.backgroundColor = ''
      document.body.style.backgroundImage = ''
      document.body.style.backgroundSize = ''
      document.body.style.backgroundRepeat = ''
      document.body.style.backgroundAttachment = ''
    }
  }, [])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-orange-500 font-['Frijole']">
      <h1 className="text-6xl mb-8 text-orange-500 shadow-lg shadow-orange-500/50">Spooky Tic-Tac-Toe</h1>
      <TicTacToe3D key={key} onRestart={handleRestart} onBackToHome={handleBackToHome} />
    </main>
  )
}

//