import React, { useState, useRef, useMemo, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Text, Plane } from '@react-three/drei'
import * as THREE from 'three'
import useSound from 'use-sound';

function RoundedRectangle({ width, height, radius, color }: { width: number; height: number; radius: number; color: string }) {
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
      <meshBasicMaterial color={color} /> // Removed transparency
    </mesh>
  )
}

type MenuBoardProps = {
  onStartGame: (difficulty: 'easy' | 'medium' | 'hard', piece: 'pumpkin' | 'scarygary' | 'podplaylogo') => void
  onGoBack: () => void
  isMuted: boolean
  toggleMute: () => void
  handleBackButton: () => void // Add this new prop
  playHalloweenMusic: () => void
  stopHalloweenMusic: () => void
}

function MenuText({ onStartGame, isMuted, toggleMute, setMenuStep, menuStep }: { 
  onStartGame: (difficulty: 'easy' | 'medium' | 'hard', piece: 'pumpkin' | 'scarygary' | 'podplaylogo') => void,
  isMuted: boolean,
  toggleMute: () => void,
  setMenuStep: (value: 'game' | 'piece' | 'difficulty') => void,
  menuStep: 'game' | 'piece' | 'difficulty',
  playHalloweenMusic: () => void,
  stopHalloweenMusic: () => void
}) {
  const { viewport } = useThree()
  const [selectedPiece, setSelectedPiece] = useState<'pumpkin' | 'scarygary' | 'podplaylogo'>('pumpkin')
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  const difficultyOptions = ['easy', 'medium', 'hard'] as const
  const pieceOptions = ['pumpkin', 'scarygary', 'podplaylogo'] as const

  const buttonWidth = viewport.width * 0.6
  const buttonHeight = viewport.height * 0.15
  const cornerRadius = Math.min(buttonWidth, buttonHeight) * 0.2

  const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.5, soundEnabled: !isMuted });
  const [playClick] = useSound('/sounds/click.mp3', { volume: 0.5, soundEnabled: !isMuted });
  const [playHalloweenMusic, { stop: stopHalloweenMusic }] = useSound('/sounds/halloween.mp3', { 
    volume: 0.3, 
    loop: true, 
    soundEnabled: !isMuted 
  });

  console.log('Selected piece in MenuBoard:', selectedPiece);

  const handleBack = () => {
    if (menuStep === 'difficulty') {
      setMenuStep('piece')
    } else if (menuStep === 'piece') {
      setMenuStep('game')
    }
  }

  useEffect(() => {
    playHalloweenMusic();
    return () => stopHalloweenMusic();
  }, [playHalloweenMusic, stopHalloweenMusic]);

  return (
    <group>
      {menuStep === 'game' && (
        <>
          <Text
            position={[0, viewport.height * 0.1, 0]}
            fontSize={viewport.width * 0.06}
            color="black"
            anchorX="center"
            anchorY="middle"
          >
            Select Game:
          </Text>
          <group
            position={[0, -viewport.height * 0.05, 0]}
            onPointerOver={() => {
              document.body.style.cursor = 'pointer'
              setHoveredButton('tic-tac-toe')
              playHover()
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'default'
              setHoveredButton(null)
            }}
            onClick={() => {
              setMenuStep('piece')
              playClick()
            }}
          >
            <RoundedRectangle
              width={buttonWidth}
              height={buttonHeight}
              radius={cornerRadius}
              color={hoveredButton === 'tic-tac-toe' ? "#333333" : "#000000"}
            />
            <Text
              position={[0, 0, 0.01]}
              fontSize={viewport.width * 0.06}  // Adjusted font size
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              Tic-Tac-Maxi
            </Text>
          </group>
        </>
      )}
      {menuStep === 'piece' && (
        <>
          <Text
            position={[0, viewport.height * 0.3, 0]}
            fontSize={viewport.width * 0.06}
            color="black"
            anchorX="center"
            anchorY="middle"
          >
            Select Piece:
          </Text>
          {pieceOptions.map((piece, index) => (
            <group
              key={piece}
              position={[0, viewport.height * 0.1 - index * viewport.height * 0.2, 0]}
              onPointerOver={() => {
                document.body.style.cursor = 'pointer'
                setHoveredButton(piece)
                playHover()
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'default'
                setHoveredButton(null)
              }}
              onClick={() => {
                setSelectedPiece(piece)
                setMenuStep('difficulty')
                playClick()
              }}
            >
              <RoundedRectangle
                width={buttonWidth}
                height={buttonHeight}
                radius={cornerRadius}
                color={hoveredButton === piece ? "#333333" : "#000000"}
              />
              <Text
                position={[0, 0, 0.01]}
                fontSize={viewport.width * 0.05}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                {piece === 'scarygary' ? 'Scary Gary' :
                 piece === 'podplaylogo' ? 'Pod Play Logo' :
                 piece.charAt(0).toUpperCase() + piece.slice(1)}
              </Text>
            </group>
          ))}
        </>
      )}
      {menuStep === 'difficulty' && (
        <>
          <Text
            position={[0, viewport.height * 0.3, 0]}
            fontSize={viewport.width * 0.06}
            color="black"
            anchorX="center"
            anchorY="middle"
          >
            Choose Difficulty:
          </Text>
          {difficultyOptions.map((difficulty, index) => (
            <group
              key={difficulty}
              position={[0, viewport.height * 0.1 - index * viewport.height * 0.2, 0]}
              onPointerOver={() => {
                document.body.style.cursor = 'pointer'
                setHoveredButton(difficulty)
                playHover()
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'default'
                setHoveredButton(null)
              }}
              onClick={() => {
                stopHalloweenMusic();
                onStartGame(difficulty, selectedPiece)
                playClick()
              }}
            >
              <RoundedRectangle
                width={buttonWidth}
                height={buttonHeight}
                radius={cornerRadius}
                color={hoveredButton === difficulty ? "#333333" : "#000000"}
              />
              <Text
                position={[0, 0, 0.01]}
                fontSize={viewport.width * 0.05}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Text>
            </group>
          ))}
        </>
      )}
    </group>
  )
}

