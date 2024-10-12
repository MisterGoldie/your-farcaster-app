'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import TicTacToe3D from '../components/TicTacToe3D'
import { UserProvider } from '@/app/context/UserContext'

export default function Game() {
  const router = useRouter()

  const handleRestart = () => {
    // Add restart logic here
    console.log('Restarting game')
  }

  const handleBackToHome = () => {
    router.push('/')
  }

  return (
    <UserProvider>
      <TicTacToe3D 
        onRestart={handleRestart} 
        onBackToHome={handleBackToHome}
      />
    </UserProvider>
  )
}

///////
