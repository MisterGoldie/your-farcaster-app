import React, { useState, useEffect, useRef, type ReactNode, type ErrorInfo } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Line, Text, Plane } from '@react-three/drei'
import * as THREE from 'three'
import useSound from 'use-sound'

type CellProps = {
  position: [number, number, number]
  onClick: () => void
  value: string | null
}

function LoadingSprite({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Plane args={[0.8, 0.8]}>
        <meshBasicMaterial color="#666666" />
      </Plane>
    </group>
  )
}

function Cell({ position, onClick, value, piece }: CellProps & { piece: 'pumpkin' | 'scarygary' | 'podplaylogo' }) {
  return (
    <group position={position}>
      <mesh onClick={onClick}>
        <boxGeometry args={[0.95, 0.95, 0.1]} />
        <meshStandardMaterial color="#ff6600" opacity={0} transparent />
      </mesh>
      {value === 'X' && (
        <group position={[0, 0, 0.06]}>
          <React.Suspense fallback={<LoadingSprite position={[0, 0, 0]} />}>
            <JokerSprite position={[0, 0, 0]} />
          </React.Suspense>
        </group>
      )}
      {value === 'O' && (
        <group position={[0, 0, 0.06]}>
          <React.Suspense fallback={<LoadingSprite position={[0, 0, 0]} />}>
            {piece === 'pumpkin' ? (
              <PumpkinSprite position={[0, 0, 0]} />
            ) : piece === 'scarygary' ? (
              <ScaryGarySprite position={[0, 0, 0]} />
            ) : (
              <PodPlayLogoSprite position={[0, 0, 0]} />
            )}
          </React.Suspense>
        </group>
      )}
    </group>
  )
}

function PumpkinSprite({ position }: { position: [number, number, number] }) {
  const texture = useLoader(
    THREE.TextureLoader, 
    '/pumpkin.png',
    (loader) => {
      loader.crossOrigin = 'anonymous'
    }
  )
  return (
    <group position={position}>
      <Plane args={[0.8, 0.8]}>
        <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
      </Plane>
    </group>
  )
}

function JokerSprite({ position }: { position: [number, number, number] }) {
  const texture = useLoader(
    THREE.TextureLoader, 
    '/joker.png',
    (loader) => {
      loader.crossOrigin = 'anonymous'
    }
  )
  return (
    <group position={position}>
      <Plane args={[0.8, 0.8]}>
        <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
      </Plane>
    </group>
  )
}

function ScaryGarySprite({ position }: { position: [number, number, number] }) {
  const texture = useLoader(
    THREE.TextureLoader, 
    '/scarygary.png',
    (loader) => {
      loader.crossOrigin = 'anonymous'
    }
  )
  return (
    <group position={position}>
      <Plane args={[0.8, 0.8]}>
        <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
      </Plane>
    </group>
  )
}

function PodPlayLogoSprite({ position }: { position: [number, number, number] }) {
  const texture = useLoader(
    THREE.TextureLoader, 
    '/podplaylogo.png',
    (loader) => {
      loader.crossOrigin = 'anonymous'
    }
  )
  return (
    <group position={position}>
      <Plane args={[0.8, 0.8]}>
        <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
      </Plane>
    </group>
  )
}

