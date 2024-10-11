import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { Line, Text } from '@react-three/drei'
import * as THREE from 'three'

type CellProps = {
  position: [number, number, number]
  onClick: () => void
  value: string | null
}

function Cell({ position, onClick, value }: CellProps) {
  return (
    <group position={position}>
      <mesh onClick={onClick}>
        <boxGeometry args={[0.9, 0.9, 0.1]} />
        <meshStandardMaterial color="black" opacity={0.1} transparent />
      </mesh>
      {value && (
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {value}
        </Text>
      )}
    </group>
  )
}

function Board() {
  const boardRef = useRef<THREE.Group>(null)
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)

  useFrame(() => {
    if (boardRef.current) {
      boardRef.current.rotation.y += 0.005
    }
  })

  const handleCellClick = (index: number) => {
    if (board[index] || checkWinner(board)) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)
    setIsXNext(!isXNext)
  }

  const checkWinner = (board: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
    return null
  }

  const winner = checkWinner(board)
  const isDraw = !winner && board.every(Boolean)

  return (
    <group ref={boardRef}>
      {/* Grid lines */}
      <Line points={[-1.5, -0.5, 0, 1.5, -0.5, 0]} color="white" lineWidth={5} />
      <Line points={[-1.5, 0.5, 0, 1.5, 0.5, 0]} color="white" lineWidth={5} />
      <Line points={[-0.5, -1.5, 0, -0.5, 1.5, 0]} color="white" lineWidth={5} />
      <Line points={[0.5, -1.5, 0, 0.5, 1.5, 0]} color="white" lineWidth={5} />

      {/* Cells */}
      {board.map((value, index) => (
        <Cell
          key={index}
          position={[
            (index % 3 - 1) * 1,
            (1 - Math.floor(index / 3)) * 1,
            0
          ]}
          onClick={() => handleCellClick(index)}
          value={value}
        />
      ))}

      {/* Game over text */}
      {(winner || isDraw) && (
        <Text
          position={[0, 0, 1]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {winner ? `${winner} wins!` : 'Draw!'}
        </Text>
      )}
    </group>
  )
}

export default function TicTacToe3D() {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Board />
      </Canvas>
    </div>
  )
}
