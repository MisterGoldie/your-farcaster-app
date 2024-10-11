import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <head>
        <meta property="og:title" content="POD Play Tic-Tac-Toe" />
        <meta property="og:image" content="https://bafybeidnv5uh2ne54dlzyummobyv3bmc7uzuyt5htodvy27toqqhijf4xu.ipfs.w3s.link/PodPlay.gif" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://bafybeidnv5uh2ne54dlzyummobyv3bmc7uzuyt5htodvy27toqqhijf4xu.ipfs.w3s.link/PodPlay.gif" />
        <meta property="fc:frame:button:1" content="Play Tic-Tac-Toe" />
        <meta property="fc:frame:post_url" content="https://your-farcaster-app.vercel.app/api/compose" />
      </head>
      <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="max-w-4xl w-full bg-black bg-opacity-50 rounded-lg shadow-lg p-6 sm:p-10">
          <h1 className="text-2xl sm:text-4xl font-bold text-center mb-6 text-white">
            Welcome to POD Play presented by /thepod 🕹️
          </h1>
          
          <div className="relative w-full aspect-square max-w-md mx-auto mb-8">
            <Image 
              src="https://bafybeidnv5uh2ne54dlzyummobyv3bmc7uzuyt5htodvy27toqqhijf4xu.ipfs.w3s.link/PodPlay.gif" 
              alt="POD Play"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
          
          <div className="flex justify-center">
            <Link 
              href="/howtoplay" 
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full text-lg sm:text-xl transition-colors duration-200 transform hover:scale-105"
            >
              Start Playing
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
