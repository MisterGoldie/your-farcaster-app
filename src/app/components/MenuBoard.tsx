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

export default function MenuBoard() {
  return (
    <div className="h-[100svh] w-full bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md aspect-[3/4] bg-white rounded-lg p-1">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Board />
        </Canvas>
      </div>
    </div>
  )
}

