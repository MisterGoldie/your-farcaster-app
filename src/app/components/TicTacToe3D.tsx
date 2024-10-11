import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line, Text, Stars } from '@react-three/drei'
import * as THREE from 'three'

type CellProps = {
  position: [number, number, number]
  onClick: () => void
  value: string | null
}

function Pumpkin({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#ff6600" />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.2, 8]} />
        <meshStandardMaterial color="#4CAF50" />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.15, 0.1, 0.3]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.15, 0.1, 0.3]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      {/* Mouth */}
      <mesh position={[0, -0.1, 0.3]}>
        <boxGeometry args={[0.3, 0.1, 0.1]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  )
}

function Cell({ position, onClick, value }: CellProps) {
  return (
    <group position={position}>
      <mesh onClick={onClick}>
        <boxGeometry args={[0.9, 0.9, 0.1]} />
        <meshStandardMaterial color="#2c0d0d" opacity={0.7} transparent />
      </mesh>
      {value && (
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.5}
          color={value === 'O' ? '#ff6600' : '#00ff00'}
          anchorX="center"
          anchorY="middle"
          font="/fonts/Creepster-Regular.ttf"
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
  const [isONext, setIsONext] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)

  useFrame(() => {
    if (boardRef.current) {
      boardRef.current.rotation.y += 0.005
    }
  })

  useEffect(() => {
    if (!gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer)
            setGameOver(true)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [gameOver])

  useEffect(() => {
    if (!isONext && !gameOver) {
      setTimeout(makeCPUMove, 500)
    }
  }, [isONext, gameOver])

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

  const handleCellClick = (index: number) => {
    if (board[index] || gameOver || !isONext) return

    const newBoard = [...board]
    newBoard[index] = 'O'
    setBoard(newBoard)
    setIsONext(false)

    if (checkWinner(newBoard) || newBoard.every(Boolean)) {
      setGameOver(true)
    }
  }

  const makeCPUMove = () => {
    const cpuMove = getCPUMove(board)
    if (cpuMove !== -1) {
      const newBoard = [...board]
      newBoard[cpuMove] = 'X'
      setBoard(newBoard)
      setIsONext(true)
      if (checkWinner(newBoard) || newBoard.every(Boolean)) {
        setGameOver(true)
      }
    }
  }

  const getCPUMove = (board: (string | null)[]) => {
    // Check for winning move
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const testBoard = [...board]
        testBoard[i] = 'X'
        if (checkWinner(testBoard) === 'X') {
          return i
        }
      }
    }

    // Check for blocking move
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const testBoard = [...board]
        testBoard[i] = 'O'
        if (checkWinner(testBoard) === 'O') {
          return i
        }
      }
    }

    // Take center if available
    if (!board[4]) return 4

    // Take a corner
    const corners = [0, 2, 6, 8]
    const availableCorners = corners.filter(i => !board[i])
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)]
    }

    // Take any available side
    const sides = [1, 3, 5, 7]
    const availableSides = sides.filter(i => !board[i])
    if (availableSides.length > 0) {
      return availableSides[Math.floor(Math.random() * availableSides.length)]
    }

    return -1 // No move available
  }

  const winner = checkWinner(board)
  const isDraw = !winner && board.every(Boolean)

  return (
    <group ref={boardRef}>
      {/* Grid lines */}
      <Line points={[-1.5, -0.5, 0, 1.5, -0.5, 0]} color="#ff6600" lineWidth={5} />
      <Line points={[-1.5, 0.5, 0, 1.5, 0.5, 0]} color="#ff6600" lineWidth={5} />
      <Line points={[-0.5, -1.5, 0, -0.5, 1.5, 0]} color="#ff6600" lineWidth={5} />
      <Line points={[0.5, -1.5, 0, 0.5, 1.5, 0]} color="#ff6600" lineWidth={5} />

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

      {/* Timer */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.3}
        color="#ff6600"
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        Time: {timeLeft}s
      </Text>

      {/* Game over text */}
      {(winner || isDraw || timeLeft === 0) && (
        <Text
          position={[0, 0, 1]}
          fontSize={0.5}
          color="#ff6600"
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          {winner ? `${winner} wins!` : isDraw ? 'Draw!' : 'Time\'s up! You lose!'}
        </Text>
      )}
    </group>
  )
}

export default function TicTacToe3D({ onRestart, onBackToHome }: { onRestart: () => void, onBackToHome: () => void }) {
  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={['#1a0505']} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} color="#ff6600" />
        <Board />
      </Canvas>
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '20px' }}>
        <button onClick={onRestart} className="bg-orange-600 text-white px-6 py-3 rounded text-xl hover:bg-orange-700 transition-colors font-['Creepster']">
          Restart Game
        </button>
        <button onClick={onBackToHome} className="bg-orange-600 text-white px-6 py-3 rounded text-xl hover:bg-orange-700 transition-colors font-['Creepster']">
          Back to Home
        </button>
      </div>
    </div>
  )
}