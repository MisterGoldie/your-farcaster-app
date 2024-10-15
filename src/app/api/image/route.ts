import { NextRequest, NextResponse } from 'next/server';
import { createCanvas, loadImage } from 'canvas';

export async function GET(req: NextRequest) {
  const canvas = createCanvas(600, 400);
  const ctx = canvas.getContext('2d');

  // Draw background
  ctx.fillStyle = '#f97316';
  ctx.fillRect(0, 0, 600, 400);

  // Draw text
  ctx.font = '40px Frijole';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText('POD Play Tic-Tac-Toe', 300, 200);

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

