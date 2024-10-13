'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

// Define the props type for MenuBoard
type MenuBoardProps = {
  onStartGame: () => void
  onGoBack: () => void
}

// Use the defined type in the dynamic import
const MenuBoard = dynamic<MenuBoardProps>(() => import('../components/MenuBoard'), { ssr: false })

export default function HowToPlay() {
  const router = useRouter()

  const handleStartGame = () => {
    router.push('/game')
  }

  const handleGoBack = () => {
    router.push('/')
  }

  return (
    <main className="h-[100svh] bg-black text-white overflow-hidden">
      <MenuBoard onStartGame={handleStartGame} onGoBack={handleGoBack} />
    </main>
  )
}
