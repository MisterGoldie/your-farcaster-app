'use client'

import React, { useState, useEffect, useMemo, Suspense } from 'react'
import dynamic from 'next/dynamic'
import useSound from 'use-sound'
import * as THREE from 'three'
import { Text } from '@react-three/drei'

const Scene3D = dynamic(() => 
  import('@react-three/fiber').then((mod) => {
    const { Canvas } = mod
    return function Scene({ children }: { children: React.ReactNode }) {
      return (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </Canvas>
      )
    }
  }),
  { ssr: false }
)

export function RoundedRectangle({ width, height, radius, color }: { width: number; height: number; radius: number; color: string }) {
  const shape = useMemo(() => {
    const shape = new THREE.Shape()
    const x = -width / 2
    const y = -height / 2
    
    shape.moveTo(x, y + radius)
    shape.lineTo(x, y + height - radius)
    shape.quadraticCurveTo(x, y + height, x + radius, y + height)
    shape.lineTo(x + width - radius, y + height)
    shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
    shape.lineTo(x + width, y + radius)
    shape.quadraticCurveTo(x + width, y, x + width - radius, y)
    shape.lineTo(x + radius, y)
    shape.quadraticCurveTo(x, y, x, y + radius)

    return shape
  }, [width, height, radius])

  return (
    <mesh>
      <shapeGeometry args={[shape]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

function ThreeContent() {
  return (
    <>
      <color attach="background" args={['#f97316']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <RoundedRectangle width={3} height={4} radius={0.2} color="#ff6600" />
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Main Menu
      </Text>
    </>
  )
}

interface MenuBoardProps {
  onStartGame: (difficulty: 'easy' | 'medium' | 'hard', piece: 'pumpkin' | 'scarygary' | 'podplaylogo') => void;
  onGoBack: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

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
    soundEnabled: !isMuted,
    onplayerror: (id: any, error: any) => console.error('Sound error:', error) 
  });
  const [playClick] = useSound('/click.mp3', { 
    volume: 0.5, 
    soundEnabled: !isMuted,
    onplayerror: (id: any, error: any) => console.error('Sound error:', error)
  });
  const [playHalloweenMusic, { stop: stopHalloweenMusic }] = useSound('/halloween.mp3', { 
    volume: 0.3, 
    loop: true, 
    soundEnabled: !isMuted,
    onplayerror: (id: any, error: any) => console.error('Sound error:', error)
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        playHalloweenMusic();
        return () => stopHalloweenMusic();
      } catch (error) {
        console.error('Audio error:', error);
      }
    }
  }, [playHalloweenMusic, stopHalloweenMusic]);

  const handleStartGame = (difficulty: 'easy' | 'medium' | 'hard') => {
    playClick();
    onStartGame(difficulty, selectedPiece);
  };

  const handlePieceSelection = (piece: 'pumpkin' | 'scarygary' | 'podplaylogo') => {
    playClick();
    setSelectedPiece(piece);
    setMenuStep('difficulty');
  };

  const handleHover = (buttonName: string) => {
    if (buttonName !== hoveredButton) {
      setHoveredButton(buttonName);
      playHover();
    }
  };

  return (
    <Scene3D>
      <ThreeContent />
      {menuStep === 'game' && (
        <>
          <Text
            position={[0, 0.5, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            onClick={() => {
              playClick();
              setMenuStep('piece');
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
    </Scene3D>
  )
}

const MenuBoard: React.FC<MenuBoardProps> = ({ onStartGame, onGoBack, isMuted, toggleMute }) => {
  return (
    <div className="h-[100svh] w-full bg-transparent flex items-center justify-center p-4">
      <div className="w-full max-w-md aspect-[3/4] bg-white rounded-lg p-1">
        <div className="w-full h-full bg-orange-600 rounded-lg overflow-hidden flex flex-col relative">
          <div className="bg-orange-700 py-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-white" style={{ fontFamily: 'Nosifer, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              Main Menu
            </h1>
          </div>
          <div className="flex-grow relative">
            <MenuContent onStartGame={onStartGame} isMuted={isMuted} toggleMute={toggleMute} />
          </div>
          <div className="bg-orange-700 py-2">
            <button
              onClick={onGoBack}
              className="bg-orange-800 text-white px-4 py-2 rounded text-sm sm:text-base hover:bg-red-900 transition-colors text-shadow-custom"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(MenuBoard), { ssr: false });
