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

function Bat({ position }: { position: [number, number, number] }) {
  const batRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (batRef.current) {
      batRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.2
      batRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.1
    }
  })

  return (
    <group ref={batRef} position={position}>
      {/* Body */}
      <mesh>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      {/* Wings */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.5, 0.01, 0.2]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.5, 0.01, 0.2]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      {/* Eyes */}
      <mesh position={[0.05, 0.05, 0.12]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
      <mesh position={[-0.05, 0.05, 0.12]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
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

  useFrame(() => {
    if (boardRef.current) {
      boardRef.current.rotation.y += 0.007 //ROTATION SPEED
    }
  })

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

    // 30% chance to make a random move
    if (Math.random() < 0.3) {
      return emptySpots[Math.floor(Math.random() * emptySpots.length)]
    }

    // Check for winning move (80% chance to take it)
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const testBoard = [...board]
        testBoard[i] = 'X'
        if (checkWinner(testBoard) === 'X' && Math.random() < 0.8) {
          return i
        }
      }
    }

    // Check for blocking Move (70% chance to block)
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const testBoard = [...board]
        testBoard[i] = 'O'
        if (checkWinner(testBoard) === 'O' && Math.random() < 0.7) {
          return i
        }
      }
    }

    // Take any available spot
    return emptySpots[Math.floor(Math.random() * emptySpots.length)]
  }

  const restartGame = () => {
    setBoard(Array(9).fill(null))
    setIsONext(false)
    setGameOver(false)
    setTimeLeft(15)
  }

  const winner = checkWinner(board)
  const isDraw = !winner && board.every(Boolean)

  return (
    <group ref={boardRef} scale={[0.8, 0.8, 0.8]} position={[0, -0.5, 0]}>
      {/* Tic-Tac-Toe text */}
      <Text
        position={[0, 2.2, 0]}
        fontSize={0.5}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Frijole-Regular.ttf"  // Make sure this path is correct
      >
        TIC-TAC-TOE
      </Text>

      {/* Grid lines */}
      <Line points={[-1.5, -0.5, 0, 1.5, -0.5, 0]} color="#000000" lineWidth={5} />
      <Line points={[-1.5, 0.5, 0, 1.5, 0.5, 0]} color="#000000" lineWidth={5} />
      <Line points={[-0.5, -1.5, 0, -0.5, 1.5, 0]} color="#000000" lineWidth={5} />
      <Line points={[0.5, -1.5, 0, 0.5, 1.5, 0]} color="#000000" lineWidth={5} />

      {/* Floating bats */}
      <Bat position={[-1.8, 1.8, -1]} />
      <Bat position={[1.8, -1.8, -1]} />

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

export default function TicTacToe3D({ onRestart, onBackToHome }: { onRestart: () => void, onBackToHome: () => void }) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black p-4">
      <div className="w-full max-w-md aspect-[3/4] bg-white rounded-lg p-2">
        <div className="w-full h-full bg-orange-600 rounded-lg overflow-hidden flex flex-col">
          <div className="flex-grow relative">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <color attach="background" args={['#CC5500']} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <Board />
            </Canvas>
          </div>
          <div className="flex justify-center gap-4 py-4 bg-orange-700">
            <button onClick={onRestart} className="bg-orange-800 text-white px-4 py-2 rounded text-sm sm:text-base hover:bg-orange-900 transition-colors">
              Play Again
            </button>
            <button onClick={onBackToHome} className="bg-orange-800 text-white px-4 py-2 rounded text-sm sm:text-base hover:bg-orange-900 transition-colors">
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
