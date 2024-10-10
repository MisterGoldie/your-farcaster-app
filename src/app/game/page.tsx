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
  [0, 4, 8], [2, 4, 6]             // Diagonal
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
  const bestMove = minimax(board, 'X');
  return bestMove.index;
}

function minimax(board: (string | null)[], player: 'X' | 'O'): { score: number; index: number } {
  const availableMoves = getAvailableMoves(board);

  if (checkWinner(board) === 'O') {
    return { score: -10, index: -1 };
  } else if (checkWinner(board) === 'X') {
    return { score: 10, index: -1 };
  } else if (availableMoves.length === 0) {
    return { score: 0, index: -1 };
  }

  const moves = availableMoves.map((index) => {
    const newBoard = [...board];
    newBoard[index] = player;

    const score = minimax(newBoard, player === 'X' ? 'O' : 'X').score;

    return { score, index };
  });

  if (player === 'X') {
    const bestMove = moves.reduce((best, move) => (move.score > best.score ? move : best));
    return bestMove;
  } else {
    const bestMove = moves.reduce((best, move) => (move.score < best.score ? move : best));
    return bestMove;
  }
}

export default function Game() {
  const [state, setState] = useState<GameState>({
    board: Array(9).fill(null),
    isGameOver: false
  });

  const [result, setResult] = useState<string | null>(null);

  const handleCellClick = (index: number) => {
    if (state.board[index] || state.isGameOver) return;

    const newBoard = [...state.board];
    newBoard[index] = 'O';

    let winner = checkWinner(newBoard);
    if (winner) {
      setState({ board: newBoard, isGameOver: true });
      setResult("You win!");
      return;
    }

    if (getAvailableMoves(newBoard).length === 0) {
      setState({ board: newBoard, isGameOver: true });
      setResult("It's a draw!");
      return;
    }

    const cpuMoveIndex = cpuMove(newBoard);
    newBoard[cpuMoveIndex] = 'X';

    winner = checkWinner(newBoard);
    if (winner) {
      setState({ board: newBoard, isGameOver: true });
      setResult("CPU wins!");
    } else if (getAvailableMoves(newBoard).length === 0) {
      setState({ board: newBoard, isGameOver: true });
      setResult("It's a draw!");
    } else {
      setState({ board: newBoard, isGameOver: false });
    }
  };

  const resetGame = () => {
    setState({
      board: Array(9).fill(null),
      isGameOver: false
    });
    setResult(null);
  };

  return (
    <main className="p-4 flex flex-col items-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">Tic-Tac-Toe</h1>
      {state.isGameOver && result && <div className="mb-4">{result}</div>}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {state.board.map((cell, index) => (
          <button
            key={index}
            className="w-20 h-20 bg-gray-800 text-4xl flex items-center justify-center border border-gray-600"
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
