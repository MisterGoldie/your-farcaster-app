import React, { useState, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import * as THREE from 'three'

const backgroundColors = [
  '#CC5500', '#FF0000', '#8B0000', '#B22222', '#C5C840', '#46A136', '#DC143C', '#C840B1',
]

function TicTacToeImage({ onStartGame }: { onStartGame: () => void }) {
  const { viewport } = useThree()

  return (
    <group position={[0, 0, 0]}>
      {/* Tic-Tac-Toe grid */}
      <mesh position={[0, -0.33, 0]} scale={[1, 1, 1]}>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.5, 0, 0), new THREE.Vector3(0.5, 0, 0)])} />
        <lineBasicMaterial attach="material" color="black" linewidth={2} />
      </mesh>
      <mesh position={[0, 0.33, 0]}>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.5, 0, 0), new THREE.Vector3(0.5, 0, 0)])} />
        <lineBasicMaterial attach="material" color="black" linewidth={2} />
      </mesh>
      <mesh position={[-0.33, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.5, 0, 0), new THREE.Vector3(0.5, 0, 0)])} />
        <lineBasicMaterial attach="material" color="black" linewidth={2} />
      </mesh>
      <mesh position={[0.33, 0, 0]} scale={[1, 1, 1]} rotation={[0, 0, Math.PI / 2]}>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.5, 0, 0), new THREE.Vector3(0.5, 0, 0)])} />
        <lineBasicMaterial attach="material" color="black" linewidth={2} />
      </mesh>

      {/* X and O */}
      <Text position={[-0.33, 0.33, 0]} fontSize={0.3} color="black">X</Text>
      <Text position={[0.33, -0.33, 0]} fontSize={0.3} color="black">O</Text>

      {/* Clickable area */}
      <Html>
        <div 
          style={{
            width: `${viewport.width * 100}px`,
            height: `${viewport.height * 100}px`,
            cursor: 'pointer'
          }}
          onClick={onStartGame}
        />
      </Html>
    </group>
  )
}

type MenuBoardProps = {
  onStartGame: () => void
  onGoBack: () => void
}

export default function MenuBoard({ onStartGame, onGoBack }: MenuBoardProps) {
  const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0])

  useEffect(() => {
    const newColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
    setBackgroundColor(newColor)
  }, [])

  return (
    <div className="h-[100svh] w-full bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md aspect-[3/4] bg-white rounded-lg p-1">
        <div className="w-full h-full bg-orange-600 rounded-lg overflow-hidden flex flex-col relative">
          <div className="absolute top-3 left-2 z-10"> 
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              height="26"
              viewBox="0 -960 960 960"
              width="26"
              fill="#FFFFFF"
            >
              <path d="M480-80q-84 0-157-31.5T196-197q-54-54-85-127.5T80-482q0-84 31-156.5T196-765q54-54 127-84.5T480-880q83 0 156 30.5T763-765q54 54 85.5 127T880-482q0 84-31.5 157T763-197q-54 54-127 85.5T480-80Zm0-82q54 0 104-17.5t92-50.5q-42-24-90.5-37T480-280q-57 0-105.5 13T284-230q42 33 92 50.5T480-162Zm0-118q34 0 55.5-14.5T557-331q0-22-21.5-36.5T480-382q-34 0-55.5 14.5T403-331q0 22 21.5 36.5T480-280Zm0-170q66 0 121.5 29T702-332q26-32 41-71t15-79q0-132-92.5-225T480-800q-132 0-226 93t-94 225q0 40 15 79t41 71q44-52 99.5-81T480-450Zm-120-90q-25 0-42.5-17.5T300-600q0-25 17.5-42.5T360-660q25 0 42.5 17.5T420-600q0 25-17.5 42.5T360-540Zm240 0q-25 0-42.5-17.5T540-600q0-25 17.5-42.5T600-660q25 0 42.5 17.5T660-600q0 25-17.5 42.5T600-540Zm-120 378Z"/>
            </svg>
          </div>
          <div className="bg-orange-700 py-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-white" style={{ fontFamily: 'Frijole, cursive', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              Menu
            </h1>
          </div>
          <div className="flex-grow relative">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <color attach="background" args={[backgroundColor]} />
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} color="#ff6600" intensity={0.8} />
              <TicTacToeImage onStartGame={onStartGame} />
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