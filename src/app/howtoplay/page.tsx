'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const MenuBoard = dynamic(() => import('../components/MenuBoard'), { ssr: false })

export default function HowToPlay() {
  const router = useRouter()

  const handleStartGame = (difficulty: 'easy' | 'medium' | 'hard') => {
    router.push(`/game?difficulty=${difficulty}`)
  }

  const handleGoBack = () => {
    router.push('/')
  }

  return (
    <main className="h-[100svh] w-full bg-black flex items-center justify-center p-4">
      <div className="w-full h-full max-w-[calc(100vh*3/4)] aspect-[3/4] bg-white rounded-lg p-1">
        <div className="w-full h-full bg-orange-600 rounded-lg overflow-hidden flex flex-col">
          <div className="bg-orange-700 py-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-white" style={{ fontFamily: 'Frijole, cursive', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              MAIN MENU
            </h1>
          </div>
          <div className="flex-grow flex flex-col items-center justify-center">
            <p className="text-white text-xl mb-4">Select Game:</p>
            <button
              onClick={() => handleStartGame('easy')}
              className="bg-black text-white px-6 py-3 rounded text-lg hover:bg-gray-800 transition-colors mb-4"
            >
              Tic-Tac-Toe
            </button>
          </div>
          <div className="bg-orange-700 py-3 flex justify-center">
            <button
              onClick={handleGoBack}
              className="bg-orange-800 text-white px-6 py-2 rounded text-lg hover:bg-orange-900 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
/////
