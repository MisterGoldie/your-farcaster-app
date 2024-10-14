import React, { useState, useRef, useMemo } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Text, Plane } from '@react-three/drei'
import * as THREE from 'three'

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
  onStartGame: (difficulty: 'easy' | 'medium' | 'hard') => void
  onGoBack: () => void
}

function MenuText({ onStartGame }: { onStartGame: (difficulty: 'easy' | 'medium' | 'hard') => void }) {
  const { viewport } = useThree()
  const [showDifficulty, setShowDifficulty] = useState(false)
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  const difficultyOptions = ['easy', 'medium', 'hard'] as const

  const buttonWidth = viewport.width * 0.4
  const buttonHeight = viewport.height * 0.15
  const cornerRadius = Math.min(buttonWidth, buttonHeight) * 0.2

  return (
    <group>
      {!showDifficulty ? (
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
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'default'
              setHoveredButton(null)
            }}
            onClick={() => setShowDifficulty(true)}
          >
            <RoundedRectangle
              width={buttonWidth}
              height={buttonHeight}
              radius={cornerRadius}
              color={hoveredButton === 'tic-tac-toe' ? "#33333" : "#000000"}
            />
            <Text
              position={[0, 0, 0.01]}
              fontSize={viewport.width * 0.08}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              Tic-Tac-Toe
            </Text>
          </group>
        </>
      ) : (
        <>
          {difficultyOptions.map((difficulty, index) => (
            <group
              key={difficulty}
              position={[0, viewport.height * 0.2 - index * viewport.height * 0.2, 0]}
              onPointerOver={() => {
                document.body.style.cursor = 'pointer'
                setHoveredButton(difficulty)
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'default'
                setHoveredButton(null)
              }}
              onClick={() => onStartGame(difficulty)}
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

export default function MenuBoard({ onStartGame, onGoBack }: MenuBoardProps) {
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
              <MenuText onStartGame={onStartGame} />
            </Canvas>
          </div>
          <div className="flex justify-center gap-4 py-3 bg-orange-700">
            <button onClick={onGoBack} className="bg-orange-800 text-white px-4 py-2 rounded text-sm sm:text-base hover:bg-orange-900 transition-colors text-shadow-custom">
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
