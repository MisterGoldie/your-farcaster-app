'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const MenuBoard = dynamic(() => import('../components/MenuBoard'), { ssr: false })

export default function HowToPlay() {
  const router = useRouter()

  const handleBackToHome = () => {
    router.push('/')
  }

  return (
    <main className="h-[100svh] bg-black text-white overflow-hidden">
      <MenuBoard />
      <div className="absolute top-3 left-2 z-10"> 
        <button onClick={handleBackToHome}>
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            height="26"
            viewBox="0 -960 960 960"
            width="26"
            fill="#FFFFFF"
          >
            <path d="M480-160 160-480l320-320 42 42-248 248h526v60H274l248 248-42 42Z"/>
          </svg>
        </button>
      </div>
    </main>
  )
}
