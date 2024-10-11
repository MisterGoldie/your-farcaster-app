import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="p-4 flex flex-col items-center">
      <p className="my-4 text-center text-xl">
        Welcome to POD Play presented by /thepod 🕹️
      </p>
      
      <div style={{ width: '500px', height: '500px', position: 'relative', margin: '20px 0' }}>
        <Image 
          src="https://bafybeidnv5uh2ne54dlzyummobyv3bmc7uzuyt5htodvy27toqqhijf4xu.ipfs.w3s.link/PodPlay.gif" 
          alt="POD Play"
          layout="fill"
          objectFit="contain"
        />
      </div>
      
      <Link href="/howtoplay" className="bg-purple-500 text-white px-6 py-3 rounded mt-8 text-center text-lg hover:bg-orange-600 transition-colors">
        Start
      </Link>
    </main>
  )
}
