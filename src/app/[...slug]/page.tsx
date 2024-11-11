'use client'

import { useRouter } from 'next/navigation'

export default function CatchAll() {
  const router = useRouter()

  return (
    <div className="h-screen flex items-center justify-center">
      <button
        onClick={() => router.push('/')}
        className="bg-blue-800 text-white px-8 py-4 rounded-lg"
      >
        Return Home
      </button>
    </div>
  )
} 