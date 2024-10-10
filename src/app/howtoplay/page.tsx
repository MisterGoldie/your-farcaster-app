import Link from 'next/link'
import Image from 'next/image'

export default function HowToPlay() {
  return (
    <main className="p-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-center">How to Play Tic-Tac-Toe</h1>
      <div className="flex flex-col items-center">
        <Image 
          src="https://bafybeifzk7uojcicnh6yhnqvoldkpzuf32sullm34ela266xthbidca6ny.ipfs.w3s.link/HowToPlay%20(1).png" 
          alt="How to Play"
          width={500}
          height={500}
        />
        <Link href="/game" className="bg-purple-500 text-white px-6 py-3 rounded mt-8 text-center text-lg hover:bg-blue-600 transition-colors">
          Start Game
        </Link>
      </div>
    </main>
  )
}
