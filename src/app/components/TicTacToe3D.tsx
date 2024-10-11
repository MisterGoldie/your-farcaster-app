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
        <meshStandardMaterial color="black" opacity={0.1} transparent />
      </mesh>
      {value && (
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.4}
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
  const [isONext, setIsONext] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [timerStarted, setTimerStarted] = useState(false)

  const restartGame = () => {
    const initialCPUMove = Math.floor(Math.random() * 9);
    const initialBoard = Array(9).fill(null);
    initialBoard[initialCPUMove] = 'X';
    setBoard(initialBoard);
    setIsONext(true);
    setGameOver(false);
    setTimeLeft(15);
    setTimerStarted(false);
  }

  useEffect(() => {
    restartGame();
  }, []);

  useFrame(() => {
    if (boardRef.current) {
      boardRef.current.rotation.y += 0.005
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
    // Get all empty spots
    const emptySpots = board.reduce((acc, cell, index) => {
      if (!cell) acc.push(index);
      return acc;
    }, [] as number[]);
    
    if (emptySpots.length === 0) return -1; // No move available

    // 70% chance to make a random move
    if (Math.random() < 0.7) {
      return emptySpots[Math.floor(Math.random() * emptySpots.length)];
    }

    // Check for winning move
    for (let i of emptySpots) {
      const testBoard = [...board];
      testBoard[i] = 'X';
      if (checkWinner(testBoard) === 'X') {
        return i;
      }
    }

    // Check for blocking move
    for (let i of emptySpots) {
      const testBoard = [...board];
      testBoard[i] = 'O';
      if (checkWinner(testBoard) === 'O') {
        return i;
      }
    }

    // If no winning or blocking move, make a random move
    return emptySpots[Math.floor(Math.random() * emptySpots.length)];
  }

  const winner = checkWinner(board)
  const isDraw = !winner && board.every(Boolean)

  return (
    <group ref={boardRef}>
      {/* Grid lines */}
      <Line points={[-1.5, -0.5, 0, 1.5, -0.5, 0]} color="orange" lineWidth={5} />
      <Line points={[-1.5, 0.5, 0, 1.5, 0.5, 0]} color="orange" lineWidth={5} />
      <Line points={[-0.5, -1.5, 0, -0.5, 1.5, 0]} color="orange" lineWidth={5} />
      <Line points={[0.5, -1.5, 0, 0.5, 1.5, 0]} color="orange" lineWidth={5} />

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
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {timerStarted ? `Time: ${timeLeft}s` : 'Make a move to start'}
      </Text>

      {/* Game over text */}
      {(winner || isDraw || timeLeft === 0) && (
        <Text
          position={[0, 0, 1]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {winner ? `${winner} wins!` : isDraw ? 'Draw!' : 'Time\'s up! You lose!'}
        </Text>
      )}
    </group>
  )
}

export default function TicTacToe3D({ onRestart, onBackToHome }: { onRestart: () => void, onBackToHome: () => void }) {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Board />
      </Canvas>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
        <button onClick={onRestart} className="bg-orange-500 text-white px-4 py-2 rounded text-sm sm:text-base hover:bg-purple-600 transition-colors">
          Restart Game
        </button>
        <button onClick={onBackToHome} className="bg-orange-500 text-white px-4 py-2 rounded text-sm sm:text-base hover:bg-purple-600 transition-colors">
          Back to Home
        </button>
      </div>
    </div>
  )
}