'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useUserContext } from '../context/UserContext'
import { 
  checkFanTokenOwnership, 
  getUserRecord, 
  getTotalGamesPlayed, 
  getUserProfilePicture, 
  getUsername 
} from '../../utils/farcasterUtils'

const MenuBoard = dynamic(() => import('../components/MenuBoard'), { ssr: false })

// Define the calculatePODScore function
function calculatePODScore(wins: number, ties: number, losses: number, totalGames: number, tokenBalance: number): number {
  const baseScore = (wins * 2) + ties + (losses * 0.5);
  const gamesBonusScore = totalGames >= 25 ? 10 : 0;
  const tokenBonusScore = Math.floor(tokenBalance) * 25; // 25 points for each whole token
  const totalScore = baseScore + gamesBonusScore + tokenBonusScore;
  return Math.round(totalScore * 10) / 10; // Round to one decimal place
}

export default function HowToPlay() {
  const router = useRouter()
  const { user } = useUserContext()
  const [isLoading, setIsLoading] = useState(true)
  const [playerData, setPlayerData] = useState({
    name: 'Player',
    profileImage: 'https://example.com/default-profile.jpg',
    podScore: 0,
    record: { wins: 0, losses: 0, ties: 0 },
    totalGamesPlayed: 0,
    thepodTokens: 0
  })

  useEffect(() => {
    const fetchPlayerData = async () => {
      if (user && user.fid) {
        try {
          const [username, profileImage, fanTokenResult, userRecord, totalGamesPlayed] = await Promise.all([
            getUsername(user.fid),
            getUserProfilePicture(user.fid),
            checkFanTokenOwnership(user.fid),
            getUserRecord(user.fid),
            getTotalGamesPlayed(user.fid)
          ])

          const podScore = calculatePODScore(
            userRecord.wins,
            userRecord.ties,
            userRecord.losses,
            totalGamesPlayed,
            fanTokenResult.balance
          )

          setPlayerData({
            name: username,
            profileImage: profileImage || 'https://example.com/default-profile.jpg',
            podScore,
            record: userRecord,
            totalGamesPlayed,
            thepodTokens: fanTokenResult.balance
          })
        } catch (error) {
          console.error('Error fetching player data:', error)
        }
      }
    }

    fetchPlayerData()
  }, [user])

  useEffect(() => {
    // Simulate checking for user authentication
    const checkUser = async () => {
      // Replace this with your actual user authentication logic
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsLoading(false)
    }
    checkUser()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const handleStartGame = (difficulty: 'easy' | 'medium' | 'hard') => {
    router.push(`/game?difficulty=${difficulty}`)
  }

  const handleGoBack = () => {
    router.push('/')
  }

  return (
    <main className="h-[100svh] bg-black text-white overflow-hidden">
      <MenuBoard onStartGame={handleStartGame} onGoBack={handleGoBack} playerData={playerData} />
    </main>
  )
}