function Board({ difficulty, piece, isMuted, toggleMute, onRestart }: {
  difficulty: 'easy' | 'medium' | 'hard',
  piece: 'pumpkin' | 'scarygary' | 'podplaylogo',
  isMuted: boolean,
  toggleMute: () => void,
  onRestart: () => void
}) {
  const boardRef = useRef<THREE.Group>(null)
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null))
  const [isONext, setIsONext] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [timerStarted, setTimerStarted] = useState(false)
  const [jingleStarted, setJingleStarted] = useState(false)

  const getCPUMove = (currentBoard: (string | null)[]) => {
    const emptySpots = currentBoard.reduce((acc, cell, index) => {
      if (!cell) acc.push(index)
      return acc
    }, [] as number[])

    if (emptySpots.length === 0) return -1

    // First, check if CPU can win
    let winningMove: number = -1
    for (const spot of emptySpots) {
      const testBoard = [...currentBoard]
      testBoard[spot] = 'X'
      if (checkWinner(testBoard) === 'X') {
        winningMove = spot
        break
      }
    }

    if (winningMove !== -1) return winningMove

    // Then, block player from winning
    let blockingMove: number = -1
    for (const spot of emptySpots) {
      const testBoard = [...currentBoard]
      testBoard[spot] = 'O'
      if (checkWinner(testBoard) === 'O') {
        blockingMove = spot
        break
      }
    }

    if (blockingMove !== -1) return blockingMove

    // If no winning or blocking move, choose randomly based on difficulty
    if (difficulty === 'easy') {
      const randomIndex = Math.floor(Math.random() * emptySpots.length)
      return emptySpots[randomIndex]
    }

    // For medium/hard difficulty, prefer center and corners
    const center = 4
    const corners = [0, 2, 6, 8]
    const edges = [1, 3, 5, 7]

    if (!currentBoard[center]) return center

    const availableCorners = corners.filter(corner => !currentBoard[corner])
    if (availableCorners.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCorners.length)
      return availableCorners[randomIndex]
    }

    const availableEdges = edges.filter(edge => !currentBoard[edge])
    if (availableEdges.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableEdges.length)
      return availableEdges[randomIndex]
    }

    return emptySpots[0]
  }

  const [playLoseSound] = useSound('/losing.mp3', { 
    volume: 0.5, 
    soundEnabled: !isMuted 
  });
  const [playWinSound] = useSound('/winning.mp3', { 
    volume: 0.5, 
    soundEnabled: !isMuted 
  });
  const [playDrawSound] = useSound('/drawing.mp3', { 
    volume: 0.5, 
    soundEnabled: !isMuted 
  });
  const [playChooseSound] = useSound('/choose.mp3', { 
    volume: 0.5, 
    soundEnabled: !isMuted 
  });
  const [playCountdownSound, { stop: stopCountdownSound }] = useSound(
    '/countdown.mp3', 
    { volume: 0.5, soundEnabled: !isMuted }
  );
  const [playJingle, { stop: stopJingle }] = useSound(
    '/jingle.mp3', 
    { volume: 0.3, loop: true, soundEnabled: !isMuted }
  );

  useFrame((_state) => {
    if (boardRef.current && difficulty === 'hard') {
      const rotationSpeed = 0.01 + (board.filter(Boolean).length * 0.002)
      boardRef.current.rotation.y += rotationSpeed
    }
  })

  useEffect(() => {
    if (timerStarted && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 6 && prevTime > 1) {
            playCountdownSound()
          }
          if (prevTime <= 1) {
            clearInterval(timer)
            stopCountdownSound()
            setGameOver(true)
            playLoseSound()
            return 0
          }
          return prevTime - 1
        })
      }, 1000)

      return () => {
        clearInterval(timer)
        stopCountdownSound()
      }
    }
  }, [timerStarted, gameOver, playCountdownSound, stopCountdownSound, playLoseSound])

  useEffect(() => {
    if (!gameOver && !jingleStarted) {
      playJingle()
      setJingleStarted(true)
    }

    if (!isONext && !gameOver) {
      const timer = setTimeout(() => {
        const cpuMove = getCPUMove(board)
        if (cpuMove !== -1) {
          playChooseSound()
          const newBoard = [...board]
          newBoard[cpuMove] = 'X'
          setBoard(newBoard)
          setIsONext(true)
          if (checkWinner(newBoard) || newBoard.every(Boolean)) {
            setGameOver(true)
          }
        }
      }, 500)

      return () => clearTimeout(timer)
    } else if (gameOver) {
      stopJingle()
      setJingleStarted(false)
      stopCountdownSound()
      const winner = checkWinner(board)
      if (winner === 'X') {
        playLoseSound()
      } else if (winner === 'O') {
        playWinSound()
      } else if (board.every(Boolean)) {
        playDrawSound()
      }
    }
  }, [isONext, gameOver, board, getCPUMove, playChooseSound])

  useEffect(() => {
    if (!gameOver) {
      playJingle()
    }

    return () => {
      stopJingle()
    }
  }, [gameOver, playJingle, stopJingle])

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

    stopCountdownSound()

    if (!timerStarted) {
      setTimerStarted(true)
    }

    playChooseSound()

    const newBoard = [...board]
    newBoard[index] = 'O'
    setBoard(newBoard)
    setIsONext(false)

    if (checkWinner(newBoard) || newBoard.every(Boolean)) {
      setGameOver(true)
    }
  }

  const winner = checkWinner(board)
  const isDraw = !winner && board.every(Boolean)

  return (
    <group ref={boardRef} scale={[1.1, 1.1, 1]}>
      <Line points={[-1.6, -0.53, 0, 1.6, -0.53, 0]} color="#000000" lineWidth={7} />
      <Line points={[-1.6, 0.53, 0, 1.6, 0.53, 0]} color="#000000" lineWidth={7} />
      <Line points={[-0.53, -1.6, 0, -0.53, 1.6, 0]} color="#000000" lineWidth={7} />
      <Line points={[0.53, -1.6, 0, 0.53, 1.6, 0]} color="#000000" lineWidth={7} />

      {board.map((value, index) => (
        <Cell
          key={index}
          position={[
            (index % 3 - 1) * 1.06,
            (1 - Math.floor(index / 3)) * 1.06,
            0
          ]}
          onClick={() => handleCellClick(index)}
          value={value} 
          piece={piece}
        />
      ))}

      <Text
        position={[0, 1.9, 0]}
        fontSize={0.28}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        {timerStarted ? `Time: ${timeLeft}s` : 'Joker goes first'}
      </Text>

      {(winner || isDraw || timeLeft === 0) && (
        <Text
          position={[0, 0, 1]}
          fontSize={0.5}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#ffffff"
        >
          {winner === 'X' ? 'Joker won' : 
           winner === 'O' ? 'You win!' : 
           isDraw ? 'Draw!' : 
           'Time\'s up! Sorry!'}
        </Text>
      )}
    </group>
  )
}

