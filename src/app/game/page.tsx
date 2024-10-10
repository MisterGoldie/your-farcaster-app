'use client'

import { useState } from 'react'
import Link from 'next/link'

type GameState = {
  board: (string | null)[];
  isGameOver: boolean;
}

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function checkWinner(board: (string | null)[]): string | null {
  for (let combo of WINNING_COMBINATIONS) {
    if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
      return board[combo[0]];
    }
  }
  return null;
}

function getAvailableMoves(board: (string | null)[]): number[] {
  return board.reduce((acc, cell, index) => cell === null ? [...acc, index] : acc, [] as number[]);
}

function cpuMove(board: (string | null)[]): number {
  const availableMoves = getAvailableMoves(board);
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

export default function Game() {
  const [state, setState] = useState<GameState>({
    board: Array(9).fill(null),
    isGameOver: false
  });

  const [message, setMessage] = useState("Your turn (O)");

  const handleCellClick = (index: number) => {
    if (state.board[index] || state.isGameOver) return;

    const newBoard = [...state.board];
    newBoard[index] = 'O';

    let winner = checkWinner(newBoard);
    if (winner) {
      setState({ board: newBoard, isGameOver: true });
      setMessage("You win!");
      return;
    }

    if (getAvailableMoves(newBoard).length === 0) {
      setState({ board: newBoard, isGameOver: true });
      setMessage("It's a draw!");
      return;
    }

    const cpuMoveIndex = cpuMove(newBoard);
    newBoard[cpuMoveIndex] = 'X';

    winner = checkWinner(newBoard);
    if (winner) {
      setState({ board: newBoard, isGameOver: true });
      setMessage("CPU wins!");
    } else if (getAvailableMoves(newBoard).length === 0) {
      setState({ board: newBoard, isGameOver: true });
      setMessage("It's a draw!");
    } else {
      setState({ board: newBoard, isGameOver: false });
      setMessage("Your turn (O)");
    }
  };

  const resetGame = () => {
    setState({
      board: Array(9).fill(null),
      isGameOver: false
    });
    setMessage("Your turn (O)");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Tic-Tac-Toe</h1>
      <div className="mb-4">{message}</div>
      <div className="grid grid-cols-3 gap-2 mb-8">
        {state.board.map((cell, index) => (
          <button
            key={index}
            className="w-24 h-24 bg-gray-800 text-4xl font-bold flex items-center justify-center border-2 border-gray-600"
            onClick={() => handleCellClick(index)}
            disabled={cell !== null || state.isGameOver}
          >
            {cell}
          </button>
        ))}
      </div>
      {state.isGameOver && (
        <button onClick={resetGame} className="bg-purple-500 text-white px-6 py-3 rounded mt-8 text-center text-lg hover:bg-purple-600 transition-colors">
          New Game
        </button>
      )}
      <Link href="/" className="bg-purple-500 text-white px-6 py-3 rounded mt-8 text-center text-lg hover:bg-purple-600 transition-colors">
        Back to Home
      </Link>
    </main>
  )
}
