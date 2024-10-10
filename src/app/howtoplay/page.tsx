import Link from 'next/link'

export default function HowToPlay() {
  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold mb-4">How to Play Tic-Tac-Toe</h1>
      {/* ... other content ... */}
      <Link href="/game" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block">
        Start Game
      </Link>
    </main>
  )
}
