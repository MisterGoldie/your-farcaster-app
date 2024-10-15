import { NextRequest, NextResponse } from 'next/server';

const EMPTY_BOARD = '---------';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { buttonIndex, state } = data;
  
  let board = state?.board || EMPTY_BOARD;
  let currentPlayer = state?.currentPlayer || 'X';

  if (buttonIndex >= 1 && buttonIndex <= 9) {
    const index = buttonIndex - 1;
    if (board[index] === '-') {
      board = board.substring(0, index) + currentPlayer + board.substring(index + 1);
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  const winner = checkWinner(board);
  const isDraw = !winner && !board.includes('-');

  return NextResponse.json({
    version: 'vNext',
    image: `https://your-farcaster-app.vercel.app/api/image?board=${board}&player=${currentPlayer}`,
    title: winner ? `${winner} wins!` : isDraw ? 'It\'s a draw!' : `${currentPlayer}'s turn`,
    description: 'Play Tic-Tac-Toe on Farcaster!',
    buttons: generateButtons(board),
    state: { board, currentPlayer }
  });
}

export async function GET(req: NextRequest) {
  return NextResponse.json({
    version: 'vNext',
    image: 'https://your-farcaster-app.vercel.app/game-preview.png',
    title: 'POD Play Tic-Tac-Toe',
    description: 'Play Tic-Tac-Toe on Farcaster!',
    buttons: [{ label: 'Start Game', action: 'post' }],
  });
}

function checkWinner(board: string): string | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (const [a, b, c] of lines) {
    if (board[a] !== '-' && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function generateButtons(board: string) {
  return board.split('').map((cell, index) => ({
    label: cell === '-' ? ' ' : cell,
    action: 'post'
  }));
}
