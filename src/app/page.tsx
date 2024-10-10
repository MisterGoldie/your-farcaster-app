import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="p-4 flex flex-col items-center">
      {/* Removed the h1 element */}
      <div style={{ width: '500px', height: '500px', position: 'relative' }}>
        <Image 
          src="https://bafybeidnv5uh2ne54dlzyummobyv3bmc7uzuyt5htodvy27toqqhijf4xu.ipfs.w3s.link/PodPlay.gif" 
          alt="POD Play"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <p className="my-4 text-center">Welcome to POD Play presented by /thepod 🕹️</p>
      <Link href="/howtoplay" className="bg-blue-500 text-white px-4 py-2 rounded text-center">
        Start
      </Link>
    </main>
  )
}
