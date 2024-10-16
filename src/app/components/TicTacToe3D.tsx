import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Line, Text, Plane } from '@react-three/drei'
import * as THREE from 'three'
import useSound from 'use-sound';

type CellProps = {
  position: [number, number, number]
  onClick: () => void
  value: string | null
}

function Cell({ position, onClick, value }: CellProps) {
  return (
    <group position={position}>
      <mesh onClick={onClick}>
        <boxGeometry args={[0.95, 0.95, 0.1]} />
        <meshStandardMaterial color="#ff6600" opacity={0} transparent />
      </mesh>
      {value === 'X' && (
        <group position={[0, 0, 0.06]}>
          <MaxiSprite position={[0, 0, 0]} />
        </group>
      )}
      {value === 'O' && (
        <group position={[0, 0, 0.06]}>
          <PumpkinSprite position={[0, 0, 0]} />
        </group>
      )}
    </group>
  )
}

function PumpkinSprite({ position }: { position: [number, number, number] }) {
  const texture = useLoader(THREE.TextureLoader, '/pumpkin.png')
  return (
    <group position={position}>
      <Plane args={[0.8, 0.8]}>
        <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
      </Plane>
      <Plane args={[0.8, 0.8]} rotation={[0, Math.PI, 0]}>
        <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
      </Plane>
    </group>
  )
}

function MaxiSprite({ position }: { position: [number, number, number] }) {
  const texture = useLoader(THREE.TextureLoader, '/maxi.png')
  return (
    <group position={position}>
      <Plane args={[0.8, 0.8]}>
        <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
      </Plane>
      <Plane args={[0.8, 0.8]} rotation={[0, Math.PI, 0]}>
        <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
      </Plane>
    </group>
  )
}

