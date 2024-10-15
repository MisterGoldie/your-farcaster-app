'use client'

import { metadata } from './metadata'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{metadata.title as string}</h1>
      <p>{metadata.description as string}</p>
    </main>
  )
}