export default function MenuBoard({ onStartGame, onGoBack, isMuted, toggleMute }: MenuBoardProps) {
  const [menuStep, setMenuStep] = useState<'game' | 'piece' | 'difficulty'>('game')

  const handleBackButton = () => {
    if (menuStep === 'difficulty') {
      setMenuStep('piece')
    } else if (menuStep === 'piece') {
      setMenuStep('game')
    } else {
      onGoBack()
    }
  }

  function playHalloweenMusic(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="h-[100svh] w-full bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md aspect-[3/4] bg-white rounded-lg p-1">
        <div className="w-full h-full bg-orange-600 rounded-lg overflow-hidden flex flex-col relative">
          <div className="bg-orange-700 py-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-white" style={{ fontFamily: 'Frijole, cursive', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              Main Menu
            </h1>
          </div>
          <div className="flex-grow relative">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <color attach="background" args={['#f97316']} />
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} color="#ff6600" intensity={0.8} />
              <MenuText onStartGame={onStartGame} isMuted={isMuted} toggleMute={toggleMute} setMenuStep={setMenuStep} menuStep={menuStep} playHalloweenMusic={playHalloweenMusic} stopHalloweenMusic={function (): void {
                throw new Error('Function not implemented.');
              } } />
            </Canvas>
          </div>
          <div className="flex justify-between items-center py-3 px-4 bg-orange-700">
            <button onClick={handleBackButton} className="bg-orange-800 text-white px-4 py-2 rounded text-sm sm:text-base hover:bg-orange-900 transition-colors text-shadow-custom">
              Go Back
            </button>
            <button 
              onClick={toggleMute} 
              className={`px-4 py-2 rounded text-sm sm:text-base transition-colors text-shadow-custom ${
                isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
