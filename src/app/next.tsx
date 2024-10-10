'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function Next() {
  const searchParams = useSearchParams()
  const result = searchParams.get('result')

  let gifUrl, message
  switch (result) {
    case 'win':
      gifUrl = 'https://bafybeie6qqm6r24chds5smesevkrdsg3jqmgw5wdmwzat7zdze3ukcgd5m.ipfs.w3s.link/giphy-downsized%202.GIF'
      message = 'Congratulations! You won!'
      break
    case 'lose':
      gifUrl = 'https://bafybeighyzexsg3vjxli5o6yfxfxuwrwsjoljnruvwhpqklqdyddpsxxry.ipfs.w3s.link/giphy%202.GIF'
      message = 'Sorry, you lost. Better luck next time!'
      break
    case 'draw':
      gifUrl = 'https://bafybeigniqc263vmmcwmy2l4hitkklyarbu2e6s3q46izzalxswe5wbyaa.ipfs.w3s.link/giphy.GIF'
      message = "It's a draw!"
      break
    default:
      gifUrl = 'https://bafybeigniqc263vmmcwmy2l4hitkklyarbu2e6s3q46izzalxswe5wbyaa.ipfs.w3s.link/giphy.GIF'
      message = 'Game over!'
  }

  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold mb-4">Game Result</h1>
      <div style={{ width: '500px', height: '500px', position: 'relative' }}>
        <Image src={gifUrl} alt="Game Result" layout="fill" objectFit="contain" />
      </div>
      <p className="my-4">{message}</p>
      <Link href="/game" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
        New Game
      </Link>
      <Link href="/share" className="bg-green-500 text-white px-4 py-2 rounded">
        Your Stats
      </Link>
    </main>
  )
}
