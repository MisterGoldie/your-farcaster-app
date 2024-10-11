'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const TicTacToe3D = dynamic(() => import('../components/TicTacToe3D'), { ssr: false })

export default function Game() {
  const [state, setState] = useState({
    board: Array(27).fill(null),
    isXNext: true,
    isGameOver: false,
  })

  const handleCellClick = (index: number) => {
    if (state.board[index] || state.isGameOver) return

    const newBoard = [...state.board]
    newBoard[index] = state.isXNext ? 'X' : 'O'

    setState({
      board: newBoard,
      isXNext: !state.isXNext,
      isGameOver: checkWinner(newBoard) !== null || newBoard.every(Boolean),
    })
  }

  const checkWinner = (board: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
    return null
  }

  const resetGame = () => {
    setState({
      board: Array(9).fill(null),
      isXNext: true,
      isGameOver: false,
    })
  }

  const winner = checkWinner(state.board)
  const result = winner ? `Winner: ${winner}` : state.isGameOver ? 'Draw!' : null

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-['Frijole']">
      <h1 className="text-4xl mb-8">Tic-Tac-Toe</h1>
      {state.isGameOver && result && <div className="mb-8 text-2xl">{result}</div>}
      <TicTacToe3D />
      <div className="mt-8 grid grid-cols-3 gap-2"> 
        {state.board.map((cell, index) => (
          <button
            key={index}
            className="w-20 h-20 flex items-center justify-center text-4xl bg-purple-800 hover:bg-purple-700"
            onClick={() => handleCellClick(index)}
            disabled={cell !== null || state.isGameOver}
          >
            {cell}
          </button>
        ))}
      </div>
      {state.isGameOver && (
        <button onClick={resetGame} className="bg-purple-500 text-white px-6 py-3 rounded mt-8 text-xl hover:bg-purple-600 transition-colors">
          New Game
        </button>
      )}
      <Link href="/" className="bg-purple-500 text-white px-6 py-3 rounded mt-4 text-xl hover:bg-purple-600 transition-colors">
        Back to Home
      </Link>
    </main>
  )
}

//