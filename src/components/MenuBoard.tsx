'use client'

import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import useSound from 'use-sound'

function MenuContent({ onStartGame, isMuted, toggleMute }: { 
  onStartGame: (difficulty: 'easy' | 'medium' | 'hard', piece: 'pumpkin' | 'scarygary' | 'podplaylogo') => void;
  isMuted: boolean;
  toggleMute: () => void;
}) {
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
      {/* Rest of your menu steps */}
    </>
  )
}

interface MenuBoardProps {
  onStartGame: (difficulty: 'easy' | 'medium' | 'hard', piece: 'pumpkin' | 'scarygary' | 'podplaylogo') => void;
  onGoBack: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

function MenuBoard({ onStartGame, onGoBack, isMuted, toggleMute }: MenuBoardProps) {
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
            <Canvas>
              <MenuContent 
                onStartGame={onStartGame}
                isMuted={isMuted}
                toggleMute={toggleMute}
              />
            </Canvas>
          </div>
          <div className="bg-orange-700 py-2">
            <button
              onClick={onGoBack}
              className="bg-orange-800 text-white px-4 py-2 rounded"
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