'use client'

import React, { useState } from 'react'
import useSound from 'use-sound'

interface MenuBoardProps {
  onStartGame: (difficulty: 'easy' | 'medium' | 'hard', piece: 'pumpkin' | 'scarygary' | 'podplaylogo') => void;
  onGoBack: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const MenuBoard: React.FC<MenuBoardProps> = ({ onStartGame, onGoBack, isMuted, toggleMute }) => {
  const [menuStep, setMenuStep] = useState<'game' | 'piece' | 'difficulty'>('game')
  const [selectedPiece, setSelectedPiece] = useState<'pumpkin' | 'scarygary' | 'podplaylogo'>('pumpkin')
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  const [playHover] = useSound('/hover.mp3', { 
    volume: 0.5, 
    soundEnabled: !isMuted 
  })
  const [playClick] = useSound('/click.mp3', { 
    volume: 0.5, 
    soundEnabled: !isMuted 
  })

  const handleHover = (buttonName: string) => {
    if (buttonName !== hoveredButton) {
      setHoveredButton(buttonName)
      playHover()
    }
  }

  const renderGameStep = () => (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <button
        className="bg-orange-800 text-white px-8 py-4 rounded-lg text-xl hover:bg-orange-900 transition-colors"
        onClick={() => {
          playClick()
          setMenuStep('piece')
        }}
        onMouseEnter={() => handleHover('start')}
      >
        Start Game
      </button>
      <button
        className="bg-orange-800 text-white px-8 py-4 rounded-lg text-xl hover:bg-orange-900 transition-colors"
        onClick={() => {
          playClick()
          toggleMute()
        }}
        onMouseEnter={() => handleHover('mute')}
      >
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
    </div>
  )

  const renderPieceStep = () => (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <h2 className="text-2xl text-white mb-4">Choose Your Piece</h2>
      {['pumpkin', 'scarygary', 'podplaylogo'].map((piece) => (
        <button
          key={piece}
          className={`bg-orange-800 text-white px-8 py-4 rounded-lg text-xl hover:bg-orange-900 transition-colors
            ${selectedPiece === piece ? 'ring-4 ring-white' : ''}`}
          onClick={() => {
            playClick()
            setSelectedPiece(piece as 'pumpkin' | 'scarygary' | 'podplaylogo')
            setMenuStep('difficulty')
          }}
          onMouseEnter={() => handleHover(piece)}
        >
          {piece.charAt(0).toUpperCase() + piece.slice(1)}
        </button>
      ))}
    </div>
  )

  const renderDifficultyStep = () => (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <h2 className="text-2xl text-white mb-4">Select Difficulty</h2>
      {['easy', 'medium', 'hard'].map((difficulty) => (
        <button
          key={difficulty}
          className="bg-orange-800 text-white px-8 py-4 rounded-lg text-xl hover:bg-orange-900 transition-colors"
          onClick={() => {
            console.log(`Clicked ${difficulty} difficulty`)
            playClick()
            onStartGame(
              difficulty as 'easy' | 'medium' | 'hard',
              selectedPiece
            )
          }}
          onMouseEnter={() => handleHover(difficulty)}
        >
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </button>
      ))}
    </div>
  )

  return (
    <div className="h-[100svh] w-full bg-transparent flex items-center justify-center p-4">
      <div className="w-full max-w-md aspect-[3/4] bg-white rounded-lg p-1">
        <div className="w-full h-full bg-orange-600 rounded-lg overflow-hidden flex flex-col relative">
          <div className="bg-orange-700 py-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-white" style={{ fontFamily: 'Frijole, cursive', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              {menuStep === 'game' ? 'Main Menu' : 
               menuStep === 'piece' ? 'Select Piece' : 
               'Select Difficulty'}
            </h1>
          </div>
          
          <div className="flex-grow relative">
            {menuStep === 'game' && renderGameStep()}
            {menuStep === 'piece' && renderPieceStep()}
            {menuStep === 'difficulty' && renderDifficultyStep()}
          </div>

          <div className="bg-orange-700 py-2 flex justify-center">
            <button
              onClick={() => {
                playClick()
                if (menuStep === 'game') {
                  onGoBack()
                } else if (menuStep === 'piece') {
                  setMenuStep('game')
                } else {
                  setMenuStep('piece')
                }
              }}
              className="bg-orange-800 text-white px-4 py-2 rounded hover:bg-orange-900 transition-colors"
            >
              {menuStep === 'game' ? 'Go Back' : 'Previous Step'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuBoard