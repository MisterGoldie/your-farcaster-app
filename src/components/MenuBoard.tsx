'use client'

import React, { useState, Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import useSound from 'use-sound'
import dynamic from 'next/dynamic'
import ErrorBoundary from './ErrorBoundary'

interface MenuBoardProps {
  onStartGame: (difficulty: 'easy' | 'medium' | 'hard', piece: 'pumpkin' | 'scarygary' | 'podplaylogo') => void;
  onGoBack: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

function MenuContent({ onStartGame, isMuted, toggleMute }: Omit<MenuBoardProps, 'onGoBack'>) {
  const [menuStep, setMenuStep] = useState<'game' | 'piece' | 'difficulty'>('game')
  const [selectedPiece, setSelectedPiece] = useState<'pumpkin' | 'scarygary' | 'podplaylogo'>('pumpkin')
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  const [playHover] = useSound('/hover.mp3', { 
    volume: 0.5, 
    soundEnabled: !isMuted 
  })
  const [playClick] = useSound('/click.mp3', { 
    volume: 0.5, 
    soundEnabled: !isMuted 
  })

  const handleHover = (buttonName: string) => {
    if (buttonName !== hoveredButton) {
      setHoveredButton(buttonName)
      playHover()
    }
  }

  const handlePieceSelection = (piece: 'pumpkin' | 'scarygary' | 'podplaylogo') => {
    playClick()
    setSelectedPiece(piece)
    setMenuStep('difficulty')
  }

  const handleStartGame = (difficulty: 'easy' | 'medium' | 'hard') => {
    playClick()
    onStartGame(difficulty, selectedPiece)
  }

  return (
    <>
      <color attach="background" args={['#f97316']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {menuStep === 'game' && (
        <>
          <Text
            position={[0, 0.5, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            onClick={() => {
              playClick()
              setMenuStep('piece')
            }}
            onPointerOver={() => handleHover('start')}
          >
            Start Game
          </Text>
          <Text
            position={[0, 0, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            onClick={toggleMute}
            onPointerOver={() => handleHover('mute')}
          >
            {isMuted ? 'Unmute' : 'Mute'}
          </Text>
        </>
      )}
      {menuStep === 'piece' && (
        <>
          <Text
            position={[0, 0.5, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            onClick={() => handlePieceSelection('pumpkin')}
            onPointerOver={() => handleHover('pumpkin')}
          >
            Pumpkin
          </Text>
          <Text
            position={[0, 0, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            onClick={() => handlePieceSelection('scarygary')}
            onPointerOver={() => handleHover('scarygary')}
          >
            Scary Gary
          </Text>
          <Text
            position={[0, -0.5, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            onClick={() => handlePieceSelection('podplaylogo')}
            onPointerOver={() => handleHover('podplaylogo')}
          >
            Pod Play Logo
          </Text>
        </>
      )}
      {menuStep === 'difficulty' && (
        <>
          <Text
            position={[0, 0.5, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            onClick={() => handleStartGame('easy')}
            onPointerOver={() => handleHover('easy')}
          >
            Easy
          </Text>
          <Text
            position={[0, 0, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            onClick={() => handleStartGame('medium')}
            onPointerOver={() => handleHover('medium')}
          >
            Medium
          </Text>
          <Text
            position={[0, -0.5, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            onClick={() => handleStartGame('hard')}
            onPointerOver={() => handleHover('hard')}
          >
            Hard
          </Text>
        </>
      )}
    </>
  )
}

const CanvasWrapper = dynamic(
  () => import('@react-three/fiber').then((mod) => {
    const { Canvas } = mod
    return function CanvasComponent({ children }: { children: React.ReactNode }) {
      return (
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ErrorBoundary fallback={<Text>Error loading menu</Text>}>
            {children}
          </ErrorBoundary>
        </Canvas>
      )
    }
  }),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white text-xl">Loading 3D Menu...</div>
      </div>
    )
  }
)

const MenuBoard: React.FC<MenuBoardProps> = ({ onStartGame, onGoBack, isMuted, toggleMute }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="h-[100svh] w-full bg-orange-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="h-[100svh] w-full bg-transparent flex items-center justify-center p-4">
      <div className="w-full max-w-md aspect-[3/4] bg-white rounded-lg p-1">
        <div className="w-full h-full bg-orange-600 rounded-lg overflow-hidden flex flex-col relative">
          <div className="bg-orange-700 py-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-white">
              Main Menu
            </h1>
          </div>
          <div className="flex-grow relative">
            <ErrorBoundary fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-white text-xl">Something went wrong</div>
              </div>
            }>
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white text-xl">Loading Menu...</div>
                </div>
              }>
                <CanvasWrapper>
                  <MenuContent 
                    onStartGame={onStartGame}
                    isMuted={isMuted}
                    toggleMute={toggleMute}
                  />
                </CanvasWrapper>
              </Suspense>
            </ErrorBoundary>
          </div>
          <div className="bg-orange-700 py-2 flex justify-center">
            <button
              onClick={onGoBack}
              className="bg-orange-800 text-white px-4 py-2 rounded hover:bg-orange-900 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuBoard