import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line, Text, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

type CellProps = {
  position: [number, number, number]
  onClick: () => void
  value: string | null
}

function ScaryGary({ position }: { position: [number, number, number] }) {
  const { scene } = useGLTF('/models/ScaryGary_Body.glb')
  return <primitive object={scene} position={position} scale={[0.2, 0.2, 0.2]} />
}

// ... rest of your component code

useGLTF.preload('/models/ScaryGary_Body.glb')

function Cell({ position, onClick, value }: CellProps) {
  return (
    <group position={position}>
      <mesh onClick={onClick}>
        <boxGeometry args={[0.9, 0.9, 0.1]} />
        <meshStandardMaterial color="#ff6600" opacity={0} transparent />
      </mesh>
      {value && (
        value === 'X' ? (
          <ScaryGary position={[0, 0, 0.05]} />
        ) : (
          <Text
            position={[0, 0, 0.06]}
            fontSize={0.6}
            color="#000000"
            anchorX="center"
            anchorY="middle"
          >
            {value}
          </Text>
        )
      )}
    </group>
  )
}

function Bat({ position }: { position: [number, number, number] }) {
  const batRef = useRef<THREE.Group>(null)
  const speed = useRef({
    x: Math.random() * 0.02 - 0.01,
    y: Math.random() * 0.02 - 0.01,
    z: Math.random() * 0.02 - 0.01
  })

  useFrame((state) => {
    if (batRef.current) {
      batRef.current.rotation.x += speed.current.x
      batRef.current.rotation.y += speed.current.y
      batRef.current.rotation.z += speed.current.z

      batRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      batRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.7) * 0.2
      batRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * 0.3) * 0.2

      // Randomly change direction occasionally
      if (Math.random() < 0.01) {
        speed.current = {
          x: Math.random() * 0.02 - 0.01,
          y: Math.random() * 0.02 - 0.01,
          z: Math.random() * 0.02 - 0.01
        }
      }
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
    <group ref={boardRef} scale={[1, 1, 1]}>
      {/* Grid lines */}
      <Line points={[-1.5, -0.5, 0, 1.5, -0.5, 0]} color="#000000" lineWidth={5} />
      <Line points={[-1.5, 0.5, 0, 1.5, 0.5, 0]} color="#000000" lineWidth={5} />
      <Line points={[-0.5, -1.5, 0, -0.5, 1.5, 0]} color="#000000" lineWidth={5} />
      <Line points={[0.5, -1.5, 0, 0.5, 1.5, 0]} color="#000000" lineWidth={5} />

      {/* Floating bats */}
      <Bat position={[-1.8, 1.8, -1]} />
      <Bat position={[1.8, -1.8, -1]} />
      <Bat position={[0, 2, -1.5]} /> {/* New bat */}

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
  '#ECE400', // Dirty yellow
  '#B22222', // Firebrick
  '#BA3234', // FireRed
  '#3A8830', // LimeGreen
  '#0000FF', // Blue
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

  useGLTF.preload('/models/ScaryGary_Body.glb')

  return (
    <div className="h-[100svh] w-full bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md aspect-[3/4] bg-white rounded-lg p-1">
        <div className="w-full h-full bg-orange-600 rounded-lg overflow-hidden flex flex-col relative">
          {/* Updated SVG positioning */} 
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