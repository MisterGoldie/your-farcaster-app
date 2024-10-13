import React, { useRef } from 'react'
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

type MenuOptionProps = {
  position: [number, number, number]
  text: string
  onClick: () => void
}

function MenuOption({ position, text, onClick }: MenuOptionProps) {
  return (
    <group position={position}>
      <mesh onClick={onClick}>
        <planeGeometry args={[2, 0.5]} />
        <meshStandardMaterial color="#ff6600" />
      </mesh>
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.2}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  )
}

function Board({ onStartGame, onGoBack }: { onStartGame: () => void, onGoBack: () => void }) {
  const boardRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (boardRef.current) {
      boardRef.current.rotation.y += 0.007
    }
  })

  return (
    <group ref={boardRef} scale={[1, 1, 1]}>
      <MenuOption
        position={[0, 0, 0]}
        text="Menu"
        onClick={() => console.log('Menu clicked')}
      />
      <MenuOption
        position={[0, 0, -1]}
        text="Start Game"
        onClick={onStartGame}
      />
      <MenuOption
        position={[0, 0, -2]}
        text="Go Back"
        onClick={onGoBack}
      />
    </group>
  )
}

export default function MenuBoard() {
  return (
    <div className="h-[100svh] w-full bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md aspect-[3/4] bg-white rounded-lg p-1">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Board onStartGame={() => console.log('Start game')} onGoBack={() => console.log('Go back')} />
        </Canvas>
      </div>
    </div>
  )
}
