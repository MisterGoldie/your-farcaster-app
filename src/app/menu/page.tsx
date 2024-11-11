'use client'

import React, { useState, Suspense, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Loading from '@/components/views/Loading'
import ErrorBoundary from '@/components/ErrorBoundary'

// Remove suspense from dynamic options
const MenuBoard = dynamic(() => import('@/components/MenuBoard'), {
  ssr: false,
  loading: () => <Loading />
})

function MenuPage() {
  const router = useRouter()
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadComponent = async () => {
      try {
        setIsLoading(true)
        await import('@/components/MenuBoard')
        setIsLoading(false)
      } catch (err) {
        console.error('Failed to load MenuBoard:', err)
        setError(err instanceof Error ? err : new Error('Failed to load MenuBoard'))
        setIsLoading(false)
      }
    }
    
    loadComponent()
  }, [])

  if (error) {
    return (
      <div className="h-[100svh] w-full bg-orange-600 flex items-center justify-center">
        <div className="text-white text-xl">
          <h2>Failed to load menu</h2>
          <button 
            onClick={() => router.push('/')}
            className="mt-4 bg-orange-800 px-4 py-2 rounded hover:bg-orange-900"
          >
            Return Home
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="h-[100svh] w-full bg-orange-600">
      <ErrorBoundary
        fallback={
          <div className="h-full flex items-center justify-center text-white text-xl">
            <div>
              <h2>Something went wrong</h2>
              <button 
                onClick={() => router.push('/')}
                className="mt-4 bg-orange-800 px-4 py-2 rounded hover:bg-orange-900"
              >
                Return Home
              </button>
            </div>
          </div>
        }
      >
        <Suspense fallback={<Loading />}>
          <MenuBoard 
            onStartGame={(difficulty, piece) => {
              router.push(`/game?difficulty=${difficulty}&piece=${piece}&muted=${isMuted}`)
            }}
            onGoBack={() => router.push('/')}
            isMuted={isMuted}
            toggleMute={() => setIsMuted(prev => !prev)}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default function MenuRoute() {
  return (
    <Suspense fallback={<Loading />}>
      <MenuPage />
    </Suspense>
  )
} 