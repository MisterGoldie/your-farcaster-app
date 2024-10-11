import Link from 'next/link'

export default function HowToPlay() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="max-w-4xl w-full bg-black bg-opacity-50 rounded-lg shadow-lg p-6 sm:p-10">
        <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-center text-white">How to Play Tic-Tac-Toe</h1>
        <div className="relative w-full max-w-md mx-auto mb-8">
          <img 
            src="https://bafybeifzk7uojcicnh6yhnqvoldkpzuf32sullm34ela266xthbidca6ny.ipfs.w3s.link/HowToPlay%20(1).png"
            alt="How to Play"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="flex justify-center">
          <Link href="/game" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full text-lg sm:text-xl transition-colors duration-200 transform hover:scale-105">
            Start Game
          </Link>
        </div>
      </div>
    </main>
  )
}
