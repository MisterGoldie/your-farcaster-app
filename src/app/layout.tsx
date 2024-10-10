import './globals.css'
import { Inter, Rock_Salt } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const rockSalt = Rock_Salt({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rock-salt',
})

export const metadata = {
  title: "Goldie's Future Mini App",
  description: 'A simple mini app built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.className} ${rockSalt.variable}`}>
      <body>
        <header className="bg-gray-100 p-4">
          <nav>
            {/* Add navigation items here */}
          </nav>
        </header>
        {children}
        <footer className="bg-gray-100 p-4 mt-8">
          <p>© 2023 Goldie's Future Mini App</p>
        </footer>
      </body>
    </html>
  )
}