const backgroundColors = [
  '#CC5500', // Original orange
  '#E83232', // Red
  '#A0A0A0', // Gray
  '#6B8CD4', // Blue
  '#C5C840', // Dirty yellow
  '#46A136', // Green
  '#FFED00', // Yellow yellow
  '#FFFFFF', // White
  '#BAA364', // Tan
  '#C840B1', // Purple
]

class ErrorBoundary extends React.Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

function ErrorFallback({error}: {error: Error}) {
  return (
    <div role="alert" style={{ color: 'red', padding: '1rem' }}>
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  )
}

export default function TicTacToe3D({ 
  onRestart, 
  onBackToMenu, 
  difficulty, 
  piece, 
  isMuted, 
  toggleMute 
}: { 
  onRestart: () => void
  onBackToMenu: () => void
  difficulty: 'easy' | 'medium' | 'hard'
  piece: 'pumpkin' | 'scarygary' | 'podplaylogo'
  isMuted: boolean
  toggleMute: () => void
}) {
  const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0])
  const [playHoverSound] = useSound('/hover.mp3', { 
    volume: 0.5, 
    soundEnabled: !isMuted 
  });

  const [playHalloweenSound] = useSound('/halloween.mp3', { 
    volume: 0.5, 
    soundEnabled: !isMuted 
  });

  const [playClickSound] = useSound('/click.mp3', { 
    volume: 0.5, 
    soundEnabled: !isMuted 
  });

  const changeBackgroundColor = () => {
    const newColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
    setBackgroundColor(newColor)
  }

  useEffect(() => {
    changeBackgroundColor()
  }, [])

  const handleRestart = () => {
    changeBackgroundColor()
    playClickSound()
    onRestart()
  }

  return (
    <div className="h-[100svh] w-full bg-transparent flex items-center justify-center p-4">
      <div className="w-full max-w-md aspect-[3/4] bg-white rounded-lg p-1">
        <div className="w-full h-full bg-orange-600 rounded-lg overflow-hidden flex flex-col relative">
          <div className="bg-orange-700 py-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-white" style={{ fontFamily: 'Frijole, cursive', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              TIC-TAC-JOKER
            </h1>
          </div>
          <div className="flex-grow relative">
            <ErrorBoundary fallback={<ErrorFallback error={new Error("An error occurred in the game")} />}>
              <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <color attach="background" args={[backgroundColor]} />
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} color="#ff6600" intensity={0.8} />
                <React.Suspense fallback={<></>}>
                  <Board 
                    difficulty={difficulty} 
                    piece={piece} 
                    isMuted={isMuted} 
                    toggleMute={toggleMute} 
                    onRestart={handleRestart} 
                  />
                </React.Suspense>
              </Canvas>
            </ErrorBoundary>
          </div>
          <div className="flex justify-center gap-4 py-3 bg-orange-700">
            <button 
              onClick={handleRestart} 
              className="bg-orange-800 text-white px-4 py-2 rounded text-sm sm:text-base hover:bg-red-900 transition-colors text-shadow-custom"
            >
              Play Again
            </button>
            <button 
              onClick={() => { playClickSound(); onBackToMenu(); }} 
              className="bg-orange-800 text-white px-4 py-2 rounded text-sm sm:text-base hover:bg-red-900 transition-colors text-shadow-custom"
            >
              Main Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
