'use client'

import React, { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Loading from '@/components/views/Loading'

const MenuBoard = dynamic(() => import('@/components/MenuBoard'), {
  ssr: false,
  loading: () => <Loading />
})

function MenuPage() {
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

export default function MenuRoute() {
  return (
    <Suspense fallback={<Loading />}>
      <MenuPage />
    </Suspense>
  )
} 