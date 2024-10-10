'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Game() {
  const [state, setState] = useState({
    board: Array(9).fill(null),
    currentPlayer: 'O',
    isGameOver: false
  })
  const router = useRouter()

  const makeMove = (index: number) => {
    if (state.board[index] === null && !state.isGameOver) {
      const newBoard = [...state.board]
      newBoard[index] = state.currentPlayer
      setState(prevState => ({
        ...prevState,
        board: newBoard,
        currentPlayer: prevState.currentPlayer === 'O' ? 'X' : 'O'
      }))
    }
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

  useEffect(() => {
    const winner = checkWinner(state.board)
    if (winner) {
      setState(prevState => ({ ...prevState, isGameOver: true }))
      router.push(`/next?result=${winner === 'O' ? 'win' : 'lose'}`)
    } else if (!state.board.includes(null)) {
      setState(prevState => ({ ...prevState, isGameOver: true }))
      router.push('/next?result=draw')
    } else if (state.currentPlayer === 'X') {
      // Computer turn
      setTimeout(() => {
        const emptyIndices = state.board.reduce((acc: number[], cell, index) => 
          cell === null ? [...acc, index] : acc, [])
        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)]
        makeMove(randomIndex)
      }, 500)
    }
  }, [state.board, state.currentPlayer])

  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold mb-4">POD Play Tic-Tac-Toe</h1>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {state.board.map((cell, index) => (
          <button 
            key={index} 
            className="w-20 h-20 bg-gray-200 text-4xl"
            onClick={() => makeMove(index)}
            disabled={cell !== null || state.isGameOver}
          >
            {cell}
          </button>
        ))}
      </div>
      <div id="message" className="mb-4">
        {state.isGameOver ? 'Game Over!' : `Current player: ${state.currentPlayer}`}
      </div>
    </main>
  )
}
