import Link from 'next/link'
import Image from 'next/image'

export default function HowToPlay() {
  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold mb-4">How to Play Tic-Tac-Toe</h1>
      <Image 
        src="https://bafybeifzk7uojcicnh6yhnqvoldkpzuf32sullm34ela266xthbidca6ny.ipfs.w3s.link/HowToPlay%20(1).png" 
        alt="How to Play"
        width={500}
        height={500}
      />
      <Link href="/game" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block">
        Start Game
      </Link>
    </main>
  )
}
