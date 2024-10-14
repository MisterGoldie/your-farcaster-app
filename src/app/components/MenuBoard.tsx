import React from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'

type MenuBoardProps = {
  onStartGame: () => void
  onGoBack: () => void
}

function TicTacToeText({ onStartGame }: { onStartGame: () => void }) {
  const { viewport } = useThree()

  return (
    <Text
      position={[0, 0, 0]}
      fontSize={viewport.width * 0.08}
      color="black"
      anchorX="center"
      anchorY="middle"
      onClick={onStartGame}
      onPointerOver={(e) => {
        document.body.style.cursor = 'pointer'
        e.object.scale.set(1.1, 1.1, 1.1)
      }}
      onPointerOut={(e) => {
        document.body.style.cursor = 'default'
        e.object.scale.set(1, 1, 1)
      }}
    >
      Tic-Tac-Toe
    </Text>
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
              <TicTacToeText onStartGame={onStartGame} />
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
