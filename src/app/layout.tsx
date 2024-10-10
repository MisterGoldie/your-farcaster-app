import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "POD Play Tic-Tac-Toe",
  description: 'A Tic-Tac-Toe game presented by /thepod',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          {/* Add any common header elements here */}
        </header>
        {children}
        <footer>
          <p>Frame by @goldie & @themrsazon, powered by @moxie.eth</p>
        </footer>
      </body>
    </html>
  )
}
