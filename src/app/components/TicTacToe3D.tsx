import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

function Board() {
  const boardRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (boardRef.current) {
      boardRef.current.rotation.y += 0.005 // Slow rotation around Y-axis
    }
  })

  return (
    <group ref={boardRef}>
      {/* Horizontal lines */}
      <Line points={[-1.5, -0.5, 0, 1.5, -0.5, 0]} color="white" lineWidth={5} />
      <Line points={[-1.5, 0.5, 0, 1.5, 0.5, 0]} color="white" lineWidth={5} />
      
      {/* Vertical lines */}
      <Line points={[-0.5, -1.5, 0, -0.5, 1.5, 0]} color="white" lineWidth={5} />
      <Line points={[0.5, -1.5, 0, 0.5, 1.5, 0]} color="white" lineWidth={5} />
    </group>
  )
}

export default function TicTacToe3D() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Board />
      </Canvas>
    </div>
  )
}