function Board({ difficulty, isMuted, toggleMute }: { difficulty: 'easy' | 'medium' | 'hard', isMuted: boolean, toggleMute: () => void }) {
  const boardRef = useRef<THREE.Group>(null)
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null))
  const [isONext, setIsONext] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [timerStarted, setTimerStarted] = useState(false)
  const [playLoseSound] = useSound('/sounds/losing.mp3', { volume: 0.5, soundEnabled: !isMuted });
  const [playWinSound] = useSound('/sounds/winning.mp3', { volume: 0.5, soundEnabled: !isMuted });
  const [playDrawSound] = useSound('/sounds/drawing.mp3', { volume: 0.5, soundEnabled: !isMuted });
  const [playChooseSound] = useSound('/sounds/choose.mp3', { volume: 0.5, soundEnabled: !isMuted });
  const [playCountdownSound, { stop: stopCountdownSound }] = useSound('/sounds/countdown.mp3', { volume: 0.5, soundEnabled: !isMuted });
  const [playJingle, { stop: stopJingle }] = useSound('/sounds/jingle.mp3', { volume: 0.3, loop: true, soundEnabled: !isMuted });

  useFrame((state) => {
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
            playCountdownSound();
          }
          if (prevTime <= 1) {
            clearInterval(timer);
            stopCountdownSound();
            setGameOver(true);
            playLoseSound();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
        stopCountdownSound();
      };
    }
  }, [timerStarted, gameOver, playCountdownSound, stopCountdownSound, playLoseSound, stopJingle]);

  useEffect(() => {
    if (!gameOver) {
      playJingle();
    }

    if (!isONext && !gameOver) {
      const timer = setTimeout(() => {
        const cpuMove = getCPUMove(board);
        if (cpuMove !== -1) {
          playChooseSound();
          const newBoard = [...board];
          newBoard[cpuMove] = 'X';
          setBoard(newBoard);
          setIsONext(true);
          if (checkWinner(newBoard) || newBoard.every(Boolean)) {
            setGameOver(true);
          }
        }
      }, 500);

      return () => clearTimeout(timer);
    } else if (gameOver) {
      stopJingle();
      stopCountdownSound();
      const winner = checkWinner(board);
      if (winner === 'X') {
        playLoseSound();
      } else if (winner === 'O') {
        playWinSound();
      } else if (board.every(Boolean)) {
        playDrawSound();
      }
    }
  }, [isONext, gameOver, board, playLoseSound, playWinSound, playDrawSound, playChooseSound, stopCountdownSound, playJingle, stopJingle]);

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

    stopCountdownSound();

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

  const getCPUMove = (board: (string | null)[]) => {
    const emptySpots = board.reduce((acc, cell, index) => {
      if (!cell) acc.push(index)
      return acc
    }, [] as number[])

    if (emptySpots.length === 0) return -1 // No move available

    if (difficulty === 'easy') {
      // For easy difficulty, just choose a random empty spot
      return emptySpots[Math.floor(Math.random() * emptySpots.length)]
    }

    // For medium and hard difficulties, use a more strategic approach
    if (difficulty === 'medium') {
      const winningMove = findWinningMove(board, 'X');
      const blockingMove = findWinningMove(board, 'O');
      
      // 90% chance to make an optimal move
      if (Math.random() < 0.9) {
        if (winningMove !== -1) {
          return winningMove; // Make a winning move if available
        }
        if (blockingMove !== -1) {
          return blockingMove; // Block player's winning move
        }
      }
      
      // If no winning/blocking move or 10% chance, use strategic placement
      const corners = [0, 2, 6, 8].filter(i => !board[i]);
      const sides = [1, 3, 5, 7].filter(i => !board[i]);
      
      if (corners.length > 0) {
        return corners[Math.floor(Math.random() * corners.length)];
      } else if (!board[4]) {
        return 4; // center
      } else if (sides.length > 0) {
        return sides[Math.floor(Math.random() * sides.length)];
      }
    }

    // For hard difficulty
    if (difficulty === 'hard') {
      // Check for winning move
      for (let i = 0; i < emptySpots.length; i++) {
        const testBoard = [...board]
        testBoard[emptySpots[i]] = 'X'
        if (checkWinner(testBoard) === 'X') {
          return emptySpots[i]
        }
      }

      // Check for blocking player's winning move
      for (let i = 0; i < emptySpots.length; i++) {
        const testBoard = [...board]
        testBoard[emptySpots[i]] = 'O'
        if (checkWinner(testBoard) === 'O') {
          return emptySpots[i]
        }
      }

      // If center is available, 70% chance to take it
      if (!board[4] && Math.random() < 0.7) return 4

      // Define corners and sides for hard difficulty
      const corners = [0, 2, 6, 8].filter(i => !board[i]);
      const sides = [1, 3, 5, 7].filter(i => !board[i]);

      // Prefer corners, then sides
      if (corners.length > 0) {
        return corners[Math.floor(Math.random() * corners.length)]
      } else if (sides.length > 0) {
        return sides[Math.floor(Math.random() * sides.length)]
      }
    }

    // Fallback: choose a random empty spot
    return emptySpots[Math.floor(Math.random() * emptySpots.length)]
  }

  // Helper function to find a winning move for a given player
  const findWinningMove = (board: (string | null)[], player: 'X' | 'O') => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] === player && board[b] === player && !board[c]) return c;
      if (board[a] === player && board[c] === player && !board[b]) return b;
      if (board[b] === player && board[c] === player && !board[a]) return a;
    }

    return -1; // No winning move found
  }

  const winner = checkWinner(board)
  const isDraw = !winner && board.every(Boolean)

  return (
    <group ref={boardRef} scale={[1.1, 1.1, 1]}>
      {/* Grid lines */}
      <Line points={[-1.6, -0.53, 0, 1.6, -0.53, 0]} color="#000000" lineWidth={7} />
      <Line points={[-1.6, 0.53, 0, 1.6, 0.53, 0]} color="#000000" lineWidth={7} />
      <Line points={[-0.53, -1.6, 0, -0.53, 1.6, 0]} color="#000000" lineWidth={7} />
      <Line points={[0.53, -1.6, 0, 0.53, 1.6, 0]} color="#000000" lineWidth={7} />

      {/* Cells */}
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
        />
      ))}

      {/* Timer */}
      <Text
        position={[0, 1.9, 0]}
        fontSize={0.28}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        {timerStarted ? `Time: ${timeLeft}s` : 'Maxi goes first'}
      </Text>

      {/* Game over text */}
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
          {winner === 'X' ? 'Maxi won' : 
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
  '#FF0000', // Red
  '#8B0000', // Dark Red
  '#B22222', // Firebrick
  '#C5C840', // Dirty yellow
  '#46A136',// Green
  '#DC143C', // Crimson
  '#C840B1', // Purple
]

export default function TicTacToe3D({ onRestart, onBackToHome, difficulty, isMuted, toggleMute }: { 
  onRestart: () => void, 
  onBackToHome: () => void,
  difficulty: 'easy' | 'medium' | 'hard',
  isMuted: boolean,
  toggleMute: () => void
}) {
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
              <React.Suspense fallback={null}>
                <Board difficulty={difficulty} isMuted={isMuted} toggleMute={toggleMute} />
              </React.Suspense>
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
