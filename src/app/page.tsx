import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to POD Play Tic-Tac-Toe</h1>
      <div style={{ width: '500px', height: '500px', position: 'relative' }}>
        <Image 
          src="https://bafybeidnv5uh2ne54dlzyummobyv3bmc7uzuyt5htodvy27toqqhijf4xu.ipfs.w3s.link/PodPlay.gif" 
          alt="POD Play"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <p className="my-4">Welcome to POD Play presented by /thepod 🕹️. Think you can win a game of Tic-Tac-Toe?</p>
      <Link href="/howtoplay" className="bg-blue-500 text-white px-4 py-2 rounded">
        Start
      </Link>
    </main>
  )
}
