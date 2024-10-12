import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
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
        <meshStandardMaterial color="#ff6600" opacity={0.3} transparent />
      </mesh>
      {value && (
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.6}
          color={value === 'X' ? '#00ff00' : '#ff00ff'}
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
    <group ref={boardRef} scale={[1.2, 1.2, 1.2]}>
      {/* Grid lines */}
      <Line points={[-1.5, -0.5, 0, 1.5, -0.5, 0]} color="#8b00ff" lineWidth={5} />
      <Line points={[-1.5, 0.5, 0, 1.5, 0.5, 0]} color="#8b00ff" lineWidth={5} />
      <Line points={[-0.5, -1.5, 0, -0.5, 1.5, 0]} color="#8b00ff" lineWidth={5} />
      <Line points={[0.5, -1.5, 0, 0.5, 1.5, 0]} color="#8b00ff" lineWidth={5} />

      {/* Floating bats */}
      <Bat position={[-2, 2, -1]} />
      <Bat position={[2, -2, -1]} />

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
        color="#00ff00"
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
          color="#ff0000"
          anchorX="center"
          anchorY="middle"
        >
          {winner ? `${winner} wins!` : isDraw ? 'Draw!' : 'Time\'s up! Sorry!'}
        </Text>
      )}
    </group>
  )
}

// Custom shader for animated fog
const fogShader = {
  uniforms: {
    'time': { value: 0 },
    'color': { value: new THREE.Color(0xFF8C00) }, // Change this to a darker orange
    'fogDensity': { value: 0.05 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 color;
    uniform float fogDensity;
    varying vec2 vUv;
    
    float rand(vec2 co) {
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }
    
    void main() {
      vec2 position = vUv * 10.0;
      float noise = rand(position + time * 0.1);
      float fog = smoothstep(0.0, fogDensity, noise);
      gl_FragColor = vec4(color, fog);
    }
  `
}

function AnimatedFog() {
  const fogMaterial = useRef<THREE.ShaderMaterial>(null)
  const { viewport } = useThree()

  useFrame(({ clock }) => {
    if (fogMaterial.current) {
      fogMaterial.current.uniforms.time.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial ref={fogMaterial} args={[fogShader]} transparent />
    </mesh>
  )
}

export default function TicTacToe3D({ onRestart, onBackToHome }: { onRestart: () => void, onBackToHome: () => void }) {
  return (
    <div className="h-screen w-screen bg-orange-500">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={['#FFA500']} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} color="#ff6600" intensity={0.8} />
        <AnimatedFog />
        <Board />
      </Canvas>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
        <button onClick={onRestart} className="bg-black-600 text-white px-6 py-3 rounded text-lg sm:text-xl hover:bg-black-700 transition-colors">
          Play Again
        </button>
        <button onClick={onBackToHome} className="bg-black-600 text-white font-bold px-6 py-3 rounded text-lg sm:text-xl hover:bg-black-700 transition-colors">
          Home
        </button>
      </div>
    </div>
  )
}
