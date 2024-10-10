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
    <main className="p-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">Tic-Tac-Toe</h1>
      <div className="mb-4">{message}</div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {state.board.map((cell, index) => (
          <button
            key={index}
            className="w-20 h-20 bg-gray-200 text-4xl flex items-center justify-center"
            onClick={() => handleCellClick(index)}
            disabled={cell !== null || state.isGameOver}
          >
            {cell}
          </button>
        ))}
      </div>
      {state.isGameOver && (
        <button onClick={resetGame} className="bg-blue-500 text-white px-4 py-2 rounded">
          New Game
        </button>
      )}
      <Link href="/" className="mt-4 bg-purple-500 text-white px-4 py-2 rounded">
        Back to Home
      </Link>
    </main>
  )
}
//