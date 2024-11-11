'use client'

export default function CatchAll() {
  return (
    <div className="h-screen flex items-center justify-center">
      <button
        onClick={() => {
          document.location.href = '/'
        }}
        className="bg-blue-800 text-white px-8 py-4 rounded-lg"
      >
        Return Home
      </button>
    </div>
  )
} 