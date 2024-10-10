import Link from 'next/link'

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to My Mini App</h1>
      <p className="mb-4">This is a basic structure that can be adapted into a mini app.</p>
      <Link href="/about" className="text-blue-500 hover:underline">
        About Us
      </Link>
    </main>
  )
}
