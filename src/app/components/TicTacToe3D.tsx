import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
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
        <meshStandardMaterial color="#ff6600" opacity={0} transparent />
      </mesh>
      {value && (
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.6}
          color="#000000"
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
  const [isONext, setIsONext] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [timerStarted, setTimerStarted] = useState(false)

  useEffect(() => {
    if (timerStarted && !gameOver) {
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
  }, [timerStarted, gameOver])

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

    if (!timerStarted) {
      setTimerStarted(true)
    }

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
    const emptySpots = board.reduce((acc, cell, index) => {
      if (!cell) acc.push(index)
      return acc
    }, [] as number[])

    if (emptySpots.length === 0) return -1 // No move available

    // Take center if available
    if (!board[4]) return 4

    // Take any available corner
    const corners = [0, 2, 6, 8].filter(i => !board[i])
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)]
    }

    // Take any available side
    const sides = [1, 3, 5, 7].filter(i => !board[i])
    if (sides.length > 0) {
      return sides[Math.floor(Math.random() * sides.length)]
    }

    // This should never happen, but just in case
    return emptySpots[Math.floor(Math.random() * emptySpots.length)]
  }

  const winner = checkWinner(board)
  const isDraw = !winner && board.every(Boolean)

  return (
    <group ref={boardRef} scale={[1, 1, 1]}>
      {/* Grid lines */}
      <Line points={[-1.5, -0.5, 0, 1.5, -0.5, 0]} color="#000000" lineWidth={5} />
      <Line points={[-1.5, 0.5, 0, 1.5, 0.5, 0]} color="#000000" lineWidth={5} />
      <Line points={[-0.5, -1.5, 0, -0.5, 1.5, 0]} color="#000000" lineWidth={5} />
      <Line points={[0.5, -1.5, 0, 0.5, 1.5, 0]} color="#000000" lineWidth={5} />

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
        position={[0, 1.8, 0]}
        fontSize={0.25}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        {timerStarted ? `Time: ${timeLeft}s` : 'X goes first'}
      </Text>

      {/* Game over text */}
      {(winner || isDraw || timeLeft === 0) && (
        <Text
          position={[0, 0, 1]}
          fontSize={0.4}
          color="#000000"
          anchorX="center"
          anchorY="middle"
        >
          {winner ? `${winner} wins!` : isDraw ? 'Draw!' : 'Time\'s up! Sorry!'}
        </Text>
      )}
    </group>
  )
}

const backgroundColors = [
  '#CC5500', // Original orange
  '#FF0000', // Red
  '#8B0000', // Dark Red
  '#B22222', // Firebrick
  '#C5C840', // Dirty yellow
  '#46A136',// Green
  '#DC143C', // Crimson
  '#C840B1', // Purple
]

export default function TicTacToe3D({ onRestart, onBackToHome }: { onRestart: () => void, onBackToHome: () => void }) {
  const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0])

  const changeBackgroundColor = () => {
    const newColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
    setBackgroundColor(newColor)
  }

  useEffect(() => {
    changeBackgroundColor()
  }, [])

  const handleRestart = () => {
    changeBackgroundColor()
    onRestart()
  }

  return (
    <div className="h-[100svh] w-full bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md aspect-[3/4] bg-white rounded-lg p-1">
        <div className="w-full h-full bg-orange-600 rounded-lg overflow-hidden flex flex-col relative">
          <div className="bg-orange-700 py-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-white" style={{ fontFamily: 'Frijole, cursive', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              TIC-TAC-TOE
            </h1>
          </div>
          <div className="flex-grow relative">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <color attach="background" args={[backgroundColor]} />
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} color="#ff6600" intensity={0.8} />
              <Board />
            </Canvas>
          </div>
          <div className="flex justify-center gap-4 py-3 bg-orange-700">
            <button onClick={handleRestart} className="bg-orange-800 text-white px-4 py-2 rounded text-sm sm:text-base hover:bg-orange-900 transition-colors text-shadow-custom">
              Play Again
            </button>
            <button onClick={onBackToHome} className="bg-orange-800 text-white px-4 py-2 rounded text-sm sm:text-base hover:bg-orange-900 transition-colors text-shadow-custom">
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

