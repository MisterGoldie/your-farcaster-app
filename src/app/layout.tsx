import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Mini App',
  description: 'A simple mini app built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-100 p-4">
          <nav>
            {/* Add navigation items here */}
          </nav>
        </header>
        {children}
        <footer className="bg-gray-100 p-4 mt-8">
          <p>© 2023 My Mini App</p>
        </footer>
      </body>
    </html>
  )
}
