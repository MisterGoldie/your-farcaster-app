'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Share() {
  const [playerData, setPlayerData] = useState({
    name: 'Player',
    profileImage: 'https://example.com/default-profile.jpg',
    podScore: 100,
    record: { wins: 5, losses: 3, ties: 2 },
    totalGamesPlayed: 10,
    thepodTokens: 2.5
  })

  // In a real app, you'd fetch this data from your API
  useEffect(() => {
    // Fetch player data here
  }, [])

  const shareGame = () => {
    const shareText = 'Welcome to POD Play presented by /thepod 🕹️. Think you can win a game of Tic-Tac-Toe? Frame by @goldie & @themrsazon, powered by @moxie.eth'
    const shareUrl = 'https://podplay.vercel.app/api'
    const farcasterShareURL = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(shareUrl)}`
    window.open(farcasterShareURL, '_blank')
  }

  const router = useRouter()

  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold mb-4">Player Stats</h1>
      <div className="mb-4">
        <img src={playerData.profileImage} alt={playerData.name} className="w-20 h-20 rounded-full" />
        <h2 className="text-2xl font-bold">{playerData.name}</h2>
      </div>
      <div className="mb-4">
        <p>POD Score: {playerData.podScore}</p>
        <p>Record: {playerData.record.wins}W - {playerData.record.losses}L - {playerData.record.ties}T</p>
        <p>Total Games Played: {playerData.totalGamesPlayed}</p>
        <p>/thepod Fan Tokens owned: {playerData.thepodTokens.toFixed(2)}</p>
      </div>
      <Link href="/game" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
        Play Again
      </Link>
      <a href="https://moxie-frames.airstack.xyz/stim?t=cid_thepod" className="bg-purple-500 text-white px-4 py-2 rounded mr-2">
        /thepod FT
      </a>
      <button onClick={shareGame} className="bg-green-500 text-white px-4 py-2 rounded">
        Share Game
      </button>
    </main>
  )
}
