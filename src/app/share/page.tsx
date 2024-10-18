'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useSound from 'use-sound'

export default function Share() {
  const [playerData, setPlayerData] = useState({
    name: 'Player',
    profileImage: 'https://example.com/default-profile.jpg',
    podScore: 100,
    record: { wins: 5, losses: 3, ties: 2 },
    totalGamesPlayed: 10,
    thepodTokens: 2.5
  })

  useEffect(() => {
    const fetchPlayerData = async () => {
      // Fetch FID from your authentication system
      const fid = 'YOUR_FID_HERE'; // Replace with your actual FID

      try {
        const response = await fetch(`/api/player?fid=${fid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch player data');
        }
        const data = await response.json();
        setPlayerData(data);
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };

    fetchPlayerData();
  }, []);

  const shareGame = () => {
    const shareText = 'Welcome to POD Play presented by /thepod 🕹️. Think you can win a game of Tic-Tac-Toe?'
    const shareUrl = 'https://your-farcaster-app.vercel.app'
    const farcasterShareURL = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(shareUrl)}&mini_app_id=pod-play-tic-tac-toe`
    window.open(farcasterShareURL, '_blank')
  }

  const router = useRouter()

  const [isMuted, setIsMuted] = useState(false);
  const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.5, soundEnabled: !isMuted });
  const [playClick] = useSound('/sounds/click.mp3', { volume: 0.5, soundEnabled: !isMuted });

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
      <div className="flex flex-wrap gap-4 mt-4">
        <Link 
          href="/game" 
          className="bg-purple-500 text-white px-6 py-3 rounded text-center text-lg hover:bg-purple-600 transition-colors text-shadow-custom"
          onClick={() => playClick()}
          onMouseEnter={() => playHover()}
        >
          Play Again
        </Link>
        <a 
          href="https://moxie-frames.airstack.xyz/stim?t=cid_thepod" 
          className="bg-purple-500 text-white px-6 py-3 rounded text-center text-lg hover:bg-purple-600 transition-colors text-shadow-custom"
          onClick={() => playClick()}
          onMouseEnter={() => playHover()}
        >
          /thepod FT
        </a>
        <button 
          onClick={() => {
            playClick();
            shareGame();
          }} 
          onMouseEnter={() => playHover()}
          className="bg-purple-500 text-white px-6 py-3 rounded text-center text-lg hover:bg-purple-600 transition-colors text-shadow-custom"
        >
          Share Game
        </button>
      </div>
    </main>
  )
}
