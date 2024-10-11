import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="border-4 border-white p-6 sm:p-10 rounded-lg">
        <h1 className="text-2xl sm:text-4xl mb-4 sm:mb-8 font-['Frijole'] text-center">
          POD Play
        </h1>
        
        <p className="text-lg sm:text-xl mb-6 text-center max-w-md">
          Welcome to POD Play presented by /thepod 🕹️
        </p>
        
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square relative mb-8">
          <Image 
            src="https://bafybeidnv5uh2ne54dlzyummobyv3bmc7uzuyt5htodvy27toqqhijf4xu.ipfs.w3s.link/PodPlay.gif" 
            alt="POD Play"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
        
        <div className="flex justify-center">
          <Link 
            href="/howtoplay" 
            className="bg-orange-500 text-white px-6 py-3 rounded text-lg sm:text-xl hover:bg-purple-600 transition-colors"
          >
            Start
          </Link>
        </div>
      </div>
    </main>
  )
}