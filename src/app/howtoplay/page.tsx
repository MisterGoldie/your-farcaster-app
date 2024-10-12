import Link from 'next/link'
import Image from 'next/image'

export default function HowToPlay() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="max-w-4xl w-full bg-black bg-opacity-50 rounded-lg shadow-lg p-6 sm:p-10">
        <div className="w-full max-w-md aspect-square relative mb-8">
          <Image 
            src="https://bafybeicodlej4oiq6fq5lfztym5tvgndslczfqyvquvpamdloqvjrf7lly.ipfs.w3s.link/image%2019.png"
            alt="How to Play"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        <div className="flex justify-center">
          <Link href="/game" className="bg-orange-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full text-lg sm:text-xl transition-colors duration-200 transform hover:scale-105">
            Start Game
          </Link>
        </div>
      </div>
    </main>
  )
}
