'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import Loading from '@/components/views/Loading'

const MenuBoard = dynamic(() => import('@/components/MenuBoard'), {
  ssr: false,
  loading: () => <Loading />
})

export default function MenuPage() {
  return (
    <div className="min-h-screen w-full">
      <MenuBoard 
        onStartGame={(difficulty, piece) => {
          window.location.href = `/game?difficulty=${difficulty}&piece=${piece}`
        }}
        onGoBack={() => window.location.href = '/'}
        isMuted={false}
        toggleMute={() => {}}
      />
    </div>
  )
} 