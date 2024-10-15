import React, { useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'

function MenuText({ onStartGame }: { 
  onStartGame: (difficulty: 'easy' | 'medium' | 'hard') => void
}) {
  const { viewport } = useThree()
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  const difficultyOptions = ['Easy', 'Medium', 'Hard'] as const

  const buttonWidth = viewport.width * 0.6
  const buttonHeight = viewport.height * 0.1
  const cornerRadius = Math.min(buttonWidth, buttonHeight) * 0.25

  return (
    <group>
      {difficultyOptions.map((difficulty, index) => (
        <group
          key={difficulty}
          position={[0, viewport.height * 0.1 - index * viewport.height * 0.15, 0]}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer'
            setHoveredButton(difficulty)
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'default'
            setHoveredButton(null)
          }}
          onClick={() => onStartGame(difficulty.toLowerCase() as 'easy' | 'medium' | 'hard')}
        >
          <mesh>
            <planeGeometry args={[buttonWidth, buttonHeight]} />
            <meshBasicMaterial color={hoveredButton === difficulty ? "#333333" : "#000000"} />
          </mesh>
          <Text
            position={[0, 0, 0.01]}
            fontSize={viewport.width * 0.05}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {difficulty}
          </Text>
        </group>
      ))}
    </group>
  )
}

export default function MenuBoard({ onStartGame, onGoBack }: { 
  onStartGame: (difficulty: 'easy' | 'medium' | 'hard') => void,
  onGoBack: () => void
}) {
  return (
    <div className="w-full h-full bg-orange-600 rounded-lg overflow-hidden flex flex-col">
      <div className="bg-orange-700 py-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white" style={{ fontFamily: 'Frijole, cursive', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          MAIN MENU
        </h1>
      </div>
      <div className="flex-grow relative">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <color attach="background" args={['#f97316']} />
          <MenuText onStartGame={onStartGame} />
        </Canvas>
      </div>
      <div className="bg-orange-700 py-3 flex justify-center">
        <button
          onClick={onGoBack}
          className="bg-red-700 text-white px-6 py-2 rounded text-lg hover:bg-red-800 transition-colors"
          style={{ fontFamily: 'Frijole, cursive' }}
        >
          GO BACK
        </button>
      </div>
    </div>
  )
}
