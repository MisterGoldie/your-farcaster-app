'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Game() {
  const [board, setBoard] = useState(Array(9).fill(null))

  const handleClick = (index: number) => {
    if (board[index]) return
    const newBoard = [...board]
    newBoard[index] = 'X'
    setBoard(newBoard)
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Tic-Tac-Toe</h1>
      <div className="grid grid-cols-3 gap-2 mb-8">
        {board.map((cell, index) => (
          <button
            key={index}
            className="w-24 h-24 bg-white text-4xl font-bold flex items-center justify-center border-2 border-gray-300"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      <Link href="/" className="bg-purple-500 text-white px-6 py-3 rounded mt-8 text-center text-lg hover:bg-purple-600 transition-colors">
        Back to Home
      </Link>
    </main>
  )
}
