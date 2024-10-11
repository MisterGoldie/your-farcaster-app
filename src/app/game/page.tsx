'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

const TicTacToe3D = dynamic(() => import('../components/TicTacToe3D'), { ssr: false })

export default function Game() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-['Frijole']">
      <h1 className="text-4xl mb-8">3D Tic-Tac-Toe</h1>
      <TicTacToe3D />
      <Link href="/" className="bg-purple-500 text-white px-6 py-3 rounded mt-4 text-xl hover:bg-purple-600 transition-colors">
        Back to Home
      </Link>
    </main>
  )
}

//