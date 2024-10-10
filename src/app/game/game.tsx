'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Game() {
  return (
    <main className="p-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">Tic-Tac-Toe Game</h1>
      <p>Game content will go here.</p>
    </main>
  )
}
