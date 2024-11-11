// src/components/MenuContent.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import useSound from 'use-sound'
import { RoundedRectangle } from './MenuBoard'  // Import RoundedRectangle from MenuBoard
import { useRouter } from 'next/navigation'

interface MenuContentProps {
  isMuted: boolean;
}

function MenuScene({
  menuStep,
  setMenuStep,
  selectedPiece,
  setSelectedPiece,
  hoveredButton,
  setHoveredButton,
  handleStartGame,
  playHover,
  playClick
}: {
  menuStep: 'game' | 'piece' | 'difficulty'
  setMenuStep: (step: 'game' | 'piece' | 'difficulty') => void
  selectedPiece: 'pumpkin' | 'scarygary' | 'podplaylogo'
  setSelectedPiece: (piece: 'pumpkin' | 'scarygary' | 'podplaylogo') => void
  hoveredButton: string | null
  setHoveredButton: (button: string | null) => void
  handleStartGame: (difficulty: 'easy' | 'medium' | 'hard') => void
  playHover: () => void
  playClick: () => void
}) {
  const { viewport } = useThree()

  const buttonWidth = viewport.width * 0.6
  const buttonHeight = viewport.height * 0.15
  const cornerRadius = Math.min(buttonWidth, buttonHeight) * 0.2

  const renderButton = (text: string, onClick: () => void, key: string) => (
    <group
      key={key}
      position={[0, 0, 0]}
      onPointerOver={() => {
        setHoveredButton(key)
        playHover()
      }}
      onPointerOut={() => setHoveredButton(null)}
      onClick={() => {
        onClick()
        playClick()
      }}
    >
      <RoundedRectangle
        width={buttonWidth}
        height={buttonHeight}
        radius={cornerRadius}
        color={hoveredButton === key ? "#8B0D18" : "#000000"}
      />
      <Text
        position={[0, 0, 0.01]}
        fontSize={viewport.width * 0.05}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  )

  // Add the rest of the rendering logic here based on menuStep
  // ...

  return (
    <group>
      {/* Render your buttons and other 3D elements here */}
    </group>
  )
}

export function MenuContent({ isMuted }: MenuContentProps) {
  const [menuStep, setMenuStep] = useState<'game' | 'piece' | 'difficulty'>('game')
  const [selectedPiece, setSelectedPiece] = useState<'pumpkin' | 'scarygary' | 'podplaylogo'>('pumpkin')
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const router = useRouter()

  const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.5, soundEnabled: !isMuted });
  const [playClick] = useSound('/sounds/click.mp3', { volume: 0.5, soundEnabled: !isMuted });
  const [playHalloweenMusic, { stop: stopHalloweenMusic }] = useSound('/sounds/halloween.mp3', { 
    volume: 0.3, 
    loop: true, 
    soundEnabled: !isMuted 
  });

  useEffect(() => {
    playHalloweenMusic();
    return () => stopHalloweenMusic();
  }, [playHalloweenMusic, stopHalloweenMusic]);

  const handleStartGame = (difficulty: 'easy' | 'medium' | 'hard') => {
    stopHalloweenMusic();
    router.push(`/game?difficulty=${difficulty}&piece=${selectedPiece}&muted=${isMuted}`);
  };

  return (
    <MenuScene
      menuStep={menuStep}
      setMenuStep={setMenuStep}
      selectedPiece={selectedPiece}
      setSelectedPiece={setSelectedPiece}
      hoveredButton={hoveredButton}
      setHoveredButton={setHoveredButton}
      handleStartGame={handleStartGame}
      playHover={playHover}
      playClick={playClick}
    />
  )
}