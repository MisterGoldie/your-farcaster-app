import React, { useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'

function MenuText({ onStartGame, onGoBack }: { 
  onStartGame: (difficulty: 'easy' | 'medium' | 'hard') => void,
  onGoBack: () => void
}) {
  const { viewport } = useThree()
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  const difficultyOptions = ['Easy', 'Medium', 'Hard'] as const

  const buttonWidth = viewport.width * 0.6
  const buttonHeight = viewport.height * 0.1
  const cornerRadius = Math.min(buttonWidth, buttonHeight) * 0.2

  return (
    <group>
      <Text
        position={[0, viewport.height * 0.35, 0]}
        fontSize={viewport.width * 0.1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        MAIN MENU
      </Text>
      
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

      <group
        position={[0, -viewport.height * 0.4, 0]}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer'
          setHoveredButton('goback')
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default'
          setHoveredButton(null)
        }}
        onClick={onGoBack}
      >
        <mesh>
          <planeGeometry args={[buttonWidth, buttonHeight]} />
          <meshBasicMaterial color={hoveredButton === 'goback' ? "#8B4000" : "#A52A2A"} />
        </mesh>
        <Text
          position={[0, 0, 0.01]}
          fontSize={viewport.width * 0.05}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Go Back
        </Text>
      </group>
    </group>
  )
}

export default function MenuBoard({ onStartGame, onGoBack }: { 
  onStartGame: (difficulty: 'easy' | 'medium' | 'hard') => void,
  onGoBack: () => void
}) {
  return (
    <div className="w-full h-full bg-orange-600 rounded-lg overflow-hidden flex flex-col relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={['#f97316']} />
        <MenuText onStartGame={onStartGame} onGoBack={onGoBack} />
      </Canvas>
    </div>
  )
}
