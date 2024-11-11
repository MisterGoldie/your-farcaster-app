'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const MenuBoard = dynamic(() => import('@/components/MenuBoard'), {
  ssr: false,
  loading: () => (
    <div className="h-[100svh] w-full flex items-center justify-center">
      <div className="text-white text-2xl">Loading...</div>
    </div>
  )
})

export default function MenuPage() {
  const router = useRouter()
  const [isMuted, setIsMuted] = useState(false)

  return (
    <MenuBoard 
      onStartGame={(difficulty, piece) => {
        router.push(`/game?difficulty=${difficulty}&piece=${piece}&muted=${isMuted}`)
      }}
      onGoBack={() => router.push('/')}
      isMuted={isMuted}
      toggleMute={() => setIsMuted(prev => !prev)}
    />
  )
} 