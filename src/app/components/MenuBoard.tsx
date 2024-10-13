import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

function Board() {
  const boardRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (boardRef.current) {
      boardRef.current.rotation.y += 0.007
    }
  })

  return (
    <group ref={boardRef} scale={[1, 1, 1]}>
      <Text
        position={[0, 0, 0]}
        fontSize={0.5}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        Menu
      </Text>
    </group>
  )
}

type MenuBoardProps = {
  onStartGame: () => void
  onGoBack: () => void
}

export default function MenuBoard({ onStartGame, onGoBack }: MenuBoardProps) {
  return (
    <div className="h-[100svh] w-full bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md aspect-[3/4] bg-white rounded-lg p-1 mb-4">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Board />
        </Canvas>
      </div>
      <div className="w-full max-w-md flex justify-between">
        <button
          onClick={onGoBack}
          className="bg-orange-600 text-white px-6 py-3 rounded text-lg hover:bg-orange-800 transition-colors"
        >
          Go Back
        </button>
        <button
          onClick={onStartGame}
          className="bg-orange-600 text-white px-6 py-3 rounded text-lg hover:bg-orange-800 transition-colors"
        >
          Start Game
        </button>
      </div>
    </div>
  )
}
