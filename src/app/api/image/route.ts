import { NextRequest, NextResponse } from 'next/server';
import { createCanvas } from '@napi-rs/canvas';

export async function GET(req: NextRequest) {
  const board = req.nextUrl.searchParams.get('board') || '---------';
  const player = req.nextUrl.searchParams.get('player') || 'X';

  const canvas = createCanvas(600, 600);
  const ctx = canvas.getContext('2d');

  // Draw board
  ctx.fillStyle = '#f97316';
  ctx.fillRect(0, 0, 600, 600);

  // Draw grid
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(200, 0);
  ctx.lineTo(200, 600);
  ctx.moveTo(400, 0);
  ctx.lineTo(400, 600);
  ctx.moveTo(0, 200);
  ctx.lineTo(600, 200);
  ctx.moveTo(0, 400);
  ctx.lineTo(600, 400);
  ctx.stroke();

  // Draw X's and O's
  ctx.font = 'bold 150px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < 9; i++) {
    const x = (i % 3) * 200 + 100;
    const y = Math.floor(i / 3) * 200 + 100;
    if (board[i] === 'X') {
      ctx.fillStyle = '#3b82f6';
      ctx.fillText('X', x, y);
    } else if (board[i] === 'O') {
      ctx.fillStyle = '#ef4444';
      ctx.fillText('O', x, y);
    }
  }

  // Draw current player
  ctx.font = 'bold 40px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(`${player}'s turn`, 300, 580);

  // Convert canvas to buffer
  const buffer = canvas.toBuffer('image/png');

  // Return the image
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'max-age=10',
    },
  });
}
