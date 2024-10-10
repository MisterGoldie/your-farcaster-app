import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="p-4 flex flex-col items-center">
      <p className="my-4 text-center text-xl">
        Welcome to POD Play presented by /thepod 🕹️
      </p>
      <div style={{ width: '500px', height: '500px', position: 'relative', margin: '20px 0' }}>
        <video autoPlay loop muted playsInline>
          <source src="https://bafybeiec5czbnll2ochunnvjnky2mijpoqrplpadob4ojuc7ebfmuk2yma.ipfs.w3s.link/ipfs/bafybeiec5czbnll2ochunnvjnky2mijpoqrplpadob4ojuc7ebfmuk2yma/POD%20PLAY.MOV" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <Link href="/howtoplay" className="bg-purple-500 text-white px-6 py-3 rounded mt-8 text-center text-lg hover:bg-purple-600 transition-colors" style={{ fontFamily: "'Rock Salt', cursive" }}>
        Start
      </Link>
    </main>
  )
}
