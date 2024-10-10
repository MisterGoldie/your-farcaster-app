'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Define types and constants
type GameState = {
  board: (string | null)[];
  currentPlayer: 'O' | 'X';
  isGameOver: boolean;
}

const COORDINATES = ['A1', 'B1', 'C1', 'A2', 'B2', 'C2', 'A3', 'B3', 'C3'];

// Helper functions
const checkWin = (board: (string | null)[]) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

const getBestMove = (board: (string | null)[], player: 'O' | 'X') => {
  // Implement minimax algorithm here
  // For simplicity, we'll just choose a random empty cell
  const emptyCells = board.reduce((acc, cell, index) => {
    if (cell === null) acc.push(index);
    return acc;
  }, [] as number[]);
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

export default function Game() {
  const [state, setState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'O',
    isGameOver: false
  });
  const [message, setMessage] = useState("New game started! Your turn.");
  const [gameResult, setGameResult] = useState<'win' | 'lose' | 'draw' | null>(null);

  const handleMove = (index: number) => {
    if (state.board[index] || state.isGameOver) return;

    const newBoard = [...state.board];
    newBoard[index] = 'O';
    
    let newMessage = `You moved at ${COORDINATES[index]}.`;
    let newGameResult = null;
    let isGameOver = false;

    if (checkWin(newBoard)) {
      newGameResult = 'win';
      newMessage = "You win! Game over.";
      isGameOver = true;
    } else if (newBoard.every((cell) => cell !== null)) {
      newGameResult = 'draw';
      newMessage = "Game over! It's a Tie.";
      isGameOver = true;
    } else {
      const computerMove = getBestMove(newBoard, 'X');
      newBoard[computerMove] = 'X';
      newMessage += ` Computer moved at ${COORDINATES[computerMove]}.`;
      
      if (checkWin(newBoard)) {
        newGameResult = 'lose';
        newMessage += " Computer wins! Game over.";
        isGameOver = true;
      } else if (newBoard.every((cell) => cell !== null)) {
        newGameResult = 'draw';
        newMessage += " It's a draw. Game over.";
        isGameOver = true;
      } else {
        newMessage += " Your turn.";
      }
    }

    setState({
      board: newBoard,
      currentPlayer: 'O',
      isGameOver: isGameOver
    });
    setMessage(newMessage);
    setGameResult(newGameResult as 'win' | 'lose' | 'draw' | null);
  }

  const resetGame = () => {
    setState({
      board: Array(9).fill(null),
      currentPlayer: 'O',
      isGameOver: false
    });
    setMessage("New game started! Your turn.");
    setGameResult(null);
  }

  return (
    <main className="p-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">Tic-Tac-Toe</h1>
      <div className="mb-4">{message}</div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {state.board.map((cell, index) => (
          <button
            key={index}
            className="w-20 h-20 bg-gray-200 text-4xl flex items-center justify-center"
            onClick={() => handleMove(index)}
            disabled={cell !== null || state.isGameOver}
          >
            {cell}
          </button>
        ))}
      </div>
      {state.isGameOver && (
        <div className="flex gap-2">
          <button onClick={resetGame} className="bg-blue-500 text-white px-4 py-2 rounded">
            New Game
          </button>
          <Link href={`/next?result=${gameResult}`} className="bg-green-500 text-white px-4 py-2 rounded">
            Next
          </Link>
          <Link href="/share" className="bg-purple-500 text-white px-4 py-2 rounded">
            Your Stats
          </Link>
        </div>
      )}
      <Link href="/" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Back to Home
      </Link>
    </main>
  )
}
