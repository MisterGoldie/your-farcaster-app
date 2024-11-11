import { useEffect, useState } from 'react'
import useSound from 'use-sound'

export function useGameSound() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  const [playClick] = useSound('/sounds/click.mp3', { 
    volume: 0.5,
    soundEnabled: isClient // Only enable sound on client-side
  })

  const playSoundAndNavigate = (callback: () => void) => {
    if (isClient) {
      playClick()
      // Small delay to ensure sound plays before navigation
      requestAnimationFrame(() => {
        callback()
      })
    } else {
      callback()
    }
  }

  return { playSoundAndNavigate }
} 